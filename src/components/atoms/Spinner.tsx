// src/components/atoms/Spinner.tsx
import React from 'react';

interface SpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const Spinner: React.FC<SpinnerProps> = ({ size = 'md', className = '' }) => {
  const getDimensions = () => {
    switch (size) {
      case 'sm':
        return 'w-4 h-4 border-2';
      case 'lg':
        return 'w-8 h-8 border-3';
      case 'md':
      default:
        return 'w-6 h-6 border-2';
    }
  };

  return (
    <div
      style={{
        display: 'inline-block',
        borderStyle: 'solid',
        borderRadius: '50%',
        borderColor: 'currentColor transparent transparent transparent',
        animation: 'spin 0.6s linear infinite',
      }}
      className={`${getDimensions()} ${className}`}
    >
      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        .w-4 { width: 14px; height: 14px; }
        .w-6 { width: 20px; height: 20px; }
        .w-8 { width: 32px; height: 32px; }
        .h-4 { height: 14px; }
        .h-6 { height: 20px; }
        .h-8 { height: 32px; }
        .border-2 { border-width: 2px; }
        .border-3 { border-width: 3px; }
      `}</style>
    </div>
  );
};
