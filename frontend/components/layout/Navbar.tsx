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
import { usePathname, useRouter } from 'next/navigation';

const sections = [
  { id: 'hero', label: 'الرئيسية', icon: FaHome, page: '/' },
  { id: 'about', label: 'عن الشركة', icon: FaInfoCircle, page: '/about' },
  { id: 'services', label: 'الخدمات', icon: FaWrench, page: '/services' },
  { id: 'portfolio', label: 'أعمالنا', icon: FaImages, page: '/portfolio' },
  { id: 'contact', label: 'اتصل بنا', icon: FaEnvelope, page: '/contact' },
];

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { theme, setTheme } = useTheme();

  const [mounted, setMounted] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  const isHome = pathname === '/';

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 16);

      if (!isHome) return;

      for (const item of sections) {
        const el = document.getElementById(item.id);
        if (!el) continue;

        const rect = el.getBoundingClientRect();
        if (rect.top <= 140 && rect.bottom >= 140) {
          setActiveSection(item.id);
          break;
        }
      }
    };

    onScroll();
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, [isHome]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  const activePath = useMemo(() => {
    if (isHome) return activeSection;
    const current = sections.find((s) => s.page === pathname);
    return current?.id ?? '';
  }, [isHome, pathname, activeSection]);

  const goTo = (item: (typeof sections)[number]) => {
    setMenuOpen(false);

    if (isHome) {
      const el = document.getElementById(item.id);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        return;
      }
    }

    router.push(item.page);
  };

  if (!mounted) return null;

  return (
    <>
      <motion.header
        initial={{ y: -24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-4 sm:pt-4"
      >
        <div
          className={`mx-auto max-w-7xl rounded-[28px] border transition-all duration-300 ${
            scrolled
              ? 'border-cyan-400/15 bg-[#051120]/88 shadow-[0_18px_40px_rgba(0,0,0,0.28)] backdrop-blur-xl'
              : 'border-cyan-400/10 bg-[#051120]/76 backdrop-blur-xl'
          }`}
        >
          <div className="flex items-center justify-between gap-4 px-4 py-3 sm:px-5">
            <button onClick={() => goTo(sections[0])} className="flex items-center gap-3 shrink-0">
              <div className="relative h-12 w-12 overflow-hidden rounded-2xl border border-cyan-400/20 bg-white">
                <Image
                  src="/logo.png"
                  alt="رياح الجليد"
                  fill
                  className="object-contain p-1.5"
                  priority
                />
              </div>

              <div className="text-right leading-tight">
                <div className="text-xl font-extrabold text-white">رياح الجليد</div>
                <div className="text-sm text-cyan-300">تكييف • تبريد • دكت</div>
              </div>
            </button>

            <nav className="hidden lg:flex items-center gap-2">
              {sections.map((item) => {
                const Icon = item.icon;
                const active = activePath === item.id;

                return (
                  <button
                    key={item.id}
                    onClick={() => goTo(item)}
                    className={`flex items-center gap-2 rounded-full px-5 py-3 text-sm font-extrabold transition-all duration-300 ${
                      active
                        ? 'bg-[#01AEBE] text-white shadow-[0_10px_30px_rgba(1,174,190,0.38)]'
                        : 'text-white/90 hover:bg-white/8 hover:text-cyan-300'
                    }`}
                  >
                    <Icon className="text-sm" />
                    {item.label}
                  </button>
                );
              })}
            </nav>

            <div className="hidden lg:flex items-center gap-3">
              <a
                href="tel:+966565247407"
                className="flex items-center gap-2 rounded-full bg-[#01AEBE] px-6 py-3 font-extrabold text-white shadow-[0_10px_30px_rgba(1,174,190,0.35)] transition hover:scale-[1.02]"
              >
                <FaPhoneAlt />
                اطلب الخدمة الآن
              </a>

              <button
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                className="flex h-11 w-11 items-center justify-center rounded-full bg-white/8 text-white transition hover:bg-white/12"
                aria-label="toggle theme"
              >
                {theme === 'dark' ? <FaSun /> : <FaMoon />}
              </button>
            </div>

            <div className="flex lg:hidden items-center gap-2">
              <button
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-white/8 text-white"
                aria-label="toggle theme"
              >
                {theme === 'dark' ? <FaSun /> : <FaMoon />}
              </button>

              <button
                onClick={() => setMenuOpen(true)}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-[#01AEBE] text-white"
                aria-label="open menu"
              >
                <FaBars />
              </button>
            </div>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setMenuOpen(false)}
          >
            <motion.aside
              initial={{ x: 70, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 70, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="mr-auto h-full w-full max-w-sm border-l border-cyan-400/10 bg-[#071223] p-5"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="mb-6 flex items-center justify-between">
                <h3 className="text-xl font-extrabold text-white">القائمة</h3>
                <button
                  onClick={() => setMenuOpen(false)}
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-white/8 text-white"
                >
                  <FaTimes />
                </button>
              </div>

              <div className="space-y-3">
                {sections.map((item) => {
                  const Icon = item.icon;
                  const active = activePath === item.id;

                  return (
                    <button
                      key={item.id}
                      onClick={() => goTo(item)}
                      className={`flex w-full items-center gap-3 rounded-2xl p-4 text-right transition ${
                        active
                          ? 'bg-[#01AEBE] text-white'
                          : 'bg-white/5 text-white/90 hover:bg-white/10'
                      }`}
                    >
                      <Icon />
                      <span className="font-bold">{item.label}</span>
                    </button>
                  );
                })}
              </div>

              <a
                href="tel:+966565247407"
                className="mt-6 flex items-center justify-center gap-2 rounded-2xl bg-[#01AEBE] p-4 font-extrabold text-white"
              >
                <FaPhoneAlt />
                اطلب الخدمة الآن
              </a>
            </motion.aside>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}