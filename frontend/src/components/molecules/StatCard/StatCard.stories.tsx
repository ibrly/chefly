import type { Meta, StoryObj } from '@storybook/react';
import { StatCard } from './StatCard';
import { Calendar, CheckCircle, Clock, DollarSign, TrendingUp, Users } from 'lucide-react';

const meta = {
  title: 'Molecules/StatCard',
  component: StatCard,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div style={{ width: '250px' }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof StatCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    value: '42',
    label: 'Total Bookings',
  },
};

export const WithIcon: Story = {
  args: {
    value: '24',
    label: 'Total Bookings',
    icon: Calendar,
  },
};

export const WithColoredValue: Story = {
  args: {
    value: '15',
    label: 'Confirmed',
    valueColor: 'text-green-600',
    icon: CheckCircle,
  },
};

export const WithTrend: Story = {
  args: {
    value: '1,234',
    label: 'Total Revenue',
    valueColor: 'text-blue-600',
    icon: DollarSign,
    trend: {
      value: 12.5,
      isPositive: true,
    },
  },
};

export const WithNegativeTrend: Story = {
  args: {
    value: '8',
    label: 'Pending Requests',
    valueColor: 'text-yellow-600',
    icon: Clock,
    trend: {
      value: 5.2,
      isPositive: false,
    },
  },
};

export const LargeNumber: Story = {
  args: {
    value: '1,234,567',
    label: 'Total Users',
    valueColor: 'text-purple-600',
    icon: Users,
  },
};

export const GridOfStats: Story = {
  render: (args) => (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4" style={{ width: '900px' }}>
      <StatCard value="42" label="Total Bookings" icon={Calendar} />
      <StatCard value="15" label="Confirmed" valueColor="text-green-600" icon={CheckCircle} />
      <StatCard value="30" label="Completed" valueColor="text-blue-600" icon={TrendingUp} />
      <StatCard value="8" label="Pending" valueColor="text-yellow-600" icon={Clock} />
    </div>
  ),
  args: {
    value: '42',
    label: 'Total Bookings',
    icon: Calendar,
  },
};

export const WithTrends: Story = {
  render: (args) => (
    <div className="grid grid-cols-2 gap-4" style={{ width: '600px' }}>
      <StatCard
        value="$24,567"
        label="Revenue"
        valueColor="text-green-600"
        icon={DollarSign}
        trend={{ value: 15.3, isPositive: true }}
      />
      <StatCard
        value="892"
        label="Active Users"
        valueColor="text-blue-600"
        icon={Users}
        trend={{ value: 8.1, isPositive: true }}
      />
      <StatCard
        value="127"
        label="Pending"
        valueColor="text-yellow-600"
        icon={Clock}
        trend={{ value: 3.2, isPositive: false }}
      />
      <StatCard
        value="45"
        label="New Today"
        valueColor="text-purple-600"
        icon={TrendingUp}
        trend={{ value: 22.5, isPositive: true }}
      />
    </div>
  ),
  args: {
    value: '$24,567',
    label: 'Revenue',
    valueColor: 'text-green-600',
    icon: DollarSign,
    trend: { value: 15.3, isPositive: true },
  },
};

