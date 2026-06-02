// src/components/organisms/landing/Footer.tsx
import React from 'react';

export const Footer: React.FC = () => {
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    const element = document.getElementById(targetId);
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
    <footer
      style={{
        backgroundColor: 'var(--clr-cream-dk)',
        borderTop: '2px solid var(--clr-border)',
        paddingTop: '64px',
        paddingBottom: '32px',
        color: 'var(--clr-cement)',
      }}
    >
      <div className="container">
        {/* Asymmetrical Grid layout */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr',
            gap: '40px',
            marginBottom: '48px',
          }}
          className="md:grid-cols-3"
        >
          {/* Column 1: Brand Logo & Tagline */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span
                style={{
                  fontFamily: 'var(--ff-mono)',
                  fontSize: '18px',
                  fontWeight: 'bold',
                  border: '1px solid var(--clr-border)',
                  width: '28px',
                  height: '28px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: 'var(--clr-cream)',
                  color: 'var(--clr-black)',
                }}
              >
                A∞
              </span>
              <span style={{ fontFamily: 'var(--ff-body)', fontWeight: 700, fontSize: '15px', color: 'var(--clr-black)' }}>
                A Automation
              </span>
            </div>
            <p className="text-body" style={{ color: 'var(--clr-cement)', lineHeight: 1.5, margin: 0 }}>
              "Kerja lebih cerdas, bukan lebih keras."<br />
              Otomasi end-to-end terpercaya untuk pertumbuhan bisnis berkelanjutan.
            </p>
          </div>

          {/* Column 2: Navigation Links */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <span className="text-label" style={{ color: 'var(--clr-black)', fontWeight: 'bold' }}>
              Navigasi
            </span>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <a href="#layanan" onClick={(e) => handleNavClick(e, 'layanan')} className="text-body hover:text-[var(--clr-black)]">
                Layanan
              </a>
              <a href="#portofolio" onClick={(e) => handleNavClick(e, 'portofolio')} className="text-body hover:text-[var(--clr-black)]">
                Portofolio
              </a>
              <a href="#faq" onClick={(e) => handleNavClick(e, 'faq')} className="text-body hover:text-[var(--clr-black)]">
                FAQ
              </a>
              <a href="#kontak" onClick={(e) => handleNavClick(e, 'kontak')} className="text-body hover:text-[var(--clr-black)]">
                Kontak
              </a>
            </div>
          </div>

          {/* Column 3: Contact Details */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <span className="text-label" style={{ color: 'var(--clr-black)', fontWeight: 'bold' }}>
              Hubungi Kami
            </span>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '13px' }}>
              <div>
                <span style={{ display: 'block', fontSize: '10px', color: 'var(--clr-cement)' }} className="text-label">WhatsApp</span>
                <a href="https://wa.me/6281234567890" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--clr-charcoal)', fontWeight: 500 }} className="hover:text-[var(--clr-green)]">
                  +62 812-3456-7890
                </a>
              </div>
              <div>
                <span style={{ display: 'block', fontSize: '10px', color: 'var(--clr-cement)' }} className="text-label">Email</span>
                <a href="mailto:hello@a-automation.id" style={{ color: 'var(--clr-charcoal)', fontWeight: 500 }} className="hover:text-[var(--clr-black)]">
                  hello@a-automation.id
                </a>
              </div>
              <div>
                <span style={{ display: 'block', fontSize: '10px', color: 'var(--clr-cement)' }} className="text-label">Instagram</span>
                <a href="https://instagram.com/a.automation" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--clr-charcoal)', fontWeight: 500 }} className="hover:text-[var(--clr-black)]">
                  @a.automation
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Separator line */}
        <div style={{ height: '1px', backgroundColor: 'var(--clr-border)', marginBottom: '24px' }} />

        {/* Bottom copyright metadata row */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
            fontSize: '11px',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
          className="md:flex-row font-mono text-micro"
        >
          <span>© {new Date().getFullYear()} A Automation. All rights reserved.</span>
          <span>Made with nostalgia in Indonesia</span>
        </div>
      </div>

      <style>{`
        .md\\:grid-cols-3 {
          grid-template-columns: 1fr;
        }
        .md\\:flex-row {
          flex-direction: column;
        }
        @media (min-width: 768px) {
          .md\\:grid-cols-3 {
            grid-template-columns: 1.5fr 1fr 1fr;
          }
          .md\\:flex-row {
            flex-direction: row;
          }
        }
      `}</style>
    </footer>
  );
};
