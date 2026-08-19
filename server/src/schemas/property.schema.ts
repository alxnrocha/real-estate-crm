import { z } from 'zod';

export const createPropertySchema = z.object({
  title: z.string().min(5, 'El título debe tener al menos 5 caracteres').max(200),
  address: z.string().min(10, 'La dirección es muy corta').max(255),
  price: z.number().nonnegative('El precio no puede ser negativo'),
  type: z.enum(['House', 'Apartment', 'Condo', 'Villa', 'Land'], {
    errorMap: () => ({ message: 'Tipo de propiedad inválido' }),
  }),
  status: z.enum(['Available', 'Sold', 'Rented', 'Pending']).optional().default('Available'),
  bedrooms: z.number().int().nonnegative().optional().default(0),
  bathrooms: z.number().int().nonnegative().optional().default(0),
  area: z.number().positive('El área debe ser mayor a 0'),
  client_id: z.number().int().positive().optional().nullable(),
  image_url: z.string().url('URL de imagen no válida').optional().nullable(),
  image: z.string().url('URL de imagen no válida').optional().nullable(),
});

export const updatePropertySchema = createPropertySchema.partial();

export const updatePropertyStatusSchema = z.object({
  status: z.enum(['Available', 'Sold', 'Rented', 'Pending']),
});

export const queryPropertiesSchema = z.object({
  page: z.coerce.number().int().positive().optional().default(1),
  limit: z.coerce.number().int().positive().max(100).optional().default(20),
  search: z.string().optional(),
  type: z.enum(['House', 'Apartment', 'Condo', 'Villa', 'Land']).optional(),
  status: z.enum(['Available', 'Sold', 'Rented', 'Pending']).optional(),
  min_price: z.coerce.number().nonnegative().optional(),
  max_price: z.coerce.number().nonnegative().optional(),
  min_bedrooms: z.coerce.number().int().nonnegative().optional(),
  sort_by: z.enum(['created_at', 'price', 'area', 'title']).optional().default('created_at'),
  sort_order: z.enum(['ASC', 'DESC', 'asc', 'desc']).optional().default('DESC'),
});

export type CreatePropertyInput = z.infer<typeof createPropertySchema>;
export type UpdatePropertyInput = z.infer<typeof updatePropertySchema>;
export type UpdatePropertyStatusInput = z.infer<typeof updatePropertyStatusSchema>;
export type QueryPropertiesInput = z.infer<typeof queryPropertiesSchema>;
