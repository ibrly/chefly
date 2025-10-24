import axios from '@/lib/axios';
import { Chef, PaginatedResponse } from '@/types';
import { USE_MOCK_DATA, mockAPI } from '@/lib/mockData';

export const chefsService = {
  async getAllChefs(params?: {
    search?: string;
    specialties?: string[];
    minRating?: number;
    maxPrice?: number;
    page?: number;
    limit?: number;
  }): Promise<PaginatedResponse<Chef>> {
    // Use mock data if backend is not available
    if (USE_MOCK_DATA) {
      const { data, total } = await mockAPI.getChefs(params);
      return {
        data,
        total,
        page: params?.page || 1,
        limit: params?.limit || 10,
        hasMore: false,
      };
    }

    const response = await axios.get('/users/chefs', { params });
    return response.data;
  },

  async getChefById(id: string): Promise<Chef> {
    if (USE_MOCK_DATA) {
      const chef = await mockAPI.getChefById(id);
      if (!chef) throw new Error('Chef not found');
      return chef;
    }

    const response = await axios.get(`/users/chefs/${id}`);
    return response.data;
  },

  async getChefReviews(chefId: string): Promise<any[]> {
    if (USE_MOCK_DATA) {
      return await mockAPI.getReviews(chefId);
    }

    const response = await axios.get(`/users/chefs/${chefId}/reviews`);
    return response.data;
  },
};

