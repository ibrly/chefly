import RegisterPage from '@/app/(auth)/register/page';
import { AuthProvider } from '@/contexts/AuthContext';
import { NotificationProvider } from '@/contexts/NotificationContext';
import { SocketProvider } from '@/contexts/SocketContext';
import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'Pages/RegisterPage',
  component: RegisterPage,
  parameters: {
    layout: 'fullscreen',
    nextjs: {
      appDirectory: true,
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
} satisfies Meta<typeof RegisterPage>;

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

export const AsClient: Story = {
  play: async ({ canvasElement }) => {
    // Simulate selecting client role
    const clientButton = canvasElement.querySelector('button:contains("Book a Chef")');
    if (clientButton) {
      (clientButton as HTMLButtonElement).click();
    }
  },
};

export const AsChef: Story = {
  play: async ({ canvasElement }) => {
    // Simulate selecting chef role
    const chefButton = canvasElement.querySelector('button:contains("Be a Chef")');
    if (chefButton) {
      (chefButton as HTMLButtonElement).click();
    }
  },
};
