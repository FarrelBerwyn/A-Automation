// src/components/organisms/admin/AdminSidebar.tsx
import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../../store/authStore';
import { useToastStore } from '../../../store/toastStore';
import { api } from '../../../lib/api';
import { LayoutDashboard, Users, Settings, LogOut } from 'lucide-react';

export const AdminSidebar: React.FC = () => {
  const logout = useAuthStore((state) => state.logout);
  const addToast = useToastStore((state) => state.addToast);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await api.logout();
      logout();
      addToast('Berhasil keluar dari admin portal', 'success');
      navigate('/admin/login');
    } catch (e) {
      addToast('Gagal melakukan logout', 'error');
    }
  };

  const navItemStyle = (isActive: boolean) => ({
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    padding: '12px 16px',
    fontSize: '13px',
    fontFamily: 'var(--ff-body)',
    fontWeight: 500,
    color: isActive ? 'var(--clr-black)' : 'var(--clr-cement)',
    backgroundColor: isActive ? 'var(--clr-cement-lt)' : 'transparent',
    borderLeft: isActive ? '3px solid var(--clr-green)' : '3px solid transparent',
    textDecoration: 'none',
    transition: 'all var(--transition-fast)',
  });

  return (
    <div
      style={{
        width: '240px',
        height: '100vh',
        backgroundColor: 'var(--clr-cream-dk)',
        borderRight: '1px solid var(--clr-border)',
        display: 'flex',
        flexDirection: 'column',
        position: 'fixed',
        left: 0,
        top: 0,
        zIndex: 100,
      }}
    >
      {/* Sidebar Header: Logo Area */}
      <div
        style={{
          padding: '24px 20px',
          borderBottom: '1px solid var(--clr-border)',
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
        }}
      >
        <span
          style={{
            fontFamily: 'var(--ff-mono)',
            fontSize: '16px',
            fontWeight: 'bold',
            border: '1px solid var(--clr-border)',
            width: '28px',
            height: '28px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'var(--clr-cream)',
            color: 'var(--clr-black)',
          }}
        >
          A∞
        </span>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <span style={{ fontSize: '13px', fontWeight: 'bold', color: 'var(--clr-black)' }}>
            A Automation
          </span>
          <span className="text-micro text-muted">
            ADMIN PORTAL
          </span>
        </div>
      </div>

      {/* Decorative Macintosh lines */}
      <div style={{ padding: '0 16px', marginTop: '16px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
          <div style={{ height: '1px', backgroundColor: 'var(--clr-border)' }}></div>
          <div style={{ height: '1px', backgroundColor: 'var(--clr-border)' }}></div>
          <div style={{ height: '1px', backgroundColor: 'var(--clr-border)' }}></div>
        </div>
      </div>

      {/* Navigation Links Group */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', marginTop: '24px', flexGrow: 1 }}>
        <NavLink
          to="/admin/dashboard"
          style={({ isActive }) => navItemStyle(isActive)}
          className="hover:bg-[var(--clr-cement-lt)]"
        >
          <LayoutDashboard size={16} />
          <span>Dashboard</span>
        </NavLink>

        <NavLink
          to="/admin/leads"
          style={({ isActive }) => navItemStyle(isActive)}
          className="hover:bg-[var(--clr-cement-lt)]"
        >
          <Users size={16} />
          <span>Leads masuk</span>
        </NavLink>

        <NavLink
          to="/admin/settings"
          style={({ isActive }) => navItemStyle(isActive)}
          className="hover:bg-[var(--clr-cement-lt)]"
        >
          <Settings size={16} />
          <span>Pengaturan</span>
        </NavLink>
      </div>

      {/* Bottom Row: Logout button */}
      <div style={{ borderTop: '1px solid var(--clr-border)', padding: '16px' }}>
        <button
          onClick={handleLogout}
          style={{
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            padding: '12px 16px',
            backgroundColor: 'transparent',
            border: '1px solid var(--clr-red)',
            color: 'var(--clr-red)',
            cursor: 'pointer',
            fontSize: '13px',
            fontWeight: 500,
            transition: 'all var(--transition-fast)',
          }}
          className="hover:bg-[var(--clr-red)] hover:text-white"
        >
          <LogOut size={16} />
          <span>Keluar Sesi</span>
        </button>
      </div>
    </div>
  );
};
