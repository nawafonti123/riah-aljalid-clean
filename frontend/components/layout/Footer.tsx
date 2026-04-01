'use client';

import Link from 'next/link';
import Image from 'next/image';
import {
  FaMapMarkerAlt,
  FaPhone,
  FaEnvelope,
  FaRegBuilding,
  FaWhatsapp,
  FaArrowUp,
  FaSnowflake,
} from 'react-icons/fa';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden border-t border-cyan-400/10 bg-[#030b18] text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(0,198,255,0.16),transparent_22%),radial-gradient(circle_at_bottom_left,rgba(1,174,190,0.12),transparent_24%)]" />

      <div className="container-main relative py-14">
        <div className="grid gap-6 lg:grid-cols-[1.2fr_0.9fr_1fr]">
          <div className="rounded-[28px] border border-cyan-400/10 bg-white/5 p-6 backdrop-blur-xl">
            <div className="flex items-center gap-4">
              <div className="relative h-16 w-16 overflow-hidden rounded-2xl bg-white">
                <Image src="/logo.png" alt="رياح الجليد" fill className="object-contain p-2" />
              </div>

              <div>
                <h3 className="text-3xl font-extrabold">رياح الجليد</h3>
                <p className="mt-1 text-sm text-white/70">
                  حلول احترافية في التكييف المركزي والسبليت والتهوية والدكت.
                </p>
              </div>
            </div>

            <p className="mt-6 leading-8 text-white/75">
              شركة متخصصة في تركيب وصيانة أنظمة التكييف والتبريد للمنازل والشركات
              والمشاريع، مع التزام بالجودة والسرعة والدقة في التنفيذ.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href="https://wa.me/966565247407"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-[#01AEBE] px-5 py-3 font-bold text-white shadow-[0_10px_28px_rgba(1,174,190,0.3)]"
              >
                <FaWhatsapp />
                واتساب
              </a>

              <a
                href="tel:+966565247407"
                className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/5 px-5 py-3 font-bold text-white"
              >
                <FaPhone />
                اتصال
              </a>
            </div>
          </div>

          <div className="rounded-[28px] border border-cyan-400/10 bg-white/5 p-6 backdrop-blur-xl">
            <h4 className="text-2xl font-extrabold">روابط سريعة</h4>

            <div className="mt-5 space-y-3 text-lg text-white/75">
              <Link href="/" className="block hover:text-cyan-300">الرئيسية</Link>
              <Link href="/about" className="block hover:text-cyan-300">عن الشركة</Link>
              <Link href="/services" className="block hover:text-cyan-300">الخدمات</Link>
              <Link href="/portfolio" className="block hover:text-cyan-300">أعمالنا</Link>
              <Link href="/contact" className="block hover:text-cyan-300">اتصل بنا</Link>
            </div>

            <div className="mt-8 rounded-[24px] border border-white/8 bg-white/5 p-4">
              <div className="mb-3 flex items-center gap-2 text-cyan-300">
                <FaSnowflake />
                <span className="font-extrabold">خدماتنا</span>
              </div>

              <div className="space-y-2 text-white/75">
                <div>تكييف مركزي</div>
                <div>صيانة دورية</div>
                <div>تركيب مكيفات</div>
                <div>تصنيع وتركيب دكت</div>
              </div>
            </div>
          </div>

          <div className="rounded-[28px] border border-cyan-400/10 bg-white/5 p-6 backdrop-blur-xl">
            <h4 className="text-2xl font-extrabold">بيانات التواصل</h4>

            <div className="mt-5 space-y-4 text-white/75">
              <div className="flex items-start gap-3">
                <FaMapMarkerAlt className="mt-1 text-cyan-300" />
                <span>الرياض - طريق الملك عبدالعزيز</span>
              </div>

              <a href="tel:+966565247407" className="flex items-start gap-3 hover:text-cyan-300">
                <FaPhone className="mt-1 text-cyan-300" />
                <span>+966 56 524 7407</span>
              </a>

              <a
                href="mailto:RiaHaljalid@icloud.com"
                className="flex items-start gap-3 hover:text-cyan-300"
              >
                <FaEnvelope className="mt-1 text-cyan-300" />
                <span>RiaHaljalid@icloud.com</span>
              </a>

              <div className="flex items-start gap-3">
                <FaRegBuilding className="mt-1 text-cyan-300" />
                <span>السجل التجاري: 1010632725</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-4 border-t border-white/8 pt-6 text-sm text-white/55 sm:flex-row sm:items-center sm:justify-between">
          <p>© {currentYear} رياح الجليد. جميع الحقوق محفوظة.</p>

          <div className="flex items-center gap-5">
            <span>تصميم وتطوير: Team Hawk</span>
            <a
              href="#top"
              onClick={(e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="inline-flex items-center gap-2 rounded-full border border-white/10 px-4 py-2 hover:bg-white/5"
            >
              <FaArrowUp />
              للأعلى
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}