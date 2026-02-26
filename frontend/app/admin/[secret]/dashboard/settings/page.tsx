// frontend/app/admin/[secret]/dashboard/settings/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { redirect, useParams } from 'next/navigation';
import { maintenanceApi } from '@/lib/api';
import { toast } from 'react-hot-toast';
import { motion } from 'framer-motion';
import { FaSnowflake } from 'react-icons/fa';

export default function SettingsPage() {
  const params = useParams();
  const secret = params.secret as string;
  const { data: session, status } = useSession();
  const [isEnabled, setIsEnabled] = useState(false);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  if (status === 'loading') return <p className="text-center text-white py-10">جاري التحميل...</p>;
  if (!session) redirect(`/admin/${secret}/login`);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const data = await maintenanceApi.getStatus();
        setIsEnabled(data.isEnabled);
        setMessage(data.message || '');
      } catch (error) {
        toast.error('فشل في تحميل الإعدادات');
      } finally {
        setLoading(false);
      }
    };
    fetchSettings();
  }, []);

  const handleSave = async () => {
    setSaving(true);
    try {
      await maintenanceApi.updateStatus({ isEnabled, message });
      toast.success('تم حفظ الإعدادات بنجاح');
    } catch (error) {
      toast.error('فشل في حفظ الإعدادات');
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="text-center py-10 text-white">جاري التحميل...</div>;

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <h1 className="text-3xl font-bold text-white mb-8 flex items-center gap-3">
        <FaSnowflake className="text-[#00c6ff]" />
        إعدادات الموقع
      </h1>

      <div className="bg-gray-800 rounded-lg p-6 max-w-2xl">
        <h2 className="text-xl font-bold text-white mb-6">وضع الصيانة</h2>

        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <label className="text-gray-300">تفعيل وضع الصيانة</label>
            <button
              onClick={() => setIsEnabled(!isEnabled)}
              className="relative w-16 h-16 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 shadow-lg flex items-center justify-center focus:outline-none overflow-hidden group"
            >
              <motion.div
                animate={{
                  scale: isEnabled ? 1.2 : 1,
                  rotate: isEnabled ? 360 : 0,
                }}
                transition={{ type: 'spring', stiffness: 200, damping: 15 }}
                className="text-white text-3xl"
              >
                <FaSnowflake />
              </motion.div>
              <motion.div
                animate={{
                  opacity: isEnabled ? 1 : 0,
                  scale: isEnabled ? 1 : 0.5,
                }}
                className="absolute inset-0 bg-white/20 rounded-full"
              />
              {isEnabled && (
                <>
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.1 }}
                    className="absolute -top-1 -right-1 w-3 h-3 bg-white rounded-full"
                  />
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2 }}
                    className="absolute -bottom-1 -left-1 w-2 h-2 bg-white rounded-full"
                  />
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.15 }}
                    className="absolute top-0 left-2 w-1.5 h-1.5 bg-white rounded-full"
                  />
                </>
              )}
            </button>
          </div>

          <div>
            <label className="block text-gray-300 mb-2">رسالة الصيانة</label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={4}
              className="w-full p-3 rounded-lg bg-gray-700 border border-gray-600 text-white focus:border-[#00c6ff] outline-none"
              placeholder="أدخل رسالة الصيانة..."
            />
          </div>

          <div className="flex justify-end">
            <motion.button
              onClick={handleSave}
              disabled={saving}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="relative px-8 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed group"
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
                  className="text-white"
                >
                  <FaSnowflake />
                </motion.div>
                {saving ? 'جاري الحفظ...' : 'حفظ الإعدادات'}
              </span>
              <motion.div
                className="absolute inset-0 bg-white/20"
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              />
            </motion.button>
          </div>

          {isEnabled && (
            <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-4">
              <p className="text-yellow-500 text-sm">
                ⚠️ وضع الصيانة مفعل حالياً. الزوار سيشاهدون صفحة الصيانة بدلاً من الموقع الرئيسي.
              </p>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}