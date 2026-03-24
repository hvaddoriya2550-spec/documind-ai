/**
 * Badge Component - Small label/tag component
 */

import React from 'react';
import THEME from '../../styles/theme';
import RESPONSIVE from '../../styles/responsive';

type BadgeVariant = 'primary' | 'success' | 'warning' | 'danger' | 'info';

interface BadgeProps {
  children: React.ReactNode;
  variant?: BadgeVariant;
  className?: string;
  style?: React.CSSProperties;
}

const variantStyles: Record<BadgeVariant, React.CSSProperties> = {
  primary: {
    backgroundColor: `${THEME.colors.primary}1A`,
    color: THEME.colors.primary,
    border: `1px solid ${THEME.colors.primary}40`,
  },
  success: {
    backgroundColor: `${THEME.colors.success}1A`,
    color: THEME.colors.success,
    border: `1px solid ${THEME.colors.success}40`,
  },
  warning: {
    backgroundColor: `${THEME.colors.warning}1A`,
    color: THEME.colors.warning,
    border: `1px solid ${THEME.colors.warning}40`,
  },
  danger: {
    backgroundColor: `${THEME.colors.error}1A`,
    color: THEME.colors.error,
    border: `1px solid ${THEME.colors.error}40`,
  },
  info: {
    backgroundColor: `${THEME.colors.info}1A`,
    color: THEME.colors.info,
    border: `1px solid ${THEME.colors.info}40`,
  },
};

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'primary',
  className = '',
  style,
}) => {
  return (
    <span
      className={className}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        padding: `${RESPONSIVE.spacing.xs} ${RESPONSIVE.spacing.sm}`,
        borderRadius: THEME.radius.xl,
        fontSize: RESPONSIVE.fontSize.xs,
        fontWeight: THEME.typography.fontWeight.semibold,
        whiteSpace: 'nowrap',
        ...variantStyles[variant],
        ...style,
      }}
    >
      {children}
    </span>
  );
};
