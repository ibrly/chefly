import type { Meta, StoryObj } from '@storybook/react';
import { ReviewCard } from './ReviewCard';

const meta = {
  title: 'Molecules/ReviewCard',
  component: ReviewCard,
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
} satisfies Meta<typeof ReviewCard>;

export default meta;
type Story = StoryObj<typeof meta>;

const sampleReview = {
  id: '1',
  rating: 5,
  comment:
    'Absolutely amazing experience! The chef was professional, friendly, and the food was incredible. Would definitely book again!',
  client: {
    id: '1',
    name: 'Sarah Johnson',
    email: 'sarah@example.com',
    role: 'CLIENT' as const,
    profileImage: 'https://i.pravatar.cc/150?img=5',
    createdAt: '2023-01-01',
    updatedAt: '2023-01-01',
  },
  createdAt: '2024-01-15T10:30:00Z',
};

export const FiveStars: Story = {
  args: {
    review: sampleReview,
  },
};

export const FourStars: Story = {
  args: {
    review: {
      ...sampleReview,
      rating: 4,
      comment: 'Great service and delicious food. Minor delay in starting but overall excellent!',
    },
  },
};

export const ThreeStars: Story = {
  args: {
    review: {
      ...sampleReview,
      rating: 3,
      comment:
        'Good experience but not exceptional. Food was tasty but presentation could be improved.',
    },
  },
};

export const TwoStars: Story = {
  args: {
    review: {
      ...sampleReview,
      rating: 2,
      comment: 'Below expectations. Several dishes were overcooked and service was slow.',
    },
  },
};

export const OneStar: Story = {
  args: {
    review: {
      ...sampleReview,
      rating: 1,
      comment: 'Very disappointed. Chef arrived late and food quality was poor.',
    },
  },
};

export const WithoutComment: Story = {
  args: {
    review: {
      ...sampleReview,
      comment: undefined,
    },
  },
};

export const LongComment: Story = {
  args: {
    review: {
      ...sampleReview,
      comment:
        'I had the most wonderful evening with Chef John. From the moment he arrived, his professionalism and warm personality made us feel at ease. The menu he prepared was beyond our expectations - each course was perfectly executed with attention to detail and presentation. The flavors were extraordinary, and he took the time to explain each dish and answer our questions about the cooking techniques. His passion for cooking really shines through in his work. We will definitely be booking him again for future events!',
    },
  },
};

export const NoProfileImage: Story = {
  args: {
    review: {
      ...sampleReview,
      client: {
        ...sampleReview.client!,
        profileImage: undefined,
      },
    },
  },
};
