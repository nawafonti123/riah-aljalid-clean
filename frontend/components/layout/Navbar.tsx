// frontend/components/layout/Navbar.tsx
'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { AnimatePresence, motion } from 'framer-motion';
import {
  FaBars,
  FaEnvelope,
  FaHome,
  FaImages,
  FaInfoCircle,
  FaMoon,
  FaPhoneAlt,
  FaSun,
  FaTimes,
  FaWrench,
} from 'react-icons/fa';
import { useTheme } from 'next-themes';
import { usePathname } from 'next/navigation';

const navLinks = [
  { href: '/', label: 'الرئيسية', icon: FaHome },
  { href: '/about', label: 'عن الشركة', icon: FaInfoCircle },
  { href: '/services', label: 'الخدمات', icon: FaWrench },
  { href: '/portfolio', label: 'أعمالنا', icon: FaImages },
  { href: '/contact', label: 'اتصل بنا', icon: FaEnvelope },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  const { theme, setTheme } = useTheme();
  const pathname = usePathname();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  if (!mounted) return null;

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-4 sm:pt-4">
        <div
          className={`section-container transition-all duration-300 ${
            scrolled ? 'max-w-6xl' : 'max-w-7xl'
          }`}
        >
          <div
            className={`mx-auto flex items-center justify-between gap-3 rounded-[28px] border px-3 py-3 shadow-lg backdrop-blur-xl transition-all duration-300 sm:px-4 ${
              scrolled
                ? 'border-black/10 bg-white/88 dark:border-white/10 dark:bg-[#08141f]/88'
                : 'border-black/5 bg-white/72 dark:border-white/10 dark:bg-[#08141f]/72'
            }`}
          >
            <Link
              href="/"
              className="flex min-w-0 items-center gap-3"
              aria-label="الانتقال للرئيسية"
            >
              <div className="relative h-11 w-11 shrink-0 overflow-hidden rounded-2xl border border-black/10 bg-white dark:border-white/10 dark:bg-white/10">
                <Image
                  src="/logo.png"
                  alt="رياح الجليد"
                  fill
                  className="object-contain p-1.5"
                  priority
                />
              </div>

              <div className="min-w-0">
                <div className="truncate text-sm font-extrabold text-slate-900 dark:text-white sm:text-base">
                  رياح الجليد
                </div>
                <div className="truncate text-[11px] text-slate-500 dark:text-white/60 sm:text-xs">
                  تكييف • تبريد • دكت
                </div>
              </div>
            </Link>

            <nav className="hidden items-center gap-2 lg:flex">
              {navLinks.map((link) => {
                const Icon = link.icon;
                const active = pathname === link.href;

                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`inline-flex items-center gap-2 rounded-2xl px-4 py-2.5 text-sm font-bold transition ${
                      active
                        ? 'bg-cyan-500 text-white shadow-md shadow-cyan-500/20'
                        : 'text-slate-700 hover:bg-slate-100 dark:text-white/85 dark:hover:bg-white/10'
                    }`}
                  >
                    <Icon className="text-sm" />
                    {link.label}
                  </Link>
                );
              })}
            </nav>

            <div className="flex items-center gap-2">
              <Link
                href="/contact"
                className="hidden items-center gap-2 rounded-2xl bg-cyan-500 px-4 py-2.5 text-sm font-bold text-white transition hover:bg-cyan-600 lg:inline-flex"
              >
                <FaPhoneAlt />
                اطلب الخدمة الآن
              </Link>

              <button
                type="button"
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                className="flex h-11 w-11 items-center justify-center rounded-2xl border border-black/10 bg-slate-100 text-slate-800 transition hover:bg-slate-200 dark:border-white/10 dark:bg-white/10 dark:text-white dark:hover:bg-white/15"
                aria-label="تبديل الوضع"
              >
                {theme === 'dark' ? <FaSun /> : <FaMoon />}
              </button>

              <button
                type="button"
                onClick={() => setMenuOpen(true)}
                className="flex h-11 w-11 items-center justify-center rounded-2xl bg-cyan-500 text-white transition hover:bg-cyan-600 lg:hidden"
                aria-label="فتح القائمة"
              >
                <FaBars />
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="h-[88px] sm:h-[96px]" />

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed inset-0 z-[70] bg-slate-950/50 backdrop-blur-sm lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setMenuOpen(false)}
          >
            <motion.aside
              className="absolute inset-y-0 right-0 flex w-[88%] max-w-[360px] flex-col border-l border-white/10 bg-[#07111b] p-4 text-white shadow-2xl"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.28, ease: 'easeOut' }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="mb-5 flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="relative h-11 w-11 overflow-hidden rounded-2xl bg-white">
                    <Image
                      src="/logo.png"
                      alt="رياح الجليد"
                      fill
                      className="object-contain p-1.5"
                    />
                  </div>
                  <div>
                    <div className="font-extrabold">القائمة</div>
                    <div className="text-xs text-white/60">تصفح الموقع بسهولة</div>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setMenuOpen(false)}
                  className="flex h-10 w-10 items-center justify-center rounded-2xl bg-white/10 text-white"
                  aria-label="إغلاق القائمة"
                >
                  <FaTimes />
                </button>
              </div>

              <div className="flex flex-1 flex-col gap-2 overflow-y-auto">
                {navLinks.map((link) => {
                  const Icon = link.icon;
                  const active = pathname === link.href;

                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setMenuOpen(false)}
                      className={`flex items-center gap-3 rounded-2xl px-4 py-4 text-sm font-bold transition ${
                        active
                          ? 'bg-cyan-500 text-white'
                          : 'bg-white/5 text-white/90 hover:bg-white/10'
                      }`}
                    >
                      <Icon className="text-base" />
                      {link.label}
                    </Link>
                  );
                })}
              </div>

              <Link
                href="/contact"
                onClick={() => setMenuOpen(false)}
                className="mt-4 inline-flex items-center justify-center gap-2 rounded-2xl bg-cyan-500 px-4 py-3 text-sm font-bold text-white"
              >
                <FaPhoneAlt />
                اطلب الخدمة الآن
              </Link>
            </motion.aside>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}