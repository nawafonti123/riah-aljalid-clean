// frontend/app/admin/[secret]/dashboard/projects/page.tsx
'use client';

import { useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaSnowflake, FaPlus, FaEdit, FaTrash, FaImage, FaVideo } from 'react-icons/fa';
import { projectsApi } from '@/lib/api';
import ProjectForm from '@/components/admin/ProjectForm';
import { toast } from 'react-hot-toast';

interface Project {
  id: string;
  title: string;
  description: string;
  category?: string;
  isFeatured?: boolean;
  images?: string[];
  videos?: string[];
}

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | undefined>(undefined);

  const fetchProjects = useCallback(async () => {
    try {
      const data = await projectsApi.getAll();
      setProjects(data);
    } catch (error) {
      toast.error('فشل في تحميل المشاريع');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  const handleDelete = useCallback(async (id: string) => {
    if (!confirm('هل أنت متأكد من حذف هذا المشروع؟')) return;
    try {
      await projectsApi.delete(id);
      toast.success('تم الحذف بنجاح');
      fetchProjects();
    } catch (error) {
      toast.error('فشل في الحذف');
    }
  }, [fetchProjects]);

  const handleEdit = useCallback((project: Project) => {
    setEditingProject(project);
    setShowForm(true);
  }, []);

  const handleFormSuccess = useCallback(() => {
    setShowForm(false);
    setEditingProject(undefined);
    fetchProjects();
    toast.success(editingProject ? 'تم التحديث بنجاح' : 'تمت الإضافة بنجاح');
  }, [editingProject, fetchProjects]);

  if (loading) return <div className="text-center py-10 text-white">جاري التحميل...</div>;

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      transition={{ duration: 0.2 }}
      className="p-4 sm:p-6"
    >
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-white flex items-center gap-3">
          <FaSnowflake className="text-[#00c6ff]" />
          إدارة المشاريع
        </h1>
        <button
          onClick={() => setShowForm(true)}
          className="px-4 py-2 bg-[#00c6ff] text-white rounded hover:bg-[#00a0cc] flex items-center gap-2 text-sm sm:text-base transition-colors"
        >
          <FaPlus /> إضافة مشروع
        </button>
      </div>

      <AnimatePresence mode="wait">
        {showForm && (
          <motion.div
            key="modal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            onClick={() => {
              setShowForm(false);
              setEditingProject(undefined);
            }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.1, ease: 'easeOut' }}
              className="bg-white rounded-lg p-5 sm:p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <h2 className="text-lg sm:text-xl font-bold mb-4">
                {editingProject ? 'تعديل المشروع' : 'إضافة مشروع جديد'}
              </h2>
              <ProjectForm
                onSuccess={handleFormSuccess}
                onCancel={() => {
                  setShowForm(false);
                  setEditingProject(undefined);
                }}
                initialData={editingProject}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* عرض سطح المكتب: جدول */}
      <div className="hidden md:block bg-gray-800 rounded-2xl overflow-hidden shadow-xl border border-white/10">
        <table className="min-w-full divide-y divide-gray-700">
          <thead className="bg-gray-900/50">
            <tr>
              <th className="px-6 py-4 text-right text-xs font-medium text-gray-400">المحتوى</th>
              <th className="px-6 py-4 text-right text-xs font-medium text-gray-400">العنوان</th>
              <th className="px-6 py-4 text-right text-xs font-medium text-gray-400">التصنيف</th>
              <th className="px-6 py-4 text-right text-xs font-medium text-gray-400">مميز</th>
              <th className="px-6 py-4 text-right text-xs font-medium text-gray-400">الإجراءات</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-700">
            {projects.map((project) => (
              <tr key={project.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center gap-2">
                    {project.images && project.images.length > 0 && (
                      <div className="flex items-center text-xs text-gray-400" title={`${project.images.length} صور`}>
                        <FaImage className="ml-1" /> {project.images.length}
                      </div>
                    )}
                    {project.videos && project.videos.length > 0 && (
                      <div className="flex items-center text-xs text-gray-400" title={`${project.videos.length} فيديوهات`}>
                        <FaVideo className="ml-1" /> {project.videos.length}
                      </div>
                    )}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-white">{project.title}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">{project.category || '—'}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                  {project.isFeatured ? 'نعم' : 'لا'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button
                    onClick={() => handleEdit(project)}
                    className="text-blue-400 hover:text-blue-300 ml-4 transition"
                  >
                    <FaEdit />
                  </button>
                  <button
                    onClick={() => handleDelete(project.id)}
                    className="text-red-400 hover:text-red-300 transition"
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
            {projects.length === 0 && (
              <tr>
                <td colSpan={5} className="px-6 py-8 text-center text-gray-500">
                  لا توجد مشاريع حالياً
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* عرض الهاتف: بطاقات */}
      <div className="md:hidden space-y-4">
        {projects.length === 0 ? (
          <p className="text-center text-gray-500 py-8">لا توجد مشاريع</p>
        ) : (
          projects.map((project) => (
            <div key={project.id} className="bg-gray-800 rounded-xl p-4 shadow-lg border border-gray-700">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-white font-bold text-base">{project.title}</h3>
                  <p className="text-xs text-gray-400 mt-1">{project.category || 'بدون تصنيف'}</p>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => handleEdit(project)}
                    className="text-blue-400 hover:text-blue-300 transition p-2 rounded-full hover:bg-gray-700"
                    aria-label="تعديل"
                  >
                    <FaEdit size={18} />
                  </button>
                  <button
                    onClick={() => handleDelete(project.id)}
                    className="text-red-400 hover:text-red-300 transition p-2 rounded-full hover:bg-gray-700"
                    aria-label="حذف"
                  >
                    <FaTrash size={18} />
                  </button>
                </div>
              </div>
              <div className="flex items-center gap-3 mt-3 text-xs text-gray-400">
                {project.images && project.images.length > 0 && (
                  <span className="flex items-center gap-1">
                    <FaImage /> {project.images.length} صورة
                  </span>
                )}
                {project.videos && project.videos.length > 0 && (
                  <span className="flex items-center gap-1">
                    <FaVideo /> {project.videos.length} فيديو
                  </span>
                )}
                {project.isFeatured && <span className="text-[#00c6ff]">مميز</span>}
              </div>
            </div>
          ))
        )}
      </div>
    </motion.div>
  );
}