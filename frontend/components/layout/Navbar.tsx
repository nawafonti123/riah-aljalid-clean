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
  }, [menuOpen]);

  useEffect(() => {
    const updateActiveSection = () => {
      setScrolled(window.scrollY > 10);

      if (!isHome) return;

      let current = 'hero';

      for (const item of sections) {
        const el = document.getElementById(item.id);
        if (!el) continue;

        const rect = el.getBoundingClientRect();
        if (rect.top <= 120 && rect.bottom >= 120) {
          current = item.id;
          break;
        }
      }

      setActiveSection(current);
    };

    updateActiveSection();
    window.addEventListener('scroll', updateActiveSection);

    return () => window.removeEventListener('scroll', updateActiveSection);
  }, [isHome]);

  const activePath = useMemo(() => {
    if (!isHome) return ''; // 🔥 الحل هنا
    return activeSection;
  }, [activeSection, isHome]);

  const handleScrollTo = (id: string) => {
    setMenuOpen(false);

    if (!isHome) {
      window.location.href = id === 'hero' ? '/' : `/#${id}`;
      return;
    }

    if (id === 'hero') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    const section = document.getElementById(id);
    if (!section) return;

    section.scrollIntoView({ behavior: 'smooth' });
  };

  if (!mounted) return null;

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
          scrolled ? 'py-2' : 'py-4'
        }`}
      >
        <div className="mx-auto w-[min(1400px,94%)]">
          <div className="flex items-center justify-between gap-3 rounded-2xl border border-white/10 bg-black/40 px-4 py-3 backdrop-blur-xl">

            {/* 🔹 اللوقو */}
            <button
              onClick={() => handleScrollTo('hero')}
              className="flex items-center gap-3"
            >
              <div className="relative h-11 w-11 overflow-hidden rounded-xl bg-white">
                <Image
                  src="/logo.png"
                  alt="logo"
                  fill
                  className="object-cover"
                />
              </div>

              <div className="hidden sm:block">
                <div className="text-sm font-bold text-white">
                  رياح الجليد
                </div>
                <div className="text-xs text-white/60">
                  تكييف • تبريد • دكت
                </div>
              </div>
            </button>

            {/* 🔹 الروابط */}
            <nav className="hidden items-center gap-2 lg:flex">
              {sections.map((item) => {
                const Icon = item.icon;
                const active = activePath === item.id;

                return (
                  <button
                    key={item.id}
                    onClick={() => handleScrollTo(item.id)}
                    className={`flex items-center gap-2 rounded-full px-4 py-2 text-sm font-bold transition-all duration-300 ${
                      active
                        ? 'bg-gradient-to-r from-emerald-500 to-cyan-500 text-white shadow-lg'
                        : 'bg-white/10 text-white/70 hover:bg-white/20 hover:text-white'
                    }`}
                  >
                    <Icon className="text-xs" />
                    {item.label}
                  </button>
                );
              })}
            </nav>

            {/* 🔹 اليمين */}
            <div className="flex items-center gap-2">

              <Link
                href="/#contact"
                className="hidden md:flex items-center gap-2 rounded-full bg-emerald-500 px-4 py-2 text-sm font-bold text-white hover:bg-emerald-400"
              >
                <FaPhoneAlt />
                اطلب الخدمة
              </Link>

              <button
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                className="h-10 w-10 flex items-center justify-center rounded-full bg-white/10 text-white"
              >
                {theme === 'dark' ? <FaSun /> : <FaMoon />}
              </button>

              <button
                onClick={() => setMenuOpen(true)}
                className="h-10 w-10 flex items-center justify-center rounded-full bg-white/10 text-white lg:hidden"
              >
                <FaBars />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* 🔥 المينيو */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed inset-0 z-[70] bg-black/70 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setMenuOpen(false)}
          >
            <motion.div
              className="absolute right-0 top-0 h-full w-[85%] bg-black p-5"
              initial={{ x: 100 }}
              animate={{ x: 0 }}
              exit={{ x: 100 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="mb-5 flex justify-between">
                <h3 className="text-white font-bold">القائمة</h3>
                <FaTimes onClick={() => setMenuOpen(false)} />
              </div>

              {sections.map((item) => {
                const Icon = item.icon;

                return (
                  <button
                    key={item.id}
                    onClick={() => handleScrollTo(item.id)}
                    className="w-full flex items-center gap-3 p-3 rounded-lg text-white hover:bg-white/10"
                  >
                    <Icon />
                    {item.label}
                  </button>
                );
              })}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}