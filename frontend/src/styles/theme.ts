/**
 * Centralized Theme Configuration
 * This is the single source of truth for all colors, spacing, and design tokens
 * Change values here and they'll apply throughout the entire project
 */

export const THEME = {
  // Colors
  colors: {
    primary: '#8b5cf6',
    primaryLight: '#a78bfa',
    primaryDark: '#7c3aed',
    secondary: '#0ea5e9',
    secondaryLight: '#06b6d4',
    secondaryDark: '#0891b2',
    error: '#ef4444',
    errorLight: '#fca5a5',
    errorDark: '#dc2626',
    success: '#10b981',
    warning: '#f59e0b',
    info: '#3b82f6',
    
    // Neutral
    white: '#ffffff',
    gray50: '#f9fafb',
    gray100: '#f3f4f6',
    gray200: '#e5e7eb',
    gray300: '#d1d5db',
    gray400: '#9ca3af',
    gray500: '#6b7280',
    gray600: '#4b5563',
    gray700: '#374151',
    gray800: '#1f2937',
    gray900: '#111827',
    black: '#000000',
  },

  // Spacing (use with clamp for responsive)
  spacing: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '0.75rem',
    lg: '1rem',
    xl: '1.25rem',
    '2xl': '1.5rem',
    '3xl': '2rem',
  },

  // Border Radius
  radius: {
    sm: '0.375rem',
    md: '0.5rem',
    lg: '0.625rem',
    xl: '0.75rem',
  },

  // Box Shadows
  shadows: {
    sm: '0 1px 3px rgba(0, 0, 0, 0.05)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
    lg: '0 8px 16px -2px rgba(0, 0, 0, 0.1)',
    xl: '0 8px 32px rgba(0, 0, 0, 0.15)',
    '2xl': '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
  },

  // Typography
  typography: {
    fontFamily: "system-ui, 'Segoe UI', Roboto, sans-serif",
    fontWeight: {
      light: 300,
      normal: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
    },
  },

  // Text Alignment
  textAlign: {
    left: 'left' as const,
    center: 'center' as const,
    right: 'right' as const,
    justify: 'justify' as const,
  },

  // Transitions
  transitions: {
    fast: '0.15s ease-out',
    base: '0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    slow: '0.5s ease-in-out',
  },

  // Gradients
  gradients: {
    primary: 'linear-gradient(135deg, #8b5cf6 0%, #d946ef 100%)',
    secondary: 'linear-gradient(135deg, #0ea5e9 0%, #06b6d4 100%)',
    danger: 'linear-gradient(135deg, #ef4444 0%, #f43f5e 100%)',
    hero: 'linear-gradient(135deg, #8b5cf6 0%, #d946ef 50%, #3b82f6 100%)',
  },
} as const;

export default THEME;
