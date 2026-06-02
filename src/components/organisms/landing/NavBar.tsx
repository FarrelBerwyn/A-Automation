// src/components/organisms/landing/NavBar.tsx
import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { Button } from '../../atoms/Button';

export const NavBar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);
    const element = document.getElementById(targetId);
    if (element) {
      const offset = 80; // Offset for navbar height
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  const handleCTAClick = () => {
    setIsMobileMenuOpen(false);
    const element = document.getElementById('kontak');
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  return (
    <nav
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 900,
        width: '100%',
        backgroundColor: isScrolled ? 'rgba(245, 240, 232, 0.85)' : 'transparent',
        backdropFilter: isScrolled ? 'blur(12px)' : 'none',
        borderBottom: isScrolled ? '1px solid var(--clr-border)' : '1px solid transparent',
        transition: 'all 0.3s ease',
      }}
      className="py-4"
    >
      <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        {/* Left Side: Brand Logo */}
        <a
          href="#"
          onClick={(e) => handleNavClick(e, 'hero')}
          style={{ display: 'flex', alignItems: 'center', gap: '8px', textDecoration: 'none' }}
        >
          <span
            style={{
              fontFamily: 'var(--ff-mono)',
              fontSize: '20px',
              fontWeight: 'bold',
              border: '1px solid var(--clr-border)',
              width: '32px',
              height: '32px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: 'var(--clr-cream-dk)',
              color: 'var(--clr-black)',
            }}
          >
            A∞
          </span>
          <span
            style={{
              fontFamily: 'var(--ff-body)',
              fontWeight: 700,
              fontSize: '16px',
              letterSpacing: '-0.02em',
              color: 'var(--clr-black)',
            }}
          >
            A Automation
          </span>
        </a>

        {/* Center Side: Link Navigation (Desktop) */}
        <div style={{ display: 'none', gap: '28px', alignItems: 'center' }} className="lg:flex">
          <a href="#layanan" onClick={(e) => handleNavClick(e, 'layanan')} className="text-label select-none hover:text-[var(--clr-black)]">
            Layanan
          </a>
          <a href="#portofolio" onClick={(e) => handleNavClick(e, 'portofolio')} className="text-label select-none hover:text-[var(--clr-black)]">
            Portofolio
          </a>
          <a href="#faq" onClick={(e) => handleNavClick(e, 'faq')} className="text-label select-none hover:text-[var(--clr-black)]">
            FAQ
          </a>
          <a href="#kontak" onClick={(e) => handleNavClick(e, 'kontak')} className="text-label select-none hover:text-[var(--clr-black)]">
            Kontak
          </a>
        </div>

        {/* Right Side: CTA Button (Desktop) */}
        <div style={{ display: 'none' }} className="lg:block">
          <Button variant="primary" size="sm" onClick={handleCTAClick}>
            Mulai Konsultasi
          </Button>
        </div>

        {/* Hamburger Action Button (Mobile) */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            color: 'var(--clr-black)',
            display: 'block',
          }}
          className="lg:hidden"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Drawer Navigation overlay */}
      {isMobileMenuOpen && (
        <div
          style={{
            position: 'fixed',
            top: '64px',
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'var(--clr-cream)',
            zIndex: 899,
            display: 'flex',
            flexDirection: 'column',
            padding: '40px 24px',
            gap: '24px',
            borderTop: '1px solid var(--clr-border)',
            animation: 'fadeIn 0.2s ease',
          }}
          className="lg:hidden"
        >
          <a
            href="#layanan"
            onClick={(e) => handleNavClick(e, 'layanan')}
            style={{ fontSize: '18px', fontWeight: 500 }}
            className="text-label"
          >
            Layanan
          </a>
          <a
            href="#portofolio"
            onClick={(e) => handleNavClick(e, 'portofolio')}
            style={{ fontSize: '18px', fontWeight: 500 }}
            className="text-label"
          >
            Portofolio
          </a>
          <a
            href="#faq"
            onClick={(e) => handleNavClick(e, 'faq')}
            style={{ fontSize: '18px', fontWeight: 500 }}
            className="text-label"
          >
            FAQ
          </a>
          <a
            href="#kontak"
            onClick={(e) => handleNavClick(e, 'kontak')}
            style={{ fontSize: '18px', fontWeight: 500 }}
            className="text-label"
          >
            Kontak
          </a>
          <div style={{ marginTop: '20px' }}>
            <Button variant="primary" style={{ width: '100%' }} onClick={handleCTAClick}>
              Mulai Konsultasi
            </Button>
          </div>
        </div>
      )}

      <style>{`
        .lg\\:flex {
          display: none;
        }
        .lg\\:block {
          display: none;
        }
        @media (min-width: 1024px) {
          .lg\\:flex {
            display: flex;
          }
          .lg\\:block {
            display: block;
          }
          .lg\\:hidden {
            display: none !important;
          }
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </nav>
  );
};
