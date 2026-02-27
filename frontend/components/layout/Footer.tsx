// frontend/components/layout/Footer.tsx
import Link from 'next/link';
import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaRegBuilding } from 'react-icons/fa';
import Image from 'next/image';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white dark:bg-[#0F2027] text-gray-800 dark:text-white pt-12 pb-6 transition-colors duration-300">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* حول الشركة */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="relative w-12 h-12">
                <Image
                  src="/logo.png"
                  alt="رياح الجليد"
                  width={48}
                  height={48}
                  className="object-contain"
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
              <li>تهوية</li>
              <li>تبريد</li>
              <li>صيانة وإصلاح</li>
              <li>استشارات فنية</li>
            </ul>
          </div>

          {/* معلومات الاتصال */}
          <div>
            <h4 className="font-bold mb-4 text-[#01AEBE] dark:text-[#00c6ff]">تواصل معنا</h4>
            <ul className="space-y-3 text-gray-600 dark:text-gray-400 text-sm">
              <li className="flex items-start gap-3">
                <FaMapMarkerAlt className="w-4 h-4 text-[#01AEBE] dark:text-[#00c6ff] mt-0.5 flex-shrink-0" />
                <span>8246 طريق الملك عبدالعزيز الفرعي، الملك فهد، الرياض</span>
              </li>
              <li className="flex items-start gap-3">
                <FaPhone className="w-4 h-4 text-[#01AEBE] dark:text-[#00c6ff] mt-0.5 flex-shrink-0" />
                <a
                  href="https://wa.me/966565247407"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#01AEBE] dark:hover:text-[#00c6ff] transition underline underline-offset-2"
                >
                  <span dir="ltr">+966 56 524 7407</span>
                </a>
              </li>
              <li className="flex items-start gap-3">
                <FaEnvelope className="w-4 h-4 text-[#01AEBE] dark:text-[#00c6ff] mt-0.5 flex-shrink-0" />
                <a
                  href="mailto:RiaHaljalid@icloud.com"
                  className="hover:text-[#01AEBE] dark:hover:text-[#00c6ff] transition underline underline-offset-2"
                >
                  RiaHaljalid@icloud.com
                </a>
              </li>
              <li className="flex items-start gap-3">
                <FaRegBuilding className="w-4 h-4 text-[#01AEBE] dark:text-[#00c6ff] mt-0.5 flex-shrink-0" />
                <span>سجل تجاري: 1010632725</span>
              </li>
            </ul>
          </div>
        </div>

        {/* خط فاصل */}
        <div className="border-t border-gray-200 dark:border-white/10 my-6"></div>

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
