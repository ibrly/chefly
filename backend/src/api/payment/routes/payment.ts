/**
 * payment router
 */

import { factories } from '@strapi/strapi';

const defaultRouter = factories.createCoreRouter('api::payment.payment');

const customRouter = (innerRouter, extraRoutes = []) => {
  let routes;
  return {
    get prefix() {
      return innerRouter.prefix;
    },
    get routes() {
      if (!routes) routes = innerRouter.routes.concat(extraRoutes);
      return routes;
    },
  };
};

const myExtraRoutes = [
  {
    method: 'POST',
    path: '/payments/intent',
    handler: 'payment.createIntent',
  },
  {
    method: 'POST',
    path: '/payments/webhook',
    handler: 'payment.webhook',
    config: {
      auth: false,
    },
  },
];

export default customRouter(defaultRouter, myExtraRoutes);

