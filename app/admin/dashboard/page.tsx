'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import ProtectedRoute from '@/components/ProtectedRoute';
import { useAuth } from '@/contexts/AuthContext';
import { motion } from 'framer-motion';
import {
  Award,
  BookOpen,
  Briefcase,
  FileText,
  Image as ImageIcon,
  Calendar,
  LogOut,
  Plus,
  Edit,
  Trash2,
} from 'lucide-react';
import Link from 'next/link';

const sections = [
  { name: 'Grants', icon: FileText, href: '/admin/grants', color: 'bg-blue-500' },
  { name: 'Publications', icon: BookOpen, href: '/admin/publications', color: 'bg-green-500' },
  { name: 'Administration Roles', icon: Briefcase, href: '/admin/administration', color: 'bg-purple-500' },
  { name: 'Patents', icon: Award, href: '/admin/patents', color: 'bg-yellow-500' },
  { name: 'Awards', icon: Award, href: '/admin/awards', color: 'bg-pink-500' },
  { name: 'Events', icon: Calendar, href: '/admin/events', color: 'bg-indigo-500' },
  { name: 'Gallery', icon: ImageIcon, href: '/admin/gallery', color: 'bg-red-500' },
  { name: 'Profile', icon: Edit, href: '/admin/profile', color: 'bg-teal-500' },
];

export default function AdminDashboardPage() {
  const { logout } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    await logout();
    router.push('/admin/login');
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex items-center justify-between mb-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <h1 className="text-4xl font-bold text-gray-900 dark:text-white">Admin Dashboard</h1>
              <p className="text-gray-600 dark:text-gray-400 mt-2">Manage website content</p>
            </motion.div>
            <motion.button
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleLogout}
              className="flex items-center space-x-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              <LogOut size={20} />
              <span>Logout</span>
            </motion.button>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {sections.map((section, index) => {
              const Icon = section.icon;
              return (
                <motion.div
                  key={section.name}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.05, y: -5 }}
                >
                  <Link href={section.href}>
                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 hover:shadow-xl transition-all cursor-pointer border border-gray-100 dark:border-gray-700">
                      <div className={`${section.color} p-3 rounded-lg w-fit mb-4`}>
                        <Icon className="text-white" size={28} />
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{section.name}</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Manage {section.name.toLowerCase()}</p>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </ProtectedRoute>
  );
}
