import { Avatar } from '@/components/atoms/Avatar';
import { Badge } from '@/components/atoms/Badge';
import { Button } from '@/components/atoms/Button';
import { Card } from '@/components/atoms/Card';
import { formatCurrency, formatDate } from '@/lib/utils';
import { Booking } from '@/types';
import { Calendar, Clock, MapPin, Users } from 'lucide-react';
import React from 'react';

export interface BookingCardProps {
  booking: Partial<Booking>;
  onViewDetails?: () => void;
  onCancel?: () => void;
  showActions?: boolean;
}

export const BookingCard: React.FC<BookingCardProps> = ({
  booking,
  onViewDetails,
  onCancel,
  showActions = true,
}) => {
  const getStatusVariant = (status?: string) => {
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

  const chef = booking.chef;

  return (
    <Card>
      <div className="flex items-start gap-4">
        <Avatar
          src={chef?.profileImage}
          alt={chef?.name}
          fallback={chef?.name?.substring(0, 2)}
          size="lg"
        />
        <div className="flex-1">
          <div className="flex items-start justify-between mb-2">
            <div>
              <h3 className="font-semibold text-lg">{chef?.name || 'Chef'}</h3>
              {booking.status && (
                <Badge variant={getStatusVariant(booking.status)} size="sm">
                  {booking.status}
                </Badge>
              )}
            </div>
            {booking.totalPrice && (
              <div className="text-right">
                <div className="text-sm text-gray-500">Total</div>
                <div className="text-lg font-semibold">{formatCurrency(booking.totalPrice)}</div>
              </div>
            )}
          </div>

          <div className="space-y-2 mb-4">
            {booking.date && (
              <div className="flex items-center text-gray-600 text-sm">
                <Calendar size={16} className="mr-2" />
                {formatDate(booking.date)}
              </div>
            )}
            {booking.time && (
              <div className="flex items-center text-gray-600 text-sm">
                <Clock size={16} className="mr-2" />
                {booking.time}
              </div>
            )}
            {booking.location && (
              <div className="flex items-center text-gray-600 text-sm">
                <MapPin size={16} className="mr-2" />
                {booking.location}
              </div>
            )}
            {booking.guests && (
              <div className="flex items-center text-gray-600 text-sm">
                <Users size={16} className="mr-2" />
                {booking.guests} {booking.guests === 1 ? 'guest' : 'guests'}
              </div>
            )}
          </div>

          {showActions && (
            <div className="flex gap-2">
              {onViewDetails && (
                <Button size="sm" variant="outline" onClick={onViewDetails}>
                  View Details
                </Button>
              )}
              {onCancel && booking.status !== 'CANCELLED' && booking.status !== 'COMPLETED' && (
                <Button size="sm" variant="danger" onClick={onCancel}>
                  Cancel Booking
                </Button>
              )}
            </div>
          )}
        </div>
      </div>
    </Card>
  );
};
