import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Button } from '../Button';
import { Modal } from './Modal';

const meta = {
  title: 'Atoms/Modal',
  component: Modal,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Modal>;

export default meta;
type Story = StoryObj<typeof meta>;

const ModalWithButton = (args: React.ComponentProps<typeof Modal>) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Open Modal</Button>
      <Modal {...args} isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
};

export const Default: Story = {
  render: (args) => <ModalWithButton {...args} />,
  args: {
    title: 'Modal Title',
    children: <p>This is the modal content. You can put any content here.</p>,
    isOpen: false,
    onClose: () => {},
  },
};

export const WithoutTitle: Story = {
  render: (args) => <ModalWithButton {...args} />,
  args: {
    children: (
      <>
        <h3 className="text-lg font-semibold mb-4">Custom Content</h3>
        <p>Modal without a title prop, but with custom content.</p>
      </>
    ),
    isOpen: false,
    onClose: () => {},
  },
};

export const SmallSize: Story = {
  render: (args) => <ModalWithButton {...args} />,
  args: {
    title: 'Small Modal',
    size: 'sm',
    children: <p>This is a small modal.</p>,
    isOpen: false,
    onClose: () => {},
  },
};

export const LargeSize: Story = {
  render: (args) => <ModalWithButton {...args} />,
  args: {
    title: 'Large Modal',
    size: 'lg',
    children: (
      <>
        <p>This is a large modal with more space for content.</p>
        <p className="mt-4">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor
          incididunt ut labore et dolore magna aliqua.
        </p>
      </>
    ),
    isOpen: false,
    onClose: () => {},
  },
};

export const WithForm: Story = {
  render: (args) => <ModalWithButton {...args} />,
  args: {
    title: 'Contact Form',
    children: (
      <form className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
          <input
            type="text"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
          <input
            type="email"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="flex gap-2 justify-end">
          <Button variant="ghost">Cancel</Button>
          <Button>Submit</Button>
        </div>
      </form>
    ),
    isOpen: false,
    onClose: () => {},
  },
};

export const NoCloseButton: Story = {
  render: (args) => <ModalWithButton {...args} />,
  args: {
    title: 'No Close Button',
    showCloseButton: false,
    children: (
      <>
        <p className="mb-4">This modal has no close button in the header.</p>
        <Button fullWidth>Close Modal</Button>
      </>
    ),
    isOpen: false,
    onClose: () => {},
  },
};

export const NoOverlayClose: Story = {
  render: (args) => <ModalWithButton {...args} />,
  args: {
    title: "Click Overlay Won't Close",
    closeOnOverlayClick: false,
    children: (
      <>
        <p className="mb-4">Clicking the overlay won't close this modal.</p>
        <p className="mb-4">Use the close button or press ESC.</p>
        <Button fullWidth>Close</Button>
      </>
    ),
    isOpen: false,
    onClose: () => {},
  },
};
