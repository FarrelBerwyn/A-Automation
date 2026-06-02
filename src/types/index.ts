// types/index.ts

export type ServiceType = 'TRAINING' | 'JASA' | 'KEDUANYA';

export type LeadStatus = 'NEW' | 'IN_PROCESS' | 'DONE';

export interface Lead {
  id: string;
  name: string;
  whatsapp: string;
  email: string;
  serviceType: ServiceType;
  projectDetail: string;
  status: LeadStatus;
  notes?: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface Admin {
  id: string;
  email: string;
  name?: string | null;
}

export interface DashboardStats {
  total: number;
  new: number;
  inProcess: number;
  done: number;
  weeklyChart: {
    week: string;
    count: number;
  }[];
}
