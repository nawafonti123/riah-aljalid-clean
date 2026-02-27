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
            ? 'backdrop-blur-xl bg-white/90 dark:bg-gray-900/90 border-b border-gray-200 dark:border-gray-800 shadow-lg' 
            : 'bg-transparent'
        }`}
      >
        <div className="container mx-auto px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 group" onClick={() => scrollToSection('hero')}>
            <div className="relative w-10 h-10 rounded-full overflow-hidden border-2 border-[#01AEBE] dark:border-[#00c6ff] group-hover:scale-110 transition-transform duration-300">
              <Image
                src="/logo.png"
                alt="رياح الجليد"
                width={40}
                height={40}
                className="object-cover"
              />
            </div>
            <span className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-[#01AEBE] to-[#9DCC40] dark:from-[#00c6ff] dark:to-[#2C5364] bg-clip-text text-transparent">
              رياح الجليد
            </span>
          </Link>

          {/* روابط سطح المكتب */}
          <div className="hidden md:flex gap-1 items-center">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = activeSection === link.section;
              return (
                <button
                  key={link.href}
                  onClick={() => scrollToSection(link.section)}
                  className={`relative px-4 py-2 rounded-lg flex items-center gap-2 transition-all duration-300 group ${
                    isActive
                      ? 'text-[#01AEBE] dark:text-[#00c6ff]'
                      : 'text-gray-700 dark:text-gray-200 hover:text-[#01AEBE] dark:hover:text-[#00c6ff]'
                  }`}
                >
                  <Icon className={`text-lg transition-transform duration-300 group-hover:scale-110 ${
                    isActive ? 'scale-110' : ''
                  }`} />
                  <span className="text-sm lg:text-base font-medium">{link.label}</span>
                  {isActive && (
                    <motion.div
                      layoutId="activeSection"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-[#01AEBE] to-[#9DCC40] dark:from-[#00c6ff] dark:to-[#2C5364]"
                      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                    />
                  )}
                </button>
              );
            })}
            
            <button
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="mr-2 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? (
                <FaSun className="text-yellow-400 text-xl" />
              ) : (
                <FaMoon className="text-gray-700 text-xl" />
              )}
            </button>
          </div>

          {/* زر القائمة للجوال */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? (
                <FaSun className="text-yellow-400 text-xl" />
              ) : (
                <FaMoon className="text-gray-700 dark:text-gray-200 text-xl" />
              )}
            </button>
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="text-gray-700 dark:text-gray-200 text-2xl focus:outline-none p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition"
            >
              {menuOpen ? <FaTimes /> : <FaBars />}
            </button>
          </div>
        </div>
      </nav>

      {/* قائمة جانبية للجوال */}
      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMenuOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden"
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25 }}
              className="fixed top-0 right-0 bottom-0 w-72 bg-white dark:bg-gray-900 z-50 md:hidden shadow-2xl"
            >
              <div className="p-6">
                <div className="flex items-center gap-3 mb-8 border-b border-gray-200 dark:border-gray-800 pb-4">
                  <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-[#01AEBE] dark:border-[#00c6ff]">
                    <Image
                      src="/logo.png"
                      alt="رياح الجليد"
                      width={48}
                      height={48}
                      className="object-cover"
                    />
                  </div>
                  <h2 className="text-xl font-bold bg-gradient-to-r from-[#01AEBE] to-[#9DCC40] dark:from-[#00c6ff] dark:to-[#2C5364] bg-clip-text text-transparent">
                    رياح الجليد
                  </h2>
                </div>
                <nav className="flex flex-col gap-2">
                  {navLinks.map((link) => {
                    const Icon = link.icon;
                    return (
                      <button
                        key={link.href}
                        onClick={() => scrollToSection(link.section)}
                        className={`flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-200 ${
                          activeSection === link.section
                            ? 'bg-gradient-to-r from-[#01AEBE] to-[#9DCC40] dark:from-[#00c6ff] dark:to-[#2C5364] text-white shadow-lg'
                            : 'text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800'
                        }`}
                      >
                        <Icon className="text-xl" />
                        <span className="font-medium">{link.label}</span>
                      </button>
                    );
                  })}
                </nav>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}