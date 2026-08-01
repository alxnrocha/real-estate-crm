import React from 'react';

export const Footer: React.FC = () => {
  const year = new Date().getFullYear();
  return (
    <footer className="mt-auto py-6 text-center text-sm dark:text-gray-500 text-gray-400">
      &copy; {year} CRM Inmobiliario. Todos los derechos reservados.
    </footer>
  );
};
