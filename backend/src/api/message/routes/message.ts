/**
 * message router
 */

import { factories } from '@strapi/strapi';

const defaultRouter = factories.createCoreRouter('api::message.message');

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
    path: '/messages/conversation/:userId',
    handler: 'message.getConversation',
  },
  {
    method: 'GET',
    path: '/messages/conversations',
    handler: 'message.getConversations',
  },
  {
    method: 'PUT',
    path: '/messages/conversation/:conversationId/read',
    handler: 'message.markAsRead',
  },
];

export default customRouter(defaultRouter, myExtraRoutes);

