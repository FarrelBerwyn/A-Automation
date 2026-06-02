// src/pages/admin/LoginPage.tsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';
import { useToastStore } from '../../store/toastStore';
import { api } from '../../lib/api';
import { loginSchema } from '../../lib/schemas';
import type { LoginFormData } from '../../lib/schemas';
import { Input } from '../../components/atoms/Input';
import { Button } from '../../components/atoms/Button';
import { ArrowRight, Lock } from 'lucide-react';

export const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const { login, isAuthenticated, checkAuth } = useAuthStore();
  const addToast = useToastStore((state) => state.addToast);

  const [formData, setFormData] = useState<LoginFormData>({ email: '', password: '' });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);

  // Check session redirect if already authed
  useEffect(() => {
    checkAuth();
    if (isAuthenticated) {
      navigate('/admin/dashboard', { replace: true });
    }
  }, [isAuthenticated, navigate, checkAuth]);

  // Clean CSS dark variables scoping
  useEffect(() => {
    document.body.classList.add('dark-theme');
    return () => {
      document.body.classList.remove('dark-theme');
    };
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => {
        const copy = { ...prev };
        delete copy[name];
        return copy;
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrors({});

    const result = loginSchema.safeParse(formData);
    if (!result.success) {
      const formErrs: Record<string, string> = {};
      result.error.issues.forEach(issue => {
        if (issue.path[0]) {
          formErrs[issue.path[0].toString()] = issue.message;
        }
      });
      setErrors(formErrs);
      setIsLoading(false);
      return;
    }

    try {
      const response = await api.login(result.data);
      if (response.success) {
        login(response.data.admin, response.data.token);
        addToast('Selamat datang kembali, Admin!', 'success');
        navigate('/admin/dashboard', { replace: true });
      }
    } catch (e: any) {
      addToast(e.message || 'Email atau password salah', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        backgroundColor: 'var(--clr-cream)', // Surface Base #111110
        color: 'var(--clr-charcoal)',       // Off-White #F0EBE2
      }}
    >
      {/* Macintosh System Warning Dialog box */}
      <div className="mac-window" style={{ width: '90%', maxWidth: '380px' }}>
        
        {/* Title bar */}
        <div className="mac-window-titlebar">
          <div className="mac-window-close-box" onClick={() => navigate('/')}></div>
          <div className="mac-window-stripes"></div>
          <span className="mac-window-title">SYSTEM_LOCK.SYS</span>
          <div className="mac-window-stripes"></div>
        </div>

        {/* Content Box */}
        <div className="mac-window-content" style={{ padding: '32px 20px' }}>
          
          {/* Brand Header */}
          <div style={{ textAlign: 'center', marginBottom: '24px' }}>
            <span
              style={{
                fontFamily: 'var(--ff-mono)',
                fontSize: '22px',
                fontWeight: 'bold',
                border: '2px solid var(--clr-border)',
                width: '44px',
                height: '44px',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: 'var(--clr-cream)',
                color: 'var(--clr-black)',
                marginBottom: '12px',
              }}
            >
              A∞
            </span>
            <h2
              style={{
                fontFamily: 'var(--ff-mono)',
                fontSize: '14px',
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                color: 'var(--clr-black)',
                margin: 0,
              }}
            >
              A Automation
            </h2>
            <span className="text-micro text-muted" style={{ display: 'block', marginTop: '4px' }}>
              ADMIN PORTAL LOGIN
            </span>
          </div>

          <div style={{ height: '2px', backgroundColor: 'var(--clr-border)', marginBottom: '24px' }} />

          {/* Login Form */}
          <form onSubmit={handleSubmit}>
            <Input
              label="Alamat Email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              error={errors.email}
              placeholder="admin@a-automation.id"
              autoFocus
              required
            />

            <Input
              label="Kata Sandi (Password)"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              error={errors.password}
              placeholder="••••••••"
              required
            />

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: '20px 0' }}>
              <span style={{ fontSize: '10px', color: 'var(--clr-cement)', fontFamily: 'var(--ff-mono)', lineHeight: 1.4 }}>
                MOCK CREDENTIALS:
                <br />
                admin@a-automation.id / password123
              </span>
            </div>

            <Button
              type="submit"
              variant="primary"
              loading={isLoading}
              style={{ width: '100%', gap: '8px' }}
            >
              <Lock size={14} />
              Masuk Portal
              <ArrowRight size={14} />
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};
export default LoginPage;
