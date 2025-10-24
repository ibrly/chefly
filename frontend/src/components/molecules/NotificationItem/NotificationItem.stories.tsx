import type { Meta, StoryObj } from '@storybook/react';
import { NotificationItem } from './NotificationItem';
import { Notification } from '@/types';

const sampleNotifications: Notification[] = [
  {
    id: '1',
    userId: 'user1',
    type: 'booking',
    title: 'Booking Confirmed',
    message: 'Your booking with Chef Mario has been confirmed for Dec 25, 2024 at 6:00 PM',
    read: false,
    createdAt: new Date(Date.now() - 1000 * 60 * 30).toISOString(), // 30 mins ago
  },
  {
    id: '2',
    userId: 'user1',
    type: 'message',
    title: 'New Message',
    message: 'Chef Sarah sent you a message about your upcoming booking',
    read: false,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(), // 2 hours ago
  },
  {
    id: '3',
    userId: 'user1',
    type: 'review',
    title: 'Review Request',
    message: 'Please review your experience with Chef David',
    read: true,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(), // 1 day ago
  },
  {
    id: '4',
    userId: 'user1',
    type: 'system',
    title: 'Profile Updated',
    message: 'Your profile information has been successfully updated',
    read: true,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3).toISOString(), // 3 days ago
  },
];

const meta = {
  title: 'Molecules/NotificationItem',
  component: NotificationItem,
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
} satisfies Meta<typeof NotificationItem>;

export default meta;
type Story = StoryObj<typeof meta>;

export const BookingUnread: Story = {
  args: {
    notification: sampleNotifications[0],
    onMarkAsRead: (id) => alert(`Marked notification ${id} as read`),
  },
};

export const MessageUnread: Story = {
  args: {
    notification: sampleNotifications[1],
    onMarkAsRead: (id) => alert(`Marked notification ${id} as read`),
  },
};

export const ReviewRead: Story = {
  args: {
    notification: sampleNotifications[2],
  },
};

export const SystemRead: Story = {
  args: {
    notification: sampleNotifications[3],
  },
};

export const WithoutMarkAsRead: Story = {
  args: {
    notification: sampleNotifications[0],
    // No onMarkAsRead handler
  },
};

export const LongMessage: Story = {
  args: {
    notification: {
      id: '5',
      userId: 'user1',
      type: 'booking',
      title: 'Booking Confirmation and Important Details',
      message:
        'Your booking with Chef Mario has been confirmed for December 25, 2024 at 6:00 PM. Please note that the chef will arrive 30 minutes early to prepare. Make sure your kitchen is available and all ingredients are ready. If you have any dietary restrictions or special requests, please let us know at least 24 hours in advance.',
      read: false,
      createdAt: new Date(Date.now() - 1000 * 60 * 15).toISOString(),
    },
    onMarkAsRead: (id) => alert(`Marked notification ${id} as read`),
  },
};

export const AllTypes: Story = {
  render: (args) => (
    <div className="space-y-3" style={{ width: '600px' }}>
      {sampleNotifications.map((notification) => (
        <NotificationItem
          key={notification.id}
          notification={notification}
          onMarkAsRead={(id) => alert(`Marked ${id} as read`)}
        />
      ))}
    </div>
  ),
  args: {
    notification: sampleNotifications[0],
    onMarkAsRead: () => {},
  },
};

