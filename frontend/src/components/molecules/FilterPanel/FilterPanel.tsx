import React from 'react';
import { Select, SelectOption } from '@/components/atoms/Select';
import { cn } from '@/lib/utils';

export interface FilterPanelProps {
  cuisineType?: string;
  priceRange?: string;
  rating?: string;
  onCuisineChange?: (value: string) => void;
  onPriceChange?: (value: string) => void;
  onRatingChange?: (value: string) => void;
  className?: string;
}

const cuisineOptions: SelectOption[] = [
  { value: 'all', label: 'All Cuisines' },
  { value: 'italian', label: 'Italian' },
  { value: 'french', label: 'French' },
  { value: 'japanese', label: 'Japanese' },
  { value: 'mediterranean', label: 'Mediterranean' },
  { value: 'mexican', label: 'Mexican' },
  { value: 'indian', label: 'Indian' },
  { value: 'chinese', label: 'Chinese' },
];

const priceOptions: SelectOption[] = [
  { value: 'any', label: 'Any Price' },
  { value: 'under-50', label: 'Under $50/hr' },
  { value: '50-100', label: '$50 - $100/hr' },
  { value: '100-150', label: '$100 - $150/hr' },
  { value: '150-plus', label: '$150+/hr' },
];

const ratingOptions: SelectOption[] = [
  { value: 'all', label: 'All Ratings' },
  { value: '4.5', label: '4.5+ Stars' },
  { value: '4.0', label: '4.0+ Stars' },
  { value: '3.5', label: '3.5+ Stars' },
  { value: '3.0', label: '3.0+ Stars' },
];

export const FilterPanel: React.FC<FilterPanelProps> = ({
  cuisineType = 'all',
  priceRange = 'any',
  rating = 'all',
  onCuisineChange,
  onPriceChange,
  onRatingChange,
  className,
}) => {
  return (
    <div className={cn('p-4 bg-white rounded-lg border border-gray-200', className)}>
      <h3 className="font-semibold mb-4">Filters</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Select
          label="Cuisine Type"
          options={cuisineOptions}
          value={cuisineType}
          onChange={(e) => onCuisineChange?.(e.target.value)}
        />
        <Select
          label="Price Range"
          options={priceOptions}
          value={priceRange}
          onChange={(e) => onPriceChange?.(e.target.value)}
        />
        <Select
          label="Rating"
          options={ratingOptions}
          value={rating}
          onChange={(e) => onRatingChange?.(e.target.value)}
        />
      </div>
    </div>
  );
};

