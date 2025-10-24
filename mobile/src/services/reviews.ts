import { apiClient } from './api';
import { Review } from '@/types';

export const reviewsService = {
  // Create a review
  async createReview(bookingId: number, rating: number, comment: string): Promise<Review> {
    const response = await apiClient.post('/reviews', {
      data: {
        booking: bookingId,
        rating,
        comment,
      },
    });
    return response.data.data;
  },

  // Get chef reviews
  async getChefReviews(chefId: number): Promise<Review[]> {
    const response = await apiClient.get('/reviews', {
      params: {
        filters: {
          chef: chefId,
          isApproved: true,
        },
        populate: {
          client: true,
        },
        sort: 'createdAt:desc',
      },
    });
    return response.data.data;
  },

  // Get user's reviews (reviews they've written)
  async getMyReviews(): Promise<Review[]> {
    const response = await apiClient.get('/reviews', {
      params: {
        populate: {
          chef: {
            populate: {
              user: true,
              profilePhoto: true,
            },
          },
          booking: true,
        },
        sort: 'createdAt:desc',
      },
    });
    return response.data.data;
  },
};

