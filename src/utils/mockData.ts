// Types corresponding to the SQL schema

export type PropertyType = 'HOUSE' | 'APARTMENT' | 'CONDO' | 'COMMERCIAL';
export type PropertyStatus = 'AVAILABLE' | 'PENDING' | 'SOLD';
export type ClientStatus = 'LEAD' | 'ACTIVE' | 'INACTIVE';
export type AppointmentStatus = 'SCHEDULED' | 'COMPLETED' | 'CANCELLED';

export interface Agent {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar_url?: string;
  created_at: string;
}

export interface Client {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  status: ClientStatus;
  agent_id: string | null;
  created_at: string;
}

export interface Property {
  id: string;
  title: string;
  description: string;
  price: number;
  property_type: PropertyType;
  status: PropertyStatus;
  bedrooms: number;
  bathrooms: number;
  square_meters: number;
  address: string;
  city: string;
  state: string;
  zip_code: string;
  agent_id: string;
  created_at: string;
  updated_at: string;
}

export interface Appointment {
  id: string;
  agent_id: string;
  client_id: string;
  property_id: string | null;
  appointment_date: string;
  status: AppointmentStatus;
  notes?: string;
  created_at: string;
}

// Mock Data

export const mockAgents: Agent[] = [
  {
    id: 'a1b2c3d4-0000-0000-0000-111111111111',
    name: 'Sarah Jenkins',
    email: 'sarah.jenkins@lumina-estates.com',
    phone: '+34 600 123 456',
    avatar_url: 'https://i.pravatar.cc/150?u=sarah',
    created_at: new Date('2025-01-15T10:00:00Z').toISOString(),
  },
  {
    id: 'a1b2c3d4-0000-0000-0000-222222222222',
    name: 'Carlos Mendoza',
    email: 'carlos.mendoza@lumina-estates.com',
    phone: '+34 600 654 321',
    avatar_url: 'https://i.pravatar.cc/150?u=carlos',
    created_at: new Date('2025-02-20T11:30:00Z').toISOString(),
  }
];

export const mockClients: Client[] = [
  {
    id: 'c1c1c1c1-0000-0000-0000-111111111111',
    first_name: 'Elena',
    last_name: 'Rodríguez',
    email: 'elena.rodriguez@example.com',
    phone: '+34 611 222 333',
    status: 'ACTIVE',
    agent_id: mockAgents[0].id,
    created_at: new Date('2026-05-10T09:00:00Z').toISOString(),
  },
  {
    id: 'c1c1c1c1-0000-0000-0000-222222222222',
    first_name: 'Miguel',
    last_name: 'Álvarez',
    email: 'miguel.alvarez@example.com',
    phone: '+34 622 333 444',
    status: 'LEAD',
    agent_id: mockAgents[1].id,
    created_at: new Date('2026-06-01T14:15:00Z').toISOString(),
  },
  {
    id: 'c1c1c1c1-0000-0000-0000-333333333333',
    first_name: 'Sofia',
    last_name: 'García',
    email: 'sofia.garcia@example.com',
    phone: '+34 633 444 555',
    status: 'INACTIVE',
    agent_id: mockAgents[0].id,
    created_at: new Date('2025-11-20T16:45:00Z').toISOString(),
  }
];

