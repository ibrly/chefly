/**
 * chef-profile service
 */

import { factories } from '@strapi/strapi';

export default factories.createCoreService(
  'api::chef-profile.chef-profile',
  ({ strapi }) => ({
    async updateRating(chefId: number) {
      const reviews = await strapi.entityService.findMany('api::review.review', {
        filters: { chef: chefId },
      });

      if (reviews.length === 0) {
        return;
      }

      const totalRating = reviews.reduce((sum: number, review: any) => sum + review.rating, 0);
      const averageRating = totalRating / reviews.length;

      await strapi.entityService.update('api::chef-profile.chef-profile', chefId, {
        data: {
          averageRating: parseFloat(averageRating.toFixed(2)),
        },
      });
    },

    async incrementBookings(chefId: number) {
      const chef = await strapi.entityService.findOne(
        'api::chef-profile.chef-profile',
        chefId
      );

      if (chef) {
        await strapi.entityService.update('api::chef-profile.chef-profile', chefId, {
          data: {
            totalBookings: (chef.totalBookings || 0) + 1,
          },
        });
      }
    },
  })
);

