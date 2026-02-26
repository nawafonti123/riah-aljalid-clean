// frontend/components/admin/ProjectForm.tsx
'use client';

import { useState } from 'react';
import { toast } from 'react-hot-toast';
import { motion, AnimatePresence } from 'framer-motion';
import { FaSnowflake, FaTimes, FaPlus } from 'react-icons/fa';
import ImageUpload from './ImageUpload';
import VideoUpload from './VideoUpload';
import { projectsApi } from '@/lib/api';

interface Project {
  id?: string;
  title: string;
  description: string;
  category?: string;
  isFeatured?: boolean;
  images?: string[];
  videos?: string[];
}

interface ProjectFormProps {
  onSuccess: () => void;
  onCancel: () => void;
  initialData?: Project;
}

export default function ProjectForm({ onSuccess, onCancel, initialData }: ProjectFormProps) {
  const [formData, setFormData] = useState<Project>({
    title: initialData?.title || '',
    description: initialData?.description || '',
    category: initialData?.category || '',
    isFeatured: initialData?.isFeatured || false,
    images: initialData?.images || [],
    videos: initialData?.videos || [],
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (initialData?.id) {
        await projectsApi.update(initialData.id, formData);
        toast.success('تم تحديث المشروع بنجاح');
      } else {
        await projectsApi.create(formData);
        toast.success('تم إضافة المشروع بنجاح');
      }
      onSuccess();
    } catch (error) {
      console.error(error);
      toast.error('حدث خطأ أثناء الحفظ');
    } finally {
      setLoading(false);
    }
  };

  const addImage = (url: string) => {
    setFormData(prev => ({ ...prev, images: [...(prev.images || []), url] }));
  };

  const removeImage = (index: number) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images?.filter((_, i) => i !== index) || [],
    }));
  };

  const addVideo = (url: string) => {
    setFormData(prev => ({ ...prev, videos: [...(prev.videos || []), url] }));
  };

  const removeVideo = (index: number) => {
    setFormData(prev => ({
      ...prev,
      videos: prev.videos?.filter((_, i) => i !== index) || [],
    }));
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.3 }}
      className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-8 shadow-2xl border border-white/10 max-h-[90vh] overflow-y-auto"
    >
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-white flex items-center gap-2">
          <FaSnowflake className="text-[#00c6ff]" />
          {initialData ? 'تعديل المشروع' : 'إضافة مشروع جديد'}
        </h2>
        <button
          onClick={onCancel}
          className="text-gray-400 hover:text-white transition-colors"
        >
          <FaTimes className="text-xl" />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block text-gray-300 text-sm mb-2">العنوان</label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            required
            className="w-full p-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:border-[#00c6ff] focus:outline-none focus:ring-1 focus:ring-[#00c6ff]/50 transition"
            placeholder="أدخل عنوان المشروع"
          />
        </div>

        <div>
          <label className="block text-gray-300 text-sm mb-2">الوصف</label>
          <textarea
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            required
            rows={4}
            className="w-full p-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:border-[#00c6ff] focus:outline-none focus:ring-1 focus:ring-[#00c6ff]/50 transition"
            placeholder="أدخل وصف المشروع"
          />
        </div>

        <div>
          <label className="block text-gray-300 text-sm mb-2">التصنيف</label>
          <input
            type="text"
            value={formData.category}
            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            className="w-full p-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:border-[#00c6ff] focus:outline-none focus:ring-1 focus:ring-[#00c6ff]/50 transition"
            placeholder="مثال: تجاري، سكني، صناعي"
          />
        </div>

        <div className="flex items-center gap-3">
          <input
            type="checkbox"
            id="isFeatured"
            checked={formData.isFeatured}
            onChange={(e) => setFormData({ ...formData, isFeatured: e.target.checked })}
            className="w-5 h-5 rounded border-gray-600 bg-white/5 text-[#00c6ff] focus:ring-[#00c6ff] focus:ring-offset-0"
          />
          <label htmlFor="isFeatured" className="text-gray-300 text-sm">مشروع مميز</label>
        </div>

        <div className="space-y-3">
          <label className="block text-gray-300 text-sm">الصور</label>
          <ImageUpload onUpload={addImage} />
          <AnimatePresence>
            {formData.images && formData.images.length > 0 && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="grid grid-cols-4 gap-2 mt-2"
              >
                {formData.images.map((url, i) => (
                  <motion.div
                    key={i}
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.8, opacity: 0 }}
                    className="relative group"
                  >
                    <img
                      src={url}
                      alt={`صورة ${i + 1}`}
                      className="w-full h-20 object-cover rounded-lg border border-white/10"
                    />
                    <button
                      type="button"
                      onClick={() => removeImage(i)}
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs opacity-0 group-hover:opacity-100 transition shadow-lg"
                    >
                      ×
                    </button>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="space-y-3">
          <label className="block text-gray-300 text-sm">الفيديوهات</label>
          <VideoUpload onUpload={addVideo} />
          <AnimatePresence>
            {formData.videos && formData.videos.length > 0 && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="grid grid-cols-4 gap-2 mt-2"
              >
                {formData.videos.map((url, i) => (
                  <motion.div
                    key={i}
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.8, opacity: 0 }}
                    className="relative group"
                  >
                    <video
                      src={url}
                      className="w-full h-20 object-cover rounded-lg border border-white/10"
                    />
                    <button
                      type="button"
                      onClick={() => removeVideo(i)}
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs opacity-0 group-hover:opacity-100 transition shadow-lg"
                    >
                      ×
                    </button>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="flex justify-end gap-3 pt-4">
          <motion.button
            type="button"
            onClick={onCancel}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="px-6 py-3 rounded-xl bg-white/5 text-white border border-white/10 hover:bg-white/10 transition font-medium"
          >
            إلغاء
          </motion.button>
          <motion.button
            type="submit"
            disabled={loading}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="relative px-8 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed group"
          >
            {/* تأثير الثلج المتساقط */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              {[...Array(5)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-1 h-1 bg-white/30 rounded-full"
                  initial={{
                    x: Math.random() * 200 - 100,
                    y: -20,
                    opacity: 0,
                  }}
                  animate={{
                    y: 60,
                    opacity: [0, 1, 0],
                    x: `+=${Math.sin(i) * 20}`,
                  }}
                  transition={{
                    duration: 2 + Math.random() * 2,
                    repeat: Infinity,
                    delay: i * 0.3,
                    ease: 'linear',
                  }}
                />
              ))}
            </div>
            <span className="relative z-10 flex items-center gap-2">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
              >
                <FaSnowflake />
              </motion.div>
              {loading ? (initialData ? 'جاري التحديث...' : 'جاري الإضافة...') : (initialData ? 'تحديث المشروع' : 'إضافة المشروع')}
            </span>
            <motion.div
              className="absolute inset-0 bg-white/20"
              initial={{ opacity: 0 }}
              whileHover={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            />
          </motion.button>
        </div>
      </form>
    </motion.div>
  );
}