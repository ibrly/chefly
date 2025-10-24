import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { FilterPanel } from './FilterPanel';

const meta = {
  title: 'Molecules/FilterPanel',
  component: FilterPanel,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div style={{ width: '800px' }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof FilterPanel>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => {
    const [cuisineType, setCuisineType] = useState('all');
    const [priceRange, setPriceRange] = useState('any');
    const [rating, setRating] = useState('all');

    return (
      <FilterPanel
        {...args}
        cuisineType={cuisineType}
        priceRange={priceRange}
        rating={rating}
        onCuisineChange={setCuisineType}
        onPriceChange={setPriceRange}
        onRatingChange={setRating}
      />
    );
  },
};

export const WithSelectedFilters: Story = {
  render: (args) => {
    const [cuisineType, setCuisineType] = useState('italian');
    const [priceRange, setPriceRange] = useState('50-100');
    const [rating, setRating] = useState('4.5');

    return (
      <FilterPanel
        {...args}
        cuisineType={cuisineType}
        priceRange={priceRange}
        rating={rating}
        onCuisineChange={setCuisineType}
        onPriceChange={setPriceRange}
        onRatingChange={setRating}
      />
    );
  },
};

export const Interactive: Story = {
  render: (args) => {
    const [cuisineType, setCuisineType] = useState('all');
    const [priceRange, setPriceRange] = useState('any');
    const [rating, setRating] = useState('all');

    return (
      <div className="space-y-4">
        <FilterPanel
          {...args}
          cuisineType={cuisineType}
          priceRange={priceRange}
          rating={rating}
          onCuisineChange={setCuisineType}
          onPriceChange={setPriceRange}
          onRatingChange={setRating}
        />
        <div className="p-4 bg-gray-50 rounded-lg">
          <h4 className="font-semibold mb-2">Selected Filters:</h4>
          <ul className="text-sm space-y-1">
            <li>Cuisine: {cuisineType}</li>
            <li>Price: {priceRange}</li>
            <li>Rating: {rating}</li>
          </ul>
        </div>
      </div>
    );
  },
};

