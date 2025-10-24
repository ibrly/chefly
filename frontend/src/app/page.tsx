'use client';

import { Button } from '@/components/atoms/Button';
import { ChefCard } from '@/components/molecules/ChefCard';
import { Navbar } from '@/components/organisms/Navbar';
import { useAuth } from '@/contexts/AuthContext';
import { chefsService } from '@/services/chefs';
import { Chef } from '@/types';
import { Clock, Search, Shield, Star } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function HomePage() {
  const { user, isAuthenticated } = useAuth();
  const router = useRouter();
  const [featuredChefs, setFeaturedChefs] = useState<Chef[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadFeaturedChefs();
  }, []);

  const loadFeaturedChefs = async () => {
    try {
      const response = await chefsService.getAllChefs({ limit: 3 });
      setFeaturedChefs(response.data);
    } catch (error) {
      console.error('Failed to load featured chefs:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">Find Your Perfect Chef</h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100">
              Book professional chefs for your home cooking needs
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/explore">
                <Button size="lg" variant="secondary">
                  <Search className="mr-2" size={20} />
                  Explore Chefs
                </Button>
              </Link>
              {!isAuthenticated && (
                <Link href="/register">
                  <Button
                    size="lg"
                    variant="outline"
                    className="bg-transparent border-white text-white hover:bg-white hover:text-blue-600"
                  >
                    Get Started
                  </Button>
                </Link>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose Chefly?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
                <Shield className="text-blue-600" size={32} />
              </div>
              <h3 className="text-xl font-semibold mb-2">Verified Chefs</h3>
              <p className="text-gray-600">
                All our chefs are professionally verified and background-checked
              </p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
                <Star className="text-blue-600" size={32} />
              </div>
              <h3 className="text-xl font-semibold mb-2">Top Rated</h3>
              <p className="text-gray-600">Browse reviews and ratings from real customers</p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
                <Clock className="text-blue-600" size={32} />
              </div>
              <h3 className="text-xl font-semibold mb-2">Easy Booking</h3>
              <p className="text-gray-600">
                Book a chef in minutes with our simple booking process
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Chefs Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold">Featured Chefs</h2>
            <Link href="/explore">
              <Button variant="outline">View All</Button>
            </Link>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="animate-pulse bg-gray-200 rounded-lg h-96" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {featuredChefs.map((chef) => (
                <ChefCard
                  key={chef.id}
                  chef={chef}
                  onClick={() => router.push(`/chefs/${chef.id}`)}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-xl mb-8 text-blue-100">
            Join thousands of satisfied customers who have found their perfect chef
          </p>
          <Link href={isAuthenticated ? '/explore' : '/register'}>
            <Button size="lg" variant="secondary">
              {isAuthenticated ? 'Browse Chefs' : 'Sign Up Now'}
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gray-400">© 2024 Chefly. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
