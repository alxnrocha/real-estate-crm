import { create } from 'zustand';
import { Agent, apiMock } from '../utils/mockData';

interface AuthState {
  currentAgent: Agent | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  
  // Actions
  login: (email: string) => Promise<void>;
  logout: () => void;
  checkSession: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  currentAgent: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,

  login: async (email: string) => {
    set({ isLoading: true, error: null });
    
    try {
      // Simulate API call to fetch agents
      const agents = await apiMock.getAgents();
      
      // Find the agent with the matching email
      const agent = agents.find(a => a.email.toLowerCase() === email.toLowerCase());
      
      if (agent) {
        set({ 
          currentAgent: agent, 
          isAuthenticated: true,
          isLoading: false 
        });
      } else {
        set({ 
          error: 'Credenciales inválidas. Agente no encontrado.', 
          isLoading: false 
        });
      }
    } catch (error) {
      set({ 
        error: 'Error al conectar con el servidor.', 
        isLoading: false 
      });
    }
  },

  logout: () => {
    set({ 
      currentAgent: null, 
      isAuthenticated: false 
    });
  },

  checkSession: async () => {
    // Simulated function for when we connect a real backend
    // For now, it just resolves immediately
    return Promise.resolve();
  }
}));
