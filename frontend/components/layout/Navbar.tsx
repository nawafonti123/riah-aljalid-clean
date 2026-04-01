'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FaHome, FaInfoCircle, FaTools, FaImages, FaEnvelope } from 'react-icons/fa';

const links = [
  { href: '#hero', label: 'الرئيسية', icon: <FaHome /> },
  { href: '#about', label: 'عن الشركة', icon: <FaInfoCircle /> },
  { href: '#services', label: 'الخدمات', icon: <FaTools /> },
  { href: '#portfolio', label: 'أعمالنا', icon: <FaImages /> },
  { href: '#contact', label: 'اتصل بنا', icon: <FaEnvelope /> },
];

export default function Navbar() {
  const pathname = usePathname();

  const scrollToSection = (id: string) => {
    const el = document.querySelector(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <header className="fixed top-4 left-0 right-0 z-50 px-4">
      <div className="mx-auto flex max-w-7xl items-center justify-between rounded-2xl border border-white/10 bg-white/70 p-3 shadow-lg backdrop-blur-md dark:bg-[#0b1220]/70">
        
        {/* 🔹 اللوجو + الاسم */}
        <div className="flex items-center gap-3">
          
          {/* ✅ اللوجو بعد التعديل */}
          <div className="h-11 w-11 overflow-hidden rounded-xl bg-white shadow-md">
            <img
              src="/logo.png"
              alt="logo"
              className="h-full w-full object-cover"
            />
          </div>

          <div className="hidden sm:block">
            <h2 className="text-sm font-extrabold text-slate-900 dark:text-white">
              رياح الجليد
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-300">
              تكييف - تبريد - دكت
            </p>
          </div>
        </div>

        {/* 🔹 الروابط */}
        <nav className="hidden items-center gap-2 md:flex">
          {links.map((link) => (
            <button
              key={link.href}
              onClick={() => scrollToSection(link.href)}
              className="flex items-center gap-2 rounded-full px-4 py-2 text-sm font-bold text-slate-700 transition hover:bg-cyan-100 hover:text-cyan-700 dark:text-slate-200 dark:hover:bg-cyan-500/10 dark:hover:text-cyan-300"
            >
              {link.icon}
              {link.label}
            </button>
          ))}
        </nav>

        {/* 🔹 زر الخدمة */}
        <div className="flex items-center gap-2">
          <Link
            href="https://wa.me/966565247407"
            target="_blank"
            className="hidden rounded-full bg-emerald-500 px-5 py-2 text-sm font-extrabold text-white shadow-lg transition hover:bg-emerald-400 sm:block"
          >
            اطلب الخدمة الآن
          </Link>
        </div>
      </div>
    </header>
  );
}