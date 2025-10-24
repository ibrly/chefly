'use client';

import { Avatar } from '@/components/atoms/Avatar';
import { Badge } from '@/components/atoms/Badge';
import { Button } from '@/components/atoms/Button';
import { Card } from '@/components/atoms/Card';
import { Modal } from '@/components/atoms/Modal';
import { Spinner } from '@/components/atoms/Spinner';
import { BookingForm, BookingFormData } from '@/components/organisms/BookingForm';
import { Navbar } from '@/components/organisms/Navbar';
import { ReviewList } from '@/components/organisms/ReviewList';
import { chefsService } from '@/services/chefs';
import { Chef, Review } from '@/types';
import { DollarSign, Heart, MapPin, MessageSquare, Share2, Star } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function ChefDetailPage() {
  const params = useParams();
  const router = useRouter();
  const chefId = params.id as string;

  const [chef, setChef] = useState<Chef | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    loadChefData();
  }, [chefId]);

  const loadChefData = async () => {
    try {
      setLoading(true);
      const [chefData, reviewsData] = await Promise.all([
        chefsService.getChefById(chefId),
        chefsService.getChefReviews(chefId),
      ]);
      setChef(chefData);
      setReviews(reviewsData);
    } catch (error) {
      console.error('Failed to load chef data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleBooking = async (data: BookingFormData) => {
    console.log('Booking data:', data);
    // TODO: Implement booking creation
    setShowBookingModal(false);
    alert('Booking request sent! (Not implemented yet)');
  };

  const handleToggleFavorite = () => {
    setIsFavorite(!isFavorite);
    // TODO: Implement favorite toggle
  };

  const handleMessage = () => {
    if (chef) {
      router.push(`/chat/${chef.id}`);
    }
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `${chef?.name} - Chefly`,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="flex items-center justify-center h-[calc(100vh-4rem)]">
          <Spinner size="lg" />
        </div>
      </div>
    );
  }

  if (!chef) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl font-bold mb-4">Chef Not Found</h1>
          <Button onClick={() => router.push('/explore')}>Browse Chefs</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      {/* Hero Section */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Chef Info */}
            <div className="flex-1">
              <div className="flex items-start gap-4">
                <Avatar src={chef.profileImage} alt={chef.name} size="xl" />
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h1 className="text-3xl font-bold mb-2">{chef.name}</h1>
                      {chef.verified && <Badge variant="success">Verified Chef</Badge>}
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={handleToggleFavorite}
                        className={isFavorite ? 'text-red-500' : ''}
                      >
                        <Heart size={20} fill={isFavorite ? 'currentColor' : 'none'} />
                      </Button>
                      <Button variant="ghost" size="sm" onClick={handleShare}>
                        <Share2 size={20} />
                      </Button>
                    </div>
                  </div>

                  {chef.location && (
                    <div className="flex items-center text-gray-600 mb-2">
                      <MapPin size={16} className="mr-1" />
                      {chef.location}
                    </div>
                  )}

                  <div className="flex items-center gap-4 mb-4">
                    <div className="flex items-center gap-1">
                      <Star size={18} fill="currentColor" className="text-yellow-500" />
                      <span className="font-semibold">{chef.rating?.toFixed(1) || 'N/A'}</span>
                      <span className="text-gray-500">({chef.reviewCount || 0} reviews)</span>
                    </div>
                    {chef.experience && (
                      <span className="text-gray-600">{chef.experience}+ years experience</span>
                    )}
                  </div>

                  {chef.bio && <p className="text-gray-700 mb-4">{chef.bio}</p>}

                  {chef.specialties && chef.specialties.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {chef.specialties.map((specialty, index) => (
                        <Badge key={index} variant="secondary">
                          {specialty}
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Booking Card */}
            <Card className="w-full md:w-96 flex-shrink-0">
              <div className="text-center mb-4">
                {chef.hourlyRate && (
                  <div className="flex items-center justify-center gap-1 text-3xl font-bold mb-2">
                    <DollarSign size={28} />
                    {chef.hourlyRate}
                    <span className="text-lg text-gray-500 font-normal">/hour</span>
                  </div>
                )}
                {chef.availability !== false ? (
                  <Badge variant="success">Available</Badge>
                ) : (
                  <Badge variant="danger">Currently Unavailable</Badge>
                )}
              </div>

              <div className="space-y-2">
                <Button fullWidth size="lg" onClick={() => setShowBookingModal(true)}>
                  Book Now
                </Button>
                <Button fullWidth variant="outline" onClick={handleMessage}>
                  <MessageSquare size={18} className="mr-2" />
                  Message Chef
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </div>

      {/* Reviews Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h2 className="text-2xl font-bold mb-6">Reviews ({reviews.length})</h2>
        <ReviewList reviews={reviews} />
      </div>

      {/* Booking Modal */}
      <Modal
        isOpen={showBookingModal}
        onClose={() => setShowBookingModal(false)}
        title={`Book ${chef.name}`}
        size="lg"
      >
        <BookingForm onSubmit={handleBooking} />
      </Modal>
    </div>
  );
}

