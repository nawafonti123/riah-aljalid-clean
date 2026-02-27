'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaSnowflake, FaPlus, FaEdit, FaTrash } from 'react-icons/fa';
import { companyImagesApi, uploadApi } from '@/lib/api';
import { toast } from 'react-hot-toast';

interface CompanyImage {
  id: string;
  title?: string;
  image: string;
  category?: string;
  order: number;
}

export default function CompanyImagesPage() {
  const [images, setImages] = useState<CompanyImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<CompanyImage | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    image: '',
    category: '',
    order: 0,
  });

  const fetchImages = async () => {
    try {
      const data = await companyImagesApi.getAll();
      setImages(data);
    } catch (error) {
      toast.error('فشل تحميل الصور');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchImages();
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
    if (!formData.image) {
      toast.error('يرجى رفع صورة');
      return;
    }
    try {
      if (editing) {
        await companyImagesApi.update(editing.id, formData);
        toast.success('تم التحديث');
      } else {
        await companyImagesApi.create(formData);
        toast.success('تمت الإضافة');
      }
      setShowForm(false);
      setEditing(null);
      setFormData({ title: '', image: '', category: '', order: 0 });
      fetchImages();
    } catch (error) {
      toast.error('حدث خطأ');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('هل أنت متأكد؟')) return;
    try {
      await companyImagesApi.delete(id);
      toast.success('تم الحذف');
      fetchImages();
    } catch (error) {
      toast.error('فشل الحذف');
    }
  };

  const handleEdit = (img: CompanyImage) => {
    setEditing(img);
    setFormData(img);
    setShowForm(true);
  };

  if (loading) return <div className="text-center py-10 text-white">جاري التحميل...</div>;

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-white flex items-center gap-3">
          <FaSnowflake className="text-[#00c6ff]" />
          صور الشركة
        </h1>
        <button onClick={() => setShowForm(true)} className="px-4 py-2 bg-[#00c6ff] text-white rounded hover:bg-[#00a0cc] flex items-center gap-2">
          <FaPlus /> إضافة صورة
        </button>
      </div>

      <AnimatePresence>
        {showForm && (
          <motion.div ... className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <motion.div ... className="bg-white rounded-lg p-6 max-w-md w-full">
              <h2 className="text-xl font-bold mb-4">{editing ? 'تعديل صورة' : 'إضافة صورة جديدة'}</h2>
              <form onSubmit={handleSubmit} className="space-y-3">
                <input
                  type="text"
                  placeholder="عنوان الصورة (اختياري)"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full p-2 border rounded"
                />
                <input
                  type="text"
                  placeholder="التصنيف (اختياري) - مثال: team, office"
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full p-2 border rounded"
                />
                <input
                  type="number"
                  placeholder="الترتيب"
                  value={formData.order}
                  onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) })}
                  className="w-full p-2 border rounded"
                />
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">الصورة</label>
                  <input type="file" accept="image/*" onChange={handleImageUpload} required={!editing} />
                  {formData.image && <img src={formData.image} alt="preview" className="mt-2 w-20 h-20 object-cover rounded" />}
                </div>
                <div className="flex justify-end gap-2 mt-4">
                  <button type="button" onClick={() => { setShowForm(false); setEditing(null); setFormData({ title: '', image: '', category: '', order: 0 }); }} className="px-4 py-2 bg-gray-300 rounded">إلغاء</button>
                  <button type="submit" className="px-4 py-2 bg-[#00c6ff] text-white rounded">{editing ? 'تحديث' : 'إضافة'}</button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {images.map((img) => (
          <div key={img.id} className="bg-gray-800 p-3 rounded-lg border border-gray-700 relative group">
            <img src={img.image} alt={img.title || 'صورة'} className="w-full h-32 object-cover rounded" />
            <div className="mt-2">
              <p className="text-sm text-white truncate">{img.title}</p>
              <p className="text-xs text-gray-400">{img.category}</p>
            </div>
            <div className="absolute top-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition">
              <button onClick={() => handleEdit(img)} className="bg-blue-600 text-white p-1 rounded"><FaEdit /></button>
              <button onClick={() => handleDelete(img.id)} className="bg-red-600 text-white p-1 rounded"><FaTrash /></button>
            </div>
          </div>
        ))}
        {images.length === 0 && <p className="col-span-4 text-center text-gray-500 py-10">لا توجد صور</p>}
      </div>
    </motion.div>
  );
}