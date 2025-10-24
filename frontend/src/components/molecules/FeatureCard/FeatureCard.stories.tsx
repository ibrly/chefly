import type { Meta, StoryObj } from '@storybook/react';
import { Shield, Star, Clock, Heart, DollarSign, Users } from 'lucide-react';
import { FeatureCard } from './FeatureCard';

const meta = {
  title: 'Molecules/FeatureCard',
  component: FeatureCard,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div style={{ width: '300px' }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof FeatureCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const VerifiedChefs: Story = {
  args: {
    icon: Shield,
    title: 'Verified Chefs',
    description: 'All our chefs are professionally verified and background-checked',
  },
};

export const TopRated: Story = {
  args: {
    icon: Star,
    title: 'Top Rated',
    description: 'Browse reviews and ratings from real customers',
  },
};

export const EasyBooking: Story = {
  args: {
    icon: Clock,
    title: 'Easy Booking',
    description: 'Book a chef in minutes with our simple booking process',
  },
};

export const CustomColors: Story = {
  args: {
    icon: Heart,
    title: 'Customer Satisfaction',
    description: 'We guarantee satisfaction with every booking',
    iconColor: 'text-red-600',
    iconBgColor: 'bg-red-100',
  },
};

export const AffordablePrices: Story = {
  args: {
    icon: DollarSign,
    title: 'Affordable Prices',
    description: 'Quality chef services at competitive rates',
    iconColor: 'text-green-600',
    iconBgColor: 'bg-green-100',
  },
};

export const GroupOfFeatures: Story = {
  render: (args) => (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8" style={{ width: '900px' }}>
      <FeatureCard
        icon={Shield}
        title="Verified Chefs"
        description="All chefs are professionally verified"
      />
      <FeatureCard
        icon={Star}
        title="Top Rated"
        description="Browse reviews from real customers"
      />
      <FeatureCard
        icon={Clock}
        title="Easy Booking"
        description="Book a chef in minutes"
      />
    </div>
  ),
  args: {
    icon: Shield,
    title: 'Group',
    description: 'Group of features',
  },
};

