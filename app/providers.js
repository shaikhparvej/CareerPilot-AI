"use client";

import { useEffect } from 'react';
import { ThemeProvider } from './components/ThemeContext';

// Script to avoid flash of unstyled content (FOUC)
function ThemeInitializer() {
  useEffect(() => {
    // Immediately set theme on client-side
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      document.documentElement.setAttribute('data-theme', savedTheme);
      if (savedTheme === 'dark') {
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
    } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      document.documentElement.setAttribute('data-theme', 'dark');
      document.documentElement.classList.add('dark-theme');
      document.documentElement.classList.add('dark');
      document.body.classList.add('dark-theme');
      document.body.classList.add('dark');
    }

    // Add class to enable transitions after initial load
    const body = document.body;
    body.classList.add('theme-transition-disabled');

    setTimeout(() => {
      body.classList.remove('theme-transition-disabled');
    }, 300);

    // Listen for system theme changes
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e) => {
      // Only apply if the user hasn't manually set a theme
      if (!localStorage.getItem('theme')) {
        const newTheme = e.matches ? 'dark' : 'light';
        document.documentElement.setAttribute('data-theme', newTheme);
        if (e.matches) {
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
      }
    };

    // Add listener for theme changes
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handleChange);
      return () => mediaQuery.removeEventListener('change', handleChange);
    } else {
      // Fallback for older browsers
      mediaQuery.addListener(handleChange);
      return () => mediaQuery.removeListener(handleChange);
    }
  }, []);

  return null;
}

export function Providers({ children }) {
  return (
    <ThemeProvider>
      <ThemeInitializer />
      {children}
    </ThemeProvider>
  );
}
