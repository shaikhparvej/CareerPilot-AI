'use client';

import { useEffect, useState } from 'react';

type Theme = 'light' | 'dark';

export const useTheme = () => {
  const [theme, setTheme] = useState<Theme>('light');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    // Get initial theme
    const savedTheme = localStorage.getItem('theme') as Theme;
    const prefersDark = window.matchMedia(
      '(prefers-color-scheme: dark)'
    ).matches;
    const initialTheme = savedTheme || (prefersDark ? 'dark' : 'light');

    setTheme(initialTheme);
    applyTheme(initialTheme);

    // Listen for system theme changes
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e: MediaQueryListEvent) => {
      if (!localStorage.getItem('theme')) {
        const newTheme = e.matches ? 'dark' : 'light';
        setTheme(newTheme);
        applyTheme(newTheme);
      }
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  const applyTheme = (newTheme: Theme) => {
    const htmlElement = document.documentElement;
    const bodyElement = document.body;

    if (newTheme === 'dark') {
      htmlElement.classList.add('dark');
      htmlElement.style.backgroundColor = '#111827'; // gray-900
      htmlElement.style.color = '#f9fafb'; // gray-50
      bodyElement.style.backgroundColor = '#111827';
      bodyElement.style.color = '#f9fafb';
    } else {
      htmlElement.classList.remove('dark');
      htmlElement.style.backgroundColor = '#ffffff'; // white
      htmlElement.style.color = '#111827'; // gray-900
      bodyElement.style.backgroundColor = '#ffffff';
      bodyElement.style.color = '#111827';
    }
  };

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    applyTheme(newTheme);
  };

  return {
    theme,
    isDark: theme === 'dark',
    toggleTheme,
    mounted,
  };
};
