'use client';

import * as React from 'react';

interface ToastContextType {
  toast: (options: {
    title?: string;
    description?: string;
    variant?: 'default' | 'destructive';
  }) => void;
}

const ToastContext = React.createContext<ToastContextType | undefined>(
  undefined
);

export const useToast = () => {
  const context = React.useContext(ToastContext);
  if (!context) {
    // Return a minimal implementation if provider is missing
    return {
      toast: (options: {
        title?: string;
        description?: string;
        variant?: 'default' | 'destructive';
      }) => {
        console.log('Toast:', options);
        // You can implement a simple alert here if needed
        if (options.variant === 'destructive') {
          console.error(options.title, options.description);
        }
      },
    };
  }
  return context;
};

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const toast = React.useCallback(
    (options: {
      title?: string;
      description?: string;
      variant?: 'default' | 'destructive';
    }) => {
      // Simple console implementation - you can enhance this later
      console.log('Toast:', options);
      if (options.variant === 'destructive') {
        console.error(options.title, options.description);
      }
    },
    []
  );

  const value = React.useMemo(() => ({ toast }), [toast]);

  return React.createElement(ToastContext.Provider, { value }, children);
};
