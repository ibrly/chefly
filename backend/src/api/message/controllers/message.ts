/**
 * message controller
 */

import { factories } from '@strapi/strapi';

export default factories.createCoreController('api::message.message', ({ strapi }) => ({
  // Get conversation messages
  async getConversation(ctx) {
    const user = ctx.state.user;
    const { userId } = ctx.params;

    // Generate conversation ID (sorted user IDs)
    const conversationId = [user.id, parseInt(userId)]
      .sort((a, b) => a - b)
      .join('-');

    const messages = await strapi.entityService.findMany('api::message.message', {
      filters: {
        conversationId,
      },
      populate: {
        sender: true,
        receiver: true,
        attachments: true,
      },
      sort: { createdAt: 'asc' },
    });

    return { data: messages };
  },

  // Get all conversations for a user
  async getConversations(ctx) {
    const user = ctx.state.user;

    const messages = await strapi.db.query('api::message.message').findMany({
      where: {
        $or: [{ sender: user.id }, { receiver: user.id }],
      },
      populate: {
        sender: true,
        receiver: true,
      },
      orderBy: { createdAt: 'desc' },
    });

    // Group by conversation and get last message
    const conversationsMap = new Map();

    messages.forEach((message: any) => {
      const conversationId = message.conversationId;
      if (!conversationsMap.has(conversationId)) {
        const otherUser = message.sender.id === user.id ? message.receiver : message.sender;
        conversationsMap.set(conversationId, {
          conversationId,
          otherUser,
          lastMessage: message,
          unreadCount: message.receiver.id === user.id && !message.isRead ? 1 : 0,
        });
      } else {
        const conversation = conversationsMap.get(conversationId);
        if (message.receiver.id === user.id && !message.isRead) {
          conversation.unreadCount += 1;
        }
      }
    });

    return { data: Array.from(conversationsMap.values()) };
  },

  // Mark messages as read
  async markAsRead(ctx) {
    const user = ctx.state.user;
    const { conversationId } = ctx.params;

    await strapi.db.query('api::message.message').updateMany({
      where: {
        conversationId,
        receiver: user.id,
        isRead: false,
      },
      data: {
        isRead: true,
      },
    });

    return { success: true };
  },
}));

