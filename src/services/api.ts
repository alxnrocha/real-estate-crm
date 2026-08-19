import type { Property, PropertyStatus, PropertyType } from '../utils/mockData';

const BASE_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:5000/api/v1';

let _token: string | null = null;

export const setToken = (token: string | null) => {
  _token = token;
};

const defaultImage =
  'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=800&q=80';

interface RawProperty {
  id: number;
  title: string;
  address: string;
  price: string | number;
  type: PropertyType;
  status: PropertyStatus;
  bedrooms: number;
  bathrooms: number;
  area: number;
  image_url?: string | null;
}

const normalizeProperty = (raw: RawProperty): Property => ({
  id: String(raw.id),
  title: raw.title,
  address: raw.address,
  price: Number(raw.price),
  type: raw.type,
  status: raw.status,
  bedrooms: Number(raw.bedrooms),
  bathrooms: Number(raw.bathrooms),
  area: Number(raw.area),
  image: raw.image_url ?? defaultImage,
});

class ApiError extends Error {
  status: number;
  constructor(message: string, status: number) {
    super(message);
    this.status = status;
  }
}

async function request<T>(
  path: string,
  options: { method?: string; body?: unknown } = {}
): Promise<T> {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };
  if (_token) {
    headers.Authorization = `Bearer ${_token}`;
  }

  const res = await fetch(`${BASE_URL}${path}`, {
    method: options.method ?? 'GET',
    headers,
    body: options.body !== undefined ? JSON.stringify(options.body) : undefined,
  });

  const data = await res.json().catch(() => ({}));

  if (!res.ok) {
    const message =
      (data as { message?: string }).message ??
      data?.error ??
      `Request failed with status ${res.status}`;
    throw new ApiError(message, res.status);
  }

  return data as T;
}

export const api = {
  loginAgent: async (
    email: string,
    password: string
  ): Promise<{ id: string; name: string; email: string; token: string }> => {
    const data = await request<{
      token: string;
      agent: { id: number; name: string; email: string };
    }>('/auth/login', { method: 'POST', body: { email, password } });
    setToken(data.token);
    return {
      id: String(data.agent.id),
      name: data.agent.name,
      email: data.agent.email,
      token: data.token,
    };
  },

  fetchProperties: async (): Promise<Property[]> => {
    const data = await request<{ properties: RawProperty[] }>('/properties');
    return data.properties.map(normalizeProperty);
  },

  createProperty: async (
    propertyData: Omit<Property, 'id' | 'image' | 'status'>
  ): Promise<Property> => {
    const data = await request<{ property: RawProperty }>('/properties', {
      method: 'POST',
      body: propertyData,
    });
    return normalizeProperty(data.property);
  },

  fetchDashboardOverview: async () => {
    return request<{ metrics: Record<string, number> }>('/dashboard/overview');
  },

  fetchRecentActivity: async () => {
    return request<{ activity: unknown[] }>('/dashboard/activity');
  },
};
