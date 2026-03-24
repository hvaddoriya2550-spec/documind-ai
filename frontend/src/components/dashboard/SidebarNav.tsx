/**
 * SidebarNav Component
 * Premium sidebar navigation with Lucide icons
 */

import React from 'react';
import {
  LayoutDashboard,
  Folders,
  FileText,
  MessageSquare,
  Search,
  BookOpen,
  GitCompare,
  BarChart3,
  Settings,
} from 'lucide-react';
import { DASHBOARD_STYLES } from '../../styles/dashboardStyles';
import { SIDEBAR_NAVIGATION } from '../../constants/mockData';

interface SidebarNavProps {
  activeTab: string;
  onTabChange: (tabId: string) => void;
}

// Map nav IDs to Lucide icons
const iconMap: Record<string, React.ReactNode> = {
  dashboard: <LayoutDashboard size={20} />,
  workspaces: <Folders size={20} />,
  documents: <FileText size={20} />,
  chat: <MessageSquare size={20} />,
  search: <Search size={20} />,
  summaries: <BookOpen size={20} />,
  compare: <GitCompare size={20} />,
  analytics: <BarChart3 size={20} />,
  settings: <Settings size={20} />,
};

export const SidebarNav: React.FC<SidebarNavProps> = ({ activeTab, onTabChange }) => {
  return (
    <aside style={DASHBOARD_STYLES.sidebarWrapperStyles()}>
      {/* Sidebar Header */}
      <div style={DASHBOARD_STYLES.sidebarHeaderStyles()}>
        <h2 style={DASHBOARD_STYLES.sidebarTitleStyles()}>DocuMind</h2>
        <p style={DASHBOARD_STYLES.sidebarSubtitleStyles()}>AI Knowledge Assistant</p>
      </div>

      {/* Navigation List */}
      <ul style={DASHBOARD_STYLES.navListStyles()}>
        {SIDEBAR_NAVIGATION.map((item) => (
          <li key={item.id}>
            <button
              onClick={() => onTabChange(item.id)}
              style={{
                ...DASHBOARD_STYLES.navItemStyles(activeTab === item.id),
                border: 'none',
                width: '100%',
                textAlign: 'left',
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                background: 'transparent',
              }}
            >
              <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {iconMap[item.id] || <LayoutDashboard size={20} />}
              </span>
              <span>{item.label}</span>
            </button>
          </li>
        ))}
      </ul>
    </aside>
  );
};
