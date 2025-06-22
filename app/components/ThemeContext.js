"use client";

import React, { createContext, useState, useEffect } from 'react';

// Create context with default values
export const ThemeContext = createContext({
  isDarkMode: false,
  toggleTheme: () => {},
});

export const ThemeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Initialize theme from localStorage if available, otherwise use system preference
  useEffect(() => {
    setMounted(true);
    
    // Check if a theme preference is saved in localStorage
    const savedTheme = localStorage.getItem('theme');
    
    if (savedTheme) {
      setIsDarkMode(savedTheme === 'dark');
    } else {
      // If no saved preference, check system preference
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setIsDarkMode(prefersDark);
      localStorage.setItem('theme', prefersDark ? 'dark' : 'light');
    }
    
    // Apply initial theme to document
    const currentTheme = savedTheme || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    document.documentElement.setAttribute('data-theme', currentTheme);
    
    // Apply dark mode classes
    if (currentTheme === 'dark') {
      document.documentElement.classList.add('dark-theme');
      document.documentElement.classList.add('dark');
      document.body.classList.add('dark-theme');
      document.body.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark-theme');
      document.documentElement.classList.remove('dark');
      document.body.classList.remove('dark-theme');
      document.body.classList.remove('dark');
    }
    
    // Add the theme class to enable transitions
    setTimeout(() => {
      document.documentElement.classList.remove('theme-transition-disabled');
    }, 100);
  }, []);

  const toggleTheme = () => {
    // Add a flash prevention class before changing the theme
    document.documentElement.classList.add('theme-transition-disabled');
    
    const newTheme = !isDarkMode;
    setIsDarkMode(newTheme);
    
    // Update localStorage with the new theme preference
    localStorage.setItem('theme', newTheme ? 'dark' : 'light');
    
    // Apply theme to document
    document.documentElement.setAttribute('data-theme', newTheme ? 'dark' : 'light');
    
    // Toggle dark mode classes on both html and body elements
    document.documentElement.classList.toggle('dark-theme', newTheme);
    document.documentElement.classList.toggle('dark', newTheme);
    document.body.classList.toggle('dark-theme', newTheme);
    document.body.classList.toggle('dark', newTheme);
    
    // Remove the flash prevention class after a short delay
    setTimeout(() => {
      document.documentElement.classList.remove('theme-transition-disabled');
    }, 100);
  };

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
      {mounted ? children : 
        <div style={{ visibility: 'hidden' }}>{children}</div>
      }
    </ThemeContext.Provider>
  );
}; 