'use client';

import { Button } from '@/components/atoms/Button';
import { Spinner } from '@/components/atoms/Spinner';
import { Tabs, Tab } from '@/components/atoms/Tabs';
import { BookingCard } from '@/components/molecules/BookingCard';
import { EmptyState } from '@/components/molecules/EmptyState';
import { StatCard } from '@/components/molecules/StatCard';
import { Navbar } from '@/components/organisms/Navbar';
import { useAuth } from '@/contexts/AuthContext';
import { bookingsService } from '@/services/bookings';
import { Booking } from '@/types';
import { Calendar, CheckCircle, Clock, TrendingUp } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function MyBookingsPage() {
  const { user } = useAuth();
  const router = useRouter();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'upcoming' | 'past' | 'cancelled'>('all');

  useEffect(() => {
    loadBookings();
  }, []);

  const loadBookings = async () => {
    try {
      setLoading(true);
      const data = await bookingsService.getMyBookings();
      setBookings(data);
    } catch (error) {
      console.error('Failed to load bookings:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleViewDetails = (bookingId: string) => {
    router.push(`/bookings/${bookingId}`);
  };

  const handleCancel = async (bookingId: string) => {
    if (confirm('Are you sure you want to cancel this booking?')) {
      try {
        await bookingsService.cancelBooking(bookingId);
        loadBookings();
      } catch (error) {
        console.error('Failed to cancel booking:', error);
        alert('Failed to cancel booking');
      }
    }
  };

  const filteredBookings = bookings.filter((booking) => {
    if (filter === 'all') return true;
    if (filter === 'upcoming')
      return booking.status === 'CONFIRMED' || booking.status === 'PENDING';
    if (filter === 'past') return booking.status === 'COMPLETED';
    if (filter === 'cancelled') return booking.status === 'CANCELLED';
    return true;
  });

  const tabs: Tab[] = [
    { key: 'all', label: 'All', count: bookings.length },
    {
      key: 'upcoming',
      label: 'Upcoming',
      count: bookings.filter((b) => b.status === 'CONFIRMED' || b.status === 'PENDING').length,
    },
    { key: 'past', label: 'Past', count: bookings.filter((b) => b.status === 'COMPLETED').length },
    {
      key: 'cancelled',
      label: 'Cancelled',
      count: bookings.filter((b) => b.status === 'CANCELLED').length,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold">My Bookings</h1>
            <p className="text-gray-600 mt-1">Manage your chef bookings</p>
          </div>
          <Button onClick={() => router.push('/explore')}>Book a Chef</Button>
        </div>

        {/* Filter Tabs */}
        <Tabs tabs={tabs} activeTab={filter} onChange={(key) => setFilter(key as typeof filter)} className="mb-6" />

        {/* Bookings List */}
        {loading ? (
          <div className="flex justify-center py-12">
            <Spinner size="lg" />
          </div>
        ) : filteredBookings.length === 0 ? (
          <EmptyState
            icon={Calendar}
            title={filter === 'all' ? 'No bookings yet' : `No ${filter} bookings`}
            description="Start by browsing our amazing chefs and book your first experience!"
            actionLabel="Explore Chefs"
            onAction={() => router.push('/explore')}
          />
        ) : (
          <div className="grid grid-cols-1 gap-6">
            {filteredBookings.map((booking) => (
              <div key={booking.id}>
                <BookingCard
                  booking={booking}
                  onViewDetails={() => handleViewDetails(booking.id)}
                  onCancel={() => handleCancel(booking.id)}
                />
              </div>
            ))}
          </div>
        )}

        {/* Stats */}
        {bookings.length > 0 && !loading && (
          <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
            <StatCard
              value={bookings.length}
              label="Total Bookings"
              icon={Calendar}
              valueColor="text-gray-900"
            />
            <StatCard
              value={bookings.filter((b) => b.status === 'CONFIRMED').length}
              label="Confirmed"
              icon={CheckCircle}
              valueColor="text-green-600"
            />
            <StatCard
              value={bookings.filter((b) => b.status === 'COMPLETED').length}
              label="Completed"
              icon={TrendingUp}
              valueColor="text-blue-600"
            />
            <StatCard
              value={bookings.filter((b) => b.status === 'PENDING').length}
              label="Pending"
              icon={Clock}
              valueColor="text-yellow-600"
            />
          </div>
        )}
      </div>
    </div>
  );
}

