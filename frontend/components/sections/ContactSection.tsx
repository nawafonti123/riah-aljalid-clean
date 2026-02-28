'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import Tilt from 'react-parallax-tilt';
import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaRegBuilding, FaWhatsapp, FaTimes } from 'react-icons/fa';
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

  const DEFAULT_SETTINGS: SiteSettings = {
    address: '8246 طريق الملك عبدالعزيز الفرعي، الملك فهد، 3988، الرياض 12274، المملكة العربية السعودية',
    phone: '+966 56 524 7407',
    email: 'RiaHaljalid@icloud.com',
    commercialRegister: '1010632725',
    googleMapsEmbedUrl:
      'https://www.google.com/maps?q=8246%20%D8%B7%D8%B1%D9%8A%D9%82%20%D8%A7%D9%84%D9%85%D9%84%D9%83%20%D8%B9%D8%A8%D8%AF%D8%A7%D9%84%D8%B9%D8%B2%D9%8A%D8%B2%20%D8%A7%D9%84%D9%81%D8%B1%D8%B9%D9%8A&output=embed',
  };

  const [settings, setSettings] = useState<SiteSettings>(DEFAULT_SETTINGS);
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [sending, setSending] = useState(false);

  // ✅ نافذة اختيار الاتصال
  const [callOpen, setCallOpen] = useState(false);

  useEffect(() => {
    publicApi
      .getSettings()
      .then((data: SiteSettings) => {
        setSettings((prev) => ({
          ...prev,
          ...data,
          address: data?.address?.trim() ? data.address : prev.address,
          phone: data?.phone?.trim() ? data.phone : prev.phone,
          email: data?.email?.trim() ? data.email : prev.email,
          commercialRegister: data?.commercialRegister?.trim() ? data.commercialRegister : prev.commercialRegister,
          googleMapsEmbedUrl: data?.googleMapsEmbedUrl?.trim() ? data.googleMapsEmbedUrl : prev.googleMapsEmbedUrl,
        }));
      })
      .catch(() => {});
  }, []);

  // ESC يغلق النافذة
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setCallOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
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

  const rawPhone = (settings.phone || '').trim();
  const digitsPhone = rawPhone.replace(/[^\d]/g, '');

  // ✅ واتساب
  const waLink = digitsPhone ? `https://wa.me/${digitsPhone}` : '#';

  // ✅ اتصال عادي (يفتح تطبيق الهاتف)
  // ملاحظة: بعض الأجهزة تحتاج رقم بصيغة +966... لذلك نستخدم digits + "+"
  const telLink = digitsPhone ? `tel:+${digitsPhone}` : '#';

  const emailLink = settings.email ? `mailto:${settings.email}` : '#';

  const openCallPicker = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!digitsPhone) {
      toast.error('رقم الهاتف غير متوفر');
      return;
    }
    setCallOpen(true);
  };

  const goWhatsApp = () => {
    setCallOpen(false);
    window.open(waLink, '_blank', 'noopener,noreferrer');
  };

  const goTel = () => {
    setCallOpen(false);
    window.location.href = telLink;
  };

  return (
    <section
      id="contact"
      ref={ref}
      className="py-12 sm:py-16 md:py-20 bg-gradient-to-b from-gray-50 to-white dark:from-[#2C5364] dark:to-[#0F2027] transition-colors duration-300 overflow-x-clip"
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

        <div className="grid lg:grid-cols-2 gap-4 sm:gap-6 items-start">
          {/* معلومات الاتصال */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Tilt
              tiltMaxAngleX={8}
              tiltMaxAngleY={8}
              perspective={1200}
              transitionSpeed={1200}
              glareEnable
              glareMaxOpacity={0.10}
              scale={1.02}
              className="rounded-xl"
            >
              <div className="bg-white dark:bg-gray-800 p-4 sm:p-6 md:p-8 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 transition-all duration-500 hover:shadow-[0_0_40px_rgba(0,200,255,0.16)]">
                <h3 className="text-base sm:text-lg md:text-xl font-bold text-gray-900 dark:text-white mb-4">
                  معلومات الاتصال
                </h3>

                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <FaMapMarkerAlt className="w-4 h-4 sm:w-5 sm:h-5 text-[#01AEBE] dark:text-[#00c6ff] mt-0.5 flex-shrink-0" />
                    <span className="text-xs sm:text-sm md:text-base text-gray-600 dark:text-gray-300">
                      {settings.address}
                    </span>
                  </div>

                  {/* ✅ رقم الهاتف - يفتح نافذة اختيار */}
                  <div className="flex items-start gap-3">
                    <FaPhone className="w-4 h-4 sm:w-5 sm:h-5 text-[#01AEBE] dark:text-[#00c6ff] mt-0.5 flex-shrink-0" />
                    <button
                      type="button"
                      onClick={openCallPicker}
                      className="text-left text-xs sm:text-sm md:text-base text-gray-600 dark:text-gray-300 hover:text-[#01AEBE] dark:hover:text-[#00c6ff] transition"
                    >
                      <span dir="ltr">{settings.phone}</span>
                      <span className="block text-[11px] sm:text-xs text-gray-400 dark:text-gray-400 mt-0.5">
                        اضغط لاختيار واتساب أو اتصال
                      </span>
                    </button>
                  </div>

                  <div className="flex items-start gap-3">
                    <FaEnvelope className="w-4 h-4 sm:w-5 sm:h-5 text-[#01AEBE] dark:text-[#00c6ff] mt-0.5 flex-shrink-0" />
                    <a
                      href={emailLink}
                      className="text-xs sm:text-sm md:text-base text-gray-600 dark:text-gray-300 hover:text-[#01AEBE] dark:hover:text-[#00c6ff] transition"
                    >
                      {settings.email}
                    </a>
                  </div>

                  <div className="flex items-start gap-3">
                    <FaRegBuilding className="w-4 h-4 sm:w-5 sm:h-5 text-[#01AEBE] dark:text-[#00c6ff] mt-0.5 flex-shrink-0" />
                    <span className="text-xs sm:text-sm md:text-base text-gray-600 dark:text-gray-300">
                      السجل: {settings.commercialRegister}
                    </span>
                  </div>
                </div>
              </div>
            </Tilt>
          </motion.div>

          {/* الخريطة + الفورم */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Tilt
              tiltMaxAngleX={8}
              tiltMaxAngleY={8}
              perspective={1200}
              transitionSpeed={1200}
              glareEnable
              glareMaxOpacity={0.10}
              scale={1.02}
              className="rounded-xl"
            >
              <div className="bg-white dark:bg-gray-800 p-4 sm:p-6 md:p-8 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 transition-all duration-500 hover:shadow-[0_0_40px_rgba(0,255,200,0.14)]">
                <h3 className="text-base sm:text-lg md:text-xl font-bold text-gray-900 dark:text-white mb-4">
                  موقعنا على الخريطة
                </h3>

                <div className="rounded-xl overflow-hidden border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/5">
                  <div className="relative w-full aspect-[16/9]">
                    <iframe
                      src={settings.googleMapsEmbedUrl || ''}
                      className="absolute inset-0 w-full h-full"
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      allowFullScreen
                    />
                  </div>
                </div>

                <h3 className="text-base sm:text-lg md:text-xl font-bold text-gray-900 dark:text-white mb-3 mt-6">
                  أرسل رسالة
                </h3>

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
              </div>
            </Tilt>
          </motion.div>
        </div>
      </div>

      {/* ✅ نافذة اختيار طريقة الاتصال */}
      {callOpen && (
        <div
          className="fixed inset-0 z-[9999] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
          onMouseDown={() => setCallOpen(false)}
        >
          <div
            className="w-full max-w-md rounded-2xl bg-white/95 dark:bg-gray-900/95 border border-gray-200/60 dark:border-white/10 shadow-2xl overflow-hidden"
            onMouseDown={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200/60 dark:border-white/10">
              <div className="font-bold text-gray-900 dark:text-white text-sm sm:text-base">اختر طريقة الاتصال</div>
              <button
                type="button"
                onClick={() => setCallOpen(false)}
                className="w-10 h-10 rounded-xl bg-black/10 dark:bg-white/10 hover:bg-black/20 dark:hover:bg-white/20 flex items-center justify-center transition"
                aria-label="إغلاق"
              >
                <FaTimes />
              </button>
            </div>

            <div className="p-4 space-y-3">
              <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-300">
                الرقم: <span dir="ltr" className="font-semibold">{rawPhone || `+${digitsPhone}`}</span>
              </div>

              <button
                type="button"
                onClick={goWhatsApp}
                className="w-full flex items-center justify-between gap-3 px-4 py-3 rounded-xl bg-[#25D366]/10 hover:bg-[#25D366]/20 text-gray-900 dark:text-white border border-[#25D366]/20 transition"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#25D366] text-white flex items-center justify-center">
                    <FaWhatsapp />
                  </div>
                  <div className="text-left">
                    <div className="font-bold text-sm">واتساب</div>
                    <div className="text-xs text-gray-600 dark:text-gray-300">فتح محادثة مباشرة</div>
                  </div>
                </div>
                <span className="text-xs opacity-70">فتح</span>
              </button>

              <button
                type="button"
                onClick={goTel}
                className="w-full flex items-center justify-between gap-3 px-4 py-3 rounded-xl bg-[#01AEBE]/10 hover:bg-[#01AEBE]/20 text-gray-900 dark:text-white border border-[#01AEBE]/20 transition"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#01AEBE] text-white flex items-center justify-center">
                    <FaPhone />
                  </div>
                  <div className="text-left">
                    <div className="font-bold text-sm">اتصال عادي</div>
                    <div className="text-xs text-gray-600 dark:text-gray-300">فتح تطبيق الهاتف</div>
                  </div>
                </div>
                <span className="text-xs opacity-70">اتصال</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}