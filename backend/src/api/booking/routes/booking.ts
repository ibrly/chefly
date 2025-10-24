/**
 * booking router
 */

import { factories } from '@strapi/strapi';

const defaultRouter = factories.createCoreRouter('api::booking.booking');

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
    method: 'PUT',
    path: '/bookings/:id/status',
    handler: 'booking.updateStatus',
  },
  {
    method: 'GET',
    path: '/bookings/my',
    handler: 'booking.myBookings',
  },
];

export default customRouter(defaultRouter, myExtraRoutes);

