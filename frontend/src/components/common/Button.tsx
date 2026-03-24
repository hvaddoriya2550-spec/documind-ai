/**
 * Button component with multiple variants and animations
 * Uses centralized styling from componentStyles
 */

import React, { useState } from 'react';
import { BUTTON_STYLES } from '../../styles/componentStyles';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  children: React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({
    variant = 'primary',
    size = 'md',
    isLoading = false,
    disabled = false,
    children,
    className = '',
    style,
    onMouseEnter,
    onMouseLeave,
    ...props
  }, ref) => {
    const [isHovered, setIsHovered] = useState(false);

    const variantStyles = BUTTON_STYLES.getVariantStyles(variant, isHovered);
    const sizeStyles = BUTTON_STYLES.getSizeStyles(size);
    const baseStyles = BUTTON_STYLES.getBaseStyles(isHovered, disabled, isLoading);

    const mergedStyles: React.CSSProperties = {
      ...variantStyles,
      ...sizeStyles,
      ...baseStyles,
      ...style,
    };

    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        style={mergedStyles}
        onMouseEnter={(e) => {
          if (!disabled && !isLoading) {
            setIsHovered(true);
          }
          onMouseEnter?.(e);
        }}
        onMouseLeave={(e) => {
          setIsHovered(false);
          onMouseLeave?.(e);
        }}
        className={className}
        {...props}
      >
        {isLoading ? (
          <>
            <span style={{
              width: '1rem',
              height: '1rem',
              border: '2px solid currentColor',
              borderTopColor: 'transparent',
              borderRadius: '50%',
              display: 'inline-block',
              animation: 'spin 0.8s linear infinite',
            }}></span>
            <span>Please wait...</span>
          </>
        ) : (
          children
        )}
      </button>
    );
  }
);

Button.displayName = 'Button';
