/**
 * Dashboard Types and Interfaces
 * Type definitions for dashboard data structures
 */

export interface StatCardData {
  id: string;
  label: string;
  value: string | number;
  icon: string;
  trend?: {
    direction: 'up' | 'down';
    percentage: number;
  };
  color: 'primary' | 'secondary' | 'success' | 'warning' | 'info';
}

export interface WorkspaceCardData {
  id: string;
  name: string;
  description: string;
  documentCount: number;
  lastUpdated: string;
  collaborators?: number;
  color?: string;
}

export interface DocumentData {
  id: string;
  fileName: string;
  type: 'pdf' | 'doc' | 'docx' | 'txt' | 'pptx';
  status: 'processing' | 'ready' | 'failed';
  pages: number;
  uploadDate: string;
  size: string;
}

export interface ActivityData {
  id: string;
  type: 'upload' | 'workspace' | 'chat' | 'summary' | 'compare';
  title: string;
  description: string;
  timeStamp: string;
  icon: string;
}

export interface DashboardUser {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

export interface DashboardStats {
  totalWorkspaces: number;
  totalDocuments: number;
  readyDocuments: number;
  totalChats: number;
}
