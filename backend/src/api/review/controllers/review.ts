/**
 * review controller
 */

import { factories } from '@strapi/strapi';

export default factories.createCoreController('api::review.review', ({ strapi }) => ({
  async create(ctx) {
    const user = ctx.state.user;
    const { booking, rating, comment } = ctx.request.body.data;

    // Verify booking exists and belongs to user
    const bookingData = await strapi.entityService.findOne('api::booking.booking', booking, {
      populate: {
        client: true,
        chef: true,
        review: true,
      },
    });

    if (!bookingData) {
      return ctx.badRequest('Booking not found');
    }

    if (bookingData.client.id !== user.id) {
      return ctx.forbidden('You can only review your own bookings');
    }

    if (bookingData.status !== 'completed') {
      return ctx.badRequest('You can only review completed bookings');
    }

    if (bookingData.review) {
      return ctx.badRequest('You have already reviewed this booking');
    }

    const review = await strapi.entityService.create('api::review.review', {
      data: {
        booking,
        client: user.id,
        chef: bookingData.chef.id,
        rating,
        comment,
      },
      populate: {
        client: true,
        chef: true,
      },
    });

    // Update chef average rating
    await strapi.service('api::chef-profile.chef-profile').updateRating(bookingData.chef.id);

    return { data: review };
  },
}));

