import type { Meta, StoryObj } from '@storybook/react';
import { BookingCard } from './BookingCard';

const meta = {
  title: 'Molecules/BookingCard',
  component: BookingCard,
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
} satisfies Meta<typeof BookingCard>;

export default meta;
type Story = StoryObj<typeof meta>;

const sampleBooking = {
  id: '1',
  date: '2024-12-25',
  time: '18:00',
  location: '123 Main St, New York, NY 10001',
  guests: 6,
  totalPrice: 450,
  status: 'CONFIRMED' as const,
  chef: {
    id: '1',
    name: 'Chef Mario',
    email: 'mario@example.com',
    role: 'CHEF' as const,
    profileImage: 'https://i.pravatar.cc/150?img=12',
    createdAt: '2023-01-01',
    updatedAt: '2023-01-01',
  },
  createdAt: '2024-01-01',
  updatedAt: '2024-01-01',
};

export const Confirmed: Story = {
  args: {
    booking: {
      ...sampleBooking,
      status: 'CONFIRMED',
    },
    onViewDetails: () => alert('View details'),
    onCancel: () => alert('Cancel booking'),
  },
};

export const Pending: Story = {
  args: {
    booking: {
      ...sampleBooking,
      status: 'PENDING',
    },
    onViewDetails: () => alert('View details'),
    onCancel: () => alert('Cancel booking'),
  },
};

export const Completed: Story = {
  args: {
    booking: {
      ...sampleBooking,
      status: 'COMPLETED',
    },
    onViewDetails: () => alert('View details'),
  },
};

export const Cancelled: Story = {
  args: {
    booking: {
      ...sampleBooking,
      status: 'CANCELLED',
    },
    onViewDetails: () => alert('View details'),
  },
};

export const WithoutActions: Story = {
  args: {
    booking: sampleBooking,
    showActions: false,
  },
};

export const SmallParty: Story = {
  args: {
    booking: {
      ...sampleBooking,
      guests: 2,
      totalPrice: 180,
    },
    onViewDetails: () => alert('View details'),
    onCancel: () => alert('Cancel booking'),
  },
};

export const LargeParty: Story = {
  args: {
    booking: {
      ...sampleBooking,
      guests: 15,
      totalPrice: 1200,
    },
    onViewDetails: () => alert('View details'),
    onCancel: () => alert('Cancel booking'),
  },
};
