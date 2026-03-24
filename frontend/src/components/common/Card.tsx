/**
 * Card component - reusable container
 */

import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'default' | 'elevated' | 'outlined';
  style?: React.CSSProperties;
}

export const Card: React.FC<CardProps> = ({
  children,
  className = '',
  variant = 'default',
  style,
}) => {
  const variantStyles = {
    default: 'bg-white border border-gray-200 shadow-sm',
    elevated: 'bg-white shadow-lg',
    outlined: 'bg-white border-2 border-gray-300',
  };

  return (
    <div
      className={`
        rounded-lg
        transition-all duration-200
        ${variantStyles[variant]}
        ${className}
      `}
      style={{
        padding: 'clamp(1rem, 5vw, 1.75rem)',
        ...style,
      }}
    >
      {children}
    </div>
  );
};
