import React from 'react';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    { 
      className = '', 
      label, 
      error, 
      leftIcon, 
      rightIcon, 
      id, 
      ...props 
    }, 
    ref
  ) => {
    const inputId = id || Math.random().toString(36).substr(2, 9);
    
    return (
      <div className="w-full flex flex-col gap-1.5">
        {label && (
          <label htmlFor={inputId} className="text-sm font-medium text-gray-700">
            {label}
          </label>
        )}
        <div className="relative">
          {leftIcon && (
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500 pointer-events-none">
              {leftIcon}
            </div>
          )}
          <input
            id={inputId}
            ref={ref}
            className={`
              w-full rounded-md border text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-offset-0 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500
              dark:bg-slate-800 dark:text-gray-100 dark:disabled:bg-slate-900 dark:disabled:text-gray-600
              ${error 
                ? 'border-red-500 focus:border-red-500 focus:ring-red-200 dark:border-red-500/50 dark:focus:ring-red-900/50' 
                : 'border-gray-300 focus:border-blue-500 focus:ring-blue-200 dark:border-slate-700 dark:focus:border-blue-500 dark:focus:ring-blue-900/50'
              }
              ${leftIcon ? 'pl-10' : 'pl-3'}
              ${rightIcon ? 'pr-10' : 'pr-3'}
              py-2 h-10 ${className}
            `}
            {...props}
          />
          {rightIcon && (
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500">
              {rightIcon}
            </div>
          )}
        </div>
        {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
      </div>
    );
  }
);

Input.displayName = 'Input';
