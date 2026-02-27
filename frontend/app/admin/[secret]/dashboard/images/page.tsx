// frontend/app/admin/[secret]/dashboard/images/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { redirect, useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { FaSnowflake, FaUpload, FaSave, FaTrash } from 'react-icons/fa';
import Image from 'next/image';
import { settingsApi, uploadApi } from '@/lib/api';
import { toast } from 'react-hot-toast';

type ImageKey = 'whyUsImage' | 'aboutImage' | 'footerIceImage';

interface SettingsPayload {
  whyUsImage?: string | null;
  aboutImage?: string | null;
  footerIceImage?: string | null;
  googleMapsEmbedUrl?: string | null;
}

function ImageField({
  title,
  hint,
  value,
  onChange,
  onUpload,
  onClear,
}: {
  title: string;
  hint: string;
  value: string | null | undefined;
  onChange: (v: string | null) => void;
  onUpload: (file: File) => Promise<void>;
  onClear: () => void;
}) {
  const [uploading, setUploading] = useState(false);

  const pick = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    e.target.value = '';
    if (!file) return;
    setUploading(true);
    try {
      await onUpload(file);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="glass-card p-5 rounded-2xl border border-white/10 bg-gray-800">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="text-white font-bold">{title}</h3>
          <p className="text-gray-400 text-xs mt-1">{hint}</p>
        </div>

        <button
          type="button"
          onClick={onClear}
          className="text-red-300 hover:text-red-200 transition text-sm flex items-center gap-2"
        >
          <FaTrash /> حذف
        </button>
      </div>

      <div className="mt-4 grid md:grid-cols-2 gap-4 items-stretch">
        <div className="relative rounded-xl overflow-hidden border border-white/10 bg-black/20 min-h-[160px]">
          <Image
            src={value || '/logo.png'}
            alt={title}
            fill
            sizes="(max-width: 768px) 100vw, 420px"
            className="object-cover"
          />
          {!value && (
            <div className="absolute inset-0 flex items-center justify-center text-xs text-white/70">
              لا توجد صورة محددة (سيتم استخدام صورة افتراضية)
            </div>
          )}
        </div>

        <div className="space-y-3">
          <div>
            <label className="text-xs text-gray-300">رابط الصورة (URL)</label>
            <input
              value={value || ''}
              onChange={(e) => onChange(e.target.value || null)}
              placeholder="https://..."
              className="mt-1 w-full p-3 rounded-lg bg-gray-900/70 text-white border border-white/10 focus:outline-none focus:ring-2 focus:ring-[#00c6ff] text-sm"
            />
          </div>

          <div className="flex items-center gap-3">
            <label className="inline-flex items-center gap-2 px-4 py-3 rounded-lg bg-white/10 hover:bg-white/15 transition cursor-pointer text-sm text-white">
              <FaUpload />
              {uploading ? 'جاري الرفع...' : 'رفع صورة'}
              <input type="file" accept="image/*" className="hidden" onChange={pick} disabled={uploading} />
            </label>

            <button
              type="button"
              onClick={() => value && window.open(value, '_blank')}
              className="px-4 py-3 rounded-lg bg-white/5 hover:bg-white/10 transition text-sm text-white disabled:opacity-50"
              disabled={!value}
            >
              معاينة
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ImagesSettingsPage() {
  const params = useParams();
  const secret = params.secret as string;
  const { data: session, status } = useSession();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [data, setData] = useState<SettingsPayload>({
    whyUsImage: null,
    aboutImage: null,
    footerIceImage: null,
    googleMapsEmbedUrl: null,
  });

  if (status === 'loading') return <p className="text-center text-white py-10">جاري التحميل...</p>;
  if (!session) redirect(`/admin/${secret}/login`);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const s = await settingsApi.get();
        setData({
          whyUsImage: s.whyUsImage ?? null,
          aboutImage: s.aboutImage ?? null,
          footerIceImage: s.footerIceImage ?? null,
          googleMapsEmbedUrl: s.googleMapsEmbedUrl ?? null,
        });
      } catch (e: any) {
        toast.error(e?.message || 'فشل في تحميل الإعدادات');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const uploadAndSet = async (key: ImageKey, file: File) => {
    try {
      const res = await uploadApi.uploadImage(file);
      setData((p) => ({ ...p, [key]: res.url }));
      toast.success('تم رفع الصورة');
    } catch (e: any) {
      toast.error(e?.message || 'فشل رفع الصورة');
    }
  };

  const save = async () => {
    setSaving(true);
    try {
      await settingsApi.update(data);
      toast.success('تم حفظ الإعدادات');
    } catch (e: any) {
      toast.error(e?.message || 'فشل الحفظ');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="p-6 md:p-10">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="mb-8 flex items-center justify-between flex-wrap gap-4"
      >
        <div className="flex items-center gap-3">
          <FaSnowflake className="text-[#00c6ff] text-2xl" />
          <div>
            <h1 className="text-2xl font-bold text-white">الصور</h1>
            <p className="text-gray-400 text-sm">تحكم بصور الأقسام العامة + رابط خرائط Google</p>
          </div>
        </div>

        <button
          onClick={save}
          disabled={saving || loading}
          className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-[#00c6ff] to-[#2C5364] text-white font-bold hover:opacity-90 transition disabled:opacity-60"
        >
          <FaSave />
          {saving ? 'جاري الحفظ...' : 'حفظ'}
        </button>
      </motion.div>

      {loading ? (
        <p className="text-gray-300">جاري تحميل الإعدادات...</p>
      ) : (
        <div className="space-y-6">
          <ImageField
            title="صورة لماذا تختار رياح الجليد"
            hint="تظهر في قسم: لماذا تختار رياح الجليد؟"
            value={data.whyUsImage}
            onChange={(v) => setData((p) => ({ ...p, whyUsImage: v }))}
            onUpload={(file) => uploadAndSet('whyUsImage', file)}
            onClear={() => setData((p) => ({ ...p, whyUsImage: null }))}
          />

          <ImageField
            title="صورة قسم عن الشركة"
            hint="تظهر بجانب نبذة الشركة في قسم: عن الشركة"
            value={data.aboutImage}
            onChange={(v) => setData((p) => ({ ...p, aboutImage: v }))}
            onUpload={(file) => uploadAndSet('aboutImage', file)}
            onClear={() => setData((p) => ({ ...p, aboutImage: null }))}
          />

          <ImageField
            title="صورة أسفل الموقع (الفوتر)"
            hint="زخرفة خفيفة أسفل الفوتر (يفضل صورة PNG أو SVG بخلفية شفافة)"
            value={data.footerIceImage}
            onChange={(v) => setData((p) => ({ ...p, footerIceImage: v }))}
            onUpload={(file) => uploadAndSet('footerIceImage', file)}
            onClear={() => setData((p) => ({ ...p, footerIceImage: null }))}
          />

          <div className="glass-card p-5 rounded-2xl border border-white/10 bg-gray-800">
            <h3 className="text-white font-bold">رابط Google Maps (Embed)</h3>
            <p className="text-gray-400 text-xs mt-1">
              ضع رابط الـ Embed الكامل (src) من خرائط Google ليظهر في قسم "اتصل بنا".
            </p>

            <textarea
              value={data.googleMapsEmbedUrl || ''}
              onChange={(e) => setData((p) => ({ ...p, googleMapsEmbedUrl: e.target.value || null }))}
              placeholder="https://www.google.com/maps/embed?pb=..."
              className="mt-3 w-full p-3 rounded-lg bg-gray-900/70 text-white border border-white/10 focus:outline-none focus:ring-2 focus:ring-[#00c6ff] text-sm min-h-[110px]"
            />

            <div className="mt-3 flex items-center gap-3">
              <button
                type="button"
                onClick={() => data.googleMapsEmbedUrl && window.open(data.googleMapsEmbedUrl, '_blank')}
                className="px-4 py-3 rounded-lg bg-white/5 hover:bg-white/10 transition text-sm text-white disabled:opacity-50"
                disabled={!data.googleMapsEmbedUrl}
              >
                معاينة الرابط
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}