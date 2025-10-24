// Mock data for development when backend is not available
import { Chef, Review, Booking } from '@/types';

export const mockChefs: Chef[] = [
  {
    id: '1',
    email: 'mario.rossi@example.com',
    name: 'Chef Mario Rossi',
    role: 'CHEF',
    bio: 'Authentic Italian chef with 15+ years of experience in fine dining. Specialized in traditional pasta, risotto, and regional Italian cuisine.',
    specialties: ['Italian', 'Pasta', 'Mediterranean', 'Fine Dining'],
    experience: 15,
    rating: 4.9,
    reviewCount: 127,
    verified: true,
    hourlyRate: 85,
    location: 'New York, NY',
    profileImage: 'https://i.pravatar.cc/150?img=12',
    createdAt: '2023-01-15T10:00:00Z',
    updatedAt: '2024-01-10T15:30:00Z',
  },
  {
    id: '2',
    email: 'sophie.chen@example.com',
    name: 'Chef Sophie Chen',
    role: 'CHEF',
    bio: 'French-trained pastry chef and fine dining expert. Creating memorable culinary experiences with a focus on seasonal ingredients.',
    specialties: ['French', 'Pastry', 'Desserts', 'Fine Dining'],
    experience: 12,
    rating: 4.8,
    reviewCount: 98,
    verified: true,
    hourlyRate: 95,
    location: 'Los Angeles, CA',
    profileImage: 'https://i.pravatar.cc/150?img=5',
    createdAt: '2023-02-20T10:00:00Z',
    updatedAt: '2024-01-12T10:00:00Z',
  },
  {
    id: '3',
    email: 'hiroshi.tanaka@example.com',
    name: 'Chef Hiroshi Tanaka',
    role: 'CHEF',
    bio: 'Master of traditional Japanese cuisine with expertise in sushi, ramen, and kaiseki. Trained in Tokyo for over 20 years.',
    specialties: ['Japanese', 'Sushi', 'Ramen', 'Asian Fusion'],
    experience: 20,
    rating: 5.0,
    reviewCount: 203,
    verified: true,
    hourlyRate: 120,
    location: 'San Francisco, CA',
    profileImage: 'https://i.pravatar.cc/150?img=33',
    createdAt: '2023-01-10T10:00:00Z',
    updatedAt: '2024-01-15T10:00:00Z',
  },
  {
    id: '4',
    email: 'maria.garcia@example.com',
    name: 'Chef Maria Garcia',
    role: 'CHEF',
    bio: 'Spanish and Mediterranean cuisine specialist. Known for authentic paella, tapas, and seafood dishes.',
    specialties: ['Spanish', 'Mediterranean', 'Seafood', 'Tapas'],
    experience: 10,
    rating: 4.7,
    reviewCount: 76,
    verified: true,
    hourlyRate: 75,
    location: 'Miami, FL',
    profileImage: 'https://i.pravatar.cc/150?img=9',
    createdAt: '2023-03-15T10:00:00Z',
    updatedAt: '2024-01-08T10:00:00Z',
  },
  {
    id: '5',
    email: 'jean.pierre@example.com',
    name: 'Chef Jean-Pierre Dubois',
    role: 'CHEF',
    bio: 'Classically trained French chef specializing in haute cuisine and modern French cooking techniques.',
    specialties: ['French', 'Fine Dining', 'Wine Pairing', 'Molecular Gastronomy'],
    experience: 18,
    rating: 4.9,
    reviewCount: 156,
    verified: true,
    hourlyRate: 110,
    location: 'Chicago, IL',
    profileImage: 'https://i.pravatar.cc/150?img=15',
    createdAt: '2023-01-05T10:00:00Z',
    updatedAt: '2024-01-14T10:00:00Z',
  },
  {
    id: '6',
    email: 'raj.patel@example.com',
    name: 'Chef Raj Patel',
    role: 'CHEF',
    bio: 'Expert in Indian and South Asian cuisines. Creating authentic flavors with traditional spices and modern presentation.',
    specialties: ['Indian', 'Curry', 'Vegetarian', 'Tandoori'],
    experience: 14,
    rating: 4.8,
    reviewCount: 112,
    verified: true,
    hourlyRate: 70,
    location: 'Austin, TX',
    profileImage: 'https://i.pravatar.cc/150?img=25',
    createdAt: '2023-02-10T10:00:00Z',
    updatedAt: '2024-01-11T10:00:00Z',
  },
];

