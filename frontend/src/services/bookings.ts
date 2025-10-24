import axios from '@/lib/axios';
import { Booking } from '@/types';

export const bookingsService = {
  async createBooking(data: {
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
    const response = await axios.post('/bookings', data);
    return response.data;
  },

  async getMyBookings(): Promise<Booking[]> {
    const response = await axios.get('/bookings/my-bookings');
    return response.data;
  },

  async getBookingById(id: string): Promise<Booking> {
    const response = await axios.get(`/bookings/${id}`);
    return response.data;
  },

  async updateBookingStatus(id: string, status: string): Promise<Booking> {
    const response = await axios.patch(`/bookings/${id}/status`, { status });
    return response.data;
  },

  async cancelBooking(id: string): Promise<Booking> {
    const response = await axios.delete(`/bookings/${id}`);
    return response.data;
  },
};

