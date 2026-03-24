/**
 * Splash Screen Styles
 * Centralized styling for the SplashScreen component
 * Modern, minimal, and elegant design for AI product landing feel
 */

import THEME from './theme';
import RESPONSIVE from './responsive';
import React from 'react';

export const SPLASH_SCREEN_STYLES = {
  // Container - Full screen background
  containerStyles: (): React.CSSProperties => ({
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: THEME.gradients.hero,
    zIndex: 9999,
    overflow: 'hidden',
  }),

  // Content wrapper
  contentWrapperStyles: (): React.CSSProperties => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: RESPONSIVE.spacing.lg,
    textAlign: THEME.textAlign.center,
    animation: 'fadeInUp 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)',
  }),

  // Logo/Glow effect background
  logoBackgroundStyles: (): React.CSSProperties => ({
    width: 'clamp(80px, 15vw, 120px)',
    height: 'clamp(80px, 15vw, 120px)',
    borderRadius: '50%',
    background: `radial-gradient(circle at 30% 30%, ${THEME.colors.primaryLight}, ${THEME.colors.primary})`,
    boxShadow: `0 0 60px ${THEME.colors.primary}, 0 0 100px ${THEME.colors.secondary}`,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    animation: 'focusGlow 2.5s ease-in-out infinite',
    marginBottom: RESPONSIVE.spacing.md,
  }),

  // Main title (DocuMind)
  titleStyles: (): React.CSSProperties => ({
    fontSize: 'clamp(2.5rem, 8vw, 4rem)',
    fontWeight: THEME.typography.fontWeight.bold,
    color: THEME.colors.white,
    margin: 0,
    letterSpacing: '-1px',
    textShadow: `0 10px 30px rgba(0, 0, 0, 0.2)`,
    animation: 'fadeInDown 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) 0.1s both',
  }),

  // Subtitle
  subtitleStyles: (): React.CSSProperties => ({
    fontSize: 'clamp(1rem, 3vw, 1.5rem)',
    fontWeight: THEME.typography.fontWeight.normal,
    color: THEME.colors.gray50,
    margin: 0,
    opacity: 0.95,
    lineHeight: 1.4,
    animation: 'fadeInUp 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) 0.2s both',
  }),

  // Tagline
  taglineStyles: (): React.CSSProperties => ({
    fontSize: 'clamp(0.875rem, 2.5vw, 1.125rem)',
    fontWeight: THEME.typography.fontWeight.medium,
    color: `${THEME.colors.secondary}E6`,
    margin: 0,
    marginTop: RESPONSIVE.spacing.sm,
    animation: 'fadeInUp 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) 0.3s both',
    letterSpacing: '0.5px',
  }),

  // Loading indicator container
  loaderContainerStyles: (): React.CSSProperties => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: RESPONSIVE.spacing.sm,
    marginTop: RESPONSIVE.spacing.xl,
    animation: 'fadeInUp 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) 0.4s both',
  }),

  // Individual animated dot
  dotStyles: (delay: number): React.CSSProperties => ({
    width: '10px',
    height: '10px',
    borderRadius: '50%',
    backgroundColor: THEME.colors.white,
    opacity: 0.6,
    animation: `pulse 1.5s cubic-bezier(0.4, 0, 0.6, 1) infinite`,
    animationDelay: `${delay}s`,
    boxShadow: `0 0 10px ${THEME.colors.secondary}80`,
  }),

  // Progress bar style (alternative loader)
  progressBarContainerStyles: (): React.CSSProperties => ({
    width: 'clamp(150px, 30vw, 250px)',
    height: '3px',
    backgroundColor: `${THEME.colors.white}20`,
    borderRadius: '2px',
    overflow: 'hidden',
    marginTop: RESPONSIVE.spacing.lg,
    animation: 'fadeInUp 0.8s ease-out 0.4s both',
  }),

  progressBarFillStyles: (): React.CSSProperties => ({
    height: '100%',
    background: `linear-gradient(90deg, ${THEME.colors.secondary}, ${THEME.colors.primary})`,
    borderRadius: '2px',
    animation: 'shimmer 2s ease-in-out infinite',
  }),

  // Status text
  statusTextStyles: (): React.CSSProperties => ({
    fontSize: RESPONSIVE.fontSize.xs,
    color: THEME.colors.gray50,
    marginTop: RESPONSIVE.spacing.md,
    opacity: 0.7,
    animation: 'fadeInUp 0.8s ease-out 0.5s both',
    letterSpacing: '0.5px',
  }),
} as const;

export default SPLASH_SCREEN_STYLES;
