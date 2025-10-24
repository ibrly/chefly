import { apiClient } from './api';
import { ChefProfile } from '@/types';

export const chefsService = {
  // Get all approved chefs
  async getAllChefs(): Promise<ChefProfile[]> {
    const response = await apiClient.get('/chef-profiles', {
      params: {
        filters: {
          isApproved: true,
        },
        populate: {
          user: true,
          profilePhoto: true,
        },
        sort: 'averageRating:desc',
      },
    });
    return response.data.data;
  },

  // Search chefs
  async searchChefs(params: {
    query?: string;
    cuisineTypes?: string[];
    minRate?: number;
    maxRate?: number;
    location?: string;
  }): Promise<ChefProfile[]> {
    const response = await apiClient.get('/chef-profiles/search', {
      params,
    });
    return response.data.data;
  },

  // Get single chef profile
  async getChefProfile(id: number): Promise<ChefProfile> {
    const response = await apiClient.get(`/chef-profiles/${id}`, {
      params: {
        populate: {
          user: true,
          profilePhoto: true,
          portfolioImages: true,
          certifications: true,
          reviews: {
            populate: {
              client: true,
            },
          },
        },
      },
    });
    return response.data.data;
  },

  // Get featured chefs (top rated)
  async getFeaturedChefs(limit: number = 5): Promise<ChefProfile[]> {
    const response = await apiClient.get('/chef-profiles', {
      params: {
        filters: {
          isApproved: true,
          isAvailable: true,
        },
        populate: {
          user: true,
          profilePhoto: true,
        },
        sort: 'averageRating:desc',
        pagination: {
          limit,
        },
      },
    });
    return response.data.data;
  },
};

