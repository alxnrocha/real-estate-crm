import { useState, useEffect } from 'react';
import { DashboardLayout } from './components/layout/DashboardLayout';
import { DashboardMetrics } from './components/dashboard/DashboardMetrics';
import { PropertiesTable } from './components/properties/PropertiesTable';
import { PropertyForm } from './components/properties/PropertyForm';
import { PropertyDetailsPanel } from './components/properties/PropertyDetailsPanel';
import { CalendarView } from './components/calendar/CalendarView';
import { RecentActivity } from './components/dashboard/RecentActivity';
import { Login } from './components/auth/Login';
import { useAuthStore } from './store/authStore';
import { usePropertyStore } from './store/propertyStore';
import type { Property } from './utils/mockData';

function App() {
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [activeView, setActiveView] = useState<'dashboard' | 'calendar'>('dashboard');
  
  const { isAuthenticated } = useAuthStore();
  const { fetchProperties } = usePropertyStore();

  useEffect(() => {
    if (isAuthenticated) {
      fetchProperties();
    }
  }, [isAuthenticated, fetchProperties]);

  if (!isAuthenticated) {
    return <Login />;
  }

  return (
    <DashboardLayout>
      <div className="mb-6 flex flex-col sm:flex-row sm:justify-between sm:items-end gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white transition-colors">
            {activeView === 'dashboard' ? 'Bienvenido al CRM Inmobiliario' : 'Calendario de Citas'}
          </h1>
          <p className="text-gray-500 dark:text-gray-400 transition-colors">
            {activeView === 'dashboard' ? 'Resumen de actividad y métricas clave.' : 'Gestiona tus visitas y reuniones.'}
          </p>
        </div>
        
        <div className="flex gap-2">
          <button 
            onClick={() => setActiveView('dashboard')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${activeView === 'dashboard' ? 'bg-blue-600 text-white' : 'bg-white dark:bg-slate-800 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-slate-700 hover:bg-gray-50 dark:hover:bg-slate-700'}`}
          >
            Dashboard
          </button>
          <button 
            onClick={() => setActiveView('calendar')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${activeView === 'calendar' ? 'bg-blue-600 text-white' : 'bg-white dark:bg-slate-800 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-slate-700 hover:bg-gray-50 dark:hover:bg-slate-700'}`}
          >
            Calendario
          </button>
        </div>
      </div>
      
      {activeView === 'dashboard' ? (
        <>
          <DashboardMetrics />
          
          <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-gray-100 dark:border-slate-700/50 overflow-hidden mb-6 transition-colors">
            <div className="p-6 border-b border-gray-100 dark:border-slate-700/50 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Propiedades Recientes</h2>
            </div>
            <PropertiesTable onViewProperty={setSelectedProperty} />
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <PropertyForm />
            <RecentActivity />
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
