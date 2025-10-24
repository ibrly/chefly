// Mock data flag - set to true to use mock data instead of real API
export const USE_MOCK_DATA = true;

// Mock Chefs Data
export const mockChefs = [
  {
    id: '1',
    name: 'Ahmed Hassan',
    email: 'ahmed@example.com',
    role: 'CHEF' as const,
    specialties: ['Egyptian', 'Traditional', 'Middle Eastern'],
    bio: 'Master chef specializing in authentic Egyptian dishes with 15 years of experience. Expert in traditional recipes and modern fusion.',
    experience: 15,
    rating: 4.8,
    reviewCount: 127,
    verified: true,
    hourlyRate: 250,
    location: 'Cairo, Egypt',
    profileImage: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Ahmed',
    createdAt: new Date('2023-01-01').toISOString(),
    updatedAt: new Date('2024-10-01').toISOString(),
  },
  {
    id: '2',
    name: 'Sarah Mohamed',
    email: 'sarah@example.com',
    role: 'CHEF' as const,
    specialties: ['Mediterranean', 'Fusion', 'Healthy'],
    bio: 'Creative chef blending Mediterranean flavors with Egyptian traditions. Specializing in healthy, flavorful dishes.',
    experience: 10,
    rating: 4.9,
    reviewCount: 98,
    verified: true,
    hourlyRate: 300,
    location: 'Alexandria, Egypt',
    profileImage: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah',
    createdAt: new Date('2023-02-01').toISOString(),
    updatedAt: new Date('2024-10-01').toISOString(),
  },
  {
    id: '3',
    name: 'Omar Ali',
    email: 'omar@example.com',
    role: 'CHEF' as const,
    specialties: ['Grills', 'BBQ', 'Meats'],
    bio: 'BBQ specialist and grill master. Famous for perfectly cooked meats and traditional Egyptian grills.',
    experience: 12,
    rating: 4.7,
    reviewCount: 156,
    verified: true,
    hourlyRate: 200,
    location: 'Giza, Egypt',
    profileImage: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Omar',
    createdAt: new Date('2023-03-01').toISOString(),
    updatedAt: new Date('2024-10-01').toISOString(),
  },
  {
    id: '4',
    name: 'Layla Ibrahim',
    email: 'layla@example.com',
    role: 'CHEF' as const,
    specialties: ['Desserts', 'Pastries', 'Baking'],
    bio: 'Award-winning pastry chef creating exquisite desserts and traditional Egyptian sweets.',
    experience: 8,
    rating: 4.9,
    reviewCount: 89,
    verified: true,
    hourlyRate: 180,
    location: 'Cairo, Egypt',
    profileImage: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Layla',
    createdAt: new Date('2023-04-01').toISOString(),
    updatedAt: new Date('2024-10-01').toISOString(),
  },
  {
    id: '5',
    name: 'Karim Youssef',
    email: 'karim@example.com',
    role: 'CHEF' as const,
    specialties: ['International', 'Asian', 'European'],
    bio: 'World-traveled chef bringing international flavors to Egyptian homes. Specializes in Asian and European cuisine.',
    experience: 18,
    rating: 4.8,
    reviewCount: 73,
    verified: true,
    hourlyRate: 350,
    location: 'New Cairo, Egypt',
    profileImage: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Karim',
    createdAt: new Date('2023-05-01').toISOString(),
    updatedAt: new Date('2024-10-01').toISOString(),
  },
  {
    id: '6',
    name: 'Nour Mahmoud',
    email: 'nour@example.com',
    role: 'CHEF' as const,
    specialties: ['Vegan', 'Vegetarian', 'Healthy'],
    bio: 'Passionate about plant-based cooking and healthy lifestyle. Creating delicious vegan versions of Egyptian classics.',
    experience: 6,
    rating: 4.6,
    reviewCount: 54,
    verified: true,
    hourlyRate: 220,
    location: 'Cairo, Egypt',
    profileImage: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Nour',
    createdAt: new Date('2023-06-01').toISOString(),
    updatedAt: new Date('2024-10-01').toISOString(),
  },
  {
    id: '7',
    name: 'Tarek Samir',
    email: 'tarek@example.com',
    role: 'CHEF' as const,
    specialties: ['Seafood', 'Mediterranean', 'Coastal'],
    bio: 'Seafood expert with deep knowledge of Mediterranean and Red Sea catches. Fresh and flavorful dishes guaranteed.',
    experience: 14,
    rating: 4.7,
    reviewCount: 91,
    verified: true,
    hourlyRate: 320,
    location: 'Alexandria, Egypt',
    profileImage: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Tarek',
    createdAt: new Date('2023-07-01').toISOString(),
    updatedAt: new Date('2024-10-01').toISOString(),
  },
  {
    id: '8',
    name: 'Hana Fathy',
    email: 'hana@example.com',
    role: 'CHEF' as const,
    specialties: ['Home Cooking', 'Traditional', 'Comfort Food'],
    bio: 'Traditional Egyptian home-style cooking passed down through generations. Comfort food that feels like home.',
    experience: 20,
    rating: 4.9,
    reviewCount: 203,
    verified: true,
    hourlyRate: 150,
    location: 'Cairo, Egypt',
    profileImage: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Hana',
    createdAt: new Date('2023-08-01').toISOString(),
    updatedAt: new Date('2024-10-01').toISOString(),
  },
];

