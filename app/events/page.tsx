'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import SectionLayout from '@/components/SectionLayout';
import { getEvents } from '@/lib/supabase-utils';
import { Event } from '@/types';
import { Calendar, MapPin, Tag } from 'lucide-react';

export default function EventsPage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      const data = await getEvents();
      setEvents(data);
      setLoading(false);
    };
    fetchEvents();
  }, []);

  const getEventTypeColor = (type: string) => {
    const colors: Record<string, string> = {
      conference: 'bg-blue-100 text-blue-800',
      workshop: 'bg-purple-100 text-purple-800',
      seminar: 'bg-green-100 text-green-800',
      other: 'bg-gray-100 text-gray-800',
    };
    return colors[type] || colors.other;
  };

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
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 },
  };

  if (loading) {
    return (
      <SectionLayout title="Events Organised">
        <div className="flex justify-center items-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
        </div>
      </SectionLayout>
    );
  }

  return (
    <SectionLayout 
      title="Events Organised" 
      subtitle="Conferences, workshops, and seminars organized"
    >
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-4"
      >
        {events.length === 0 ? (
          <div className="text-center py-12 text-gray-600">
            <p>No events information available at the moment.</p>
          </div>
        ) : (
          events.map((event) => (
            <motion.div
              key={event.id}
              variants={itemVariants}
              whileHover={{ x: 5, transition: { duration: 0.2 } }}
              className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-all border-l-4 border-indigo-600"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className="text-xl font-semibold text-gray-900">
                      {event.title}
                    </h3>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${getEventTypeColor(
                        event.type
                      )}`}
                    >
                      <Tag size={12} className="inline mr-1" />
                      {event.type}
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="space-y-2 text-gray-600 text-sm mb-3">
                <div className="flex items-center space-x-2">
                  <Calendar size={16} className="text-indigo-600" />
                  <span><strong>Date:</strong> {event.date}</span>
                </div>
                {event.location && (
                  <div className="flex items-center space-x-2">
                    <MapPin size={16} className="text-indigo-600" />
                    <span><strong>Location:</strong> {event.location}</span>
                  </div>
                )}
              </div>
              
              {event.description && (
                <p className="text-gray-700 text-sm leading-relaxed mt-3">
                  {event.description}
                </p>
              )}
            </motion.div>
          ))
        )}
      </motion.div>
    </SectionLayout>
  );
}
