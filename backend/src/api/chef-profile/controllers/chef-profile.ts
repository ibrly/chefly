/**
 * chef-profile controller
 */

import { factories } from '@strapi/strapi'

export default factories.createCoreController('api::chef-profile.chef-profile', ({ strapi }) => ({
  // Custom search and filter
  async search(ctx) {
    const { cuisine, minPrice, maxPrice, rating, location } = ctx.query;

    const filters: any = {
      isApproved: true,
      isAvailable: true,
    };

    if (cuisine) {
      filters.cuisineTypes = {
        $contains: cuisine,
      };
    }

    if (minPrice || maxPrice) {
      filters.pricePerHour = {};
      if (minPrice) filters.pricePerHour.$gte = Number(minPrice);
      if (maxPrice) filters.pricePerHour.$lte = Number(maxPrice);
    }

    if (rating) {
      filters.rating = {
        $gte: Number(rating),
      };
    }

    const chefs = await strapi.entityService.findMany('api::chef-profile.chef-profile', {
      filters,
      populate: {
        user: {
          fields: ['username', 'email'],
        },
        profileImage: true,
        portfolioImages: true,
      },
      sort: { rating: 'desc' },
    });

    return { data: chefs };
  },
}));

