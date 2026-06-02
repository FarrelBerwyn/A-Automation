// src/App.tsx
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { AppRouter } from './router';
import { ToastContainer } from './components/atoms/Toast';

function App() {
  const [time, setTime] = useState('');
  const location = useLocation();

  // Run a real-time digital clock matching classic macOS style
  useEffect(() => {
    const updateTime = () => {
      const date = new Date();
      const hours = String(date.getHours()).padStart(2, '0');
      const minutes = String(date.getMinutes()).padStart(2, '0');
      const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
      const day = dayNames[date.getDay()];
      setTime(`${day} ${hours}:${minutes}`);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const isAdminRoute = location.pathname.startsWith('/admin');

  return (
    <>
      {/* Macintosh 1984 Classic Global Desktop Top Menu Bar - hidden on admin dashboard for clean professional styling */}
      {!isAdminRoute && (
        <div className="mac-top-bar">
          <div className="mac-top-bar-left">
            <span className="mac-top-bar-item mac-top-bar-apple"></span>
            <span className="mac-top-bar-item">File</span>
            <span className="mac-top-bar-item">Edit</span>
            <span className="mac-top-bar-item">View</span>
            <span className="mac-top-bar-item">Special</span>
          </div>
          <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
            <span style={{ fontSize: '9px', fontFamily: 'var(--ff-mono)', color: 'var(--clr-cement)', letterSpacing: '0.05em' }}>
              A AUTOMATION OS v1.0
            </span>
            <span className="mac-top-bar-item font-mono">{time}</span>
          </div>
        </div>
      )}

      {/* Dynamic SPA Routing Viewports */}
      <AppRouter />
      
      {/* Snappy Monokrom Toast Notifications Alerts Queue */}
      <ToastContainer />
    </>
  );
}

export default App;
