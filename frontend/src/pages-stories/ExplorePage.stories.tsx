import ExplorePage from '@/app/explore/page';
import { AuthProvider } from '@/contexts/AuthContext';
import { NotificationProvider } from '@/contexts/NotificationContext';
import { SocketProvider } from '@/contexts/SocketContext';
import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'Pages/ExplorePage',
  component: ExplorePage,
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
} satisfies Meta<typeof ExplorePage>;

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

export const WithFiltersOpen: Story = {
  play: async ({ canvasElement }) => {
    // Wait a bit for the page to load
    await new Promise((resolve) => setTimeout(resolve, 500));

    // Click the filters button
    const filterButton = canvasElement.querySelector('button:has(svg)');
    if (filterButton && filterButton.textContent?.includes('Filters')) {
      (filterButton as HTMLButtonElement).click();
    }
  },
};
