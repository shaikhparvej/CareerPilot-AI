"use client"
import { SignInButton, SignUpButton, UserButton, useUser } from '@clerk/nextjs';
import { motion } from 'framer-motion';
import { Brain, Menu, X } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useState } from 'react';
import { ThemeToggle } from './ThemeToggle';

export const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const { isSignedIn } = useUser();
  const isLandingPage = pathname === '/';

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'Features', href: '#features' },
    { name: 'Tech Stack', href: '#tech-stack' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <nav className="fixed top-0 w-full z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <motion.div
            className="flex items-center"
            whileHover={{ scale: 1.05 }}
          >
            <Link href="/" className="flex items-center space-x-2">
              <Brain className="h-6 w-6 sm:h-8 sm:w-8 text-blue-600 dark:text-blue-400" />
              <span className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white">
                CareerPilot AI
              </span>
            </Link>
          </motion.div>

          {isLandingPage && (
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                {navigation.map((item) => (
                  <motion.a
                    key={item.name}
                    href={item.href}
                    className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {item.name}
                  </motion.a>
                ))}
              </div>
            </div>
          )}

          <div className="flex items-center space-x-2 sm:space-x-4">
            <ThemeToggle />
            {isSignedIn ? (
              <div className="scale-90 sm:scale-100">
                <UserButton />
              </div>
            ) : (
              isLandingPage && (
                <div className="hidden sm:flex items-center space-x-2">
                  <SignInButton mode="modal" >
                    <motion.button
                      className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 px-2 sm:px-4 py-2 rounded-md text-xs sm:text-sm font-medium transition-colors"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Sign In
                    </motion.button>
                  </SignInButton>
                  <SignUpButton mode="modal">
                    <motion.button
                      className="bg-blue-600 hover:bg-blue-700 text-white px-2 sm:px-4 py-2 rounded-md text-xs sm:text-sm font-medium transition-colors"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Get Started
                    </motion.button>
                  </SignUpButton>
                </div>
              )
            )}

            {isLandingPage && (
              <div className="sm:hidden">
                <motion.button
                  onClick={() => setIsOpen(!isOpen)}
                  className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 p-2"
                  whileTap={{ scale: 0.95 }}
                >
                  {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                </motion.button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isLandingPage && (
        <motion.div
          className="sm:hidden"
          initial={false}
          animate={{ height: isOpen ? 'auto' : 0 }}
          transition={{ duration: 0.3 }}
          style={{ overflow: 'hidden' }}
        >
          <div className="px-4 pt-2 pb-3 space-y-1 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 shadow-lg">
            {navigation.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 block px-3 py-3 rounded-md text-base font-medium transition-colors touch-manipulation"
                onClick={() => setIsOpen(false)}
              >
                {item.name}
              </a>
            ))}
            {!isSignedIn && (
              <div className="flex flex-col space-y-3 px-3 pt-3 border-t border-gray-200 dark:border-gray-700 mt-3">
                <SignInButton mode="modal">
                  <button className="text-left text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 py-3 text-base font-medium transition-colors touch-manipulation w-full">
                    Sign In
                  </button>
                </SignInButton>
                <SignUpButton mode="modal" >
                  <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded-md text-base font-medium transition-colors touch-manipulation w-full">
                    Get Started
                  </button>
                </SignUpButton>
              </div>
            )}
          </div>
        </motion.div>
      )}
    </nav>
  );
};
