// admin/[secret]/dashboard/service-details/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaSnowflake, FaPlus, FaEdit, FaTrash } from 'react-icons/fa';
import { serviceDetailsApi, servicesApi, uploadApi } from '@/lib/api';
import { toast } from 'react-hot-toast';
import Image from 'next/image';

interface Service {
  id: string;
  title: string;
}

interface ServiceDetail {
  id: string;
  title: string;
  description: string;
  image?: string;
  order: number;
  serviceId: string;
}

export default function ServiceDetailsPage() {
  const [details, setDetails] = useState<ServiceDetail[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<ServiceDetail | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    image: '',
    order: 0,
    serviceId: '',
  });

  const fetchAll = async () => {
    try {
      const [detailsData, servicesData] = await Promise.all([
        serviceDetailsApi.getAll(),
        servicesApi.getAll(),
      ]);
      setDetails(detailsData);
      setServices(servicesData);
    } catch (error) {
      toast.error('فشل تحميل البيانات');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAll();
  }, []);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const { url } = await uploadApi.uploadImage(file);
      setFormData({ ...formData, image: url });
    } catch (error) {
      toast.error('فشل رفع الصورة');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editing) {
        await serviceDetailsApi.update(editing.id, formData);
        toast.success('تم التحديث');
      } else {
        await serviceDetailsApi.create(formData);
        toast.success('تمت الإضافة');
      }
      setShowForm(false);
      setEditing(null);
      setFormData({ title: '', description: '', image: '', order: 0, serviceId: '' });
      fetchAll();
    } catch (error) {
      toast.error('حدث خطأ');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('هل أنت متأكد؟')) return;
    try {
      await serviceDetailsApi.delete(id);
      toast.success('تم الحذف');
      fetchAll();
    } catch (error) {
      toast.error('فشل الحذف');
    }
  };

  const handleEdit = (detail: ServiceDetail) => {
    setEditing(detail);
    setFormData(detail);
    setShowForm(true);
  };

  if (loading) return <div className="text-center py-10 text-white">جاري التحميل...</div>;

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-white flex items-center gap-3">
          <FaSnowflake className="text-[#00c6ff]" />
          تفاصيل الخدمات
        </h1>
        <button
          onClick={() => setShowForm(true)}
          className="px-4 py-2 bg-[#00c6ff] text-white rounded hover:bg-[#00a0cc] flex items-center gap-2"
        >
          <FaPlus /> إضافة تفصيل
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
              setFormData({ title: '', description: '', image: '', order: 0, serviceId: '' });
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
                {editing ? 'تعديل تفصيل' : 'إضافة تفصيل جديد'}
              </h2>
              <form onSubmit={handleSubmit} className="space-y-3">
                <select
                  value={formData.serviceId}
                  onChange={(e) => setFormData({ ...formData, serviceId: e.target.value })}
                  className="w-full p-2 border rounded"
                  required
                >
                  <option value="">اختر الخدمة</option>
                  {services.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.title}
                    </option>
                  ))}
                </select>
                <input
                  type="text"
                  placeholder="عنوان التفصيل"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full p-2 border rounded"
                  required
                />
                <textarea
                  placeholder="الوصف"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full p-2 border rounded"
                  rows={3}
                  required
                />
                <input
                  type="number"
                  placeholder="الترتيب"
                  value={formData.order}
                  onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) || 0 })}
                  className="w-full p-2 border rounded"
                />
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    صورة توضيحية
                  </label>
                  <input type="file" accept="image/*" onChange={handleImageUpload} />
                  {formData.image && (
                    <div className="relative mt-2 w-20 h-20">
                      <Image
                        src={formData.image}
                        alt="preview"
                        fill
                        className="object-cover rounded"
                      />
                    </div>
                  )}
                </div>
                <div className="flex justify-end gap-2 mt-4">
                  <button
                    type="button"
                    onClick={() => {
                      setShowForm(false);
                      setEditing(null);
                      setFormData({ title: '', description: '', image: '', order: 0, serviceId: '' });
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
              <th className="px-6 py-4 text-right text-xs font-medium text-gray-400">الصورة</th>
              <th className="px-6 py-4 text-right text-xs font-medium text-gray-400">الخدمة</th>
              <th className="px-6 py-4 text-right text-xs font-medium text-gray-400">العنوان</th>
              <th className="px-6 py-4 text-right text-xs font-medium text-gray-400">الترتيب</th>
              <th className="px-6 py-4 text-right text-xs font-medium text-gray-400">الإجراءات</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-700">
            {details.map((d) => {
              const service = services.find((s) => s.id === d.serviceId);
              return (
                <tr key={d.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {d.image ? (
                      <div className="relative w-10 h-10">
                        <Image
                          src={d.image}
                          alt={d.title}
                          fill
                          className="object-cover rounded"
                        />
                      </div>
                    ) : (
                      '—'
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                    {service?.title || '—'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-white">{d.title}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{d.order}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button
                      onClick={() => handleEdit(d)}
                      className="text-blue-400 hover:text-blue-300 ml-4"
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={() => handleDelete(d.id)}
                      className="text-red-400 hover:text-red-300"
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              );
            })}
            {details.length === 0 && (
              <tr>
                <td colSpan={5} className="text-center py-8 text-gray-500">
                  لا توجد تفاصيل
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
}