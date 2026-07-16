import React from 'react';
import { MetricCard } from './MetricCard';

const salesData = [
  { value: 4000 }, { value: 3000 }, { value: 5000 }, { value: 2780 }, { value: 6890 }, { value: 8390 }
];

const visitsData = [
  { value: 120 }, { value: 210 }, { value: 180 }, { value: 240 }, { value: 190 }, { value: 280 }
];

const conversionData = [
  { value: 2.1 }, { value: 2.4 }, { value: 2.2 }, { value: 2.8 }, { value: 2.5 }, { value: 3.1 }
];

export const DashboardMetrics: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <MetricCard 
        title="Ventas Totales" 
        value="124,500" 
        change={12.5} 
        data={salesData} 
        isCurrency 
      />
      <MetricCard 
        title="Visitas (Últimos 7 días)" 
        value="1,240" 
        change={-4.2} 
        data={visitsData} 
      />
      <MetricCard 
        title="Tasa de Conversión" 
        value="3.1%" 
        change={8.1} 
        data={conversionData} 
      />
    </div>
  );
};
