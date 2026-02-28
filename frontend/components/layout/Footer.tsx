'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaRegBuilding, FaWhatsapp, FaTimes } from 'react-icons/fa';
import Image from 'next/image';

type Settings = {
  address?: string;
  phone?: string;
  email?: string;
  commercialRegister?: string;
  footerIceImage?: string;
};

const API_URL = process.env.NEXT_PUBLIC_API_URL;

async function fetchSettingsClient(): Promise<Settings | null> {
  try {
    if (!API_URL) return null;
    const res = await fetch(`${API_URL}/settings`, { cache: 'no-store' });
    if (!res.ok) return null;
    return (await res.json()) as Settings;
  } catch {
    return null;
  }
}

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const [settings, setSettings] = useState<Settings | null>(null);

  // ✅ نافذة اختيار الاتصال
  const [callOpen, setCallOpen] = useState(false);

  useEffect(() => {
    fetchSettingsClient().then(setSettings).catch(() => setSettings(null));
  }, []);

  // ESC يغلق
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setCallOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const address = settings?.address || 'الرياض - طريق الملك عبدالعزيز';
  const phone = settings?.phone || '+966 56 524 7407';
  const email = settings?.email || 'RiaHaljalid@icloud.com';
  const commercialRegister = settings?.commercialRegister || '1010632725';
  const footerIceImage = settings?.footerIceImage || '/logo.png';

  const digitsPhone = useMemo(() => (phone || '').replace(/[^\d]/g, ''), [phone]);
  const waLink = digitsPhone ? `https://wa.me/${digitsPhone}` : '#';
  const telLink = digitsPhone ? `tel:+${digitsPhone}` : '#';

  const openCallPicker = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!digitsPhone) return;
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
    <footer className="relative bg-white dark:bg-[#0F2027] text-gray-800 dark:text-white pt-12 pb-6 transition-colors duration-300 overflow-hidden">
      <div className="pointer-events-none absolute -bottom-10 -left-10 opacity-10 dark:opacity-[0.08]">
        <div className="relative w-[220px] h-[220px] sm:w-[280px] sm:h-[280px]">
          <Image
            src={footerIceImage}
            alt="رياح الجليد"
            fill
            sizes="(max-width: 640px) 220px, 280px"
            className="object-contain"
            priority={false}
          />
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 relative">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="relative w-16 h-16 rounded-full overflow-hidden border border-gray-200/60 dark:border-white/10 bg-white/60 dark:bg-white/5">
                <Image
                  src="/logo.png"
                  alt="رياح الجليد"
                  fill
                  sizes="64px"
                  className="object-cover [mask-image:radial-gradient(circle,#000_62%,transparent_63%)] [-webkit-mask-image:radial-gradient(circle,#000_62%,transparent_63%)]"
                />
              </div>
              <h3 className="text-xl font-bold text-gradient-primary">رياح الجليد</h3>
            </div>
            <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
              شركة سعودية متخصصة في تركيب وصيانة أنظمة التكييف المركزي والتهوية والتبريد باستخدام أحدث التقنيات.
            </p>
          </div>

          <div>
            <h4 className="font-bold mb-4 text-[#01AEBE] dark:text-[#00c6ff]">روابط سريعة</h4>
            <ul className="space-y-2 text-gray-600 dark:text-gray-400">
              <li>
                <Link href="/" className="hover:text-[#01AEBE] dark:hover:text-[#00c6ff] transition">
                  الرئيسية
                </Link>
              </li>
              <li>
                <Link href="#about" className="hover:text-[#01AEBE] dark:hover:text-[#00c6ff] transition">
                  عن الشركة
                </Link>
              </li>
              <li>
                <Link href="#services" className="hover:text-[#01AEBE] dark:hover:text-[#00c6ff] transition">
                  الخدمات
                </Link>
              </li>
              <li>
                <Link href="#portfolio" className="hover:text-[#01AEBE] dark:hover:text-[#00c6ff] transition">
                  أعمالنا
                </Link>
              </li>
              <li>
                <Link href="#contact" className="hover:text-[#01AEBE] dark:hover:text-[#00c6ff] transition">
                  اتصل بنا
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-4 text-[#01AEBE] dark:text-[#00c6ff]">خدماتنا</h4>
            <ul className="space-y-2 text-gray-600 dark:text-gray-400">
              <li>تكييف مركزي</li>
              <li>صيانة دورية</li>
              <li>توريد وتركيب</li>
              <li>تهوية وتبريد</li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-4 text-[#01AEBE] dark:text-[#00c6ff]">تواصل</h4>
            <ul className="space-y-3 text-gray-600 dark:text-gray-400 text-sm">
              <li className="flex items-start gap-2">
                <FaMapMarkerAlt className="mt-0.5 text-[#01AEBE] dark:text-[#00c6ff]" />
                <span>{address}</span>
              </li>

              {/* ✅ نفس نافذة اختيار الاتصال */}
              <li className="flex items-start gap-2">
                <FaPhone className="mt-0.5 text-[#01AEBE] dark:text-[#00c6ff]" />
                <button
                  type="button"
                  onClick={openCallPicker}
                  className="hover:text-[#01AEBE] dark:hover:text-[#00c6ff] transition text-left"
                >
                  <span dir="ltr">{phone}</span>
                </button>
              </li>

              <li className="flex items-start gap-2">
                <FaEnvelope className="mt-0.5 text-[#01AEBE] dark:text-[#00c6ff]" />
                <a
                  href={`mailto:${email}`}
                  className="hover:text-[#01AEBE] dark:hover:text-[#00c6ff] transition"
                >
                  {email}
                </a>
              </li>
              <li className="flex items-start gap-2">
                <FaRegBuilding className="mt-0.5 text-[#01AEBE] dark:text-[#00c6ff]" />
                <span>سجل: {commercialRegister}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-center text-gray-600 dark:text-gray-400 text-xs sm:text-sm">
          <p>© {currentYear} رياح الجليد. جميع الحقوق محفوظة.</p>
          <div className="flex flex-col items-center gap-1 mt-2 sm:mt-0">
            <p>
              تصميم وتطوير: <span className="text-[#01AEBE] dark:text-[#00c6ff] font-semibold">Team Hawk</span>
            </p>
            <a
              href="https://wa.me/96171235414"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 dark:text-gray-400 hover:text-[#01AEBE] dark:hover:text-[#00c6ff] transition underline underline-offset-2 text-xs"
            >
              <span dir="ltr">+961 71 235 414</span>
            </a>
          </div>
        </div>
      </div>

      {/* ✅ مودال اختيار الاتصال */}
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
                الرقم: <span dir="ltr" className="font-semibold">{phone}</span>
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
    </footer>
  );
}