'use client';

import { useEffect, useState, useRef } from 'react';
import ProtectedRoute from '@/components/ProtectedRoute';
import { motion } from 'framer-motion';
import { getGalleryImages, addGalleryImage, deleteGalleryImage } from '@/lib/supabase-utils';
import { uploadImage, deleteImage, generateImagePath } from '@/lib/storage-utils';
import { GalleryImage } from '@/types';
import { Plus, Edit, Trash2, X, Save, Upload, Image as ImageIcon } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import ThemeToggle from '@/components/ThemeToggle';

export default function AdminGalleryPage() {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState<{ caption: string; category: string; file: File | null }>({
    caption: '',
    category: '',
    file: null,
  });
  const [preview, setPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    const data = await getGalleryImages();
    setImages(data);
    setLoading(false);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert('Image size should be less than 5MB');
        return;
      }
      if (!file.type.startsWith('image/')) {
        alert('Please select an image file');
        return;
      }
      setFormData({ ...formData, file });
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAdd = () => {
    setFormData({ caption: '', category: '', file: null });
    setPreview(null);
    setShowForm(true);
  };

  const handleSave = async () => {
    if (!formData.file) {
      alert('Please select an image file');
      return;
    }

    setUploading(true);
    try {
      // Upload image to Firebase Storage
      const imagePath = generateImagePath(formData.file.name);
      const downloadURL = await uploadImage(formData.file, imagePath);

      // Save image metadata to Firestore
      await addGalleryImage({
        url: downloadURL,
        caption: formData.caption || undefined,
        category: formData.category || undefined,
      });

      await fetchImages();
      setShowForm(false);
      setFormData({ caption: '', category: '', file: null });
      setPreview(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    } catch (error) {
      alert('Error uploading image. Please try again.');
      console.error(error);
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (image: GalleryImage) => {
    if (confirm('Are you sure you want to delete this image?')) {
      try {
        // Delete from Storage
        await deleteImage(image.url);
        // Delete from Firestore
        await deleteGalleryImage(image.id);
        await fetchImages();
      } catch (error) {
        alert('Error deleting image');
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
              <h1 className="text-4xl font-bold text-gray-900 dark:text-white">Manage Gallery</h1>
              <p className="text-gray-600 dark:text-gray-400 mt-2">Upload, edit, or delete gallery images</p>
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
                <span>Add Image</span>
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
                <h2 className="text-2xl font-semibold dark:text-white">Upload New Image</h2>
                <button onClick={() => setShowForm(false)} className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200">
                  <X size={24} />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Image File *
                  </label>
                  <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-6 text-center hover:border-indigo-500 dark:hover:border-indigo-400 transition-colors">
                    {preview ? (
                      <div className="space-y-4">
                        <Image
                          src={preview}
                          alt="Preview"
                          width={300}
                          height={200}
                          className="mx-auto rounded-lg object-cover"
                        />
                        <button
                          onClick={() => {
                            setFormData({ ...formData, file: null });
                            setPreview(null);
                            if (fileInputRef.current) fileInputRef.current.value = '';
                          }}
                          className="text-sm text-red-600 hover:text-red-700"
                        >
                          Remove Image
                        </button>
                      </div>
                    ) : (
                      <div>
                        <ImageIcon className="mx-auto text-gray-400 dark:text-gray-500 mb-2" size={48} />
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                          Click to upload or drag and drop
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">PNG, JPG, GIF up to 5MB</p>
                      </div>
                    )}
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleFileSelect}
                      className="hidden"
                      id="image-upload"
                    />
                    <label
                      htmlFor="image-upload"
                      className="mt-2 inline-block px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 cursor-pointer transition-colors"
                    >
                      <Upload size={16} className="inline mr-2" />
                      Choose Image
                    </label>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Caption</label>
                    <input
                      type="text"
                      value={formData.caption}
                      onChange={(e) => setFormData({ ...formData, caption: e.target.value })}
                      placeholder="Image caption (optional)"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-600"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                    <input
                      type="text"
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      placeholder="e.g., Events, Awards (optional)"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-600"
                    />
                  </div>
                </div>

                <div className="flex justify-end space-x-4">
                  <button
                    onClick={() => setShowForm(false)}
                    className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSave}
                    disabled={uploading || !formData.file}
                    className="flex items-center space-x-2 px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {uploading ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                        <span>Uploading...</span>
                      </>
                    ) : (
                      <>
                        <Save size={20} />
                        <span>Upload Image</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {loading ? (
            <div className="flex justify-center items-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {images.length === 0 ? (
                <div className="col-span-full text-center py-12 text-gray-600">
                  <ImageIcon className="mx-auto text-gray-400 mb-4" size={64} />
                  <p>No images in gallery. Upload your first image!</p>
                </div>
              ) : (
                images.map((image) => (
                  <motion.div
                    key={image.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow"
                  >
                    <div className="relative aspect-square">
                      <Image
                        src={image.url}
                        alt={image.caption || 'Gallery image'}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="p-4">
                      {image.caption && (
                        <p className="text-sm font-medium text-gray-900 dark:text-white mb-1">{image.caption}</p>
                      )}
                      {image.category && (
                        <p className="text-xs text-gray-500 dark:text-gray-400 mb-3">{image.category}</p>
                      )}
                      <button
                        onClick={() => handleDelete(image)}
                        className="w-full flex items-center justify-center space-x-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm"
                      >
                        <Trash2 size={16} />
                        <span>Delete</span>
                      </button>
                    </div>
                  </motion.div>
                ))
              )}
            </div>
          )}
        </div>
      </div>
    </ProtectedRoute>
  );
}
