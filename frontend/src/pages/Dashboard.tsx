/**
 * Dashboard page
 */

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { AppLayout } from '../layouts';
import { Card, PageContainer, Button } from '../components/common';
import { useAuth } from '../hooks';

export const DashboardPage: React.FC = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  return (
    <AppLayout>
      <PageContainer>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="md:col-span-2">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              Welcome, {user?.name}! 👋
            </h1>
            <p className="text-lg text-gray-600">
              Your documents are ready to manage and organize.
            </p>
          </Card>

          <Card variant="elevated">
            <div className="text-center">
              <div className="text-sm text-gray-600 mb-4">Logged in as</div>
              <div className="font-semibold text-gray-900">{user?.email}</div>
              <Button
                variant="danger"
                size="sm"
                onClick={logout}
                className="w-full mt-4"
              >
                Logout
              </Button>
            </div>
          </Card>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              📄 Documents
            </h3>
            <p className="text-gray-600 mb-4">Manage your document collection</p>
            <Button
              variant="primary"
              size="sm"
              onClick={() => navigate('/documents')}
              className="w-full"
            >
              View Documents
            </Button>
          </Card>

          <Card>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              ⚙️ Settings
            </h3>
            <p className="text-gray-600 mb-4">Manage your account settings</p>
            <Button
              variant="primary"
              size="sm"
              onClick={() => navigate('/profile')}
              className="w-full"
            >
              Go to Settings
            </Button>
          </Card>

          <Card>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              📖 Help
            </h3>
            <p className="text-gray-600 mb-4">Learn more about DocuMind AI</p>
            <Button variant="ghost" size="sm" className="w-full">
              Learn More
            </Button>
          </Card>
        </div>
      </PageContainer>
    </AppLayout>
  );
};
