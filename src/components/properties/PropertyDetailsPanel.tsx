import React from 'react';
import { X, BedDouble, Bath, Maximize, MapPin } from 'lucide-react';
import { Property, PropertyStatus } from '../../utils/mockData';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';

interface PropertyDetailsPanelProps {
  property: Property | null;
  isOpen: boolean;
  onClose: () => void;
}

export const PropertyDetailsPanel: React.FC<PropertyDetailsPanelProps> = ({ property, isOpen, onClose }) => {
  if (!isOpen || !property) return null;

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
    <>
      <div 
        className="fixed inset-0 bg-gray-900/50 z-40 transition-opacity"
        onClick={onClose}
      />
      
      <div className="fixed inset-y-0 right-0 z-50 w-full max-w-md bg-white shadow-xl flex flex-col transform transition-transform duration-300 ease-in-out">
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <h2 className="text-lg font-semibold text-gray-900">Detalles de la Propiedad</h2>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500 hover:bg-gray-100 rounded-full p-1 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto">
          {property.image && (
            <div className="h-64 w-full relative">
              <img 
                src={property.image} 
                alt={property.title} 
                className="w-full h-full object-cover"
              />
              <div className="absolute top-4 right-4">
                <Badge variant={getStatusVariant(property.status)} className="shadow-sm">
                  {property.status}
                </Badge>
              </div>
            </div>
          )}

          <div className="p-6 space-y-6">
            <div>
              <div className="flex items-center gap-2 text-sm text-indigo-600 font-medium mb-1">
                {property.type}
              </div>
              <h1 className="text-2xl font-bold text-gray-900 mb-2">{property.title}</h1>
              <div className="flex items-start text-gray-500 mb-4">
                <MapPin size={18} className="mr-1.5 mt-0.5 shrink-0" />
                <span>{property.address}</span>
              </div>
              <div className="text-3xl font-bold text-gray-900">
                {formatCurrency(property.price)}
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4 py-6 border-y border-gray-100">
              <div className="flex flex-col items-center justify-center p-3 bg-gray-50 rounded-lg">
                <BedDouble size={24} className="text-gray-400 mb-2" />
                <span className="font-semibold text-gray-900">{property.bedrooms}</span>
                <span className="text-xs text-gray-500">Habitaciones</span>
              </div>
              <div className="flex flex-col items-center justify-center p-3 bg-gray-50 rounded-lg">
                <Bath size={24} className="text-gray-400 mb-2" />
                <span className="font-semibold text-gray-900">{property.bathrooms}</span>
                <span className="text-xs text-gray-500">Baños</span>
              </div>
              <div className="flex flex-col items-center justify-center p-3 bg-gray-50 rounded-lg">
                <Maximize size={24} className="text-gray-400 mb-2" />
                <span className="font-semibold text-gray-900">{property.area}</span>
                <span className="text-xs text-gray-500">m²</span>
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Descripción General</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Esta es una excelente propiedad ({property.type}) ubicada en la zona de {property.address.split(',')[0]}. 
                Ideal para quienes buscan confort y calidad de vida. 
                Cuenta con {property.bedrooms} habitaciones, {property.bathrooms} baños y {property.area}m² construidos.
              </p>
            </div>
          </div>
        </div>

        <div className="p-6 border-t border-gray-100 bg-gray-50 flex gap-3">
          <Button variant="outline" className="flex-1" onClick={onClose}>Cerrar</Button>
          <Button variant="primary" className="flex-1">Contactar Cliente</Button>
        </div>
      </div>
    </>
  );
};
