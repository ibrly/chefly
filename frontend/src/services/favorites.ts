import axios from '@/lib/axios';
import { Favorite } from '@/types';
import { USE_MOCK_DATA, mockChefs } from '@/lib/mockData';

export const favoritesService = {
  async getFavorites(): Promise<Favorite[]> {
    if (USE_MOCK_DATA) {
      // Return mock favorites (first 2 chefs)
      await new Promise((resolve) => setTimeout(resolve, 300));
      return [
        {
          id: 'fav1',
          clientId: 'current-user',
          chefId: '1',
          chef: mockChefs[0],
          createdAt: new Date().toISOString(),
        },
        {
          id: 'fav2',
          clientId: 'current-user',
          chefId: '2',
          chef: mockChefs[1],
          createdAt: new Date().toISOString(),
        },
      ];
    }

    const response = await axios.get('/users/favorites');
    return response.data;
  },

  async addFavorite(chefId: string): Promise<Favorite> {
    if (USE_MOCK_DATA) {
      await new Promise((resolve) => setTimeout(resolve, 300));
      const chef = mockChefs.find((c) => c.id === chefId);
      return {
        id: 'new-fav',
        clientId: 'current-user',
        chefId,
        chef,
        createdAt: new Date().toISOString(),
      };
    }

    const response = await axios.post('/users/favorites', { chefId });
    return response.data;
  },

  async removeFavorite(chefId: string): Promise<void> {
    if (USE_MOCK_DATA) {
      await new Promise((resolve) => setTimeout(resolve, 300));
      return;
    }

    await axios.delete(`/users/favorites/${chefId}`);
  },

  async isFavorite(chefId: string): Promise<boolean> {
    if (USE_MOCK_DATA) {
      await new Promise((resolve) => setTimeout(resolve, 100));
      return ['1', '2'].includes(chefId);
    }

    const response = await axios.get(`/users/favorites/${chefId}/check`);
    return response.data.isFavorite;
  },
};

