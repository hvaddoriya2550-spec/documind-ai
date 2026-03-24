/**
 * Color Palette
 * Centralized color definitions for consistent theming
 */

export const COLORS = {
  // Primary colors
  primary: '#6366f1',      // Indigo
  primaryLight: '#818cf8',
  primaryDark: '#4f46e5',
  
  // Secondary colors
  secondary: '#8b5cf6',    // Violet
  secondaryLight: '#a78bfa',
  secondaryDark: '#7c3aed',
  
  // Status colors
  success: '#10b981',      // Emerald
  successLight: '#6ee7b7',
  error: '#ef4444',        // Red
  errorLight: '#fca5a5',
  warning: '#f59e0b',      // Amber
  warningLight: '#fcd34d',
  info: '#3b82f6',         // Blue
  infoLight: '#93c5fd',
  
  // Neutral colors
  white: '#ffffff',
  black: '#000000',
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
  
  // Semantic colors
  text: {
    primary: '#111827',
    secondary: '#6b7280',
    disabled: '#d1d5db',
    light: '#ffffff',
  },
  background: {
    primary: '#ffffff',
    secondary: '#f9fafb',
    tertiary: '#f3f4f6',
  },
  border: '#e5e7eb',
  
  // Gradients
  gradientPrimary: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
} as const;

export type ColorType = typeof COLORS;
