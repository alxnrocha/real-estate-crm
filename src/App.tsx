import { useState } from 'react';
import { DashboardLayout } from './components/layout/DashboardLayout';
import { DashboardMetrics } from './components/dashboard/DashboardMetrics';
import { PropertiesTable } from './components/properties/PropertiesTable';
import { PropertyForm } from './components/properties/PropertyForm';
import { PropertyDetailsPanel } from './components/properties/PropertyDetailsPanel';
import { CalendarView } from './components/calendar/CalendarView';
import { Property } from './utils/mockData';

function App() {
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [activeView, setActiveView] = useState<'dashboard' | 'calendar'>('dashboard');

  return (
    <DashboardLayout>
      <div className="mb-6 flex flex-col sm:flex-row sm:justify-between sm:items-end gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            {activeView === 'dashboard' ? 'Bienvenido al CRM Inmobiliario' : 'Calendario de Citas'}
          </h1>
          <p className="text-gray-500">
            {activeView === 'dashboard' ? 'Resumen de actividad y métricas clave.' : 'Gestiona tus visitas y reuniones.'}
          </p>
        </div>
        
        <div className="flex gap-2">
          <button 
            onClick={() => setActiveView('dashboard')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${activeView === 'dashboard' ? 'bg-indigo-600 text-white' : 'bg-white text-gray-700 border border-gray-200'}`}
          >
            Dashboard
          </button>
          <button 
            onClick={() => setActiveView('calendar')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${activeView === 'calendar' ? 'bg-indigo-600 text-white' : 'bg-white text-gray-700 border border-gray-200'}`}
          >
            Calendario
          </button>
        </div>
      </div>
      
      {activeView === 'dashboard' ? (
        <>
          <DashboardMetrics />
          
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
            <div className="xl:col-span-2 bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="p-6 border-b border-gray-100 flex items-center justify-between">
                <h2 className="text-lg font-semibold text-gray-900">Propiedades Recientes</h2>
              </div>
              <PropertiesTable onViewProperty={setSelectedProperty} />
            </div>
            
            <div className="xl:col-span-1">
              <PropertyForm />
            </div>
          </div>
        </>
      ) : (
        <CalendarView />
      )}

      <PropertyDetailsPanel 
        property={selectedProperty} 
        isOpen={!!selectedProperty} 
        onClose={() => setSelectedProperty(null)} 
      />
    </DashboardLayout>
  );
}

export default App;
