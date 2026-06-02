// src/components/organisms/admin/AdminHeader.tsx
import React from 'react';
import { useAuthStore } from '../../../store/authStore';

interface AdminHeaderProps {
  title: string;
}

export const AdminHeader: React.FC<AdminHeaderProps> = ({ title }) => {
  const admin = useAuthStore((state) => state.admin);

  return (
    <header
      style={{
        height: '65px',
        backgroundColor: 'var(--clr-cream-dk)',
        borderBottom: '1px solid var(--clr-border)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 24px',
        position: 'sticky',
        top: 0,
        zIndex: 90,
      }}
    >
      {/* Title with retro typography */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        <h1
          style={{
            fontFamily: 'var(--ff-mono)',
            fontSize: '16px',
            fontWeight: 'bold',
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
            margin: 0,
            color: 'var(--clr-black)',
          }}
        >
          {title}
        </h1>
      </div>

      {/* Decorative center stripes */}
      <div style={{ flexGrow: 1, margin: '0 32px', display: 'none', flexDirection: 'column', gap: '2px' }} className="md:flex">
        <div style={{ height: '1px', backgroundColor: 'var(--clr-border)' }}></div>
        <div style={{ height: '1px', backgroundColor: 'var(--clr-border)' }}></div>
        <div style={{ height: '1px', backgroundColor: 'var(--clr-border)' }}></div>
      </div>

      {/* Right User account badge */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <div
          style={{
            width: '8px',
            height: '8px',
            borderRadius: '50%',
            backgroundColor: 'var(--clr-green)',
          }}
          title="Sesi Aktif"
        />
        <div style={{ display: 'flex', flexDirection: 'column', textAlign: 'right' }}>
          <span style={{ fontSize: '12px', fontWeight: 500, color: 'var(--clr-black)' }}>
            {admin?.name || 'Admin'}
          </span>
          <span className="text-micro text-muted">
            {admin?.email}
          </span>
        </div>
      </div>

      <style>{`
        .md\\:flex {
          display: none;
        }
        @media (min-width: 768px) {
          .md\\:flex {
            display: flex;
          }
        }
      `}</style>
    </header>
  );
};
