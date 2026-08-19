import { Router } from 'express';
import {
  getAppointments,
  getAppointmentById,
  createAppointment,
  updateAppointment,
  updateAppointmentStatus,
  deleteAppointment,
} from '../controllers/appointment.controller.js';
import { authenticateJWT } from '../middlewares/auth.middleware.js';
import { validateBody, validateQuery } from '../middlewares/validate.middleware.js';
import {
  createAppointmentSchema,
  updateAppointmentSchema,
  updateAppointmentStatusSchema,
  queryAppointmentsSchema,
} from '../schemas/appointment.schema.js';

const router = Router();
router.use(authenticateJWT);

router.get('/', validateQuery(queryAppointmentsSchema), getAppointments);
router.get('/:id', getAppointmentById);
router.post('/', validateBody(createAppointmentSchema), createAppointment);
router.put('/:id', validateBody(updateAppointmentSchema), updateAppointment);
router.patch('/:id/status', validateBody(updateAppointmentStatusSchema), updateAppointmentStatus);
router.delete('/:id', deleteAppointment);

export default router;
