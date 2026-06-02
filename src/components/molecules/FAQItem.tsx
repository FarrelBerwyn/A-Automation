// src/components/molecules/FAQItem.tsx
import React, { useState } from 'react';

interface FAQItemProps {
  question: string;
  answer: string;
  defaultOpen?: boolean;
}

export const FAQItem: React.FC<FAQItemProps> = ({
  question,
  answer,
  defaultOpen = false,
}) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div
      style={{
        borderBottom: '1px solid var(--clr-border)',
        padding: '16px 0',
        width: '100%',
      }}
    >
      {/* Clickable Header Area */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{
          width: '100%',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          textAlign: 'left',
          padding: '8px 0',
          fontFamily: 'var(--ff-body)',
          color: 'var(--clr-black)',
          fontSize: '15px',
          fontWeight: 500,
        }}
      >
        <span>{question}</span>
        <span
          style={{
            fontFamily: 'var(--ff-mono)',
            fontSize: '14px',
            color: 'var(--clr-cement)',
            paddingLeft: '16px',
            fontWeight: 'bold',
          }}
        >
          {isOpen ? '−' : '+'}
        </span>
      </button>

      {/* Answer Body with snappiness */}
      <div
        style={{
          maxHeight: isOpen ? '250px' : '0',
          opacity: isOpen ? 1 : 0,
          overflow: 'hidden',
          transition: 'all 250ms cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      >
        <p
          className="text-body"
          style={{
            color: 'var(--clr-cement)',
            paddingTop: '8px',
            paddingBottom: '12px',
            lineHeight: 1.6,
            margin: 0,
          }}
        >
          {answer}
        </p>
      </div>
    </div>
  );
};
