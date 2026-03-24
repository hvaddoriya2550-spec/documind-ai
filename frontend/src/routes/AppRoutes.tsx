/**
 * App routes configuration
 */

import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { LoginPage, SignupPage } from '../pages/auth';
import { ROUTES } from '../constants';
import { ProtectedRoute } from './ProtectedRoute';

// Lazy-loaded pages for better performance
const DashboardPage = React.lazy(() =>
  import('../pages/Dashboard').then((m) => ({ default: m.DashboardPage }))
);

export const AppRoutes: React.FC = () => {
  return (
    <Routes>
      {/* Public routes */}
      <Route path={ROUTES.HOME} element={<Navigate to={ROUTES.DASHBOARD} replace />} />
      <Route path={ROUTES.LOGIN} element={<LoginPage />} />
      <Route path={ROUTES.SIGNUP} element={<SignupPage />} />

      {/* Protected routes */}
      <Route
        path={ROUTES.DASHBOARD}
        element={
          <ProtectedRoute>
            <React.Suspense fallback={<div>Loading...</div>}>
              <DashboardPage />
            </React.Suspense>
          </ProtectedRoute>
        }
      />

      {/* Catch-all */}
      <Route path="*" element={<Navigate to={ROUTES.DASHBOARD} replace />} />
    </Routes>
  );
};
