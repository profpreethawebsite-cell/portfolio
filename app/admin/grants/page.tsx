'use client';

import { useEffect, useState } from 'react';
import ProtectedRoute from '@/components/ProtectedRoute';
import { motion } from 'framer-motion';
import { getGrants, addGrant, updateGrant, deleteGrant } from '@/lib/firebase-utils';
import { Grant } from '@/types';
import { Plus, Edit, Trash2, X, Save } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function AdminGrantsPage() {
  const [grants, setGrants] = useState<Grant[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState<Partial<Grant>>({
    title: '',
    fundingAgency: '',
    amount: '',
    period: '',
    status: 'ongoing',
    description: '',
  });

  useEffect(() => {
    fetchGrants();
  }, []);

  const fetchGrants = async () => {
    const data = await getGrants();
    setGrants(data);
    setLoading(false);
  };

  const handleAdd = () => {
    setEditing(null);
    setFormData({
      title: '',
      fundingAgency: '',
      amount: '',
      period: '',
      status: 'ongoing',
      description: '',
    });
    setShowForm(true);
  };

  const handleEdit = (grant: Grant) => {
    setEditing(grant.id);
    setFormData(grant);
    setShowForm(true);
  };

  const handleSave = async () => {
    try {
      if (editing) {
        await updateGrant(editing, formData);
      } else {
        await addGrant(formData as Omit<Grant, 'id'>);
      }
      await fetchGrants();
      setShowForm(false);
      setEditing(null);
      setFormData({
        title: '',
        fundingAgency: '',
        amount: '',
        period: '',
        status: 'ongoing',
        description: '',
      });
    } catch (error) {
      alert('Error saving grant');
      console.error(error);
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this grant?')) {
      try {
        await deleteGrant(id);
        await fetchGrants();
      } catch (error) {
        alert('Error deleting grant');
        console.error(error);
      }
    }
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-4xl font-bold text-gray-900">Manage Grants</h1>
              <p className="text-gray-600 mt-2">Add, edit, or delete grant information</p>
            </div>
            <div className="flex space-x-4">
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
                <span>Add Grant</span>
              </button>
            </div>
          </div>

          {showForm && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-lg shadow-lg p-6 mb-6"
            >
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-semibold">
                  {editing ? 'Edit Grant' : 'Add New Grant'}
                </h2>
                <button onClick={() => setShowForm(false)} className="text-gray-500 hover:text-gray-700">
                  <X size={24} />
                </button>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Title *</label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-600"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Funding Agency *</label>
                  <input
                    type="text"
                    value={formData.fundingAgency}
                    onChange={(e) => setFormData({ ...formData, fundingAgency: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-600"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Amount</label>
                  <input
                    type="text"
                    value={formData.amount}
                    onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-600"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Period *</label>
                  <input
                    type="text"
                    value={formData.period}
                    onChange={(e) => setFormData({ ...formData, period: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-600"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Status *</label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value as 'ongoing' | 'completed' })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-600"
                  >
                    <option value="ongoing">Ongoing</option>
                    <option value="completed">Completed</option>
                  </select>
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    rows={4}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-600"
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
            {grants.map((grant) => (
              <motion.div
                key={grant.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-lg shadow-md p-6 flex items-start justify-between"
              >
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{grant.title}</h3>
                  <div className="space-y-1 text-gray-600">
                    <p><strong>Funding Agency:</strong> {grant.fundingAgency}</p>
                    {grant.amount && <p><strong>Amount:</strong> {grant.amount}</p>}
                    <p><strong>Period:</strong> {grant.period}</p>
                    <p><strong>Status:</strong> {grant.status}</p>
                  </div>
                </div>
                <div className="flex space-x-2 ml-4">
                  <button
                    onClick={() => handleEdit(grant)}
                    className="p-2 text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
                  >
                    <Edit size={20} />
                  </button>
                  <button
                    onClick={() => handleDelete(grant.id)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
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
