/**
 * Dashboard Page
 * Main dashboard for DocuMind - AI-powered document intelligence platform
 * 
 * Features:
 * - Left sidebar navigation with 9 main sections
 * - Top header with user greeting and profile
 * - Overview stats cards
 * - Recent workspaces section
 * - Recent documents table
 * - Quick actions for main workflows
 * - Activity/history log
 * - Responsive design
 * - Production-ready component structure
 */

import React, { useState } from 'react';
import { FolderPlus, Upload, MessageCircle, Search } from 'lucide-react';
import {
  SidebarNav,
  DashboardHeader,
  StatCard,
  WorkspaceCard,
  QuickActionCard,
  DocumentTable,
  ActivityList,
  SectionHeader,
} from '../components/dashboard';
import {
  MOCK_USER,
  MOCK_STAT_CARDS,
  MOCK_WORKSPACES,
  MOCK_DOCUMENTS,
  MOCK_ACTIVITIES,
} from '../constants/mockData';
import { DASHBOARD_STYLES } from '../styles/dashboardStyles';
import RESPONSIVE from '../styles/responsive';

export const DashboardPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('dashboard');

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
    // TODO: Route to the selected tab page
    console.log('Navigating to:', tabId);
  };

  const handleWorkspaceOpen = (workspaceId: string) => {
    console.log('Opening workspace:', workspaceId);
    // TODO: Navigate to workspace details page
  };

  const handleDocumentView = (docId: string) => {
    console.log('Viewing document:', docId);
    // TODO: Navigate to document view page
  };

  const handleQuickAction = (action: string) => {
    console.log('Quick action:', action);
    // TODO: Handle quick actions - navigate to respective pages
  };

  return (
    <div style={DASHBOARD_STYLES.pageContainerStyles()}>
      {/* Sidebar Navigation */}
      <SidebarNav activeTab={activeTab} onTabChange={handleTabChange} />

      {/* Main Content Area */}
      <div style={DASHBOARD_STYLES.mainContentWrapperStyles()}>
        {/* Header */}
        <DashboardHeader
          userName={MOCK_USER.name}
          userInitial={MOCK_USER.name.charAt(0).toUpperCase()}
        />

        {/* Content Area */}
        <div style={DASHBOARD_STYLES.contentAreaStyles()}>
          
          {/* Stats Grid */}
          <div style={DASHBOARD_STYLES.statsGridStyles()}>
            {MOCK_STAT_CARDS.map((stat) => (
              <StatCard key={stat.id} stat={stat} />
            ))}
          </div>

          {/* Recent Workspaces Section */}
          <section>
            <SectionHeader
              title="Recent Workspaces"
              actionLabel="View All"
              onAction={() => handleTabChange('workspaces')}
            />
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                gap: RESPONSIVE.spacing.lg,
                marginTop: RESPONSIVE.spacing.lg,
              }}
            >
              {MOCK_WORKSPACES.map((workspace) => (
                <WorkspaceCard
                  key={workspace.id}
                  workspace={workspace}
                  onOpen={handleWorkspaceOpen}
                />
              ))}
            </div>
          </section>

          {/* Recent Documents Section */}
          <section>
            <SectionHeader
              title="Recent Documents"
              actionLabel="View All"
              onAction={() => handleTabChange('documents')}
            />
            <div style={{ marginTop: RESPONSIVE.spacing.lg }}>
              <DocumentTable
                documents={MOCK_DOCUMENTS}
                onViewDocument={handleDocumentView}
              />
            </div>
          </section>

          {/* Quick Actions Section */}
          <section>
            <SectionHeader title="Quick Actions" />
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                gap: RESPONSIVE.spacing.lg,
                marginTop: RESPONSIVE.spacing.lg,
              }}
            >
              <QuickActionCard
                icon={<FolderPlus size={32} />}
                label="Create Workspace"
                description="Organize your documents"
                onClick={() => handleQuickAction('create-workspace')}
              />
              <QuickActionCard
                icon={<Upload size={32} />}
                label="Upload Document"
                description="Add a new document"
                onClick={() => handleQuickAction('upload-document')}
              />
              <QuickActionCard
                icon={<MessageCircle size={32} />}
                label="Start Chat"
                description="Ask questions to documents"
                onClick={() => handleQuickAction('start-chat')}
              />
              <QuickActionCard
                icon={<Search size={32} />}
                label="Run Search"
                description="Semantic document search"
                onClick={() => handleQuickAction('run-search')}
              />
            </div>
          </section>

          {/* Activity Section */}
          <section>
            <SectionHeader
              title="Recent Activity"
              actionLabel="View All"
              onAction={() => console.log('View all activity')}
            />
            <div style={{ marginTop: RESPONSIVE.spacing.lg }}>
              <ActivityList activities={MOCK_ACTIVITIES} />
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};
