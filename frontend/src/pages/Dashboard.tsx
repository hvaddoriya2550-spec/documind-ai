/**
 * Dashboard Page - Modern Minimalist Design
 * Main dashboard for DocuMind - AI-powered document intelligence platform
 * 
 * Features:
 * - Clean left sidebar navigation
 * - Spacious, modern layout with proper whitespace
 * - Overview stats section
 * - Document workspace with recent files
 * - Quick action buttons
 * - Activity timeline
 * - Responsive design optimized for all screen sizes
 * - Production-ready component structure
 */

import React, { useState } from 'react';
import { 
  FolderPlus, Upload, MessageCircle, Search, LogOut,
  FileText, MoreVertical
} from 'lucide-react';
import { useAuth } from '../hooks';
import THEME from '../styles/theme';

// Mock data
const MOCK_USER = { name: 'Harsh Vaddoriya', email: 'harsh@example.com' };
const MOCK_DOCUMENTS = [
  { id: '1', name: 'Q4 Financial Report.pdf', workspace: 'Finance', modified: '2 hours ago', size: '2.4 MB' },
  { id: '2', name: 'Project Roadmap 2026.docx', workspace: 'Projects', modified: '1 day ago', size: '1.2 MB' },
  { id: '3', name: 'Customer Feedback Summary.pdf', workspace: 'Marketing', modified: '3 days ago', size: '890 KB' },
];

const MOCK_STATS = [
  { label: 'Total Documents', value: '42', icon: '📄', color: '#3B82F6' },
  { label: 'Active Workspaces', value: '8', icon: '📁', color: '#10B981' },
  { label: 'Documents Analyzed', value: '156', icon: '⚡', color: '#F59E0B' },
];