export const mockReviews: Review[] = [
  {
    id: '1',
    bookingId: 'b1',
    clientId: 'c1',
    chefId: '1',
    rating: 5,
    comment: 'Absolutely amazing experience! Chef Mario prepared the most authentic Italian meal we\'ve ever had. Every dish was perfectly executed and beautifully presented.',
    createdAt: '2024-01-05T19:30:00Z',
    updatedAt: '2024-01-05T19:30:00Z',
    client: {
      id: 'c1',
      name: 'Sarah Johnson',
      email: 'sarah.j@example.com',
      role: 'CLIENT',
      profileImage: 'https://i.pravatar.cc/150?img=1',
      createdAt: '2023-01-01T10:00:00Z',
      updatedAt: '2024-01-01T10:00:00Z',
    },
  },
  {
    id: '2',
    bookingId: 'b2',
    clientId: 'c2',
    chefId: '2',
    rating: 5,
    comment: 'Chef Sophie\'s desserts were out of this world! The attention to detail and flavor combinations were exceptional.',
    createdAt: '2024-01-08T20:00:00Z',
    updatedAt: '2024-01-08T20:00:00Z',
    client: {
      id: 'c2',
      name: 'Michael Chen',
      email: 'michael.c@example.com',
      role: 'CLIENT',
      profileImage: 'https://i.pravatar.cc/150?img=11',
      createdAt: '2023-02-01T10:00:00Z',
      updatedAt: '2024-01-02T10:00:00Z',
    },
  },
];

export const mockBookings: Booking[] = [
  {
    id: 'b1',
    clientId: 'c1',
    chefId: '1',
    date: '2024-12-25',
    time: '18:00',
    location: '123 Main St, New York, NY 10001',
    guests: 6,
    menuPreferences: 'Traditional Italian Christmas dinner',
    dietaryRestrictions: 'One guest is vegetarian',
    specialRequests: 'Please include tiramisu for dessert',
    status: 'CONFIRMED',
    totalPrice: 510,
    paymentStatus: 'PAID',
    createdAt: '2024-01-10T10:00:00Z',
    updatedAt: '2024-01-10T10:00:00Z',
    chef: mockChefs[0],
  },
  {
    id: 'b2',
    clientId: 'c2',
    chefId: '2',
    date: '2024-12-31',
    time: '19:00',
    location: '456 Oak Ave, Los Angeles, CA 90001',
    guests: 8,
    menuPreferences: 'French fine dining with wine pairing',
    status: 'PENDING',
    totalPrice: 760,
    paymentStatus: 'PENDING',
    createdAt: '2024-01-12T10:00:00Z',
    updatedAt: '2024-01-12T10:00:00Z',
    chef: mockChefs[1],
  },
];

// Helper function to simulate API delay
export const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// Mock API responses
export const mockAPI = {
  getChefs: async (params?: any): Promise<{ data: Chef[]; total: number }> => {
    await delay(500); // Simulate network delay
    let filteredChefs = [...mockChefs];

    if (params?.search) {
      const search = params.search.toLowerCase();
      filteredChefs = filteredChefs.filter(
        (chef) =>
          chef.name.toLowerCase().includes(search) ||
          chef.bio?.toLowerCase().includes(search) ||
          chef.specialties.some((s) => s.toLowerCase().includes(search))
      );
    }

    return {
      data: filteredChefs,
      total: filteredChefs.length,
    };
  },

  getChefById: async (id: string): Promise<Chef | undefined> => {
    await delay(300);
    return mockChefs.find((chef) => chef.id === id);
  },

  getReviews: async (chefId: string): Promise<Review[]> => {
    await delay(300);
    return mockReviews.filter((review) => review.chefId === chefId);
  },

  getBookings: async (): Promise<Booking[]> => {
    await delay(500);
    return mockBookings;
  },
};

export const USE_MOCK_DATA = true; // Toggle this to switch between mock and real API

