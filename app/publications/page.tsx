'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import SectionLayout from '@/components/SectionLayout';
import { getPublications } from '@/lib/firebase-utils';
import { Publication } from '@/types';
import { BookOpen, Calendar, ExternalLink } from 'lucide-react';

export default function PublicationsPage() {
  const [publications, setPublications] = useState<Publication[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPublications = async () => {
      const data = await getPublications();
      setPublications(data);
      setLoading(false);
    };
    fetchPublications();
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 },
  };

  if (loading) {
    return (
      <SectionLayout title="Publications">
        <div className="flex justify-center items-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
        </div>
      </SectionLayout>
    );
  }

  return (
    <SectionLayout 
      title="Publications" 
      subtitle="International publications and research papers"
    >
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-4"
      >
        {publications.length === 0 ? (
          <div className="text-center py-12 text-gray-600">
            <p>No publications available at the moment.</p>
          </div>
        ) : (
          publications.map((pub) => (
            <motion.div
              key={pub.id}
              variants={itemVariants}
              whileHover={{ x: 5, transition: { duration: 0.2 } }}
              className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-all border-l-4 border-indigo-600"
            >
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                {pub.title}
              </h3>
              <div className="space-y-2 text-gray-600 mb-3">
                <div className="flex items-center space-x-2 text-sm">
                  <BookOpen size={14} className="text-indigo-600" />
                  <span><strong>Authors:</strong> {pub.authors}</span>
                </div>
                <div className="flex items-center space-x-2 text-sm">
                  <Calendar size={14} className="text-indigo-600" />
                  <span><strong>Journal:</strong> {pub.journal}, {pub.year}</span>
                </div>
              </div>
              {(pub.link || pub.doi) && (
                <div className="flex gap-3 mt-4">
                  {pub.link && (
                    <a
                      href={pub.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center space-x-1 text-indigo-600 hover:text-indigo-700 text-sm font-medium"
                    >
                      <ExternalLink size={14} />
                      <span>View Paper</span>
                    </a>
                  )}
                  {pub.doi && (
                    <span className="text-sm text-gray-500">DOI: {pub.doi}</span>
                  )}
                </div>
              )}
            </motion.div>
          ))
        )}
      </motion.div>
    </SectionLayout>
  );
}
