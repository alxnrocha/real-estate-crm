import { sequelize } from '../config/database.js';
import { Agent } from './Agent.js';
import { Client } from './Client.js';
import { Property } from './Property.js';
import { Appointment } from './Appointment.js';

// 1. Agent <-> Client
Agent.hasMany(Client, { foreignKey: 'agent_id', as: 'clients' });
Client.belongsTo(Agent, { foreignKey: 'agent_id', as: 'agent' });

// 2. Agent <-> Property
Agent.hasMany(Property, { foreignKey: 'agent_id', as: 'properties' });
Property.belongsTo(Agent, { foreignKey: 'agent_id', as: 'agent' });

// 3. Client <-> Property
Client.hasMany(Property, { foreignKey: 'client_id', as: 'properties' });
Property.belongsTo(Client, { foreignKey: 'client_id', as: 'owner' });

// 4. Agent <-> Appointment
Agent.hasMany(Appointment, { foreignKey: 'agent_id', as: 'appointments' });
Appointment.belongsTo(Agent, { foreignKey: 'agent_id', as: 'agent' });

// 5. Client <-> Appointment
Client.hasMany(Appointment, { foreignKey: 'client_id', as: 'appointments' });
Appointment.belongsTo(Client, { foreignKey: 'client_id', as: 'client' });

// 6. Property <-> Appointment
Property.hasMany(Appointment, {
  foreignKey: 'property_id',
  as: 'appointments',
  onDelete: 'CASCADE',
});
Appointment.belongsTo(Property, { foreignKey: 'property_id', as: 'property' });

export { sequelize, Agent, Client, Property, Appointment };
export type { AgentAttributes } from './Agent.js';
export type { ClientAttributes } from './Client.js';
export type { PropertyAttributes, PropertyType, PropertyStatus } from './Property.js';
export type { AppointmentAttributes, AppointmentStatus } from './Appointment.js';
