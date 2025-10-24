import { Avatar } from '@/components/atoms/Avatar';
import { Card } from '@/components/atoms/Card';
import { formatDate } from '@/lib/utils';
import { Review } from '@/types';
import { Star } from 'lucide-react';
import React from 'react';

export interface ReviewCardProps {
  review: Partial<Review>;
}

export const ReviewCard: React.FC<ReviewCardProps> = ({ review }) => {
  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        size={16}
        className={i < rating ? 'text-yellow-500 fill-current' : 'text-gray-300'}
      />
    ));
  };

  return (
    <Card>
      <div className="flex items-start gap-3">
        <Avatar
          src={review.client?.profileImage}
          alt={review.client?.name}
          fallback={review.client?.name?.substring(0, 2)}
          size="md"
        />
        <div className="flex-1">
          <div className="flex items-center justify-between mb-1">
            <h4 className="font-semibold">{review.client?.name || 'Anonymous'}</h4>
            {review.createdAt && (
              <span className="text-sm text-gray-500">{formatDate(review.createdAt)}</span>
            )}
          </div>
          <div className="flex items-center gap-1 mb-2">{renderStars(review.rating || 0)}</div>
          {review.comment && <p className="text-gray-700">{review.comment}</p>}
        </div>
      </div>
    </Card>
  );
};
