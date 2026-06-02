// src/components/molecules/MacintoshMonitor.tsx
import React, { useState, useEffect } from 'react';

export const MacintoshMonitor: React.FC = () => {
  const [activeLine, setActiveLine] = useState(0);
  const [progressWidths, setProgressWidths] = useState([20, 40, 15, 60]);

  // Terminal log animation steps
  const logs = [
    'AUTOMATION FLOW v1.0',
    '■ INIT SYSTEM SUITE...',
    '■ TASK SCHEDULER ACTIVE',
    '■ PIPELINE: 4/4 COMPLETE',
    '■ AGENT CORE ENGAGED',
    'READY'
  ];

  useEffect(() => {
    // Cycle terminal line entries
    const logInterval = setInterval(() => {
      setActiveLine((prev) => (prev < logs.length - 1 ? prev + 1 : 0));
    }, 2500);

    // Randomize progress bar updates to feel "alive"
    const progressInterval = setInterval(() => {
      setProgressWidths([
        Math.floor(Math.random() * 60) + 20,
        Math.floor(Math.random() * 50) + 30,
        Math.floor(Math.random() * 70) + 15,
        Math.floor(Math.random() * 40) + 50,
      ]);
    }, 1500);

    return () => {
      clearInterval(logInterval);
      clearInterval(progressInterval);
    };
  }, []);

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '260px',
        margin: '0 auto',
        userSelect: 'none',
      }}
    >
      {/* Monitor Main Body */}
      <div
        style={{
          width: '240px',
          height: '200px',
          backgroundColor: 'var(--clr-cream-dk)',
          border: '2px solid var(--clr-border)',
          borderRadius: '12px 12px 6px 6px',
          padding: '16px 14px 12px 14px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          position: 'relative',
          boxShadow: '4px 4px 0px rgba(0, 0, 0, 0.05)',
        }}
      >
        {/* CRT Bezel / Screen Housing */}
        <div
          style={{
            flexGrow: 1,
            backgroundColor: '#0a0a09',
            border: '3px solid #c4baa9',
            borderRadius: '6px',
            padding: '10px 8px',
            position: 'relative',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}
          className="scanline-effect"
        >
          {/* Glass glare effect overlay */}
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: '50%',
              background: 'linear-gradient(rgba(255,255,255,0.06), rgba(255,255,255,0))',
              transform: 'skewY(-15deg)',
              transformOrigin: 'top left',
              pointerEvents: 'none',
            }}
          />

          {/* Dynamic Phosphor Screen Content */}
          <div
            style={{
              color: 'var(--clr-green)',
              fontFamily: 'var(--ff-mono)',
              fontSize: '8px',
              lineHeight: '1.4',
              display: 'flex',
              flexDirection: 'column',
              gap: '6px',
            }}
          >
            {/* Display header */}
            <div style={{ borderBottom: '1px solid rgba(74, 154, 111, 0.3)', paddingBottom: '2px', fontWeight: 'bold', display: 'flex', justifyContent: 'space-between' }}>
              <span>{logs[0]}</span>
              <span className="cursor-blink">●</span>
            </div>

            {/* Phosphor Progress Bars */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
              {progressWidths.map((w, idx) => (
                <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <span>P0{idx + 1}</span>
                  <div style={{ flexGrow: 1, height: '4px', border: '1px solid rgba(74, 154, 111, 0.4)', padding: '1px' }}>
                    <div style={{ height: '100%', width: `${w}%`, backgroundColor: 'var(--clr-green)', transition: 'width 0.8s ease-in-out' }} />
                  </div>
                </div>
              ))}
            </div>

            {/* Terminal output statements */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2px', marginTop: '2px' }}>
              {logs.slice(1, activeLine + 1).map((log, idx) => (
                <div key={idx} style={{ color: log.startsWith('READY') ? '#ffffff' : 'var(--clr-green)' }}>
                  {log}
                </div>
              ))}
            </div>
          </div>

          {/* Terminal Input Prompt */}
          <div
            style={{
              fontFamily: 'var(--ff-mono)',
              fontSize: '9px',
              color: '#ffffff',
              display: 'flex',
              alignItems: 'center',
              gap: '2px',
            }}
          >
            <span>&gt; READY</span>
            <span
              style={{
                width: '5px',
                height: '8px',
                backgroundColor: '#ffffff',
              }}
              className="cursor-blink"
            />
          </div>
        </div>

        {/* Lower Bezel Details (Floppy disk slot, ventilation slot) */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '10px' }}>
          {/* Brand/Logo mark placeholder */}
          <span style={{ fontSize: '9px', fontFamily: 'var(--ff-mono)', fontWeight: 'bold', color: 'var(--clr-cement)' }}>
            A∞
          </span>

          {/* Horizontal slot representing floppy disk input */}
          <div
            style={{
              width: '50px',
              height: '3px',
              backgroundColor: 'var(--clr-border)',
              borderRadius: '1px',
              boxShadow: 'inset 0 1px 1px rgba(0,0,0,0.2)',
            }}
          />
        </div>
      </div>

      {/* Trapezoidal Monitor Neck Stand */}
      <div
        style={{
          width: '60px',
          height: '24px',
          backgroundColor: '#e3d9c7',
          borderLeft: '2px solid var(--clr-border)',
          borderRight: '2px solid var(--clr-border)',
          clipPath: 'polygon(15% 0%, 85% 0%, 100% 100%, 0% 100%)',
          marginTop: '-1px',
        }}
      />

      {/* Flat Desktop Stand Base */}
      <div
        style={{
          width: '120px',
          height: '8px',
          backgroundColor: 'var(--clr-cream-dk)',
          border: '2px solid var(--clr-border)',
          borderRadius: '2px',
          boxShadow: '1px 1px 0px rgba(0,0,0,0.05)',
        }}
      />
    </div>
  );
};
