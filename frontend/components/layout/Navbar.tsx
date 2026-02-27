// frontend/components/layout/Navbar.tsx
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { FaBars, FaTimes, FaSun, FaMoon, FaHome, FaInfoCircle, FaWrench, FaImages, FaEnvelope } from 'react-icons/fa';
import { useTheme } from 'next-themes';
import Image from 'next/image';

const navLinks = [
  { href: '/', label: 'الرئيسية', icon: FaHome, section: 'hero' },
  { href: '#about', label: 'عن الشركة', icon: FaInfoCircle, section: 'about' },
  { href: '#services', label: 'الخدمات', icon: FaWrench, section: 'services' },
  { href: '#portfolio', label: 'أعمالنا', icon: FaImages, section: 'portfolio' },
  { href: '#contact', label: 'اتصل بنا', icon: FaEnvelope, section: 'contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      // تحديد القسم النشط بناءً على موضع التمرير
      const sections = navLinks.map(link => link.section);
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom >= 100) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [menuOpen]);

  const scrollToSection = (sectionId: string) => {
    setMenuOpen(false);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  if (!mounted) return null;

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'backdrop-blur-xl bg-white/90 dark:bg-[#0F2027]/90 shadow-lg py-2'
            : 'bg-transparent py-4'
        }`}
      >
        <div className="container mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2 group" onClick={() => scrollToSection('hero')}>
              <div className="relative w-10 h-10 rounded-full overflow-hidden border-2 border-[#01AEBE] dark:border-[#00c6ff] group-hover:scale-110 transition-transform duration-300 bg-white/70 dark:bg-white/5">
                <Image
                  src="/logo.png"
                  alt="رياح الجليد"
                  fill
                  sizes="40px"
                  className="object-contain p-1"
                />
              </div>
              <span className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-[#01AEBE] to-[#9DCC40] dark:from-[#00c6ff] dark:to-[#2C5364] bg-clip-text text-transparent">
                رياح الجليد
              </span>
            </Link>

            <div className="hidden md:flex items-center gap-2">
              {navLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <button
                    key={link.section}
                    onClick={() => scrollToSection(link.section)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-300 ${
                      activeSection === link.section
                        ? 'bg-[#01AEBE] dark:bg-[#00c6ff] text-white shadow-md'
                        : 'text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-white/10'
                    }`}
                  >
                    <Icon className="text-sm" />
                    <span className="text-sm font-medium">{link.label}</span>
                  </button>
                );
              })}

              <button
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                className="ml-2 w-10 h-10 rounded-full flex items-center justify-center bg-gray-100 dark:bg-white/10 hover:scale-110 transition-transform duration-300"
              >
                {theme === 'dark' ? <FaSun className="text-yellow-300" /> : <FaMoon className="text-gray-700" />}
              </button>
            </div>

            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden w-10 h-10 rounded-full flex items-center justify-center bg-gray-100 dark:bg-white/10"
            >
              {menuOpen ? <FaTimes /> : <FaBars />}
            </button>
          </div>
        </div>
      </nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm md:hidden"
            onClick={() => setMenuOpen(false)}
          >
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25 }}
              className="absolute top-0 right-0 h-full w-80 bg-white dark:bg-[#0F2027] p-6"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-2">
                  <FaImages className="text-[#01AEBE] dark:text-[#00c6ff]" />
                  <span className="font-bold text-gray-900 dark:text-white">القائمة</span>
                </div>
                <button onClick={() => setMenuOpen(false)} className="text-gray-600 dark:text-gray-300">
                  <FaTimes />
                </button>
              </div>

              <div className="space-y-3">
                {navLinks.map((link) => {
                  const Icon = link.icon;
                  return (
                    <button
                      key={link.section}
                      onClick={() => scrollToSection(link.section)}
                      className="w-full flex items-center gap-3 p-4 rounded-xl text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-white/10 transition"
                    >
                      <Icon />
                      <span className="font-medium">{link.label}</span>
                    </button>
                  );
                })}
              </div>

              <div className="mt-6">
                <button
                  onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                  className="w-full flex items-center justify-center gap-2 p-4 rounded-xl bg-gray-100 dark:bg-white/10 text-gray-700 dark:text-gray-200"
                >
                  {theme === 'dark' ? <FaSun className="text-yellow-300" /> : <FaMoon />}
                  <span>{theme === 'dark' ? 'الوضع الفاتح' : 'الوضع الداكن'}</span>
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}