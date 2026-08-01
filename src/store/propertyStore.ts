import { create } from 'zustand';
import type { Property } from '../utils/mockData';
import { mockApi } from '../services/mockApi';

interface PropertyState {
  properties: Property[];
  isLoading: boolean;
  error: string | null;
  
  // Actions
  fetchProperties: () => Promise<void>;
  addProperty: (property: Omit<Property, 'id' | 'image' | 'status'>) => Promise<void>;
}

export const usePropertyStore = create<PropertyState>((set) => ({
  properties: [],
  isLoading: false,
  error: null,

  fetchProperties: async () => {
    set({ isLoading: true, error: null });
    try {
      const data = await mockApi.fetchProperties();
      set({ properties: data, isLoading: false });
    } catch (err: any) {
      set({ error: err.message, isLoading: false });
    }
  },

  addProperty: async (propertyData) => {
    set({ isLoading: true, error: null });
    try {
      const newProp = await mockApi.createProperty(propertyData);
      set((state) => ({ 
        properties: [newProp, ...state.properties],
        isLoading: false 
      }));
    } catch (err: any) {
      set({ error: err.message, isLoading: false });
      throw err;
    }
  }
}));
