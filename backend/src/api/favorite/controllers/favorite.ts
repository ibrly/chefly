/**
 * favorite controller
 */

import { factories } from '@strapi/strapi';

export default factories.createCoreController('api::favorite.favorite', ({ strapi }) => ({
  // Get user's favorites
  async myFavorites(ctx) {
    const user = ctx.state.user;

    const favorites = await strapi.entityService.findMany('api::favorite.favorite', {
      filters: { user: user.id },
      populate: {
        chef: {
          populate: {
            user: true,
            profilePhoto: true,
          },
        },
      },
    });

    return { data: favorites };
  },

  // Add to favorites
  async add(ctx) {
    const user = ctx.state.user;
    const { chefId } = ctx.request.body;

    // Check if already favorited
    const existing = await strapi.db.query('api::favorite.favorite').findOne({
      where: {
        user: user.id,
        chef: chefId,
      },
    });

    if (existing) {
      return ctx.badRequest('Chef already in favorites');
    }

    const favorite = await strapi.entityService.create('api::favorite.favorite', {
      data: {
        user: user.id,
        chef: chefId,
      },
      populate: {
        chef: {
          populate: {
            user: true,
            profilePhoto: true,
          },
        },
      },
    });

    return { data: favorite };
  },

  // Remove from favorites
  async remove(ctx) {
    const user = ctx.state.user;
    const { chefId } = ctx.params;

    const favorite = await strapi.db.query('api::favorite.favorite').findOne({
      where: {
        user: user.id,
        chef: chefId,
      },
    });

    if (!favorite) {
      return ctx.notFound('Favorite not found');
    }

    await strapi.entityService.delete('api::favorite.favorite', favorite.id);

    return { success: true };
  },

  // Check if chef is favorited
  async isFavorite(ctx) {
    const user = ctx.state.user;
    const { chefId } = ctx.params;

    const favorite = await strapi.db.query('api::favorite.favorite').findOne({
      where: {
        user: user.id,
        chef: chefId,
      },
    });

    return { isFavorite: !!favorite };
  },
}));

