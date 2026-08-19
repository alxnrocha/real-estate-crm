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
