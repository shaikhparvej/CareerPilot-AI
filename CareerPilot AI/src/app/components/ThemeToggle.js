"use client";

import React, { useContext } from 'react';
import { Moon, Sun } from 'lucide-react';
import { ThemeContext } from './ThemeContext';

export function ThemeToggle() {
  const { isDarkMode, toggleTheme } = useContext(ThemeContext);

  return (
    <button
      onClick={toggleTheme}
      className={`p-2 rounded-full transition-colors ${
        isDarkMode 
          ? 'bg-gray-800 hover:bg-gray-700 text-amber-500' 
          : 'bg-gray-100 hover:bg-gray-200 text-blue-600'
      }`}
      title={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      {isDarkMode ? (
        <Sun size={20} className="text-amber-500" />
      ) : (
        <Moon size={20} className="text-blue-600" />
      )}
    </button>
  );
} 