// Mock Bookings Data
export const mockBookings = [
  {
    id: '1',
    clientId: 'user1',
    chefId: '1',
    chef: mockChefs[0] as any,
    date: '2025-11-15',
    time: '19:00',
    guests: 6,
    location: '123 Zamalek Street, Cairo',
    menuPreferences: 'Traditional Egyptian menu with Koshari, Molokhia, and grilled meats',
    specialRequests: 'One guest is vegetarian',
    totalPrice: 1500,
    status: 'CONFIRMED' as const,
    paymentStatus: 'PAID' as const,
    createdAt: new Date('2025-10-20').toISOString(),
    updatedAt: new Date('2025-10-20').toISOString(),
  },
  {
    id: '2',
    clientId: 'user1',
    chefId: '2',
    chef: mockChefs[1] as any,
    date: '2025-11-25',
    time: '18:30',
    guests: 4,
    location: '456 Maadi Avenue, Cairo',
    menuPreferences: 'Mediterranean fusion with fresh seafood',
    specialRequests: 'Gluten-free options needed',
    totalPrice: 1200,
    status: 'PENDING' as const,
    paymentStatus: 'PENDING' as const,
    createdAt: new Date('2025-10-22').toISOString(),
    updatedAt: new Date('2025-10-22').toISOString(),
  },
  {
    id: '3',
    clientId: 'user1',
    chefId: '3',
    chef: mockChefs[2] as any,
    date: '2025-10-10',
    time: '20:00',
    guests: 8,
    location: '789 Heliopolis Road, Cairo',
    menuPreferences: 'BBQ party with mixed grills',
    specialRequests: 'Outdoor setup preferred',
    totalPrice: 1600,
    status: 'COMPLETED' as const,
    paymentStatus: 'PAID' as const,
    createdAt: new Date('2025-09-15').toISOString(),
    updatedAt: new Date('2025-09-15').toISOString(),
  },
];

// Mock Reviews Data
export const mockReviews = [
  {
    id: '1',
    bookingId: '3',
    chefId: '3',
    userId: 'user1',
    userName: 'Mohamed Ahmed',
    rating: 5,
    comment: 'Amazing experience! Omar is a true grill master. The food was perfectly cooked and delicious. Highly recommend!',
    createdAt: new Date('2025-10-12').toISOString(),
  },
  {
    id: '2',
    bookingId: null,
    chefId: '1',
    userId: 'user2',
    userName: 'Fatma Hassan',
    rating: 5,
    comment: 'Ahmed prepared an authentic Egyptian feast for our family gathering. Everything was perfect from start to finish.',
    createdAt: new Date('2025-10-18').toISOString(),
  },
  {
    id: '3',
    bookingId: null,
    chefId: '1',
    userId: 'user3',
    userName: 'Khaled Mahmoud',
    rating: 4,
    comment: 'Great food and professional service. The Koshari was the best I have ever tasted!',
    createdAt: new Date('2025-10-05').toISOString(),
  },
  {
    id: '4',
    bookingId: null,
    chefId: '2',
    userId: 'user4',
    userName: 'Nadia Ali',
    rating: 5,
    comment: 'Sarah is incredibly talented. Her Mediterranean fusion dishes are creative and delicious. Will definitely book again!',
    createdAt: new Date('2025-10-19').toISOString(),
  },
  {
    id: '5',
    bookingId: null,
    chefId: '2',
    userId: 'user5',
    userName: 'Ahmed Samir',
    rating: 5,
    comment: 'Outstanding chef with great attention to detail. The presentation and taste were both exceptional.',
    createdAt: new Date('2025-10-08').toISOString(),
  },
];

// Mock Favorites Data
export const mockFavorites = [
  {
    id: '1',
    userId: 'user1',
    chefId: '1',
    chef: mockChefs[0],
    createdAt: new Date('2025-10-01').toISOString(),
  },
  {
    id: '2',
    userId: 'user1',
    chefId: '2',
    chef: mockChefs[1],
    createdAt: new Date('2025-10-05').toISOString(),
  },
];

