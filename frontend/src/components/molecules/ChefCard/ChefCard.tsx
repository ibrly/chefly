import { Avatar } from '@/components/atoms/Avatar';
import { Badge } from '@/components/atoms/Badge';
import { Card } from '@/components/atoms/Card';
import { Chef } from '@/types';
import { DollarSign, MapPin, Star } from 'lucide-react';
import React from 'react';

export interface ChefCardProps {
  chef: Partial<Chef>;
  onClick?: () => void;
}

export const ChefCard: React.FC<ChefCardProps> = ({ chef, onClick }) => {
  return (
    <Card hover padding="none" onClick={onClick}>
      <div className="relative">
        <img
          src={
            chef.profileImage || 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=400'
          }
          alt={chef.name}
          className="w-full h-48 object-cover rounded-t-lg"
        />
        {chef.verified && (
          <div className="absolute top-3 right-3">
            <Badge variant="success" size="sm">
              Verified
            </Badge>
          </div>
        )}
      </div>

      <div className="p-4">
        <div className="flex items-start justify-between mb-2">
          <div className="flex items-center gap-3">
            <Avatar
              src={chef.profileImage}
              alt={chef.name}
              fallback={chef.name?.substring(0, 2)}
              size="md"
            />
            <div>
              <h3 className="font-semibold text-lg">{chef.name}</h3>
              {chef.location && (
                <div className="flex items-center text-sm text-gray-500">
                  <MapPin size={14} className="mr-1" />
                  {chef.location}
                </div>
              )}
            </div>
          </div>
        </div>

        {chef.bio && <p className="text-gray-600 text-sm mb-3 line-clamp-2">{chef.bio}</p>}

        {chef.specialties && chef.specialties.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-3">
            {chef.specialties.slice(0, 3).map((specialty, index) => (
              <Badge key={index} variant="secondary" size="sm">
                {specialty}
              </Badge>
            ))}
            {chef.specialties.length > 3 && (
              <Badge variant="secondary" size="sm">
                +{chef.specialties.length - 3}
              </Badge>
            )}
          </div>
        )}

        <div className="flex items-center justify-between pt-3 border-t border-gray-200">
          <div className="flex items-center gap-1 text-yellow-500">
            <Star size={18} fill="currentColor" />
            <span className="font-semibold text-gray-900">{chef.rating?.toFixed(1) || 'N/A'}</span>
            <span className="text-gray-500 text-sm">({chef.reviewCount || 0})</span>
          </div>
          {chef.hourlyRate && (
            <div className="flex items-center gap-1 text-gray-700 font-semibold">
              <DollarSign size={18} />
              {chef.hourlyRate}/hr
            </div>
          )}
        </div>
      </div>
    </Card>
  );
};
