'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { AnimatePresence, motion } from 'framer-motion';
import {
  FaBars,
  FaTimes,
  FaSun,
  FaMoon,
  FaHome,
  FaInfoCircle,
  FaWrench,
  FaImages,
  FaEnvelope,
  FaPhoneAlt,
} from 'react-icons/fa';
import { useTheme } from 'next-themes';
import { usePathname } from 'next/navigation';

type NavItem = {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
};

const sections: NavItem[] = [
  { id: 'hero', label: 'الرئيسية', icon: FaHome },
  { id: 'about', label: 'عن الشركة', icon: FaInfoCircle },
  { id: 'services', label: 'الخدمات', icon: FaWrench },
  { id: 'portfolio', label: 'أعمالنا', icon: FaImages },
  { id: 'contact', label: 'اتصل بنا', icon: FaEnvelope },
];

export default function Navbar() {
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();

  const [mounted, setMounted] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  const isHome = pathname === '/';

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const closeMenu = () => setMenuOpen(false);
    window.addEventListener('resize', closeMenu);
    return () => window.removeEventListener('resize', closeMenu);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  useEffect(() => {
    const updateActiveSection = () => {
      setScrolled(window.scrollY > 14);

      if (!isHome) return;

      let current = 'hero';

      for (const item of sections) {
        const el = document.getElementById(item.id);
        if (!el) continue;

        const rect = el.getBoundingClientRect();
        if (rect.top <= 140 && rect.bottom >= 140) {
          current = item.id;
          break;
        }
      }

      setActiveSection(current);
    };

    updateActiveSection();
    window.addEventListener('scroll', updateActiveSection, { passive: true });

    return () => {
      window.removeEventListener('scroll', updateActiveSection);
    };
  }, [isHome]);

  useEffect(() => {
    if (!isHome) return;

    const hash = window.location.hash.replace('#', '');
    if (!hash) return;

    const el = document.getElementById(hash);
    if (!el) return;

    const timer = window.setTimeout(() => {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 120);

    return () => window.clearTimeout(timer);
  }, [isHome]);

  const activePath = useMemo(() => {
    if (isHome) return activeSection;
    return '';
  }, [activeSection, isHome]);

  const handleScrollTo = (id: string) => {
    setMenuOpen(false);

    if (typeof window === 'undefined') return;

    if (!isHome) {
      window.location.href = id === 'hero' ? '/' : `/#${id}`;
      return;
    }

    if (id === 'hero') {
      window.history.replaceState(null, '', '/');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    const section = document.getElementById(id);
    if (!section) return;

    window.history.replaceState(null, '', `/#${id}`);
    section.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  if (!mounted) return null;

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
          scrolled ? 'py-2 sm:py-3' : 'py-3 sm:py-5'
        }`}
      >
        <div className="mx-auto w-[min(1400px,94%)] sm:w-[min(1400px,92%)]">
          <div
            className={`flex items-center justify-between gap-2 rounded-[22px] border px-3 py-2.5 backdrop-blur-xl transition-all duration-300 sm:gap-3 sm:px-4 sm:py-3 md:px-6 ${
              scrolled
                ? 'border-slate-300/60 bg-white/90 shadow-[0_10px_40px_rgba(15,23,42,0.12)] dark:border-white/15 dark:bg-black/55 dark:shadow-[0_10px_40px_rgba(0,0,0,0.22)]'
                : 'border-slate-300/50 bg-white/80 shadow-[0_8px_30px_rgba(15,23,42,0.08)] dark:border-white/10 dark:bg-black/35 dark:shadow-[0_8px_30px_rgba(0,0,0,0.16)]'
            }`}
          >
            <button
              onClick={() => handleScrollTo('hero')}
              className="flex min-w-0 items-center gap-2 text-right sm:gap-3"
              aria-label="العودة للرئيسية"
              type="button"
            >
              <div className="relative h-11 w-11 shrink-0 overflow-hidden rounded-2xl border border-slate-200 bg-white dark:border-white/10 dark:bg-white/10 sm:h-12 sm:w-12">
                <Image
                  src="/logo.png"
                  alt="رياح الجليد"
                  fill
                  className="object-contain p-1.5"
                  sizes="48px"
                />
              </div>

              <div className="min-w-0">
                <div className="truncate text-sm font-extrabold text-slate-900 dark:text-white sm:text-[15px]">
                  رياح الجليد
                </div>
                <div className="hidden truncate text-xs text-slate-500 dark:text-white/70 sm:block">
                  تكييف • تبريد • دكت
                </div>
              </div>
            </button>

            <nav className="hidden items-center gap-2 lg:flex">
              {sections.map((item) => {
                const Icon = item.icon;
                const active = activePath === item.id;

                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => handleScrollTo(item.id)}
                    className={`group inline-flex items-center gap-2 rounded-full px-4 py-2.5 text-sm font-semibold transition-all duration-300 ${
                      active
                        ? 'bg-emerald-500 text-white shadow-[0_8px_24px_rgba(16,185,129,0.35)]'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-white/7 dark:text-white/85 dark:hover:bg-white/12 dark:hover:text-white'
                    }`}
                  >
                    <Icon className="text-xs" />
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </nav>

            <div className="flex items-center gap-1.5 sm:gap-2">
              <Link
                href="/#contact"
                onClick={() => setMenuOpen(false)}
                className="hidden items-center gap-2 rounded-full bg-emerald-500 px-4 py-2.5 text-sm font-bold text-white shadow-[0_10px_30px_rgba(16,185,129,0.35)] transition-all duration-300 hover:scale-[1.02] hover:bg-emerald-400 md:inline-flex"
              >
                <FaPhoneAlt className="text-xs" />
                اطلب الخدمة الآن
              </Link>

              <button
                type="button"
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                className="hidden h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 transition-all duration-300 hover:bg-slate-100 dark:border-white/10 dark:bg-white/10 dark:text-white dark:hover:bg-white/15 lg:flex"
                aria-label="تغيير الثيم"
              >
                {theme === 'dark' ? <FaSun /> : <FaMoon />}
              </button>

              <button
                type="button"
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 transition-all duration-300 hover:bg-slate-100 dark:border-white/10 dark:bg-white/10 dark:text-white dark:hover:bg-white/15 lg:hidden"
                aria-label="تغيير الثيم"
              >
                {theme === 'dark' ? <FaSun /> : <FaMoon />}
              </button>

              <button
                type="button"
                onClick={() => setMenuOpen(true)}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 transition-all duration-300 hover:bg-slate-100 dark:border-white/10 dark:bg-white/10 dark:text-white dark:hover:bg-white/15 lg:hidden"
                aria-label="فتح القائمة"
              >
                <FaBars />
              </button>
            </div>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed inset-0 z-[70] bg-black/60 backdrop-blur-sm lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setMenuOpen(false)}
          >
            <motion.div
              className="absolute right-0 top-0 h-full w-[86%] max-w-[340px] border-l border-slate-200 bg-white p-4 shadow-2xl dark:border-white/10 dark:bg-neutral-950 sm:w-[82%] sm:p-5"
              initial={{ x: 80, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 80, opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="mb-5 flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-extrabold text-slate-900 dark:text-white">
                    القائمة
                  </h3>
                  <p className="mt-1 text-sm text-slate-500 dark:text-white/60">
                    تنقل سريع داخل الصفحة
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => setMenuOpen(false)}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-slate-50 text-slate-700 dark:border-white/10 dark:bg-white/10 dark:text-white"
                  aria-label="إغلاق القائمة"
                >
                  <FaTimes />
                </button>
              </div>

              <div className="space-y-2">
                {sections.map((item) => {
                  const Icon = item.icon;
                  const active = activePath === item.id;

                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => handleScrollTo(item.id)}
                      className={`flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-right transition-all duration-300 ${
                        active
                          ? 'bg-emerald-500 text-white'
                          : 'bg-slate-100 text-slate-800 hover:bg-slate-200 dark:bg-white/5 dark:text-white/85 dark:hover:bg-white/10'
                      }`}
                    >
                      <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/70 dark:bg-white/10">
                        <Icon className="text-sm" />
                      </span>
                      <span className="text-sm font-bold">{item.label}</span>
                    </button>
                  );
                })}
              </div>

              <Link
                href="/#contact"
                onClick={() => setMenuOpen(false)}
                className="mt-5 flex w-full items-center justify-center gap-2 rounded-2xl bg-emerald-500 px-4 py-3 text-sm font-extrabold text-white"
              >
                <FaPhoneAlt className="text-xs" />
                اطلب الخدمة الآن
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}