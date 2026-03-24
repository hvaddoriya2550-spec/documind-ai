/**
 * ActivityList Component
 * Premium activity/history list with Lucide icons
 */

import React from 'react';
import type { ActivityData } from '../../types/dashboard';
import { DASHBOARD_STYLES } from '../../styles/dashboardStyles';
import THEME from '../../styles/theme';

interface ActivityListProps {
  activities: ActivityData[];
}

export const ActivityList: React.FC<ActivityListProps> = ({ activities }) => {
  return (
    <div style={DASHBOARD_STYLES.activityListStyles()}>
      {activities.length === 0 ? (
        <p
          style={{
            textAlign: THEME.textAlign.center,
            color: THEME.colors.gray500,
            margin: 0,
          }}
        >
          No recent activity. Start by uploading a document!
        </p>
      ) : (
        activities.map((activity) => (
          <div key={activity.id} style={DASHBOARD_STYLES.activityItemStyles()}>
            {/* Icon */}
            <div style={DASHBOARD_STYLES.activityIconStyles()}>
              {activity.icon}
            </div>

            {/* Content */}
            <div style={{ flex: 1 }}>
              <p
                style={{
                  margin: 0,
                  fontSize: '0.9375rem',
                  fontWeight: 600,
                  color: THEME.colors.gray900,
                }}
              >
                {activity.title}
              </p>
              <p
                style={{
                  margin: 0,
                  marginTop: '0.25rem',
                  fontSize: '0.8125rem',
                  color: THEME.colors.gray500,
                  fontWeight: 500,
                }}
              >
                {activity.description}
              </p>
            </div>

            {/* Timestamp */}
            <div
              style={{
                fontSize: '0.8125rem',
                color: THEME.colors.gray400,
                minWidth: '80px',
                textAlign: 'right',
                fontWeight: 500,
              }}
            >
              {activity.timeStamp}
            </div>
          </div>
        ))
      )}
    </div>
  );
};
