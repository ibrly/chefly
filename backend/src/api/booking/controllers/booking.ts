/**
 * booking controller
 */

import { factories } from '@strapi/strapi';

export default factories.createCoreController('api::booking.booking', ({ strapi }) => ({
  // Create booking
  async create(ctx) {
    const user = ctx.state.user;
    const { chef, bookingDate, duration, location, specialRequests } = ctx.request.body.data;

    // Get chef profile to calculate price
    const chefProfile = await strapi.entityService.findOne(
      'api::chef-profile.chef-profile',
      chef
    );

    if (!chefProfile) {
      return ctx.badRequest('Chef not found');
    }

    if (!chefProfile.isAvailable) {
      return ctx.badRequest('Chef is not available');
    }

    const totalPrice = chefProfile.hourlyRate * duration;

    const booking = await strapi.entityService.create('api::booking.booking', {
      data: {
        client: user.id,
        chef,
        bookingDate,
        duration,
        location,
        specialRequests,
        totalPrice,
        status: 'pending',
      },
      populate: {
        client: true,
        chef: {
          populate: {
            user: true,
          },
        },
      },
    });

    return { data: booking };
  },

  // Update booking status
  async updateStatus(ctx) {
    const { id } = ctx.params;
    const { status, cancellationReason } = ctx.request.body;
    const user = ctx.state.user;

    const booking = await strapi.entityService.findOne('api::booking.booking', id, {
      populate: {
        client: true,
        chef: {
          populate: {
            user: true,
          },
        },
      },
    });

    if (!booking) {
      return ctx.notFound('Booking not found');
    }

    // Check permissions
    const isChef = booking.chef.user.id === user.id;
    const isClient = booking.client.id === user.id;

    if (!isChef && !isClient && user.role.type !== 'admin') {
      return ctx.forbidden('You do not have permission to update this booking');
    }

    // Validate status transitions
    if (status === 'confirmed' && !isChef && user.role.type !== 'admin') {
      return ctx.forbidden('Only chefs can confirm bookings');
    }

    const updateData: any = { status };

    if (status === 'cancelled' && cancellationReason) {
      updateData.cancellationReason = cancellationReason;
    }

    // Increment chef bookings count when confirmed
    if (status === 'confirmed') {
      await strapi
        .service('api::chef-profile.chef-profile')
        .incrementBookings(booking.chef.id);
    }

    const updatedBooking = await strapi.entityService.update(
      'api::booking.booking',
      id,
      {
        data: updateData,
        populate: {
          client: true,
          chef: {
            populate: {
              user: true,
            },
          },
        },
      }
    );

    return { data: updatedBooking };
  },

  // Get user bookings (client or chef)
  async myBookings(ctx) {
    const user = ctx.state.user;

    // Check if user is a chef
    const chefProfile = await strapi.db.query('api::chef-profile.chef-profile').findOne({
      where: { user: user.id },
    });

    const filters: any = {};

    if (chefProfile) {
      filters.chef = chefProfile.id;
    } else {
      filters.client = user.id;
    }

    const bookings = await strapi.entityService.findMany('api::booking.booking', {
      filters,
      populate: {
        client: true,
        chef: {
          populate: {
            user: true,
            profilePhoto: true,
          },
        },
        payment: true,
      },
      sort: { bookingDate: 'desc' },
    });

    return { data: bookings };
  },
}));

