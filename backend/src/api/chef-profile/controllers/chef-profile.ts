/**
 * chef-profile controller
 */

import { factories } from '@strapi/strapi';

export default factories.createCoreController(
  'api::chef-profile.chef-profile',
  ({ strapi }) => ({
    // Find approved chefs (public)
    async find(ctx) {
      // Add filter to show only approved chefs to non-admin users
      if (!ctx.state.user || ctx.state.user.role.type !== 'admin') {
        ctx.query = {
          ...ctx.query,
          filters: {
            ...ctx.query.filters,
            isApproved: true,
          },
        };
      }

      const { data, meta } = await super.find(ctx);
      return { data, meta };
    },

    // Get chef by user ID
    async findByUser(ctx) {
      const { userId } = ctx.params;

      const chefProfile = await strapi.db
        .query('api::chef-profile.chef-profile')
        .findOne({
          where: { user: userId },
          populate: {
            user: true,
            profilePhoto: true,
            portfolioImages: true,
            certifications: true,
          },
        });

      if (!chefProfile) {
        return ctx.notFound('Chef profile not found');
      }

      return { data: chefProfile };
    },

    // Search chefs
    async search(ctx) {
      const { query, cuisineTypes, minRate, maxRate, location } = ctx.query;

      const filters: any = { isApproved: true };

      if (query) {
        filters.$or = [
          { bio: { $containsi: query } },
          { location: { $containsi: query } },
        ];
      }

      if (cuisineTypes) {
        filters.cuisineTypes = { $contains: cuisineTypes };
      }

      if (minRate) {
        filters.hourlyRate = { $gte: minRate };
      }

      if (maxRate) {
        filters.hourlyRate = { ...filters.hourlyRate, $lte: maxRate };
      }

      if (location) {
        filters.location = { $containsi: location };
      }

      const chefs = await strapi.entityService.findMany(
        'api::chef-profile.chef-profile',
        {
          filters,
          populate: {
            user: true,
            profilePhoto: true,
          },
          sort: { averageRating: 'desc' },
        }
      );

      return { data: chefs };
    },
  })
);

