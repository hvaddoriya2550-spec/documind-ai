/**
 * App layout - for authenticated pages
 * Displays with navigation header and sidebar
 */

import React from 'react';

interface AppLayoutProps {
  children: React.ReactNode;
}

export const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="text-2xl font-bold text-indigo-600">DocuMind AI</div>
          <nav className="flex gap-4">
            <a href="/dashboard" className="text-gray-700 hover:text-indigo-600">
              Dashboard
            </a>
            <a href="/documents" className="text-gray-700 hover:text-indigo-600">
              Documents
            </a>
            <a href="/profile" className="text-gray-700 hover:text-indigo-600">
              Profile
            </a>
          </nav>
        </div>
      </header>

      {/* Main content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>
    </div>
  );
};
