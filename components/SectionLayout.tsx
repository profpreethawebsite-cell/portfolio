'use client';

import { motion } from 'framer-motion';
import Navigation from './Navigation';

interface SectionLayoutProps {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}

export default function SectionLayout({ title, subtitle, children }: SectionLayoutProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      <Navigation />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="pt-20 pb-16"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-4">
              {title}
            </h1>
            {subtitle && (
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                {subtitle}
              </p>
            )}
            <div className="w-24 h-1 bg-indigo-600 mx-auto mt-6"></div>
          </motion.div>
          {children}
        </div>
      </motion.div>
    </div>
  );
}
