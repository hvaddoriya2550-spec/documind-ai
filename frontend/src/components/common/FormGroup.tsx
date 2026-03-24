/**
 * Form Group Component - Wraps label and input with consistent spacing
 */

import React from 'react';
import RESPONSIVE from '../../styles/responsive';

interface FormGroupProps {
  label?: string;
  error?: string;
  children: React.ReactNode;
  helperText?: string;
}

export const FormGroup: React.FC<FormGroupProps> = ({
  label,
  error,
  children,
  helperText,
}) => {
  return (
    <div style={{
      marginBottom: RESPONSIVE.spacing.md,
    }}>
      {children}
      {error && (
        <p style={{
          color: '#ef4444',
          fontSize: RESPONSIVE.fontSize.xs,
          marginTop: RESPONSIVE.spacing.xs,
          margin: `${RESPONSIVE.spacing.xs} 0 0 0`,
        }}>
          {error}
        </p>
      )}
      {helperText && !error && (
        <p style={{
          fontSize: RESPONSIVE.fontSize.xs,
          marginTop: RESPONSIVE.spacing.xs,
          color: '#6b7280',
          margin: `${RESPONSIVE.spacing.xs} 0 0 0`,
        }}>
          {helperText}
        </p>
      )}
    </div>
  );
};
