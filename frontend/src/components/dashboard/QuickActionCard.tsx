/**
 * QuickActionCard Component
 * Premium quick action card with modern hover effects
 */

import React, { useState } from 'react';
import { DASHBOARD_STYLES } from '../../styles/dashboardStyles';
import THEME from '../../styles/theme';

interface QuickActionCardProps {
  icon: string | React.ReactNode;
  label: string;
  description: string;
  onClick?: () => void;
}

export const QuickActionCard: React.FC<QuickActionCardProps> = ({
  icon,
  label,
  description,
  onClick,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <button
      onClick={onClick}
      style={{
        ...DASHBOARD_STYLES.quickActionCardStyles(),
        backgroundColor: isHovered ? 'rgba(99, 102, 241, 0.05)' : THEME.colors.white,
        borderColor: isHovered ? THEME.colors.primary : 'rgba(0, 0, 0, 0.05)',
        boxShadow: isHovered ? '0 4px 12px rgba(0, 0, 0, 0.1)' : '0 1px 3px rgba(0, 0, 0, 0.08)',
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div 
        style={{ 
          fontSize: '2.5rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: THEME.colors.primary,
        }}
      >
        {icon}
      </div>
      <h3
        style={{
          margin: 0,
          fontSize: '1rem',
          fontWeight: 700,
          color: THEME.colors.gray900,
        }}
      >
        {label}
      </h3>
      <p
        style={{
          margin: 0,
          fontSize: '0.8125rem',
          color: THEME.colors.gray500,
          fontWeight: 500,
        }}
      >
        {description}
      </p>
    </button>
  );
};
