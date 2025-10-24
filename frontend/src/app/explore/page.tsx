'use client';

import { Button } from '@/components/atoms/Button';
import { SearchBar } from '@/components/molecules/SearchBar';
import { FilterPanel } from '@/components/molecules/FilterPanel';
import { ChefGrid } from '@/components/organisms/ChefGrid';
import { Navbar } from '@/components/organisms/Navbar';
import { chefsService } from '@/services/chefs';
import { Chef } from '@/types';
import { Filter } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function ExplorePage() {
  const router = useRouter();
  const [chefs, setChefs] = useState<Chef[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [cuisineType, setCuisineType] = useState('all');
  const [priceRange, setPriceRange] = useState('any');
  const [rating, setRating] = useState('all');

  useEffect(() => {
    loadChefs();
  }, []);

  const loadChefs = async () => {
    try {
      setLoading(true);
      const response = await chefsService.getAllChefs();
      setChefs(response.data);
    } catch (error) {
      console.error('Failed to load chefs:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async () => {
    try {
      setLoading(true);
      const response = await chefsService.getAllChefs({ search: searchQuery });
      setChefs(response.data);
    } catch (error) {
      console.error('Search failed:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleChefClick = (chef: Partial<Chef>) => {
    router.push(`/chefs/${chef.id}`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-4">Explore Chefs</h1>
          <p className="text-gray-600 mb-6">Find the perfect chef for your next event</p>

          <div className="flex gap-4">
            <div className="flex-1">
              <SearchBar
                value={searchQuery}
                onChange={setSearchQuery}
                onSearch={handleSearch}
                placeholder="Search by name, cuisine, or specialty..."
              />
            </div>
            <Button variant="outline" onClick={() => setShowFilters(!showFilters)}>
              <Filter size={20} className="mr-2" />
              Filters
            </Button>
          </div>

          {showFilters && (
            <div className="mt-4">
              <FilterPanel
                cuisineType={cuisineType}
                priceRange={priceRange}
                rating={rating}
                onCuisineChange={setCuisineType}
                onPriceChange={setPriceRange}
                onRatingChange={setRating}
              />
            </div>
          )}
        </div>

        <div className="mb-4 text-gray-600">
          {loading ? 'Loading...' : `${chefs.length} chefs found`}
        </div>

        <ChefGrid chefs={chefs} onChefClick={handleChefClick} loading={loading} />
      </div>
    </div>
  );
}
