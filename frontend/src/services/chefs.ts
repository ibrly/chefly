import axios from '@/lib/axios';
import { Chef, PaginatedResponse } from '@/types';

export const chefsService = {
  async getAllChefs(params?: {
    search?: string;
    specialties?: string[];
    minRating?: number;
    maxPrice?: number;
    page?: number;
    limit?: number;
  }): Promise<PaginatedResponse<Chef>> {
    const response = await axios.get('/users/chefs', { params });
    return response.data;
  },

  async getChefById(id: string): Promise<Chef> {
    const response = await axios.get(`/users/chefs/${id}`);
    return response.data;
  },

  async getChefReviews(chefId: string): Promise<any[]> {
    const response = await axios.get(`/users/chefs/${chefId}/reviews`);
    return response.data;
  },
};

