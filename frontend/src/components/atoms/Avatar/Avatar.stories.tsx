import type { Meta, StoryObj } from '@storybook/react';
import { Avatar } from './Avatar';

const meta = {
  title: 'Atoms/Avatar',
  component: Avatar,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
    },
  },
} satisfies Meta<typeof Avatar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};

export const WithImage: Story = {
  args: {
    src: 'https://i.pravatar.cc/150?img=1',
    alt: 'User avatar',
  },
};

export const WithFallback: Story = {
  args: {
    fallback: 'JD',
  },
};

export const ExtraSmall: Story = {
  args: {
    size: 'xs',
    src: 'https://i.pravatar.cc/150?img=2',
  },
};

export const Small: Story = {
  args: {
    size: 'sm',
    src: 'https://i.pravatar.cc/150?img=3',
  },
};

export const Medium: Story = {
  args: {
    size: 'md',
    src: 'https://i.pravatar.cc/150?img=4',
  },
};

export const Large: Story = {
  args: {
    size: 'lg',
    src: 'https://i.pravatar.cc/150?img=5',
  },
};

export const ExtraLarge: Story = {
  args: {
    size: 'xl',
    src: 'https://i.pravatar.cc/150?img=6',
  },
};

export const BrokenImage: Story = {
  args: {
    src: 'https://broken-image-url.jpg',
    alt: 'Broken image',
  },
};

export const FallbackText: Story = {
  args: {
    fallback: 'AB',
    size: 'lg',
  },
};
