import { AuthProvider } from '@/contexts/AuthContext';
import { NotificationProvider } from '@/contexts/NotificationContext';
import { SocketProvider } from '@/contexts/SocketContext';
import type { Meta, StoryObj } from '@storybook/react';

// Mock the useParams hook
const mockChefDetailPage = () => {
  const ChefDetailPage = require('@/app/chefs/[id]/page').default;
  return ChefDetailPage;
};

const meta = {
  title: 'Pages/ChefDetailPage',
  component: mockChefDetailPage(),
  parameters: {
    layout: 'fullscreen',
    nextjs: {
      appDirectory: true,
      navigation: {
        pathname: '/chefs/1',
        query: { id: '1' },
      },
    },
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <AuthProvider>
        <SocketProvider>
          <NotificationProvider>
            <Story />
          </NotificationProvider>
        </SocketProvider>
      </AuthProvider>
    ),
  ],
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Mobile: Story = {
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
};

export const Tablet: Story = {
  parameters: {
    viewport: {
      defaultViewport: 'tablet',
    },
  },
};

