// src/components/atoms/Modal.tsx
import React, { useEffect } from 'react';

interface ModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
}

export const Modal: React.FC<ModalProps> = ({
  open,
  onClose,
  title,
  children,
  footer,
}) => {
  // Prevent scrolling behind modal
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [open]);

  if (!open) return null;

  return (
    <div
      style={{
        position: 'fixed',
        top: 0, left: 0, right: 0, bottom: 0,
        backgroundColor: 'rgba(13, 13, 11, 0.4)',
        backdropFilter: 'blur(4px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 9990,
      }}
      onClick={onClose}
    >
      <div
        style={{
          backgroundColor: 'var(--clr-cream)',
          border: '2px solid var(--clr-black)',
          maxWidth: '500px',
          width: '90%',
          boxShadow: '8px 8px 0px var(--clr-black)',
          animation: 'modalReveal 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Macintosh Title Bar */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '8px 12px',
            borderBottom: '2px solid var(--clr-black)',
            backgroundColor: 'var(--clr-cream-dk)',
          }}
        >
          {/* Close box square button */}
          <button
            onClick={onClose}
            style={{
              width: '16px',
              height: '16px',
              border: '1px solid var(--clr-black)',
              background: 'transparent',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontFamily: 'var(--ff-mono)',
              fontSize: '8px',
              fontWeight: 'bold',
            }}
          >
            ☐
          </button>
          
          {/* Decorative Macintosh lines */}
          <div style={{ flexGrow: 1, margin: '0 16px', display: 'flex', flexDirection: 'column', gap: '2px' }}>
            <div style={{ height: '1px', backgroundColor: 'var(--clr-black)' }}></div>
            <div style={{ height: '1px', backgroundColor: 'var(--clr-black)' }}></div>
            <div style={{ height: '1px', backgroundColor: 'var(--clr-black)' }}></div>
            <div style={{ height: '1px', backgroundColor: 'var(--clr-black)' }}></div>
          </div>

          <span
            style={{
              fontFamily: 'var(--ff-mono)',
              fontSize: '11px',
              fontWeight: 'bold',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              color: 'var(--clr-black)',
            }}
          >
            {title}
          </span>

          <div style={{ flexGrow: 1, margin: '0 16px', display: 'flex', flexDirection: 'column', gap: '2px' }}>
            <div style={{ height: '1px', backgroundColor: 'var(--clr-black)' }}></div>
            <div style={{ height: '1px', backgroundColor: 'var(--clr-black)' }}></div>
            <div style={{ height: '1px', backgroundColor: 'var(--clr-black)' }}></div>
            <div style={{ height: '1px', backgroundColor: 'var(--clr-black)' }}></div>
          </div>

          {/* Spacer */}
          <div style={{ width: '16px' }} />
        </div>

        {/* Content */}
        <div style={{ padding: '24px 20px', color: 'var(--clr-charcoal)' }}>
          {children}
        </div>

        {/* Footer actions */}
        {footer && (
          <div
            style={{
              display: 'flex',
              justifyContent: 'flex-end',
              gap: '12px',
              padding: '16px 20px',
              borderTop: '1px solid var(--clr-border)',
              backgroundColor: 'var(--clr-cream-dk)',
            }}
          >
            {footer}
          </div>
        )}
      </div>

      <style>{`
        @keyframes modalReveal {
          from {
            transform: scale(0.96);
            opacity: 0;
          }
          to {
            transform: scale(1);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
};
