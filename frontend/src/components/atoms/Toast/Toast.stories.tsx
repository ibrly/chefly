import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Button } from '../Button';
import { Toast, ToastContainer, ToastProps } from './Toast';

const meta = {
  title: 'Atoms/Toast',
  component: Toast,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Toast>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Success: Story = {
  args: {
    id: '1',
    type: 'success',
    message: 'Booking confirmed successfully!',
    onClose: () => console.log('Toast closed'),
  },
};

export const Error: Story = {
  args: {
    id: '2',
    type: 'error',
    message: 'Failed to process payment. Please try again.',
    onClose: () => console.log('Toast closed'),
  },
};

export const Info: Story = {
  args: {
    id: '3',
    type: 'info',
    message: 'New message from Chef Mario',
    onClose: () => console.log('Toast closed'),
  },
};

export const Warning: Story = {
  args: {
    id: '4',
    type: 'warning',
    message: 'Your session will expire in 5 minutes',
    onClose: () => console.log('Toast closed'),
  },
};

export const Interactive: Story = {
  render: (args) => {
    const [toasts, setToasts] = useState<ToastProps[]>([]);

    const addToast = (type: ToastProps['type']) => {
      const id = Date.now().toString();
      const messages = {
        success: 'Operation completed successfully!',
        error: 'An error occurred!',
        info: 'Here is some information',
        warning: 'Warning: Please be careful',
      };

      setToasts((prev) => [
        ...prev,
        {
          id,
          type: type || 'info',
          message: messages[type || 'info'],
          onClose: (id: string) => setToasts((prev) => prev.filter((t) => t.id !== id)),
        },
      ]);
    };

    return (
      <div>
        <div className="flex gap-2 mb-4">
          <Button onClick={() => addToast('success')} size="sm">
            Success Toast
          </Button>
          <Button onClick={() => addToast('error')} size="sm" variant="danger">
            Error Toast
          </Button>
          <Button onClick={() => addToast('info')} size="sm" variant="outline">
            Info Toast
          </Button>
          <Button onClick={() => addToast('warning')} size="sm" variant="secondary">
            Warning Toast
          </Button>
        </div>
        <ToastContainer toasts={toasts} position="top-right" />
      </div>
    );
  },
  args: {
    id: 'interactive',
    message: 'Interactive',
    type: 'info',
    onClose: () => {},
  },
};

export const MultipleToasts: Story = {
  render: (args) => {
    const [toasts, setToasts] = useState<ToastProps[]>([
      {
        id: '1',
        type: 'success',
        message: 'Profile updated',
        onClose: (id) => setToasts((prev) => prev.filter((t) => t.id !== id)),
      },
      {
        id: '2',
        type: 'info',
        message: 'New notification',
        onClose: (id) => setToasts((prev) => prev.filter((t) => t.id !== id)),
      },
      {
        id: '3',
        type: 'error',
        message: 'Failed to save',
        onClose: (id) => setToasts((prev) => prev.filter((t) => t.id !== id)),
      },
    ]);

    return <ToastContainer toasts={toasts} position="top-right" />;
  },
  args: {
    id: 'multiple',
    message: 'Multiple',
    type: 'info',
    onClose: () => {},
  },
};

