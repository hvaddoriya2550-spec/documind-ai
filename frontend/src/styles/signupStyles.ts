/**
 * Signup Page Specific Styles
 * Centralized styling for the signup page layout and elements
 */

import THEME from './theme';
import RESPONSIVE from './responsive';
import { CARD_STYLES } from './componentStyles';

export const SIGNUP_STYLES = {
  cardStyles: (): React.CSSProperties => ({
    ...CARD_STYLES.getCardStyles(),
    marginTop: RESPONSIVE.spacing.xl,
    marginBottom: RESPONSIVE.spacing.lg,
    animation: 'fadeInUp 0.6s ease-out',
  }),

  headerContainerStyles: (): React.CSSProperties => ({
    textAlign: THEME.textAlign.center,
    marginBottom: RESPONSIVE.spacing.lg,
    animation: 'fadeInDown 0.6s ease-out',
  }),

  emojiStyles: (): React.CSSProperties => ({
    fontSize: 'clamp(2rem, 8vw, 2.5rem)',
    marginBottom: RESPONSIVE.spacing.xs,
    display: 'inline-block',
    animation: 'bounceIn 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55)',
  }),

  titleStyles: (): React.CSSProperties => ({
    fontSize: RESPONSIVE.fontSize['2xl'],
    fontWeight: THEME.typography.fontWeight.bold,
    color: THEME.colors.primary,
    marginBottom: RESPONSIVE.spacing.xs,
    lineHeight: 1.2,
    margin: 0,
  }),

  subtitleStyles: (): React.CSSProperties => ({
    fontSize: RESPONSIVE.fontSize.base,
    color: THEME.colors.gray500,
    marginTop: RESPONSIVE.spacing.sm,
    marginBottom: 0,
    margin: 0,
    paddingTop: RESPONSIVE.spacing.sm,
  }),

  progressBarContainerStyles: (): React.CSSProperties => ({
    width: '100%',
    height: '4px',
    backgroundColor: THEME.colors.gray200,
    borderRadius: '2px',
    overflow: 'hidden',
    marginTop: RESPONSIVE.spacing.md,
  }),

  progressBarFillStyles: (percentage: number): React.CSSProperties => ({
    height: '100%',
    width: `${percentage}%`,
    background: THEME.gradients.primary,
    transition: `width ${THEME.transitions.base}`,
  }),

  formStyles: (): React.CSSProperties => ({
    display: 'flex',
    flexDirection: 'column',
    gap: RESPONSIVE.spacing.md,
  }),

  fieldWrapperStyles: (animationDelay: string): React.CSSProperties => ({
    animation: `slideInLeft ${animationDelay}`,
  }),

  footerStyles: (): React.CSSProperties => ({
    textAlign: THEME.textAlign.center,
    marginTop: RESPONSIVE.spacing.lg,
    paddingTop: RESPONSIVE.spacing.lg,
    borderTop: `1px solid ${THEME.colors.gray200}`,
  }),

  footerLinkStyles: (isHovered: boolean): React.CSSProperties => ({
    background: 'none',
    border: 'none',
    color: isHovered ? THEME.colors.secondary : THEME.colors.primary,
    fontWeight: THEME.typography.fontWeight.semibold,
    cursor: 'pointer',
    fontSize: 'inherit',
    transition: `all ${THEME.transitions.base}`,
    textDecoration: 'underline',
  }),

  errorBoxStyles: (): React.CSSProperties => ({
    padding: RESPONSIVE.spacing.md,
    backgroundColor: `${THEME.colors.error}0D`,
    border: `1px solid ${THEME.colors.errorLight}`,
    borderRadius: THEME.radius.md,
    color: THEME.colors.error,
    fontSize: RESPONSIVE.fontSize.sm,
    fontWeight: THEME.typography.fontWeight.medium,
    display: 'flex',
    alignItems: 'center',
    gap: RESPONSIVE.spacing.sm,
    animation: 'slideInUp 0.4s ease-out',
  }),

  footerNoteStyles: (): React.CSSProperties => ({
    textAlign: THEME.textAlign.center,
    color: THEME.colors.gray50,
    fontSize: RESPONSIVE.fontSize.xs,
    marginTop: RESPONSIVE.spacing.lg,
    animation: 'fadeInUp 0.8s ease-out',
    margin: 0,
    paddingTop: RESPONSIVE.spacing.lg,
  }),
};

export default SIGNUP_STYLES;
