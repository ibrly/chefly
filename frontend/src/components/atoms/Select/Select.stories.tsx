import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Select, SelectOption } from './Select';

const cuisineOptions: SelectOption[] = [
  { value: 'italian', label: 'Italian' },
  { value: 'french', label: 'French' },
  { value: 'japanese', label: 'Japanese' },
  { value: 'mexican', label: 'Mexican' },
  { value: 'indian', label: 'Indian' },
];

const priceOptions: SelectOption[] = [
  { value: 'any', label: 'Any Price' },
  { value: 'under-50', label: 'Under $50/hr' },
  { value: '50-100', label: '$50 - $100/hr' },
  { value: '100-plus', label: '$100+/hr' },
];

const meta = {
  title: 'Atoms/Select',
  component: Select,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div style={{ width: '300px' }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Select>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => {
    const [value, setValue] = useState('');
    return <Select {...args} value={value} onChange={(e) => setValue(e.target.value)} />;
  },
  args: {
    label: 'Cuisine Type',
    options: cuisineOptions,
    placeholder: 'Select a cuisine',
  },
};

export const WithValue: Story = {
  render: (args) => {
    const [value, setValue] = useState('italian');
    return <Select {...args} value={value} onChange={(e) => setValue(e.target.value)} />;
  },
  args: {
    label: 'Cuisine Type',
    options: cuisineOptions,
  },
};

export const WithError: Story = {
  render: (args) => {
    const [value, setValue] = useState('');
    return <Select {...args} value={value} onChange={(e) => setValue(e.target.value)} />;
  },
  args: {
    label: 'Price Range',
    options: priceOptions,
    error: 'Please select a price range',
  },
};

export const WithHelperText: Story = {
  render: (args) => {
    const [value, setValue] = useState('');
    return <Select {...args} value={value} onChange={(e) => setValue(e.target.value)} />;
  },
  args: {
    label: 'Price Range',
    options: priceOptions,
    helperText: 'Select your budget for the event',
  },
};

export const Disabled: Story = {
  render: (args) => {
    const [value, setValue] = useState('italian');
    return <Select {...args} value={value} onChange={(e) => setValue(e.target.value)} disabled />;
  },
  args: {
    label: 'Cuisine Type',
    options: cuisineOptions,
  },
};

export const NoLabel: Story = {
  render: (args) => {
    const [value, setValue] = useState('');
    return <Select {...args} value={value} onChange={(e) => setValue(e.target.value)} />;
  },
  args: {
    options: cuisineOptions,
    placeholder: 'Select cuisine',
  },
};

