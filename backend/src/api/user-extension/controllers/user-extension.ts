export default {
  async savePushToken(ctx) {
    const user = ctx.state.user;
    const { token } = ctx.request.body;

    if (!token) {
      return ctx.badRequest('Push token is required');
    }

    try {
      // Update user's push token
      await strapi.entityService.update('plugin::users-permissions.user', user.id, {
        data: {
          pushToken: token,
        },
      });

      return { success: true };
    } catch (error) {
      console.error('Error saving push token:', error);
      return ctx.internalServerError('Failed to save push token');
    }
  },
};

