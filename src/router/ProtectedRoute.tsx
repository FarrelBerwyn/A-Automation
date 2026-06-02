// src/router/ProtectedRoute.tsx
import React, { useEffect } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { AdminSidebar } from '../components/organisms/admin/AdminSidebar';
import { Spinner } from '../components/atoms/Spinner';

export const ProtectedRoute: React.FC = () => {
  const { isAuthenticated, isLoading, checkAuth, login } = useAuthStore();
  const useMockAPI = import.meta.env.VITE_USE_MOCK_API !== 'false';

  useEffect(() => {
    checkAuth();
    
    // Auto-login for demo mode (when using mock API)
    if (useMockAPI && !isAuthenticated) {
      const demoAdmin = { id: 'admin-1', email: 'admin@a-automation.id', name: 'Macintosh Admin' };
      const demoToken = 'mock-jwt-token-1984';
      login(demoAdmin, demoToken);
    }
  }, [checkAuth, login, useMockAPI, isAuthenticated]);

  // Apply dark theme class to body when entering admin views
  useEffect(() => {
    if (isAuthenticated && !isLoading) {
      document.body.classList.add('dark-theme');
    }
    return () => {
      document.body.classList.remove('dark-theme');
    };
  }, [isAuthenticated, isLoading]);

  if (isLoading) {
    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100vh',
          backgroundColor: 'var(--clr-cream)',
          gap: '16px',
        }}
      >
        <Spinner size="lg" />
        <span style={{ fontFamily: 'var(--ff-mono)', fontSize: '11px', textTransform: 'uppercase' }}>
          Verifikasi Sesi...
        </span>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace />;
  }

  return (
    <div
      style={{
        display: 'flex',
        minHeight: '100vh',
        backgroundColor: 'var(--clr-cream)', // Switches to Surface Base #111110 under dark-theme class
        color: 'var(--clr-charcoal)',       // Switches to Off-White #F0EBE2
      }}
    >
      {/* Sidebar Nav */}
      <AdminSidebar />

      {/* Main Administrative viewport grid */}
      <div
        style={{
          flexGrow: 1,
          paddingLeft: '240px',
          display: 'flex',
          flexDirection: 'column',
          minWidth: 0, // Prevents flex contents layout overflows
        }}
      >
        <Outlet />
      </div>
    </div>
  );
};
export default ProtectedRoute;
