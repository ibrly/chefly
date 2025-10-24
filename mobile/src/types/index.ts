export interface User {
  id: number;
  username: string;
  email: string;
  confirmed: boolean;
  blocked: boolean;
  role: {
    id: number;
    name: string;
    type: 'client' | 'chef' | 'admin';
  };
  createdAt: string;
  updatedAt: string;
}

export interface ChefProfile {
  id: number;
  bio: string;
  specialties: string[];
  cuisineTypes: string[];
  yearsOfExperience: number;
  hourlyRate: number;
  profilePhoto: Media;
  portfolioImages: Media[];
  certifications: Media[];
  averageRating: number;
  totalBookings: number;
  location: string;
  isAvailable: boolean;
  user: User;
}

export interface Booking {
  id: number;
  client: User;
  chef: User;
  date: string;
  duration: number;
  status: 'pending' | 'confirmed' | 'in-progress' | 'completed' | 'cancelled';
  totalPrice: number;
  location: string;
  specialRequests?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Review {
  id: number;
  booking: Booking;
  rating: number;
  comment: string;
  client: User;
  chef: User;
  createdAt: string;
}

export interface Message {
  id: number;
  conversationId: string;
  sender: User;
  receiver: User;
  content: string;
  isRead: boolean;
  createdAt: string;
}

export interface Payment {
  id: number;
  booking: Booking;
  amount: number;
  paymobTransactionId: string;
  status: 'pending' | 'completed' | 'failed' | 'refunded';
  paymentMethod: string;
  createdAt: string;
}

export interface Media {
  id: number;
  name: string;
  url: string;
  mime: string;
  size: number;
}

export type RootStackParamList = {
  '(auth)': undefined;
  '(tabs)': undefined;
  'chef-profile': { chefId: number };
  'booking-details': { bookingId: number };
  chat: { userId: number; userName: string };
};

