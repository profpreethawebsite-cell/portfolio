'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { ArrowDown, Award, BookOpen, GraduationCap, Users } from 'lucide-react';
import Image from 'next/image';

export default function Hero() {
  const [profileData, setProfileData] = useState({
    name: 'Dr. J. Preetha Roselyn',
    title: 'Professor',
    department: 'Department of Electrical and Electronics Engineering',
    university: 'SRM Institute of Science and Technology',
  });

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-white to-purple-50 overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: 'linear',
          }}
          className="absolute top-20 left-10 w-72 h-72 bg-indigo-200 rounded-full mix-blend-multiply filter blur-xl opacity-20"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            rotate: [90, 0, 90],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: 'linear',
          }}
          className="absolute bottom-20 right-10 w-96 h-96 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-20"
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Profile Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="flex justify-center mb-8"
          >
            <div className="relative">
              {/* Decorative rings */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 opacity-20 blur-2xl animate-pulse"></div>
              <div className="absolute -inset-2 rounded-full bg-gradient-to-r from-indigo-200 via-purple-200 to-pink-200 opacity-30"></div>
              
              {/* Image container with elegant frame */}
              <div className="relative w-48 h-48 md:w-64 md:h-64 rounded-full overflow-hidden shadow-2xl ring-4 ring-white ring-offset-4 ring-offset-indigo-50">
                <Image
                  src="/profile-image.png"
                  alt="Dr. J. Preetha Roselyn"
                  fill
                  className="object-cover object-center"
                  priority
                  sizes="(max-width: 768px) 192px, 256px"
                />
              </div>
              
              {/* Decorative accent */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                className="absolute -top-2 -right-2 w-8 h-8 bg-indigo-500 rounded-full opacity-80"
              />
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
                className="absolute -bottom-2 -left-2 w-6 h-6 bg-purple-500 rounded-full opacity-80"
              />
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-5xl md:text-7xl font-bold text-gray-900 mb-4"
          >
            {profileData.name}
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="text-2xl md:text-3xl text-indigo-600 font-semibold mb-2"
          >
            {profileData.title}
          </motion.p>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="text-lg md:text-xl text-gray-600 mb-8"
          >
            {profileData.department}<br />
            {profileData.university}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9 }}
            className="flex flex-wrap justify-center gap-8 mt-12"
          >
            <div className="flex items-center space-x-2 text-gray-700">
              <GraduationCap className="text-indigo-600" size={24} />
              <span className="text-sm font-medium">20+ Years Experience</span>
            </div>
            <div className="flex items-center space-x-2 text-gray-700">
              <BookOpen className="text-indigo-600" size={24} />
              <span className="text-sm font-medium">55+ Publications</span>
            </div>
            <div className="flex items-center space-x-2 text-gray-700">
              <Users className="text-indigo-600" size={24} />
              <span className="text-sm font-medium">11 PhD Scholars</span>
            </div>
            <div className="flex items-center space-x-2 text-gray-700">
              <Award className="text-indigo-600" size={24} />
              <span className="text-sm font-medium">Multiple Awards</span>
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <ArrowDown className="text-indigo-600" size={32} />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
