export type PropertyType = 'House' | 'Apartment' | 'Condo' | 'Villa' | 'Land';
export type PropertyStatus = 'Available' | 'Sold' | 'Rented' | 'Pending';

export interface Property {
  id: string;
  title: string;
  address: string;
  price: number;
  type: PropertyType;
  status: PropertyStatus;
  bedrooms: number;
  bathrooms: number;
  area: number;
  image: string;
}

export const mockProperties: Property[] = [
  {
    id: '1',
    title: 'Villa Moderna con Piscina',
    address: 'Carrer de la Marina 120, Barcelona',
    price: 850000,
    type: 'Villa',
    status: 'Available',
    bedrooms: 4,
    bathrooms: 3,
    area: 250,
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9'
  },
  {
    id: '2',
    title: 'Ático con vistas al mar',
    address: 'Passeig de Gràcia 45, Barcelona',
    price: 1200000,
    type: 'Apartment',
    status: 'Pending',
    bedrooms: 3,
    bathrooms: 2,
    area: 150,
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750'
  },
  {
    id: '3',
    title: 'Casa familiar tranquila',
    address: 'Carrer de Sants 300, Barcelona',
    price: 450000,
    type: 'House',
    status: 'Sold',
    bedrooms: 3,
    bathrooms: 2,
    area: 120,
    image: 'https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83'
  }
];
