// frontend/components/admin/VideoUpload.tsx (اختياري)
'use client';

import { useState } from 'react';
import { uploadApi } from '@/lib/api';
import { FaCloudUploadAlt } from 'react-icons/fa';
import { motion } from 'framer-motion';

interface VideoUploadProps {
  onUpload: (url: string) => void;
  defaultVideo?: string;
}

export default function VideoUpload({ onUpload, defaultVideo }: VideoUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState(defaultVideo);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      const { url } = await uploadApi.uploadVideo(file);
      setPreview(url);
      onUpload(url);
    } catch (error) {
      console.error('Upload failed', error);
      alert('فشل رفع الفيديو');
    } finally {
      setUploading(false);
    }
  };

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="relative border-2 border-dashed border-white/20 rounded-xl p-6 text-center hover:border-[#00c6ff]/50 transition cursor-pointer bg-white/5"
    >
      <input
        type="file"
        accept="video/mp4,video/webm,video/ogg,video/quicktime"
        onChange={handleFileChange}
        disabled={uploading}
        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
      />
      <div className="flex flex-col items-center gap-2">
        <FaCloudUploadAlt className="text-4xl text-gray-400" />
        <p className="text-sm text-gray-300">
          {uploading ? 'جاري الرفع...' : 'اضغط لرفع فيديو'}
        </p>
      </div>
    </motion.div>
  );
}