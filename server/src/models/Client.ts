import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../config/database.js';

export interface ClientAttributes {
  id: number;
  agent_id: number;
  name: string;
  email: string;
  phone?: string | null;
  created_at?: Date;
  updated_at?: Date;
}

export type ClientCreationAttributes = Optional<
  ClientAttributes,
  'id' | 'phone' | 'created_at' | 'updated_at'
>;

export class Client
  extends Model<ClientAttributes, ClientCreationAttributes>
  implements ClientAttributes
{
  declare id: number;
  declare agent_id: number;
  declare name: string;
  declare email: string;
  declare phone: string | null;
  declare readonly created_at: Date;
  declare readonly updated_at: Date;
}

Client.init(
  {
    id: {
      type: DataTypes.BIGINT.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    agent_id: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
      references: { model: 'agents', key: 'id' },
      onDelete: 'CASCADE',
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
    phone: {
      type: DataTypes.STRING(30),
      allowNull: true,
    },
  },
  {
    sequelize,
    tableName: 'clients',
    timestamps: true,
    underscored: true,
    indexes: [{ fields: ['agent_id'] }],
  }
);
