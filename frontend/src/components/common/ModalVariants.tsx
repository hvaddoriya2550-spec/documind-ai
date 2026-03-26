import React from 'react';
import { Modal, type ModalProps } from './Modal';
import { Button } from './Button';

/**
 * Alert Modal - Display important information
 */
export interface AlertModalProps extends Omit<ModalProps, 'onClose' | 'isOpen' | 'children'> {
  isOpen: boolean;
  onClose: () => void;
  message: React.ReactNode;
  buttonText?: string;
  isDangerous?: boolean;
}

export const AlertModal: React.FC<AlertModalProps> = ({
  isOpen,
  onClose,
  title = 'Alert',
  message,
  buttonText = 'OK',
  isDangerous = false,
  ...props
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={title}
      size="sm"
      {...props}
      footer={
        <Button
          onClick={onClose}
          variant={isDangerous ? 'danger' : 'primary'}
        >
          {buttonText}
        </Button>
      }
    >
      <div className="text-gray-600 dark:text-gray-300">
        {message}
      </div>
    </Modal>
  );
};

/**
 * Confirmation Modal - Ask user to confirm an action
 */
export interface ConfirmModalProps
  extends Omit<ModalProps, 'onClose' | 'isOpen' | 'footer' | 'children'> {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void | Promise<void>;
  message: React.ReactNode;
  confirmText?: string;
  cancelText?: string;
  isLoading?: boolean;
  isDangerous?: boolean;
}

export const ConfirmModal: React.FC<ConfirmModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  title = 'Confirm',
  message,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  isLoading = false,
  isDangerous = false,
  ...props
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={title}
      size="sm"
      disableBackdropClick={isLoading}
      {...props}
      footer={
        <div className="flex gap-3 justify-end">
          <Button
            onClick={onClose}
            variant="secondary"
            disabled={isLoading}
          >
            {cancelText}
          </Button>
          <Button
            onClick={onConfirm}
            variant={isDangerous ? 'danger' : 'primary'}
            isLoading={isLoading}
          >
            {confirmText}
          </Button>
        </div>
      }
    >
      <div className="text-gray-600 dark:text-gray-300">
        {message}
      </div>
    </Modal>
  );
};

/**
 * Form Modal - For multi-step forms or data input
 */
export interface FormModalProps
  extends Omit<ModalProps, 'onClose' | 'isOpen' | 'footer'> {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: () => void | Promise<void>;
  submitText?: string;
  cancelText?: string;
  isLoading?: boolean;
}

export const FormModal: React.FC<FormModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  children,
  title,
  submitText = 'Submit',
  cancelText = 'Cancel',
  isLoading = false,
  ...props
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={title}
      size="md"
      disableBackdropClick={isLoading}
      {...props}
      footer={
        <div className="flex gap-3 justify-end">
          <Button
            onClick={onClose}
            variant="secondary"
            disabled={isLoading}
          >
            {cancelText}
          </Button>
          <Button
            onClick={onSubmit}
            variant="primary"
            isLoading={isLoading}
          >
            {submitText}
          </Button>
        </div>
      }
    >
      {children}
    </Modal>
  );
};

/**
 * Info Modal - Display general information with custom styling
 */
export interface InfoModalProps
  extends Omit<ModalProps, 'onClose' | 'isOpen' | 'children'> {
  isOpen: boolean;
  onClose: () => void;
  icon?: React.ReactNode;
  type?: 'info' | 'success' | 'warning' | 'error';
}

export const InfoModal: React.FC<React.PropsWithChildren<InfoModalProps>> = ({
  isOpen,
  onClose,
  title,
  children,
  icon,
  type = 'info',
  ...props
}) => {
  const typeStyles = {
    info: 'text-blue-600 dark:text-blue-400',
    success: 'text-green-600 dark:text-green-400',
    warning: 'text-yellow-600 dark:text-yellow-400',
    error: 'text-red-600 dark:text-red-400',
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={title}
      size="sm"
      {...props}
    >
      <div className="flex gap-4">
        {icon && (
          <div className={`flex-shrink-0 ${typeStyles[type]}`}>
            {icon}
          </div>
        )}
        <div className="flex-1">{children}</div>
      </div>
    </Modal>
  );
};

export default Modal;
