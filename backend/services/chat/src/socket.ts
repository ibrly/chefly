import { Server, Socket } from 'socket.io';
import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';
import { JWTPayload } from '@chefly/shared';

const prisma = new PrismaClient();

interface AuthenticatedSocket extends Socket {
  userId?: string;
}

export const initializeSocketServer = (io: Server) => {
  // Authentication middleware
  io.use((socket: AuthenticatedSocket, next) => {
    const token = socket.handshake.auth.token;

    if (!token) {
      return next(new Error('Authentication error'));
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JWTPayload;
      socket.userId = decoded.userId;
      next();
    } catch (error) {
      next(new Error('Authentication error'));
    }
  });

  io.on('connection', (socket: AuthenticatedSocket) => {
    const userId = socket.userId!;
    console.log(`[Socket.io] User connected: ${userId} (${socket.id})`);

    // Join user's personal room
    socket.join(`user_${userId}`);

    // Handle joining conversation room
    socket.on('join_conversation', (otherUserId: string) => {
      const roomId = [userId, otherUserId].sort().join('_');
      socket.join(roomId);
      console.log(`[Socket.io] User ${userId} joined conversation with ${otherUserId}`);
    });

    // Handle sending message
    socket.on('send_message', async (data: { receiverId: string; content: string }) => {
      try {
        const { receiverId, content } = data;

        // Save message to database
        const message = await prisma.message.create({
          data: {
            senderId: userId,
            receiverId,
            content,
            isRead: false,
          },
          include: {
            sender: {
              select: {
                id: true,
                username: true,
                avatar: true,
              },
            },
            receiver: {
              select: {
                id: true,
                username: true,
                avatar: true,
              },
            },
          },
        });

        // Send to receiver's room
        io.to(`user_${receiverId}`).emit('new_message', message);

        // Confirm to sender
        socket.emit('message_sent', message);

        console.log(`[Socket.io] Message sent from ${userId} to ${receiverId}`);
      } catch (error) {
        console.error('[Socket.io] Send message error:', error);
        socket.emit('message_error', { error: 'Failed to send message' });
      }
    });

    // Handle mark as read
    socket.on('mark_read', async (messageId: string) => {
      try {
        await prisma.message.update({
          where: { id: messageId },
          data: {
            isRead: true,
            readAt: new Date(),
          },
        });

        socket.emit('message_read', { messageId });
      } catch (error) {
        console.error('[Socket.io] Mark read error:', error);
      }
    });

    // Handle typing indicator
    socket.on('typing', (receiverId: string) => {
      io.to(`user_${receiverId}`).emit('user_typing', { userId });
    });

    socket.on('stop_typing', (receiverId: string) => {
      io.to(`user_${receiverId}`).emit('user_stop_typing', { userId });
    });

    // Handle disconnect
    socket.on('disconnect', () => {
      console.log(`[Socket.io] User disconnected: ${userId} (${socket.id})`);
    });
  });
};

