/**
 * SplashScreen Page
 * Modern, animated splash screen for DocuMind AI document assistant
 * 
 * Features:
 * - Full screen gradient background with hero theme
 * - Animated title, subtitle, and tagline with staggered timing
 * - Glowing logo effect with radial gradient
 * - Animated loading indicator with pulsing dots
 * - Responsive design using CSS clamp
 * - Premium SaaS aesthetic with text shadows
 * - Auto-dismiss functionality with callback
 */

import React, { useEffect } from 'react';
import { SPLASH_SCREEN_STYLES } from '../styles/splashScreenStyles';

interface SplashPageProps {
  duration?: number;
  onComplete?: () => void;
}

/**
 * SplashPage Component
 * Displays a premium animated splash screen before main app loads
 * 
 * @param duration - Time in milliseconds before auto-dismiss (default: 3000ms)
 * @param onComplete - Callback function when splash completes
 */
const SplashPage: React.FC<SplashPageProps> = ({
  duration = 3000,
  onComplete,
}) => {
  // Auto-dismiss after specified duration
  useEffect(() => {
    if (duration && onComplete) {
      const splashTimer = setTimeout(() => {
        onComplete();
      }, duration);

      // Cleanup timer on unmount
      return () => clearTimeout(splashTimer);
    }
  }, [duration, onComplete]);

  return (
    <div style={SPLASH_SCREEN_STYLES.containerStyles()}>
      {/* Main Content Container */}
      <div style={SPLASH_SCREEN_STYLES.contentWrapperStyles()}>
        
        {/* Logo Section - Glowing Circle with Icon */}
        <div style={SPLASH_SCREEN_STYLES.logoBackgroundStyles()}>
          <span style={{ fontSize: '3rem' }}>📄✨</span>
        </div>

        {/* Title Section */}
        <h1 style={SPLASH_SCREEN_STYLES.titleStyles()}>
          DocuMind
        </h1>

        {/* Subtitle Section */}
        <p style={SPLASH_SCREEN_STYLES.subtitleStyles()}>
          Understand your documents instantly
        </p>

        {/* Tagline Section */}
        <p style={SPLASH_SCREEN_STYLES.taglineStyles()}>
          AI-powered document intelligence
        </p>

        {/* Loading Indicator - Animated Dots */}
        <div style={SPLASH_SCREEN_STYLES.loaderContainerStyles()}>
          {/* Dot 1 */}
          <div style={SPLASH_SCREEN_STYLES.dotStyles(0)} />
          
          {/* Dot 2 */}
          <div style={SPLASH_SCREEN_STYLES.dotStyles(0.2)} />
          
          {/* Dot 3 */}
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

export default SplashPage;
