// src/router/index.tsx
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { ProtectedRoute } from './ProtectedRoute';

// Lazy load page views for code splitting performance
import { LandingPage } from '../pages/LandingPage';
import { LoginPage } from '../pages/admin/LoginPage';
import { DashboardPage } from '../pages/admin/DashboardPage';
import { LeadsPage } from '../pages/admin/LeadsPage';
import { LeadDetailPage } from '../pages/admin/LeadDetailPage';
import { SettingsPage } from '../pages/admin/SettingsPage';

export const AppRouter: React.FC = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<LandingPage />} />
      <Route path="/admin/login" element={<LoginPage />} />

      {/* Protected Admin Routes */}
      <Route path="/admin" element={<ProtectedRoute />}>
        <Route index element={<Navigate to="/admin/dashboard" replace />} />
        <Route path="dashboard" element={<DashboardPage />} />
        <Route path="leads" element={<LeadsPage />} />
        <Route path="leads/:id" element={<LeadDetailPage />} />
        <Route path="settings" element={<SettingsPage />} />
      </Route>

      {/* Wildcard Fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};
export default AppRouter;
