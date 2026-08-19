import { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { config } from '../config/env.js';
import { Agent } from '../models/Agent.js';
import { RegisterInput, LoginInput } from '../schemas/auth.schema.js';

const signToken = (agent: Agent): string => {
  return jwt.sign({ id: agent.id, email: agent.email, role: agent.role }, config.jwtSecret, {
    expiresIn: config.jwtExpiresIn,
  } as jwt.SignOptions);
};

export const register = async (
  req: Request<object, object, RegisterInput>,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { name, email, password, role } = req.body;

    const existing = await Agent.findOne({ where: { email } });
    if (existing) {
      res.status(409).json({
        error: 'Conflict',
        message: 'Ya existe un agente registrado con este correo electrónico.',
      });
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const agent = await Agent.create({ name, email, password_hash: hashedPassword, role });

    const token = signToken(agent);

    res.status(201).json({
      message: 'Agente registrado con éxito.',
      token,
      agent: { id: agent.id, name: agent.name, email: agent.email, role: agent.role },
    });
  } catch (error) {
    next(error);
  }
};

export const login = async (
  req: Request<object, object, LoginInput>,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { email, password } = req.body;

    const agent = await Agent.findOne({ where: { email } });
    if (!agent) {
      res.status(401).json({ error: 'Unauthorized', message: 'Credenciales incorrectas.' });
      return;
    }

    const isMatch = await bcrypt.compare(password, agent.password_hash);
    if (!isMatch) {
      res.status(401).json({ error: 'Unauthorized', message: 'Credenciales incorrectas.' });
      return;
    }

    const token = signToken(agent);

    res.status(200).json({
      message: 'Sesión iniciada correctamente.',
      token,
      agent: { id: agent.id, name: agent.name, email: agent.email, role: agent.role },
    });
  } catch (error) {
    next(error);
  }
};

export const getMe = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    if (!req.agent) {
      res.status(401).json({ error: 'Unauthorized', message: 'No autenticado.' });
      return;
    }

    const agent = await Agent.findByPk(req.agent.id, {
      attributes: ['id', 'name', 'email', 'role', 'created_at'],
    });

    if (!agent) {
      res.status(404).json({ error: 'Not Found', message: 'Agente no encontrado.' });
      return;
    }

    res.status(200).json({ agent });
  } catch (error) {
    next(error);
  }
};
