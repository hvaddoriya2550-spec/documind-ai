/**
 * Button component with multiple variants
 */

import React from 'react';
import { COLORS } from '../../constants';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  children: React.ReactNode;
}

const getVariantStyles = (variant: string): React.CSSProperties & { '--hover-bg'?: string; '--focus-ring'?: string } => {
  const variantsMap: Record<string, React.CSSProperties> = {
    primary: {
      backgroundColor: COLORS.primary,
      color: 'white',
    },
    secondary: {
      backgroundColor: COLORS.secondary,
      color: 'white',
    },
    danger: {
      backgroundColor: COLORS.error,
      color: 'white',
    },
    ghost: {
      backgroundColor: 'transparent',
      color: COLORS.primary,
      border: `2px solid ${COLORS.primary}`,
    },
  };
  return variantsMap[variant] || variantsMap.primary;
};

const getSizeStyles = (size: string): React.CSSProperties => {
  const sizesMap: Record<string, React.CSSProperties> = {
    sm: {
      padding: '0.5rem 0.75rem',
      fontSize: '0.875rem',
    },
    md: {
      padding: '0.625rem 1rem',
      fontSize: '1rem',
    },
    lg: {
      padding: '0.75rem 1.5rem',
      fontSize: '1.125rem',
    },
  };
  return sizesMap[size] || sizesMap.md;
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({
    variant = 'primary',
    size = 'md',
    isLoading = false,
    disabled = false,
    children,
    className = '',
    style,
    ...props
  }, ref) => {
    const baseClassName =
      'font-medium rounded-lg transition-all duration-200 cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center';

    const mergedStyles: React.CSSProperties = {
      ...getVariantStyles(variant),
      ...getSizeStyles(size),
      ...(disabled && isLoading && { opacity: 0.7 }),
      ...style,
    };

    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={`${baseClassName} ${className}`}
        style={mergedStyles}
        {...props}
      >
        {isLoading ? (
          <>
            <span className="animate-spin inline-block w-4 h-4 mr-2 border-2 border-current border-t-transparent rounded-full"></span>
            Loading...
          </>
        ) : (
          children
        )}
      </button>
    );
  }
);

Button.displayName = 'Button';
