import { Request, Response, NextFunction } from 'express';
import { Op, WhereOptions } from 'sequelize';
import { Client, Agent, ClientAttributes } from '../models/index.js';
import {
  CreateClientInput,
  UpdateClientInput,
  QueryClientsInput,
} from '../schemas/client.schema.js';

export const getClients = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const q = req.query as unknown as QueryClientsInput;
    const { page = 1, limit = 20, search } = q;

    const where: WhereOptions<ClientAttributes> = {};
    if (search) {
      const pattern = `%${search}%`;
      Object.assign(where, {
        [Op.or]: [{ name: { [Op.like]: pattern } }, { email: { [Op.like]: pattern } }],
      });
    }

    const offset = (Number(page) - 1) * Number(limit);

    const { count, rows } = await Client.findAndCountAll({
      where,
      limit: Number(limit),
      offset,
      order: [['created_at', 'DESC']],
      include: [{ model: Agent, as: 'agent', attributes: ['id', 'name'] }],
    });

    res.status(200).json({
      clients: rows,
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

export const getClientById = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const id = Number(req.params.id);
    const client = await Client.findByPk(id, {
      include: [{ model: Agent, as: 'agent', attributes: ['id', 'name', 'email'] }],
    });
    if (!client) {
      res.status(404).json({ error: 'Not Found', message: 'Cliente no encontrado.' });
      return;
    }
    res.status(200).json({ client });
  } catch (error) {
    next(error);
  }
};

export const createClient = async (
  req: Request<object, object, CreateClientInput>,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { name, email, phone } = req.body;
    const client = await Client.create({
      agent_id: req.agent!.id,
      name,
      email,
      phone: phone || null,
    });
    const populated = await Client.findByPk(client.id, {
      include: [{ model: Agent, as: 'agent', attributes: ['id', 'name'] }],
    });
    res.status(201).json({ message: 'Cliente creado correctamente.', client: populated });
  } catch (error) {
    next(error);
  }
};

export const updateClient = async (
  req: Request<{ id: string }, object, UpdateClientInput>,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const id = Number(req.params.id);
    const client = await Client.findByPk(id);
    if (!client) {
      res.status(404).json({ error: 'Not Found', message: 'Cliente no encontrado.' });
      return;
    }
    await client.update(req.body);
    const populated = await Client.findByPk(id, {
      include: [{ model: Agent, as: 'agent', attributes: ['id', 'name'] }],
    });
    res.status(200).json({ message: 'Cliente actualizado correctamente.', client: populated });
  } catch (error) {
    next(error);
  }
};

export const deleteClient = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const id = Number(req.params.id);
    const client = await Client.findByPk(id);
    if (!client) {
      res.status(404).json({ error: 'Not Found', message: 'Cliente no encontrado.' });
      return;
    }
    await client.destroy();
    res.status(200).json({ message: 'Cliente eliminado correctamente.' });
  } catch (error) {
    next(error);
  }
};
