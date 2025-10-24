/**
 * chef-profile router
 */

import { factories } from '@strapi/strapi';

const defaultRouter = factories.createCoreRouter('api::chef-profile.chef-profile');

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
    method: 'GET',
    path: '/chef-profiles/search',
    handler: 'chef-profile.search',
    config: {
      auth: false,
    },
  },
];

export default customRouter(defaultRouter, myExtraRoutes);

