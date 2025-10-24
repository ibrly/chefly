'use client';

import { Spinner } from '@/components/atoms/Spinner';
import { ChefCard } from '@/components/molecules/ChefCard';
import { EmptyState } from '@/components/molecules/EmptyState';
import { Navbar } from '@/components/organisms/Navbar';
import { favoritesService } from '@/services/favorites';
import { Favorite } from '@/types';
import { Heart } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function FavoritesPage() {
  const router = useRouter();
  const [favorites, setFavorites] = useState<Favorite[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadFavorites();
  }, []);

  const loadFavorites = async () => {
    try {
      setLoading(true);
      const data = await favoritesService.getFavorites();
      setFavorites(data);
    } catch (error) {
      console.error('Failed to load favorites:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleChefClick = (chefId: string) => {
    router.push(`/chefs/${chefId}`);
  };

  const handleRemoveFavorite = async (chefId: string) => {
    try {
      await favoritesService.removeFavorite(chefId);
      setFavorites((prev) => prev.filter((f) => f.chefId !== chefId));
    } catch (error) {
      console.error('Failed to remove favorite:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">My Favorite Chefs</h1>
          <p className="text-gray-600">
            {favorites.length > 0
              ? `You have ${favorites.length} favorite ${favorites.length === 1 ? 'chef' : 'chefs'}`
              : 'Save your favorite chefs for quick access'}
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center py-12">
            <Spinner size="lg" />
          </div>
        ) : favorites.length === 0 ? (
          <EmptyState
            icon={Heart}
            title="No favorites yet"
            description="Browse our amazing chefs and save your favorites by clicking the heart icon on their profiles."
            actionLabel="Explore Chefs"
            onAction={() => router.push('/explore')}
          />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {favorites.map((favorite) =>
              favorite.chef ? (
                <div key={favorite.id} className="relative">
                  <ChefCard
                    chef={favorite.chef}
                    onClick={() => handleChefClick(favorite.chef!.id)}
                  />
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleRemoveFavorite(favorite.chefId);
                    }}
                    className="absolute top-4 right-4 p-2 bg-white rounded-full shadow-lg hover:bg-gray-100 transition-colors"
                  >
                    <Heart size={20} className="text-red-500 fill-current" />
                  </button>
                </div>
              ) : null
            )}
          </div>
        )}
      </div>
    </div>
  );
}

