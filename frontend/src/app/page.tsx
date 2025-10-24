'use client';

import { Button } from '@/components/atoms/Button';
import { ChefCard } from '@/components/molecules/ChefCard';
import { FeatureCard } from '@/components/molecules/FeatureCard';
import { Footer } from '@/components/organisms/Footer';
import { Hero } from '@/components/organisms/Hero';
import { Navbar } from '@/components/organisms/Navbar';
import { useAuth } from '@/contexts/AuthContext';
import { chefsService } from '@/services/chefs';
import { Chef } from '@/types';
import { Clock, Shield, Star } from 'lucide-react';
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
      <Hero
        title="Find Your Perfect Chef"
        subtitle="Book professional chefs for your home cooking needs"
        showSecondaryButton={!isAuthenticated}
      />

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose Chefly?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureCard
              icon={Shield}
              title="Verified Chefs"
              description="All our chefs are professionally verified and background-checked"
            />
            <FeatureCard
              icon={Star}
              title="Top Rated"
              description="Browse reviews and ratings from real customers"
            />
            <FeatureCard
              icon={Clock}
              title="Easy Booking"
              description="Book a chef in minutes with our simple booking process"
            />
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
      <Footer />
    </div>
  );
}
