import type { Core } from '@strapi/strapi';
import { Server } from 'socket.io';

export default async ({ strapi }: { strapi: Core.Strapi }) => {
  // Initialize Socket.io
  const io = new Server(strapi.server.httpServer, {
    cors: {
      origin: '*', // Configure properly in production
      methods: ['GET', 'POST'],
    },
  });

  // Attach socket.io to strapi instance
  (strapi as any).io = io;

  io.on('connection', (socket) => {
    strapi.log.info(`[Socket.io] User connected: ${socket.id}`);

    // Join user room
    socket.on('join', (userId) => {
      socket.join(`user_${userId}`);
      strapi.log.info(`[Socket.io] User ${userId} joined their room`);
    });

    // Handle chat messages
    socket.on('send_message', async (data) => {
      try {
        const { senderId, receiverId, content } = data;

        // Save message to database
        const message = await strapi.entityService.create('api::message.message', {
          data: {
            sender: senderId,
            receiver: receiverId,
            content,
            isRead: false,
          },
        });

        // Emit to receiver
        io.to(`user_${receiverId}`).emit('new_message', message);

        // Emit back to sender
        socket.emit('message_sent', message);
      } catch (error) {
        strapi.log.error('[Socket.io] Error sending message:', error);
        socket.emit('message_error', { error: 'Failed to send message' });
      }
    });

    socket.on('disconnect', () => {
      strapi.log.info(`[Socket.io] User disconnected: ${socket.id}`);
    });
  });
};

