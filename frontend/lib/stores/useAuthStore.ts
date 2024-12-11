import { create } from 'zustand';
import { User } from '../types/auth';
import { fetchWithInterceptor } from '../utils/fetchInterceptor';

interface AuthState {
  user: User | null;
  loading: boolean;
  checkAuth: () => Promise<void>;
  logout: () => Promise<void>;
  refreshToken: () => Promise<boolean>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  loading: true,

  refreshToken: async () => {
    try {
      const response = await fetch('/api/auth/refresh', {
        method: 'POST',
        credentials: 'include',
      });

      if (response.ok) {
        const data = await response.json();
        set({ user: data });
        return true;
      }
      return false;
    } catch (error) {
      console.error('Error refreshing token:', error);
      return false;
    }
  },

  checkAuth: async () => {
    try {
      set({ loading: true });
      const response = await fetchWithInterceptor('/api/auth/check');

      if (response.ok) {
        const data = await response.json();
        set({ user: data });
      } else {
        set({ user: null });
      }
    } catch (error) {
      console.error('Auth error:', error);
      set({ user: null });
    } finally {
      set({ loading: false });
    }
  },

  logout: async () => {
    try {
      const response = await fetch('/api/auth/logout', {
        method: 'POST',
        credentials: 'include',
      });

      if (response.ok) {
        set({ user: null, loading: false });
      }
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
      set({ user: null, loading: false });
    }
  },
})); 