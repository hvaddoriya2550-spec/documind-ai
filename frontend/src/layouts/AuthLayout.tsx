/**
 * Auth layout - for login/signup pages
 * Uses centralized styling from componentStyles
 */

import React from 'react';
import { LAYOUT_STYLES } from '../styles/componentStyles';

interface AuthLayoutProps {
  children: React.ReactNode;
}

export const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) => {
  return (
    <div style={LAYOUT_STYLES.getAuthLayoutStyles()}>
      {/* Overlay for better readability */}
      <div style={LAYOUT_STYLES.getOverlayStyles()} />
      
      {/* Floating decorative elements */}
      <div style={{
        ...LAYOUT_STYLES.getFloatingElementStyles(),
        top: 0,
        left: 0,
        width: '18rem',
        height: '18rem',
        transform: 'translate(-50%, -50%)',
      }} />
      <div style={{
        ...LAYOUT_STYLES.getFloatingElementStyles(true),
        bottom: 0,
        right: 0,
        width: '20rem',
        height: '20rem',
        transform: 'translate(50%, 50%)',
      }} />
      
      {/* Content */}
      <div style={{
        width: '100%',
        maxWidth: '420px',
        position: 'relative',
        zIndex: 10,
        animation: 'fadeInUp 0.6s ease-out',
      }}>
        {children}
      </div>
    </div>
  );
};
