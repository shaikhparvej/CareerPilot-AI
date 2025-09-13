"use client"

import { useTheme } from '@/hooks/useTheme';
import { motion } from 'framer-motion';
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
    ${variant === 'compact' ? 'p-1' : 'p-2'}
    ${className}
  `;

  const buttonClasses = isDark
    ? `${baseClasses} bg-gray-700 hover:bg-gray-600 focus:ring-blue-500 shadow-lg`
    : `${baseClasses} bg-gray-200 hover:bg-gray-300 focus:ring-blue-500 shadow-md`;

  return (
    <motion.button
      onClick={toggleTheme}
      className={buttonClasses}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
      title={`Switch to ${isDark ? 'light' : 'dark'} mode`}
    >
      <div className={`
        relative
        ${variant === 'compact' ? 'w-6 h-6' : 'w-6 h-6'}
      `}>
        {/* Sun Icon (Light Mode) */}
        <motion.div
          initial={false}
          animate={{
            scale: isDark ? 0 : 1,
            rotate: isDark ? 180 : 0,
            opacity: isDark ? 0 : 1,
          }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <Sun className={`
            text-yellow-500 drop-shadow-sm
            ${variant === 'compact' ? 'w-4 h-4' : 'w-5 h-5'}
          `} />
        </motion.div>

        {/* Moon Icon (Dark Mode) */}
        <motion.div
          initial={false}
          animate={{
            scale: isDark ? 1 : 0,
            rotate: isDark ? 0 : -180,
            opacity: isDark ? 1 : 0,
          }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <Moon className={`
            text-blue-400 drop-shadow-sm
            ${variant === 'compact' ? 'w-4 h-4' : 'w-5 h-5'}
          `} />
        </motion.div>
      </div>
    </motion.button>
  );
};
