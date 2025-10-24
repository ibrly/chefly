import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getMyBookings = async (req: Request, res: Response) => {
  try {
    const userId = req.user!.userId;
    const role = req.user!.role;
    const { status, page = 1, limit = 20 } = req.query;
    const skip = (Number(page) - 1) * Number(limit);

    const where: any = role === 'CHEF' ? { chefId: userId } : { clientId: userId };
    if (status) where.status = status;

    const [bookings, total] = await Promise.all([
      prisma.booking.findMany({
        where,
        include: {
          client: {
            select: {
              id: true,
              username: true,
              avatar: true,
              phone: true,
            },
          },
          chef: {
            select: {
              id: true,
              username: true,
              avatar: true,
              phone: true,
            },
          },
          chefProfile: {
            select: {
              bio: true,
              cuisineTypes: true,
              rating: true,
              pricePerHour: true,
            },
          },
          payment: true,
        },
        skip,
        take: Number(limit),
        orderBy: { eventDate: 'desc' },
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
    console.error('GetMyBookings error:', error);
    res.status(500).json({ success: false, error: 'Failed to fetch bookings' });
  }
};

export const getBookingById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const userId = req.user!.userId;

    const booking = await prisma.booking.findUnique({
      where: { id },
      include: {
        client: {
          select: {
            id: true,
            username: true,
            avatar: true,
            phone: true,
            email: true,
          },
        },
        chef: {
          select: {
            id: true,
            username: true,
            avatar: true,
            phone: true,
          },
        },
        chefProfile: true,
        payment: true,
        review: true,
      },
    });

    if (!booking) {
      return res.status(404).json({ success: false, error: 'Booking not found' });
    }

    // Check if user is authorized to view this booking
    if (booking.clientId !== userId && booking.chefId !== userId) {
      return res.status(403).json({ success: false, error: 'Not authorized' });
    }

    res.json({ success: true, data: booking });
  } catch (error) {
    console.error('GetBookingById error:', error);
    res.status(500).json({ success: false, error: 'Failed to fetch booking' });
  }
};

export const createBooking = async (req: Request, res: Response) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }

    const clientId = req.user!.userId;
    const { chefId, eventDate, eventDuration, eventLocation, guestCount, specialRequests } =
      req.body;

    // Get chef profile to calculate price
    const chefProfile = await prisma.chefProfile.findUnique({
      where: { userId: chefId },
    });

    if (!chefProfile) {
      return res.status(404).json({ success: false, error: 'Chef not found' });
    }

    if (!chefProfile.isApproved || !chefProfile.isAvailable) {
      return res.status(400).json({ success: false, error: 'Chef not available' });
    }

    // Calculate total price
    const totalPrice = Number(chefProfile.pricePerHour) * eventDuration;

    const booking = await prisma.booking.create({
      data: {
        clientId,
        chefId,
        eventDate: new Date(eventDate),
        eventDuration,
        eventLocation,
        guestCount,
        specialRequests,
        totalPrice,
        status: 'PENDING',
      },
      include: {
        client: {
          select: {
            id: true,
            username: true,
            avatar: true,
          },
        },
        chef: {
          select: {
            id: true,
            username: true,
            avatar: true,
          },
        },
        chefProfile: true,
      },
    });

    // TODO: Send notification to chef

    res.status(201).json({
      success: true,
      data: booking,
      message: 'Booking created successfully',
    });
  } catch (error) {
    console.error('CreateBooking error:', error);
    res.status(500).json({ success: false, error: 'Failed to create booking' });
  }
};

export const updateBookingStatus = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const userId = req.user!.userId;
    const role = req.user!.role;

    const booking = await prisma.booking.findUnique({
      where: { id },
    });

    if (!booking) {
      return res.status(404).json({ success: false, error: 'Booking not found' });
    }

    // Check authorization
    if (role === 'CHEF' && booking.chefId !== userId) {
      return res.status(403).json({ success: false, error: 'Not authorized' });
    }

    if (role === 'CLIENT' && booking.clientId !== userId) {
      return res.status(403).json({ success: false, error: 'Not authorized' });
    }

    // Validate status transitions
    if (role === 'CHEF' && !['CONFIRMED', 'REJECTED'].includes(status)) {
      return res.status(400).json({ success: false, error: 'Invalid status for chef' });
    }

    if (role === 'CLIENT' && status !== 'CANCELLED') {
      return res.status(400).json({ success: false, error: 'Clients can only cancel bookings' });
    }

    const updated = await prisma.booking.update({
      where: { id },
      data: { status },
      include: {
        client: {
          select: {
            id: true,
            username: true,
          },
        },
        chef: {
          select: {
            id: true,
            username: true,
          },
        },
      },
    });

    // TODO: Send notification

    res.json({
      success: true,
      data: updated,
      message: `Booking ${status.toLowerCase()}`,
    });
  } catch (error) {
    console.error('UpdateBookingStatus error:', error);
    res.status(500).json({ success: false, error: 'Failed to update booking status' });
  }
};

export const completeBooking = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const userId = req.user!.userId;

    const booking = await prisma.booking.findUnique({
      where: { id },
    });

    if (!booking) {
      return res.status(404).json({ success: false, error: 'Booking not found' });
    }

    if (booking.chefId !== userId) {
      return res.status(403).json({ success: false, error: 'Only chef can complete booking' });
    }

    if (booking.status !== 'CONFIRMED' && booking.status !== 'IN_PROGRESS') {
      return res.status(400).json({ success: false, error: 'Booking must be confirmed first' });
    }

    const updated = await prisma.booking.update({
      where: { id },
      data: { status: 'COMPLETED' },
    });

    // TODO: Send notification to client to leave review

    res.json({
      success: true,
      data: updated,
      message: 'Booking marked as completed',
    });
  } catch (error) {
    console.error('CompleteBooking error:', error);
    res.status(500).json({ success: false, error: 'Failed to complete booking' });
  }
};

