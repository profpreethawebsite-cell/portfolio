'use client';

import { useEffect, useState } from 'react';
import ProtectedRoute from '@/components/ProtectedRoute';
import { motion } from 'framer-motion';
import { getProfile, updateProfile } from '@/lib/supabase-utils';
import { ProfileData } from '@/types';
import { Save, Plus, X } from 'lucide-react';
import Link from 'next/link';
import ThemeToggle from '@/components/ThemeToggle';

export default function AdminProfilePage() {
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState<Partial<ProfileData>>({});

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    const data = await getProfile();
    if (data) {
      setProfile(data);
      setFormData(data);
    }
    setLoading(false);
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      await updateProfile(formData);
      await fetchProfile();
      alert('Profile updated successfully!');
    } catch (error) {
      alert('Error updating profile');
      console.error(error);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <ProtectedRoute>
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
        </div>
      </ProtectedRoute>
    );
  }

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 dark:text-white">Manage Profile</h1>
              <p className="text-gray-600 dark:text-gray-400 mt-2">Update profile information</p>
            </div>
            <div className="flex space-x-4 items-center">
              <ThemeToggle />
              <Link
                href="/admin/dashboard"
                className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
              >
                Back to Dashboard
              </Link>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6"
          >
            <div className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Name *</label>
                  <input
                    type="text"
                    value={formData.name || ''}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-600 dark:bg-gray-700 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Title *</label>
                  <input
                    type="text"
                    value={formData.title || ''}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-600 dark:bg-gray-700 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Department *</label>
                  <input
                    type="text"
                    value={formData.department || ''}
                    onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-600 dark:bg-gray-700 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">University *</label>
                  <input
                    type="text"
                    value={formData.university || ''}
                    onChange={(e) => setFormData({ ...formData, university: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-600 dark:bg-gray-700 dark:text-white"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Bio</label>
                  <textarea
                    value={formData.bio || ''}
                    onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                    rows={4}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-600 dark:bg-gray-700 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Years of Experience</label>
                  <input
                    type="number"
                    value={formData.yearsOfExperience || ''}
                    onChange={(e) => setFormData({ ...formData, yearsOfExperience: parseInt(e.target.value) || 0 })}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-600 dark:bg-gray-700 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">PhD Scholars Count</label>
                  <input
                    type="number"
                    value={formData.scholarsCount || ''}
                    onChange={(e) => setFormData({ ...formData, scholarsCount: parseInt(e.target.value) || 0 })}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-600 dark:bg-gray-700 dark:text-white"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Professional Experience (Detailed)</label>
                  <textarea
                    value={formData.experience || ''}
                    onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                    rows={4}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-600 dark:bg-gray-700 dark:text-white"
                    placeholder="Describe your professional experience..."
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Research Interests</label>
                  <textarea
                    value={formData.researchInterests || ''}
                    onChange={(e) => setFormData({ ...formData, researchInterests: e.target.value })}
                    rows={3}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-600 dark:bg-gray-700 dark:text-white"
                    placeholder="Model-based development, digital twin, grid integration issues..."
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Email</label>
                  <input
                    type="email"
                    value={formData.email || ''}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-600 dark:bg-gray-700 dark:text-white"
                    placeholder="preethaj@srmist.edu.in"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Phone</label>
                  <input
                    type="text"
                    value={formData.phone || ''}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-600 dark:bg-gray-700 dark:text-white"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Address</label>
                  <textarea
                    value={formData.address || ''}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    rows={2}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-600 dark:bg-gray-700 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">LinkedIn URL</label>
                  <input
                    type="url"
                    value={formData.linkedinUrl || ''}
                    onChange={(e) => setFormData({ ...formData, linkedinUrl: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-600 dark:bg-gray-700 dark:text-white"
                    placeholder="https://www.linkedin.com/in/preetha-roselyn-17911916/"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">College Profile URL</label>
                  <input
                    type="url"
                    value={formData.collegeUrl || ''}
                    onChange={(e) => setFormData({ ...formData, collegeUrl: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-600 dark:bg-gray-700 dark:text-white"
                    placeholder="https://www.srmist.edu.in/faculty/dr-j-preetha-roselyn/"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Profile Image URL</label>
                  <input
                    type="url"
                    value={formData.profileImage || ''}
                    onChange={(e) => setFormData({ ...formData, profileImage: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-600 dark:bg-gray-700 dark:text-white"
                    placeholder="/profile-image.png"
                  />
                </div>
              </div>

              {/* Qualifications Array */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Qualifications</label>
                <div className="space-y-2">
                  {(formData.qualifications || []).map((qual, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <input
                        type="text"
                        value={qual}
                        onChange={(e) => {
                          const newQuals = [...(formData.qualifications || [])];
                          newQuals[index] = e.target.value;
                          setFormData({ ...formData, qualifications: newQuals });
                        }}
                        className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-600 dark:bg-gray-700 dark:text-white"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          const newQuals = (formData.qualifications || []).filter((_, i) => i !== index);
                          setFormData({ ...formData, qualifications: newQuals });
                        }}
                        className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                      >
                        <X size={20} />
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() => {
                      setFormData({
                        ...formData,
                        qualifications: [...(formData.qualifications || []), ''],
                      });
                    }}
                    className="flex items-center space-x-2 px-4 py-2 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 rounded-lg transition-colors"
                  >
                    <Plus size={20} />
                    <span>Add Qualification</span>
                  </button>
                </div>
              </div>

              {/* Specialization Array */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Areas of Specialization</label>
                <div className="space-y-2">
                  {(formData.specialization || []).map((spec, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <input
                        type="text"
                        value={spec}
                        onChange={(e) => {
                          const newSpecs = [...(formData.specialization || [])];
                          newSpecs[index] = e.target.value;
                          setFormData({ ...formData, specialization: newSpecs });
                        }}
                        className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-600 dark:bg-gray-700 dark:text-white"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          const newSpecs = (formData.specialization || []).filter((_, i) => i !== index);
                          setFormData({ ...formData, specialization: newSpecs });
                        }}
                        className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                      >
                        <X size={20} />
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() => {
                      setFormData({
                        ...formData,
                        specialization: [...(formData.specialization || []), ''],
                      });
                    }}
                    className="flex items-center space-x-2 px-4 py-2 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 rounded-lg transition-colors"
                  >
                    <Plus size={20} />
                    <span>Add Specialization</span>
                  </button>
                </div>
              </div>

              {/* Achievements Array */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Key Achievements</label>
                <div className="space-y-2">
                  {(formData.achievements || []).map((achievement, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <textarea
                        value={achievement}
                        onChange={(e) => {
                          const newAchievements = [...(formData.achievements || [])];
                          newAchievements[index] = e.target.value;
                          setFormData({ ...formData, achievements: newAchievements });
                        }}
                        rows={2}
                        className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-600 dark:bg-gray-700 dark:text-white"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          const newAchievements = (formData.achievements || []).filter((_, i) => i !== index);
                          setFormData({ ...formData, achievements: newAchievements });
                        }}
                        className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                      >
                        <X size={20} />
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() => {
                      setFormData({
                        ...formData,
                        achievements: [...(formData.achievements || []), ''],
                      });
                    }}
                    className="flex items-center space-x-2 px-4 py-2 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 rounded-lg transition-colors"
                  >
                    <Plus size={20} />
                    <span>Add Achievement</span>
                  </button>
                </div>
              </div>
              <div className="flex justify-end">
                <button
                  onClick={handleSave}
                  disabled={saving}
                  className="flex items-center space-x-2 px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors disabled:opacity-50"
                >
                  <Save size={20} />
                  <span>{saving ? 'Saving...' : 'Save Profile'}</span>
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </ProtectedRoute>
  );
}
