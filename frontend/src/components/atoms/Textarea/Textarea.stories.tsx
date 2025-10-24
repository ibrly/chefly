import type { Meta, StoryObj } from '@storybook/react';
import { Textarea } from './Textarea';

const meta = {
  title: 'Atoms/Textarea',
  component: Textarea,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div style={{ width: '400px' }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Textarea>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    placeholder: 'Enter your message...',
  },
};

export const WithLabel: Story = {
  args: {
    label: 'Description',
    placeholder: 'Enter a description...',
  },
};

export const WithError: Story = {
  args: {
    label: 'Comments',
    placeholder: 'Enter your comments...',
    error: 'This field is required',
  },
};

export const WithHelperText: Story = {
  args: {
    label: 'Bio',
    placeholder: 'Tell us about yourself...',
    helperText: 'Maximum 500 characters',
  },
};

export const Disabled: Story = {
  args: {
    label: 'Disabled Textarea',
    placeholder: 'Cannot edit',
    disabled: true,
    value: 'This textarea is disabled',
  },
};

export const CustomRows: Story = {
  args: {
    label: 'Long Text',
    placeholder: 'Enter a long text...',
    rows: 10,
  },
};

export const WithValue: Story = {
  args: {
    label: 'Pre-filled Content',
    value: 'This is some pre-filled content that demonstrates how the textarea looks with actual text in it.',
  },
};

