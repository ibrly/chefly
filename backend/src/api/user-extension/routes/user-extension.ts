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
  ],
};

