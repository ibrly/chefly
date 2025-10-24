import axios from '@/lib/axios';
import { Booking } from '@/types';
import { USE_MOCK_DATA, mockAPI } from '@/lib/mockData';

export async function createBooking(data: {
  chefId: string;
  date: string;
  time: string;
  location: string;
  guests: number;
  menuPreferences?: string;
  dietaryRestrictions?: string;
  specialRequests?: string;
  totalPrice: number;
}): Promise<Booking> {
  if (USE_MOCK_DATA) {
    // Mock booking creation
    await new Promise((resolve) => setTimeout(resolve, 500));
    return {
      id: 'new-booking',
      clientId: 'current-user',
      ...data,
      status: 'PENDING',
      paymentStatus: 'PENDING',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    } as Booking;
  }

  const response = await axios.post('/bookings', data);
  return response.data;
}

export async function getMyBookings(): Promise<Booking[]> {
  if (USE_MOCK_DATA) {
    return await mockAPI.getMyBookings();
  }

  const response = await axios.get('/bookings/my-bookings');
  return response.data;
}

export async function getBookingById(id: string): Promise<Booking> {
  if (USE_MOCK_DATA) {
    return await mockAPI.getBookingById(id);
  }

  const response = await axios.get(`/bookings/${id}`);
  return response.data;
}

export async function updateBookingStatus(id: string, status: string): Promise<Booking> {
  if (USE_MOCK_DATA) {
    const bookings = await mockAPI.getMyBookings();
    const booking = bookings.find((b) => b.id === id);
    if (!booking) throw new Error('Booking not found');
    return { ...booking, status: status as any };
  }

  const response = await axios.patch(`/bookings/${id}/status`, { status });
  return response.data;
}

export async function cancelBooking(id: string): Promise<Booking> {
  if (USE_MOCK_DATA) {
    const bookings = await mockAPI.getMyBookings();
    const booking = bookings.find((b) => b.id === id);
    if (!booking) throw new Error('Booking not found');
    return { ...booking, status: 'CANCELLED' };
  }

  const response = await axios.delete(`/bookings/${id}`);
  return response.data;
}

// Legacy export for backward compatibility
export const bookingsService = {
  createBooking,
  getMyBookings,
  getBookingById,
  updateBookingStatus,
  cancelBooking,
};

