'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import SectionLayout from '@/components/SectionLayout';
import { getGrants } from '@/lib/supabase-utils';
import { Grant } from '@/types';
import { DollarSign, Calendar, FileText } from 'lucide-react';

export default function GrantsPage() {
  const [grants, setGrants] = useState<Grant[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGrants = async () => {
      const data = await getGrants();
      setGrants(data);
      setLoading(false);
    };
    fetchGrants();
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
      <SectionLayout title="Funded Grants">
        <div className="flex justify-center items-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
        </div>
      </SectionLayout>
    );
  }

  return (
    <SectionLayout title="Funded Grants" subtitle="Research projects and grants received">
      <div className="grid md:grid-cols-2 gap-6">
        {grants.length === 0 ? (
          <div className="col-span-2 text-center py-12 text-gray-600">
            <p>No grants information available at the moment.</p>
          </div>
        ) : (
          grants.map((grant) => (
            <motion.div
              key={grant.id}
              variants={itemVariants}
              initial="hidden"
              animate="visible"
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
              className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow border border-gray-100"
            >
              <div className="flex items-start justify-between mb-4">
                <h3 className="text-xl font-semibold text-gray-900 flex-1">
                  {grant.title}
                </h3>
                <span
                  className={`ml-4 px-3 py-1 rounded-full text-xs font-medium ${
                    grant.status === 'ongoing'
                      ? 'bg-green-100 text-green-800'
                      : 'bg-gray-100 text-gray-800'
                  }`}
                >
                  {grant.status}
                </span>
              </div>
              
              <div className="space-y-2 text-gray-600 mb-4">
                <div className="flex items-center space-x-2">
                  <FileText size={16} className="text-indigo-600" />
                  <span className="font-medium">Funding Agency:</span>
                  <span>{grant.fundingAgency}</span>
                </div>
                {grant.amount && (
                  <div className="flex items-center space-x-2">
                    <DollarSign size={16} className="text-indigo-600" />
                    <span className="font-medium">Amount:</span>
                    <span>{grant.amount}</span>
                  </div>
                )}
                <div className="flex items-center space-x-2">
                  <Calendar size={16} className="text-indigo-600" />
                  <span className="font-medium">Period:</span>
                  <span>{grant.period}</span>
                </div>
              </div>
              
              {grant.description && (
                <p className="text-gray-700 text-sm leading-relaxed">
                  {grant.description}
                </p>
              )}
            </motion.div>
          ))
        )}
      </div>
    </SectionLayout>
  );
}
