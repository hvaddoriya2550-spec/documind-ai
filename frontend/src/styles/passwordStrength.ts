/**
 * Password Strength Indicator Styles
 * Centralized styling for password strength visualization
 */

import THEME from './theme';
import RESPONSIVE from './responsive';

export const PASSWORD_STRENGTH_STYLES = {
  containerStyles: (): React.CSSProperties => ({
    marginTop: RESPONSIVE.spacing.md,
    padding: RESPONSIVE.spacing.md,
    backgroundColor: THEME.colors.gray50,
    borderRadius: THEME.radius.md,
    border: '1px solid',
    animation: 'slideInUp 0.4s ease-out',
  }),

  labelStyles: (): React.CSSProperties => ({
    display: 'flex',
    alignItems: 'center',
    gap: RESPONSIVE.spacing.xs,
    marginBottom: RESPONSIVE.spacing.md,
  }),

  strengthTextStyles: (strengthColor: string): React.CSSProperties => ({
    fontSize: RESPONSIVE.fontSize.sm,
    fontWeight: THEME.typography.fontWeight.semibold,
    color: strengthColor,
  }),

  barsContainerStyles: (): React.CSSProperties => ({
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: '0.375rem',
  }),

  barStyles: (isFilled: boolean, strengthColor: string): React.CSSProperties => ({
    height: '3px',
    backgroundColor: isFilled ? strengthColor : THEME.colors.gray200,
    borderRadius: '2px',
    transition: `all ${THEME.transitions.base}`,
  }),

  tipsStyles: (): React.CSSProperties => ({
    fontSize: RESPONSIVE.fontSize.xs,
    color: THEME.colors.gray500,
    marginTop: RESPONSIVE.spacing.sm,
    margin: 0,
    paddingTop: RESPONSIVE.spacing.sm,
  }),
};

export const getStrengthColor = (strength: 'weak' | 'fair' | 'strong' | 'very-strong'): string => {
  switch (strength) {
    case 'very-strong':
      return THEME.colors.success;
    case 'strong':
      return THEME.colors.info;
    case 'fair':
      return THEME.colors.warning;
    default:
      return THEME.colors.error;
  }
};

export const getStrengthText = (strength: 'weak' | 'fair' | 'strong' | 'very-strong'): string => {
  switch (strength) {
    case 'very-strong':
      return 'Very Strong';
    case 'strong':
      return 'Strong';
    case 'fair':
      return 'Fair';
    default:
      return 'Weak';
  }
};

export default PASSWORD_STRENGTH_STYLES;
