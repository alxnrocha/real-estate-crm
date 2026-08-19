import request from 'supertest';
import { beforeAll, afterAll, describe, it, expect } from 'vitest';
import app from '../server.js';
import { sequelize } from '../models/index.js';
import { runMigrations } from '../scripts/migrate.js';

let dbReady = false;
let token = '';
let propertyId = 0;
let clientId = 0;
let appointmentId = 0;

const email = `integration.${Date.now()}@inmoflow.com`;

beforeAll(async () => {
  try {
    await sequelize.authenticate();
    await runMigrations();
    await sequelize.query('SET FOREIGN_KEY_CHECKS = 0');
    await Promise.all(
      ['appointments', 'properties', 'clients', 'agents'].map((t) =>
        sequelize.query(`TRUNCATE TABLE \`${t}\``)
      )
    );
    await sequelize.query('SET FOREIGN_KEY_CHECKS = 1');
    dbReady = true;
  } catch {
    console.warn('⏭️  Base de datos no disponible, pruebas de integración omitidas.');
    dbReady = false;
  }
});

afterAll(async () => {
  if (dbReady) {
    try {
      await sequelize.query('SET FOREIGN_KEY_CHECKS = 0');
      for (const t of ['appointments', 'properties', 'clients', 'agents']) {
        await sequelize.query(`TRUNCATE TABLE \`${t}\``);
      }
      await sequelize.query('SET FOREIGN_KEY_CHECKS = 1');
    } catch {
      /* best-effort cleanup */
    }
  }
  await sequelize.close();
});

describe('Full-stack integration flow against MySQL', () => {
  it.skipIf(!dbReady)('registers an agent and returns a JWT', async () => {
    const res = await request(app).post('/api/v1/auth/register').send({
      name: 'Integration Agent',
      email,
      password: 'Password123!',
      role: 'admin',
    });
    expect(res.status).toBe(201);
    expect(res.body.token).toBeTruthy();
    token = res.body.token;
  });

  it.skipIf(!dbReady)('creates a client', async () => {
    const res = await request(app)
      .post('/api/v1/clients')
      .set('Authorization', `Bearer ${token}`)
      .send({ name: 'Aurora Peña', email: 'aurora@cliente.io', phone: '+34 611 222 333' });
    expect(res.status).toBe(201);
    clientId = res.body.client.id;
  });

  it.skipIf(!dbReady)('creates a property via the authenticated API', async () => {
    const res = await request(app)
      .post('/api/v1/properties')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'Casa de prueba moderna',
        address: 'Carrer de la Prueba 1, Barcelona',
        price: 350000,
        type: 'House',
        bedrooms: 3,
        bathrooms: 2,
        area: 140,
        client_id: clientId,
        image_url: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa',
      });
    expect(res.status).toBe(201);
    propertyId = res.body.property.id;
    expect(res.body.property.status).toBe('Available');
  });

  it.skipIf(!dbReady)('lists properties with server-side filters and pagination', async () => {
    const res = await request(app)
      .get('/api/v1/properties')
      .set('Authorization', `Bearer ${token}`)
      .query({ type: 'House', min_bedrooms: 2, page: 1, limit: 5 });
    expect(res.status).toBe(200);
    expect(res.body.pagination).toBeDefined();
    expect(res.body.properties.length).toBeGreaterThan(0);
  });

  it.skipIf(!dbReady)('rejects invalid query params with 400', async () => {
    const res = await request(app)
      .get('/api/v1/properties')
      .set('Authorization', `Bearer ${token}`)
      .query({ limit: 500 });
    expect(res.status).toBe(400);
    expect(res.body.error).toBe('Validation Error');
  });

  it.skipIf(!dbReady)('updates a property status', async () => {
    const res = await request(app)
      .patch(`/api/v1/properties/${propertyId}/status`)
      .set('Authorization', `Bearer ${token}`)
      .send({ status: 'Sold' });
    expect(res.status).toBe(200);
    expect(res.body.property.status).toBe('Sold');
  });

  it.skipIf(!dbReady)('schedules an appointment for the property', async () => {
    const res = await request(app)
      .post('/api/v1/appointments')
      .set('Authorization', `Bearer ${token}`)
      .send({
        property_id: propertyId,
        client_id: clientId,
        scheduled_at: new Date(Date.now() + 86400000).toISOString(),
      });
    expect(res.status).toBe(201);
    appointmentId = res.body.appointment.id;
    expect(appointmentId).toBeGreaterThan(0);
    expect(res.body.appointment.status).toBe('Scheduled');
  });

  it.skipIf(!dbReady)('updates the appointment status to Completed', async () => {
    const res = await request(app)
      .patch(`/api/v1/appointments/${appointmentId}/status`)
      .set('Authorization', `Bearer ${token}`)
      .send({ status: 'Completed' });
    expect(res.status).toBe(200);
    expect(res.body.appointment.status).toBe('Completed');
  });

  it.skipIf(!dbReady)('loads dashboard overview metrics', async () => {
    const res = await request(app)
      .get('/api/v1/dashboard/overview')
      .set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(200);
    expect(res.body.metrics.total_properties).toBe(1);
  });
});
