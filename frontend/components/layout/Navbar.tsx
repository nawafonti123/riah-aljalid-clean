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
import { usePathname, useRouter } from 'next/navigation';

const navLinks = [
  { id: 'home', label: 'الرئيسية', icon: FaHome },
  { id: 'about', label: 'عن الشركة', icon: FaInfoCircle },
  { id: 'services', label: 'الخدمات', icon: FaWrench },
  { id: 'portfolio', label: 'أعمالنا', icon: FaImages },
  { id: 'contact', label: 'اتصل بنا', icon: FaEnvelope },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  const { theme, setTheme } = useTheme();
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => setMounted(true), []);

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

  // ⭐️ سكروول ذكي
  const handleScroll = (id: string) => {
    setMenuOpen(false);

    if (pathname !== '/') {
      router.push('/#' + id);
      return;
    }

    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

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
                ? 'border-black/10 bg-white/90 dark:border-white/10 dark:bg-[#08141f]/90'
                : 'border-black/5 bg-white/70 dark:border-white/10 dark:bg-[#08141f]/70'
            }`}
          >
            {/* LOGO */}
            <button
              onClick={() => handleScroll('home')}
              className="flex items-center gap-3"
            >
              <div className="relative h-11 w-11 overflow-hidden rounded-2xl bg-white dark:bg-white/10">
                <Image
                  src="/logo.png"
                  alt="logo"
                  fill
                  className="object-contain p-1.5"
                />
              </div>

              <div className="text-sm font-bold text-slate-900 dark:text-white">
                رياح الجليد
              </div>
            </button>

            {/* DESKTOP */}
            <nav className="hidden lg:flex items-center gap-2">
              {navLinks.map((link) => {
                const Icon = link.icon;

                return (
                  <button
                    key={link.id}
                    onClick={() => handleScroll(link.id)}
                    className="flex items-center gap-2 px-4 py-2 rounded-2xl text-sm font-bold text-slate-700 hover:bg-slate-100 dark:text-white/80 dark:hover:bg-white/10 transition"
                  >
                    <Icon />
                    {link.label}
                  </button>
                );
              })}
            </nav>

            {/* RIGHT */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                className="h-10 w-10 flex items-center justify-center rounded-2xl bg-slate-100 dark:bg-white/10"
              >
                {theme === 'dark' ? <FaSun /> : <FaMoon />}
              </button>

              <button
                onClick={() => setMenuOpen(true)}
                className="h-10 w-10 flex items-center justify-center rounded-2xl bg-cyan-500 text-white lg:hidden"
              >
                <FaBars />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* SPACE */}
      <div className="h-[88px]" />

      {/* MOBILE MENU */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed inset-0 bg-black/50 z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setMenuOpen(false)}
          >
            <motion.div
              className="absolute right-0 top-0 h-full w-[80%] bg-[#08131d] p-4 text-white"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between mb-5">
                <div className="font-bold">القائمة</div>
                <button onClick={() => setMenuOpen(false)}>
                  <FaTimes />
                </button>
              </div>

              {navLinks.map((link) => {
                const Icon = link.icon;

                return (
                  <button
                    key={link.id}
                    onClick={() => handleScroll(link.id)}
                    className="flex items-center gap-3 w-full py-4 px-3 rounded-xl hover:bg-white/10 transition"
                  >
                    <Icon />
                    {link.label}
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