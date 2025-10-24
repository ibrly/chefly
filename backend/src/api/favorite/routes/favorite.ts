/**
 * favorite router
 */

import { factories } from '@strapi/strapi';

const defaultRouter = factories.createCoreRouter('api::favorite.favorite');

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
    path: '/favorites/my',
    handler: 'favorite.myFavorites',
  },
  {
    method: 'POST',
    path: '/favorites/add',
    handler: 'favorite.add',
  },
  {
    method: 'DELETE',
    path: '/favorites/:chefId',
    handler: 'favorite.remove',
  },
  {
    method: 'GET',
    path: '/favorites/check/:chefId',
    handler: 'favorite.isFavorite',
  },
];

export default customRouter(defaultRouter, myExtraRoutes);

