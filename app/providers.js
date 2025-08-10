"use client";

import { useEffect } from 'react';
import { ThemeProvider } from './components/ThemeContext';
import { LanguageProvider } from './context/LanguageContext';

// Script to avoid flash of unstyled content (FOUC)
function ThemeInitializer() {
  useEffect(() => {
    // Immediately set theme on client-side
    const savedTheme = typeof window !== 'undefined' ? localStorage.getItem('theme') : null;
    if (savedTheme) {
      if (typeof document !== 'undefined') {
        document.documentElement.setAttribute('data-theme', savedTheme);
      }
      if (savedTheme === 'dark') {
        if (typeof document !== 'undefined') {
          document.documentElement.classList.add('dark-theme');
          document.documentElement.classList.add('dark');
          document.body.classList.add('dark-theme');
          document.body.classList.add('dark');
        }
      } else {
        if (typeof document !== 'undefined') {
          document.documentElement.classList.remove('dark-theme');
          document.documentElement.classList.remove('dark');
          document.body.classList.remove('dark-theme');
          document.body.classList.remove('dark');
        }
      }
    } else if (typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      if (typeof document !== 'undefined') {
        document.documentElement.setAttribute('data-theme', 'dark');
        document.documentElement.classList.add('dark-theme');
        document.documentElement.classList.add('dark');
        document.body.classList.add('dark-theme');
        document.body.classList.add('dark');
      }
    }

    // Add class to enable transitions after initial load
    if (typeof document !== 'undefined') {
      const body = document.body;
      body.classList.add('theme-transition-disabled');

      setTimeout(() => {
        body.classList.remove('theme-transition-disabled');
      }, 300);
    }

    // Listen for system theme changes
    const mediaQuery = typeof window !== 'undefined' ? window.matchMedia('(prefers-color-scheme: dark)') : null;
    const handleChange = (e) => {
      // Only apply if the user hasn't manually set a theme
      if (typeof window !== 'undefined' && !localStorage.getItem('theme')) {
        const newTheme = e.matches ? 'dark' : 'light';
        if (typeof document !== 'undefined') {
          document.documentElement.setAttribute('data-theme', newTheme);
        }
        if (e.matches) {
          if (typeof document !== 'undefined') {
            document.documentElement.classList.add('dark-theme');
            document.documentElement.classList.add('dark');
            document.body.classList.add('dark-theme');
            document.body.classList.add('dark');
          }
        } else {
          if (typeof document !== 'undefined') {
            document.documentElement.classList.remove('dark-theme');
            document.documentElement.classList.remove('dark');
            document.body.classList.remove('dark-theme');
            document.body.classList.remove('dark');
          }
        }
      }
    };

    // Add listener for theme changes
    if (mediaQuery?.addEventListener) {
      mediaQuery.addEventListener('change', handleChange);
      return () => mediaQuery.removeEventListener('change', handleChange);
    } else if (mediaQuery?.addListener) {
      // Fallback for older browsers
      mediaQuery.addListener(handleChange);
      return () => mediaQuery.removeListener(handleChange);
    }
  }, []);

  return null;
}

export function Providers({ children }) {
  return (
    <LanguageProvider>
      <ThemeProvider>
        <ThemeInitializer />
        {children}
      </ThemeProvider>
    </LanguageProvider>
  );
}
