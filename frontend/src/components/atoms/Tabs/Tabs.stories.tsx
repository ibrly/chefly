import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Tabs, Tab } from './Tabs';

const basicTabs: Tab[] = [
  { key: 'all', label: 'All' },
  { key: 'upcoming', label: 'Upcoming' },
  { key: 'past', label: 'Past' },
  { key: 'cancelled', label: 'Cancelled' },
];

const tabsWithCounts: Tab[] = [
  { key: 'all', label: 'All', count: 42 },
  { key: 'upcoming', label: 'Upcoming', count: 8 },
  { key: 'past', label: 'Past', count: 30 },
  { key: 'cancelled', label: 'Cancelled', count: 4 },
];

const statusTabs: Tab[] = [
  { key: 'active', label: 'Active', count: 15 },
  { key: 'pending', label: 'Pending', count: 5 },
  { key: 'completed', label: 'Completed', count: 120 },
];

const meta = {
  title: 'Atoms/Tabs',
  component: Tabs,
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
} satisfies Meta<typeof Tabs>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => {
    const [activeTab, setActiveTab] = useState('all');
    return <Tabs {...args} tabs={basicTabs} activeTab={activeTab} onChange={setActiveTab} />;
  },
  args: {
    tabs: basicTabs,
    activeTab: 'all',
    onChange: () => {},
  },
};

export const WithCounts: Story = {
  render: (args) => {
    const [activeTab, setActiveTab] = useState('all');
    return <Tabs {...args} tabs={tabsWithCounts} activeTab={activeTab} onChange={setActiveTab} />;
  },
  args: {
    tabs: tabsWithCounts,
    activeTab: 'all',
    onChange: () => {},
  },
};

export const StatusTabs: Story = {
  render: (args) => {
    const [activeTab, setActiveTab] = useState('active');
    return <Tabs {...args} tabs={statusTabs} activeTab={activeTab} onChange={setActiveTab} />;
  },
  args: {
    tabs: statusTabs,
    activeTab: 'active',
    onChange: () => {},
  },
};

export const ManyTabs: Story = {
  render: (args) => {
    const [activeTab, setActiveTab] = useState('tab1');
    const manyTabs: Tab[] = Array.from({ length: 10 }, (_, i) => ({
      key: `tab${i + 1}`,
      label: `Tab ${i + 1}`,
      count: Math.floor(Math.random() * 100),
    }));
    return <Tabs {...args} tabs={manyTabs} activeTab={activeTab} onChange={setActiveTab} />;
  },
  args: {
    tabs: [],
    activeTab: 'tab1',
    onChange: () => {},
  },
};

export const Interactive: Story = {
  render: (args) => {
    const [activeTab, setActiveTab] = useState('all');
    return (
      <div className="space-y-4">
        <Tabs {...args} tabs={tabsWithCounts} activeTab={activeTab} onChange={setActiveTab} />
        <div className="p-4 bg-gray-50 rounded-lg">
          <h3 className="font-semibold mb-2">Active Tab: {activeTab}</h3>
          <p className="text-sm text-gray-600">Click on tabs to see the content change.</p>
        </div>
      </div>
    );
  },
  args: {
    tabs: tabsWithCounts,
    activeTab: 'all',
    onChange: () => {},
  },
};