// Mock Notifications Data
export const mockNotifications = [
  {
    id: '1',
    userId: 'user1',
    type: 'booking',
    title: 'Booking Confirmed',
    message: 'Your booking with Ahmed Hassan has been confirmed for Nov 15, 2025',
    read: false,
    createdAt: new Date('2025-10-20').toISOString(),
  },
  {
    id: '2',
    userId: 'user1',
    type: 'message',
    title: 'New Message',
    message: 'Sarah Mohamed sent you a message about your upcoming booking',
    read: false,
    createdAt: new Date('2025-10-22').toISOString(),
  },
  {
    id: '3',
    userId: 'user1',
    type: 'review',
    title: 'Rate Your Experience',
    message: "Don't forget to rate your experience with Omar Ali",
    read: true,
    createdAt: new Date('2025-10-12').toISOString(),
  },
];

// Mock API with delay simulation
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const mockAPI = {
  // Chefs
  getChefs: async (params?: any) => {
    await delay(500);
    let filtered = [...mockChefs];
    
    if (params?.search) {
      const search = params.search.toLowerCase();
      filtered = filtered.filter(
        (chef) =>
          chef.name.toLowerCase().includes(search) ||
          chef.specialties.some((s: string) => s.toLowerCase().includes(search))
      );
    }
    
    if (params?.minPrice) {
      filtered = filtered.filter((chef) => (chef.hourlyRate || 0) >= params.minPrice);
    }
    
    if (params?.maxPrice) {
      filtered = filtered.filter((chef) => (chef.hourlyRate || 0) <= params.maxPrice);
    }
    
    return {
      data: filtered,
      total: filtered.length,
    };
  },
  
  getChefById: async (id: string) => {
    await delay(300);
    const chef = mockChefs.find((c) => c.id === id);
    if (!chef) throw new Error('Chef not found');
    return chef;
  },

  // Bookings
  getMyBookings: async () => {
    await delay(400);
    return mockBookings;
  },

  getBookingById: async (id: string) => {
    await delay(300);
    const booking = mockBookings.find((b) => b.id === id);
    if (!booking) throw new Error('Booking not found');
    return booking;
  },

  getBookings: async () => {
    await delay(400);
    return mockBookings;
  },

  createBooking: async (data: any) => {
    await delay(600);
    const newBooking = {
      id: `booking-${Date.now()}`,
      ...data,
      status: 'PENDING',
      createdAt: new Date().toISOString(),
      paymentStatus: 'PENDING',
    };
    mockBookings.push(newBooking);
    return newBooking;
  },

  // Reviews
  getChefReviews: async (chefId: string) => {
    await delay(300);
    return mockReviews.filter((r) => r.chefId === chefId);
  },

  getReviews: async (chefId: string) => {
    await delay(300);
    return mockReviews.filter((r) => r.chefId === chefId);
  },

  createReview: async (data: any) => {
    await delay(500);
    const newReview = {
      id: `review-${Date.now()}`,
      ...data,
      createdAt: new Date().toISOString(),
    };
    mockReviews.push(newReview);
    return newReview;
  },

  // Favorites
  getFavorites: async () => {
    await delay(400);
    return mockFavorites;
  },

  addFavorite: async (chefId: string) => {
    await delay(300);
    const chef = mockChefs.find((c) => c.id === chefId);
    if (!chef) throw new Error('Chef not found');
    
    const newFavorite = {
      id: `fav-${Date.now()}`,
      userId: 'user1',
      chefId,
      chef,
      createdAt: new Date().toISOString(),
    };
    mockFavorites.push(newFavorite);
    return newFavorite;
  },

  removeFavorite: async (chefId: string) => {
    await delay(300);
    const index = mockFavorites.findIndex((f) => f.chefId === chefId);
    if (index > -1) {
      mockFavorites.splice(index, 1);
    }
  },

  isFavorite: async (chefId: string) => {
    await delay(200);
    return mockFavorites.some((f) => f.chefId === chefId);
  },

  // Payment
  processPayment: async (data: any) => {
    await delay(1500); // Simulate payment processing
    
    // Simulate 90% success rate
    if (Math.random() > 0.1) {
      return {
        success: true,
        transactionId: `txn-${Date.now()}`,
        message: 'Payment processed successfully',
      };
    } else {
      throw new Error('Payment failed. Please try again.');
    }
  },

  // Notifications
  getNotifications: async () => {
    await delay(300);
    return mockNotifications;
  },
};
