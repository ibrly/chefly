import type { Meta, StoryObj } from '@storybook/react';
import { ChefGrid } from './ChefGrid';

const meta = {
  title: 'Organisms/ChefGrid',
  component: ChefGrid,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof ChefGrid>;

export default meta;
type Story = StoryObj<typeof meta>;

const sampleChefs = [
  {
    id: '1',
    name: 'Chef Mario',
    email: 'mario@example.com',
    role: 'CHEF' as const,
    bio: 'Authentic Italian cuisine specialist',
    specialties: ['Italian', 'Pasta', 'Pizza'],
    experience: 15,
    rating: 4.9,
    reviewCount: 156,
    verified: true,
    hourlyRate: 85,
    location: 'New York, NY',
    profileImage: 'https://i.pravatar.cc/150?img=12',
    createdAt: '2023-01-01',
    updatedAt: '2023-01-01',
  },
  {
    id: '2',
    name: 'Chef Sophie',
    email: 'sophie@example.com',
    role: 'CHEF' as const,
    bio: 'French pastry and fine dining expert',
    specialties: ['French', 'Pastry', 'Desserts'],
    experience: 12,
    rating: 4.8,
    reviewCount: 98,
    verified: true,
    hourlyRate: 95,
    location: 'Los Angeles, CA',
    profileImage: 'https://i.pravatar.cc/150?img=5',
    createdAt: '2023-01-01',
    updatedAt: '2023-01-01',
  },
  {
    id: '3',
    name: 'Chef Tanaka',
    email: 'tanaka@example.com',
    role: 'CHEF' as const,
    bio: 'Traditional Japanese cuisine master',
    specialties: ['Japanese', 'Sushi', 'Ramen'],
    experience: 20,
    rating: 5.0,
    reviewCount: 203,
    verified: true,
    hourlyRate: 120,
    location: 'San Francisco, CA',
    profileImage: 'https://i.pravatar.cc/150?img=33',
    createdAt: '2023-01-01',
    updatedAt: '2023-01-01',
  },
];

export const Default: Story = {
  args: {
    chefs: sampleChefs,
  },
};

export const Loading: Story = {
  args: {
    chefs: [],
    loading: true,
  },
};

export const Empty: Story = {
  args: {
    chefs: [],
    loading: false,
  },
};

export const SingleChef: Story = {
  args: {
    chefs: [sampleChefs[0]],
  },
};

export const Clickable: Story = {
  args: {
    chefs: sampleChefs,
    onChefClick: (chef) => alert(`Clicked on ${chef.name}`),
  },
};
