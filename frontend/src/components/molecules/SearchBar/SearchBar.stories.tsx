import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { SearchBar } from './SearchBar';

const meta = {
  title: 'Molecules/SearchBar',
  component: SearchBar,
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
} satisfies Meta<typeof SearchBar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => {
    const [value, setValue] = useState('');
    return <SearchBar {...args} value={value} onChange={setValue} />;
  },
  args: {
    value: '',
    onChange: () => {},
    placeholder: 'Search chefs...',
  },
};

export const WithSearchButton: Story = {
  render: (args) => {
    const [value, setValue] = useState('');
    return (
      <SearchBar
        {...args}
        value={value}
        onChange={setValue}
        onSearch={() => alert(`Searching for: ${value}`)}
      />
    );
  },
  args: {
    value: '',
    onChange: () => {},
  },
};

export const WithPlaceholder: Story = {
  render: (args) => {
    const [value, setValue] = useState('');
    return <SearchBar {...args} value={value} onChange={setValue} placeholder="Search for chefs..." />;
  },
  args: {
    value: '',
    onChange: () => {},
  },
};

export const WithValue: Story = {
  render: (args) => {
    const [value, setValue] = useState('Italian chef');
    return <SearchBar {...args} value={value} onChange={setValue} />;
  },
  args: {
    value: 'Italian chef',
    onChange: () => {},
  },
};
