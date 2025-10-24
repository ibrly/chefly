import type { Meta, StoryObj } from '@storybook/react';
import { ReviewList } from './ReviewList';

const meta = {
  title: 'Organisms/ReviewList',
  component: ReviewList,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div style={{ maxWidth: '800px' }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof ReviewList>;

export default meta;
type Story = StoryObj<typeof meta>;

const sampleReviews = [
  {
    id: '1',
    bookingId: 'b1',
    clientId: 'c1',
    chefId: 'chef1',
    rating: 5,
    comment: 'Absolutely amazing experience! Chef Mario prepared the most authentic Italian meal we\'ve ever had.',
    createdAt: '2024-01-15T19:30:00Z',
    updatedAt: '2024-01-15T19:30:00Z',
    client: {
      id: 'c1',
      name: 'Sarah Johnson',
      email: 'sarah@example.com',
      role: 'CLIENT' as const,
      profileImage: 'https://i.pravatar.cc/150?img=1',
      createdAt: '2023-01-01',
      updatedAt: '2023-01-01',
    },
  },
  {
    id: '2',
    bookingId: 'b2',
    clientId: 'c2',
    chefId: 'chef1',
    rating: 4,
    comment: 'Great service and delicious food. Would definitely book again!',
    createdAt: '2024-01-10T20:00:00Z',
    updatedAt: '2024-01-10T20:00:00Z',
    client: {
      id: 'c2',
      name: 'Michael Chen',
      email: 'michael@example.com',
      role: 'CLIENT' as const,
      profileImage: 'https://i.pravatar.cc/150?img=11',
      createdAt: '2023-01-01',
      updatedAt: '2023-01-01',
    },
  },
  {
    id: '3',
    bookingId: 'b3',
    clientId: 'c3',
    chefId: 'chef1',
    rating: 5,
    comment: 'Perfect dinner party! The chef was professional and the food was outstanding.',
    createdAt: '2024-01-05T18:00:00Z',
    updatedAt: '2024-01-05T18:00:00Z',
    client: {
      id: 'c3',
      name: 'Emily Rodriguez',
      email: 'emily@example.com',
      role: 'CLIENT' as const,
      createdAt: '2023-01-01',
      updatedAt: '2023-01-01',
    },
  },
];

export const Default: Story = {
  args: {
    reviews: sampleReviews,
  },
};

export const Loading: Story = {
  args: {
    reviews: [],
    loading: true,
  },
};

export const Empty: Story = {
  args: {
    reviews: [],
  },
};

export const SingleReview: Story = {
  args: {
    reviews: [sampleReviews[0]],
  },
};

