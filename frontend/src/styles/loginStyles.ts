/**
 * Centralized Login Page Styles
 * Uses THEME tokens for consistency across the app
 */

import { THEME } from './theme';
import { RESPONSIVE } from './responsive';
import { CARD_STYLES } from './componentStyles';
import React from 'react';

export const LOGIN_STYLES = {
  // Card styling
  cardStyles: (): React.CSSProperties => ({
    ...CARD_STYLES.getCardStyles(),
    marginTop: RESPONSIVE.spacing.xl,
    marginBottom: RESPONSIVE.spacing.lg,
  }),

  // Title styling
  titleStyles: (): React.CSSProperties => ({
    fontSize: RESPONSIVE.fontSize['heading-lg'],
    fontWeight: THEME.typography.fontWeight.bold,
    textAlign: THEME.textAlign.center,
    marginBottom: THEME.spacing.md,
    color: THEME.colors.gray900,
    letterSpacing: '-0.5px',
  }),

  // Subtitle/description styling
  subtitleStyles: (): React.CSSProperties => ({
    textAlign: THEME.textAlign.center,
    color: THEME.colors.gray600,
    marginBottom: THEME.spacing.lg,
    fontSize: RESPONSIVE.fontSize.lg,
    lineHeight: 1.5,
  }),

  // Form container spacing
  formContainerStyles: (): React.CSSProperties => ({
    display: 'flex',
    flexDirection: 'column',
    gap: THEME.spacing.lg,
  }),

  // Error box styling (for validation or login errors)
  errorBoxStyles: (): React.CSSProperties => ({
    backgroundColor: THEME.colors.errorLight,
    border: `1px solid ${THEME.colors.error}`,
    color: THEME.colors.error,
    padding: `${THEME.spacing.lg} ${THEME.spacing.lg}`,
    borderRadius: THEME.radius.lg,
    fontSize: RESPONSIVE.fontSize.base,
    animation: 'errorShake 0.4s ease-in-out, fadeInDown 0.3s ease-out',
  }),

  // Submit button container
  submitButtonContainerStyles: (): React.CSSProperties => ({
    marginTop: THEME.spacing.xl,
  }),
  // Footer text styling
  footerTextStyles: (): React.CSSProperties => ({
    textAlign: THEME.textAlign.left,
    marginTop: THEME.spacing.lg,
    color: THEME.colors.gray600,
    fontSize: RESPONSIVE.fontSize.base,
  }),

  // Footer link styling (Sign up link)
  footerLinkStyles: (): React.CSSProperties => ({
    color: THEME.colors.primary,
    fontWeight: THEME.typography.fontWeight.semibold,
    cursor: 'pointer',
    transition: THEME.transitions.fast,
    borderBottom: `1px solid transparent`,
    backgroundColor: 'transparent',
    border: 'none',
    padding: 0,
  }),

  // Footer link hover state
  footerLinkHoverStyles: (): React.CSSProperties => ({
    color: THEME.colors.primaryDark,
    borderBottomColor: THEME.colors.primary,
  }),
} as const;

export default LOGIN_STYLES;
