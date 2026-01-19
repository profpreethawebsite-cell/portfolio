'use client';

import { motion } from 'framer-motion';
import { CheckCircle } from 'lucide-react';

export default function About() {
  const qualifications = [
    'B.E (EEE) from Madras University, 2002',
    'M.S (By Research) from Anna University, 2007',
    'Ph.D from SRM University, 2015',
  ];

  const specialization = [
    'Voltage stability',
    'Machine Learning',
    'Artificial Intelligence',
    'Grid integration issues of renewable energy',
    'Building automation',
    'Microgrid',
  ];

  const achievements = [
    'Established NI ACADEMY AND RESEARCH CENTRE in SRM Institute of Science and Technology',
    'Published 55 international publications',
    'Published 1 book: "GA based placement of FACTS devices for voltage stability Enhancement"',
    'Published patents in building automation and underwater AUVs',
    'Chairman of MTS India Section',
    'Faculty mentor of SRM Marine Technology Society student chapter (Best student chapter award 2019)',
    'Received IEEE publication award, John P Craven mentor international award',
    'Honorary Rosalind member of London Journals Press',
  ];

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

  return (
    <section id="about" className="py-20 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            About
          </h2>
          <div className="w-24 h-1 bg-indigo-600 mx-auto"></div>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 gap-12"
        >
          <motion.div variants={itemVariants} className="space-y-6">
            <div>
              <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                Professional Experience
              </h3>
              <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                With 20 years of professional experience, Dr. J. Preetha Roselyn is a
                distinguished Professor in the Department of Electrical and Electronics
                Engineering at SRM Institute of Science and Technology. She has made
                significant contributions to the fields of power systems, renewable energy,
                and smart grid technologies.
              </p>
            </div>

            <div>
              <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                Qualifications
              </h3>
              <ul className="space-y-2">
                {qualifications.map((qual, index) => (
                  <motion.li
                    key={index}
                    variants={itemVariants}
                    className="flex items-start space-x-3 text-gray-700 dark:text-gray-300"
                  >
                    <CheckCircle className="text-indigo-600 dark:text-indigo-400 mt-1 flex-shrink-0" size={20} />
                    <span>{qual}</span>
                  </motion.li>
                ))}
              </ul>
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="space-y-6">
            <div>
              <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                Areas of Specialization
              </h3>
              <div className="flex flex-wrap gap-2">
                {specialization.map((spec, index) => (
                  <motion.span
                    key={index}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="px-4 py-2 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-800 dark:text-indigo-300 rounded-full text-sm font-medium"
                  >
                    {spec}
                  </motion.span>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                Key Achievements
              </h3>
              <ul className="space-y-3">
                {achievements.map((achievement, index) => (
                  <motion.li
                    key={index}
                    variants={itemVariants}
                    className="flex items-start space-x-3 text-gray-700 dark:text-gray-300"
                  >
                    <CheckCircle className="text-green-600 dark:text-green-400 mt-1 flex-shrink-0" size={20} />
                    <span>{achievement}</span>
                  </motion.li>
                ))}
              </ul>
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-12 p-6 bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 rounded-lg"
        >
          <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
            Research Interests
          </h3>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            Model-based development, digital twin, grid integration issues of PV and Wind,
            Energy management system in microgrid, building management systems, and zero
            downtime approach in industries.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
