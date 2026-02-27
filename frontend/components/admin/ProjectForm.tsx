// frontend/components/admin/ProjectForm.tsx
'use client';

import { useState, lazy, Suspense, memo, useCallback, useMemo } from 'react';
import { toast } from 'react-hot-toast';
import { projectsApi } from '@/lib/api';
import { motion } from 'framer-motion';

// تحميل المكونات الثقيلة بشكل غير متزامن
const ImageUpload = lazy(() => import('./ImageUpload'));
const VideoUpload = lazy(() => import('./VideoUpload'));

// مكون مؤقت بسيط أثناء التحميل
const LoadingFallback = () => (
  <div className="w-full p-4 text-center text-gray-500">جاري التحميل...</div>
);

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

function ProjectForm({ onSuccess, onCancel, initialData }: ProjectFormProps) {
  const [formData, setFormData] = useState<Project>({
    title: initialData?.title || '',
    description: initialData?.description || '',
    category: initialData?.category || '',
    isFeatured: initialData?.isFeatured || false,
    images: initialData?.images || [],
    videos: initialData?.videos || [],
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
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
  }, [formData, initialData, onSuccess]);

  const addImage = useCallback((url: string) => {
    setFormData(prev => ({ ...prev, images: [...(prev.images || []), url] }));
  }, []);

  const removeImage = useCallback((index: number) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images?.filter((_, i) => i !== index) || [],
    }));
  }, []);

  const addVideo = useCallback((url: string) => {
    setFormData(prev => ({ ...prev, videos: [...(prev.videos || []), url] }));
  }, []);

  const removeVideo = useCallback((index: number) => {
    setFormData(prev => ({
      ...prev,
      videos: prev.videos?.filter((_, i) => i !== index) || [],
    }));
  }, []);

  // استخدام useMemo لمنع إعادة إنشاء هذه القيم في كل رندر
  const imagesList = useMemo(() => formData.images || [], [formData.images]);
  const videosList = useMemo(() => formData.videos || [], [formData.videos]);

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">العنوان</label>
        <input
          type="text"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">الوصف</label>
        <textarea
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          required
          rows={4}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">التصنيف</label>
        <input
          type="text"
          value={formData.category}
          onChange={(e) => setFormData({ ...formData, category: e.target.value })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      </div>

      <div className="flex items-center">
        <input
          type="checkbox"
          checked={formData.isFeatured}
          onChange={(e) => setFormData({ ...formData, isFeatured: e.target.checked })}
          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
        />
        <label className="mr-2 block text-sm text-gray-900">مشروع مميز</label>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">الصور</label>
        <Suspense fallback={<LoadingFallback />}>
          <ImageUpload onUpload={addImage} />
        </Suspense>
        {imagesList.length > 0 && (
          <div className="mt-2 grid grid-cols-4 gap-2">
            {imagesList.map((url, i) => (
              <div key={i} className="relative group">
                <img
                  src={url}
                  alt={`صورة ${i + 1}`}
                  className="w-full h-20 object-cover rounded border"
                  loading="lazy"
                />
                <button
                  type="button"
                  onClick={() => removeImage(i)}
                  className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs opacity-0 group-hover:opacity-100 transition"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">الفيديوهات</label>
        <Suspense fallback={<LoadingFallback />}>
          <VideoUpload onUpload={addVideo} />
        </Suspense>
        {videosList.length > 0 && (
          <div className="mt-2 grid grid-cols-4 gap-2">
            {videosList.map((url, i) => (
              <div key={i} className="relative group">
                <video
                  src={url}
                  className="w-full h-20 object-cover rounded border"
                  onError={(e) => {
                    console.error('Failed to load video:', url);
                    e.currentTarget.style.display = 'none';
                  }}
                />
                <button
                  type="button"
                  onClick={() => removeVideo(i)}
                  className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs opacity-0 group-hover:opacity-100 transition"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="flex justify-end gap-2 pt-4">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
        >
          إلغاء
        </button>
        <button
          type="submit"
          disabled={loading}
          className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? 'جاري الحفظ...' : initialData ? 'تحديث' : 'إضافة'}
        </button>
      </div>
    </form>
  );
}

export default memo(ProjectForm);