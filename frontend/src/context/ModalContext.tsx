import React, { createContext, useContext, useState, useCallback, type ReactNode } from 'react';
import { Modal, type ModalProps } from '../components/common/Modal';

/**
 * Modal configuration for programmatic modal management
 */
export interface ModalConfig extends Omit<ModalProps, 'isOpen' | 'onClose'> {
  id?: string;
  onConfirm?: () => void | Promise<void>;
  onCancel?: () => void;
}

/**
 * Internal modal state with ID tracking
 */
interface ModalState extends ModalConfig {
  id: string;
  isOpen: boolean;
}

/**
 * Modal context type definition
 */
export type IModalContext = {
  /**
   * Open a modal with configuration
   * @param config Modal configuration
   * @returns Modal ID for later reference
   */
  openModal: (config: ModalConfig) => string;

  /**
   * Close a specific modal by ID
   * @param id Modal ID
   */
  closeModal: (id: string) => void;

  /**
   * Close all open modals
   */
  closeAllModals: () => void;

  /**
   * Get current state of all open modals
   */
  getOpenModals: () => ModalState[];

  /**
   * Get modal by ID
   */
  getModal: (id: string) => ModalState | undefined;
};

/**
 * Modal Context
 */
const ModalContext = createContext<IModalContext | undefined>(undefined);

/**
 * Modal Provider Props
 */
type ModalProviderProps = {
  children: ReactNode;
};

/**
 * Modal Context Provider Component
 *
 * Manages global modal state allowing modals to be opened/closed from anywhere in the app.
 * This is a premium SaaS feature inspired by systems like Linear, Stripe Dashboard, etc.
 *
 * Usage:
 * ```tsx
 * // Wrap app with provider
 * <ModalProvider>
 *   <App />
 * </ModalProvider>
 *
 * // Use in any component
 * const { openModal, closeModal } = useModal();
 * openModal({
 *   title: 'Confirm Delete',
 *   children: <p>Are you sure?</p>,
 *   footer: (
 *     <>
 *       <Button onClick={() => closeModal(id)} variant="secondary">Cancel</Button>
 *       <Button onClick={handleDelete} variant="danger">Delete</Button>
 *     </>
 *   )
 * });
 * ```
 */
export const ModalProvider: React.FC<ModalProviderProps> = ({ children }) => {
  const [modals, setModals] = useState<ModalState[]>([]);

  /**
   * Generate unique modal ID
   */
  const generateId = useCallback(() => {
    return `modal-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }, []);

  /**
   * Open a new modal
   */
  const openModal = useCallback(
    (config: ModalConfig) => {
      const id = config.id || generateId();
      const newModal: ModalState = {
        ...config,
        id,
        isOpen: true,
      };
      setModals((prev) => [...prev, newModal]);
      return id;
    },
    [generateId]
  );

  /**
   * Close a specific modal by ID
   */
  const closeModal = useCallback((id: string) => {
    setModals((prev) => prev.filter((modal) => modal.id !== id));
  }, []);

  /**
   * Close all open modals
   */
  const closeAllModals = useCallback(() => {
    setModals([]);
  }, []);

  /**
   * Get all open modals
   */
  const getOpenModals = useCallback(() => modals, [modals]);

  /**
   * Get specific modal by ID
   */
  const getModal = useCallback(
    (id: string) => modals.find((modal) => modal.id === id),
    [modals]
  );

  const value: IModalContext = {
    openModal,
    closeModal,
    closeAllModals,
    getOpenModals,
    getModal,
  };

  return (
    <ModalContext.Provider value={value}>
      {children}

      {/* Render all open modals */}
      {modals.map((modal) => (
        <Modal
          key={modal.id}
          isOpen={modal.isOpen}
          onClose={() => {
            modal.onCancel?.();
            closeModal(modal.id);
          }}
          title={modal.title}
          children={modal.children}
          size={modal.size}
          showCloseButton={modal.showCloseButton}
          closeOnBackdropClick={modal.closeOnBackdropClick}
          closeOnEsc={modal.closeOnEsc}
          className={modal.className}
          backdropClassName={modal.backdropClassName}
          ariaLabel={modal.ariaLabel}
          footer={modal.footer}
          disableBackdropClick={modal.disableBackdropClick}
        />
      ))}
    </ModalContext.Provider>
  );
};

/**
 * Hook to use Modal context
 * Must be called within ModalProvider
 *
 * @returns Modal context methods
 * @throws Error if used outside ModalProvider
 */
export const useModal = (): IModalContext => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error('useModal must be used within ModalProvider');
  }
  return context;
};

/**
 * Preset modal creators for common use cases
 */
export const ModalPresets = {
  /**
   * Create a confirmation modal
   */
  confirm: (options: {
    title: string;
    message: string;
    confirmText?: string;
    cancelText?: string;
    onConfirm: () => void | Promise<void>;
    onCancel?: () => void;
    isDangerous?: boolean;
  }) => {
    const {
      title,
      message,
      confirmText = 'Confirm',
      cancelText = 'Cancel',
      onConfirm,
      onCancel,
      isDangerous = false,
    } = options;

    return {
      title,
      children: <p className="text-gray-600 dark:text-gray-300">{message}</p>,
      footer: (
        <div className="flex gap-3">
          <button
            onClick={onCancel}
            className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-slate-700 rounded-lg hover:bg-gray-200 dark:hover:bg-slate-600 transition-colors"
          >
            {cancelText}
          </button>
          <button
            onClick={onConfirm}
            className={`px-4 py-2 text-sm font-medium text-white rounded-lg transition-colors ${
              isDangerous
                ? 'bg-red-600 hover:bg-red-700'
                : 'bg-blue-600 hover:bg-blue-700'
            }`}
          >
            {confirmText}
          </button>
        </div>
      ),
    };
  },

  /**
   * Create an alert modal (info only)
   */
  alert: (options: {
    title: string;
    message: string;
    buttonText?: string;
    onClose?: () => void;
  }) => {
    const { title, message, buttonText = 'OK', onClose } = options;

    return {
      title,
      children: <p className="text-gray-600 dark:text-gray-300">{message}</p>,
      footer: (
        <button
          onClick={onClose}
          className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
        >
          {buttonText}
        </button>
      ),
    };
  },
};

export default ModalProvider;
