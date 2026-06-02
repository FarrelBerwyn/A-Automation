// src/components/molecules/ServiceCard.tsx
import React from 'react';
import { Badge } from '../atoms/Badge';

interface ServiceCardProps {
  number: string;
  icon: React.ReactNode;
  title: string;
  description: string;
  tags: string[];
  linkText?: string;
  onActionClick?: () => void;
}

export const ServiceCard: React.FC<ServiceCardProps> = ({
  number,
  icon,
  title,
  description,
  tags,
  linkText = 'Pelajari lebih lanjut →',
  onActionClick,
}) => {
  return (
    <div
      style={{
        border: '1px solid var(--clr-border)',
        padding: '32px 28px',
        backgroundColor: 'var(--clr-cream)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        height: '100%',
        position: 'relative',
        transition: 'border-color var(--transition-fast)',
      }}
      className="group"
    >
      <div>
        {/* Upper metadata row */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
          <span className="text-label text-muted" style={{ fontSize: '12px' }}>
            [{number}]
          </span>
          <div
            style={{
              width: '36px',
              height: '36px',
              border: '1px solid var(--clr-border)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: 'var(--clr-cream-dk)',
            }}
          >
            {icon}
          </div>
        </div>

        {/* Title */}
        <h3
          className="text-h3"
          style={{
            fontSize: '24px',
            marginBottom: '16px',
            color: 'var(--clr-black)',
          }}
        >
          {title}
        </h3>

        {/* Description */}
        <p
          className="text-body"
          style={{
            color: 'var(--clr-cement)',
            marginBottom: '24px',
            lineHeight: 1.6,
          }}
        >
          {description}
        </p>
      </div>

      {/* Footer Tags & Actions */}
      <div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '24px' }}>
          {tags.map((tag) => (
            <Badge key={tag} variant="neutral">
              {tag}
            </Badge>
          ))}
        </div>

        <button
          onClick={onActionClick}
          style={{
            background: 'none',
            border: 'none',
            fontFamily: 'var(--ff-mono)',
            fontSize: '12px',
            fontWeight: 'bold',
            color: 'var(--clr-charcoal)',
            cursor: 'pointer',
            padding: 0,
            display: 'inline-flex',
            alignItems: 'center',
            gap: '4px',
          }}
        >
          <span style={{ borderBottom: '1px solid transparent', transition: 'border-color var(--transition-fast)' }} className="group-hover:border-current">
            {linkText}
          </span>
        </button>
      </div>
    </div>
  );
};
