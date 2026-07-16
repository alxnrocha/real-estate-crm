import { create } from 'zustand';

export type ViewMode = 'grid' | 'list';
export type Currency = 'EUR' | 'USD';
export type Theme = 'light' | 'dark' | 'system';

interface ConfigState {
  viewMode: ViewMode;
  currency: Currency;
  theme: Theme;
  
  // Actions
  setViewMode: (mode: ViewMode) => void;
  setCurrency: (currency: Currency) => void;
  setTheme: (theme: Theme) => void;
}

export const useConfigStore = create<ConfigState>((set) => ({
  viewMode: 'grid',
  currency: 'EUR',
  theme: 'system',

  setViewMode: (mode) => set({ viewMode: mode }),
  setCurrency: (currency) => set({ currency }),
  setTheme: (theme) => set({ theme }),
}));
