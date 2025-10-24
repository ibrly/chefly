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
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'xl', 'full'],
    },
  },
} satisfies Meta<typeof Modal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    return (
      <>
        <Button onClick={() => setIsOpen(true)}>Open Modal</Button>
        <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} title="Modal Title">
          <p>This is the modal content. You can put any content here.</p>
        </Modal>
      </>
    );
  },
};

export const WithoutTitle: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    return (
      <>
        <Button onClick={() => setIsOpen(true)}>Open Modal</Button>
        <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
          <h3 className="text-lg font-semibold mb-4">Custom Content</h3>
          <p>Modal without a title prop, but with custom content.</p>
        </Modal>
      </>
    );
  },
};

export const SmallSize: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    return (
      <>
        <Button onClick={() => setIsOpen(true)}>Open Small Modal</Button>
        <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} title="Small Modal" size="sm">
          <p>This is a small modal.</p>
        </Modal>
      </>
    );
  },
};

export const LargeSize: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    return (
      <>
        <Button onClick={() => setIsOpen(true)}>Open Large Modal</Button>
        <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} title="Large Modal" size="lg">
          <p>This is a large modal with more space for content.</p>
          <p className="mt-4">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua.
          </p>
        </Modal>
      </>
    );
  },
};

export const WithForm: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    return (
      <>
        <Button onClick={() => setIsOpen(true)}>Open Form Modal</Button>
        <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} title="Contact Form">
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
              <Button variant="ghost" onClick={() => setIsOpen(false)}>
                Cancel
              </Button>
              <Button onClick={() => setIsOpen(false)}>Submit</Button>
            </div>
          </form>
        </Modal>
      </>
    );
  },
};

export const NoCloseButton: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    return (
      <>
        <Button onClick={() => setIsOpen(true)}>Open Modal</Button>
        <Modal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          title="No Close Button"
          showCloseButton={false}
        >
          <p className="mb-4">This modal has no close button in the header.</p>
          <Button onClick={() => setIsOpen(false)} fullWidth>
            Close Modal
          </Button>
        </Modal>
      </>
    );
  },
};

export const NoOverlayClose: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    return (
      <>
        <Button onClick={() => setIsOpen(true)}>Open Modal</Button>
        <Modal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          title="Click Overlay Won't Close"
          closeOnOverlayClick={false}
        >
          <p className="mb-4">Clicking the overlay won't close this modal.</p>
          <p className="mb-4">Use the close button or press ESC.</p>
          <Button onClick={() => setIsOpen(false)} fullWidth>
            Close
          </Button>
        </Modal>
      </>
    );
  },
};

