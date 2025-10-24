export interface User {
  id: string;
  email: string;
  name: string;
  role: 'CLIENT' | 'CHEF' | 'ADMIN';
  phone?: string;
  profileImage?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Chef extends User {
  bio?: string;
  specialties: string[];
  experience?: number;
  rating?: number;
  reviewCount?: number;
  verified?: boolean;
  hourlyRate?: number;
  location?: string;
  availability?: boolean;
}

export interface Booking {
  id: string;
  clientId: string;
  chefId: string;
  date: string;
  time: string;
  location: string;
  guests: number;
  menuPreferences?: string;
  dietaryRestrictions?: string;
  specialRequests?: string;
  status: 'PENDING' | 'CONFIRMED' | 'COMPLETED' | 'CANCELLED';
  totalPrice: number;
  paymentStatus: 'PENDING' | 'PAID' | 'REFUNDED';
  client?: User;
  chef?: Chef;
  createdAt: string;
  updatedAt: string;
}

export interface Message {
  id: string;
  senderId: string;
  receiverId: string;
  content: string;
  read: boolean;
  createdAt: string;
  sender?: User;
  receiver?: User;
}

export interface Conversation {
  userId: string;
  userName: string;
  userImage?: string;
  lastMessage?: string;
  lastMessageTime?: string;
  unreadCount: number;
}

export interface Review {
  id: string;
  bookingId: string;
  clientId: string;
  chefId: string;
  rating: number;
  comment?: string;
  client?: User;
  chef?: Chef;
  booking?: Booking;
  createdAt: string;
  updatedAt: string;
}

export interface Notification {
  id: string;
  userId: string;
  type: 'booking' | 'message' | 'review' | 'system';
  title: string;
  message: string;
  body?: string;
  data?: any;
  read: boolean;
  createdAt: string;
}

export interface Favorite {
  id: string;
  clientId: string;
  chefId: string;
  chef?: Chef;
  createdAt: string;
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  email: string;
  password: string;
  name: string;
  role: 'CLIENT' | 'CHEF';
  phone?: string;
  bio?: string;
  specialties?: string[];
  experience?: number;
  hourlyRate?: number;
}

export interface ApiResponse<T> {
  data: T;
  message?: string;
  error?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  hasMore: boolean;
}

