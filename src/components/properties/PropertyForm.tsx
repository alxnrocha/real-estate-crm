import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';

const propertySchema = z.object({
  title: z.string().min(5, 'El título debe tener al menos 5 caracteres'),
  address: z.string().min(10, 'La dirección es muy corta'),
  price: z.coerce.number().min(1000, 'El precio debe ser mayor a 1000'),
  type: z.enum(['House', 'Apartment', 'Condo', 'Villa', 'Land']),
  bedrooms: z.coerce.number().min(0, 'No puede ser negativo'),
  bathrooms: z.coerce.number().min(0, 'No puede ser negativo'),
  area: z.coerce.number().min(10, 'El área debe ser mayor a 10m2'),
});

type PropertyFormData = z.infer<typeof propertySchema>;

export const PropertyForm: React.FC = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<PropertyFormData>({
    resolver: zodResolver(propertySchema),
  });

  const onSubmit = (data: PropertyFormData) => {
    console.log('Form data:', data);
    alert('Propiedad registrada con éxito (ver console log)');
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 p-6 bg-white rounded-xl shadow-sm border border-gray-100">
      <h2 className="text-xl font-bold text-gray-900 mb-4">Añadir Nueva Propiedad</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input 
          label="Título de la propiedad" 
          placeholder="Ej: Villa Moderna con Piscina"
          {...register('title')} 
          error={errors.title?.message} 
        />
        <Input 
          label="Dirección completa" 
          placeholder="Ej: Carrer de la Marina 120"
          {...register('address')} 
          error={errors.address?.message} 
        />
        <Input 
          label="Precio (€)" 
          type="number"
          placeholder="850000"
          {...register('price')} 
          error={errors.price?.message} 
        />
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-gray-700">Tipo de propiedad</label>
          <select 
            {...register('type')}
            className={`w-full rounded-md border text-sm focus:outline-none focus:ring-2 focus:ring-offset-0 py-2 h-10 px-3
              ${errors.type ? 'border-red-500 focus:border-red-500 focus:ring-red-200' : 'border-gray-300 focus:border-indigo-500 focus:ring-indigo-200'}`}
          >
            <option value="House">Casa</option>
            <option value="Apartment">Apartamento</option>
            <option value="Condo">Condominio</option>
            <option value="Villa">Villa</option>
            <option value="Land">Terreno</option>
          </select>
          {errors.type && <p className="text-xs text-red-500">{errors.type.message}</p>}
        </div>
        <Input 
          label="Habitaciones" 
          type="number"
          {...register('bedrooms')} 
          error={errors.bedrooms?.message} 
        />
        <Input 
          label="Baños" 
          type="number"
          {...register('bathrooms')} 
          error={errors.bathrooms?.message} 
        />
        <Input 
          label="Área (m²)" 
          type="number"
          {...register('area')} 
          error={errors.area?.message} 
        />
      </div>
      
      <div className="flex justify-end mt-6">
        <Button type="submit" variant="primary">Registrar Propiedad</Button>
      </div>
    </form>
  );
};
