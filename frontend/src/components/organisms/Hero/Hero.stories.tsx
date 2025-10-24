import type { Meta, StoryObj } from '@storybook/react';
import { Hero } from './Hero';

const meta = {
  title: 'Organisms/Hero',
  component: Hero,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Hero>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: 'Find Your Perfect Chef',
    subtitle: 'Book professional chefs for your home cooking needs',
  },
};

export const WithoutSecondaryButton: Story = {
  args: {
    title: 'Welcome Back!',
    subtitle: 'Continue exploring our talented chefs',
    primaryButtonText: 'Browse Chefs',
    showSecondaryButton: false,
  },
};

export const CustomButtons: Story = {
  args: {
    title: 'Ready to Cook?',
    subtitle: 'Connect with top-rated chefs in your area',
    primaryButtonText: 'Find Chefs',
    primaryButtonLink: '/explore',
    secondaryButtonText: 'Learn More',
    secondaryButtonLink: '/about',
  },
};

export const LongContent: Story = {
  args: {
    title: 'Experience Culinary Excellence at Home',
    subtitle:
      'Connect with professional chefs who will bring restaurant-quality dining to your home. Perfect for special occasions, meal prep, or simply treating yourself.',
  },
};

