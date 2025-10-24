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
    path: '/chef-profiles/user/:userId',
    handler: 'chef-profile.findByUser',
  },
  {
    method: 'GET',
    path: '/chef-profiles/search',
    handler: 'chef-profile.search',
  },
];

export default customRouter(defaultRouter, myExtraRoutes);

