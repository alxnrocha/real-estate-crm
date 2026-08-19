import { Request, Response, NextFunction } from 'express';
import { Op } from 'sequelize';
import { Property, Client, Appointment } from '../models/index.js';

export const getDashboardMetrics = async (
  _req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const [totalProperties, availableProperties, soldProperties] = await Promise.all([
      Property.count(),
      Property.count({ where: { status: 'Available' } }),
      Property.count({ where: { status: { [Op.in]: ['Sold', 'Rented'] } } }),
    ]);

    const totalClients = await Client.count();
    const totalAppointments = await Appointment.count();
    const upcomingAppointments = await Appointment.count({
      where: { status: 'Scheduled', scheduled_at: { [Op.gte]: new Date() } },
    });

    const portfolioRows = await Property.findAll({
      attributes: ['price', 'status'],
    });

    let portfolioValue = 0;
    let soldValue = 0;
    for (const p of portfolioRows) {
      const price = Number(p.price || 0);
      portfolioValue += price;
      if (p.status === 'Sold' || p.status === 'Rented') soldValue += price;
    }

    res.status(200).json({
      metrics: {
        total_properties: totalProperties,
        available_properties: availableProperties,
        sold_properties: soldProperties,
        portfolio_value: portfolioValue,
        sold_value: soldValue,
        total_clients: totalClients,
        total_appointments: totalAppointments,
        upcoming_appointments: upcomingAppointments,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const getRecentActivity = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const limit = Number(req.query.limit) || 10;

    const [recentProperties, recentAppointments, recentClients] = await Promise.all([
      Property.findAll({ order: [['created_at', 'DESC']], limit, raw: true }),
      Appointment.findAll({ order: [['created_at', 'DESC']], limit, raw: true }),
      Client.findAll({ order: [['created_at', 'DESC']], limit, raw: true }),
    ]);

    const activity = [
      ...recentProperties.map((p) => ({
        type: 'property',
        title: 'Nueva propiedad agregada',
        description: p.title,
        created_at: p.created_at,
      })),
      ...recentAppointments.map((a) => ({
        type: 'appointment',
        title: 'Cita programada',
        description: `Visita • ${a.scheduled_at}`,
        created_at: a.created_at,
      })),
      ...recentClients.map((c) => ({
        type: 'client',
        title: 'Cliente registrado',
        description: c.name,
        created_at: c.created_at,
      })),
    ]
      .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
      .slice(0, 10);

    res.status(200).json({ activity });
  } catch (error) {
    next(error);
  }
};
