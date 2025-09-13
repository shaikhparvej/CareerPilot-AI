"use client";
import LiveIDE from '@/LiveIDE/page';
import { ThemeToggle } from '@/components/ThemeToggleWorking';
export const dynamic = 'force-dynamic';
// import AiIDE from '@/AiIDE/page';

export default function Home() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
      {/* Header with Theme Toggle */}
      <header className="sticky top-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-700 transition-colors duration-300">
        <div className="flex items-center justify-between px-4 py-3">
          <h1 className="text-xl font-bold text-gray-900 dark:text-white transition-colors duration-300">Online IDE</h1>
          <div className="flex items-center gap-3">
            <span className="text-sm text-gray-600 dark:text-gray-300 transition-colors duration-300">
              Theme:
            </span>
            <ThemeToggle variant="compact" />
          </div>
        </div>
      </header>

      {/* Demo Content Area */}
      <div className="p-6 bg-gray-50 dark:bg-gray-800 transition-colors duration-300">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 transition-colors duration-300">
            Welcome to Online IDE
          </h2>
          <p className="text-gray-700 dark:text-gray-300 mb-6 transition-colors duration-300">
            Click the theme toggle button to switch between light and dark modes.
            Notice how the entire background changes!
          </p>
          <div className="bg-white dark:bg-gray-900 p-4 rounded-lg border border-gray-200 dark:border-gray-600 transition-colors duration-300 mb-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 transition-colors duration-300">
              Theme Demo Panel
            </h3>
            <p className="text-gray-600 dark:text-gray-400 transition-colors duration-300">
              This panel demonstrates the complete background theme switching functionality.
            </p>
          </div>
        </div>
      </div>

      <LiveIDE/>
      {/* <AiIDE/> */}
    </div>
  );
}
