// src/components/atoms/Toast.tsx
import React from 'react';
import { useToastStore } from '../../store/toastStore';
import type { Toast as ToastType } from '../../store/toastStore';

interface ToastProps {
  toast: ToastType;
}

export const Toast: React.FC<ToastProps> = ({ toast }) => {
  const removeToast = useToastStore((state) => state.removeToast);

  const getStyles = () => {
    switch (toast.type) {
      case 'success':
        return {
          borderColor: 'var(--clr-green)',
          backgroundColor: 'var(--clr-cream)',
          color: 'var(--clr-black)',
        };
      case 'error':
        return {
          borderColor: 'var(--clr-red)',
          backgroundColor: 'var(--clr-cream)',
          color: 'var(--clr-black)',
        };
      case 'info':
      default:
        return {
          borderColor: 'var(--clr-border)',
          backgroundColor: 'var(--clr-cream)',
          color: 'var(--clr-black)',
        };
    }
  };

  const getIcon = () => {
    switch (toast.type) {
      case 'success':
        return '✓';
      case 'error':
        return '✕';
      case 'info':
      default:
        return 'ℹ';
    }
  };

  return (
    <div
      style={{
        ...getStyles(),
        borderWidth: '1px',
        borderStyle: 'solid',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '12px 16px',
        width: '100%',
        boxShadow: '4px 4px 0px rgba(0, 0, 0, 0.08)',
        animation: 'slideIn 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
      }}
      className="retro-border-t"
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <span
          style={{
            fontFamily: 'var(--ff-mono)',
            fontSize: '14px',
            fontWeight: 'bold',
            color: toast.type === 'success' ? 'var(--clr-green)' : toast.type === 'error' ? 'var(--clr-red)' : 'var(--clr-cement)',
          }}
        >
          [{getIcon()}]
        </span>
        <span style={{ fontSize: '13px', fontFamily: 'var(--ff-body)', fontWeight: 500 }}>{toast.message}</span>
      </div>
      <button
        onClick={() => removeToast(toast.id)}
        style={{
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          fontFamily: 'var(--ff-mono)',
          fontSize: '14px',
          color: 'var(--clr-cement)',
          paddingLeft: '12px',
        }}
      >
        [✕]
      </button>

      <style>{`
        @keyframes slideIn {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
};

// Global Toast Container Component
export const ToastContainer: React.FC = () => {
  const toasts = useToastStore((state) => state.toasts);

  if (toasts.length === 0) return null;

  return (
    <div className="retro-toast-container">
      {toasts.map((toast) => (
        <Toast key={toast.id} toast={toast} />
      ))}
    </div>
  );
};
