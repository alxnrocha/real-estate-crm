import { create } from 'zustand';
import { mockApi } from '../services/mockApi';

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

  // Actions
  login: (email: string, pass: string) => Promise<void>;
  logout: () => void;
  clearError: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  agent: {
    id: 'agent_1',
    name: 'Carlos Mendoza',
    email: 'agente@inmoflow.com',
    token: 'mock-agent-token-2026'
  },
  isAuthenticated: true,
  isLoading: false,
  error: null,

  login: async (email, pass) => {
    set({ isLoading: true, error: null });
    try {
      const data = await mockApi.loginAgent(email, pass);
      set({ 
        agent: data,
        isAuthenticated: true,
        isLoading: false
      });
    } catch (err: any) {
      set({ 
        error: err.message || 'Erro ao realizar login',
        isLoading: false,
        isAuthenticated: false,
        agent: null
      });
    }
  },

  logout: () => set({ agent: null, isAuthenticated: false }),
  clearError: () => set({ error: null })
}));
