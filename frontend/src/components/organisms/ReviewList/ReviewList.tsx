import { EmptyState } from '@/components/molecules/EmptyState';
import { ReviewCard } from '@/components/molecules/ReviewCard';
import { Review } from '@/types';
import { Star } from 'lucide-react';
import React from 'react';

export interface ReviewListProps {
  reviews: Review[];
  loading?: boolean;
}

export const ReviewList: React.FC<ReviewListProps> = ({ reviews, loading = false }) => {
  if (loading) {
    return (
      <div className="space-y-4">
        {Array.from({ length: 3 }).map((_, index) => (
          <div key={index} className="animate-pulse bg-gray-200 rounded-lg h-32" />
        ))}
      </div>
    );
  }

  if (reviews.length === 0) {
    return (
      <EmptyState icon={Star} title="No reviews yet" description="Be the first to leave a review!" />
    );
  }

  return (
    <div className="space-y-4">
      {reviews.map((review) => (
        <ReviewCard key={review.id} review={review} />
      ))}
    </div>
  );
};

