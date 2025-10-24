'use client';

import { Button } from '@/components/atoms/Button';
import { SearchBar } from '@/components/molecules/SearchBar';
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
            <div className="mt-4 p-4 bg-white rounded-lg border border-gray-200">
              <h3 className="font-semibold mb-3">Filters</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Cuisine Type
                  </label>
                  <select className="w-full rounded-lg border border-gray-300 px-3 py-2">
                    <option>All Cuisines</option>
                    <option>Italian</option>
                    <option>French</option>
                    <option>Japanese</option>
                    <option>Mediterranean</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Price Range
                  </label>
                  <select className="w-full rounded-lg border border-gray-300 px-3 py-2">
                    <option>Any Price</option>
                    <option>Under $50/hr</option>
                    <option>$50 - $100/hr</option>
                    <option>$100+/hr</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Rating</label>
                  <select className="w-full rounded-lg border border-gray-300 px-3 py-2">
                    <option>All Ratings</option>
                    <option>4.5+ Stars</option>
                    <option>4.0+ Stars</option>
                    <option>3.5+ Stars</option>
                  </select>
                </div>
              </div>
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
