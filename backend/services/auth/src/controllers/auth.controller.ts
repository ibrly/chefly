import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { PrismaClient } from '@prisma/client';
import {
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
  hashPassword,
  comparePassword,
} from '@chefly/shared';

const prisma = new PrismaClient();

export const register = async (req: Request, res: Response) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }

    const { email, username, password, role = 'CLIENT', firstName, lastName } = req.body;

    // Check if user exists
    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [{ email }, { username }],
      },
    });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        error: existingUser.email === email ? 'Email already exists' : 'Username already exists',
      });
    }

    // Hash password
    const hashedPassword = await hashPassword(password);

    // Create user
    const user = await prisma.user.create({
      data: {
        email,
        username,
        password: hashedPassword,
        role,
        firstName,
        lastName,
      },
      select: {
        id: true,
        email: true,
        username: true,
        role: true,
        status: true,
        createdAt: true,
      },
    });

    // Generate tokens
    const accessToken = generateAccessToken({
      userId: user.id,
      email: user.email,
      role: user.role,
    });

    const refreshToken = generateRefreshToken({ userId: user.id });

    // Save refresh token
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 7);

    await prisma.refreshToken.create({
      data: {
        userId: user.id,
        token: refreshToken,
        expiresAt,
      },
    });

    res.status(201).json({
      success: true,
      data: {
        user,
        accessToken,
        refreshToken,
      },
    });
  } catch (error) {
    console.error('Register error:', error);
    res.status(500).json({ success: false, error: 'Registration failed' });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }

    const { email, password } = req.body;

    // Find user
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user || !user.password) {
      return res.status(401).json({
        success: false,
        error: 'Invalid credentials',
      });
    }

    // Check if user is suspended
    if (user.status === 'SUSPENDED') {
      return res.status(403).json({
        success: false,
        error: 'Account suspended. Please contact support.',
      });
    }

    // Verify password
    const isValidPassword = await comparePassword(password, user.password);

    if (!isValidPassword) {
      return res.status(401).json({
        success: false,
        error: 'Invalid credentials',
      });
    }

    // Generate tokens
    const accessToken = generateAccessToken({
      userId: user.id,
      email: user.email,
      role: user.role,
    });

    const refreshToken = generateRefreshToken({ userId: user.id });

    // Save refresh token
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 7);

    await prisma.refreshToken.create({
      data: {
        userId: user.id,
        token: refreshToken,
        expiresAt,
      },
    });

    // Update last login
    await prisma.user.update({
      where: { id: user.id },
      data: { lastLoginAt: new Date() },
    });

    res.json({
      success: true,
      data: {
        user: {
          id: user.id,
          email: user.email,
          username: user.username,
          role: user.role,
          status: user.status,
        },
        accessToken,
        refreshToken,
      },
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ success: false, error: 'Login failed' });
  }
};

export const refreshToken = async (req: Request, res: Response) => {
  try {
    const { refreshToken } = req.body;

    if (!refreshToken) {
      return res.status(400).json({
        success: false,
        error: 'Refresh token required',
      });
    }

    // Verify refresh token
    const decoded = verifyRefreshToken(refreshToken);

    // Check if token exists in database
    const tokenRecord = await prisma.refreshToken.findUnique({
      where: { token: refreshToken },
      include: { user: true },
    });

    if (!tokenRecord || tokenRecord.expiresAt < new Date()) {
      return res.status(401).json({
        success: false,
        error: 'Invalid or expired refresh token',
      });
    }

    // Generate new access token
    const accessToken = generateAccessToken({
      userId: tokenRecord.user.id,
      email: tokenRecord.user.email,
      role: tokenRecord.user.role,
    });

    res.json({
      success: true,
      data: { accessToken },
    });
  } catch (error) {
    console.error('Refresh token error:', error);
    res.status(401).json({ success: false, error: 'Invalid refresh token' });
  }
};

export const logout = async (req: Request, res: Response) => {
  try {
    const { refreshToken } = req.body;

    if (refreshToken) {
      // Delete refresh token
      await prisma.refreshToken.deleteMany({
        where: { token: refreshToken },
      });
    }

    res.json({
      success: true,
      message: 'Logged out successfully',
    });
  } catch (error) {
    console.error('Logout error:', error);
    res.status(500).json({ success: false, error: 'Logout failed' });
  }
};

// OAuth placeholders (implement with Passport.js)
export const googleAuth = (req: Request, res: Response) => {
  res.status(501).json({
    success: false,
    error: 'Google OAuth not yet implemented',
  });
};

export const googleCallback = (req: Request, res: Response) => {
  res.status(501).json({
    success: false,
    error: 'Google OAuth not yet implemented',
  });
};

export const facebookAuth = (req: Request, res: Response) => {
  res.status(501).json({
    success: false,
    error: 'Facebook OAuth not yet implemented',
  });
};

export const facebookCallback = (req: Request, res: Response) => {
  res.status(501).json({
    success: false,
    error: 'Facebook OAuth not yet implemented',
  });
};

