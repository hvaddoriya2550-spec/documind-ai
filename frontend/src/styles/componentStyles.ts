/**
 * Component Style Generators
 * Centralized styling logic for all components
 * If you need to change a component's style, change it here
 */

import THEME from './theme';
import RESPONSIVE from './responsive';

export const INPUT_STYLES = {
  getContainerStyles: (): React.CSSProperties => ({
    position: 'relative',
    width: '100%',
  }),

  getLabelStyles: (isFocused: boolean): React.CSSProperties => ({
    display: 'block',
    fontSize: RESPONSIVE.fontSize.sm,
    fontWeight: THEME.typography.fontWeight.medium,
    color: isFocused ? THEME.colors.primary : THEME.colors.gray700,
    marginBottom: RESPONSIVE.spacing.xs,
    transition: `color ${THEME.transitions.base}`,
    textAlign: THEME.textAlign.left,
  }),

  getInputStyles: (hasError: boolean, isFocused: boolean): React.CSSProperties => ({
    width: '100%',
    padding: RESPONSIVE.padding.input,
    fontSize: RESPONSIVE.fontSize.base,
    color: THEME.colors.gray700,
    border: `2px solid ${
      hasError ? THEME.colors.error : isFocused ? THEME.colors.primary : THEME.colors.gray200
    }`,
    borderRadius: THEME.radius.lg,
    transition: `all ${THEME.transitions.base}`,
    outline: 'none',
    backgroundColor: isFocused ? THEME.colors.gray50 : THEME.colors.white,
    boxShadow:
      isFocused && !hasError
        ? `0 0 0 3px ${THEME.colors.primaryLight}20, 0 4px 12px rgba(0, 0, 0, 0.08)`
        : hasError
          ? `0 0 0 3px ${THEME.colors.error}20`
          : THEME.shadows.sm,
  }),

  getSuccessIndicatorStyles: (): React.CSSProperties => ({
    position: 'absolute',
    right: '1rem',
    top: '50%',
    transform: 'translateY(-50%)',
    color: THEME.colors.success,
    animation: 'scaleUp 0.3s ease-out',
    fontSize: '1rem',
  }),

  getErrorTextStyles: (): React.CSSProperties => ({
    color: THEME.colors.error,
    fontSize: RESPONSIVE.fontSize.xs,
    marginTop: RESPONSIVE.spacing.xs,
    animation: 'fadeInUp 0.3s ease-out',
  }),

  getHelperTextStyles: (): React.CSSProperties => ({
    fontSize: RESPONSIVE.fontSize.xs,
    marginTop: RESPONSIVE.spacing.xs,
    color: THEME.colors.gray500,
    animation: 'fadeInUp 0.4s ease-out',
  }),
};

export const BUTTON_STYLES = {
  getVariantStyles: (variant: string, isHovered: boolean): React.CSSProperties => {
    const variantsMap: Record<string, React.CSSProperties> = {
      primary: {
        background: isHovered ? 'linear-gradient(135deg, #a855f7 0%, #ec4899 100%)' : THEME.gradients.primary,
        color: THEME.colors.white,
        boxShadow: isHovered
          ? '0 8px 24px rgba(139, 92, 246, 0.4)'
          : '0 4px 12px rgba(139, 92, 246, 0.3)',
      },
      secondary: {
        background: isHovered
          ? 'linear-gradient(135deg, #06b6d4 0%, #0891b2 100%)'
          : 'linear-gradient(135deg, #0ea5e9 0%, #06b6d4 100%)',
        color: THEME.colors.white,
        boxShadow: isHovered
          ? '0 8px 24px rgba(6, 182, 212, 0.4)'
          : '0 4px 12px rgba(6, 182, 212, 0.3)',
      },
      danger: {
        background: isHovered
          ? 'linear-gradient(135deg, #f43f5e 0%, #dc2626 100%)'
          : 'linear-gradient(135deg, #ef4444 0%, #f43f5e 100%)',
        color: THEME.colors.white,
        boxShadow: isHovered
          ? '0 8px 24px rgba(239, 68, 68, 0.4)'
          : '0 4px 12px rgba(239, 68, 68, 0.3)',
      },
      ghost: {
        backgroundColor: `${THEME.colors.primary}10`,
        color: THEME.colors.primary,
        border: `2px solid ${isHovered ? THEME.colors.primary : `${THEME.colors.primary}4D`}`,
      },
    };
    return variantsMap[variant] || variantsMap.primary;
  },

  getSizeStyles: (size: string): React.CSSProperties => {
    const sizesMap: Record<string, React.CSSProperties> = {
      sm: {
        padding: RESPONSIVE.padding.button.sm,
        fontSize: RESPONSIVE.fontSize.sm,
        borderRadius: THEME.radius.md,
      },
      md: {
        padding: RESPONSIVE.padding.button.md,
        fontSize: RESPONSIVE.fontSize.base,
        borderRadius: THEME.radius.lg,
      },
      lg: {
        padding: RESPONSIVE.padding.button.lg,
        fontSize: RESPONSIVE.fontSize.lg,
        borderRadius: THEME.radius.xl,
      },
    };
    return sizesMap[size] || sizesMap.md;
  },

  getBaseStyles: (isHovered: boolean, disabled: boolean, isLoading: boolean): React.CSSProperties => ({
    fontWeight: THEME.typography.fontWeight.semibold,
    border: 'none',
    cursor: disabled || isLoading ? 'not-allowed' : 'pointer',
    transition: `all ${THEME.transitions.base}`,
    transform: isHovered && !disabled && !isLoading ? 'translateY(-2px)' : 'translateY(0)',
    opacity: disabled || isLoading ? 0.6 : 1,
    outline: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: RESPONSIVE.spacing.xs,
  }),
};

export const CARD_STYLES = {
  getCardStyles: (): React.CSSProperties => ({
    background: `linear-gradient(135deg, ${THEME.colors.white}F2 0%, ${THEME.colors.gray50}F2 100%)`,
    backdropFilter: 'blur(10px)',
    border: `1px solid ${THEME.colors.white}99`,
    boxShadow: THEME.shadows.xl,
    borderRadius: THEME.radius.xl,
  }),
};

export const LAYOUT_STYLES = {
  getAuthLayoutStyles: (): React.CSSProperties => ({
    minHeight: '100vh',
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: THEME.gradients.hero,
    backgroundAttachment: 'fixed',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '1rem',
    overflow: 'auto',
  }),

  getOverlayStyles: (): React.CSSProperties => ({
    position: 'absolute',
    inset: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
  }),

  getFloatingElementStyles: (delaySecond?: boolean): React.CSSProperties => ({
    position: 'absolute',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: '9999px',
    filter: 'blur(3rem)',
    animation: 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
    animationDelay: delaySecond ? '1s' : '0s',
  }),
};

export default {
  INPUT_STYLES,
  BUTTON_STYLES,
  CARD_STYLES,
  LAYOUT_STYLES,
};
