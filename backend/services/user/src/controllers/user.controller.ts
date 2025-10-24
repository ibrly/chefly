import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getMe = async (req: Request, res: Response) => {
  try {
    const userId = req.user!.userId;

    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        email: true,
        username: true,
        role: true,
        status: true,
        firstName: true,
        lastName: true,
        phone: true,
        avatar: true,
        createdAt: true,
        chefProfile: {
          include: {
            reviews: {
              take: 5,
              orderBy: { createdAt: 'desc' },
            },
          },
        },
      },
    });

    if (!user) {
      return res.status(404).json({ success: false, error: 'User not found' });
    }

    res.json({ success: true, data: user });
  } catch (error) {
    console.error('GetMe error:', error);
    res.status(500).json({ success: false, error: 'Failed to fetch user' });
  }
};

export const updateMe = async (req: Request, res: Response) => {
  try {
    const userId = req.user!.userId;
    const { firstName, lastName, phone, avatar } = req.body;

    const user = await prisma.user.update({
      where: { id: userId },
      data: {
        firstName,
        lastName,
        phone,
        avatar,
      },
      select: {
        id: true,
        email: true,
        username: true,
        role: true,
        firstName: true,
        lastName: true,
        phone: true,
        avatar: true,
      },
    });

    res.json({ success: true, data: user });
  } catch (error) {
    console.error('UpdateMe error:', error);
    res.status(500).json({ success: false, error: 'Failed to update user' });
  }
};

export const getUserById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const user = await prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        username: true,
        role: true,
        firstName: true,
        lastName: true,
        avatar: true,
        createdAt: true,
        chefProfile: {
          include: {
            reviews: {
              take: 10,
              orderBy: { createdAt: 'desc' },
              include: {
                client: {
                  select: {
                    username: true,
                    avatar: true,
                  },
                },
              },
            },
          },
        },
      },
    });

    if (!user) {
      return res.status(404).json({ success: false, error: 'User not found' });
    }

    res.json({ success: true, data: user });
  } catch (error) {
    console.error('GetUserById error:', error);
    res.status(500).json({ success: false, error: 'Failed to fetch user' });
  }
};

export const savePushToken = async (req: Request, res: Response) => {
  try {
    const userId = req.user!.userId;
    const { pushToken } = req.body;

    if (!pushToken) {
      return res.status(400).json({ success: false, error: 'Push token required' });
    }

    await prisma.user.update({
      where: { id: userId },
      data: { pushToken },
    });

    res.json({ success: true, message: 'Push token saved' });
  } catch (error) {
    console.error('SavePushToken error:', error);
    res.status(500).json({ success: false, error: 'Failed to save push token' });
  }
};

