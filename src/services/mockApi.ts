import { mockProperties, type Property } from '../utils/mockData';

const DELAY = 800; // Simulate network latency

export const mockApi = {
  fetchProperties: async (): Promise<Property[]> => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Simulate 5% network error rate to test error handling
        if (Math.random() < 0.05) {
          reject(new Error('Network Error: Failed to fetch properties.'));
        } else {
          resolve(mockProperties);
        }
      }, DELAY);
    });
  },

  loginAgent: async (email: string, password: string): Promise<{ id: string; name: string; email: string; token: string }> => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Basic mock: accept any valid-looking email
        if (email.includes('@') && password.length > 5) {
          resolve({
            id: 'agent-101',
            name: 'Corretor Teste',
            email,
            token: 'mock-jwt-token-xyz-789'
          });
        } else {
          reject(new Error('Credenciais inválidas. Use um e-mail válido e senha com mais de 5 caracteres.'));
        }
      }, DELAY);
    });
  },

  createProperty: async (propertyData: Omit<Property, 'id' | 'image' | 'status'>): Promise<Property> => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (Math.random() < 0.05) {
          reject(new Error('Error de red al crear propiedad.'));
        } else {
          const newProperty: Property = {
            id: Math.floor(Math.random() * 10000).toString(),
            ...propertyData,
            image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80',
            status: 'Available'
          };
          resolve(newProperty);
        }
      }, DELAY);
    });
  }
};
