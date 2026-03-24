/**
 * Spinner Component - Loading indicator
 */

import React from 'react';
import THEME from '../../styles/theme';

type SpinnerSize = 'sm' | 'md' | 'lg';

interface SpinnerProps {
  size?: SpinnerSize;
  color?: string;
}

const sizeMap: Record<SpinnerSize, string> = {
  sm: '16px',
  md: '24px',
  lg: '32px',
};

export const Spinner: React.FC<SpinnerProps> = ({
  size = 'md',
  color = THEME.colors.primary,
}) => {
  const dimension = sizeMap[size];

  return (
    <div
      style={{
        display: 'inline-block',
        width: dimension,
        height: dimension,
        border: `3px solid ${color}20`,
        borderTop: `3px solid ${color}`,
        borderRadius: '50%',
        animation: 'spin 0.8s linear infinite',
      }}
    />
  );
};
