import type { Meta, StoryObj } from '@storybook/react';
import { BookingForm } from './BookingForm';

const meta = {
  title: 'Organisms/BookingForm',
  component: BookingForm,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div style={{ width: '600px' }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof BookingForm>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    onSubmit: (data) => console.log('Booking submitted:', data),
  },
};

export const Loading: Story = {
  args: {
    onSubmit: (data) => console.log('Booking submitted:', data),
    loading: true,
  },
};

export const WithInitialData: Story = {
  args: {
    onSubmit: (data) => console.log('Booking submitted:', data),
    initialData: {
      date: '2024-12-25',
      time: '18:00',
      location: '123 Main St, New York, NY 10001',
      guests: 6,
      menuPreferences: 'Italian cuisine with vegetarian options',
      dietaryRestrictions: 'One guest is vegan',
    },
  },
};
