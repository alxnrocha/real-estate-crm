import React from 'react';
import { Home, Building, Users, Calendar, Settings, X, Sun, Moon } from 'lucide-react';
import { useThemeStore } from '../../store/themeStore';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const navItems = [
  { icon: Home, label: 'Dashboard', href: '#' },
  { icon: Building, label: 'Propiedades', href: '#' },
  { icon: Users, label: 'Clientes', href: '#' },
  { icon: Calendar, label: 'Citas', href: '#' },
  { icon: Settings, label: 'Configuración', href: '#' },
];

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const { theme, setTheme } = useThemeStore();

  return (
    <>
      {/* Overlay para mobile */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black/50 md:hidden"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      {/* Sidebar principal */}
      <aside 
        className={`
          fixed top-0 left-0 z-50 h-screen w-64 bg-white dark:bg-slate-900 border-r border-gray-200 dark:border-slate-800 transition-transform duration-300 ease-in-out flex flex-col
          md:relative md:translate-x-0
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
        aria-label="Sidebar de navegación"
      >
        <div className="flex items-center justify-between h-16 px-6 border-b border-gray-200 dark:border-slate-800">
          <div className="flex items-center gap-2">
            <Building className="text-blue-600 dark:text-blue-500" size={24} />
            <span className="text-xl font-bold text-gray-900 dark:text-white">CRM Inmobiliario</span>
          </div>
          <button 
            onClick={onClose}
            aria-label="Cerrar menú"
            className="md:hidden p-2 text-gray-500 hover:bg-gray-100 dark:hover:bg-slate-800 dark:text-gray-400 rounded-md"
          >
            <X size={20} />
          </button>
        </div>

        <nav className="p-4 space-y-1 flex-1">
          {navItems.map((item, index) => (
            <a
              key={item.label}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2.5 text-sm font-medium rounded-md transition-colors ${
                index === 0 
                  ? 'bg-blue-600 text-white' 
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-800 hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              <item.icon size={20} className={index === 0 ? 'text-white' : 'text-gray-400'} />
              {item.label}
            </a>
          ))}
        </nav>

        <div className="p-4 border-t border-gray-200 dark:border-slate-800">
          <div className="flex items-center gap-4 px-3 py-2 text-gray-500 dark:text-gray-400">
            <button 
              onClick={() => setTheme('light')}
              className={`p-1.5 rounded-md transition-colors ${theme === 'light' ? 'text-blue-600 bg-blue-50 dark:bg-transparent dark:text-blue-500' : 'hover:bg-gray-100 dark:hover:bg-slate-800'}`}
              aria-label="Modo Claro"
            >
              <Sun size={18} />
            </button>
            <button 
              onClick={() => setTheme('dark')}
              className={`p-1.5 rounded-md transition-colors ${theme === 'dark' ? 'text-blue-600 bg-blue-50 dark:bg-slate-800 dark:text-blue-400' : 'hover:bg-gray-100 dark:hover:bg-slate-800'}`}
              aria-label="Modo Oscuro"
            >
              <Moon size={18} />
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};
