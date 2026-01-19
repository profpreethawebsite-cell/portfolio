'use client';

import { Sun, Moon } from 'lucide-react';
import { motion } from 'framer-motion';
import { useContext, useEffect, useState } from 'react';
import { ThemeContext } from '@/contexts/ThemeContext';

export default function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const themeContext = useContext(ThemeContext);
  
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || !themeContext) {
    return (
      <div className="p-2 rounded-lg bg-gray-200 dark:bg-gray-700">
        <Moon size={20} className="text-gray-800 dark:text-gray-200" />
      </div>
    );
  }

  const { theme, toggleTheme } = themeContext;

  return (
    <motion.button
      onClick={toggleTheme}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      className="p-2 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
      aria-label="Toggle theme"
    >
      {theme === 'light' ? (
        <Moon size={20} />
      ) : (
        <Sun size={20} />
      )}
    </motion.button>
  );
}
