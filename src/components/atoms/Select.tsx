// src/components/atoms/Select.tsx
import React, { forwardRef } from 'react';

interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  options: SelectOption[];
  error?: string;
  hint?: string;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, options, error, hint, required, className = '', id, children, ...props }, ref) => {
    const selectId = id || `select-${Math.random().toString(36).substring(2, 9)}`;

    return (
      <div className="retro-input-group">
        {label && (
          <label htmlFor={selectId} className="retro-label">
            {label} {required && <span style={{ color: 'var(--clr-red)' }}>*</span>}
          </label>
        )}
        <div style={{ position: 'relative' }}>
          <select
            ref={ref}
            id={selectId}
            className={`retro-select ${className}`}
            style={{
              appearance: 'none',
              paddingRight: '24px',
              borderBottomColor: error ? 'var(--clr-red)' : undefined,
              cursor: 'pointer',
            }}
            required={required}
            {...props}
          >
            {children || (
              <>
                <option value="">-- Pilih --</option>
                {options.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </>
            )}
          </select>
          <div
            style={{
              position: 'absolute',
              right: '4px',
              top: '50%',
              transform: 'translateY(-50%)',
              pointerEvents: 'none',
              fontFamily: 'var(--ff-mono)',
              fontSize: '10px',
              color: 'var(--clr-cement)',
            }}
          >
            ▼
          </div>
        </div>
        {hint && !error && <span className="text-micro text-muted mt-1">{hint}</span>}
        {error && <span className="retro-error">{error}</span>}
      </div>
    );
  }
);

Select.displayName = 'Select';
