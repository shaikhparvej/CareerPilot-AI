'use client';

import { useEffect } from 'react';

export function ThemeWrapper({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Apply theme immediately on mount
    const applyInitialTheme = () => {
      const savedTheme = localStorage.getItem('theme');
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      const shouldBeDark = savedTheme === 'dark' || (!savedTheme && prefersDark);

      const htmlElement = document.documentElement;
      const bodyElement = document.body;

      if (shouldBeDark) {
        htmlElement.classList.add('dark');
        htmlElement.style.backgroundColor = '#111827';
        htmlElement.style.color = '#f9fafb';
        bodyElement.style.backgroundColor = '#111827';
        bodyElement.style.color = '#f9fafb';
      } else {
        htmlElement.classList.remove('dark');
        htmlElement.style.backgroundColor = '#ffffff';
        htmlElement.style.color = '#111827';
        bodyElement.style.backgroundColor = '#ffffff';
        bodyElement.style.color = '#111827';
      }
    };

    applyInitialTheme();
  }, []);

  return <>{children}</>;
}
