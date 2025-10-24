import type { Meta, StoryObj } from '@storybook/react';
import { Alert } from './Alert';

const meta = {
  title: 'Atoms/Alert',
  component: Alert,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div style={{ width: '500px' }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Alert>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Success: Story = {
  args: {
    type: 'success',
    message: 'Your booking has been confirmed successfully!',
  },
};

export const Error: Story = {
  args: {
    type: 'error',
    message: 'Invalid email or password. Please try again.',
  },
};

export const Warning: Story = {
  args: {
    type: 'warning',
    message: 'Your session will expire in 5 minutes. Please save your work.',
  },
};

export const Info: Story = {
  args: {
    type: 'info',
    message: 'New features have been added to the platform. Check them out!',
  },
};

export const WithTitle: Story = {
  args: {
    type: 'success',
    title: 'Success!',
    message: 'Your profile has been updated successfully.',
  },
};

export const Closeable: Story = {
  args: {
    type: 'info',
    title: 'Tip',
    message: 'You can save your favorite chefs for quick access later.',
    onClose: () => alert('Alert closed'),
  },
};

export const LongMessage: Story = {
  args: {
    type: 'error',
    title: 'Error',
    message:
      'An error occurred while processing your request. This could be due to a network issue or a problem with the server. Please try again later or contact support if the problem persists.',
  },
};

