import { z } from 'zod';

export const createAppointmentSchema = z.object({
  property_id: z.number().int().positive('ID de propiedad inválido'),
  client_id: z.number().int().positive('ID de cliente inválido'),
  scheduled_at: z.string().datetime({ offset: true }),
  status: z.enum(['Scheduled', 'Completed', 'Cancelled']).optional().default('Scheduled'),
  notes: z.string().max(2000).optional().nullable(),
});

export const updateAppointmentSchema = createAppointmentSchema.partial();

export const updateAppointmentStatusSchema = z.object({
  status: z.enum(['Scheduled', 'Completed', 'Cancelled']),
});

export const queryAppointmentsSchema = z.object({
  page: z.coerce.number().int().positive().optional().default(1),
  limit: z.coerce.number().int().positive().max(100).optional().default(20),
  status: z.enum(['Scheduled', 'Completed', 'Cancelled']).optional(),
  property_id: z.coerce.number().int().positive().optional(),
  client_id: z.coerce.number().int().positive().optional(),
  from: z.string().datetime({ offset: true }).optional(),
  to: z.string().datetime({ offset: true }).optional(),
});

export type CreateAppointmentInput = z.infer<typeof createAppointmentSchema>;
export type UpdateAppointmentInput = z.infer<typeof updateAppointmentSchema>;
export type UpdateAppointmentStatusInput = z.infer<typeof updateAppointmentStatusSchema>;
export type QueryAppointmentsInput = z.infer<typeof queryAppointmentsSchema>;
