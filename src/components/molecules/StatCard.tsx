// src/components/molecules/StatCard.tsx
import React from 'react';

interface StatCardProps {
  value: string | number;
  label: string;
  trend?: string;
  className?: string;
}

export const StatCard: React.FC<StatCardProps> = ({
  value,
  label,
  trend,
  className = '',
}) => {
  return (
    <div
      style={{
        backgroundColor: 'var(--clr-cream-dk)',
        border: '1px solid var(--clr-border)',
        padding: '24px 20px',
        display: 'flex',
        flexDirection: 'column',
        gap: '8px',
        transition: 'transform var(--transition-fast)',
      }}
      className={`select-none ${className}`}
    >
      <span className="text-label text-muted">{label}</span>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
        <span
          style={{
            fontFamily: 'var(--ff-mono)',
            fontSize: '32px',
            fontWeight: 'bold',
            color: 'var(--clr-black)',
            lineHeight: 1,
          }}
        >
          {value}
        </span>
        {trend && (
          <span
            className="text-micro"
            style={{
              color: trend.startsWith('+') ? 'var(--clr-green)' : 'var(--clr-red)',
            }}
          >
            {trend}
          </span>
        )}
      </div>
    </div>
  );
};
