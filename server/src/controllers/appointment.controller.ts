import { Request, Response, NextFunction } from 'express';
import { Op, WhereOptions } from 'sequelize';
import { Appointment, Client, Property, Agent, AppointmentAttributes } from '../models/index.js';
import {
  CreateAppointmentInput,
  UpdateAppointmentInput,
  UpdateAppointmentStatusInput,
  QueryAppointmentsInput,
} from '../schemas/appointment.schema.js';

const appointmentInclude = () => [
  { model: Property, as: 'property', attributes: ['id', 'title', 'address', 'price'] },
  { model: Client, as: 'client', attributes: ['id', 'name', 'email', 'phone'] },
  { model: Agent, as: 'agent', attributes: ['id', 'name', 'email'] },
];

export const getAppointments = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const q = req.query as unknown as QueryAppointmentsInput;
    const { page = 1, limit = 20, status, property_id, client_id, from, to } = q;

    const where: WhereOptions<AppointmentAttributes> = {};
    if (status) where.status = status;
    if (property_id) where.property_id = property_id;
    if (client_id) where.client_id = client_id;

    if (from || to) {
      const range: Record<symbol, Date> = {};
      if (from) range[Op.gte] = new Date(from);
      if (to) range[Op.lte] = new Date(to);
      where.scheduled_at = range as never;
    }

    const offset = (Number(page) - 1) * Number(limit);

    const { count, rows } = await Appointment.findAndCountAll({
      where,
      limit: Number(limit),
      offset,
      order: [['scheduled_at', 'ASC']],
      include: appointmentInclude(),
    });

    res.status(200).json({
      appointments: rows,
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

export const getAppointmentById = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const id = Number(req.params.id);
    const appointment = await Appointment.findByPk(id, { include: appointmentInclude() });
    if (!appointment) {
      res.status(404).json({ error: 'Not Found', message: 'Cita no encontrada.' });
      return;
    }
    res.status(200).json({ appointment });
  } catch (error) {
    next(error);
  }
};

export const createAppointment = async (
  req: Request<object, object, CreateAppointmentInput>,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { property_id, client_id, scheduled_at, status, notes } = req.body;

    const [property, client] = await Promise.all([
      Property.findByPk(property_id),
      Client.findByPk(client_id),
    ]);
    if (!property) {
      res.status(404).json({ error: 'Not Found', message: 'La propiedad no existe.' });
      return;
    }
    if (!client) {
      res.status(404).json({ error: 'Not Found', message: 'El cliente no existe.' });
      return;
    }

    const appointment = await Appointment.create({
      property_id,
      client_id,
      agent_id: req.agent!.id,
      scheduled_at: new Date(scheduled_at),
      status,
      notes: notes || null,
    });

    const populated = await Appointment.findByPk(appointment.id, { include: appointmentInclude() });

    res.status(201).json({ message: 'Cita creada correctamente.', appointment: populated });
  } catch (error) {
    next(error);
  }
};

export const updateAppointmentStatus = async (
  req: Request<{ id: string }, object, UpdateAppointmentStatusInput>,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const id = Number(req.params.id);
    const { status } = req.body;

    const appointment = await Appointment.findByPk(id);
    if (!appointment) {
      res.status(404).json({ error: 'Not Found', message: 'Cita no encontrada.' });
      return;
    }

    await appointment.update({ status });
    res.status(200).json({ message: 'Estado de cita actualizado.', appointment });
  } catch (error) {
    next(error);
  }
};

export const deleteAppointment = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const id = Number(req.params.id);
    const appointment = await Appointment.findByPk(id);
    if (!appointment) {
      res.status(404).json({ error: 'Not Found', message: 'Cita no encontrada.' });
      return;
    }
    await appointment.destroy();
    res.status(200).json({ message: 'Cita eliminada correctamente.' });
  } catch (error) {
    next(error);
  }
};

export const updateAppointment = async (
  req: Request<{ id: string }, object, UpdateAppointmentInput>,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const id = Number(req.params.id);
    const appointment = await Appointment.findByPk(id);
    if (!appointment) {
      res.status(404).json({ error: 'Not Found', message: 'Cita no encontrada.' });
      return;
    }

    const { scheduled_at, notes, property_id, client_id, status } = req.body;
    const updates: Record<string, unknown> = {};
    if (scheduled_at !== undefined) updates.scheduled_at = new Date(scheduled_at);
    if (notes !== undefined) updates.notes = notes;
    if (status !== undefined) updates.status = status;
    if (property_id !== undefined) updates.property_id = property_id;
    if (client_id !== undefined) updates.client_id = client_id;

    await appointment.update(updates);

    const populated = await Appointment.findByPk(id, { include: appointmentInclude() });
    res.status(200).json({ message: 'Cita actualizada correctamente.', appointment: populated });
  } catch (error) {
    next(error);
  }
};
