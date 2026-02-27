// frontend/app/admin/[secret]/dashboard/services/page.tsx (صفحة إدارة الخدمات في لوحة التحكم)
'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaSnowflake, FaPlus, FaEdit, FaTrash } from 'react-icons/fa';
import { servicesApi } from '@/lib/api';
import { toast } from 'react-hot-toast';

interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
  order: number;
}

export default function ServicesPage() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<Service | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    icon: '',
    order: 0,
  });

  const fetchServices = async () => {
    try {
      const data = await servicesApi.getAll();
      setServices(data);
    } catch (error) {
      toast.error('فشل تحميل الخدمات');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editing) {
        await servicesApi.update(editing.id, formData);
        toast.success('تم تحديث الخدمة');
      } else {
        await servicesApi.create(formData);
        toast.success('تم إضافة الخدمة');
      }
      setShowForm(false);
      setEditing(null);
      setFormData({ title: '', description: '', icon: '', order: 0 });
      fetchServices();
    } catch (error) {
      toast.error('حدث خطأ');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('هل أنت متأكد من حذف هذه الخدمة؟')) return;
    try {
      await servicesApi.delete(id);
      toast.success('تم الحذف');
      fetchServices();
    } catch (error) {
      toast.error('فشل الحذف');
    }
  };

  const handleEdit = (service: Service) => {
    setEditing(service);
    setFormData({
      title: service.title,
      description: service.description,
      icon: service.icon,
      order: service.order,
    });
    setShowForm(true);
  };

  if (loading) return <div className="text-center py-10 text-white">جاري التحميل...</div>;

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-white flex items-center gap-3">
          <FaSnowflake className="text-[#00c6ff]" />
          إدارة الخدمات
        </h1>
        <button
          onClick={() => setShowForm(true)}
          className="px-4 py-2 bg-[#00c6ff] text-white rounded hover:bg-[#00a0cc] flex items-center gap-2"
        >
          <FaPlus /> إضافة خدمة
        </button>
      </div>

      <AnimatePresence>
        {showForm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            onClick={() => {
              setShowForm(false);
              setEditing(null);
              setFormData({ title: '', description: '', icon: '', order: 0 });
            }}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-lg p-6 max-w-md w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <h2 className="text-xl font-bold mb-4">
                {editing ? 'تعديل خدمة' : 'إضافة خدمة جديدة'}
              </h2>
              <form onSubmit={handleSubmit} className="space-y-3">
                <input
                  type="text"
                  placeholder="عنوان الخدمة"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full p-2 border rounded"
                  required
                />
                <textarea
                  placeholder="وصف الخدمة"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full p-2 border rounded"
                  rows={3}
                  required
                />
                <input
                  type="text"
                  placeholder="الأيقونة (رمز)"
                  value={formData.icon}
                  onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                  className="w-full p-2 border rounded"
                />
                <input
                  type="number"
                  placeholder="الترتيب"
                  value={formData.order}
                  onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) || 0 })}
                  className="w-full p-2 border rounded"
                />
                <div className="flex justify-end gap-2 mt-4">
                  <button
                    type="button"
                    onClick={() => {
                      setShowForm(false);
                      setEditing(null);
                      setFormData({ title: '', description: '', icon: '', order: 0 });
                    }}
                    className="px-4 py-2 bg-gray-300 rounded"
                  >
                    إلغاء
                  </button>
                  <button type="submit" className="px-4 py-2 bg-[#00c6ff] text-white rounded">
                    {editing ? 'تحديث' : 'إضافة'}
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="bg-gray-800 rounded-2xl overflow-hidden shadow-xl border border-white/10">
        <table className="min-w-full divide-y divide-gray-700">
          <thead className="bg-gray-900/50">
            <tr>
              <th className="px-6 py-4 text-right text-xs font-medium text-gray-400">الرمز</th>
              <th className="px-6 py-4 text-right text-xs font-medium text-gray-400">العنوان</th>
              <th className="px-6 py-4 text-right text-xs font-medium text-gray-400">الوصف</th>
              <th className="px-6 py-4 text-right text-xs font-medium text-gray-400">الترتيب</th>
              <th className="px-6 py-4 text-right text-xs font-medium text-gray-400">الإجراءات</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-700">
            {services.map((service) => (
              <tr key={service.id}>
                <td className="px-6 py-4 whitespace-nowrap text-2xl">{service.icon || '❄️'}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-white">{service.title}</td>
                <td className="px-6 py-4 text-sm text-gray-300 max-w-xs truncate">{service.description}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{service.order}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button
                    onClick={() => handleEdit(service)}
                    className="text-blue-400 hover:text-blue-300 ml-4"
                  >
                    <FaEdit />
                  </button>
                  <button
                    onClick={() => handleDelete(service.id)}
                    className="text-red-400 hover:text-red-300"
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
            {services.length === 0 && (
              <tr>
                <td colSpan={5} className="text-center py-8 text-gray-500">
                  لا توجد خدمات. أضف خدمة جديدة
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
}