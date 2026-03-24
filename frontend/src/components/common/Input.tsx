/**
 * Input component with validation state
 */

import React from 'react';
import { COLORS } from '../../constants';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({
    label,
    error,
    helperText,
    className = '',
    type = 'text',
    style,
    ...props
  }, ref) => {
    const hasError = !!error;

    const inputStyles: React.CSSProperties = {
      width: '100%',
      padding: '0.625rem 1rem',
      fontSize: '1rem',
      color: '#374151',
      border: `1px solid ${hasError ? COLORS.error : '#d1d5db'}`,
      borderRadius: '0.5rem',
      transition: 'all 0.2s',
      outline: 'none',
      ...style,
    };

    return (
      <div className="w-full">
        {label && (
          <label className="block text-sm font-medium text-gray-700 mb-1.5">
            {label}
          </label>
        )}

        <input
          ref={ref}
          type={type}
          style={inputStyles}
          onFocus={(e) => {
            e.currentTarget.style.borderColor = hasError ? COLORS.error : COLORS.primary;
            e.currentTarget.style.boxShadow = `0 0 0 2px ${hasError ? COLORS.errorLight : COLORS.primaryLight}`;
          }}
          onBlur={(e) => {
            e.currentTarget.style.boxShadow = 'none';
            e.currentTarget.style.borderColor = hasError ? COLORS.error : '#d1d5db';
          }}
          {...props}
        />

        {error && (
          <p style={{ color: COLORS.error }} className="text-sm mt-1.5">
            {error}
          </p>
        )}

        {helperText && !error && (
          <p className="text-sm mt-1.5 text-gray-500">
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';
