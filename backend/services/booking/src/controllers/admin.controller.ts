import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getAllBookings = async (req: Request, res: Response) => {
  try {
    const { status, page = 1, limit = 50 } = req.query;
    const skip = (Number(page) - 1) * Number(limit);

    const where: any = {};
    if (status) where.status = status;

    const [bookings, total] = await Promise.all([
      prisma.booking.findMany({
        where,
        include: {
          client: {
            select: {
              id: true,
              username: true,
              email: true,
            },
          },
          chef: {
            select: {
              id: true,
              username: true,
              email: true,
            },
          },
          payment: true,
        },
        skip,
        take: Number(limit),
        orderBy: { createdAt: 'desc' },
      }),
      prisma.booking.count({ where }),
    ]);

    res.json({
      success: true,
      data: bookings,
      pagination: {
        page: Number(page),
        limit: Number(limit),
        total,
        totalPages: Math.ceil(total / Number(limit)),
      },
    });
  } catch (error) {
    console.error('GetAllBookings error:', error);
    res.status(500).json({ success: false, error: 'Failed to fetch bookings' });
  }
};

export const reviewBooking = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { reviewNotes } = req.body;
    const adminId = req.user!.userId;

    const booking = await prisma.booking.update({
      where: { id },
      data: {
        reviewedBy: adminId,
        reviewedAt: new Date(),
        reviewNotes,
      },
      include: {
        client: {
          select: {
            username: true,
            email: true,
          },
        },
        chef: {
          select: {
            username: true,
            email: true,
          },
        },
      },
    });

    res.json({
      success: true,
      data: booking,
      message: 'Booking reviewed successfully',
    });
  } catch (error) {
    console.error('ReviewBooking error:', error);
    res.status(500).json({ success: false, error: 'Failed to review booking' });
  }
};

export const getBookingStats = async (req: Request, res: Response) => {
  try {
    const [
      total,
      pending,
      confirmed,
      completed,
      cancelled,
      totalRevenue,
    ] = await Promise.all([
      prisma.booking.count(),
      prisma.booking.count({ where: { status: 'PENDING' } }),
      prisma.booking.count({ where: { status: 'CONFIRMED' } }),
      prisma.booking.count({ where: { status: 'COMPLETED' } }),
      prisma.booking.count({ where: { status: 'CANCELLED' } }),
      prisma.booking.aggregate({
        _sum: {
          totalPrice: true,
        },
        where: {
          status: 'COMPLETED',
        },
      }),
    ]);

    res.json({
      success: true,
      data: {
        total,
        byStatus: {
          pending,
          confirmed,
          completed,
          cancelled,
        },
        totalRevenue: totalRevenue._sum.totalPrice || 0,
      },
    });
  } catch (error) {
    console.error('GetBookingStats error:', error);
    res.status(500).json({ success: false, error: 'Failed to fetch stats' });
  }
};

