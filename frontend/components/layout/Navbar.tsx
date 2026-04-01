'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
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

  const visibleRatiosRef = useRef<Record<string, number>>({});

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
    const handleScrollState = () => {
      setScrolled(window.scrollY > 10);
    };

    handleScrollState();
    window.addEventListener('scroll', handleScrollState, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScrollState);
    };
  }, []);

  useEffect(() => {
    if (!isHome) {
      setActiveSection('');
      return;
    }

    const sectionElements = sections
      .map((item) => document.getElementById(item.id))
      .filter(Boolean) as HTMLElement[];

    if (!sectionElements.length) return;

    const pickBestSection = () => {
      const visibleRatios = visibleRatiosRef.current;

      let bestId = '';
      let bestRatio = 0;

      for (const item of sections) {
        const ratio = visibleRatios[item.id] ?? 0;
        if (ratio > bestRatio) {
          bestRatio = ratio;
          bestId = item.id;
        }
      }

      if (bestId) {
        setActiveSection(bestId);
        return;
      }

      const viewportMiddle = window.innerHeight * 0.38;
      let closestId = sections[0].id;
      let closestDistance = Number.POSITIVE_INFINITY;

      for (const item of sections) {
        const el = document.getElementById(item.id);
        if (!el) continue;

        const rect = el.getBoundingClientRect();
        const sectionMiddle = rect.top + rect.height / 2;
        const distance = Math.abs(sectionMiddle - viewportMiddle);

        if (distance < closestDistance) {
          closestDistance = distance;
          closestId = item.id;
        }
      }

      setActiveSection(closestId);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          visibleRatiosRef.current[entry.target.id] = entry.isIntersecting
            ? entry.intersectionRatio
            : 0;
        }

        pickBestSection();
      },
      {
        root: null,
        rootMargin: '-15% 0px -45% 0px',
        threshold: [0, 0.1, 0.2, 0.35, 0.5, 0.65, 0.8, 1],
      }
    );

    sectionElements.forEach((el) => observer.observe(el));
    pickBestSection();

    return () => {
      sectionElements.forEach((el) => observer.unobserve(el));
      observer.disconnect();
      visibleRatiosRef.current = {};
    };
  }, [isHome]);

  useEffect(() => {
    if (!isHome || typeof window === 'undefined') return;

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
    if (!isHome) return '';
    return activeSection;
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
                ? 'border-slate-300/60 bg-white/92 shadow-[0_10px_40px_rgba(15,23,42,0.12)] dark:border-white/15 dark:bg-black/60 dark:shadow-[0_10px_40px_rgba(0,0,0,0.22)]'
                : 'border-slate-300/50 bg-white/82 shadow-[0_8px_30px_rgba(15,23,42,0.08)] dark:border-white/10 dark:bg-black/38 dark:shadow-[0_8px_30px_rgba(0,0,0,0.16)]'
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
                  className="object-cover"
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
                        ? 'bg-gradient-to-r from-emerald-500 to-cyan-500 text-white shadow-[0_10px_26px_rgba(16,185,129,0.32)]'
                        : 'border border-slate-200/80 bg-white/70 text-slate-700 hover:-translate-y-[1px] hover:bg-slate-100 hover:text-slate-900 dark:border-white/10 dark:bg-white/[0.06] dark:text-white/80 dark:hover:bg-white/[0.12] dark:hover:text-white'
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
                className="hidden items-center gap-2 rounded-full bg-gradient-to-r from-emerald-500 to-green-500 px-4 py-2.5 text-sm font-bold text-white shadow-[0_10px_30px_rgba(16,185,129,0.30)] transition-all duration-300 hover:scale-[1.02] hover:from-emerald-400 hover:to-green-400 md:inline-flex"
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
                          ? 'bg-gradient-to-r from-emerald-500 to-cyan-500 text-white shadow-[0_10px_26px_rgba(16,185,129,0.22)]'
                          : 'bg-slate-100 text-slate-800 hover:bg-slate-200 dark:bg-white/5 dark:text-white/85 dark:hover:bg-white/10'
                      }`}
                    >
                      <span
                        className={`flex h-10 w-10 items-center justify-center rounded-xl ${
                          active
                            ? 'bg-white/15'
                            : 'bg-white/70 dark:bg-white/10'
                        }`}
                      >
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
                className="mt-5 flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-emerald-500 to-green-500 px-4 py-3 text-sm font-extrabold text-white"
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