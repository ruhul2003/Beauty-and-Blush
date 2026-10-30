"use client";

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';

export function ThemeToggle({ className = "", compact = false }) {
  const { theme, toggleTheme, mounted } = useTheme();

  // Prevent hydration mismatch
  if (!mounted) {
    return (
      <div 
        className={`w-9.5 h-9.5 sm:w-10 sm:h-10 rounded-full glass-pill opacity-70 pointer-events-none ${className}`}
        aria-hidden="true"
      />
    );
  }

  const isDark = theme === 'dark';

  return (
    <motion.button
      whileTap={{ scale: 0.90 }}
      whileHover={{ scale: 1.05 }}
      onClick={toggleTheme}
      type="button"
      className={`glass-pill flex items-center justify-center transition-all cursor-pointer relative overflow-hidden ${
        compact 
          ? 'w-8 h-8 rounded-full' 
          : 'w-9.5 h-9.5 sm:w-10 sm:h-10 rounded-full'
      } text-slate-700 dark:text-slate-200 hover:text-[#b84357] dark:hover:text-amber-300 ${className}`}
      title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
      aria-label={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
    >
      <AnimatePresence mode="wait" initial={false}>
        {isDark ? (
          <motion.div
            key="moon"
            initial={{ rotate: -90, scale: 0, opacity: 0 }}
            animate={{ rotate: 0, scale: 1, opacity: 1 }}
            exit={{ rotate: 90, scale: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-center justify-center text-amber-300"
          >
            <Moon className="w-4 h-4 fill-amber-300/20 stroke-[2]" />
          </motion.div>
        ) : (
          <motion.div
            key="sun"
            initial={{ rotate: 90, scale: 0, opacity: 0 }}
            animate={{ rotate: 0, scale: 1, opacity: 1 }}
            exit={{ rotate: -90, scale: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-center justify-center text-amber-600 dark:text-amber-400"
          >
            <Sun className="w-4 h-4 stroke-[2]" />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.button>
  );
}
