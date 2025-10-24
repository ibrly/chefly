import type { Meta, StoryObj } from '@storybook/react';
import { Footer } from './Footer';

const meta = {
  title: 'Organisms/Footer',
  component: Footer,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Footer>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};

export const WithoutSocialLinks: Story = {
  args: {
    showSocialLinks: false,
  },
};

export const CustomCompanyName: Story = {
  args: {
    companyName: 'ChefConnect',
    year: 2025,
  },
};

