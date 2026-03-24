/**
 * Responsive Sizing Utilities
 * Uses CSS clamp() for fluid, responsive sizing across all devices
 * Change values here to adjust responsiveness project-wide
 */

export const RESPONSIVE = {
  // Font Sizes
  fontSize: {
    xs: 'clamp(0.65rem, 1.5vw, 0.75rem)',
    sm: 'clamp(0.75rem, 1.5vw, 0.875rem)',
    base: 'clamp(0.875rem, 2vw, 1rem)',
    lg: 'clamp(0.95rem, 2.5vw, 1.125rem)',
    xl: 'clamp(1.1rem, 3vw, 1.25rem)',
    '2xl': 'clamp(1.25rem, 5vw, 1.75rem)',
    'heading-lg': 'clamp(1.5rem, 6vw, 2rem)',
    'heading-xl': 'clamp(1.75rem, 7vw, 2.5rem)',
  },

  // Spacing (responsive)
  spacing: {
    xs: 'clamp(0.375rem, 1vw, 0.5rem)',
    sm: 'clamp(0.5rem, 1.5vw, 0.75rem)',
    md: 'clamp(0.7rem, 2vw, 1rem)',
    lg: 'clamp(0.875rem, 2.5vw, 1.25rem)',
    xl: 'clamp(1rem, 3vw, 1.5rem)',
    '2xl': 'clamp(1.25rem, 4vw, 2rem)',
  },

  // Gaps (for flex/grid)
  gap: {
    xs: 'clamp(0.375rem, 1vw, 0.5rem)',
    sm: 'clamp(0.5rem, 1.5vw, 0.75rem)',
    md: 'clamp(0.7rem, 2.5vw, 1rem)',
    lg: 'clamp(0.875rem, 3vw, 1.25rem)',
  },

  // Padding
  padding: {
    input: 'clamp(0.625rem, 1vw, 0.625rem) clamp(0.875rem, 2vw, 1rem)',
    button: {
      sm: 'clamp(0.375rem, 1vw, 0.625rem) clamp(0.5rem, 2vw, 0.875rem)',
      md: 'clamp(0.5rem, 1.5vw, 0.75rem) clamp(0.875rem, 2.5vw, 1.25rem)',
      lg: 'clamp(0.625rem, 2vw, 1rem) clamp(1rem, 3vw, 2rem)',
    },
    card: 'clamp(1rem, 5vw, 1.75rem)',
  },

  // Border Radius (responsive)
  borderRadius: {
    sm: '0.375rem',
    md: '0.5rem',
    lg: 'clamp(0.625rem, 1vw, 0.75rem)',
    xl: '0.75rem',
  },

  // Margins
  margin: {
    section: 'clamp(1rem, 4vw, 1.5rem)',
    subsection: 'clamp(0.75rem, 3vw, 1.25rem)',
  },

  // Heights
  height: {
    input: 'clamp(2rem, 5vw, 2.75rem)',
    button: 'clamp(2.25rem, 6vw, 3rem)',
  },
} as const;

export default RESPONSIVE;
