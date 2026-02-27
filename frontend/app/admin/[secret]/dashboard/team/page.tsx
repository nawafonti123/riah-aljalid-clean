// app/admin/[secret]/dashboard/team/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaSnowflake, FaPlus, FaEdit, FaTrash } from 'react-icons/fa';
import { teamApi, uploadApi } from '@/lib/api';
import { toast } from 'react-hot-toast';

interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio?: string;
  image?: string;
  order: number;
}

export default function TeamPage() {
  const [members, setMembers] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<TeamMember | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    role: '',
    bio: '',
    image: '',
    order: 0,
  });

  const fetchMembers = async () => {
    try {
      const data = await teamApi.getAll();
      setMembers(data);
    } catch (error) {
      toast.error('فشل تحميل أعضاء الفريق');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMembers();
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
        await teamApi.update(editing.id, formData);
        toast.success('تم تحديث العضو');
      } else {
        await teamApi.create(formData);
        toast.success('تم إضافة العضو');
      }
      setShowForm(false);
      setEditing(null);
      setFormData({ name: '', role: '', bio: '', image: '', order: 0 });
      fetchMembers();
    } catch (error) {
      toast.error('حدث خطأ');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('هل أنت متأكد؟')) return;
    try {
      await teamApi.delete(id);
      toast.success('تم الحذف');
      fetchMembers();
    } catch (error) {
      toast.error('فشل الحذف');
    }
  };

  const handleEdit = (member: TeamMember) => {
    setEditing(member);
    setFormData({
      name: member.name,
      role: member.role,
      bio: member.bio || '',
      image: member.image || '',
      order: member.order,
    });
    setShowForm(true);
  };

  if (loading) return <div className="text-center py-10 text-white">جاري التحميل...</div>;

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-white flex items-center gap-3">
          <FaSnowflake className="text-[#00c6ff]" />
          إدارة فريق العمل
        </h1>
        <button
          onClick={() => setShowForm(true)}
          className="px-4 py-2 bg-[#00c6ff] text-white rounded hover:bg-[#00a0cc] flex items-center gap-2"
        >
          <FaPlus /> إضافة عضو
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
              setFormData({ name: '', role: '', bio: '', image: '', order: 0 });
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
                {editing ? 'تعديل عضو' : 'إضافة عضو جديد'}
              </h2>
              <form onSubmit={handleSubmit} className="space-y-3">
                <input
                  type="text"
                  placeholder="الاسم"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full p-2 border rounded"
                  required
                />
                <input
                  type="text"
                  placeholder="الوظيفة"
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                  className="w-full p-2 border rounded"
                  required
                />
                <textarea
                  placeholder="نبذة قصيرة"
                  value={formData.bio}
                  onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                  className="w-full p-2 border rounded"
                  rows={3}
                />
                <input
                  type="number"
                  placeholder="الترتيب"
                  value={formData.order}
                  onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) || 0 })}
                  className="w-full p-2 border rounded"
                />
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">صورة العضو</label>
                  <input type="file" accept="image/*" onChange={handleImageUpload} />
                  {formData.image && (
                    <div className="mt-2 w-20 h-20">
                      <img
                        src={formData.image}
                        alt="preview"
                        className="w-full h-full object-cover rounded"
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
                      setFormData({ name: '', role: '', bio: '', image: '', order: 0 });
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
              <th className="px-6 py-4 text-right text-xs font-medium text-gray-400">الاسم</th>
              <th className="px-6 py-4 text-right text-xs font-medium text-gray-400">الوظيفة</th>
              <th className="px-6 py-4 text-right text-xs font-medium text-gray-400">الترتيب</th>
              <th className="px-6 py-4 text-right text-xs font-medium text-gray-400">الإجراءات</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-700">
            {members.map((member) => (
              <tr key={member.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  {member.image ? (
                    <div className="w-10 h-10 rounded-full overflow-hidden">
                      <img
                        src={member.image}
                        alt={member.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-gray-600" />
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-white">{member.name}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{member.role}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{member.order}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button
                    onClick={() => handleEdit(member)}
                    className="text-blue-400 hover:text-blue-300 ml-4"
                  >
                    <FaEdit />
                  </button>
                  <button
                    onClick={() => handleDelete(member.id)}
                    className="text-red-400 hover:text-red-300"
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
            {members.length === 0 && (
              <tr>
                <td colSpan={5} className="text-center py-8 text-gray-500">
                  لا يوجد أعضاء
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
}