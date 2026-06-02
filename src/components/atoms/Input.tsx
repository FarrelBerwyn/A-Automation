// src/components/atoms/Input.tsx
import React, { forwardRef } from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  hint?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, hint, required, className = '', id, ...props }, ref) => {
    const inputId = id || `input-${Math.random().toString(36).substring(2, 9)}`;

    return (
      <div className="retro-input-group">
        {label && (
          <label htmlFor={inputId} className="retro-label">
            {label} {required && <span style={{ color: 'var(--clr-red)' }}>*</span>}
          </label>
        )}
        <input
          ref={ref}
          id={inputId}
          className={`retro-input ${className}`}
          style={error ? { borderBottomColor: 'var(--clr-red)' } : undefined}
          required={required}
          {...props}
        />
        {hint && !error && <span className="text-micro text-muted mt-1">{hint}</span>}
        {error && <span className="retro-error">{error}</span>}
      </div>
    );
  }
);

Input.displayName = 'Input';
