'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import SectionLayout from '@/components/SectionLayout';
import { getAwards } from '@/lib/supabase-utils';
import { Award } from '@/types';
import { Award as AwardIcon, Calendar, Building } from 'lucide-react';

export default function AwardsPage() {
  const [awards, setAwards] = useState<Award[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAwards = async () => {
      const data = await getAwards();
      setAwards(data);
      setLoading(false);
    };
    fetchAwards();
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1 },
  };

  if (loading) {
    return (
      <SectionLayout title="Awards & Recognition">
        <div className="flex justify-center items-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
        </div>
      </SectionLayout>
    );
  }

  return (
    <SectionLayout 
      title="Awards & Recognition" 
      subtitle="Honors and recognition received for outstanding contributions"
    >
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {awards.length === 0 ? (
          <div className="col-span-full text-center py-12 text-gray-600 dark:text-gray-400">
            <p>No awards information available at the moment.</p>
          </div>
        ) : (
          awards.map((award) => (
            <motion.div
              key={award.id}
              variants={itemVariants}
              whileHover={{ scale: 1.05, rotate: 1, transition: { duration: 0.2 } }}
              className="bg-gradient-to-br from-white to-indigo-50 dark:from-gray-800 dark:to-indigo-900/20 rounded-lg shadow-md p-6 hover:shadow-xl transition-all border border-gray-100 dark:border-gray-700 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-20 h-20 bg-indigo-100 dark:bg-indigo-900/30 rounded-full -mr-10 -mt-10 opacity-50"></div>
              <div className="relative">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="p-2 bg-indigo-600 rounded-full">
                    <AwardIcon className="text-white" size={24} />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                      {award.title}
                    </h3>
                  </div>
                </div>
                
                <div className="space-y-2 text-gray-600 dark:text-gray-300 text-sm mb-3">
                  <div className="flex items-center space-x-2">
                    <Building size={14} className="text-indigo-600" />
                    <span className="font-medium">{award.organization}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Calendar size={14} className="text-indigo-600" />
                    <span>{award.year}</span>
                  </div>
                </div>
                
                {award.description && (
                  <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed mt-3">
                    {award.description}
                  </p>
                )}
              </div>
            </motion.div>
          ))
        )}
      </motion.div>
    </SectionLayout>
  );
}
