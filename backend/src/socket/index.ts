import { Server } from 'socket.io';
import { Server as HttpServer } from 'http';

interface AuthenticatedSocket extends Socket {
  userId?: number;
  username?: string;
}

export default (httpServer: HttpServer, strapi: any) => {
  const io = new Server(httpServer, {
    cors: {
      origin: ['http://localhost:8081', 'http://localhost:19006'],
      credentials: true,
    },
  });

  // Authentication middleware
  io.use(async (socket: any, next) => {
    try {
      const token = socket.handshake.auth.token;

      if (!token) {
        return next(new Error('Authentication token required'));
      }

      // Verify JWT token
      const decoded = await strapi.plugins['users-permissions'].services.jwt.verify(token);

      if (!decoded || !decoded.id) {
        return next(new Error('Invalid token'));
      }

      // Attach user info to socket
      socket.userId = decoded.id;

      // Get user details
      const user = await strapi.entityService.findOne(
        'plugin::users-permissions.user',
        decoded.id
      );

      if (!user) {
        return next(new Error('User not found'));
      }

      socket.username = user.username;
      next();
    } catch (error) {
      next(new Error('Authentication failed'));
    }
  });

  io.on('connection', (socket: any) => {
    console.log(`User connected: ${socket.username} (${socket.userId})`);

    // Join user's personal room
    socket.join(`user:${socket.userId}`);

    // Handle sending messages
    socket.on('send_message', async (data: any) => {
      try {
        const { receiverId, content, conversationId } = data;

        // Generate conversation ID if not provided
        const finalConversationId =
          conversationId ||
          [socket.userId, receiverId].sort((a, b) => a - b).join('-');

        // Save message to database
        const message = await strapi.entityService.create('api::message.message', {
          data: {
            conversationId: finalConversationId,
            sender: socket.userId,
            receiver: receiverId,
            content,
            isRead: false,
          },
          populate: {
            sender: true,
            receiver: true,
          },
        });

        // Emit to sender (confirmation)
        socket.emit('message_sent', message);

        // Emit to receiver
        io.to(`user:${receiverId}`).emit('new_message', message);

        console.log(
          `Message from ${socket.userId} to ${receiverId}: ${content.substring(0, 50)}`
        );
      } catch (error) {
        console.error('Error sending message:', error);
        socket.emit('message_error', { error: 'Failed to send message' });
      }
    });

    // Handle typing indicator
    socket.on('typing_start', (data: any) => {
      const { receiverId } = data;
      io.to(`user:${receiverId}`).emit('user_typing', {
        userId: socket.userId,
        username: socket.username,
      });
    });

    socket.on('typing_stop', (data: any) => {
      const { receiverId } = data;
      io.to(`user:${receiverId}`).emit('user_stopped_typing', {
        userId: socket.userId,
      });
    });

    // Handle mark as read
    socket.on('mark_as_read', async (data: any) => {
      try {
        const { conversationId } = data;

        // Update messages in database
        await strapi.db.query('api::message.message').updateMany({
          where: {
            conversationId,
            receiver: socket.userId,
            isRead: false,
          },
          data: {
            isRead: true,
          },
        });

        // Notify the other user
        const messages = await strapi.db.query('api::message.message').findMany({
          where: { conversationId },
          populate: { sender: true },
        });

        if (messages.length > 0) {
          const otherUserId =
            messages[0].sender.id === socket.userId
              ? messages[0].receiver?.id
              : messages[0].sender.id;

          if (otherUserId) {
            io.to(`user:${otherUserId}`).emit('messages_read', { conversationId });
          }
        }
      } catch (error) {
        console.error('Error marking messages as read:', error);
      }
    });

    // Handle disconnect
    socket.on('disconnect', () => {
      console.log(`User disconnected: ${socket.username} (${socket.userId})`);
    });
  });

  return io;
};

