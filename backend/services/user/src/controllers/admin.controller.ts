import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const { page = 1, limit = 50, role, status } = req.query;
    const skip = (Number(page) - 1) * Number(limit);

    const where: any = {};
    if (role) where.role = role;
    if (status) where.status = status;

    const [users, total] = await Promise.all([
      prisma.user.findMany({
        where,
        select: {
          id: true,
          email: true,
          username: true,
          role: true,
          status: true,
          firstName: true,
          lastName: true,
          createdAt: true,
          lastLoginAt: true,
        },
        skip,
        take: Number(limit),
        orderBy: { createdAt: 'desc' },
      }),
      prisma.user.count({ where }),
    ]);

    res.json({
      success: true,
      data: users,
      pagination: {
        page: Number(page),
        limit: Number(limit),
        total,
        totalPages: Math.ceil(total / Number(limit)),
      },
    });
  } catch (error) {
    console.error('GetAllUsers error:', error);
    res.status(500).json({ success: false, error: 'Failed to fetch users' });
  }
};

export const updateUserStatus = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!['ACTIVE', 'SUSPENDED', 'DELETED'].includes(status)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid status',
      });
    }

    const user = await prisma.user.update({
      where: { id },
      data: { status },
      select: {
        id: true,
        email: true,
        username: true,
        status: true,
      },
    });

    res.json({ success: true, data: user });
  } catch (error) {
    console.error('UpdateUserStatus error:', error);
    res.status(500).json({ success: false, error: 'Failed to update user status' });
  }
};

export const updateUserRole = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { role } = req.body;

    if (!['CLIENT', 'CHEF', 'ADMIN', 'SUPPORT'].includes(role)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid role',
      });
    }

    const user = await prisma.user.update({
      where: { id },
      data: { role },
      select: {
        id: true,
        email: true,
        username: true,
        role: true,
      },
    });

    res.json({ success: true, data: user });
  } catch (error) {
    console.error('UpdateUserRole error:', error);
    res.status(500).json({ success: false, error: 'Failed to update user role' });
  }
};

export const getPendingChefs = async (req: Request, res: Response) => {
  try {
    const { page = 1, limit = 20 } = req.query;
    const skip = (Number(page) - 1) * Number(limit);

    const [chefs, total] = await Promise.all([
      prisma.chefProfile.findMany({
        where: {
          isApproved: false,
        },
        include: {
          user: {
            select: {
              id: true,
              email: true,
              username: true,
              firstName: true,
              lastName: true,
              phone: true,
              createdAt: true,
            },
          },
        },
        skip,
        take: Number(limit),
        orderBy: { createdAt: 'asc' },
      }),
      prisma.chefProfile.count({
        where: {
          isApproved: false,
        },
      }),
    ]);

    res.json({
      success: true,
      data: chefs,
      pagination: {
        page: Number(page),
        limit: Number(limit),
        total,
        totalPages: Math.ceil(total / Number(limit)),
      },
    });
  } catch (error) {
    console.error('GetPendingChefs error:', error);
    res.status(500).json({ success: false, error: 'Failed to fetch pending chefs' });
  }
};

export const approveChef = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const adminId = req.user!.userId;

    const chef = await prisma.chefProfile.update({
      where: { id },
      data: {
        isApproved: true,
        approvedAt: new Date(),
        approvedBy: adminId,
      },
      include: {
        user: {
          select: {
            id: true,
            email: true,
            username: true,
          },
        },
      },
    });

    // TODO: Send notification to chef

    res.json({
      success: true,
      data: chef,
      message: 'Chef profile approved',
    });
  } catch (error) {
    console.error('ApproveChef error:', error);
    res.status(500).json({ success: false, error: 'Failed to approve chef' });
  }
};

export const rejectChef = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    // For now, we'll just mark as not approved
    // In the future, could add a rejection reason
    const chef = await prisma.chefProfile.update({
      where: { id },
      data: {
        isApproved: false,
      },
      include: {
        user: {
          select: {
            id: true,
            email: true,
            username: true,
          },
        },
      },
    });

    // TODO: Send notification to chef with rejection reason

    res.json({
      success: true,
      data: chef,
      message: 'Chef profile rejected',
    });
  } catch (error) {
    console.error('RejectChef error:', error);
    res.status(500).json({ success: false, error: 'Failed to reject chef' });
  }
};

