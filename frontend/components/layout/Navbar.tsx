'use client';

import { useEffect, useState } from 'react';
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

const navLinks = [
  { href: '/', label: 'الرئيسية', icon: FaHome, section: 'hero' },
  { href: '#about', label: 'عن الشركة', icon: FaInfoCircle, section: 'about' },
  { href: '#services', label: 'الخدمات', icon: FaWrench, section: 'services' },
  { href: '#portfolio', label: 'أعمالنا', icon: FaImages, section: 'portfolio' },
  { href: '#contact', label: 'اتصل بنا', icon: FaEnvelope, section: 'contact' },
];

export default function Navbar() {
  const [mounted, setMounted] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const { theme, setTheme } = useTheme();

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 15);

      for (const item of navLinks) {
        const element = document.getElementById(item.section);
        if (!element) continue;

        const rect = element.getBoundingClientRect();
        if (rect.top <= 120 && rect.bottom >= 120) {
          setActiveSection(item.section);
          break;
        }
      }
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  const scrollToSection = (sectionId: string) => {
    setMenuOpen(false);
    const element = document.getElementById(sectionId);
    if (element) element.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  if (!mounted) return null;

  return (
    <>
      <motion.header
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
          scrolled ? 'py-3' : 'py-5'
        }`}
      >
        <div className="container-main">
          <div
            className={`mx-auto flex items-center justify-between rounded-2xl border px-4 sm:px-5 py-3 transition-all duration-300 ${
              scrolled
                ? 'border-white/20 bg-white/80 shadow-xl backdrop-blur-xl dark:border-white/10 dark:bg-slate-950/70'
                : 'border-transparent bg-white/55 backdrop-blur-md dark:bg-slate-950/35'
            }`}
          >
            <button
              onClick={() => scrollToSection('hero')}
              className="flex items-center gap-3"
              aria-label="الذهاب إلى الرئيسية"
            >
              <div className="relative h-11 w-11 overflow-hidden rounded-2xl border border-cyan-500/20 bg-white shadow-sm">
                <Image
                  src="/logo.png"
                  alt="رياح الجليد"
                  fill
                  className="object-contain p-1.5"
                  sizes="44px"
                  priority
                />
              </div>

              <div className="text-right">
                <div className="text-sm font-bold text-slate-900 dark:text-white">
                  رياح الجليد
                </div>
                <div className="text-xs text-slate-500 dark:text-slate-300">
                  تكييف • تبريد • دكت
                </div>
              </div>
            </button>

            <nav className="hidden lg:flex items-center gap-2">
              {navLinks.map((link) => {
                const Icon = link.icon;
                const active = activeSection === link.section;

                return (
                  <button
                    key={link.section}
                    onClick={() => scrollToSection(link.section)}
                    className={`flex items-center gap-2 rounded-full px-4 py-2.5 text-sm font-semibold transition ${
                      active
                        ? 'bg-cyan-600 text-white shadow-lg shadow-cyan-500/20'
                        : 'text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-white/10'
                    }`}
                  >
                    <Icon className="text-sm" />
                    {link.label}
                  </button>
                );
              })}
            </nav>

            <div className="hidden lg:flex items-center gap-2">
              <a href="#contact" onClick={() => scrollToSection('contact')} className="btn-primary">
                <FaPhoneAlt className="ml-2" />
                اطلب الخدمة الآن
              </a>

              <button
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                className="flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 transition hover:scale-105 dark:border-white/10 dark:bg-white/5 dark:text-white"
                aria-label="تبديل الوضع"
              >
                {theme === 'dark' ? <FaSun /> : <FaMoon />}
              </button>
            </div>

            <div className="flex lg:hidden items-center gap-2">
              <button
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 dark:border-white/10 dark:bg-white/5 dark:text-white"
                aria-label="تبديل الوضع"
              >
                {theme === 'dark' ? <FaSun /> : <FaMoon />}
              </button>

              <button
                onClick={() => setMenuOpen(true)}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-cyan-600 text-white shadow-lg shadow-cyan-500/20"
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
            className="fixed inset-0 z-[60] bg-slate-950/60 backdrop-blur-sm lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setMenuOpen(false)}
          >
            <motion.aside
              initial={{ x: 80, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 80, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="mr-auto flex h-full w-full max-w-sm flex-col bg-white p-5 dark:bg-slate-950"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="mb-6 flex items-center justify-between">
                <div className="text-right">
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white">القائمة</h3>
                  <p className="text-sm text-slate-500 dark:text-slate-300">
                    تنقّل بسرعة داخل الموقع
                  </p>
                </div>

                <button
                  onClick={() => setMenuOpen(false)}
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 text-slate-700 dark:bg-white/10 dark:text-white"
                  aria-label="إغلاق القائمة"
                >
                  <FaTimes />
                </button>
              </div>

              <div className="space-y-2">
                {navLinks.map((link) => {
                  const Icon = link.icon;
                  const active = activeSection === link.section;

                  return (
                    <button
                      key={link.section}
                      onClick={() => scrollToSection(link.section)}
                      className={`flex w-full items-center gap-3 rounded-2xl px-4 py-4 text-right transition ${
                        active
                          ? 'bg-cyan-600 text-white'
                          : 'bg-slate-50 text-slate-800 hover:bg-slate-100 dark:bg-white/5 dark:text-white dark:hover:bg-white/10'
                      }`}
                    >
                      <Icon />
                      <span className="font-semibold">{link.label}</span>
                    </button>
                  );
                })}
              </div>

              <div className="mt-auto pt-6">
                <a
                  href="tel:+966565247407"
                  className="flex w-full items-center justify-center gap-2 rounded-2xl bg-cyan-600 px-4 py-4 font-bold text-white shadow-lg shadow-cyan-500/20"
                >
                  <FaPhoneAlt />
                  اتصال مباشر
                </a>
              </div>
            </motion.aside>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}