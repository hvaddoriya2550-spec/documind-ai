/**
 * DocumentTable Component
 * Premium table for displaying documents with Lucide icons
 */

import React from 'react';
import type { DocumentData } from '../../types/dashboard';
import { FileText, FileJson, File } from 'lucide-react';
import { DASHBOARD_STYLES } from '../../styles/dashboardStyles';
import THEME from '../../styles/theme';

interface DocumentTableProps {
  documents: DocumentData[];
  onViewDocument?: (docId: string) => void;
}

const getStatusColor = (status: string): string => {
  const statusMap: Record<string, string> = {
    ready: THEME.colors.success,
    processing: THEME.colors.warning,
    failed: THEME.colors.error,
  };
  return statusMap[status] || THEME.colors.gray500;
};

const getTypeIcon = (type: string): React.ReactNode => {
  const typeMap: Record<string, React.ReactNode> = {
    pdf: <FileText size={18} />,
    doc: <FileText size={18} />,
    docx: <FileText size={18} />,
    txt: <FileJson size={18} />,
    pptx: <File size={18} />,
  };
  return typeMap[type] || <FileText size={18} />;
};

export const DocumentTable: React.FC<DocumentTableProps> = ({ documents, onViewDocument }) => {
  return (
    <div style={DASHBOARD_STYLES.documentTableStyles()}>
      {/* Table Header */}
      <div style={DASHBOARD_STYLES.tableHeaderStyles()}>
        <div>File Name</div>
        <div>Type</div>
        <div>Status</div>
        <div>Pages</div>
        <div>Upload Date</div>
        <div>Size</div>
      </div>

      {/* Table Rows */}
      {documents.map((doc) => (
        <div
          key={doc.id}
          style={DASHBOARD_STYLES.tableRowStyles()}
          onClick={() => onViewDocument?.(doc.id)}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = THEME.colors.gray50;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'transparent';
          }}
        >
          {/* File Name */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              color: THEME.colors.gray900,
              fontWeight: 600,
              cursor: 'pointer',
            }}
          >
            <span style={{ display: 'flex', alignItems: 'center', color: THEME.colors.gray400 }}>
              {getTypeIcon(doc.type)}
            </span>
            {doc.fileName}
          </div>

          {/* Type */}
          <div style={{ color: THEME.colors.gray600 }}>{doc.type.toUpperCase()}</div>

          {/* Status */}
          <div
            style={DASHBOARD_STYLES.badgeStyles(getStatusColor(doc.status))}
          >
            {doc.status.charAt(0).toUpperCase() + doc.status.slice(1)}
          </div>

          {/* Pages */}
          <div style={{ color: THEME.colors.gray600 }}>{doc.pages} pages</div>

          {/* Upload Date */}
          <div style={{ color: THEME.colors.gray600 }}>{doc.uploadDate}</div>

          {/* Size */}
          <div style={{ color: THEME.colors.gray600 }}>{doc.size}</div>
        </div>
      ))}
    </div>
  );
};
