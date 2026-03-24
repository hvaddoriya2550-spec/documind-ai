/**
 * StatCard Component
 * Premium stat card with Lucide icon support and modern design
 */

import React, { useState } from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';
import type { StatCardData } from '../../types/dashboard';
import { DASHBOARD_STYLES } from '../../styles/dashboardStyles';
import THEME from '../../styles/theme';

interface StatCardProps {
  stat: StatCardData;
}

const getColorByType = (color: string): string => {
  const colorMap: Record<string, string> = {
    primary: THEME.colors.primary,
    secondary: THEME.colors.secondary,
    success: THEME.colors.success,
    warning: THEME.colors.warning,
    info: THEME.colors.info,
  };
  return colorMap[color] || THEME.colors.primary;
};

export const StatCard: React.FC<StatCardProps> = ({ stat }) => {
  const [isHovered, setIsHovered] = useState(false);
  const color = getColorByType(stat.color);

  return (
    <div
      style={{
        ...DASHBOARD_STYLES.statCardStyles(),
        boxShadow: isHovered ? '0 8px 16px rgba(0, 0, 0, 0.12)' : '0 1px 3px rgba(0, 0, 0, 0.08)',
        transform: isHovered ? 'translateY(-4px)' : 'translateY(0)',
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Icon with background */}
      <div
        style={{
          width: '48px',
          height: '48px',
          borderRadius: THEME.radius.lg,
          backgroundColor: `${color}15`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: color,
          fontSize: '1.5rem',
          marginBottom: THEME.colors.white,
        }}
      >
        {typeof stat.icon === 'string' ? stat.icon : stat.icon}
      </div>

      {/* Label */}
      <p style={DASHBOARD_STYLES.statLabelStyles()}>{stat.label}</p>

      {/* Value */}
      <p
        style={{
          ...DASHBOARD_STYLES.statValueStyles(),
          color: color,
        }}
      >
        {stat.value}
      </p>

      {/* Trend */}
      {stat.trend && (
        <p
          style={{
            fontSize: '0.875rem',
            color: stat.trend.direction === 'up' ? THEME.colors.success : THEME.colors.error,
            margin: 0,
            marginTop: '0.75rem',
            fontWeight: 600,
            display: 'flex',
            alignItems: 'center',
            gap: '0.375rem',
          }}
        >
          {stat.trend.direction === 'up' ? (
            <TrendingUp size={16} />
          ) : (
            <TrendingDown size={16} />
          )}
          {stat.trend.percentage}% from last month
        </p>
      )}
    </div>
  );
};
