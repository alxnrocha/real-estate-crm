import request from 'supertest';
import { describe, it, expect } from 'vitest';
import app from '../server.js';

describe('Healthcheck & API Info Endpoints', () => {
  it('GET /health should return 200 with status healthy', async () => {
    const res = await request(app).get('/health');
    expect(res.status).toBe(200);
    expect(res.body.status).toBe('healthy');
  });

  it('GET /api/v1 should return API metadata', async () => {
    const res = await request(app).get('/api/v1');
    expect(res.status).toBe(200);
    expect(res.body.message).toBe('Real Estate CRM API v1');
  });

  it('GET an unknown route should return 404 JSON', async () => {
    const res = await request(app).get('/no-such-route');
    expect(res.status).toBe(404);
    expect(res.body.error).toBe('Not Found');
  });
});
