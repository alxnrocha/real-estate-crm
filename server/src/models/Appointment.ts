import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../config/database.js';

export type AppointmentStatus = 'Scheduled' | 'Completed' | 'Cancelled';

export interface AppointmentAttributes {
  id: number;
  property_id: number;
  client_id: number;
  agent_id: number;
  scheduled_at: Date;
  status: AppointmentStatus;
  notes?: string | null;
  created_at?: Date;
  updated_at?: Date;
}

export type AppointmentCreationAttributes = Optional<
  AppointmentAttributes,
  'id' | 'status' | 'notes' | 'created_at' | 'updated_at'
>;

export class Appointment
  extends Model<AppointmentAttributes, AppointmentCreationAttributes>
  implements AppointmentAttributes
{
  declare id: number;
  declare property_id: number;
  declare client_id: number;
  declare agent_id: number;
  declare scheduled_at: Date;
  declare status: AppointmentStatus;
  declare notes: string | null;
  declare readonly created_at: Date;
  declare readonly updated_at: Date;
}

Appointment.init(
  {
    id: {
      type: DataTypes.BIGINT.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    property_id: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
      references: { model: 'properties', key: 'id' },
      onDelete: 'CASCADE',
    },
    client_id: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
      references: { model: 'clients', key: 'id' },
      onDelete: 'CASCADE',
    },
    agent_id: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
      references: { model: 'agents', key: 'id' },
      onDelete: 'CASCADE',
    },
    scheduled_at: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM('Scheduled', 'Completed', 'Cancelled'),
      allowNull: false,
      defaultValue: 'Scheduled',
    },
    notes: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  },
  {
    sequelize,
    tableName: 'appointments',
    timestamps: true,
    underscored: true,
    indexes: [
      { fields: ['property_id'] },
      { fields: ['client_id'] },
      { fields: ['agent_id'] },
      { fields: ['scheduled_at'] },
    ],
  }
);
