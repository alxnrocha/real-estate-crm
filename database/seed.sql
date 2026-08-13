-- Seed data for the Real Estate CRM.
-- Matches the frontend mock in src/utils/mockData.ts and src/services/mockApi.ts.

USE real_estate_crm;

INSERT INTO agents (name, email, password_hash, role) VALUES
  ('Corretor Teste', 'corretor@agenciacrm.com', '$2b$10$REPLACE_WITH_REAL_BCRYPT_HASH', 'admin');

INSERT INTO clients (agent_id, name, email, phone) VALUES
  (1, 'Maria García', 'maria.garcia@example.com', '+34 600 111 222'),
  (1, 'Joan Puig', 'joan.puig@example.com', '+34 600 333 444');

INSERT INTO properties
  (agent_id, client_id, title, address, price, type, status, bedrooms, bathrooms, area, image_url)
VALUES
  (1, 1, 'Villa Moderna con Piscina', 'Carrer de la Marina 120, Barcelona', 850000.00,
   'Villa', 'Available', 4, 3, 250.00, 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9'),
  (1, NULL, 'Ático con vistas al mar', 'Passeig de Gràcia 45, Barcelona', 1200000.00,
   'Apartment', 'Pending', 3, 2, 150.00, 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750'),
  (1, 2, 'Casa familiar tranquila', 'Carrer de Sants 300, Barcelona', 450000.00,
   'House', 'Sold', 3, 2, 120.00, 'https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83');

INSERT INTO appointments (property_id, client_id, agent_id, scheduled_at, status, notes) VALUES
  (1, 1, 1, '2026-08-20 10:00:00', 'Scheduled', 'Visita para ver la piscina y el garaje.'),
  (2, 2, 1, '2026-08-18 16:30:00', 'Scheduled', NULL);
