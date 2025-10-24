import { ChefCard } from '@/components/molecules/ChefCard';
import { Chef } from '@/types';
import React from 'react';

export interface ChefGridProps {
  chefs: Partial<Chef>[];
  onChefClick?: (chef: Partial<Chef>) => void;
  loading?: boolean;
}

export const ChefGrid: React.FC<ChefGridProps> = ({ chefs, onChefClick, loading = false }) => {
  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, index) => (
          <div key={index} className="animate-pulse bg-gray-200 rounded-lg h-96" />
        ))}
      </div>
    );
  }

  if (chefs.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 text-lg">No chefs found</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {chefs.map((chef) => (
        <ChefCard key={chef.id} chef={chef} onClick={() => onChefClick?.(chef)} />
      ))}
    </div>
  );
};
