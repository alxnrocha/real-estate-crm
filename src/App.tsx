import { DashboardLayout } from './components/layout/DashboardLayout';

function App() {
  return (
    <DashboardLayout>
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Bienvenido al CRM Inmobiliario</h1>
        <p className="text-gray-600">
          Esta es la vista inicial del Dashboard. La estructura del layout responsivo (Sidebar y Header) ya está configurada.
        </p>
      </div>
    </DashboardLayout>
  );
}

export default App;
