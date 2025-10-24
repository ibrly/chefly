import axios from '@/lib/axios';
import { Favorite } from '@/types';

export const favoritesService = {
  async getFavorites(): Promise<Favorite[]> {
    const response = await axios.get('/users/favorites');
    return response.data;
  },

  async addFavorite(chefId: string): Promise<Favorite> {
    const response = await axios.post('/users/favorites', { chefId });
    return response.data;
  },

  async removeFavorite(chefId: string): Promise<void> {
    await axios.delete(`/users/favorites/${chefId}`);
  },

  async isFavorite(chefId: string): Promise<boolean> {
    const response = await axios.get(`/users/favorites/${chefId}/check`);
    return response.data.isFavorite;
  },
};

