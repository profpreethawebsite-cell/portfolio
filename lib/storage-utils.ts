import { supabase } from './supabase';

export const uploadImage = async (file: File, path: string): Promise<string> => {
  try {
    const { data, error } = await supabase.storage
      .from('gallery')
      .upload(path, file, {
        cacheControl: '3600',
        upsert: false,
      });

    if (error) throw error;

    const { data: urlData } = supabase.storage
      .from('gallery')
      .getPublicUrl(data.path);

    return urlData.publicUrl;
  } catch (error) {
    console.error('Error uploading image:', error);
    throw error;
  }
};

export const deleteImage = async (url: string): Promise<void> => {
  try {
    // Extract path from Supabase Storage URL
    const urlObj = new URL(url);
    const pathParts = urlObj.pathname.split('/');
    const bucketIndex = pathParts.findIndex((part) => part === 'gallery');
    
    if (bucketIndex !== -1 && bucketIndex < pathParts.length - 1) {
      const filePath = pathParts.slice(bucketIndex + 1).join('/');
      const { error } = await supabase.storage
        .from('gallery')
        .remove([filePath]);
      
      if (error) throw error;
    }
  } catch (error) {
    console.error('Error deleting image:', error);
    throw error;
  }
};

export const generateImagePath = (fileName: string): string => {
  const timestamp = Date.now();
  const randomString = Math.random().toString(36).substring(2, 15);
  const extension = fileName.split('.').pop();
  return `${timestamp}_${randomString}.${extension}`;
};
