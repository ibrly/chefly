import { apiClient } from './api';
import { Booking } from '@/types';

export const bookingsService = {
  // Create a new booking
  async createBooking(data: {
    chef: number;
    bookingDate: string;
    duration: number;
    location: string;
    address?: string;
    specialRequests?: string;
  }): Promise<Booking> {
    const response = await apiClient.post('/bookings', { data });
    return response.data.data;
  },

  // Get user's bookings
  async getMyBookings(): Promise<Booking[]> {
    const response = await apiClient.get('/bookings/my');
    return response.data.data;
  },

  // Get single booking
  async getBooking(id: number): Promise<Booking> {
    const response = await apiClient.get(`/bookings/${id}`, {
      params: {
        populate: {
          client: true,
          chef: {
            populate: {
              user: true,
              profilePhoto: true,
            },
          },
          payment: true,
          review: true,
        },
      },
    });
    return response.data.data;
  },

  // Update booking status
  async updateBookingStatus(
    id: number,
    status: string,
    cancellationReason?: string
  ): Promise<Booking> {
    const response = await apiClient.put(`/bookings/${id}/status`, {
      status,
      cancellationReason,
    });
    return response.data.data;
  },

  // Cancel booking
  async cancelBooking(id: number, reason: string): Promise<Booking> {
    return this.updateBookingStatus(id, 'cancelled', reason);
  },
};

