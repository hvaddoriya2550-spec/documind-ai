/**
 * WorkspaceCard Component
 * Premium workspace card with modern design and interactions
 */

import React, { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import type { WorkspaceCardData } from '../../types/dashboard';
import { DASHBOARD_STYLES } from '../../styles/dashboardStyles';
import THEME from '../../styles/theme';

interface WorkspaceCardProps {
  workspace: WorkspaceCardData;
  onOpen?: (id: string) => void;
}

export const WorkspaceCard: React.FC<WorkspaceCardProps> = ({ workspace, onOpen }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      style={{
        ...DASHBOARD_STYLES.workspaceCardStyles(),
        boxShadow: isHovered ? '0 4px 12px rgba(0, 0, 0, 0.1)' : '0 1px 3px rgba(0, 0, 0, 0.08)',
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Header */}
      <div>
        <h3
          style={{
            margin: 0,
            fontSize: '1.125rem',
            fontWeight: 700,
            color: THEME.colors.gray900,
          }}
        >
          {workspace.name}
        </h3>
        <p
          style={{
            margin: 0,
            marginTop: '0.375rem',
            fontSize: '0.875rem',
            color: THEME.colors.gray500,
            fontWeight: 500,
          }}
        >
          {workspace.description}
        </p>
      </div>

      {/* Stats Row */}
      <div
        style={{
          display: 'flex',
          gap: '1.5rem',
          fontSize: '0.875rem',
          color: THEME.colors.gray600,
          fontWeight: 600,
        }}
      >
        <div>
          <span style={{ color: THEME.colors.primary, fontWeight: 700 }}>
            {workspace.documentCount}
          </span>{' '}
          <span style={{ color: THEME.colors.gray500 }}>Documents</span>
        </div>
        {workspace.collaborators && (
          <div>
            <span style={{ color: THEME.colors.primary, fontWeight: 700 }}>
              {workspace.collaborators}
            </span>{' '}
            <span style={{ color: THEME.colors.gray500 }}>Collaborators</span>
          </div>
        )}
      </div>

      <div style={{ fontSize: '0.8125rem', color: THEME.colors.gray400, fontWeight: 500 }}>
        Updated {workspace.lastUpdated}
      </div>

      {/* Action Button */}
      <button
        onClick={() => onOpen?.(workspace.id)}
        style={{
          padding: '0.625rem 1rem',
          backgroundColor: isHovered ? THEME.colors.primary : 'rgba(99, 102, 241, 0.05)',
          color: isHovered ? THEME.colors.white : THEME.colors.primary,
          border: `1.5px solid ${THEME.colors.primary}`,
          borderRadius: THEME.radius.md,
          cursor: 'pointer',
          fontSize: '0.875rem',
          fontWeight: 700,
          transition: `all 0.2s cubic-bezier(0.4, 0, 0.2, 1)`,
          alignSelf: 'flex-start',
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
        }}
      >
        Open Workspace
        <ArrowRight size={16} />
      </button>
    </div>
  );
};
