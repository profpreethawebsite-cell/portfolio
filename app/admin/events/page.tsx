'use client';

import { useEffect, useState } from 'react';
import ProtectedRoute from '@/components/ProtectedRoute';
import { motion } from 'framer-motion';
import { getEvents, addEvent, updateEvent, deleteEvent } from '@/lib/supabase-utils';
import { Event } from '@/types';
import { Plus, Edit, Trash2, X, Save } from 'lucide-react';
import Link from 'next/link';
import ThemeToggle from '@/components/ThemeToggle';

export default function AdminEventsPage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState<Partial<Event>>({
    title: '',
    type: 'conference',
    date: '',
    location: '',
    description: '',
  });

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    const data = await getEvents();
    setEvents(data);
    setLoading(false);
  };

  const handleAdd = () => {
    setEditing(null);
    setFormData({
      title: '',
      type: 'conference',
      date: '',
      location: '',
      description: '',
    });
    setShowForm(true);
  };

  const handleEdit = (event: Event) => {
    setEditing(event.id);
    setFormData(event);
    setShowForm(true);
  };

  const handleSave = async () => {
    try {
      if (editing) {
        await updateEvent(editing, formData);
      } else {
        await addEvent(formData as Omit<Event, 'id'>);
      }
      await fetchEvents();
      setShowForm(false);
      setEditing(null);
    } catch (error) {
      alert('Error saving event');
      console.error(error);
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this event?')) {
      try {
        await deleteEvent(id);
        await fetchEvents();
      } catch (error) {
        alert('Error deleting event');
        console.error(error);
      }
    }
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 dark:text-white">Manage Events</h1>
              <p className="text-gray-600 dark:text-gray-400 mt-2">Add, edit, or delete events</p>
            </div>
            <div className="flex space-x-4 items-center">
              <ThemeToggle />
              <Link
                href="/admin/dashboard"
                className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
              >
                Back to Dashboard
              </Link>
              <button
                onClick={handleAdd}
                className="flex items-center space-x-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
              >
                <Plus size={20} />
                <span>Add Event</span>
              </button>
            </div>
          </div>

          {showForm && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-6"
            >
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-semibold dark:text-white">
                  {editing ? 'Edit Event' : 'Add New Event'}
                </h2>
                <button onClick={() => setShowForm(false)} className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200">
                  <X size={24} />
                </button>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Title *</label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-600 dark:bg-gray-700 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Type *</label>
                  <select
                    value={formData.type}
                    onChange={(e) => setFormData({ ...formData, type: e.target.value as Event['type'] })}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-600 dark:bg-gray-700 dark:text-white"
                  >
                    <option value="conference">Conference</option>
                    <option value="workshop">Workshop</option>
                    <option value="seminar">Seminar</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Date *</label>
                  <input
                    type="text"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    placeholder="2024-01-15"
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-600 dark:bg-gray-700 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Location</label>
                  <input
                    type="text"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-600 dark:bg-gray-700 dark:text-white"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Description</label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    rows={4}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-600 dark:bg-gray-700 dark:text-white"
                  />
                </div>
              </div>
              <div className="mt-6 flex justify-end">
                <button
                  onClick={handleSave}
                  className="flex items-center space-x-2 px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                >
                  <Save size={20} />
                  <span>Save</span>
                </button>
              </div>
            </motion.div>
          )}

          <div className="space-y-4">
            {events.map((event) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 flex items-start justify-between"
              >
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">{event.title}</h3>
                  <div className="space-y-1 text-gray-600 dark:text-gray-400">
                    <p><strong>Type:</strong> {event.type}</p>
                    <p><strong>Date:</strong> {event.date}</p>
                    {event.location && <p><strong>Location:</strong> {event.location}</p>}
                    {event.description && <p><strong>Description:</strong> {event.description}</p>}
                  </div>
                </div>
                <div className="flex space-x-2 ml-4">
                  <button
                    onClick={() => handleEdit(event)}
                    className="p-2 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-900 rounded-lg transition-colors"
                  >
                    <Edit size={20} />
                  </button>
                  <button
                    onClick={() => handleDelete(event.id)}
                    className="p-2 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900 rounded-lg transition-colors"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}
