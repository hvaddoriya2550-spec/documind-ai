/**
 * SectionHeader Component
 * Reusable section header with title and optional action
 */

import React from 'react';
import { DASHBOARD_STYLES } from '../../styles/dashboardStyles';
import THEME from '../../styles/theme';

interface SectionHeaderProps {
  title: string;
  actionLabel?: string;
  onAction?: () => void;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  title,
  actionLabel,
  onAction,
}) => {
  return (
    <div style={DASHBOARD_STYLES.sectionHeaderStyles()}>
      <h2 style={DASHBOARD_STYLES.sectionTitleStyles()}>{title}</h2>
      {actionLabel && (
        <button
          onClick={onAction}
          style={{
            backgroundColor: 'transparent',
            border: `1px solid ${THEME.colors.gray300}`,
            color: THEME.colors.primary,
            padding: `0.5rem 1rem`,
            borderRadius: THEME.radius.md,
            cursor: 'pointer',
            fontWeight: 500,
            transition: `all ${THEME.transitions.base}`,
          }}
        >
          {actionLabel}
        </button>
      )}
    </div>
  );
};
