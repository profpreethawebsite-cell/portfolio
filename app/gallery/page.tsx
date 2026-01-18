'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import SectionLayout from '@/components/SectionLayout';
import { getGalleryImages } from '@/lib/supabase-utils';
import { GalleryImage } from '@/types';
import Image from 'next/image';

export default function GalleryPage() {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);

  useEffect(() => {
    const fetchImages = async () => {
      const data = await getGalleryImages();
      setImages(data);
      setLoading(false);
    };
    fetchImages();
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
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1 },
  };

  if (loading) {
    return (
      <SectionLayout title="Gallery">
        <div className="flex justify-center items-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
        </div>
      </SectionLayout>
    );
  }

  return (
    <SectionLayout title="Gallery" subtitle="Photos and images from various events and activities">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
      >
        {images.length === 0 ? (
          <div className="col-span-full text-center py-12 text-gray-600">
            <p>No gallery images available at the moment.</p>
          </div>
        ) : (
          images.map((image) => (
            <motion.div
              key={image.id}
              variants={itemVariants}
              whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
              onClick={() => setSelectedImage(image)}
              className="relative aspect-square rounded-lg overflow-hidden cursor-pointer shadow-md hover:shadow-xl transition-shadow group"
            >
              <Image
                src={image.url}
                alt={image.caption || 'Gallery image'}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-300"
              />
              {image.caption && (
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                  <p className="text-white text-sm font-medium">{image.caption}</p>
                </div>
              )}
            </motion.div>
          ))
        )}
      </motion.div>

      {/* Modal for full image view */}
      {selectedImage && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            className="relative max-w-4xl max-h-full"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 text-white bg-black/50 rounded-full p-2 hover:bg-black/70 transition-colors z-10"
            >
              ✕
            </button>
            <Image
              src={selectedImage.url}
              alt={selectedImage.caption || 'Gallery image'}
              width={1200}
              height={800}
              className="rounded-lg"
            />
            {selectedImage.caption && (
              <p className="text-white text-center mt-4">{selectedImage.caption}</p>
            )}
          </motion.div>
        </motion.div>
      )}
    </SectionLayout>
  );
}
