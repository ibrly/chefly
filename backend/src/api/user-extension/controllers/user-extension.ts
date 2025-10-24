/**
 * user-extension controller
 * Extends the default users-permissions plugin with additional functionality
 */

export default {
  /**
   * Save Expo push token for the authenticated user
   */
  async savePushToken(ctx) {
    const user = ctx.state.user;
    const { pushToken } = ctx.request.body;

    if (!user) {
      return ctx.unauthorized('You must be logged in');
    }

    if (!pushToken) {
      return ctx.badRequest('Push token is required');
    }

    try {
      // Update user with push token
      await strapi.query('plugin::users-permissions.user').update({
        where: { id: user.id },
        data: {
          pushToken,
        },
      });

      return { success: true, message: 'Push token saved successfully' };
    } catch (error) {
      console.error('Error saving push token:', error);
      return ctx.internalServerError('Failed to save push token');
    }
  },

  /**
   * Get current user's profile with extended data
   */
  async me(ctx) {
    const user = ctx.state.user;

    if (!user) {
      return ctx.unauthorized('You must be logged in');
    }

    try {
      const userData = await strapi.query('plugin::users-permissions.user').findOne({
        where: { id: user.id },
        populate: {
          role: true,
        },
      });

      // Get chef profile if user is a chef
      let chefProfile = null;
      if (userData.role?.type === 'chef') {
        chefProfile = await strapi.entityService.findMany('api::chef-profile.chef-profile', {
          filters: {
            user: user.id,
          },
          populate: ['profileImage', 'portfolioImages'],
        });
      }

      return {
        ...userData,
        chefProfile: chefProfile?.[0] || null,
      };
    } catch (error) {
      console.error('Error fetching user profile:', error);
      return ctx.internalServerError('Failed to fetch user profile');
    }
  },
};

