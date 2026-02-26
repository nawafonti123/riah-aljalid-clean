// frontend/app/admin/[secret]/dashboard/projects/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaSnowflake, FaPlus, FaImage, FaVideo } from 'react-icons/fa';
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

  const fetchProjects = async () => {
    try {
      const data = await projectsApi.getAll();
      setProjects(data);
    } catch (error) {
      toast.error('فشل في تحميل المشاريع');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm('هل أنت متأكد من حذف هذا المشروع؟')) return;
    try {
      await projectsApi.delete(id);
      toast.success('تم الحذف بنجاح');
      fetchProjects();
    } catch (error) {
      toast.error('فشل في الحذف');
    }
  };

  const handleEdit = (project: Project) => {
    setEditingProject(project);
    setShowForm(true);
  };

  const handleFormSuccess = () => {
    setShowForm(false);
    setEditingProject(undefined);
    fetchProjects();
    toast.success(editingProject ? 'تم التحديث بنجاح' : 'تمت الإضافة بنجاح');
  };

  if (loading) return <div className="text-center py-10 text-white">جاري التحميل...</div>;

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-white flex items-center gap-3">
          <FaSnowflake className="text-[#00c6ff]" />
          إدارة المشاريع
        </h1>
        <motion.button
          onClick={() => setShowForm(true)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="relative px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 group"
        >
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
            إضافة مشروع جديد
          </span>
          <motion.div
            className="absolute inset-0 bg-white/20"
            initial={{ opacity: 0 }}
            whileHover={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          />
        </motion.button>
      </div>

      <AnimatePresence>
        {showForm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          >
            <ProjectForm
              onSuccess={handleFormSuccess}
              onCancel={() => {
                setShowForm(false);
                setEditingProject(undefined);
              }}
              initialData={editingProject}
            />
          </motion.div>
        )}
      </AnimatePresence>

      <div className="bg-gray-800 rounded-2xl overflow-hidden shadow-xl border border-white/10">
        <table className="min-w-full divide-y divide-gray-700">
          <thead className="bg-gray-900/50">
            <tr>
              <th className="px-6 py-4 text-right text-xs font-medium text-gray-400 uppercase tracking-wider">المحتوى</th>
              <th className="px-6 py-4 text-right text-xs font-medium text-gray-400 uppercase tracking-wider">العنوان</th>
              <th className="px-6 py-4 text-right text-xs font-medium text-gray-400 uppercase tracking-wider">التصنيف</th>
              <th className="px-6 py-4 text-right text-xs font-medium text-gray-400 uppercase tracking-wider">مميز</th>
              <th className="px-6 py-4 text-right text-xs font-medium text-gray-400 uppercase tracking-wider">الإجراءات</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-700">
            {projects.map((project) => (
              <motion.tr
                key={project.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="hover:bg-white/5 transition-colors"
              >
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center gap-2">
                    {project.images && project.images.length > 0 && (
                      <div className="flex items-center text-xs text-gray-400">
                        <FaImage className="ml-1" /> {project.images.length}
                      </div>
                    )}
                    {project.videos && project.videos.length > 0 && (
                      <div className="flex items-center text-xs text-gray-400">
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
                    تعديل
                  </button>
                  <button
                    onClick={() => handleDelete(project.id)}
                    className="text-red-400 hover:text-red-300 transition"
                  >
                    حذف
                  </button>
                </td>
              </motion.tr>
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
    </motion.div>
  );
}