import React from 'react';
import { Menu, Bell, Search, User } from 'lucide-react';

interface HeaderProps {
  onMenuClick: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onMenuClick }) => {
  return (
    <header className="sticky top-0 z-30 flex items-center justify-between h-16 px-4 bg-white border-b border-gray-200 md:px-6">
      <div className="flex items-center gap-4">
        <button
          onClick={onMenuClick}
          className="p-2 text-gray-500 rounded-md md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
        >
          <Menu size={24} />
        </button>
        
        <div className="hidden md:flex items-center max-w-md bg-gray-100 rounded-md px-3 py-1.5">
          <Search size={18} className="text-gray-400" />
          <input 
            type="text" 
            placeholder="Buscar propiedades..." 
            className="w-full bg-transparent border-none focus:ring-0 text-sm ml-2 placeholder-gray-500 text-gray-900"
          />
        </div>
      </div>

      <div className="flex items-center gap-4">
        <button className="p-2 text-gray-400 hover:text-gray-500 relative">
          <Bell size={20} />
          <span className="absolute top-1.5 right-1.5 block h-2 w-2 rounded-full bg-red-400 ring-2 ring-white" />
        </button>
        
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600">
            <User size={18} />
          </div>
          <span className="hidden text-sm font-medium text-gray-700 md:block">
            Agente Admin
          </span>
        </div>
      </div>
    </header>
  );
};
