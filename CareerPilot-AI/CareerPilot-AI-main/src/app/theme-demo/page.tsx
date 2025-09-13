"use client";

import { ThemeToggle } from '@/components/ThemeToggle';

export default function ThemeTestPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white transition-colors duration-300">
              CareerPilot AI - Theme Demo
            </h1>
            <ThemeToggle />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4 transition-colors duration-300">
            Complete Background Theme Switching
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 transition-colors duration-300">
            Click the theme toggle button in the top-right corner to see the entire page background change!
          </p>
        </div>

        {/* Demo Sections */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {/* Card 1 */}
          <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-600 transition-colors duration-300">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3 transition-colors duration-300">
              Light Mode
            </h3>
            <p className="text-gray-600 dark:text-gray-300 transition-colors duration-300">
              In light mode, the background is white (#ffffff) with dark text for optimal readability during daytime use.
            </p>
          </div>

          {/* Card 2 */}
          <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-600 transition-colors duration-300">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3 transition-colors duration-300">
              Dark Mode
            </h3>
            <p className="text-gray-600 dark:text-gray-300 transition-colors duration-300">
              In dark mode, the background switches to dark gray (#111827) with light text to reduce eye strain in low-light conditions.
            </p>
          </div>

          {/* Card 3 */}
          <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-600 transition-colors duration-300">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3 transition-colors duration-300">
              Synchronized Themes
            </h3>
            <p className="text-gray-600 dark:text-gray-300 transition-colors duration-300">
              The theme preference is saved in localStorage and synchronized across all three modules of the application.
            </p>
          </div>
        </div>

        {/* Live Demo Section */}
        <div className="mt-12 bg-white dark:bg-gray-900 p-8 rounded-xl border-2 border-gray-300 dark:border-gray-600 transition-colors duration-300">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center transition-colors duration-300">
            🎨 Live Theme Demo
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-gray-900 dark:text-white transition-colors duration-300">
                Background Colors:
              </h4>
              <ul className="space-y-2 text-gray-600 dark:text-gray-300 transition-colors duration-300">
                <li>☀️ Light Mode: White (#ffffff)</li>
                <li>🌙 Dark Mode: Dark Gray (#111827)</li>
                <li>⚡ Transition: Smooth 0.3s duration</li>
                <li>💾 Persistence: localStorage</li>
              </ul>
            </div>
            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-gray-900 dark:text-white transition-colors duration-300">
                Text Colors:
              </h4>
              <ul className="space-y-2 text-gray-600 dark:text-gray-300 transition-colors duration-300">
                <li>☀️ Light Mode: Dark Gray (#111827)</li>
                <li>🌙 Dark Mode: Light Gray (#f9fafb)</li>
                <li>🎯 High Contrast: WCAG Compliant</li>
                <li>👁️ Eye Comfort: Optimized</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Instructions */}
        <div className="mt-12 text-center">
          <div className="inline-flex items-center gap-2 bg-blue-50 dark:bg-blue-900/20 px-6 py-3 rounded-full border border-blue-200 dark:border-blue-800 transition-colors duration-300">
            <span className="text-2xl">👆</span>
            <span className="text-blue-700 dark:text-blue-300 font-medium transition-colors duration-300">
              Click the theme toggle button above to see the magic happen!
            </span>
          </div>
        </div>
      </main>
    </div>
  );
}
