import type { Meta, StoryObj } from '@storybook/react';
import { ChefCard } from './ChefCard';

const meta = {
  title: 'Molecules/ChefCard',
  component: ChefCard,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div style={{ width: '350px' }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof ChefCard>;

export default meta;
type Story = StoryObj<typeof meta>;

const sampleChef = {
  id: '1',
  name: 'John Doe',
  email: 'john@example.com',
  role: 'CHEF' as const,
  bio: 'Experienced Italian chef with 15 years in fine dining. Specialized in authentic pasta and regional Italian cuisine.',
  specialties: ['Italian', 'Pasta', 'Mediterranean', 'Fine Dining'],
  experience: 15,
  rating: 4.8,
  reviewCount: 127,
  verified: true,
  hourlyRate: 85,
  location: 'New York, NY',
  profileImage: 'https://i.pravatar.cc/150?img=12',
  createdAt: '2023-01-01',
  updatedAt: '2023-01-01',
};

export const Default: Story = {
  args: {
    chef: sampleChef,
  },
};

export const Verified: Story = {
  args: {
    chef: {
      ...sampleChef,
      verified: true,
    },
  },
};

export const NotVerified: Story = {
  args: {
    chef: {
      ...sampleChef,
      verified: false,
    },
  },
};

export const NewChef: Story = {
  args: {
    chef: {
      ...sampleChef,
      rating: 0,
      reviewCount: 0,
      experience: 1,
    },
  },
};

export const HighRating: Story = {
  args: {
    chef: {
      ...sampleChef,
      rating: 5.0,
      reviewCount: 250,
    },
  },
};

export const WithLongBio: Story = {
  args: {
    chef: {
      ...sampleChef,
      bio: 'Award-winning chef with extensive experience in Italian, French, and Mediterranean cuisines. Trained in Michelin-starred restaurants across Europe. Specialized in creating authentic, memorable dining experiences for special occasions.',
    },
  },
};

export const ManySpecialties: Story = {
  args: {
    chef: {
      ...sampleChef,
      specialties: ['Italian', 'French', 'Mediterranean', 'Fusion', 'Vegan', 'Gluten-Free'],
    },
  },
};

export const Clickable: Story = {
  args: {
    chef: sampleChef,
    onClick: () => alert('Chef card clicked!'),
  },
};
