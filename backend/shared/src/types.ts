
export interface JWTPayload {
  userId: string;
  email: string;
  role: 'CLIENT' | 'CHEF' | 'ADMIN' | 'SUPPORT';
}

export interface RefreshTokenPayload {
  userId: string;
}

// Extend Express Request type
declare global {
  namespace Express {
    interface Request {
      user?: JWTPayload;
    }
  }
}

export type UserRole = 'CLIENT' | 'CHEF' | 'ADMIN' | 'SUPPORT';
export type UserStatus = 'ACTIVE' | 'SUSPENDED' | 'DELETED';
export type BookingStatus = 'PENDING' | 'CONFIRMED' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED' | 'REJECTED';
export type PaymentStatus = 'PENDING' | 'COMPLETED' | 'FAILED' | 'REFUNDED';

