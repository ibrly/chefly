import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getConversations = async (req: Request, res: Response) => {
  try {
    const userId = req.user!.userId;

    // Get all users the current user has messaged with
    const messages = await prisma.message.findMany({
      where: {
        OR: [{ senderId: userId }, { receiverId: userId }],
      },
      distinct: ['senderId', 'receiverId'],
      orderBy: { createdAt: 'desc' },
      include: {
        sender: {
          select: {
            id: true,
            username: true,
            avatar: true,
            role: true,
          },
        },
        receiver: {
          select: {
            id: true,
            username: true,
            avatar: true,
            role: true,
          },
        },
      },
    });

    // Group by conversation partner
    const conversationMap = new Map();

    for (const message of messages) {
      const partnerId = message.senderId === userId ? message.receiverId : message.senderId;

      if (!conversationMap.has(partnerId)) {
        // Get unread count
        const unreadCount = await prisma.message.count({
          where: {
            senderId: partnerId,
            receiverId: userId,
            isRead: false,
          },
        });

        conversationMap.set(partnerId, {
          partner: message.senderId === userId ? message.receiver : message.sender,
          lastMessage: message,
          unreadCount,
        });
      }
    }

    const conversations = Array.from(conversationMap.values());

    res.json({ success: true, data: conversations });
  } catch (error) {
    console.error('GetConversations error:', error);
    res.status(500).json({ success: false, error: 'Failed to fetch conversations' });
  }
};

export const getMessages = async (req: Request, res: Response) => {
  try {
    const userId = req.user!.userId;
    const { userId: partnerId } = req.params;
    const { page = 1, limit = 50 } = req.query;
    const skip = (Number(page) - 1) * Number(limit);

    const [messages, total] = await Promise.all([
      prisma.message.findMany({
        where: {
          OR: [
            { senderId: userId, receiverId: partnerId },
            { senderId: partnerId, receiverId: userId },
          ],
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
        orderBy: { createdAt: 'desc' },
        skip,
        take: Number(limit),
      }),
      prisma.message.count({
        where: {
          OR: [
            { senderId: userId, receiverId: partnerId },
            { senderId: partnerId, receiverId: userId },
          ],
        },
      }),
    ]);

    // Mark messages as read
    await prisma.message.updateMany({
      where: {
        senderId: partnerId,
        receiverId: userId,
        isRead: false,
      },
      data: {
        isRead: true,
        readAt: new Date(),
      },
    });

    res.json({
      success: true,
      data: messages.reverse(), // Reverse to show oldest first
      pagination: {
        page: Number(page),
        limit: Number(limit),
        total,
        totalPages: Math.ceil(total / Number(limit)),
      },
    });
  } catch (error) {
    console.error('GetMessages error:', error);
    res.status(500).json({ success: false, error: 'Failed to fetch messages' });
  }
};

export const markConversationAsRead = async (req: Request, res: Response) => {
  try {
    const userId = req.user!.userId;
    const { userId: partnerId } = req.params;

    await prisma.message.updateMany({
      where: {
        senderId: partnerId,
        receiverId: userId,
        isRead: false,
      },
      data: {
        isRead: true,
        readAt: new Date(),
      },
    });

    res.json({ success: true, message: 'Conversation marked as read' });
  } catch (error) {
    console.error('MarkConversationAsRead error:', error);
    res.status(500).json({ success: false, error: 'Failed to mark as read' });
  }
};

