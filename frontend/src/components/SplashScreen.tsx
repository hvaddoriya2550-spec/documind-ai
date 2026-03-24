/**
 * SplashScreen Component
 * Modern, animated splash screen for DocuMind AI document assistant
 * 
 * Features:
 * - Full screen gradient background
 * - Animated title, subtitle, and tagline
 * - Glowing logo effect
 * - Animated loading indicator with dots
 * - Responsive design
 * - Premium SaaS feel
 */

import React from 'react';
import { SPLASH_SCREEN_STYLES } from '../styles/splashScreenStyles';

interface SplashScreenProps {
  duration?: number; // Optional: auto-dismiss after duration (ms)
  onComplete?: () => void; // Callback when splash screen should close
}

export const SplashScreen: React.FC<SplashScreenProps> = ({
  duration = 3000,
  onComplete,
}) => {
  React.useEffect(() => {
    if (duration && onComplete) {
      const timer = setTimeout(onComplete, duration);
      return () => clearTimeout(timer);
    }
  }, [duration, onComplete]);

  return (
    <div style={SPLASH_SCREEN_STYLES.containerStyles()}>
      <div style={SPLASH_SCREEN_STYLES.contentWrapperStyles()}>
        
        {/* Glowing Logo/Icon */}
        <div style={SPLASH_SCREEN_STYLES.logoBackgroundStyles()}>
          <span style={{ fontSize: '3rem' }}>📄✨</span>
        </div>

        {/* Main Title */}
        <h1 style={SPLASH_SCREEN_STYLES.titleStyles()}>
          DocuMind
        </h1>

        {/* Subtitle */}
        <p style={SPLASH_SCREEN_STYLES.subtitleStyles()}>
          Understand your documents instantly
        </p>

        {/* Tagline */}
        <p style={SPLASH_SCREEN_STYLES.taglineStyles()}>
          AI-powered document intelligence
        </p>

        {/* Animated Loader - Dots */}
        <div style={SPLASH_SCREEN_STYLES.loaderContainerStyles()}>
          <div style={SPLASH_SCREEN_STYLES.dotStyles(0)} />
          <div style={SPLASH_SCREEN_STYLES.dotStyles(0.2)} />
          <div style={SPLASH_SCREEN_STYLES.dotStyles(0.4)} />
        </div>

        {/* Status Text */}
        <p style={SPLASH_SCREEN_STYLES.statusTextStyles()}>
          Initializing...
        </p>
      </div>
    </div>
  );
};

export default SplashScreen;
