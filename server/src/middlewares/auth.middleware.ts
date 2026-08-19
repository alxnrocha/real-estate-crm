import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { config } from '../config/env.js';
import { Agent } from '../models/Agent.js';

export interface AuthenticatedAgent {
  id: number;
  name: string;
  email: string;
  role: 'admin' | 'agent';
}

declare global {
  namespace Express {
    interface Request {
      agent?: AuthenticatedAgent;
    }
  }
}

export const authenticateJWT = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    res.status(401).json({
      error: 'Unauthorized',
      message: 'Token de autenticación no proporcionado o formato inválido.',
    });
    return;
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, config.jwtSecret) as {
      id: number;
      email: string;
      role: 'admin' | 'agent';
    };

    const agent = await Agent.findByPk(decoded.id, {
      attributes: ['id', 'name', 'email', 'role'],
    });

    if (!agent) {
      res.status(401).json({
        error: 'Unauthorized',
        message: 'El agente asociado a este token ya no existe.',
      });
      return;
    }

    req.agent = {
      id: agent.id,
      name: agent.name,
      email: agent.email,
      role: agent.role,
    };

    next();
  } catch {
    res.status(401).json({
      error: 'Unauthorized',
      message: 'Token inválido o expirado.',
    });
  }
};
