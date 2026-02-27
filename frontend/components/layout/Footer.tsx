// frontend/components/layout/Footer.tsx
import Link from 'next/link';
import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaRegBuilding } from 'react-icons/fa';
import Image from 'next/image';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

async function fetchSettings() {
  try {
    if (!API_URL) return null;
    const res = await fetch(`${API_URL}/settings`, { cache: 'no-store' });
    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
}

export default async function Footer() {
  const currentYear = new Date().getFullYear();
  const settings = await fetchSettings();

  const address = settings?.address || 'الرياض - طريق الملك عبدالعزيز';
  const phone = settings?.phone || '+966 56 524 7407';
  const email = settings?.email || 'RiaHaljalid@icloud.com';
  const commercialRegister = settings?.commercialRegister || '1010632725';
  const footerIceImage = settings?.footerIceImage || '/logo.png';

  return (
    <footer className="relative bg-white dark:bg-[#0F2027] text-gray-800 dark:text-white pt-12 pb-6 transition-colors duration-300 overflow-hidden">
      {/* زخرفة خفيفة أسفل الفوتر (صورة قابلة للتغيير من لوحة الإدارة) */}
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
          {/* حول الشركة */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="relative w-16 h-16 rounded-full overflow-hidden border border-gray-200/60 dark:border-white/10 bg-white/60 dark:bg-white/5">
                <Image
                  src="/logo.png"
                  alt="رياح الجليد"
                  fill
                  sizes="64px"
                  className="object-contain p-1"
                />
              </div>
              <h3 className="text-xl font-bold text-gradient-primary">رياح الجليد</h3>
            </div>
            <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
              شركة سعودية متخصصة في تركيب وصيانة أنظمة التكييف المركزي والتهوية والتبريد باستخدام أحدث التقنيات.
            </p>
          </div>

          {/* روابط سريعة */}
          <div>
            <h4 className="font-bold mb-4 text-[#01AEBE] dark:text-[#00c6ff]">روابط سريعة</h4>
            <ul className="space-y-2 text-gray-600 dark:text-gray-400">
              <li><Link href="/" className="hover:text-[#01AEBE] dark:hover:text-[#00c6ff] transition">الرئيسية</Link></li>
              <li><Link href="#about" className="hover:text-[#01AEBE] dark:hover:text-[#00c6ff] transition">عن الشركة</Link></li>
              <li><Link href="#services" className="hover:text-[#01AEBE] dark:hover:text-[#00c6ff] transition">الخدمات</Link></li>
              <li><Link href="#portfolio" className="hover:text-[#01AEBE] dark:hover:text-[#00c6ff] transition">أعمالنا</Link></li>
              <li><Link href="#contact" className="hover:text-[#01AEBE] dark:hover:text-[#00c6ff] transition">اتصل بنا</Link></li>
            </ul>
          </div>

          {/* خدماتنا */}
          <div>
            <h4 className="font-bold mb-4 text-[#01AEBE] dark:text-[#00c6ff]">خدماتنا</h4>
            <ul className="space-y-2 text-gray-600 dark:text-gray-400">
              <li>تكييف مركزي</li>
              <li>صيانة دورية</li>
              <li>توريد وتركيب</li>
              <li>تهوية وتبريد</li>
            </ul>
          </div>

          {/* تواصل */}
          <div>
            <h4 className="font-bold mb-4 text-[#01AEBE] dark:text-[#00c6ff]">تواصل</h4>
            <ul className="space-y-3 text-gray-600 dark:text-gray-400 text-sm">
              <li className="flex items-start gap-2">
                <FaMapMarkerAlt className="mt-0.5 text-[#01AEBE] dark:text-[#00c6ff]" />
                <span>{address}</span>
              </li>
              <li className="flex items-start gap-2">
                <FaPhone className="mt-0.5 text-[#01AEBE] dark:text-[#00c6ff]" />
                <a href={`https://wa.me/${phone.replace(/\s|\+/g, '')}`} className="hover:text-[#01AEBE] dark:hover:text-[#00c6ff] transition" target="_blank" rel="noreferrer">
                  <span dir="ltr">{phone}</span>
                </a>
              </li>
              <li className="flex items-start gap-2">
                <FaEnvelope className="mt-0.5 text-[#01AEBE] dark:text-[#00c6ff]" />
                <a href={`mailto:${email}`} className="hover:text-[#01AEBE] dark:hover:text-[#00c6ff] transition">{email}</a>
              </li>
              <li className="flex items-start gap-2">
                <FaRegBuilding className="mt-0.5 text-[#01AEBE] dark:text-[#00c6ff]" />
                <span>سجل: {commercialRegister}</span>
              </li>
            </ul>
          </div>
        </div>

        {/* حقوق النشر وتوقيع التطوير */}
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
    </footer>
  );
}