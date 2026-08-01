import React from 'react';

type BadgeVariant = 'default' | 'success' | 'warning' | 'error' | 'info';

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
}

export const Badge: React.FC<BadgeProps> = ({ 
  className = '', 
  variant = 'default', 
  children, 
  ...props 
}) => {
  const baseStyles = 'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium';
  
  const variants: Record<BadgeVariant, string> = {
    default: 'bg-gray-100 text-gray-800 dark:bg-slate-700 dark:text-gray-200',
    success: 'bg-green-100 text-green-800 dark:bg-emerald-500/10 dark:text-emerald-400 dark:border dark:border-emerald-500/20',
    warning: 'bg-yellow-100 text-yellow-800 dark:bg-amber-500/10 dark:text-amber-400 dark:border dark:border-amber-500/20',
    error: 'bg-red-100 text-red-800 dark:bg-red-500/10 dark:text-red-400 dark:border dark:border-red-500/20',
    info: 'bg-blue-100 text-blue-800 dark:bg-blue-500/10 dark:text-blue-400 dark:border dark:border-blue-500/20',
  };

  return (
    <span 
      className={`${baseStyles} ${variants[variant]} ${className}`} 
      {...props}
    >
      {children}
    </span>
  );
};
