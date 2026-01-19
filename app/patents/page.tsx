'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import SectionLayout from '@/components/SectionLayout';
import { getPatents } from '@/lib/supabase-utils';
import { Patent } from '@/types';
import { FileText, Award as AwardIcon, Calendar } from 'lucide-react';

export default function PatentsPage() {
  const [patents, setPatents] = useState<Patent[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPatents = async () => {
      const data = await getPatents();
      setPatents(data);
      setLoading(false);
    };
    fetchPatents();
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
      <SectionLayout title="Patents">
        <div className="flex justify-center items-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
        </div>
      </SectionLayout>
    );
  }

  return (
    <SectionLayout 
      title="Patents" 
      subtitle="Research patents and intellectual property"
    >
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid md:grid-cols-2 gap-6"
      >
        {patents.length === 0 ? (
          <div className="col-span-2 text-center py-12 text-gray-600 dark:text-gray-400">
            <p>No patents information available at the moment.</p>
          </div>
        ) : (
          patents.map((patent) => (
            <motion.div
              key={patent.id}
              variants={itemVariants}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 hover:shadow-xl transition-all border-l-4 border-indigo-600"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <FileText className="text-indigo-600 dark:text-indigo-400" size={20} />
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                      {patent.title}
                    </h3>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
                    <strong>Area:</strong> {patent.area}
                  </p>
                </div>
                <span
                  className={`ml-4 px-3 py-1 rounded-full text-xs font-medium ${
                    patent.status === 'granted'
                      ? 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300'
                      : 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300'
                  }`}
                >
                  {patent.status}
                </span>
              </div>
              
              <div className="space-y-2 text-gray-600 dark:text-gray-300 text-sm">
                {patent.patentNumber && (
                  <div className="flex items-center space-x-2">
                    <AwardIcon size={16} className="text-indigo-600" />
                    <span><strong>Patent Number:</strong> {patent.patentNumber}</span>
                  </div>
                )}
                {patent.year && (
                  <div className="flex items-center space-x-2">
                    <Calendar size={16} className="text-indigo-600" />
                    <span><strong>Year:</strong> {patent.year}</span>
                  </div>
                )}
              </div>
            </motion.div>
          ))
        )}
      </motion.div>
    </SectionLayout>
  );
}
