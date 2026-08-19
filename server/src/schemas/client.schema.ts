import { z } from 'zod';

export const createClientSchema = z.object({
  name: z.string().min(2, 'El nombre debe tener al menos 2 caracteres').max(120),
  email: z.string().email('Debe proporcionar un correo electrónico válido'),
  phone: z.string().max(30).optional().nullable(),
});

export const updateClientSchema = createClientSchema.partial();

export const queryClientsSchema = z.object({
  page: z.coerce.number().int().positive().optional().default(1),
  limit: z.coerce.number().int().positive().max(100).optional().default(20),
  search: z.string().optional(),
});

export type CreateClientInput = z.infer<typeof createClientSchema>;
export type UpdateClientInput = z.infer<typeof updateClientSchema>;
export type QueryClientsInput = z.infer<typeof queryClientsSchema>;
