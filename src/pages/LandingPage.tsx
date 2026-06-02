// src/pages/LandingPage.tsx
import React, { useState, useEffect } from 'react';
import { NavBar } from '../components/organisms/landing/NavBar';
import { Footer } from '../components/organisms/landing/Footer';
import { FAQItem } from '../components/molecules/FAQItem';
import { MacintoshMonitor } from '../components/molecules/MacintoshMonitor';
import { Button } from '../components/atoms/Button';
import { Input } from '../components/atoms/Input';
import { Select } from '../components/atoms/Select';
import { Textarea } from '../components/atoms/Textarea';
import { useToastStore } from '../store/toastStore';
import { api } from '../lib/api';
import { leadSchema } from '../lib/schemas';
import type { LeadFormData } from '../lib/schemas';
import {
  Award,
  Zap,
  HeartHandshake,
  Puzzle,
  ArrowRight,
  Sparkles,
  GraduationCap,
  Settings
} from 'lucide-react';

export const LandingPage: React.FC = () => {
  const addToast = useToastStore((state) => state.addToast);
  const [settings, setSettings] = useState({
    heroLabel: '— SISTEM OTOMASI PROFESIONAL',
    heroTitle: 'Kerja lebih cerdas, bukan lebih keras.',
    heroSub: 'Kami membantu bisnis Anda bertransisi ke sistem otomasi yang efisien — melalui training intensif maupun pengerjaan langsung.',
    service1Title: 'Training A Automation',
    service1Desc: 'Program pelatihan intensif untuk individu maupun tim. Dari dasar hingga implementasi automation workflow di lingkungan kerja nyata.',
    service2Title: 'Jasa Pembuatan Sistem',
    service2Desc: 'Kami bangun sistem otomasi sesuai kebutuhan bisnis Anda — mulai dari integrasi tools, workflow design, hingga deployment dan maintenance.',
    whyTitle: 'Mengapa A Automation?',
    whyLabel: 'KOMITMEN LAYANAN',
  });

  useEffect(() => {
    const loadSettings = async () => {
      try {
        const res = await api.getPublicSettings();
        if (res.success) {
          setSettings(res.data);
        }
      } catch (e) {
        console.log('Using local retro copy fallbacks.');
      }
    };
    loadSettings();
  }, []);

  // Form State
  const [formData, setFormData] = useState<Partial<LeadFormData>>({
    name: '',
    whatsapp: '',
    email: '',
    serviceType: undefined,
    projectDetail: '',
  });
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Portfolio Filters
  const [activeFilter, setActiveFilter] = useState('Semua');

  const categories = [
    'Semua',
    'HR Automation',
    'Finance',
    'Marketing',
    'Operasional',
    'Integrasi API',
  ];

  const portfolioItems = [
    {
      id: 1,
      title: 'Auto-Recruit HR System',
      category: 'HR Automation',
      description: 'Otomasi review resume pelamar & integrasi jadwal wawancara otomatis.',
      metric: 'Hemat 15 jam/minggu',
      tools: ['Make', 'Airtable', 'WA API'],
    },
    {
      id: 2,
      title: 'Fin-Flow Invoicing',
      category: 'Finance',
      description: 'Tagihan otomatis & payment gateway reminder terintegrasi WhatsApp.',
      metric: 'Pelunasan 3x lebih cepat',
      tools: ['Xendit', 'Zapier', 'GSheets'],
    },
    {
      id: 3,
      title: 'Omni-Post Scheduler',
      category: 'Marketing',
      description: 'Distribusi dan posting konten lintas medsos terjadwal secara otomatis.',
      metric: 'Konsistensi konten +40%',
      tools: ['n8n', 'Instagram API', 'TikTok API'],
    },
    {
      id: 4,
      title: 'Stock-Sync Warehouse',
      category: 'Operasional',
      description: 'Sinkronisasi stok gudang real-time dengan sensor warning persediaan menipis.',
      metric: 'Akurasi stok 99.8%',
      tools: ['n8n', 'PostgreSQL', 'Telegram Bot'],
    },
    {
      id: 5,
      title: 'Meta Leads Hook Sync',
      category: 'Integrasi API',
      description: 'Sinkronisasi lead iklan Facebook Ads langsung ke CRM internal dalam 2 detik.',
      metric: 'Respons leads 0.1 detik',
      tools: ['Zapier', 'Webhooks', 'CRM API'],
    },
  ];

  const filteredPortfolio = activeFilter === 'Semua'
    ? portfolioItems
    : portfolioItems.filter(item => item.category === activeFilter);

  // Handle Form Change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error for this field
    if (formErrors[name]) {
      setFormErrors(prev => {
        const copy = { ...prev };
        delete copy[name];
        return copy;
      });
    }
  };

  // Form Submit Handler
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setFormErrors({});

    // Validate using Zod schema
    const result = leadSchema.safeParse(formData);

    if (!result.success) {
      const errors: Record<string, string> = {};
      result.error.issues.forEach(issue => {
        if (issue.path[0]) {
          errors[issue.path[0].toString()] = issue.message;
        }
      });
      setFormErrors(errors);
      setIsSubmitting(false);
      addToast('Harap periksa kembali isian form Anda', 'error');
      return;
    }

    try {
      await api.submitLead(result.data);
      addToast('Konsultasi berhasil dikirim! Tim kami akan segera menghubungi Anda.', 'success');
      // Reset form
      setFormData({
        name: '',
        whatsapp: '',
        email: '',
        serviceType: '' as any,
        projectDetail: '',
      });
    } catch (e: any) {
      addToast(e.message || 'Gagal mengirim konsultasi. Coba lagi.', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Helper to scroll to section
  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = el.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  return (
    <div style={{ backgroundColor: 'var(--clr-cream)', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Navbar header navigation */}
      <NavBar />

      <main style={{ flexGrow: 1 }}>
        {/* [02] Hero Section */}
        <section id="hero" style={{ borderBottom: '2px solid var(--clr-border)' }}>
          <div className="container">
            <div className="hero-responsive-grid">
              {/* Left Column: Copywriting */}
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                <span className="text-label text-muted" style={{ marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  {settings.heroLabel}
                </span>
                <h1 className="text-display" style={{ marginBottom: '24px', color: 'var(--clr-black)' }}>
                  {settings.heroTitle}
                </h1>
                <p className="text-body-lg" style={{ marginBottom: '32px', lineHeight: 1.7, color: 'var(--clr-cement)' }}>
                  {settings.heroSub}
                </p>

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
                  <Button variant="primary" size="lg" onClick={() => scrollToSection('kontak')}>
                    Konsultasi Gratis
                  </Button>
                  <Button variant="ghost" size="lg" onClick={() => scrollToSection('layanan')}>
                    Lihat Layanan
                  </Button>
                </div>
              </div>

              {/* Right Column: Simulated Macintosh screen illustration */}
              <div style={{ display: 'flex', justifyContent: 'center', position: 'relative' }}>
                <MacintoshMonitor />
                {/* Floating Retro Badge decoration */}
                <div
                  style={{
                    position: 'absolute',
                    top: '20px',
                    right: '10px',
                    backgroundColor: 'var(--clr-cream)',
                    border: '1px solid var(--clr-border)',
                    padding: '8px 12px',
                    boxShadow: '3px 3px 0 var(--clr-border)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    fontSize: '11px',
                    fontWeight: 'bold',
                    zIndex: 20,
                  }}
                  className="font-mono"
                >
                  <Sparkles size={14} className="text-amber-500" />
                  <span>120+ Proyek Selesai</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* [03] Stats Bar Section */}
        <section style={{ padding: '32px 0', backgroundColor: 'var(--clr-cream-dk)', borderBottom: '1px solid var(--clr-border)' }}>
          <div className="container">
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                gap: '24px',
              }}
            >
              {[
                { number: '120+', label: 'Proyek Selesai' },
                { number: '85', label: 'Klien Aktif' },
                { number: '15+', label: 'Tools & Platform' },
                { number: '500h', label: 'Jam Training' },
              ].map((stat, idx) => (
                <div
                  key={idx}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    borderRight: idx !== 3 ? '1px solid var(--clr-border)' : 'none',
                  }}
                  className="stat-col"
                >
                  <span
                    style={{
                      fontFamily: 'var(--ff-mono)',
                      fontSize: '36px',
                      fontWeight: 'bold',
                      color: 'var(--clr-black)',
                    }}
                  >
                    {stat.number}
                  </span>
                  <span className="text-micro text-muted">{stat.label}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* [04] Layanan Section */}
        <section id="layanan">
          <div className="container">
            {/* Header matching screenshot 2: Layanan Kami on left, 01 / 02 on right */}
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'baseline',
                marginBottom: '32px',
                borderBottom: '2px solid var(--clr-border)',
                paddingBottom: '12px',
                userSelect: 'none',
              }}
            >
              <span className="text-label" style={{ fontWeight: 'bold', fontSize: '13px', color: 'var(--clr-black)' }}>
                LAYANAN KAMI
              </span>
              <span className="text-label text-muted" style={{ fontWeight: 'bold', fontSize: '12px' }}>
                01 / 02
              </span>
            </div>

            {/* Split master container */}
            <div className="services-split-grid">
              
              {/* Column 01: Training A Automation */}
              <div className="services-col">
                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', alignItems: 'flex-start' }}>
                  <span className="text-label text-muted" style={{ fontSize: '11px', fontWeight: 'bold' }}>
                    01
                  </span>
                  
                  {/* Icon bordered square */}
                  <div
                    style={{
                      width: '36px',
                      height: '36px',
                      border: '1px solid var(--clr-border)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      backgroundColor: 'var(--clr-cream-dk)',
                    }}
                  >
                    <GraduationCap size={18} />
                  </div>

                  {/* Title */}
                  <h3
                    className="text-h2"
                    style={{
                      fontSize: '24px',
                      lineHeight: '1.2',
                      color: 'var(--clr-black)',
                      fontWeight: 'bold',
                      margin: 0,
                    }}
                  >
                    {settings.service1Title}
                  </h3>

                  {/* Description */}
                  <p
                    className="text-body"
                    style={{
                      color: 'var(--clr-cement)',
                      fontSize: '14px',
                      lineHeight: '1.6',
                      margin: 0,
                    }}
                  >
                    {settings.service1Desc}
                  </p>
                </div>

                {/* Action Link button */}
                <button
                  onClick={() => scrollToSection('kontak')}
                  style={{
                    background: 'none',
                    border: 'none',
                    fontFamily: 'var(--ff-mono)',
                    fontSize: '11px',
                    fontWeight: 'bold',
                    color: 'var(--clr-charcoal)',
                    cursor: 'pointer',
                    padding: 0,
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                  }}
                >
                  <span style={{ borderBottom: '1.5px solid var(--clr-charcoal)', paddingBottom: '2px' }}>
                    PELAJARI LEBIH LANJUT →
                  </span>
                </button>
              </div>

              {/* Column 02: Jasa Pembuatan Sistem Otomasi */}
              <div className="services-col services-col-right">
                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', alignItems: 'flex-start' }}>
                  <span className="text-label text-muted" style={{ fontSize: '11px', fontWeight: 'bold' }}>
                    02
                  </span>
                  
                  {/* Icon bordered square */}
                  <div
                    style={{
                      width: '36px',
                      height: '36px',
                      border: '1px solid var(--clr-border)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      backgroundColor: 'var(--clr-cream-dk)',
                    }}
                  >
                    <Settings size={18} />
                  </div>

                  {/* Title */}
                  <h3
                    className="text-h2"
                    style={{
                      fontSize: '24px',
                      lineHeight: '1.2',
                      color: 'var(--clr-black)',
                      fontWeight: 'bold',
                      margin: 0,
                    }}
                  >
                    {settings.service2Title}
                  </h3>

                  {/* Description */}
                  <p
                    className="text-body"
                    style={{
                      color: 'var(--clr-cement)',
                      fontSize: '14px',
                      lineHeight: '1.6',
                      margin: 0,
                    }}
                  >
                    {settings.service2Desc}
                  </p>
                </div>

                {/* Action Link button */}
                <button
                  onClick={() => scrollToSection('kontak')}
                  style={{
                    background: 'none',
                    border: 'none',
                    fontFamily: 'var(--ff-mono)',
                    fontSize: '11px',
                    fontWeight: 'bold',
                    color: 'var(--clr-charcoal)',
                    cursor: 'pointer',
                    padding: 0,
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                  }}
                >
                  <span style={{ borderBottom: '1.5px solid var(--clr-charcoal)', paddingBottom: '2px' }}>
                    PELAJARI LEBIH LANJUT →
                  </span>
                </button>
              </div>

            </div>
          </div>
        </section>

        {/* [05] Why Us Section */}
        <section style={{ backgroundColor: 'var(--clr-cream-dk)' }}>
          <div className="container">
             <div style={{ textAlign: 'center', marginBottom: '56px' }}>
              <span className="text-label text-muted" style={{ display: 'block', marginBottom: '8px' }}>
                {settings.whyLabel}
              </span>
              <h2 className="text-h1">{settings.whyTitle}</h2>
            </div>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
                gap: '24px',
              }}
            >
              {[
                {
                  icon: <Award size={22} />,
                  title: 'TIM BERPENGALAMAN',
                  desc: 'Telah merancang lebih dari 150 arsitektur workflow kompleks untuk start-up, e-commerce, hingga enterprise berskala besar.',
                },
                {
                  icon: <Zap size={22} />,
                  title: 'FAST & RELIABLE DELIVERY',
                  desc: 'Metodologi agile membuat pengembangan kami cepat, dengan testing ketat untuk menjamin sistem zero-downtime saat deployment.',
                },
                {
                  icon: <HeartHandshake size={22} />,
                  title: 'DEDICATED SUPPORT',
                  desc: 'Dukungan SLA profesional untuk pemantauan sistem, penanganan bug, dan penyesuaian reguler pasca-peluncuran.',
                },
                {
                  icon: <Puzzle size={22} />,
                  title: 'CUSTOM-BUILT SOLUTIONS',
                  desc: 'Tidak ada solusi generalis. Setiap baris logika dan visual alur kerja dirancang 100% mengikuti SOP operasional unik perusahaan Anda.',
                },
              ].map((item, idx) => (
                <div
                  key={idx}
                  style={{
                    backgroundColor: 'var(--clr-cream)',
                    border: '2px solid var(--clr-border)',
                    boxShadow: '4px 4px 0px var(--clr-border)',
                    padding: '24px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                    gap: '16px',
                    position: 'relative',
                    transition: 'all var(--transition-fast)',
                  }}
                  className="hover:translate-y-[-2px] hover:shadow-[5px_5px_0px_var(--clr-border)]"
                >
                  {/* Retro Macintosh corner dot ornament */}
                  <div style={{ position: 'absolute', top: '6px', right: '6px', width: '4px', height: '4px', backgroundColor: 'var(--clr-border)' }} />
                  
                  {/* Icon Box */}
                  <div
                    style={{
                      width: '42px',
                      height: '42px',
                      border: '2px solid var(--clr-border)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      backgroundColor: 'var(--clr-cream-dk)',
                      boxShadow: '2px 2px 0px var(--clr-border)',
                    }}
                  >
                    {item.icon}
                  </div>
                  
                  {/* Title */}
                  <h3
                    style={{
                      fontSize: '13px',
                      fontFamily: 'var(--ff-mono)',
                      fontWeight: 'bold',
                      textTransform: 'uppercase',
                      color: 'var(--clr-black)',
                      margin: 0,
                      letterSpacing: '0.03em',
                    }}
                  >
                    {item.title}
                  </h3>
                  
                  {/* Description */}
                  <p
                    style={{
                      fontSize: '12px',
                      color: 'var(--clr-cement)',
                      lineHeight: 1.6,
                      margin: 0,
                      fontFamily: 'var(--ff-body)',
                    }}
                  >
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* [06] Portofolio Section */}
        <section id="portofolio">
          <div className="container">
            <div style={{ textAlign: 'center', marginBottom: '40px' }}>
              <span className="text-label text-muted" style={{ display: 'block', marginBottom: '8px' }}>
                STUDI KASUS NYATA
              </span>
              <h2 className="text-h1">Portofolio Kerja</h2>
            </div>

            {/* Filter Tabs layout */}
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                flexWrap: 'wrap',
                gap: '8px',
                marginBottom: '40px',
              }}
            >
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveFilter(cat)}
                  style={{
                    border: '1px solid var(--clr-border)',
                    backgroundColor: activeFilter === cat ? 'var(--clr-charcoal)' : 'var(--clr-cream)',
                    color: activeFilter === cat ? 'var(--clr-cream)' : 'var(--clr-charcoal)',
                    fontFamily: 'var(--ff-mono)',
                    fontSize: '11px',
                    padding: '6px 14px',
                    cursor: 'pointer',
                    textTransform: 'uppercase',
                    transition: 'all var(--transition-fast)',
                  }}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Grid display */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                gap: '24px',
              }}
            >
              {filteredPortfolio.map((item) => (
                <div
                  key={item.id}
                  style={{
                    backgroundColor: 'var(--clr-cream-dk)',
                    border: '1px solid var(--clr-border)',
                    padding: '24px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                  }}
                >
                  <div>
                    <span className="text-micro text-muted" style={{ display: 'block', marginBottom: '8px' }}>
                      [{item.category}]
                    </span>
                    <h3 className="text-h3" style={{ fontSize: '18px', color: 'var(--clr-black)', marginBottom: '12px' }}>
                      {item.title}
                    </h3>
                    <p className="text-body text-muted" style={{ fontSize: '13px', lineHeight: 1.5, marginBottom: '20px' }}>
                      {item.description}
                    </p>
                  </div>

                  <div>
                    {/* Highlight metrics */}
                    <div
                      style={{
                        borderLeft: '2px solid var(--clr-green)',
                        paddingLeft: '10px',
                        marginBottom: '16px',
                        fontWeight: 'bold',
                        color: 'var(--clr-green)',
                        fontSize: '13px',
                      }}
                      className="font-mono"
                    >
                      {item.metric}
                    </div>
                    {/* Tools badges */}
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                      {item.tools.map((t) => (
                        <span
                          key={t}
                          style={{
                            fontSize: '9px',
                            fontFamily: 'var(--ff-mono)',
                            color: 'var(--clr-cement)',
                            backgroundColor: 'var(--clr-cream)',
                            border: '1px solid var(--clr-border)',
                            padding: '2px 6px',
                          }}
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* [07] Proses Kerja Section */}
        <section style={{ backgroundColor: 'var(--clr-cream-dk)' }}>
          <div className="container">
            <div style={{ textAlign: 'center', marginBottom: '64px' }}>
              <span className="text-label text-muted" style={{ display: 'block', marginBottom: '8px' }}>
                ALUR DEPLOYMENT
              </span>
              <h2 className="text-h1">Proses Pengerjaan</h2>
            </div>

            {/* Horizontal Timeline */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
                gap: '24px',
                position: 'relative',
              }}
            >
              {[
                { number: '01', title: 'Konsultasi', desc: 'Audit proses manual Anda dan identifikasi bottle-neck.', time: '1 Hari' },
                { number: '02', title: 'Analisis', desc: 'Perumusan arsitektur workflow dan penentuan software stack.', time: '2-3 Hari' },
                { number: '03', title: 'Development', desc: 'Pembangunan integrasi, mapping data, & setup AI filter.', time: '1-2 Minggu' },
                { number: '04', title: 'Testing', desc: 'Uji coba ketahanan data, error catcher, & revisi alur.', time: '3-4 Hari' },
                { number: '05', title: 'Delivery', desc: 'Serah terima sistem, video panduan, & start support 30 hari.', time: '1 Hari' },
              ].map((step, idx) => (
                <div
                  key={idx}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                    position: 'relative',
                  }}
                >
                  {/* Step Number Circle */}
                  <div
                    style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: '50%',
                      border: '1px solid var(--clr-border)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontFamily: 'var(--ff-mono)',
                      fontSize: '11px',
                      fontWeight: 'bold',
                      color: 'var(--clr-cement)',
                      backgroundColor: 'var(--clr-cream)',
                      marginBottom: '16px',
                    }}
                  >
                    {step.number}
                  </div>

                  <h3 className="text-h3" style={{ fontSize: '16px', marginBottom: '8px', color: 'var(--clr-black)' }}>
                    {step.title}
                  </h3>
                  <p className="text-body text-muted" style={{ fontSize: '13px', lineHeight: 1.5, marginBottom: '16px', margin: 0 }}>
                    {step.desc}
                  </p>
                  <span
                    style={{
                      fontFamily: 'var(--ff-mono)',
                      fontSize: '9px',
                      color: 'var(--clr-cement)',
                      border: '1px solid var(--clr-border)',
                      padding: '2px 8px',
                      backgroundColor: 'var(--clr-cream)',
                    }}
                  >
                    {step.time}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* [08] Testimonial Section */}
        <section>
          <div className="container">
            <div style={{ textAlign: 'center', marginBottom: '56px' }}>
              <span className="text-label text-muted" style={{ display: 'block', marginBottom: '8px' }}>
                REVIEW DARI KORPORAT
              </span>
              <h2 className="text-h1">Testimonial Klien</h2>
            </div>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                gap: '32px',
              }}
            >
              {[
                {
                  quote: 'Integrasi workflow Make dengan CRM kami menghemat ratusan jam kerja input data manual tim operasional kami setiap bulannya. Investasi terbaik tahun ini!',
                  name: 'Hendri Setiawan',
                  role: 'COO',
                  company: 'Logistik Nusantara',
                },
                {
                  quote: 'Training intensif 2 hari dari A Automation mengubah pola pikir tim marketing kami. Sekarang kami membuat dashboard data AI kustom sendiri.',
                  name: 'Siska Rahayu',
                  role: 'VP Marketing',
                  company: 'Estetika Studio',
                },
                {
                  quote: 'Otomasi WhatsApp billing generator yang dibuat sangat andal. Pengumpulan tagihan invoice bulanan naik drastis dan zero failure.',
                  name: 'Aditya Pratama',
                  role: 'Founder',
                  company: 'TechStart.io',
                },
              ].map((t, idx) => (
                <div
                  key={idx}
                  style={{
                    border: '1px solid var(--clr-border)',
                    padding: '32px 24px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    backgroundColor: 'var(--clr-cream)',
                  }}
                >
                  <div style={{ marginBottom: '24px' }}>
                    <span
                      style={{
                        fontFamily: 'var(--ff-display)',
                        fontSize: '36px',
                        lineHeight: 1,
                        color: 'var(--clr-cement-lt)',
                        display: 'block',
                      }}
                    >
                      “
                    </span>
                    <p className="text-body" style={{ color: 'var(--clr-charcoal)', fontStyle: 'italic', lineHeight: 1.6, margin: 0 }}>
                      {t.quote}
                    </p>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div
                      style={{
                        width: '36px',
                        height: '36px',
                        borderRadius: '50%',
                        backgroundColor: 'var(--clr-charcoal)',
                        color: 'var(--clr-cream)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontWeight: 'bold',
                        fontSize: '14px',
                      }}
                    >
                      {t.name[0]}
                    </div>
                    <div>
                      <span style={{ display: 'block', fontWeight: 500, fontSize: '13px', color: 'var(--clr-black)' }}>
                        {t.name}
                      </span>
                      <span className="text-micro text-muted">
                        {t.role}, {t.company}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* [09] FAQ Section */}
        <section id="faq" style={{ backgroundColor: 'var(--clr-cream-dk)' }}>
          <div className="container" style={{ maxWidth: '800px' }}>
            <div style={{ textAlign: 'center', marginBottom: '48px' }}>
              <span className="text-label text-muted" style={{ display: 'block', marginBottom: '8px' }}>
                BANTUAN INFORMASI
              </span>
              <h2 className="text-h1">Frequently Asked Questions</h2>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <FAQItem
                question="Berapa lama waktu pengerjaan sistem otomasi?"
                answer="Untuk integrasi standard membutuhkan waktu sekitar 1-2 minggu. Sedangkan sistem multi-platform yang kompleks dengan integrasi API pihak ketiga kustom berkisar antara 3-4 minggu."
              />
              <FAQItem
                question="Apakah saya perlu pengetahuan teknis untuk ikut training?"
                answer="Tidak sama sekali. Training kami dirancang dari nol (fundamental) untuk tim non-teknikal (Marketing, HR, Operasional). Kami fokus menggunakan tools visual no-code."
              />
              <FAQItem
                question="Tools apa saja yang diajarkan dalam training dan pembuatan sistem?"
                answer="Kami fokus mengajarkan no-code/low-code platforms terpopuler seperti Make, Zapier, n8n, Airtable, Notion API, Chat GPT/Claude API, dan integrasi WhatsApp (WABA)."
              />
              <FAQItem
                question="Apakah ada garansi atau support setelah proyek serah terima selesai?"
                answer="Ya. Kami menyediakan garansi dedicated support selama 30 hari gratis untuk pemantauan sistem, penanganan error, dan revisi alur minor jika ada penyesuaian operasional bisnis."
              />
              <FAQItem
                question="Bagaimana skema proses pembayarannya?"
                answer="Untuk Jasa kustom, pembayaran dilakukan 50% sebagai Down Payment (DP) setelah proposal disetujui, dan pelunasan 50% setelah serah terima sistem selesai diuji coba."
              />
            </div>
          </div>
        </section>

        {/* [10] Kontak Section Form */}
        <section id="kontak">
          <div className="container">
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr',
                gap: '48px',
              }}
              className="lg:grid-cols-[1fr_1.3fr]"
            >
              {/* Left Column: Info */}
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                <span className="text-label text-muted" style={{ marginBottom: '16px' }}>
                  MULAI PROYEK ANDA
                </span>
                <h2 className="text-h1" style={{ marginBottom: '24px' }}>
                  Ceritakan kebutuhan sistem otomasi Anda.
                </h2>
                <p className="text-body-lg" style={{ marginBottom: '32px', lineHeight: 1.6 }}>
                  Diskusikan hambatan operasional manual tim Anda dengan workflow architect kami secara langsung. 
                  Kami akan melakukan audit proses awal dan memberikan rancangan struktur otomasi gratis.
                </p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  {[
                    'Respons cepat dalam maksimal 24 jam kerja',
                    'Konsultasi audit awal 100% gratis',
                    'Rancangan solusi disesuaikan budget operasional',
                  ].map((bullet, idx) => (
                    <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <span
                        style={{
                          fontFamily: 'var(--ff-mono)',
                          fontSize: '11px',
                          color: 'var(--clr-green)',
                          fontWeight: 'bold',
                        }}
                      >
                        [✓]
                      </span>
                      <span style={{ fontSize: '13px', fontWeight: 500, color: 'var(--clr-black)' }}>{bullet}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Column: Interactive Form in a Macintosh Window */}
              <div className="mac-window" style={{ width: '100%' }}>
                {/* Titlebar */}
                <div className="mac-window-titlebar">
                  <div className="mac-window-close-box" onClick={() => setFormData({ name: '', whatsapp: '', email: '', serviceType: '' as any, projectDetail: '' })}></div>
                  <div className="mac-window-stripes"></div>
                  <span className="mac-window-title">KONSULTASI_KUSTOM.SYS</span>
                  <div className="mac-window-stripes"></div>
                </div>

                {/* Content */}
                <div className="mac-window-content" style={{ padding: '32px 20px' }}>
                  <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column' }}>
                    <Input
                      label="Nama Lengkap"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      error={formErrors.name}
                      placeholder="Contoh: Budi Santoso"
                      required
                    />

                    <Input
                      label="Nomor WhatsApp"
                      name="whatsapp"
                      value={formData.whatsapp}
                      onChange={handleInputChange}
                      error={formErrors.whatsapp}
                      hint="Gunakan format internasional: +628..."
                      placeholder="Contoh: +628123456789"
                      required
                    />

                    <Input
                      label="Alamat Email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      error={formErrors.email}
                      placeholder="Contoh: budi@company.com"
                      required
                    />

                    <Select
                      label="Jenis Layanan"
                      name="serviceType"
                      value={formData.serviceType}
                      onChange={handleInputChange}
                      error={formErrors.serviceType}
                      options={[
                        { value: 'TRAINING', label: 'Training A Automation' },
                        { value: 'JASA', label: 'Jasa Pembuatan Sistem Otomasi' },
                        { value: 'KEDUANYA', label: 'Keduanya (Training & Jasa)' },
                      ]}
                      required
                    />

                    <Textarea
                      label="Detail Tujuan / Deskripsi Project"
                      name="projectDetail"
                      value={formData.projectDetail}
                      onChange={handleInputChange}
                      error={formErrors.projectDetail}
                      placeholder="Jelaskan proses manual apa yang ingin Anda otomasikan saat ini, tools yang Anda gunakan, dan target utama proyek..."
                      required
                    />

                    <Button
                      type="submit"
                      variant="primary"
                      size="lg"
                      loading={isSubmitting}
                      style={{ width: '100%', marginTop: '16px' }}
                    >
                      Kirim Formulir Konsultasi
                      <ArrowRight size={16} />
                    </Button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer copyright section */}
      <Footer />
    </div>
  );
};
