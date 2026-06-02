// src/store/authStore.ts
import { create } from 'zustand';
import type { Admin } from '../types';

interface AuthState {
  isAuthenticated: boolean;
  admin: Admin | null;
  token: string | null;
  isLoading: boolean;
  login: (admin: Admin, token: string) => void;
  logout: () => void;
  setLoading: (isLoading: boolean) => void;
  checkAuth: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: false,
  admin: null,
  token: null,
  isLoading: true,
  login: (admin, token) => {
    localStorage.setItem('a_auth_token', token);
    localStorage.setItem('a_auth_admin', JSON.stringify(admin));
    set({ isAuthenticated: true, admin, token, isLoading: false });
  },
  logout: () => {
    localStorage.removeItem('a_auth_token');
    localStorage.removeItem('a_auth_admin');
    set({ isAuthenticated: false, admin: null, token: null, isLoading: false });
  },
  setLoading: (isLoading) => set({ isLoading }),
  checkAuth: () => {
    const token = localStorage.getItem('a_auth_token');
    const adminStr = localStorage.getItem('a_auth_admin');
    
    if (token && adminStr) {
      try {
        const admin = JSON.parse(adminStr) as Admin;
        set({ isAuthenticated: true, admin, token, isLoading: false });
      } catch (e) {
        localStorage.removeItem('a_auth_token');
        localStorage.removeItem('a_auth_admin');
        set({ isAuthenticated: false, admin: null, token: null, isLoading: false });
      }
    } else {
      set({ isAuthenticated: false, admin: null, token: null, isLoading: false });
    }
  }
}));
