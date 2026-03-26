# Modal Component Documentation

Premium Modal system for DocuMind - matches SaaS standards (Notion, Linear, Stripe Dashboard).

## Overview

The Modal system consists of:

1. **Base Modal Component** - Core dialog with animations and accessibility
2. **Modal Context Provider** - Global state management
3. **Modal Variants** - Pre-built components for common use cases
4. **useModal Hook** - Programmatic modal control from any component

---

## Installation

The ModalProvider is already integrated in `App.tsx`. You're ready to use modals!

```tsx
// Already set up in App.tsx
import { ModalProvider } from './context/ModalContext';

<ModalProvider>
  <BrowserRouter>
    <AppRoutes />
  </BrowserRouter>
</ModalProvider>
```

---

## Usage Patterns

### 1. Using useModal Hook (Recommended for most cases)

Use the hook to programmatically open modals from any component:

```tsx
import { useModal, ModalPresets } from '../context';

export function MyComponent() {
  const { openModal, closeModal } = useModal();

  const handleDeleteClick = (id: string) => {
    const modalId = openModal(
      ModalPresets.confirm({
        title: 'Delete Document',
        message: 'Are you sure you want to delete this document? This action cannot be undone.',
        confirmText: 'Delete',
        cancelText: 'Keep',
        isDangerous: true,
        onConfirm: async () => {
          await deleteDocument(id);
          closeModal(modalId);
        },
      })
    );
  };

  return <button onClick={() => handleDeleteClick('doc-123')}>Delete</button>;
}
```

### 2. Using AlertModal Variant

Simple alert dialog:

```tsx
import { AlertModal } from '../components/common';
import { useState } from 'react';

export function MyComponent() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button onClick={() => setIsOpen(true)}>Show Alert</button>
      <AlertModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Success"
        message="Your changes have been saved!"
      />
    </>
  );
}
```

### 3. Using ConfirmModal Variant

Confirmation dialog with loading state:

```tsx
import { ConfirmModal } from '../components/common';
import { useState } from 'react';

export function MyComponent() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleConfirm = async () => {
    setIsLoading(true);
    try {
      await performAction();
      setIsOpen(false);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <button onClick={() => setIsOpen(true)}>Confirm Action</button>
      <ConfirmModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onConfirm={handleConfirm}
        title="Are you sure?"
        message="This action will be permanent."
        isLoading={isLoading}
        isDangerous={true}
      />
    </>
  );
}
```

### 4. Using FormModal Variant

Modal with form inputs:

```tsx
import { FormModal, Input } from '../components/common';
import { useState } from 'react';

export function MyComponent() {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({ name: '' });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      await saveData(formData);
      setIsOpen(false);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <button onClick={() => setIsOpen(true)}>Open Form</button>
      <FormModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onSubmit={handleSubmit}
        title="Create New"
        submitText="Create"
        isLoading={isLoading}
      >
        <Input
          type="text"
          placeholder="Enter name"
          value={formData.name}
          onChange={(e) => setFormData({ name: e.target.value })}
        />
      </FormModal>
    </>
  );
}
```

### 5. Using Base Modal Component

Full control for custom modal layouts:

```tsx
import { Modal, Button } from '../components/common';
import { useState } from 'react';

export function MyComponent() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button onClick={() => setIsOpen(true)}>Custom Modal</button>
      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Custom Dialog"
        size="lg"
        footer={
          <div className="flex gap-3">
            <Button onClick={() => setIsOpen(false)} variant="secondary">
              Cancel
            </Button>
            <Button onClick={() => setIsOpen(false)} variant="primary">
              Done
            </Button>
          </div>
        }
      >
        <div className="space-y-4">
          <p>Your custom content here</p>
          <div className="bg-blue-50 p-4 rounded-lg">
            Custom layout
          </div>
        </div>
      </Modal>
    </>
  );
}
```

---

## ModalPresets

Pre-built modal configurations for common use cases:

### ModalPresets.confirm()

```tsx
import { useModal, ModalPresets } from '../context';

const { openModal } = useModal();

const id = openModal(
  ModalPresets.confirm({
    title: 'Confirm',
    message: 'Continue with this action?',
    confirmText: 'Yes',
    cancelText: 'No',
    isDangerous: false,
    onConfirm: async () => {
      // Handle confirmation
      console.log('Confirmed');
    },
    onCancel: () => {
      console.log('Cancelled');
    },
  })
);
```

### ModalPresets.alert()

