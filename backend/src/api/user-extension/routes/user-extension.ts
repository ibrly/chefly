/**
 * user-extension routes
 */

export default {
  routes: [
    {
      method: 'POST',
      path: '/users/push-token',
      handler: 'user-extension.savePushToken',
      config: {
        policies: [],
        middlewares: [],
      },
    },
    {
      method: 'GET',
      path: '/users/me',
      handler: 'user-extension.me',
      config: {
        policies: [],
        middlewares: [],
      },
    },
  ],
};

