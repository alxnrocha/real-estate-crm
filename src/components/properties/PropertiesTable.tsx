import React from 'react';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { mockProperties, Property, PropertyStatus } from '../../utils/mockData';
import { Edit, Trash2, Eye } from 'lucide-react';

interface PropertiesTableProps {
  onViewProperty?: (property: Property) => void;
}

export const PropertiesTable: React.FC<PropertiesTableProps> = ({ onViewProperty }) => {
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
      <table className="w-full text-sm text-left text-gray-500">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 border-b border-gray-200">
          <tr>
            <th className="px-6 py-3">Propiedad</th>
            <th className="px-6 py-3">Tipo</th>
            <th className="px-6 py-3">Precio</th>
            <th className="px-6 py-3">Estado</th>
            <th className="px-6 py-3 text-right">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {mockProperties.map((prop: Property) => (
            <tr key={prop.id} className="bg-white border-b hover:bg-gray-50 transition-colors">
              <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                <div className="flex flex-col">
                  <span>{prop.title}</span>
                  <span className="text-xs text-gray-500 font-normal">{prop.address}</span>
                </div>
              </td>
              <td className="px-6 py-4">{prop.type}</td>
              <td className="px-6 py-4 font-semibold">{formatCurrency(prop.price)}</td>
              <td className="px-6 py-4">
                <Badge variant={getStatusVariant(prop.status)}>
                  {prop.status}
                </Badge>
              </td>
              <td className="px-6 py-4 text-right flex justify-end gap-2">
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0" onClick={() => onViewProperty?.(prop)}><Eye size={16} /></Button>
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-indigo-600"><Edit size={16} /></Button>
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-red-600"><Trash2 size={16} /></Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
