import { create } from 'zustand';
import { PropertyType, PropertyStatus } from '../utils/mockData';

export interface PropertyFilters {
  searchTerm: string;
  propertyType: PropertyType | 'ALL';
  status: PropertyStatus | 'ALL';
  minPrice: number | null;
  maxPrice: number | null;
  minBedrooms: number | null;
}

interface FilterState {
  filters: PropertyFilters;
  
  // Actions
  setSearchTerm: (term: string) => void;
  setPropertyType: (type: PropertyType | 'ALL') => void;
  setStatus: (status: PropertyStatus | 'ALL') => void;
  setPriceRange: (min: number | null, max: number | null) => void;
  setMinBedrooms: (bedrooms: number | null) => void;
  clearFilters: () => void;
}

const initialFilters: PropertyFilters = {
  searchTerm: '',
  propertyType: 'ALL',
  status: 'ALL',
  minPrice: null,
  maxPrice: null,
  minBedrooms: null,
};

export const useFilterStore = create<FilterState>((set) => ({
  filters: initialFilters,

  setSearchTerm: (term) => 
    set((state) => ({ filters: { ...state.filters, searchTerm: term } })),
    
  setPropertyType: (type) => 
    set((state) => ({ filters: { ...state.filters, propertyType: type } })),
    
  setStatus: (status) => 
    set((state) => ({ filters: { ...state.filters, status } })),
    
  setPriceRange: (min, max) => 
    set((state) => ({ filters: { ...state.filters, minPrice: min, maxPrice: max } })),
    
  setMinBedrooms: (bedrooms) => 
    set((state) => ({ filters: { ...state.filters, minBedrooms: bedrooms } })),
    
  clearFilters: () => set({ filters: initialFilters })
}));
