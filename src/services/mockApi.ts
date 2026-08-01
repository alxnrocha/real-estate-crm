import { mockProperties, type Property } from '../utils/mockData';

const DELAY = 800; // Simular latência de rede

export const mockApi = {
  // Simular requisição de propriedades
  fetchProperties: async (): Promise<Property[]> => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Simular 5% de chance de erro de rede para testar tratamento de erros
        if (Math.random() < 0.05) {
          reject(new Error('Network Error: Failed to fetch properties.'));
        } else {
          resolve(mockProperties);
        }
      }, DELAY);
    });
  },

  // Simular requisição de login
  loginAgent: async (email: string, password: string): Promise<{ id: string; name: string; email: string; token: string }> => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Mock simples: aceita qualquer login que contenha '@' e senha maior que 5 char
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
  }
};
