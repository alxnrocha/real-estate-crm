import request from 'supertest';
import { describe, it, expect } from 'vitest';
import app from '../server.js';

describe('Protected Endpoints (JWT)', () => {
  const protectedRoutes: { method: 'get' | 'post' | 'put' | 'patch' | 'delete'; path: string }[] = [
    { method: 'get', path: '/api/v1/properties' },
    { method: 'get', path: '/api/v1/clients' },
    { method: 'get', path: '/api/v1/appointments' },
    { method: 'get', path: '/api/v1/dashboard/overview' },
    { method: 'get', path: '/api/v1/dashboard/activity' },
    { method: 'post', path: '/api/v1/properties' },
    { method: 'post', path: '/api/v1/clients' },
    { method: 'post', path: '/api/v1/appointments' },
    { method: 'put', path: '/api/v1/properties/1' },
    { method: 'patch', path: '/api/v1/properties/1/status' },
    { method: 'delete', path: '/api/v1/properties/1' },
  ];

  it.each(protectedRoutes)(
    'should reject $method $path with 401 when no Bearer token is provided',
    async ({ method, path }) => {
      const res = await request(app)[method](path).send({});
      expect(res.status).toBe(401);
      expect(res.body.error).toBe('Unauthorized');
    }
  );

  it('should reject access with an invalid Bearer token', async () => {
    const res = await request(app)
      .get('/api/v1/properties')
      .set('Authorization', 'Bearer this-is-not-a-valid-token');
    expect(res.status).toBe(401);
    expect(res.body.message).toBe('Token inválido o expirado.');
  });
});
