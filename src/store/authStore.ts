import { create } from 'zustand';
import { api, setToken } from '../services/api';

interface Agent {
  id: string;
  name: string;
  email: string;
  token: string;
}

interface AuthState {
  agent: Agent | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;

  login: (email: string, pass: string) => Promise<void>;
  logout: () => void;
  clearError: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  agent: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,

  login: async (email, pass) => {
    set({ isLoading: true, error: null });
    try {
      const data = await api.loginAgent(email, pass);
      set({
        agent: data,
        isAuthenticated: true,
        isLoading: false,
      });
    } catch (err: any) {
      set({
        error: err.message || 'Erro ao realizar login',
        isLoading: false,
        isAuthenticated: false,
        agent: null,
      });
    }
  },

  logout: () => {
    setToken(null);
    set({ agent: null, isAuthenticated: false });
  },

  clearError: () => set({ error: null }),
}));
