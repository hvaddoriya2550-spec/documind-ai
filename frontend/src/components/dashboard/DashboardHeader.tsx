/**
 * DashboardHeader Component
 * Premium top header with greeting, subtitle, and user profile
 */

import React from 'react';
import { Bell } from 'lucide-react';
import { DASHBOARD_STYLES } from '../../styles/dashboardStyles';

interface DashboardHeaderProps {
  userName: string;
  userInitial: string;
}

export const DashboardHeader: React.FC<DashboardHeaderProps> = ({
  userName,
  userInitial,
}) => {
  return (
    <header style={DASHBOARD_STYLES.headerStyles()}>
      {/* Header Left - Greeting */}
      <div style={DASHBOARD_STYLES.headerLeftStyles()}>
        <h1 style={DASHBOARD_STYLES.greetingStyles()}>
          Welcome back, {userName}
        </h1>
        <p style={DASHBOARD_STYLES.headerSubtitleStyles()}>
          Here is what is happening in your DocuMind workspace today.
        </p>
      </div>

      {/* Header Right - Profile & Notifications */}
      <div style={DASHBOARD_STYLES.headerRightStyles()}>
        {/* Notification Icon */}
        <button
          style={DASHBOARD_STYLES.notificationButtonStyles()}
          title="Notifications"
        >
          <Bell size={20} />
        </button>

        {/* User Avatar */}
        <div
          style={DASHBOARD_STYLES.avatarStyles()}
          title={userName}
        >
          {userInitial}
        </div>
      </div>
    </header>
  );
};
