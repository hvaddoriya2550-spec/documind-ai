/**
 * Mock Data for Dashboard
 * Realistic sample data for development and testing
 */

import type { 
  StatCardData, 
  WorkspaceCardData, 
  DocumentData, 
  ActivityData,
  DashboardUser,
  DashboardStats
} from '../types/dashboard';

export const MOCK_USER: DashboardUser = {
  id: 'user-1',
  name: 'Ravina',
  email: 'ravina@documind.ai',
  avatar: 'R',
};

export const MOCK_STATS: DashboardStats = {
  totalWorkspaces: 5,
  totalDocuments: 24,
  readyDocuments: 22,
  totalChats: 128,
};

export const MOCK_STAT_CARDS: StatCardData[] = [
  {
    id: 'stat-1',
    label: 'Total Workspaces',
    value: 5,
    icon: '📁',
    trend: { direction: 'up', percentage: 12 },
    color: 'primary',
  },
  {
    id: 'stat-2',
    label: 'Total Documents',
    value: 24,
    icon: '📄',
    trend: { direction: 'up', percentage: 8 },
    color: 'secondary',
  },
  {
    id: 'stat-3',
    label: 'Ready Documents',
    value: 22,
    icon: '✅',
    trend: { direction: 'up', percentage: 15 },
    color: 'success',
  },
  {
    id: 'stat-4',
    label: 'Total Chats',
    value: 128,
    icon: '💬',
    trend: { direction: 'up', percentage: 25 },
    color: 'info',
  },
];

export const MOCK_WORKSPACES: WorkspaceCardData[] = [
  {
    id: 'ws-1',
    name: 'Product Research',
    description: 'Market analysis and competitor research documents',
    documentCount: 8,
    lastUpdated: '2024-03-22',
    collaborators: 3,
    color: 'primary',
  },
  {
    id: 'ws-2',
    name: 'Legal Documents',
    description: 'Contract templates and legal compliance files',
    documentCount: 5,
    lastUpdated: '2024-03-20',
    collaborators: 2,
    color: 'secondary',
  },
  {
    id: 'ws-3',
    name: 'Technical Specs',
    description: 'API documentation and technical specifications',
    documentCount: 11,
    lastUpdated: '2024-03-21',
    collaborators: 4,
    color: 'warning',
  },
];

export const MOCK_DOCUMENTS: DocumentData[] = [
  {
    id: 'doc-1',
    fileName: 'Q1 Financial Report',
    type: 'pdf',
    status: 'ready',
    pages: 45,
    uploadDate: '2024-03-22',
    size: '2.4 MB',
  },
  {
    id: 'doc-2',
    fileName: 'Product Roadmap 2024',
    type: 'docx',
    status: 'ready',
    pages: 12,
    uploadDate: '2024-03-21',
    size: '1.8 MB',
  },
  {
    id: 'doc-3',
    fileName: 'API Documentation',
    type: 'pdf',
    status: 'processing',
    pages: 128,
    uploadDate: '2024-03-22',
    size: '5.2 MB',
  },
  {
    id: 'doc-4',
    fileName: 'Customer Feedback Summary',
    type: 'doc',
    status: 'ready',
    pages: 8,
    uploadDate: '2024-03-20',
    size: '0.8 MB',
  },
  {
    id: 'doc-5',
    fileName: 'Security Audit Report',
    type: 'pdf',
    status: 'ready',
    pages: 67,
    uploadDate: '2024-03-19',
    size: '3.1 MB',
  },
];

export const MOCK_ACTIVITIES: ActivityData[] = [
  {
    id: 'act-1',
    type: 'upload',
    title: 'Uploaded Q1 Financial Report',
    description: 'Added to Product Research workspace',
    timeStamp: '2 hours ago',
    icon: '📤',
  },
  {
    id: 'act-2',
    type: 'chat',
    title: 'Started chat session',
    description: 'Asked questions about API Documentation',
    timeStamp: '4 hours ago',
    icon: '💬',
  },
  {
    id: 'act-3',
    type: 'workspace',
    title: 'Created new workspace',
    description: 'Technical Specs workspace created',
    timeStamp: '1 day ago',
    icon: '✨',
  },
  {
    id: 'act-4',
    type: 'summary',
    title: 'Generated summary',
    description: 'Created summary for Product Roadmap 2024',
    timeStamp: '2 days ago',
    icon: '📋',
  },
];

export const SIDEBAR_NAVIGATION = [
  { id: 'dashboard', label: 'Dashboard', icon: '📊', path: '/dashboard' },
  { id: 'workspaces', label: 'Workspaces', icon: '📁', path: '/workspaces' },
  { id: 'documents', label: 'Documents', icon: '📄', path: '/documents' },
  { id: 'chat', label: 'Chat', icon: '💬', path: '/chat' },
  { id: 'search', label: 'Search', icon: '🔍', path: '/search' },
  { id: 'summaries', label: 'Summaries', icon: '📋', path: '/summaries' },
  { id: 'compare', label: 'Compare', icon: '⚖️', path: '/compare' },
  { id: 'analytics', label: 'Analytics', icon: '📈', path: '/analytics' },
  { id: 'settings', label: 'Settings', icon: '⚙️', path: '/settings' },
];
