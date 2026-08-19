import bcrypt from 'bcryptjs';
import { sequelize, Agent, Client, Property, Appointment } from '../models/index.js';
import { runMigrations } from './migrate.js';

async function clearAllTables() {
  await sequelize.query('SET FOREIGN_KEY_CHECKS = 0');
  for (const table of ['appointments', 'properties', 'clients', 'agents']) {
    await sequelize.query(`TRUNCATE TABLE \`${table}\``);
  }
  await sequelize.query('SET FOREIGN_KEY_CHECKS = 1');
}

async function seed() {
  console.log('🌱 Iniciando población de datos de demostración Real Estate CRM...');

  try {
    await runMigrations();
    console.log('✅ Esquema de base de datos actualizado vía migraciones.');

    await clearAllTables();
    console.log('✅ Tablas vaciadas correctamente.');

    const hashedPassword = await bcrypt.hash('Password123!', 10);

    const agents = await Agent.bulkCreate([
      {
        id: 1,
        name: 'Carlos Mendoza',
        email: 'agente@inmoflow.com',
        password_hash: hashedPassword,
        role: 'admin',
      },
      {
        id: 2,
        name: 'Laura Vidal',
        email: 'laura.vidal@inmoflow.com',
        password_hash: hashedPassword,
        role: 'agent',
      },
    ]);
    console.log(`✅ ${agents.length} agentes inmobiliarios creados.`);

    const clients = await Client.bulkCreate([
      {
        id: 1,
        agent_id: 1,
        name: 'Maria García',
        email: 'maria.garcia@example.com',
        phone: '+34 600 111 222',
      },
      {
        id: 2,
        agent_id: 1,
        name: 'Joan Puig',
        email: 'joan.puig@example.com',
        phone: '+34 600 333 444',
      },
      {
        id: 3,
        agent_id: 2,
        name: 'Sofía Ribas',
        email: 'sofia.ribas@example.com',
        phone: '+34 600 555 666',
      },
    ]);
    console.log(`✅ ${clients.length} clientes creados.`);

    const properties = await Property.bulkCreate([
      {
        id: 1,
        agent_id: 1,
        client_id: 1,
        title: 'Villa Moderna con Piscina',
        address: 'Carrer de la Marina 120, Barcelona',
        price: 850000,
        type: 'Villa',
        status: 'Available',
        bedrooms: 4,
        bathrooms: 3,
        area: 250,
        image_url: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9',
      },
      {
        id: 2,
        agent_id: 1,
        client_id: null,
        title: 'Ático con vistas al mar',
        address: 'Passeig de Gràcia 45, Barcelona',
        price: 1200000,
        type: 'Apartment',
        status: 'Pending',
        bedrooms: 3,
        bathrooms: 2,
        area: 150,
        image_url: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750',
      },
      {
        id: 3,
        agent_id: 1,
        client_id: 2,
        title: 'Casa familiar tranquila',
        address: 'Carrer de Sants 300, Barcelona',
        price: 450000,
        type: 'House',
        status: 'Sold',
        bedrooms: 3,
        bathrooms: 2,
        area: 120,
        image_url: 'https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83',
      },
      {
        id: 4,
        agent_id: 2,
        client_id: 3,
        title: 'Piso céntrico reformado',
        address: "Carrer de l'Hospital 88, Barcelona",
        price: 320000,
        type: 'Apartment',
        status: 'Available',
        bedrooms: 2,
        bathrooms: 1,
        area: 75,
        image_url: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267',
      },
    ]);
    console.log(`✅ ${properties.length} propiedades creadas.`);

    const appointments = await Appointment.bulkCreate([
      {
        id: 1,
        property_id: 1,
        client_id: 1,
        agent_id: 1,
        scheduled_at: new Date(),
        status: 'Scheduled',
        notes: 'Visita para ver la piscina y el garaje.',
      },
      {
        id: 2,
        property_id: 2,
        client_id: 2,
        agent_id: 1,
        scheduled_at: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
        status: 'Scheduled',
        notes: null,
      },
    ]);
    console.log(`✅ ${appointments.length} citas creadas.`);

    console.log('\n🎉 ¡Base de datos poblada con éxito!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error durante el seed:', error);
    process.exit(1);
  }
}

seed();
