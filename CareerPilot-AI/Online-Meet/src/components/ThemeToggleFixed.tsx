"use client"

import { useTheme } from '@/hooks/useTheme';
import { Moon, Sun } from 'lucide-react';
import React from 'react';

interface ThemeToggleProps {
  variant?: 'default' | 'compact' | 'icon-only';
  className?: string;
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({
  variant = 'default',
  className = ''
}) => {
  const { isDark, toggleTheme, mounted } = useTheme();

  // Prevent hydration mismatch
  if (!mounted) {
    return (
      <div className={`
        relative rounded-full transition-all duration-300
        ${variant === 'compact' ? 'p-1 w-8 h-8' : 'p-2 w-10 h-10'}
        bg-gray-200 dark:bg-gray-700
        ${className}
      `}>
        <div className={`
          flex items-center justify-center
          ${variant === 'compact' ? 'w-6 h-6' : 'w-6 h-6'}
        `}>
          <Sun className={`
            text-gray-400
            ${variant === 'compact' ? 'w-4 h-4' : 'w-5 h-5'}
          `} />
        </div>
      </div>
    );
  }

  const baseClasses = `
    relative rounded-full transition-all duration-300 ease-in-out
    focus:outline-none focus:ring-2 focus:ring-offset-2
    hover:scale-105 active:scale-95
    ${variant === 'compact' ? 'p-1' : 'p-2'}
    ${className}
  `;

  const buttonClasses = isDark
    ? `${baseClasses} bg-gray-700 hover:bg-gray-600 focus:ring-blue-500 shadow-lg`
    : `${baseClasses} bg-gray-200 hover:bg-gray-300 focus:ring-blue-500 shadow-md`;

  return (
    <button
      onClick={toggleTheme}
      className={buttonClasses}
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
      title={`Switch to ${isDark ? 'light' : 'dark'} mode`}
    >
      <div className={`
        relative
        ${variant === 'compact' ? 'w-6 h-6' : 'w-6 h-6'}
      `}>
        {/* Sun Icon (Light Mode) */}
        <div
          className={`absolute inset-0 flex items-center justify-center transition-all duration-300 ${
            isDark ? 'scale-0 rotate-180 opacity-0' : 'scale-100 rotate-0 opacity-100'
          }`}
        >
          <Sun className={`
            text-yellow-500 drop-shadow-sm
            ${variant === 'compact' ? 'w-4 h-4' : 'w-5 h-5'}
          `} />
        </div>

        {/* Moon Icon (Dark Mode) */}
        <div
          className={`absolute inset-0 flex items-center justify-center transition-all duration-300 ${
            isDark ? 'scale-100 rotate-0 opacity-100' : 'scale-0 -rotate-180 opacity-0'
          }`}
        >
          <Moon className={`
            text-blue-400 drop-shadow-sm
            ${variant === 'compact' ? 'w-4 h-4' : 'w-5 h-5'}
          `} />
        </div>
      </div>
    </button>
  );
};
