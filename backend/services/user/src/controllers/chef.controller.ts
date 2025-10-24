import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getAllChefs = async (req: Request, res: Response) => {
  try {
    const { page = 1, limit = 20 } = req.query;
    const skip = (Number(page) - 1) * Number(limit);

    const [chefs, total] = await Promise.all([
      prisma.chefProfile.findMany({
        where: {
          isApproved: true,
          isAvailable: true,
        },
        include: {
          user: {
            select: {
              id: true,
              username: true,
              avatar: true,
            },
          },
        },
        skip,
        take: Number(limit),
        orderBy: { rating: 'desc' },
      }),
      prisma.chefProfile.count({
        where: {
          isApproved: true,
          isAvailable: true,
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
    console.error('GetAllChefs error:', error);
    res.status(500).json({ success: false, error: 'Failed to fetch chefs' });
  }
};

export const searchChefs = async (req: Request, res: Response) => {
  try {
    const { cuisine, minPrice, maxPrice, rating, page = 1, limit = 20 } = req.query;
    const skip = (Number(page) - 1) * Number(limit);

    const where: any = {
      isApproved: true,
      isAvailable: true,
    };

    if (cuisine) {
      where.cuisineTypes = {
        has: String(cuisine),
      };
    }

    if (minPrice || maxPrice) {
      where.pricePerHour = {};
      if (minPrice) where.pricePerHour.gte = Number(minPrice);
      if (maxPrice) where.pricePerHour.lte = Number(maxPrice);
    }

    if (rating) {
      where.rating = {
        gte: Number(rating),
      };
    }

    const [chefs, total] = await Promise.all([
      prisma.chefProfile.findMany({
        where,
        include: {
          user: {
            select: {
              id: true,
              username: true,
              avatar: true,
            },
          },
        },
        skip,
        take: Number(limit),
        orderBy: { rating: 'desc' },
      }),
      prisma.chefProfile.count({ where }),
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
    console.error('SearchChefs error:', error);
    res.status(500).json({ success: false, error: 'Failed to search chefs' });
  }
};

export const getChefById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const chef = await prisma.chefProfile.findUnique({
      where: { id },
      include: {
        user: {
          select: {
            id: true,
            username: true,
            avatar: true,
            firstName: true,
            lastName: true,
          },
        },
        reviews: {
          take: 20,
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
    });

    if (!chef) {
      return res.status(404).json({ success: false, error: 'Chef not found' });
    }

    res.json({ success: true, data: chef });
  } catch (error) {
    console.error('GetChefById error:', error);
    res.status(500).json({ success: false, error: 'Failed to fetch chef' });
  }
};

export const createChefProfile = async (req: Request, res: Response) => {
  try {
    const userId = req.user!.userId;

    // Check if chef profile already exists
    const existing = await prisma.chefProfile.findUnique({
      where: { userId },
    });

    if (existing) {
      return res.status(400).json({
        success: false,
        error: 'Chef profile already exists',
      });
    }

    const {
      bio,
      cuisineTypes,
      specialties,
      pricePerHour,
      location,
      availability,
      profileImage,
      portfolioImages,
      yearsOfExperience,
      certifications,
    } = req.body;

    const chef = await prisma.chefProfile.create({
      data: {
        userId,
        bio,
        cuisineTypes,
        specialties: specialties || [],
        pricePerHour,
        location,
        availability,
        profileImage,
        portfolioImages: portfolioImages || [],
        yearsOfExperience,
        certifications,
        isApproved: false, // Requires admin approval
      },
      include: {
        user: {
          select: {
            id: true,
            username: true,
            email: true,
          },
        },
      },
    });

    res.status(201).json({
      success: true,
      data: chef,
      message: 'Chef profile created. Awaiting admin approval.',
    });
  } catch (error) {
    console.error('CreateChefProfile error:', error);
    res.status(500).json({ success: false, error: 'Failed to create chef profile' });
  }
};

export const updateChefProfile = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const userId = req.user!.userId;

    // Verify ownership
    const chef = await prisma.chefProfile.findUnique({
      where: { id },
    });

    if (!chef || chef.userId !== userId) {
      return res.status(403).json({
        success: false,
        error: 'Not authorized',
      });
    }

    const {
      bio,
      cuisineTypes,
      specialties,
      pricePerHour,
      isAvailable,
      location,
      availability,
      profileImage,
      portfolioImages,
      yearsOfExperience,
      certifications,
    } = req.body;

    const updated = await prisma.chefProfile.update({
      where: { id },
      data: {
        bio,
        cuisineTypes,
        specialties,
        pricePerHour,
        isAvailable,
        location,
        availability,
        profileImage,
        portfolioImages,
        yearsOfExperience,
        certifications,
      },
    });

    res.json({ success: true, data: updated });
  } catch (error) {
    console.error('UpdateChefProfile error:', error);
    res.status(500).json({ success: false, error: 'Failed to update chef profile' });
  }
};

