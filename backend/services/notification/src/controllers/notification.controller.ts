import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import NotificationService from '../lib/expo';

const prisma = new PrismaClient();
const notificationService = new NotificationService();

export const sendNotification = async (req: Request, res: Response) => {
  try {
    const { userId, title, body, data } = req.body;

    if (!userId || !title || !body) {
      return res.status(400).json({
        success: false,
        error: 'userId, title, and body are required',
      });
    }

    // Get user's push token
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { pushToken: true },
    });

    if (!user || !user.pushToken) {
      return res.status(404).json({
        success: false,
        error: 'User not found or no push token',
      });
    }

    await notificationService.sendPushNotification(
      user.pushToken,
      title,
      body,
      data
    );

    res.json({
      success: true,
      message: 'Notification sent',
    });
  } catch (error) {
    console.error('SendNotification error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to send notification',
    });
  }
};

export const sendToUser = async (req: Request, res: Response) => {
  try {
    const { userId, title, body, data } = req.body;

    if (!userId || !title || !body) {
      return res.status(400).json({
        success: false,
        error: 'userId, title, and body are required',
      });
    }

    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { pushToken: true },
    });

    if (!user || !user.pushToken) {
      return res.json({
        success: false,
        message: 'User has no push token',
      });
    }

    await notificationService.sendPushNotification(
      user.pushToken,
      title,
      body,
      data
    );

    res.json({
      success: true,
      message: 'Notification sent',
    });
  } catch (error) {
    console.error('SendToUser error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to send notification',
    });
  }
};

export const sendToUsers = async (req: Request, res: Response) => {
  try {
    const { userIds, title, body, data } = req.body;

    if (!userIds || !Array.isArray(userIds) || !title || !body) {
      return res.status(400).json({
        success: false,
        error: 'userIds (array), title, and body are required',
      });
    }

    const users = await prisma.user.findMany({
      where: {
        id: { in: userIds },
        pushToken: { not: null },
      },
      select: { pushToken: true },
    });

    const pushTokens = users
      .map((u) => u.pushToken)
      .filter((t): t is string => t !== null);

    if (pushTokens.length === 0) {
      return res.json({
        success: false,
        message: 'No users with push tokens found',
      });
    }

    const results = await notificationService.sendBulkNotifications(
      pushTokens,
      title,
      body,
      data
    );

    res.json({
      success: true,
      message: 'Notifications sent',
      results,
    });
  } catch (error) {
    console.error('SendToUsers error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to send notifications',
    });
  }
};

