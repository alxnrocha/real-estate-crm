import { DashboardLayout } from './components/layout/DashboardLayout';
import { DashboardMetrics } from './components/dashboard/DashboardMetrics';
import { PropertiesTable } from './components/properties/PropertiesTable';
import { PropertyForm } from './components/properties/PropertyForm';

function App() {
  return (
    <DashboardLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Bienvenido al CRM Inmobiliario</h1>
        <p className="text-gray-500">Resumen de actividad y métricas clave.</p>
      </div>
      
      <DashboardMetrics />
      
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2 bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-6 border-b border-gray-100 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900">Propiedades Recientes</h2>
          </div>
          <PropertiesTable />
        </div>
        
        <div className="xl:col-span-1">
          <PropertyForm />
        </div>
      </div>
    </DashboardLayout>
  );
}

export default App;