export const DashboardPage: React.FC = () => {
  const { logout } = useAuth();
  const [activeTab, setActiveTab] = useState('dashboard');

  const sidebarItems = [
    { id: 'dashboard', icon: '📊', label: 'Dashboard', badge: null },
    { id: 'documents', icon: '📄', label: 'Documents', badge: '42' },
    { id: 'workspaces', icon: '📁', label: 'Workspaces', badge: '8' },
    { id: 'search', icon: '🔍', label: 'Search', badge: null },
    { id: 'chat', icon: '💬', label: 'Chat', badge: null },
    { id: 'settings', icon: '⚙️', label: 'Settings', badge: null },
  ];

  return (
    <div style={{
      display: 'flex',
      height: '100vh',
      backgroundColor: '#F9FAFB',
      fontFamily: 'var(--font-family, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto)',
    }}>
      {/* ====== LEFT SIDEBAR ====== */}
      <aside style={{
        width: '280px',
        backgroundColor: '#FFFFFF',
        borderRight: `1px solid ${THEME.colors.gray200}`,
        display: 'flex',
        flexDirection: 'column',
        paddingTop: '32px',
        boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
      }}>
        {/* Logo/Brand */}
        <div style={{
          paddingLeft: '24px',
          paddingRight: '24px',
          marginBottom: '32px',
        }}>
          <div style={{
            fontSize: '24px',
            fontWeight: '700',
            color: THEME.colors.primary,
            letterSpacing: '-0.5px',
          }}>
            📚 DocuMind
          </div>
          <div style={{
            fontSize: '11px',
            color: THEME.colors.gray500,
            marginTop: '4px',
            letterSpacing: '0.5px',
          }}>
            AI DOCUMENT PLATFORM
          </div>
        </div>

        {/* Navigation Items */}
        <nav style={{ flex: 1, paddingLeft: '12px', paddingRight: '12px', paddingBottom: '24px' }}>
          {sidebarItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              style={{
                width: '100%',
                padding: '12px 16px',
                marginBottom: '8px',
                border: 'none',
                borderRadius: '10px',
                backgroundColor: activeTab === item.id ? '#EFF6FF' : 'transparent',
                color: activeTab === item.id ? THEME.colors.primary : THEME.colors.gray700,
                fontSize: '14px',
                fontWeight: activeTab === item.id ? '600' : '500',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={(e) => {
                if (activeTab !== item.id) {
                  (e.currentTarget as HTMLElement).style.backgroundColor = '#F3F4F6';
                }
              }}
              onMouseLeave={(e) => {
                if (activeTab !== item.id) {
                  (e.currentTarget as HTMLElement).style.backgroundColor = 'transparent';
                }
              }}
            >
              <span style={{ fontSize: '18px' }}>{item.icon}</span>
              <span style={{ flex: 1, textAlign: 'left' }}>{item.label}</span>
              {item.badge && (
                <span style={{
                  backgroundColor: THEME.colors.primary,
                  color: 'white',
                  fontSize: '11px',
                  fontWeight: '600',
                  padding: '2px 8px',
                  borderRadius: '12px',
                  minWidth: '20px',
                  textAlign: 'center',
                }}>
                  {item.badge}
                </span>
              )}
            </button>
          ))}
        </nav>

        {/* User Profile */}
        <div style={{
          borderTop: `1px solid ${THEME.colors.gray200}`,
          padding: '16px 12px',
        }}>
          <button
            onClick={() => alert('Profile: ' + MOCK_USER.name)}
            style={{
              width: '100%',
              padding: '12px 16px',
              border: 'none',
              borderRadius: '10px',
              backgroundColor: '#F9FAFB',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              marginBottom: '8px',
              transition: 'all 0.2s ease',
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.backgroundColor = '#F3F4F6';
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.backgroundColor = '#F9FAFB';
            }}
          >
            <div style={{
              width: '36px',
              height: '36px',
              borderRadius: '8px',
              backgroundColor: THEME.colors.primary,
              color: 'white',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '16px',
              fontWeight: '600',
            }}>
              {MOCK_USER.name.charAt(0)}
            </div>
            <div style={{ flex: 1, textAlign: 'left' }}>
              <div style={{ fontSize: '13px', fontWeight: '600', color: THEME.colors.gray900 }}>
                {MOCK_USER.name}
              </div>
              <div style={{ fontSize: '11px', color: THEME.colors.gray500 }}>
                {MOCK_USER.email}
              </div>
            </div>
          </button>
          <button
            onClick={() => logout()}
            style={{
              width: '100%',
              padding: '10px 16px',
              border: 'none',
              borderRadius: '8px',
              backgroundColor: 'transparent',
              color: THEME.colors.gray600,
              fontSize: '13px',
              fontWeight: '500',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              transition: 'all 0.2s ease',
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.backgroundColor = '#FEE2E2';
              (e.currentTarget as HTMLElement).style.color = '#DC2626';
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.backgroundColor = 'transparent';
              (e.currentTarget as HTMLElement).style.color = THEME.colors.gray600;
            }}
          >
            <LogOut size={16} />
            Logout
          </button>
        </div>
      </aside>

      {/* ====== MAIN CONTENT ====== */}
      <main style={{
        flex: 1,
        overflowY: 'auto',
        paddingTop: '32px',
        paddingLeft: '48px',
        paddingRight: '48px',
        paddingBottom: '48px',
      }}>
        {/* Header */}
        <div style={{
          marginBottom: '40px',
        }}>
          <h1 style={{
            fontSize: '32px',
            fontWeight: '700',
            color: THEME.colors.gray900,
            margin: '0 0 8px 0',
            letterSpacing: '-0.5px',
          }}>
            Welcome back, {MOCK_USER.name.split(' ')[0]}!
          </h1>
          <p style={{
            fontSize: '15px',
            color: THEME.colors.gray500,
            margin: 0,
          }}>
            Here's what's happening with your documents today
          </p>
        </div>

        {/* Stats Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '20px',
          marginBottom: '48px',
        }}>
          {MOCK_STATS.map((stat) => (
            <div
              key={stat.label}
              style={{
                backgroundColor: '#FFFFFF',
                border: `1px solid ${THEME.colors.gray200}`,
                borderRadius: '12px',
                padding: '24px',
                transition: 'all 0.3s ease',
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = THEME.colors.primary;
                (e.currentTarget as HTMLElement).style.boxShadow = `0 4px 12px ${stat.color}20`;
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = THEME.colors.gray200;
                (e.currentTarget as HTMLElement).style.boxShadow = 'none';
              }}
            >
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
                <div>
                  <div style={{ fontSize: '13px', color: THEME.colors.gray500, fontWeight: '500', marginBottom: '8px' }}>
                    {stat.label}
                  </div>
                  <div style={{ fontSize: '32px', fontWeight: '700', color: THEME.colors.gray900 }}>
                    {stat.value}
                  </div>
                </div>
                <div style={{ fontSize: '32px' }}>{stat.icon}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Recent Documents */}
        <div style={{ marginBottom: '48px' }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '20px',
          }}>
            <div>
              <h2 style={{
                fontSize: '18px',
                fontWeight: '700',
                color: THEME.colors.gray900,
                margin: 0,
              }}>
                Recent Documents
              </h2>
              <p style={{
                fontSize: '13px',
                color: THEME.colors.gray500,
                margin: '4px 0 0 0',
              }}>
                Files you've opened recently
              </p>
            </div>
            <button style={{
              padding: '8px 16px',
              borderRadius: '8px',
              border: `1px solid ${THEME.colors.gray300}`,
              backgroundColor: '#FFFFFF',
              color: THEME.colors.primary,
              fontSize: '13px',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.backgroundColor = '#EFF6FF';
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.backgroundColor = '#FFFFFF';
            }}
            >
              View All
            </button>
          </div>

          <div style={{
            display: 'grid',
            gap: '12px',
          }}>
            {MOCK_DOCUMENTS.map((doc) => (
              <div
                key={doc.id}
                style={{
                  backgroundColor: '#FFFFFF',
                  border: `1px solid ${THEME.colors.gray200}`,
                  borderRadius: '10px',
                  padding: '16px 20px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.backgroundColor = '#F9FAFB';
                  (e.currentTarget as HTMLElement).style.borderColor = THEME.colors.primary;
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.backgroundColor = '#FFFFFF';
                  (e.currentTarget as HTMLElement).style.borderColor = THEME.colors.gray200;
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flex: 1 }}>
                  <FileText size={20} color={THEME.colors.primary} />
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: '14px', fontWeight: '600', color: THEME.colors.gray900 }}>
                      {doc.name}
                    </div>
                    <div style={{
                      fontSize: '12px',
                      color: THEME.colors.gray500,
                      marginTop: '4px',
                    }}>
                      📁 {doc.workspace} • {doc.modified} • {doc.size}
                    </div>
                  </div>
                </div>
                <button style={{
                  padding: '6px',
                  border: 'none',
                  borderRadius: '6px',
                  backgroundColor: 'transparent',
                  cursor: 'pointer',
                  color: THEME.colors.gray400,
                  transition: 'all 0.2s ease',
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.backgroundColor = THEME.colors.gray100;
                  (e.currentTarget as HTMLElement).style.color = THEME.colors.gray600;
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.backgroundColor = 'transparent';
                  (e.currentTarget as HTMLElement).style.color = THEME.colors.gray400;
                }}
                >
                  <MoreVertical size={18} />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div>
          <h2 style={{
            fontSize: '18px',
            fontWeight: '700',
            color: THEME.colors.gray900,
            margin: '0 0 20px 0',
          }}>
            Quick Actions
          </h2>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '16px',
          }}>
            {[
              { icon: FolderPlus, label: 'New Workspace', desc: 'Organize documents' },
              { icon: Upload, label: 'Upload Document', desc: 'Add a new file' },
              { icon: MessageCircle, label: 'Start Chat', desc: 'Ask questions' },
              { icon: Search, label: 'Run Search', desc: 'Find documents' },
            ].map((action, idx) => {
              const Icon = action.icon;
              return (
                <button
                  key={idx}
                  style={{
                    backgroundColor: '#FFFFFF',
                    border: `1px solid ${THEME.colors.gray200}`,
                    borderRadius: '10px',
                    padding: '20px',
                    cursor: 'pointer',
                    textAlign: 'center',
                    transition: 'all 0.2s ease',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '12px',
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.backgroundColor = '#EFF6FF';
                    (e.currentTarget as HTMLElement).style.borderColor = THEME.colors.primary;
                    (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)';
                    (e.currentTarget as HTMLElement).style.boxShadow = '0 4px 12px rgba(59, 130, 246, 0.1)';
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.backgroundColor = '#FFFFFF';
                    (e.currentTarget as HTMLElement).style.borderColor = THEME.colors.gray200;
                    (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
                    (e.currentTarget as HTMLElement).style.boxShadow = 'none';
                  }}
                >
                  <Icon size={28} color={THEME.colors.primary} />
                  <div style={{ fontSize: '14px', fontWeight: '600', color: THEME.colors.gray900 }}>
                    {action.label}
                  </div>
                  <div style={{ fontSize: '12px', color: THEME.colors.gray500 }}>
                    {action.desc}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </main>
    </div>
  );
};
