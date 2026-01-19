'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import SectionLayout from '@/components/SectionLayout';
import { getAdminRoles } from '@/lib/supabase-utils';
import { AdminRole } from '@/types';
import { Briefcase, Calendar } from 'lucide-react';

export default function AdministrationPage() {
  const [roles, setRoles] = useState<AdminRole[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRoles = async () => {
      const data = await getAdminRoles();
      setRoles(data);
      setLoading(false);
    };
    fetchRoles();
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  if (loading) {
    return (
      <SectionLayout title="Administration Roles">
        <div className="flex justify-center items-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
        </div>
      </SectionLayout>
    );
  }

  return (
    <SectionLayout 
      title="Administration Roles" 
      subtitle="Leadership positions and administrative responsibilities"
    >
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid md:grid-cols-2 gap-6"
      >
        {roles.length === 0 ? (
          <div className="col-span-2 text-center py-12 text-gray-600 dark:text-gray-400">
            <p>No administration roles information available at the moment.</p>
          </div>
        ) : (
          roles.map((role) => (
            <motion.div
              key={role.id}
              variants={itemVariants}
              whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 hover:shadow-xl transition-all border border-gray-100 dark:border-gray-700"
            >
              <div className="flex items-start space-x-3 mb-4">
                <div className="p-2 bg-indigo-100 dark:bg-indigo-900/30 rounded-lg">
                  <Briefcase className="text-indigo-600 dark:text-indigo-400" size={24} />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-1">
                    {role.title}
                  </h3>
                  <p className="text-indigo-600 dark:text-indigo-400 font-medium text-sm">
                    {role.organization}
                  </p>
                </div>
              </div>
              
              <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-300 mb-3">
                <Calendar size={16} className="text-indigo-600 dark:text-indigo-400" />
                <span className="text-sm">{role.period}</span>
              </div>
              
              {role.description && (
                <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed mt-3">
                  {role.description}
                </p>
              )}
            </motion.div>
          ))
        )}
      </motion.div>
    </SectionLayout>
  );
}
