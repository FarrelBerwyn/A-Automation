// src/pages/admin/SettingsPage.tsx
import React, { useState, useEffect } from 'react';
import { Input } from '../../components/atoms/Input';
import { Textarea } from '../../components/atoms/Textarea';
import { Button } from '../../components/atoms/Button';
import { useToastStore } from '../../store/toastStore';
import { api } from '../../lib/api';
import { changePasswordSchema } from '../../lib/schemas';
import type { ChangePasswordFormData } from '../../lib/schemas';
import { Save, User, ShieldAlert, Globe, KeyRound, Sparkles, Loader } from 'lucide-react';

export const SettingsPage: React.FC = () => {
  const addToast = useToastStore((state) => state.addToast);

  // Tab state
  const [activeTab, setActiveTab] = useState<'security' | 'content'>('security');

  // Form password state
  const [formData, setFormData] = useState<Partial<ChangePasswordFormData>>({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSaving, setIsSaving] = useState(false);

  // Form site settings state
  const [siteSettings, setSiteSettings] = useState({
    heroLabel: '',
    heroTitle: '',
    heroSub: '',
    service1Title: '',
    service1Desc: '',
    service2Title: '',
    service2Desc: '',
    whyTitle: '',
    whyLabel: '',
  });
  const [isLoadingSettings, setIsLoadingSettings] = useState(false);
  const [isSavingSettings, setIsSavingSettings] = useState(false);

  // Load site settings on mount
  useEffect(() => {
    const loadSiteSettings = async () => {
      setIsLoadingSettings(true);
      try {
        const res = await api.getPublicSettings();
        if (res.success && res.data) {
          setSiteSettings({
            heroLabel: res.data.heroLabel || '',
            heroTitle: res.data.heroTitle || '',
            heroSub: res.data.heroSub || '',
            service1Title: res.data.service1Title || '',
            service1Desc: res.data.service1Desc || '',
            service2Title: res.data.service2Title || '',
            service2Desc: res.data.service2Desc || '',
            whyTitle: res.data.whyTitle || '',
            whyLabel: res.data.whyLabel || '',
          });
        }
      } catch (e: any) {
        console.error('Error fetching settings:', e);
        addToast('Gagal memuat pengaturan landing page.', 'error');
      } finally {
        setIsLoadingSettings(false);
      }
    };
    loadSiteSettings();
  }, [addToast]);

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

  const handleSiteSettingsChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setSiteSettings(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setErrors({});

    // Validate via Zod
    const result = changePasswordSchema.safeParse(formData);
    if (!result.success) {
      const formErrs: Record<string, string> = {};
      result.error.issues.forEach(issue => {
        const path = issue.path[0];
        if (path) {
          formErrs[path.toString()] = issue.message;
        }
      });
      setErrors(formErrs);
      setIsSaving(false);
      return;
    }

    try {
      const response = await api.changePassword(result.data);
      if (response.success) {
        addToast('Kata sandi berhasil diperbarui!', 'success');
        setFormData({
          currentPassword: '',
          newPassword: '',
          confirmPassword: '',
        });
      }
    } catch (e: any) {
      addToast(e.message || 'Gagal memperbarui kata sandi. Periksa password saat ini.', 'error');
    } finally {
      setIsSaving(false);
    }
  };

  const handleSaveSiteSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSavingSettings(true);

    try {
      const response = await api.updateSiteSettings(siteSettings);
      if (response.success) {
        addToast('Konten landing page berhasil diperbarui!', 'success');
      } else {
        addToast('Gagal memperbarui konten landing page.', 'error');
      }
    } catch (e: any) {
      addToast(e.message || 'Gagal menyimpan konten. Silakan coba lagi.', 'error');
    } finally {
      setIsSavingSettings(false);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
      {/* Main Container Viewport */}
      <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
        {/* Page Title */}
        <div style={{ borderBottom: '2px solid var(--clr-border)', paddingBottom: '12px' }}>
          <h2 style={{ fontFamily: 'var(--ff-mono)', fontSize: '18px', fontWeight: 'bold', textTransform: 'uppercase', color: 'var(--clr-black)', margin: 0 }}>
            PENGATURAN PORTAL
          </h2>
        </div>

        {/* Tab Selection Switcher */}
        <div style={{ display: 'flex', gap: '4px', borderBottom: '1px solid var(--clr-border)', paddingBottom: '0px', marginBottom: '12px' }}>
          <button
            onClick={() => setActiveTab('security')}
            style={{
              padding: '10px 16px',
              fontFamily: 'var(--ff-mono)',
              fontSize: '11px',
              fontWeight: 'bold',
              border: '1px solid var(--clr-border)',
              borderBottom: activeTab === 'security' ? '1px solid transparent' : '1px solid var(--clr-border)',
              backgroundColor: activeTab === 'security' ? 'var(--clr-cream)' : 'var(--clr-cream-dk)',
              color: 'var(--clr-black)',
              cursor: 'pointer',
              marginBottom: '-1px',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              borderRadius: '0px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              boxShadow: activeTab === 'security' ? 'none' : 'inset 0 -2px 4px rgba(0,0,0,0.05)',
              opacity: activeTab === 'security' ? 1 : 0.8,
            }}
          >
            <KeyRound size={13} />
            KEAMANAN & PROFIL
          </button>
          <button
            onClick={() => setActiveTab('content')}
            style={{
              padding: '10px 16px',
              fontFamily: 'var(--ff-mono)',
              fontSize: '11px',
              fontWeight: 'bold',
              border: '1px solid var(--clr-border)',
              borderBottom: activeTab === 'content' ? '1px solid transparent' : '1px solid var(--clr-border)',
              backgroundColor: activeTab === 'content' ? 'var(--clr-cream)' : 'var(--clr-cream-dk)',
              color: 'var(--clr-black)',
              cursor: 'pointer',
              marginBottom: '-1px',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              borderRadius: '0px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              boxShadow: activeTab === 'content' ? 'none' : 'inset 0 -2px 4px rgba(0,0,0,0.05)',
              opacity: activeTab === 'content' ? 1 : 0.8,
            }}
          >
            <Globe size={13} />
            KELOLA KONTEN LANDING
          </button>
        </div>

        {/* TAB 1: SECURITY & PROFILE */}
        {activeTab === 'security' && (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr',
              gap: '24px',
            }}
            className="lg:grid-cols-[1.5fr_1fr]"
          >
            {/* Left Side: Change Password Form */}
            <div
              style={{
                backgroundColor: 'var(--clr-cream-dk)',
                border: '1px solid var(--clr-border)',
                padding: '24px',
              }}
            >
              <h3
                style={{
                  fontSize: '13px',
                  fontFamily: 'var(--ff-mono)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                  color: 'var(--clr-black)',
                  marginBottom: '20px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  margin: '0 0 20px 0',
                  fontWeight: 'bold',
                }}
              >
                <ShieldAlert size={16} />
                Ganti Kata Sandi (Password)
              </h3>

              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column' }}>
                <Input
                  label="Kata Sandi Saat Ini (Current Password)"
                  name="currentPassword"
                  type="password"
                  value={formData.currentPassword}
                  onChange={handleChange}
                  error={errors.currentPassword}
                  placeholder="Masukkan kata sandi lama Anda"
                  required
                />

                <Input
                  label="Kata Sandi Baru (New Password)"
                  name="newPassword"
                  type="password"
                  value={formData.newPassword}
                  onChange={handleChange}
                  error={errors.newPassword}
                  hint="Password minimal terdiri dari 8 karakter"
                  placeholder="Masukkan kata sandi baru"
                  required
                />

                <Input
                  label="Konfirmasi Kata Sandi Baru (Confirm New Password)"
                  name="confirmPassword"
                  type="password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  error={errors.confirmPassword}
                  placeholder="Ulangi kata sandi baru"
                  required
                />

                <div style={{ marginTop: '16px' }}>
                  <Button type="submit" variant="primary" loading={isSaving} style={{ gap: '8px' }}>
                    <Save size={14} />
                    Perbarui Kata Sandi
                  </Button>
                </div>
              </form>
            </div>

            {/* Right Side: Profile Info Box */}
            <div
              style={{
                backgroundColor: 'var(--clr-cream-dk)',
                border: '1px solid var(--clr-border)',
                padding: '24px',
                display: 'flex',
                flexDirection: 'column',
                gap: '16px',
              }}
            >
              <h3
                style={{
                  fontSize: '13px',
                  fontFamily: 'var(--ff-mono)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                  color: 'var(--clr-black)',
                  marginBottom: '4px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  margin: '0',
                  fontWeight: 'bold',
                }}
              >
                <User size={16} />
                Profil Pengguna
              </h3>

              <div style={{ height: '1px', backgroundColor: 'var(--clr-border)' }} />

              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '13px' }}>
                <div>
                  <span className="text-label text-muted" style={{ display: 'block', fontSize: '10px' }}>Role Portal</span>
                  <span style={{ fontWeight: 'bold', color: 'var(--clr-black)' }}>Super Administrator</span>
                </div>
                
                <div>
                  <span className="text-label text-muted" style={{ display: 'block', fontSize: '10px' }}>Alamat Email</span>
                  <span>admin@a-automation.id</span>
                </div>

                <div>
                  <span className="text-label text-muted" style={{ display: 'block', fontSize: '10px' }}>Nama Akun</span>
                  <span>Macintosh Admin</span>
                </div>

                <div>
                  <span className="text-label text-muted" style={{ display: 'block', fontSize: '10px' }}>Terdaftar Sejak</span>
                  <span style={{ fontFamily: 'var(--ff-mono)', fontSize: '11px' }}>02 Jun 2026, 08:15 WIB</span>
                </div>
              </div>

              <div style={{ height: '1px', borderTop: '1px dashed var(--clr-border)', marginTop: '8px' }} />

              <p style={{ margin: 0, fontSize: '11px', color: 'var(--clr-cement)', lineHeight: 1.4 }}>
                *Akun admin dasar didaftarkan secara manual melalui berkas inisiasi database (seed file) di server demi alasan keamanan.
              </p>
            </div>
          </div>
        )}

        {/* TAB 2: LANDING CONTENT MANAGER */}
        {activeTab === 'content' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {isLoadingSettings ? (
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '60px 0',
                  gap: '12px',
                  backgroundColor: 'var(--clr-cream-dk)',
                  border: '1px solid var(--clr-border)',
                }}
              >
                <Loader size={24} className="animate-spin text-muted" />
                <span style={{ fontFamily: 'var(--ff-mono)', fontSize: '11px', color: 'var(--clr-cement)' }}>
                  Memuat data pengaturan landing...
                </span>
              </div>
            ) : (
              <form onSubmit={handleSaveSiteSettings} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '20px' }} className="lg:grid-cols-2">
                  
                  {/* HERO SECTION SETTINGS */}
                  <div
                    style={{
                      backgroundColor: 'var(--clr-cream-dk)',
                      border: '1px solid var(--clr-border)',
                      padding: '24px',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '12px',
                    }}
                  >
                    <h3
                      style={{
                        fontSize: '13px',
                        fontFamily: 'var(--ff-mono)',
                        textTransform: 'uppercase',
                        color: 'var(--clr-black)',
                        fontWeight: 'bold',
                        margin: '0 0 8px 0',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                      }}
                    >
                      <Sparkles size={16} className="text-amber-500" />
                      1. BAGIAN HERO LANDING
                    </h3>
                    <div style={{ height: '1px', backgroundColor: 'var(--clr-border)', marginBottom: '8px' }} />

                    <Input
                      label="Label Kecil Hero (Label)"
                      name="heroLabel"
                      type="text"
                      value={siteSettings.heroLabel}
                      onChange={handleSiteSettingsChange}
                      placeholder="Contoh: — SISTEM OTOMASI PROFESIONAL"
                      required
                    />

                    <Input
                      label="Judul Besar Hero (Title)"
                      name="heroTitle"
                      type="text"
                      value={siteSettings.heroTitle}
                      onChange={handleSiteSettingsChange}
                      placeholder="Contoh: Kerja lebih cerdas, bukan lebih keras."
                      required
                    />

                    <Textarea
                      label="Deskripsi Pendek Hero (Sub)"
                      name="heroSub"
                      value={siteSettings.heroSub}
                      onChange={handleSiteSettingsChange}
                      placeholder="Masukkan penjelasan singkat produk Anda di hero section..."
                      rows={4}
                      required
                    />
                  </div>

                  {/* WHY US SECTION SETTINGS */}
                  <div
                    style={{
                      backgroundColor: 'var(--clr-cream-dk)',
                      border: '1px solid var(--clr-border)',
                      padding: '24px',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '12px',
                    }}
                  >
                    <h3
                      style={{
                        fontSize: '13px',
                        fontFamily: 'var(--ff-mono)',
                        textTransform: 'uppercase',
                        color: 'var(--clr-black)',
                        fontWeight: 'bold',
                        margin: '0 0 8px 0',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                      }}
                    >
                      <User size={16} />
                      2. BAGIAN MENGAPA KAMI
                    </h3>
                    <div style={{ height: '1px', backgroundColor: 'var(--clr-border)', marginBottom: '8px' }} />

                    <Input
                      label="Label Kecil Mengapa Kami (Why Label)"
                      name="whyLabel"
                      type="text"
                      value={siteSettings.whyLabel}
                      onChange={handleSiteSettingsChange}
                      placeholder="Contoh: KOMITMEN LAYANAN"
                      required
                    />

                    <Input
                      label="Judul Mengapa Kami (Why Title)"
                      name="whyTitle"
                      type="text"
                      value={siteSettings.whyTitle}
                      onChange={handleSiteSettingsChange}
                      placeholder="Contoh: Mengapa A Automation?"
                      required
                    />
                  </div>
                </div>

                {/* SERVICES SECTION SETTINGS */}
                <div
                  style={{
                    backgroundColor: 'var(--clr-cream-dk)',
                    border: '1px solid var(--clr-border)',
                    padding: '24px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '16px',
                  }}
                >
                  <h3
                    style={{
                      fontSize: '13px',
                      fontFamily: 'var(--ff-mono)',
                      textTransform: 'uppercase',
                      color: 'var(--clr-black)',
                      fontWeight: 'bold',
                      margin: 0,
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                    }}
                  >
                    <Globe size={16} />
                    3. DUA JASA & LAYANAN UTAMA
                  </h3>
                  <div style={{ height: '1px', backgroundColor: 'var(--clr-border)' }} />

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '24px' }} className="lg:grid-cols-2">
                    {/* Service 1 */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                      <span
                        style={{
                          fontFamily: 'var(--ff-mono)',
                          fontSize: '11px',
                          color: 'var(--clr-black)',
                          fontWeight: 'bold',
                          letterSpacing: '0.05em',
                        }}
                      >
                        [LAYANAN 01]
                      </span>
                      <Input
                        label="Judul Layanan 1"
                        name="service1Title"
                        type="text"
                        value={siteSettings.service1Title}
                        onChange={handleSiteSettingsChange}
                        placeholder="Contoh: Training A Automation"
                        required
                      />
                      <Textarea
                        label="Deskripsi Layanan 1"
                        name="service1Desc"
                        value={siteSettings.service1Desc}
                        onChange={handleSiteSettingsChange}
                        placeholder="Deskripsikan program pelatihan otomasi Anda..."
                        rows={4}
                        required
                      />
                    </div>

                    {/* Service 2 */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                      <span
                        style={{
                          fontFamily: 'var(--ff-mono)',
                          fontSize: '11px',
                          color: 'var(--clr-black)',
                          fontWeight: 'bold',
                          letterSpacing: '0.05em',
                        }}
                      >
                        [LAYANAN 02]
                      </span>
                      <Input
                        label="Judul Layanan 2"
                        name="service2Title"
                        type="text"
                        value={siteSettings.service2Title}
                        onChange={handleSiteSettingsChange}
                        placeholder="Contoh: Jasa Pembuatan Sistem"
                        required
                      />
                      <Textarea
                        label="Deskripsi Layanan 2"
                        name="service2Desc"
                        value={siteSettings.service2Desc}
                        onChange={handleSiteSettingsChange}
                        placeholder="Deskripsikan jasa pengerjaan kustom otomasi Anda..."
                        rows={4}
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* Submittal Save Action panel */}
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'flex-end',
                    backgroundColor: 'var(--clr-cream-dk)',
                    border: '1px solid var(--clr-border)',
                    padding: '16px 24px',
                  }}
                >
                  <Button type="submit" variant="primary" loading={isSavingSettings} style={{ gap: '8px' }}>
                    <Save size={14} />
                    Simpan Perubahan Landing Page
                  </Button>
                </div>
              </form>
            )}
          </div>
        )}
      </div>

      <style>{`
        .lg\\:grid-cols-\\[1\\.5fr_1fr\\] {
          grid-template-columns: 1fr;
        }
        .lg\\:grid-cols-2 {
          grid-template-columns: 1fr;
        }
        @media (min-width: 1024px) {
          .lg\\:grid-cols-\\[1\\.5fr_1fr\\] {
            grid-template-columns: 1.5fr 1fr;
          }
          .lg\\:grid-cols-2 {
            grid-template-columns: 1fr 1fr;
          }
        }
      `}</style>
    </div>
  );
};

export default SettingsPage;
