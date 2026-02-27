// frontend/components/sections/ContactSection.tsx
'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaRegBuilding } from 'react-icons/fa';
import { publicApi, contactApi } from '@/lib/api';
import { toast } from 'react-hot-toast';

interface SiteSettings {
  phone?: string;
  email?: string;
  address?: string;
  commercialRegister?: string;
  googleMapsEmbedUrl?: string | null;
}

export default function ContactSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });

  const [settings, setSettings] = useState<SiteSettings>({
    address: 'الرياض - طريق الملك عبدالعزيز',
    phone: '+966 56 524 7407',
    email: 'RiaHaljalid@icloud.com',
    commercialRegister: '1010632725',
    googleMapsEmbedUrl: null,
  });

  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [sending, setSending] = useState(false);

  useEffect(() => {
    publicApi
      .getSettings()
      .then((data: SiteSettings) => setSettings((prev) => ({ ...prev, ...data })))
      .catch(() => {});
  }, []);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      toast.error('يرجى تعبئة جميع الحقول');
      return;
    }
    setSending(true);
    try {
      await contactApi.sendMessage(form);
      toast.success('تم إرسال رسالتك بنجاح');
      setForm({ name: '', email: '', message: '' });
    } catch (err: any) {
      toast.error(err?.message || 'فشل في إرسال الرسالة');
    } finally {
      setSending(false);
    }
  };

  const wa = (settings.phone || '').replace(/\s|\+/g, '');

  return (
    <section
      id="contact"
      ref={ref}
      className="py-12 sm:py-16 md:py-20 bg-gradient-to-b from-gray-50 to-white dark:from-[#2C5364] dark:to-[#0F2027] transition-colors duration-300"
    >
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-8 sm:mb-10"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">اتصل بنا</h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-4 sm:gap-6">
          {/* معلومات الاتصال */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-white dark:bg-gray-800 p-4 sm:p-6 md:p-8 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700"
          >
            <h3 className="text-base sm:text-lg md:text-xl font-bold text-gray-900 dark:text-white mb-4">معلومات الاتصال</h3>
            <div className="space-y-3 sm:space-y-4">
              <div className="flex items-start gap-3">
                <FaMapMarkerAlt className="w-4 h-4 sm:w-5 sm:h-5 text-[#01AEBE] dark:text-[#00c6ff] mt-0.5 flex-shrink-0" />
                <span className="text-xs sm:text-sm md:text-base text-gray-600 dark:text-gray-300">
                  {settings.address}
                </span>
              </div>

              <div className="flex items-start gap-3">
                <FaPhone className="w-4 h-4 sm:w-5 sm:h-5 text-[#01AEBE] dark:text-[#00c6ff] mt-0.5 flex-shrink-0" />
                <a
                  href={wa ? `https://wa.me/${wa}` : '#'}
                  target="_blank"
                  rel="noreferrer"
                  className="text-xs sm:text-sm md:text-base text-gray-600 dark:text-gray-300 hover:text-[#01AEBE] dark:hover:text-[#00c6ff]"
                >
                  <span dir="ltr">{settings.phone}</span>
                </a>
              </div>

              <div className="flex items-start gap-3">
                <FaEnvelope className="w-4 h-4 sm:w-5 sm:h-5 text-[#01AEBE] dark:text-[#00c6ff] mt-0.5 flex-shrink-0" />
                <a
                  href={`mailto:${settings.email}`}
                  className="text-xs sm:text-sm md:text-base text-gray-600 dark:text-gray-300 hover:text-[#01AEBE] dark:hover:text-[#00c6ff]"
                >
                  {settings.email}
                </a>
              </div>

              <div className="flex items-start gap-3">
                <FaRegBuilding className="w-4 h-4 sm:w-5 sm:h-5 text-[#01AEBE] dark:text-[#00c6ff] mt-0.5 flex-shrink-0" />
                <span className="text-xs sm:text-sm md:text-base text-gray-600 dark:text-gray-300">
                  سجل: {settings.commercialRegister}
                </span>
              </div>
            </div>
          </motion.div>

          {/* خريطة + نموذج */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="bg-white dark:bg-gray-800 p-4 sm:p-6 md:p-8 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700"
          >
            <h3 className="text-base sm:text-lg md:text-xl font-bold text-gray-900 dark:text-white mb-4">موقعنا على الخريطة</h3>

            <div className="rounded-xl overflow-hidden border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/5">
              <div className="relative w-full aspect-[16/9]">
                {settings.googleMapsEmbedUrl ? (
                  <iframe
                    src={settings.googleMapsEmbedUrl}
                    className="absolute inset-0 w-full h-full"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    allowFullScreen
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center text-xs text-gray-600 dark:text-gray-300">
                    لم يتم ضبط رابط خرائط Google بعد (يمكنك ضبطه من لوحة الإدارة).
                  </div>
                )}
              </div>
            </div>

            <h3 className="text-base sm:text-lg md:text-xl font-bold text-gray-900 dark:text-white mb-3 mt-6">أرسل رسالة</h3>
            <form onSubmit={onSubmit} className="space-y-3 sm:space-y-4">
              <input
                value={form.name}
                onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
                type="text"
                placeholder="الاسم"
                className="w-full p-3 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white border border-gray-200 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-[#01AEBE] dark:focus:ring-[#00c6ff] text-sm"
              />
              <input
                value={form.email}
                onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))}
                type="email"
                placeholder="البريد الإلكتروني"
                className="w-full p-3 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white border border-gray-200 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-[#01AEBE] dark:focus:ring-[#00c6ff] text-sm"
              />
              <textarea
                value={form.message}
                onChange={(e) => setForm((p) => ({ ...p, message: e.target.value }))}
                placeholder="الرسالة"
                className="w-full p-3 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white border border-gray-200 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-[#01AEBE] dark:focus:ring-[#00c6ff] text-sm min-h-[120px]"
              />
              <button
                type="submit"
                disabled={sending}
                className="w-full py-3 rounded-lg bg-gradient-to-r from-[#01AEBE] to-[#9DCC40] dark:from-[#00c6ff] dark:to-[#2C5364] text-white font-bold hover:opacity-90 transition disabled:opacity-60"
              >
                {sending ? 'جاري الإرسال...' : 'إرسال'}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}