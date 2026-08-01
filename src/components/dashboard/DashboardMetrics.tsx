import React from 'react';
import { MetricCard } from './MetricCard';

const mockData = {
  sales: [
    { value: 4000 }, { value: 3000 }, { value: 5000 }, 
    { value: 4500 }, { value: 6000 }, { value: 5500 }, { value: 7000 }
  ],
  visits: [
    { value: 100 }, { value: 120 }, { value: 110 }, 
    { value: 140 }, { value: 130 }, { value: 160 }, { value: 150 }
  ],
  conversion: [
    { value: 2.1 }, { value: 2.4 }, { value: 2.2 }, 
    { value: 2.8 }, { value: 2.7 }, { value: 3.1 }, { value: 3.1 }
  ]
};

export const DashboardMetrics: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
      <MetricCard
        title="Ventas Totales"
        value="124,500"
        change={12.5}
        data={mockData.sales}
        isCurrency
        chartColor="#3B82F6"
      />
      <MetricCard
        title="Visitas Últimos 7 días"
        value="1,240"
        change={-5.2}
        data={mockData.visits}
        chartColor="#3B82F6"
      />
      <MetricCard
        title="Tasa de Conversión"
        value="3.1"
        change={8.1}
        data={mockData.conversion}
        chartColor="#10B981"
      />
    </div>
  );
};
