'use client';

import { useTheme } from '@/hooks/useTheme';
import React from 'react';
import { ThemeToggle } from './ThemeToggle';

// Example of a reusable themed button component
interface ThemedButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const ThemedButton: React.FC<ThemedButtonProps> = ({
  children,
  onClick,
  variant = 'primary',
  size = 'md',
  className = ''
}) => {
  const { isDark, mounted } = useTheme();

  if (!mounted) {
    return (
      <button className={`
        px-4 py-2 rounded-lg opacity-50 cursor-not-allowed
        bg-gray-200 text-gray-600
        ${className}
      `} disabled>
        {children}
      </button>
    );
  }

  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg'
  };

  const variantClasses = {
    primary: isDark
      ? 'bg-blue-600 hover:bg-blue-700 text-white border border-blue-600'
      : 'bg-blue-500 hover:bg-blue-600 text-white border border-blue-500',
    secondary: isDark
      ? 'bg-gray-700 hover:bg-gray-600 text-gray-100 border border-gray-600'
      : 'bg-gray-200 hover:bg-gray-300 text-gray-800 border border-gray-300',
    outline: isDark
      ? 'bg-transparent hover:bg-gray-800 text-gray-100 border border-gray-600 hover:border-gray-500'
      : 'bg-transparent hover:bg-gray-50 text-gray-800 border border-gray-300 hover:border-gray-400'
  };

  return (
    <button
      onClick={onClick}
      className={`
        ${sizeClasses[size]}
        ${variantClasses[variant]}
        rounded-lg font-medium transition-all duration-200
        focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500
        active:transform active:scale-95
        ${className}
      `}
    >
      {children}
    </button>
  );
};

// Demo component showing different theme toggle variants
export const ThemeDemo: React.FC = () => {
  const { isDark, theme } = useTheme();

  return (
    <div className="p-6 space-y-6 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 rounded-lg border border-gray-200 dark:border-gray-700">
      <h3 className="text-xl font-bold">Theme System Demo</h3>

      <div className="space-y-4">
        <p>Current theme: <span className="font-semibold">{theme}</span></p>
        <p>Is dark mode: <span className="font-semibold">{isDark ? 'Yes' : 'No'}</span></p>
      </div>

      <div className="space-y-4">
        <h4 className="font-semibold">Theme Toggle Variants:</h4>
        <div className="flex items-center space-x-4">
          <div className="flex flex-col items-center space-y-2">
            <ThemeToggle />
            <span className="text-xs text-gray-500">Default</span>
          </div>
          <div className="flex flex-col items-center space-y-2">
            <ThemeToggle variant="compact" />
            <span className="text-xs text-gray-500">Compact</span>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h4 className="font-semibold">Themed Buttons:</h4>
        <div className="flex flex-wrap gap-3">
          <ThemedButton variant="primary">Primary</ThemedButton>
          <ThemedButton variant="secondary">Secondary</ThemedButton>
          <ThemedButton variant="outline">Outline</ThemedButton>
        </div>
      </div>

      <div className="space-y-4">
        <h4 className="font-semibold">Button Sizes:</h4>
        <div className="flex flex-wrap items-center gap-3">
          <ThemedButton variant="primary" size="sm">Small</ThemedButton>
          <ThemedButton variant="primary" size="md">Medium</ThemedButton>
          <ThemedButton variant="primary" size="lg">Large</ThemedButton>
        </div>
      </div>
    </div>
  );
};
