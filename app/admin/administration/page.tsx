'use client';

import { useEffect, useState } from 'react';
import ProtectedRoute from '@/components/ProtectedRoute';
import { motion } from 'framer-motion';
import { getAdminRoles, addAdminRole, updateAdminRole, deleteAdminRole } from '@/lib/supabase-utils';
import { AdminRole } from '@/types';
import { Plus, Edit, Trash2, X, Save } from 'lucide-react';
import Link from 'next/link';
import ThemeToggle from '@/components/ThemeToggle';

export default function AdminAdministrationPage() {
  const [roles, setRoles] = useState<AdminRole[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState<Partial<AdminRole>>({
    title: '',
    organization: '',
    period: '',
    description: '',
  });

  useEffect(() => {
    fetchRoles();
  }, []);

  const fetchRoles = async () => {
    const data = await getAdminRoles();
    setRoles(data);
    setLoading(false);
  };

  const handleAdd = () => {
    setEditing(null);
    setFormData({
      title: '',
      organization: '',
      period: '',
      description: '',
    });
    setShowForm(true);
  };

  const handleEdit = (role: AdminRole) => {
    setEditing(role.id);
    setFormData(role);
    setShowForm(true);
  };

  const handleSave = async () => {
    try {
      if (editing) {
        await updateAdminRole(editing, formData);
      } else {
        await addAdminRole(formData as Omit<AdminRole, 'id'>);
      }
      await fetchRoles();
      setShowForm(false);
      setEditing(null);
    } catch (error) {
      alert('Error saving admin role');
      console.error(error);
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this admin role?')) {
      try {
        await deleteAdminRole(id);
        await fetchRoles();
      } catch (error) {
        alert('Error deleting admin role');
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
              <h1 className="text-4xl font-bold text-gray-900 dark:text-white">Manage Administration Roles</h1>
              <p className="text-gray-600 dark:text-gray-400 mt-2">Add, edit, or delete administration roles</p>
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
                <span>Add Role</span>
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
                  {editing ? 'Edit Administration Role' : 'Add New Administration Role'}
                </h2>
                <button onClick={() => setShowForm(false)} className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200">
                  <X size={24} />
                </button>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Title *</label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-600 dark:bg-gray-700 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Organization *</label>
                  <input
                    type="text"
                    value={formData.organization}
                    onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-600 dark:bg-gray-700 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Period *</label>
                  <input
                    type="text"
                    value={formData.period}
                    onChange={(e) => setFormData({ ...formData, period: e.target.value })}
                    placeholder="2020 - Present"
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
            {roles.map((role) => (
              <motion.div
                key={role.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 flex items-start justify-between"
              >
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">{role.title}</h3>
                  <div className="space-y-1 text-gray-600 dark:text-gray-400">
                    <p><strong>Organization:</strong> {role.organization}</p>
                    <p><strong>Period:</strong> {role.period}</p>
                    {role.description && <p><strong>Description:</strong> {role.description}</p>}
                  </div>
                </div>
                <div className="flex space-x-2 ml-4">
                  <button
                    onClick={() => handleEdit(role)}
                    className="p-2 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-900 rounded-lg transition-colors"
                  >
                    <Edit size={20} />
                  </button>
                  <button
                    onClick={() => handleDelete(role.id)}
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
