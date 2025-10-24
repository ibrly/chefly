import type { Meta, StoryObj } from '@storybook/react';
import { Spinner } from './Spinner';

const meta = {
  title: 'Atoms/Spinner',
  component: Spinner,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
    },
    variant: {
      control: 'select',
      options: ['primary', 'white', 'gray'],
    },
  },
} satisfies Meta<typeof Spinner>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    variant: 'primary',
  },
};

export const White: Story = {
  args: {
    variant: 'white',
  },
  parameters: {
    backgrounds: { default: 'dark' },
  },
};

export const Gray: Story = {
  args: {
    variant: 'gray',
  },
};

export const ExtraSmall: Story = {
  args: {
    size: 'xs',
  },
};

export const Small: Story = {
  args: {
    size: 'sm',
  },
};

export const Medium: Story = {
  args: {
    size: 'md',
  },
};

export const Large: Story = {
  args: {
    size: 'lg',
  },
};

export const ExtraLarge: Story = {
  args: {
    size: 'xl',
  },
};

export const InButton: Story = {
  render: () => (
    <button className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg">
      <Spinner size="sm" variant="white" className="mr-2" />
      Loading...
    </button>
  ),
};

export const Centered: Story = {
  render: () => (
    <div className="flex items-center justify-center h-64 bg-gray-50 rounded-lg">
      <Spinner size="lg" />
    </div>
  ),
};

