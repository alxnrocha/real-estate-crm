import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../config/database.js';

export interface AgentAttributes {
  id: number;
  name: string;
  email: string;
  password_hash: string;
  role: 'admin' | 'agent';
  created_at?: Date;
  updated_at?: Date;
}

export type AgentCreationAttributes = Optional<
  AgentAttributes,
  'id' | 'role' | 'created_at' | 'updated_at'
>;

export class Agent
  extends Model<AgentAttributes, AgentCreationAttributes>
  implements AgentAttributes
{
  declare id: number;
  declare name: string;
  declare email: string;
  declare password_hash: string;
  declare role: 'admin' | 'agent';
  declare readonly created_at: Date;
  declare readonly updated_at: Date;
}

Agent.init(
  {
    id: {
      type: DataTypes.BIGINT.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(120),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: true,
      validate: { isEmail: true },
    },
    password_hash: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    role: {
      type: DataTypes.ENUM('admin', 'agent'),
      allowNull: false,
      defaultValue: 'agent',
    },
  },
  {
    sequelize,
    tableName: 'agents',
    timestamps: true,
    underscored: true,
  }
);
