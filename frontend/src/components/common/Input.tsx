/**
 * Input component with validation state and animations
 * Uses centralized styling from componentStyles
 */

import React, { useState } from 'react';
import { INPUT_STYLES } from '../../styles/componentStyles';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  icon?: React.ReactNode;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({
    label,
    error,
    helperText,
    className = '',
    type = 'text',
    style,
    icon,
    ...props
  }, ref) => {
    const hasError = !!error;
    const [isFocused, setIsFocused] = useState(false);

    const inputStyles = INPUT_STYLES.getInputStyles(hasError, isFocused);
    const labelStyles = INPUT_STYLES.getLabelStyles(isFocused);
    const containerStyles = INPUT_STYLES.getContainerStyles();

    return (
      <div style={{...containerStyles, animation: error ? 'errorShake 0.3s ease-in-out' : 'none'}} className={`${error ? 'animate-error-shake' : ''}`}>
        {label && (
          <label style={labelStyles}>
            {label}
          </label>
        )}

        <div style={{ position: 'relative', width: '100%' }}>
          <input
            ref={ref}
            type={type}
            style={{...inputStyles, ...style}}
            onFocus={(e) => {
              setIsFocused(true);
              props.onFocus?.(e);
            }}
            onBlur={(e) => {
              setIsFocused(false);
              props.onBlur?.(e);
            }}
            {...props}
          />
          
          {/* Success indicator */}
          {!error && (props.value as string)?.length > 0 && !isFocused && (
            <div style={INPUT_STYLES.getSuccessIndicatorStyles()}>
              ✓
            </div>
          )}
        </div>

        {error && (
          <p style={INPUT_STYLES.getErrorTextStyles()}>
            ⚠ {error}
          </p>
        )}

        {helperText && !error && (
          <p style={INPUT_STYLES.getHelperTextStyles()}>
            ℹ {helperText}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';
