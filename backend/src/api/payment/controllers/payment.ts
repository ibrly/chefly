/**
 * payment controller
 */

import { factories } from '@strapi/strapi';

export default factories.createCoreController('api::payment.payment', ({ strapi }) => ({
  // Create payment intent with Paymob
  async createIntent(ctx) {
    const user = ctx.state.user;
    const { bookingId } = ctx.request.body;

    if (!user) {
      return ctx.unauthorized('You must be logged in');
    }

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

    // Create payment record
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
    // TODO: Process payment status updates

    return { received: true };
  },
}));

