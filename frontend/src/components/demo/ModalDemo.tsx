import React, { useState } from 'react';
import { useModal, ModalPresets } from '../../context/ModalContext';
import {
  Modal,
  AlertModal,
  ConfirmModal,
  FormModal,
  Button,
  Input,
} from '../common';

/**
 * Modal Demo Component
 * 
 * Showcases all Modal capabilities:
 * - All size variants (sm, md, lg, xl)
 * - All preset types (alert, confirm, form)
 * - Global context usage with useModal hook
 * - Loading states
 * - Responsive behavior
 * 
 * Import this in Dashboard for testing:
 * import { ModalDemo } from '../components/demo/ModalDemo';
 */
export const ModalDemo: React.FC = () => {
  const { openModal, closeModal } = useModal();

  // State for variant examples
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isCustomOpen, setIsCustomOpen] = useState(false);
  const [isLoadingOpen, setIsLoadingOpen] = useState(false);
  
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '' });

  // Simulate async operations
  const simulateAsync = async () => {
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsLoading(false);
  };

  return (
    <div className="p-8 bg-gray-50 dark:bg-slate-900 min-h-screen">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
            Modal Component Showcase
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Premium SaaS modal system - responsive, accessible, animated
          </p>
        </div>

        {/* Variant Section */}
        <div className="space-y-8">
          {/* Size Variants */}
          <section className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-gray-200 dark:border-slate-700">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
              Size Variants
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {(['sm', 'md', 'lg', 'xl'] as const).map((size) => (
                <Button
                  key={size}
                  onClick={() => setIsCustomOpen(true)}
                  variant="secondary"
                  className="w-full"
                >
                  {size.toUpperCase()} Modal
                </Button>
              ))}
            </div>
          </section>

          {/* Preset Modals */}
          <section className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-gray-200 dark:border-slate-700">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
              Preset Variants
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  AlertModal
                </h3>
                <Button
                  onClick={() => setIsAlertOpen(true)}
                  variant="primary"
                  className="w-full"
                >
                  Open Alert
                </Button>
              </div>

              <div>
                <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  ConfirmModal
                </h3>
                <Button
                  onClick={() => setIsConfirmOpen(true)}
                  variant="primary"
                  className="w-full"
                >
                  Open Confirm
                </Button>
              </div>

              <div>
                <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  FormModal
                </h3>
                <Button
                  onClick={() => setIsFormOpen(true)}
                  variant="primary"
                  className="w-full"
                >
                  Open Form
                </Button>
              </div>

              <div>
                <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Dangerous Action
                </h3>
                <Button
                  onClick={() =>
                    openModal(
                      ModalPresets.confirm({
                        title: 'Delete Document',
                        message: 'This action cannot be undone.',
                        isDangerous: true,
                        confirmText: 'Delete',
                        onConfirm: () => alert('Deleted!'),
                      })
                    )
                  }
                  variant="danger"
                  className="w-full"
                >
                  Delete (Confirm)
                </Button>
              </div>
            </div>
          </section>

          {/* Global/Context Usage */}
          <section className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-gray-200 dark:border-slate-700">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
              Global useModal Hook
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Open modals programmatically from anywhere using useModal()
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Button
                onClick={() => {
                  const id = openModal(
                    ModalPresets.alert({
                      title: 'Global Alert',
                      message: 'This modal was opened using useModal hook!',
                      onClose: () => closeModal(id),
                    })
                  );
                }}
                variant="secondary"
                className="w-full"
              >
                Alert via Hook
              </Button>

              <Button
                onClick={() => {
                  const id = openModal(
                    ModalPresets.confirm({
                      title: 'Confirm',
                      message: 'Proceed with this action?',
                      onConfirm: () => {
                        alert('Confirmed!');
                        closeModal(id);
                      },
                    })
                  );
                }}
                variant="secondary"
                className="w-full"
              >
                Confirm via Hook
              </Button>
            </div>
          </section>

          {/* Loading States */}
          <section className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-gray-200 dark:border-slate-700">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
              Loading & Async States
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Modals disable backdrop and buttons during loading
            </p>
            <Button
              onClick={() => setIsLoadingOpen(true)}
              variant="primary"
              className="w-full sm:w-auto"
            >
              Open with Loading
            </Button>
          </section>

          {/* Responsive Info */}
          <section className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-6 border border-blue-200 dark:border-blue-800">
            <h3 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">
              📱 Responsive
            </h3>
            <p className="text-blue-800 dark:text-blue-200 text-sm">
              Modals are fully responsive:
              <br />
              • Mobile: Full width with padding
              <br />
              • Tablet & Desktop: Max-width constraints
              <br />
              • Scrollable on overflow
            </p>
          </section>

          {/* Accessibility Info */}
          <section className="bg-green-50 dark:bg-green-900/20 rounded-xl p-6 border border-green-200 dark:border-green-800">
            <h3 className="font-semibold text-green-900 dark:text-green-100 mb-2">
              ♿ Accessibility
            </h3>
            <p className="text-green-800 dark:text-green-200 text-sm">
              ✓ ARIA labels and roles
              <br />
              ✓ Focus management
              <br />
              ✓ ESC key support
              <br />
              ✓ Semantic HTML
            </p>
          </section>
        </div>
      </div>

      {/* AlertModal Example */}
      <AlertModal
        isOpen={isAlertOpen}
        onClose={() => setIsAlertOpen(false)}
        title="Information"
        message="This is an alert modal! It displays important information to the user."
        buttonText="Got it"
      />

      {/* ConfirmModal Example */}
      <ConfirmModal
        isOpen={isConfirmOpen}
        onClose={() => setIsConfirmOpen(false)}
        onConfirm={async () => {
          await simulateAsync();
          setIsConfirmOpen(false);
        }}
        title="Confirm Action"
        message="Are you sure you want to proceed?"
        confirmText="Proceed"
        cancelText="Cancel"
        isLoading={isLoading}
      />

      {/* FormModal Example */}
      <FormModal
        isOpen={isFormOpen}
        onClose={() => {
          setIsFormOpen(false);
          setFormData({ name: '', email: '' });
        }}
        onSubmit={async () => {
          await simulateAsync();
          setIsFormOpen(false);
          setFormData({ name: '', email: '' });
        }}
        title="Create Account"
        submitText="Create"
        isLoading={isLoading}
      >
        <div className="space-y-4">
          <Input
            type="text"
            placeholder="Full name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
          <Input
            type="email"
            placeholder="Email address"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          />
        </div>
      </FormModal>

      {/* Custom Size Modal */}
      <Modal
        isOpen={isCustomOpen}
        onClose={() => setIsCustomOpen(false)}
        title="Custom Size Modal"
        size="lg"
        footer={<Button onClick={() => setIsCustomOpen(false)}>Close</Button>}
      >
        <div className="space-y-3">
          <p className="text-gray-600 dark:text-gray-300">
            This modal demonstrates custom sizing with responsive content.
          </p>
          <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg h-32 flex items-center justify-center text-white font-semibold">
            Custom Content Area
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Try resizing your browser window to see responsive behavior!
          </p>
        </div>
      </Modal>

      {/* Loading Modal */}
      <ConfirmModal
        isOpen={isLoadingOpen}
        onClose={() => setIsLoadingOpen(false)}
        onConfirm={async () => {
          await simulateAsync();
          setIsLoadingOpen(false);
        }}
        title="Processing..."
        message="The button is disabled and you cannot close via backdrop or ESC while loading."
        confirmText="Simulate Action"
        isLoading={isLoading}
      />
    </div>
  );
};

export default ModalDemo;
