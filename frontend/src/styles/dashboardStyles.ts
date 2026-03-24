/**
 * Dashboard Styles
 * Premium SaaS style inspired by Notion, Linear, and modern admin dashboards
 * Professional, minimal design with sophisticated typography and interactions
 */

import THEME from './theme';
import RESPONSIVE from './responsive';
import React from 'react';

export const DASHBOARD_STYLES = {
  // Container - Full page layout
  pageContainerStyles: (): React.CSSProperties => ({
    display: 'flex',
    minHeight: '100vh',
    backgroundColor: THEME.colors.white,
  }),

  // Sidebar wrapper - Modern, minimal dark sidebar
  sidebarWrapperStyles: (): React.CSSProperties => ({
    width: 'clamp(240px, 20vw, 280px)',
    backgroundColor: '#0F0F12',
    borderRight: `1px solid ${THEME.colors.gray800}`,
    padding: `${RESPONSIVE.spacing.lg} ${RESPONSIVE.spacing.md}`,
    overflowY: 'auto',
    flexShrink: 0,
    height: '100vh',
    position: 'sticky',
    top: 0,
    display: 'flex',
    flexDirection: 'column',
  }),

  // Sidebar header (logo area) - Premium branding
  sidebarHeaderStyles: (): React.CSSProperties => ({
    marginBottom: RESPONSIVE.spacing.xl,
    paddingBottom: RESPONSIVE.spacing.lg,
    borderBottom: `1px solid rgba(255, 255, 255, 0.05)`,
    display: 'flex',
    alignItems: 'center',
    gap: RESPONSIVE.spacing.md,
  }),

  // Sidebar title - Bold, prominent
  sidebarTitleStyles: (): React.CSSProperties => ({
    fontSize: RESPONSIVE.fontSize.xl,
    fontWeight: THEME.typography.fontWeight.bold,
    color: THEME.colors.white,
    margin: 0,
    letterSpacing: '-0.02em',
  }),

  // Sidebar subtitle - Subtle, descriptive
  sidebarSubtitleStyles: (): React.CSSProperties => ({
    fontSize: RESPONSIVE.fontSize.xs,
    color: THEME.colors.gray400,
    margin: 0,
    marginTop: RESPONSIVE.spacing.xs,
    fontWeight: 500,
  }),

  // Navigation list - Clean spacing
  navListStyles: (): React.CSSProperties => ({
    listStyle: 'none',
    padding: 0,
    margin: 0,
    display: 'flex',
    flexDirection: 'column',
    gap: RESPONSIVE.spacing.xs,
    flex: 1,
  }),

  // Nav item - Modern hover and active states
  navItemStyles: (isActive: boolean): React.CSSProperties => ({
    padding: `${RESPONSIVE.spacing.md} ${RESPONSIVE.spacing.lg}`,
    borderRadius: THEME.radius.lg,
    cursor: 'pointer',
    transition: `all 0.2s cubic-bezier(0.4, 0, 0.2, 1)`,
    backgroundColor: isActive ? 'rgba(99, 102, 241, 0.15)' : 'transparent',
    color: isActive ? THEME.colors.primary : THEME.colors.gray400,
    fontWeight: isActive ? 600 : 500,
    fontSize: RESPONSIVE.fontSize.sm,
    display: 'flex',
    alignItems: 'center',
    gap: RESPONSIVE.spacing.md,
    borderLeft: isActive ? `3px solid ${THEME.colors.primary}` : '3px solid transparent',
  }),

  // Main content wrapper
  mainContentWrapperStyles: (): React.CSSProperties => ({
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: THEME.colors.white,
    overflowY: 'auto',
  }),

  // Header area - Minimal, clean
  headerStyles: (): React.CSSProperties => ({
    backgroundColor: THEME.colors.white,
    borderBottom: `1px solid rgba(0, 0, 0, 0.05)`,
    padding: `${RESPONSIVE.spacing.lg} ${RESPONSIVE.spacing.xl}`,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    position: 'sticky',
    top: 0,
    zIndex: 100,
  }),

  // Header left (greeting)
  headerLeftStyles: (): React.CSSProperties => ({
    display: 'flex',
    flexDirection: 'column',
    gap: RESPONSIVE.spacing.xs,
  }),

  // Header greeting text - Bold, primary
  greetingStyles: (): React.CSSProperties => ({
    fontSize: RESPONSIVE.fontSize['heading-lg'],
    fontWeight: 700,
    color: THEME.colors.gray900,
    margin: 0,
    letterSpacing: '-0.01em',
  }),

  // Header subtitle text - Muted, informative
  headerSubtitleStyles: (): React.CSSProperties => ({
    fontSize: RESPONSIVE.fontSize.sm,
    color: THEME.colors.gray500,
    margin: 0,
    fontWeight: 500,
  }),

  // Header right (profile)
  headerRightStyles: (): React.CSSProperties => ({
    display: 'flex',
    alignItems: 'center',
    gap: RESPONSIVE.spacing.lg,
  }),

  // Profile avatar - Modern, circular
  avatarStyles: (): React.CSSProperties => ({
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    backgroundColor: THEME.colors.primary,
    color: THEME.colors.white,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: 700,
    fontSize: RESPONSIVE.fontSize.sm,
    cursor: 'pointer',
    transition: `all 0.2s cubic-bezier(0.4, 0, 0.2, 1)`,
    boxShadow: `0 2px 8px rgba(99, 102, 241, 0.3)`,
  }),

  // Notification button
  notificationButtonStyles: (): React.CSSProperties => ({
    width: '40px',
    height: '40px',
    borderRadius: THEME.radius.lg,
    backgroundColor: THEME.colors.gray50,
    border: 'none',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: THEME.colors.gray600,
    transition: `all 0.2s cubic-bezier(0.4, 0, 0.2, 1)`,
  }),

  // Main content area - Spacious, organized
  contentAreaStyles: (): React.CSSProperties => ({
    flex: 1,
    padding: `${RESPONSIVE.spacing.xl} ${RESPONSIVE.spacing.lg}`,
    display: 'flex',
    flexDirection: 'column',
    gap: RESPONSIVE.spacing.xl,
  }),

  // Section header - Clear hierarchy
  sectionHeaderStyles: (): React.CSSProperties => ({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: RESPONSIVE.spacing.lg,
  }),

  sectionTitleStyles: (): React.CSSProperties => ({
    fontSize: RESPONSIVE.fontSize.lg,
    fontWeight: 700,
    color: THEME.colors.gray900,
    margin: 0,
    letterSpacing: '-0.01em',
  }),

  // Stats grid - Responsive, spacious
  statsGridStyles: (): React.CSSProperties => ({
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
    gap: RESPONSIVE.spacing.lg,
    marginBottom: RESPONSIVE.spacing.xl,
  }),

  // Stat card - Modern, minimalist with depth
  statCardStyles: (): React.CSSProperties => ({
    backgroundColor: THEME.colors.white,
    border: `1px solid rgba(0, 0, 0, 0.06)`,
    borderRadius: THEME.radius.lg,
    padding: RESPONSIVE.spacing.lg,
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.08)',
    transition: `all 0.2s cubic-bezier(0.4, 0, 0.2, 1)`,
    cursor: 'pointer',
    position: 'relative',
    overflow: 'hidden',
  }),

  statIconStyles: (): React.CSSProperties => ({
    fontSize: '2rem',
    marginBottom: RESPONSIVE.spacing.md,
    opacity: 0.8,
  }),

  statLabelStyles: (): React.CSSProperties => ({
    fontSize: RESPONSIVE.fontSize.xs,
    color: THEME.colors.gray500,
    margin: 0,
    fontWeight: 600,
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
  }),

  statValueStyles: (): React.CSSProperties => ({
    fontSize: RESPONSIVE.fontSize['heading-lg'],
    fontWeight: 700,
    color: THEME.colors.gray900,
    margin: 0,
    marginTop: RESPONSIVE.spacing.sm,
  }),

  // Workspace card - Modern, card-based design
  workspaceCardStyles: (): React.CSSProperties => ({
    backgroundColor: THEME.colors.white,
    border: `1px solid rgba(0, 0, 0, 0.06)`,
    borderRadius: THEME.radius.lg,
    padding: RESPONSIVE.spacing.lg,
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.08)',
    transition: `all 0.2s cubic-bezier(0.4, 0, 0.2, 1)`,
    cursor: 'pointer',
    display: 'flex',
    flexDirection: 'column',
    gap: RESPONSIVE.spacing.md,
  }),

  // Quick action card - Bold, action-oriented
  quickActionCardStyles: (): React.CSSProperties => ({
    backgroundColor: THEME.colors.white,
    border: `1.5px solid rgba(0, 0, 0, 0.05)`,
    borderRadius: THEME.radius.lg,
    padding: RESPONSIVE.spacing.xl,
    textAlign: THEME.textAlign.center,
    cursor: 'pointer',
    transition: `all 0.2s cubic-bezier(0.4, 0, 0.2, 1)`,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: RESPONSIVE.spacing.md,
    position: 'relative',
    overflow: 'hidden',
  }),

  // Activity list - Clean, readable
  activityListStyles: (): React.CSSProperties => ({
    backgroundColor: THEME.colors.white,
    border: `1px solid rgba(0, 0, 0, 0.06)`,
    borderRadius: THEME.radius.lg,
    padding: RESPONSIVE.spacing.lg,
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.08)',
  }),

  activityItemStyles: (): React.CSSProperties => ({
    display: 'flex',
    gap: RESPONSIVE.spacing.md,
    paddingBottom: RESPONSIVE.spacing.md,
    borderBottom: `1px solid rgba(0, 0, 0, 0.04)`,
    alignItems: 'flex-start',
  }),

  // Activity icon - Subtle background
  activityIconStyles: (): React.CSSProperties => ({
    width: '36px',
    height: '36px',
    borderRadius: THEME.radius.md,
    backgroundColor: THEME.colors.gray50,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: THEME.colors.gray700,
    flexShrink: 0,
    fontSize: '1.25rem',
  }),

  // Document table - Professional, data-focused
  documentTableStyles: (): React.CSSProperties => ({
    backgroundColor: THEME.colors.white,
    border: `1px solid rgba(0, 0, 0, 0.06)`,
    borderRadius: THEME.radius.lg,
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.08)',
    overflow: 'hidden',
  }),

  tableHeaderStyles: (): React.CSSProperties => ({
    backgroundColor: THEME.colors.gray50,
    borderBottom: `1px solid rgba(0, 0, 0, 0.06)`,
    padding: RESPONSIVE.spacing.lg,
    display: 'grid',
    gridTemplateColumns: '2fr 1fr 1fr 1fr 1fr 1fr',
    gap: RESPONSIVE.spacing.lg,
    fontWeight: 700,
    color: THEME.colors.gray700,
    fontSize: RESPONSIVE.fontSize.xs,
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
  }),

  tableRowStyles: (): React.CSSProperties => ({
    padding: RESPONSIVE.spacing.lg,
    display: 'grid',
    gridTemplateColumns: '2fr 1fr 1fr 1fr 1fr 1fr',
    gap: RESPONSIVE.spacing.lg,
    borderBottom: `1px solid rgba(0, 0, 0, 0.04)`,
    alignItems: 'center',
    transition: `background-color 0.15s cubic-bezier(0.4, 0, 0.2, 1)`,
  }),

  // Badge styles - Semantic colors with backgrounds
  badgeStyles: (color: string): React.CSSProperties => ({
    display: 'inline-flex',
    alignItems: 'center',
    gap: '0.375rem',
    padding: `${RESPONSIVE.spacing.xs} ${RESPONSIVE.spacing.md}`,
    borderRadius: THEME.radius.md,
    fontSize: RESPONSIVE.fontSize.xs,
    fontWeight: 700,
    backgroundColor: `${color}15`,
    color: color,
  }),
} as const;

export default DASHBOARD_STYLES;
