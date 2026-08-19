import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { config } from './config/env.js';
import { testDatabaseConnection } from './config/database.js';
import authRoutes from './routes/auth.routes.js';
import propertyRoutes from './routes/property.routes.js';
import clientRoutes from './routes/client.routes.js';
import appointmentRoutes from './routes/appointment.routes.js';
import dashboardRoutes from './routes/dashboard.routes.js';

const app = express();

app.use(helmet());
app.use(
  cors({
    origin: config.corsOrigin,
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/health', (_req: Request, res: Response) => {
  res.status(200).json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    environment: config.nodeEnv,
  });
});

app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/properties', propertyRoutes);
app.use('/api/v1/clients', clientRoutes);
app.use('/api/v1/appointments', appointmentRoutes);
app.use('/api/v1/dashboard', dashboardRoutes);

app.get('/api/v1', (_req: Request, res: Response) => {
  res.status(200).json({
    message: 'Real Estate CRM API v1',
    version: '1.0.0',
  });
});

app.use((_req: Request, res: Response) => {
  res.status(404).json({
    error: 'Not Found',
    message: 'The requested resource was not found on this server.',
  });
});

app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
  console.error('Unhandled server error:', err);
  res.status(500).json({
    error: 'Internal Server Error',
    message: config.nodeEnv === 'development' ? err.message : 'An unexpected error occurred.',
  });
});

if (process.env.NODE_ENV !== 'test') {
  app.listen(config.port, async () => {
    console.log(`🚀 Real Estate CRM Server running at http://localhost:${config.port}`);
    await testDatabaseConnection();
  });
}

export default app;
