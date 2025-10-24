import axios from '@/lib/axios';
import { Review } from '@/types';

export const reviewsService = {
  async createReview(data: {
    bookingId: string;
    rating: number;
    comment?: string;
  }): Promise<Review> {
    const response = await axios.post('/bookings/reviews', data);
    return response.data;
  },

  async getChefReviews(chefId: string): Promise<Review[]> {
    const response = await axios.get(`/users/chefs/${chefId}/reviews`);
    return response.data;
  },

  async getMyReviews(): Promise<Review[]> {
    const response = await axios.get('/bookings/my-reviews');
    return response.data;
  },
};

