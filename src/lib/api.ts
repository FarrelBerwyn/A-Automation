// src/lib/api.ts
import axios from 'axios';
import type { Lead, DashboardStats, ServiceType, LeadStatus } from '../types';

// Environment variable to toggle mock API
// Default to true for easy out-of-the-box local testing
const USE_MOCK = import.meta.env.VITE_USE_MOCK_API !== 'false';

// Set up Axios instance for real API calls
const apiInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '/api',
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

// Request interceptor to attach JWT token
apiInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem('a_auth_token');
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// -------------------------------------------------------------
// LOCALSTORAGE MOCK DATABASE SIMULATOR
// -------------------------------------------------------------

const SEED_LEADS: Lead[] = [
  {
    id: 'lead-1',
    name: 'Budi Santoso',
    whatsapp: '+6281234567890',
    email: 'budi@company.com',
    serviceType: 'TRAINING',
    projectDetail: 'Kami ingin mengotomasi proses rekap absensi dan laporan bulanan HR kami yang saat ini masih manual di Excel.',
    status: 'NEW',
    notes: 'Menunggu follow up pertama via WA',
    createdAt: '2026-05-30T14:32:00.000Z',
    updatedAt: '2026-05-30T14:32:00.000Z'
  },
  {
    id: 'lead-2',
    name: 'Amelia Wijaya',
    whatsapp: '+628119876543',
    email: 'amelia@financecorp.id',
    serviceType: 'JASA',
    projectDetail: 'Sistem invoicing otomatis terintegrasi dengan Payment Gateway untuk klien korporat kami. Butuh sinkronisasi data real-time.',
    status: 'IN_PROCESS',
    notes: 'Sudah dihubungi, sedang diskusi scope teknis',
    createdAt: '2026-05-28T09:15:00.000Z',
    updatedAt: '2026-05-29T10:00:00.000Z'
  },
  {
    id: 'lead-3',
    name: 'Rendra Pratama',
    whatsapp: '+6281355554444',
    email: 'rendra@techstart.io',
    serviceType: 'KEDUANYA',
    projectDetail: 'Training dasar otomasi workflow tim operasional (10 orang) dilanjutkan dengan jasa custom dashboard monitoring.',
    status: 'DONE',
    notes: 'Proyek training selesai, lanjut kontrak dev jasa.',
    createdAt: '2026-05-20T11:45:00.000Z',
    updatedAt: '2026-05-25T16:30:00.000Z'
  },
  {
    id: 'lead-4',
    name: 'Faisal Hakim',
    whatsapp: '+628571234567',
    email: 'faisal@logistikmaju.co.id',
    serviceType: 'JASA',
    projectDetail: 'Butuh integrasi API sistem kurir lokal dengan ERP warehouse kami untuk update status pengiriman otomatis.',
    status: 'NEW',
    notes: null,
    createdAt: '2026-05-31T08:00:00.000Z',
    updatedAt: '2026-05-31T08:00:00.000Z'
  },
  {
    id: 'lead-5',
    name: 'Citra Lestari',
    whatsapp: '+6281987654321',
    email: 'citra@estetikastudio.com',
    serviceType: 'TRAINING',
    projectDetail: 'Training otomasi marketing dan posting konten terjadwal di Instagram & TikTok untuk tim kreatif kami.',
    status: 'DONE',
    notes: 'Client puas dengan materinya.',
    createdAt: '2026-05-15T10:30:00.000Z',
    updatedAt: '2026-05-18T12:00:00.000Z'
  }
];

function getMockLeads(): Lead[] {
  const data = localStorage.getItem('mock_leads');
  if (!data) {
    localStorage.setItem('mock_leads', JSON.stringify(SEED_LEADS));
    return SEED_LEADS;
  }
  return JSON.parse(data);
}

function saveMockLeads(leads: Lead[]) {
  localStorage.setItem('mock_leads', JSON.stringify(leads));
}

// Get admin settings password
function getMockPassword(): string {
  const pass = localStorage.getItem('mock_admin_password');
  if (!pass) {
    localStorage.setItem('mock_admin_password', 'password123'); // Default password
    return 'password123';
  }
  return pass;
}

function setMockPassword(pass: string) {
  localStorage.setItem('mock_admin_password', pass);
}

// -------------------------------------------------------------
// API CLIENT IMPLEMENTATION
// -------------------------------------------------------------

