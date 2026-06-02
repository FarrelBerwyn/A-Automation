// src/components/atoms/Button.tsx
import React from 'react';
import { Spinner } from './Spinner';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'ghost',
  size = 'md',
  loading = false,
  disabled,
  className = '',
  ...props
}) => {
  const getVariantClass = () => {
    switch (variant) {
      case 'primary':
        return 'retro-btn-primary';
      case 'danger':
        return 'retro-btn-danger';
      case 'ghost':
      default:
        return 'retro-btn-ghost';
    }
  };

  const getSizeClass = () => {
    switch (size) {
      case 'sm':
        return 'text-micro' + ' py-1 px-3';
      case 'lg':
        return 'text-body-lg' + ' py-3 px-8';
      case 'md':
      default:
        return 'text-body' + ' py-2 px-5';
    }
  };

  return (
    <button
      className={`retro-btn ${getVariantClass()} ${getSizeClass()} ${className}`}
      disabled={disabled || loading}
      {...props}
    >
      {loading && <Spinner size="sm" />}
      {children}
    </button>
  );
};
