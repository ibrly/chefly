/**
 * payment controller
 */

import { factories } from '@strapi/strapi';
import paymobService from '../../../services/paymob';

export default factories.createCoreController('api::payment.payment', ({ strapi }) => ({
  // Create payment intent with Paymob
  async createIntent(ctx) {
    const user = ctx.state.user;
    const { bookingId } = ctx.request.body;

    const booking = await strapi.entityService.findOne('api::booking.booking', bookingId, {
      populate: {
        client: true,
        payment: true,
      },
    });

    if (!booking) {
      return ctx.badRequest('Booking not found');
    }

    if (booking.client.id !== user.id) {
      return ctx.forbidden('You can only pay for your own bookings');
    }

    if (booking.payment) {
      return ctx.badRequest('Payment already exists for this booking');
    }

    try {
      // Create payment intent with Paymob
      const paymentIntent = await paymobService.createPaymentIntent(
        bookingId,
        booking.totalPrice,
        {
          firstName: user.username.split(' ')[0] || user.username,
          lastName: user.username.split(' ')[1] || 'User',
          email: user.email,
          phone: user.phone || '01000000000',
        }
      );

      // Create payment record
      const payment = await strapi.entityService.create('api::payment.payment', {
        data: {
          booking: bookingId,
          amount: booking.totalPrice,
          status: 'pending',
          paymentMethod: 'paymob',
          paymentDetails: {
            paymobOrderId: paymentIntent.orderId,
            paymentKey: paymentIntent.paymentKey,
          },
        },
      });

      return {
        data: {
          payment,
          iframeUrl: paymentIntent.iframeUrl,
          paymentKey: paymentIntent.paymentKey,
        },
      };
    } catch (error) {
      console.error('Payment intent creation error:', error);
      return ctx.internalServerError('Failed to create payment intent');
    }
  },

  // Paymob webhook handler
  async webhook(ctx) {
    const webhookData = ctx.request.body;
    const receivedHmac = ctx.request.query.hmac as string;

    // Verify webhook signature
    if (!paymobService.verifyWebhookSignature(webhookData, receivedHmac)) {
      console.error('Invalid webhook signature');
      return ctx.forbidden('Invalid signature');
    }

    const transactionData = webhookData.obj;

    if (!transactionData) {
      return ctx.badRequest('Invalid webhook data');
    }

    try {
      // Find payment by Paymob order ID
      const payments = await strapi.entityService.findMany('api::payment.payment', {
        filters: {
          paymentDetails: {
            $contains: transactionData.order.id.toString(),
          },
        },
        populate: {
          booking: true,
        },
      });

      if (payments.length === 0) {
        console.warn('Payment not found for Paymob order:', transactionData.order.id);
        return { received: true };
      }

      const payment = payments[0];

      // Update payment status
      const newStatus = transactionData.success ? 'completed' : 'failed';

      await strapi.entityService.update('api::payment.payment', payment.id, {
        data: {
          status: newStatus,
          paymobTransactionId: transactionData.id.toString(),
          paymentDetails: {
            ...payment.paymentDetails,
            transactionData,
            webhookReceivedAt: new Date().toISOString(),
          },
        },
      });

      // Update booking status if payment successful
      if (transactionData.success && payment.booking) {
        await strapi.entityService.update('api::booking.booking', payment.booking.id, {
          data: {
            status: 'confirmed',
          },
        });

        // Send notification to chef
        await strapi.service('notification').notifyBookingUpdate(
          payment.booking,
          'confirmed'
        );
      }

      return { received: true };
    } catch (error) {
      console.error('Webhook processing error:', error);
      return ctx.internalServerError('Webhook processing failed');
    }
  },
}));

