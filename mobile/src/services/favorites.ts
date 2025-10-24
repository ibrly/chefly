import { apiClient } from './api';

export const favoritesService = {
  // Get user's favorites
  async getMyFavorites(): Promise<any[]> {
    const response = await apiClient.get('/favorites/my');
    return response.data.data;
  },

  // Add chef to favorites
  async addFavorite(chefId: number): Promise<any> {
    const response = await apiClient.post('/favorites/add', { chefId });
    return response.data.data;
  },

  // Remove chef from favorites
  async removeFavorite(chefId: number): Promise<void> {
    await apiClient.delete(`/favorites/${chefId}`);
  },

  // Check if chef is favorited
  async isFavorite(chefId: number): Promise<boolean> {
    const response = await apiClient.get(`/favorites/check/${chefId}`);
    return response.data.isFavorite;
  },
};

