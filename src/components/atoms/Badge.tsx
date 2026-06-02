// src/components/atoms/Badge.tsx
import React from 'react';

interface BadgeProps {
  variant?: 'neutral' | 'amber' | 'green' | 'red';
  size?: 'sm' | 'md';
  children: React.ReactNode;
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'neutral',
  size = 'sm',
  className = '',
}) => {
  const getStyle = () => {
    switch (variant) {
      case 'green':
        return {
          borderColor: 'var(--clr-green)',
          color: 'var(--clr-green)',
          backgroundColor: 'rgba(74, 154, 111, 0.08)',
        };
      case 'amber':
        return {
          borderColor: 'var(--clr-amber)',
          color: 'var(--clr-amber)',
          backgroundColor: 'rgba(201, 146, 58, 0.08)',
        };
      case 'red':
        return {
          borderColor: 'var(--clr-red)',
          color: 'var(--clr-red)',
          backgroundColor: 'rgba(184, 92, 92, 0.08)',
        };
      case 'neutral':
      default:
        return {
          borderColor: 'var(--clr-border)',
          color: 'var(--clr-cement)',
          backgroundColor: 'var(--clr-cream-dk)',
        };
    }
  };

  const getSizeClass = () => {
    return size === 'sm' ? 'py-0.5 px-2 text-[9px]' : 'py-1 px-3 text-[11px]';
  };

  return (
    <span
      className={`text-micro inline-block text-center border font-mono uppercase tracking-[0.08em] select-none rounded-[2px] ${getSizeClass()} ${className}`}
      style={getStyle()}
    >
      {children}
    </span>
  );
};
