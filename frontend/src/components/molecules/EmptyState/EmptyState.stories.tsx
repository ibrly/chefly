import type { Meta, StoryObj } from '@storybook/react';
import { Calendar, Heart, MessageSquare, Search, ShoppingBag } from 'lucide-react';
import { EmptyState } from './EmptyState';

const meta = {
  title: 'Molecules/EmptyState',
  component: EmptyState,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div style={{ width: '600px' }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof EmptyState>;

export default meta;
type Story = StoryObj<typeof meta>;

export const NoBookings: Story = {
  args: {
    icon: Calendar,
    title: 'No bookings yet',
    description: "You haven't made any bookings yet. Browse our chefs to get started!",
    actionLabel: 'Explore Chefs',
    onAction: () => alert('Navigate to explore page'),
  },
};

export const NoFavorites: Story = {
  args: {
    icon: Heart,
    title: 'No favorites',
    description: "You haven't added any chefs to your favorites yet.",
    actionLabel: 'Find Chefs',
    onAction: () => alert('Navigate to explore page'),
  },
};

export const NoMessages: Story = {
  args: {
    icon: MessageSquare,
    title: 'No messages',
    description: "You don't have any messages yet. Start a conversation with a chef!",
  },
};

export const SearchNoResults: Story = {
  args: {
    icon: Search,
    title: 'No results found',
    description: "We couldn't find any chefs matching your search criteria. Try adjusting your filters.",
    actionLabel: 'Clear Filters',
    onAction: () => alert('Clear filters'),
  },
};

export const EmptyCart: Story = {
  args: {
    icon: ShoppingBag,
    title: 'Your cart is empty',
    description: 'Add some items to your cart to continue shopping.',
    actionLabel: 'Start Shopping',
    onAction: () => alert('Navigate to shop'),
  },
};

export const WithoutIcon: Story = {
  args: {
    title: 'Nothing here yet',
    description: 'This section is empty.',
  },
};

export const WithoutDescription: Story = {
  args: {
    icon: Calendar,
    title: 'No items',
    actionLabel: 'Add Item',
    onAction: () => alert('Add item'),
  },
};

export const WithoutAction: Story = {
  args: {
    icon: MessageSquare,
    title: 'Coming Soon',
    description: 'This feature is currently under development.',
  },
};

