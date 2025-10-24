/**
 * payment controller
 */

import { factories } from '@strapi/strapi';

export default factories.createCoreController('api::payment.payment', ({ strapi }) => ({
  // Create payment intent
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

    // TODO: Integrate with Paymob API to create payment intent
    // For now, create a pending payment record
    const payment = await strapi.entityService.create('api::payment.payment', {
      data: {
        booking: bookingId,
        amount: booking.totalPrice,
        status: 'pending',
        paymentMethod: 'paymob',
      },
    });

    return { data: payment };
  },

  // Paymob webhook handler
  async webhook(ctx) {
    const webhookData = ctx.request.body;

    // TODO: Verify webhook signature
    // TODO: Process payment status updates from Paymob

    const { transaction_id, success } = webhookData;

    if (transaction_id) {
      const payment = await strapi.db.query('api::payment.payment').findOne({
        where: { paymobTransactionId: transaction_id },
      });

      if (payment) {
        await strapi.entityService.update('api::payment.payment', payment.id, {
          data: {
            status: success ? 'completed' : 'failed',
            paymentDetails: webhookData,
          },
        });

        // Update booking status if payment successful
        if (success && payment.booking) {
          await strapi.entityService.update('api::booking.booking', payment.booking, {
            data: {
              status: 'confirmed',
            },
          });
        }
      }
    }

    return { received: true };
  },
}));

