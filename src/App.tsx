import { DashboardLayout } from './components/layout/DashboardLayout';
import { DashboardMetrics } from './components/dashboard/DashboardMetrics';

function App() {
  return (
    <DashboardLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Bienvenido al CRM Inmobiliario</h1>
        <p className="text-gray-500">Resumen de actividad y métricas clave.</p>
      </div>
      
      <DashboardMetrics />
      
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 min-h-[400px]">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Actividad Reciente</h2>
        <div className="flex items-center justify-center h-full text-gray-400">
          (Data table de propiedades vendrá aquí pronto...)
        </div>
      </div>
    </DashboardLayout>
  );
}

export default App;
