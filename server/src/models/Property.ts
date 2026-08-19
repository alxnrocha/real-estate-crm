import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../config/database.js';

export type PropertyType = 'House' | 'Apartment' | 'Condo' | 'Villa' | 'Land';
export type PropertyStatus = 'Available' | 'Sold' | 'Rented' | 'Pending';

export interface PropertyAttributes {
  id: number;
  agent_id: number;
  client_id?: number | null;
  title: string;
  address: string;
  price: number;
  type: PropertyType;
  status: PropertyStatus;
  bedrooms: number;
  bathrooms: number;
  area: number;
  image_url?: string | null;
  created_at?: Date;
  updated_at?: Date;
}

export type PropertyCreationAttributes = Optional<
  PropertyAttributes,
  'id' | 'client_id' | 'status' | 'image_url' | 'created_at' | 'updated_at'
>;

export class Property
  extends Model<PropertyAttributes, PropertyCreationAttributes>
  implements PropertyAttributes
{
  declare id: number;
  declare agent_id: number;
  declare client_id: number | null;
  declare title: string;
  declare address: string;
  declare price: number;
  declare type: PropertyType;
  declare status: PropertyStatus;
  declare bedrooms: number;
  declare bathrooms: number;
  declare area: number;
  declare image_url: string | null;
  declare readonly created_at: Date;
  declare readonly updated_at: Date;
}

Property.init(
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
      onDelete: 'RESTRICT',
    },
    client_id: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: true,
      references: { model: 'clients', key: 'id' },
      onDelete: 'SET NULL',
    },
    title: {
      type: DataTypes.STRING(200),
      allowNull: false,
    },
    address: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    price: {
      type: DataTypes.DECIMAL(12, 2),
      allowNull: false,
      get() {
        const raw = this.getDataValue('price');
        return raw ? Number(raw) : 0;
      },
    },
    type: {
      type: DataTypes.ENUM('House', 'Apartment', 'Condo', 'Villa', 'Land'),
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM('Available', 'Sold', 'Rented', 'Pending'),
      allowNull: false,
      defaultValue: 'Available',
    },
    bedrooms: {
      type: DataTypes.TINYINT.UNSIGNED,
      allowNull: false,
      defaultValue: 0,
    },
    bathrooms: {
      type: DataTypes.TINYINT.UNSIGNED,
      allowNull: false,
      defaultValue: 0,
    },
    area: {
      type: DataTypes.DECIMAL(8, 2),
      allowNull: false,
      get() {
        const raw = this.getDataValue('area');
        return raw ? Number(raw) : 0;
      },
    },
    image_url: {
      type: DataTypes.STRING(500),
      allowNull: true,
    },
  },
  {
    sequelize,
    tableName: 'properties',
    timestamps: true,
    underscored: true,
    indexes: [
      { fields: ['agent_id'] },
      { fields: ['client_id'] },
      { fields: ['status'] },
      { fields: ['type'] },
      { fields: ['price'] },
    ],
  }
);