export const mockProperties: Property[] = [
  {
    id: 'p1p1p1p1-0000-0000-0000-111111111111',
    title: 'Modern Apartment in City Center',
    description: 'Beautiful, freshly renovated 2-bedroom apartment with a stunning view of the skyline. Walking distance to the metro.',
    price: 350000,
    property_type: 'APARTMENT',
    status: 'AVAILABLE',
    bedrooms: 2,
    bathrooms: 2,
    square_meters: 85,
    address: 'Calle Mayor 12',
    city: 'Madrid',
    state: 'Madrid',
    zip_code: '28013',
    agent_id: mockAgents[0].id,
    created_at: new Date('2026-01-10T08:00:00Z').toISOString(),
    updated_at: new Date('2026-01-10T08:00:00Z').toISOString(),
  },
  {
    id: 'p1p1p1p1-0000-0000-0000-222222222222',
    title: 'Luxury Villa with Private Pool',
    description: 'Spacious 4-bedroom villa featuring a large garden, infinity pool, and modern kitchen. Perfect for families.',
    price: 1250000,
    property_type: 'HOUSE',
    status: 'AVAILABLE',
    bedrooms: 4,
    bathrooms: 3,
    square_meters: 250,
    address: 'Avenida de la Ilustración 45',
    city: 'Marbella',
    state: 'Málaga',
    zip_code: '29602',
    agent_id: mockAgents[1].id,
    created_at: new Date('2026-03-22T10:30:00Z').toISOString(),
    updated_at: new Date('2026-04-05T12:00:00Z').toISOString(),
  },
  {
    id: 'p1p1p1p1-0000-0000-0000-333333333333',
    title: 'Cozy Studio near University',
    description: 'Ideal for students or young professionals. Open concept, newly furnished, close to public transport.',
    price: 150000,
    property_type: 'APARTMENT',
    status: 'PENDING',
    bedrooms: 1,
    bathrooms: 1,
    square_meters: 45,
    address: 'Calle Universitaria 8',
    city: 'Valencia',
    state: 'Valencia',
    zip_code: '46022',
    agent_id: mockAgents[0].id,
    created_at: new Date('2026-06-15T09:15:00Z').toISOString(),
    updated_at: new Date('2026-07-01T15:20:00Z').toISOString(),
  },
  {
    id: 'p1p1p1p1-0000-0000-0000-444444444444',
    title: 'Commercial Space in High Traffic Area',
    description: 'Prime location for retail or restaurant. High ceilings, large storefront windows.',
    price: 850000,
    property_type: 'COMMERCIAL',
    status: 'SOLD',
    bedrooms: 0,
    bathrooms: 2,
    square_meters: 150,
    address: 'Gran Vía 88',
    city: 'Madrid',
    state: 'Madrid',
    zip_code: '28013',
    agent_id: mockAgents[1].id,
    created_at: new Date('2025-10-10T11:00:00Z').toISOString(),
    updated_at: new Date('2026-02-28T14:45:00Z').toISOString(),
  }
];

export const mockAppointments: Appointment[] = [
  {
    id: 'a1a1a1a1-0000-0000-0000-111111111111',
    agent_id: mockAgents[0].id,
    client_id: mockClients[0].id,
    property_id: mockProperties[0].id,
    appointment_date: new Date(Date.now() + 86400000 * 2).toISOString(), // 2 days from now
    status: 'SCHEDULED',
    notes: 'Client is very interested in the location. Wants to check the natural light.',
    created_at: new Date().toISOString(),
  },
  {
    id: 'a1a1a1a1-0000-0000-0000-222222222222',
    agent_id: mockAgents[1].id,
    client_id: mockClients[1].id,
    property_id: mockProperties[1].id,
    appointment_date: new Date(Date.now() - 86400000 * 5).toISOString(), // 5 days ago
    status: 'COMPLETED',
    notes: 'Tour completed. Client requested floor plans to consider renovations.',
    created_at: new Date(Date.now() - 86400000 * 7).toISOString(),
  }
];

// Simple async mock functions to simulate API calls
export const apiMock = {
  getProperties: async (): Promise<Property[]> => {
    return new Promise((resolve) => setTimeout(() => resolve(mockProperties), 800));
  },
  
  getAgents: async (): Promise<Agent[]> => {
    return new Promise((resolve) => setTimeout(() => resolve(mockAgents), 600));
  },
  
  getClients: async (): Promise<Client[]> => {
    return new Promise((resolve) => setTimeout(() => resolve(mockClients), 700));
  },
  
  getAppointments: async (): Promise<Appointment[]> => {
    return new Promise((resolve) => setTimeout(() => resolve(mockAppointments), 500));
  }
};
