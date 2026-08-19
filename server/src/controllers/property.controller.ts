import { Request, Response, NextFunction } from 'express';
import { Op, WhereOptions } from 'sequelize';
import { Property, Agent, Client, PropertyAttributes } from '../models/index.js';
import {
  CreatePropertyInput,
  UpdatePropertyInput,
  UpdatePropertyStatusInput,
  QueryPropertiesInput,
} from '../schemas/property.schema.js';

const propertyInclude = () => [
  { model: Agent, as: 'agent', attributes: ['id', 'name', 'email'] },
  { model: Client, as: 'owner', attributes: ['id', 'name', 'email', 'phone'] },
];

export const getProperties = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const q = req.query as unknown as QueryPropertiesInput;
    const {
      page = 1,
      limit = 20,
      search,
      type,
      status,
      min_price,
      max_price,
      min_bedrooms,
      sort_by = 'created_at',
      sort_order = 'DESC',
    } = q;

    const where: WhereOptions<PropertyAttributes> = {};

    if (search) {
      const pattern = `%${search}%`;
      Object.assign(where, {
        [Op.or]: [{ title: { [Op.like]: pattern } }, { address: { [Op.like]: pattern } }],
      });
    }
    if (type) where.type = type;
    if (status) where.status = status;
    if (min_bedrooms !== undefined) where.bedrooms = { [Op.gte]: Number(min_bedrooms) } as never;

    if (min_price !== undefined || max_price !== undefined) {
      const priceFilter: Record<symbol, number> = {};
      if (min_price !== undefined) priceFilter[Op.gte] = Number(min_price);
      if (max_price !== undefined) priceFilter[Op.lte] = Number(max_price);
      where.price = priceFilter as never;
    }

    const offset = (Number(page) - 1) * Number(limit);

    const { count, rows } = await Property.findAndCountAll({
      where,
      limit: Number(limit),
      offset,
      order: [[sort_by, sort_order.toUpperCase()]],
      include: propertyInclude(),
    });

    res.status(200).json({
      properties: rows,
      pagination: {
        total: count,
        page: Number(page),
        limit: Number(limit),
        totalPages: Math.ceil(count / Number(limit)),
      },
    });
  } catch (error) {
    next(error);
  }
};

export const getPropertyById = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const id = Number(req.params.id);
    const property = await Property.findByPk(id, { include: propertyInclude() });

    if (!property) {
      res.status(404).json({ error: 'Not Found', message: 'Propiedad no encontrada.' });
      return;
    }

    res.status(200).json({ property });
  } catch (error) {
    next(error);
  }
};

export const createProperty = async (
  req: Request<object, object, CreatePropertyInput>,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { title, address, price, type, status, bedrooms, bathrooms, area, client_id, image } =
      req.body;

    if (client_id) {
      const client = await Client.findByPk(client_id);
      if (!client) {
        res.status(404).json({ error: 'Not Found', message: 'El cliente vinculado no existe.' });
        return;
      }
    }

    const agent_id = req.agent!.id;

    const property = await Property.create({
      agent_id,
      client_id: client_id ?? null,
      title,
      address,
      price,
      type,
      status,
      bedrooms: bedrooms ?? 0,
      bathrooms: bathrooms ?? 0,
      area,
      image_url: image ?? null,
    });

    const populated = await Property.findByPk(property.id, { include: propertyInclude() });

    res.status(201).json({
      message: 'Propiedad registrada correctamente.',
      property: populated,
    });
  } catch (error) {
    next(error);
  }
};

export const updateProperty = async (
  req: Request<{ id: string }, object, UpdatePropertyInput>,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const id = Number(req.params.id);
    const property = await Property.findByPk(id);
    if (!property) {
      res.status(404).json({ error: 'Not Found', message: 'Propiedad no encontrada.' });
      return;
    }

    const { image, image_url, ...rest } = req.body;

    const updates: Record<string, unknown> = { ...rest };
    const resolvedImage = image ?? image_url;
    if (resolvedImage !== undefined) updates.image_url = resolvedImage ?? null;

    await property.update(updates);

    const populated = await Property.findByPk(id, { include: propertyInclude() });
    res.status(200).json({ message: 'Propiedad actualizada correctamente.', property: populated });
  } catch (error) {
    next(error);
  }
};

export const updatePropertyStatus = async (
  req: Request<{ id: string }, object, UpdatePropertyStatusInput>,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const id = Number(req.params.id);
    const { status } = req.body;

    const property = await Property.findByPk(id);
    if (!property) {
      res.status(404).json({ error: 'Not Found', message: 'Propiedad no encontrada.' });
      return;
    }

    await property.update({ status });
    res.status(200).json({ message: 'Estado de propiedad actualizado.', property });
  } catch (error) {
    next(error);
  }
};

export const deleteProperty = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const id = Number(req.params.id);
    const property = await Property.findByPk(id);
    if (!property) {
      res.status(404).json({ error: 'Not Found', message: 'Propiedad no encontrada.' });
      return;
    }

    await property.destroy();
    res.status(200).json({ message: 'Propiedad eliminada correctamente.' });
  } catch (error) {
    next(error);
  }
};