```tsx
const id = openModal(
  ModalPresets.alert({
    title: 'Information',
    message: 'This is an alert message',
    buttonText: 'OK',
    onClose: () => {
      console.log('Alert closed');
    },
  })
);
```

---

## API Reference

### Modal Component Props

```tsx
interface ModalProps {
  // Visibility
  isOpen: boolean;                    // Modal visibility state
  onClose: () => void;                // Called when modal should close

  // Content
  children: React.ReactNode;          // Modal body content
  title?: React.ReactNode;            // Optional header title
  footer?: React.ReactNode;           // Optional footer content

  // Behavior
  size?: 'sm' | 'md' | 'lg' | 'xl';  // Modal size (default: 'md')
  showCloseButton?: boolean;          // Show X button (default: true)
  closeOnBackdropClick?: boolean;     // Close on backdrop click (default: true)
  closeOnEsc?: boolean;               // Close on ESC key (default: true)
  disableBackdropClick?: boolean;     // Disable backdrop click even if enabled

  // Styling
  className?: string;                 // Additional modal classes
  backdropClassName?: string;         // Additional backdrop classes
  ariaLabel?: string;                 // Accessibility label
}
```

### useModal Hook

```tsx
const {
  openModal,      // (config: ModalConfig) => string - Opens a modal, returns ID
  closeModal,     // (id: string) => void - Closes specific modal
  closeAllModals, // () => void - Closes all open modals
  getOpenModals,  // () => ModalState[] - Gets all open modals
  getModal,       // (id: string) => ModalState | undefined - Gets specific modal
} = useModal();
```

---

## Theme Integration

Modal design tokens are in `THEME.modal`:

```tsx
// In src/styles/theme.ts
modal: {
  backdrop: {
    color: 'rgba(0, 0, 0, 0.5)',
    blur: 'blur(4px)',
  },
  border: {
    light: '#e5e7eb',
    dark: '#374151',
  },
  animation: {
    duration: '0.4s',
    timingFunction: 'ease-out',
  },
  sizes: {
    sm: { maxWidth: '28rem', padding: '1.5rem' },
    md: { maxWidth: '32rem', padding: '1.5rem' },
    lg: { maxWidth: '36rem', padding: '2rem' },
    xl: { maxWidth: '48rem', padding: '2rem' },
  },
}
```

---

## Features

✅ **Premium Animations**
- Backdrop fade-in
- Content slide-up + scale effect
- Smooth transitions

✅ **Accessibility**
- ARIA labels
- Focus management
- ESC key support
- Keyboard navigation

✅ **Responsive**
- Mobile-first sizing
- Responsive typography
- Touch-friendly

✅ **Dark Mode Ready**
- Dark mode colors
- Automatic theme detection

✅ **State Management**
- Global context API
- Multiple modals support
- Modal ID tracking

---

## Best Practices

1. **For user confirmations**: Use `ConfirmModal` variant
2. **For forms**: Use `FormModal` variant
3. **For alerts**: Use `AlertModal` variant
4. **For complex layouts**: Use base `Modal` component
5. **For programmatic control**: Use `useModal()` hook

---

## Examples

### Delete Confirmation

```tsx
const { openModal, closeModal } = useModal();

const handleDelete = (id) => {
  const modalId = openModal(
    ModalPresets.confirm({
      title: 'Delete Item',
      message: 'This cannot be undone.',
      isDangerous: true,
      confirmText: 'Delete',
      onConfirm: async () => {
        await api.delete(`/items/${id}`);
        closeModal(modalId);
      },
    })
  );
};
```

### Success Message

```tsx
const { openModal, closeModal } = useModal();

const handleSuccess = () => {
  const modalId = openModal(
    ModalPresets.alert({
      title: 'Success!',
      message: 'Operation completed successfully.',
      onClose: () => closeModal(modalId),
    })
  );
};
```

---

## Troubleshooting

### Modal not appearing

1. Check that `ModalProvider` wraps your app in `App.tsx`
2. Ensure `useModal()` is called within `ModalProvider`
3. Check browser console for errors

### Modal not closing

1. Call `closeModal(id)` or `onClose()` callback
2. Check for `disableBackdropClick` prop
3. Verify `closeOnEsc` is not disabled

### Styling issues

1. Check that Tailwind CSS is imported
2. Verify theme colors are correct
3. Check z-index stacking (modal uses z-50)

---

## Version History

- **v1.0** - Initial Modal component with variants and context API
