'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
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
import Image from 'next/image';
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
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : 'unset';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [menuOpen]);

  if (!mounted) return null;

  return (
    <>
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="fixed top-0 left-0 right-0 z-50 px-4 pt-4"
      >
        <div
          className={`mx-auto max-w-7xl rounded-[24px] border transition-all duration-300 ${
            scrolled
              ? 'bg-[#061225]/85 backdrop-blur-xl border-cyan-400/15 shadow-[0_10px_35px_rgba(0,0,0,0.25)]'
              : 'bg-[#061225]/70 backdrop-blur-xl border-cyan-400/10'
          }`}
        >
          <div className="flex items-center justify-between px-5 py-4">
            <Link href="/" className="flex items-center gap-3 shrink-0">
              <div className="relative w-12 h-12 rounded-2xl overflow-hidden bg-white/95 border border-cyan-400/20">
                <Image
                  src="/logo.png"
                  alt="رياح الجليد"
                  fill
                  className="object-contain p-1.5"
                  priority
                />
              </div>

              <div className="text-right leading-tight">
                <div className="text-white font-extrabold text-xl">رياح الجليد</div>
                <div className="text-cyan-300 text-sm">تكييف • تبريد • دكت</div>
              </div>
            </Link>

            <nav className="hidden lg:flex items-center gap-3">
              {navLinks.map((link) => {
                const Icon = link.icon;
                const active = pathname === link.href;

                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`flex items-center gap-2 px-5 py-3 rounded-full font-bold transition-all duration-300 ${
                      active
                        ? 'bg-[#01AEBE] text-white shadow-[0_8px_25px_rgba(1,174,190,0.35)]'
                        : 'text-white/90 hover:bg-white/8 hover:text-cyan-300'
                    }`}
                  >
                    <Icon className="text-sm" />
                    <span>{link.label}</span>
                  </Link>
                );
              })}
            </nav>

            <div className="hidden lg:flex items-center gap-3">
              <a
                href="tel:+966565247407"
                className="flex items-center gap-2 px-6 py-3 rounded-full bg-[#01AEBE] text-white font-extrabold shadow-[0_8px_25px_rgba(1,174,190,0.35)] hover:scale-[1.02] transition"
              >
                <FaPhoneAlt />
                اطلب الخدمة الآن
              </a>

              <button
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                className="w-11 h-11 rounded-full flex items-center justify-center bg-white/8 text-white hover:bg-white/12 transition"
                aria-label="تبديل الوضع"
              >
                {theme === 'dark' ? <FaSun /> : <FaMoon />}
              </button>
            </div>

            <div className="flex lg:hidden items-center gap-2">
              <button
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                className="w-10 h-10 rounded-full flex items-center justify-center bg-white/8 text-white"
                aria-label="تبديل الوضع"
              >
                {theme === 'dark' ? <FaSun /> : <FaMoon />}
              </button>

              <button
                onClick={() => setMenuOpen(true)}
                className="w-10 h-10 rounded-full flex items-center justify-center bg-[#01AEBE] text-white"
                aria-label="فتح القائمة"
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
            className="fixed inset-0 z-[60] bg-black/55 backdrop-blur-sm lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setMenuOpen(false)}
          >
            <motion.div
              initial={{ x: 80, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 80, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="mr-auto h-full w-full max-w-sm bg-[#071223] border-l border-cyan-400/15 p-5"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="mb-6 flex items-center justify-between">
                <h3 className="text-white text-xl font-extrabold">القائمة</h3>

                <button
                  onClick={() => setMenuOpen(false)}
                  className="w-10 h-10 rounded-full flex items-center justify-center bg-white/8 text-white"
                  aria-label="إغلاق القائمة"
                >
                  <FaTimes />
                </button>
              </div>

              <div className="space-y-3">
                {navLinks.map((link) => {
                  const Icon = link.icon;
                  const active = pathname === link.href;

                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setMenuOpen(false)}
                      className={`w-full flex items-center gap-3 p-4 rounded-2xl transition ${
                        active
                          ? 'bg-[#01AEBE] text-white'
                          : 'bg-white/5 text-white/90 hover:bg-white/10'
                      }`}
                    >
                      <Icon />
                      <span className="font-bold">{link.label}</span>
                    </Link>
                  );
                })}
              </div>

              <a
                href="tel:+966565247407"
                className="mt-6 flex items-center justify-center gap-2 p-4 rounded-2xl bg-[#01AEBE] text-white font-extrabold"
              >
                <FaPhoneAlt />
                اطلب الخدمة الآن
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}