export const api = {
  // Submit new lead (Public)
  submitLead: async (data: {
    name: string;
    whatsapp: string;
    email: string;
    serviceType: ServiceType;
    projectDetail: string;
  }) => {
    if (USE_MOCK) {
      await new Promise(resolve => setTimeout(resolve, 800)); // Simulate delay
      const leads = getMockLeads();
      const newLead: Lead = {
        id: 'lead-' + Math.random().toString(36).substring(2, 9),
        ...data,
        status: 'NEW',
        notes: null,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      leads.unshift(newLead);
      saveMockLeads(leads);
      return { success: true, data: { id: newLead.id, message: 'Lead berhasil dikirim' } };
    }
    const res = await apiInstance.post('/leads', data);
    return res.data;
  },

  // Auth: Login (Public)
  login: async (credentials: any) => {
    if (USE_MOCK) {
      await new Promise((resolve, reject) => {
        setTimeout(() => {
          const currentPass = getMockPassword();
          if (credentials.email === 'admin@a-automation.id' && credentials.password === currentPass) {
            resolve(true);
          } else {
            reject(new Error('Invalid email or password'));
          }
        }, 1000);
      });
      const admin = { id: 'admin-1', email: 'admin@a-automation.id', name: 'Macintosh Admin' };
      const token = 'mock-jwt-token-1984';
      return { success: true, data: { admin, token } };
    }
    const res = await apiInstance.post('/auth/login', credentials);
    return res.data;
  },

  // Auth: Logout (Protected)
  logout: async () => {
    if (USE_MOCK) {
      return { success: true };
    }
    const res = await apiInstance.post('/auth/logout');
    return res.data;
  },

  // Auth: Get current session (Protected)
  getMe: async () => {
    if (USE_MOCK) {
      const token = localStorage.getItem('a_auth_token');
      if (!token) throw new Error('Unauthorized');
      return { success: true, data: { id: 'admin-1', email: 'admin@a-automation.id', name: 'Macintosh Admin' } };
    }
    const res = await apiInstance.get('/auth/me');
    return res.data;
  },

  // Admin: Get Leads list with filters (Protected)
  getLeads: async (params: {
    page?: number;
    limit?: number;
    search?: string;
    status?: string;
    serviceType?: string;
    dateFrom?: string;
    dateTo?: string;
    sort?: string;
    order?: 'asc' | 'desc';
  }) => {
    if (USE_MOCK) {
      await new Promise(resolve => setTimeout(resolve, 500));
      let leads = getMockLeads();

      // Apply search
      if (params.search) {
        const s = params.search.toLowerCase();
        leads = leads.filter(l => l.name.toLowerCase().includes(s) || l.email.toLowerCase().includes(s));
      }

      // Apply status filter
      if (params.status) {
        leads = leads.filter(l => l.status === params.status);
      }

      // Apply service filter
      if (params.serviceType) {
        leads = leads.filter(l => l.serviceType === params.serviceType);
      }

      // Apply Date filters
      if (params.dateFrom) {
        const from = new Date(params.dateFrom).getTime();
        leads = leads.filter(l => new Date(l.createdAt).getTime() >= from);
      }
      if (params.dateTo) {
        const to = new Date(params.dateTo).getTime();
        leads = leads.filter(l => new Date(l.createdAt).getTime() <= to);
      }

      // Sorting
      const sortField = params.sort || 'createdAt';
      const isAsc = params.order === 'asc';
      leads.sort((a: any, b: any) => {
        let valA = a[sortField];
        let valB = b[sortField];
        
        if (typeof valA === 'string' && typeof valB === 'string') {
          return isAsc ? valA.localeCompare(valB) : valB.localeCompare(valA);
        }
        return isAsc ? (valA > valB ? 1 : -1) : (valB > valA ? 1 : -1);
      });

      // Pagination
      const page = params.page || 1;
      const limit = params.limit || 25;
      const total = leads.length;
      const totalPages = Math.ceil(total / limit);
      const offset = (page - 1) * limit;
      const paginatedLeads = leads.slice(offset, offset + limit);

      return {
        success: true,
        data: paginatedLeads,
        meta: {
          page,
          limit,
          total,
          totalPages
        }
      };
    }

    const res = await apiInstance.get('/admin/leads', { params });
    return res.data;
  },

  // Admin: Get specific Lead detail (Protected)
  getLeadById: async (id: string) => {
    if (USE_MOCK) {
      await new Promise(resolve => setTimeout(resolve, 300));
      const leads = getMockLeads();
      const lead = leads.find(l => l.id === id);
      if (!lead) throw new Error('Lead not found');
      return { success: true, data: lead };
    }
    const res = await apiInstance.get(`/admin/leads/${id}`);
    return res.data;
  },

  // Admin: Update status/notes (Protected)
  updateLead: async (id: string, data: { status?: LeadStatus; notes?: string }) => {
    if (USE_MOCK) {
      await new Promise(resolve => setTimeout(resolve, 400));
      const leads = getMockLeads();
      const index = leads.findIndex(l => l.id === id);
      if (index === -1) throw new Error('Lead not found');
      
      const updated = {
        ...leads[index],
        ...data,
        updatedAt: new Date().toISOString()
      };
      
      leads[index] = updated;
      saveMockLeads(leads);
      return { success: true, data: updated };
    }
    const res = await apiInstance.patch(`/admin/leads/${id}`, data);
    return res.data;
  },

  // Admin: Delete lead (Protected)
  deleteLead: async (id: string) => {
    if (USE_MOCK) {
      await new Promise(resolve => setTimeout(resolve, 400));
      const leads = getMockLeads();
      const filtered = leads.filter(l => l.id !== id);
      saveMockLeads(filtered);
      return { success: true, data: { deleted: true } };
    }
    const res = await apiInstance.delete(`/admin/leads/${id}`);
    return res.data;
  },

  // Admin: Get dynamic Dashboard Stats (Protected)
  getStats: async () => {
    if (USE_MOCK) {
      await new Promise(resolve => setTimeout(resolve, 500));
      const leads = getMockLeads();

      const total = leads.length;
      const newCount = leads.filter(l => l.status === 'NEW').length;
      const inProcess = leads.filter(l => l.status === 'IN_PROCESS').length;
      const done = leads.filter(l => l.status === 'DONE').length;

      // Build weekly chart data (last 8 weeks)
      // Group by weeks backwards from current date
      const weeklyChart: { week: string; count: number }[] = [];
      const now = new Date();

      for (let i = 7; i >= 0; i--) {
        const targetDate = new Date(now.getTime() - i * 7 * 24 * 60 * 60 * 1000);
        // Find week boundary
        const weekNum = getWeekNumber(targetDate);
        const label = `${targetDate.getFullYear()}-W${String(weekNum).padStart(2, '0')}`;
        
        // Count leads in that week
        // A simple approximation for mock representation
        const count = leads.filter(l => {
          const lDate = new Date(l.createdAt);
          const diffDays = Math.floor((now.getTime() - lDate.getTime()) / (1000 * 60 * 60 * 24));
          // If lead was submitted within the corresponding week bracket
          return diffDays >= (i * 7) && diffDays < ((i + 1) * 7);
        }).length;

        weeklyChart.push({ week: label, count: count + (i === 1 ? 2 : i === 2 ? 1 : 0) }); // Add slight variance so chart has visual flow
      }

      return {
        success: true,
        data: {
          total,
          new: newCount,
          inProcess,
          done,
          weeklyChart
        } as DashboardStats
      };
    }

    const res = await apiInstance.get('/admin/stats');
    return res.data;
  },

  // Admin: Change password (Protected)
  changePassword: async (data: any) => {
    if (USE_MOCK) {
      await new Promise((resolve, reject) => {
        setTimeout(() => {
          const currentPass = getMockPassword();
          if (data.currentPassword !== currentPass) {
            reject(new Error('Password saat ini salah'));
          } else {
            setMockPassword(data.newPassword);
            resolve(true);
          }
        }, 800);
      });
      return { success: true };
    }
    const res = await apiInstance.patch('/admin/settings/password', data);
    return res.data;
  },

  // Admin/Public: Get dynamic site text configurations
  getPublicSettings: async () => {
    if (USE_MOCK) {
      return {
        success: true,
        data: {
          heroLabel: '— SISTEM OTOMASI PROFESIONAL',
          heroTitle: 'Kerja lebih cerdas, bukan lebih keras.',
          heroSub: 'Kami membantu bisnis Anda bertransisi ke sistem otomasi yang efisien — melalui training intensif maupun pengerjaan langsung.',
          service1Title: 'Training A Automation',
          service1Desc: 'Program pelatihan intensif untuk individu maupun tim. Dari dasar hingga implementasi automation workflow di lingkungan kerja nyata.',
          service2Title: 'Jasa Pembuatan Sistem',
          service2Desc: 'Kami bangun sistem otomasi sesuai kebutuhan bisnis Anda — mulai dari integrasi tools, workflow design, hingga deployment dan maintenance.',
          whyTitle: 'Mengapa A Automation?',
          whyLabel: 'KOMITMEN LAYANAN',
        }
      };
    }
    const res = await apiInstance.get('/public/settings');
    return res.data;
  },

  // Admin: Update dynamic site text configurations (Protected)
  updateSiteSettings: async (data: any) => {
    if (USE_MOCK) {
      await new Promise(resolve => setTimeout(resolve, 800));
      return { success: true, data };
    }
    const res = await apiInstance.patch('/admin/settings/site', data);
    return res.data;
  }
};

// Helper to get ISO Week number
function getWeekNumber(d: Date): number {
  const date = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
  const dayNum = date.getUTCDay() || 7;
  date.setUTCDate(date.getUTCDate() + 4 - dayNum);
  const yearStart = new Date(Date.UTC(date.getUTCFullYear(), 0, 1));
  const weekNo = Math.ceil((((date.getTime() - yearStart.getTime()) / 86400000) + 1) / 7);
  return weekNo;
}
