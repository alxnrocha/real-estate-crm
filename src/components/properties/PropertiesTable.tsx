import React, { useMemo } from 'react';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import type { Property, PropertyStatus } from '../../utils/mockData';
import { usePropertyStore } from '../../store/propertyStore';
import { useFilterStore } from '../../store/filterStore';
import { Edit, Trash2, Eye } from 'lucide-react';

interface PropertiesTableProps {
  onViewProperty?: (property: Property) => void;
}

export const PropertiesTable: React.FC<PropertiesTableProps> = ({ onViewProperty }) => {
  const { properties, isLoading } = usePropertyStore();
  const { filters } = useFilterStore();

  const filteredProperties = useMemo(() => {
    return properties.filter(prop => {
      if (filters.searchTerm && !prop.title.toLowerCase().includes(filters.searchTerm.toLowerCase()) && !prop.address.toLowerCase().includes(filters.searchTerm.toLowerCase())) return false;
      if (filters.propertyType !== 'ALL' && prop.type !== filters.propertyType) return false;
      if (filters.status !== 'ALL' && prop.status !== filters.status) return false;
      if (filters.minPrice && prop.price < filters.minPrice) return false;
      if (filters.maxPrice && prop.price > filters.maxPrice) return false;
      if (filters.minBedrooms && prop.bedrooms < filters.minBedrooms) return false;
      return true;
    });
  }, [properties, filters]);

  const getStatusVariant = (status: PropertyStatus) => {
    switch (status) {
      case 'Available': return 'success';
      case 'Sold': return 'default';
      case 'Pending': return 'warning';
      case 'Rented': return 'info';
      default: return 'default';
    }
  };

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR' }).format(val);
  };

  return (
    <div className="w-full overflow-x-auto">
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-500 dark:text-gray-400 uppercase bg-gray-50 dark:bg-slate-800 border-b border-gray-200 dark:border-slate-700/50">
          <tr>
            <th className="px-6 py-3 font-medium">Propiedad</th>
            <th className="px-6 py-3 font-medium">Tipo</th>
            <th className="px-6 py-3 font-medium">Precio</th>
            <th className="px-6 py-3 font-medium">Estado</th>
            <th className="px-6 py-3 font-medium text-right">Acciones</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100 dark:divide-slate-700/50">
          {isLoading ? (
            <tr>
              <td colSpan={5} className="px-6 py-8 text-center text-gray-500 dark:text-gray-400">
                <div className="flex justify-center items-center">
                  <svg className="w-6 h-6 animate-spin text-blue-600 dark:text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <span className="ml-2">Cargando propiedades...</span>
                </div>
              </td>
            </tr>
          ) : filteredProperties.length === 0 ? (
            <tr>
              <td colSpan={5} className="px-6 py-8 text-center text-gray-500 dark:text-gray-400">
                No se encontraron propiedades
              </td>
            </tr>
          ) : (
            filteredProperties.map((prop: Property) => (
              <tr key={prop.id} className="hover:bg-gray-50 dark:hover:bg-slate-800/50 transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <img 
                      src={prop.image || 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=150&q=80'} 
                      alt={prop.title}
                      className="w-12 h-10 object-cover rounded-md"
                    />
                    <div>
                      <div className="font-medium text-gray-900 dark:text-gray-100">{prop.title}</div>
                      <div className="text-gray-500 dark:text-gray-400 text-xs mt-0.5">{prop.address}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 text-gray-600 dark:text-gray-300">
                  {prop.type.charAt(0).toUpperCase() + prop.type.slice(1)}
                </td>
                <td className="px-6 py-4 font-medium text-gray-900 dark:text-gray-100">
                  {formatCurrency(prop.price)}
                </td>
                <td className="px-6 py-4">
                  <Badge variant={getStatusVariant(prop.status)}>
                    {prop.status}
                  </Badge>
                </td>
                <td className="px-6 py-4 text-right flex justify-end gap-2">
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0" onClick={() => onViewProperty?.(prop)} aria-label="Ver propiedad"><Eye size={16} /></Button>
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-blue-600 dark:text-blue-500" aria-label="Editar propiedad"><Edit size={16} /></Button>
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-red-600 dark:text-red-500" aria-label="Eliminar propiedad"><Trash2 size={16} /></Button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};
