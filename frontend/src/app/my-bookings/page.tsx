'use client';

import { Badge } from '@/components/atoms/Badge';
import { Button } from '@/components/atoms/Button';
import { Spinner } from '@/components/atoms/Spinner';
import { BookingCard } from '@/components/molecules/BookingCard';
import { EmptyState } from '@/components/molecules/EmptyState';
import { Navbar } from '@/components/organisms/Navbar';
import { useAuth } from '@/contexts/AuthContext';
import { bookingsService } from '@/services/bookings';
import { Booking } from '@/types';
import { Calendar } from 'lucide-react';
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

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'CONFIRMED':
        return 'success';
      case 'PENDING':
        return 'warning';
      case 'COMPLETED':
        return 'info';
      case 'CANCELLED':
        return 'danger';
      default:
        return 'secondary';
    }
  };

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
        <div className="flex gap-2 mb-6 border-b border-gray-200 overflow-x-auto">
          {[
            { key: 'all' as const, label: 'All' },
            { key: 'upcoming' as const, label: 'Upcoming' },
            { key: 'past' as const, label: 'Past' },
            { key: 'cancelled' as const, label: 'Cancelled' },
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setFilter(tab.key)}
              className={`px-4 py-2 font-medium transition-colors border-b-2 whitespace-nowrap ${
                filter === tab.key
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-600 hover:text-gray-900'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

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
            <div className="bg-white p-4 rounded-lg border border-gray-200">
              <div className="text-2xl font-bold text-gray-900">{bookings.length}</div>
              <div className="text-sm text-gray-600">Total Bookings</div>
            </div>
            <div className="bg-white p-4 rounded-lg border border-gray-200">
              <div className="text-2xl font-bold text-green-600">
                {bookings.filter((b) => b.status === 'CONFIRMED').length}
              </div>
              <div className="text-sm text-gray-600">Confirmed</div>
            </div>
            <div className="bg-white p-4 rounded-lg border border-gray-200">
              <div className="text-2xl font-bold text-blue-600">
                {bookings.filter((b) => b.status === 'COMPLETED').length}
              </div>
              <div className="text-sm text-gray-600">Completed</div>
            </div>
            <div className="bg-white p-4 rounded-lg border border-gray-200">
              <div className="text-2xl font-bold text-yellow-600">
                {bookings.filter((b) => b.status === 'PENDING').length}
              </div>
              <div className="text-sm text-gray-600">Pending</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

