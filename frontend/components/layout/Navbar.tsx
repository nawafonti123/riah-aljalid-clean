// frontend/components/layout/Navbar.tsx
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { FaBars, FaTimes, FaSun, FaMoon } from 'react-icons/fa';
import { useTheme } from 'next-themes';
import Image from 'next/image';

const navLinks = [
  { href: '/', label: 'الرئيسية' },
  { href: '#about', label: 'عن الشركة' },
  { href: '#services', label: 'الخدمات' },
  { href: '#portfolio', label: 'أعمالنا' },
  { href: '#contact', label: 'اتصل بنا' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
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

  if (!mounted) return null;

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled 
            ? 'backdrop-blur-xl bg-white/80 dark:bg-gray-900/80 border-b border-gray-200 dark:border-white/10' 
            : 'bg-transparent'
        }`}
      >
        <div className="container mx-auto px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="relative w-10 h-10 rounded-full overflow-hidden border-2 border-[#01AEBE] dark:border-[#00c6ff]">
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

          <div className="hidden md:flex gap-6 items-center">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-gray-700 dark:text-gray-200 hover:text-[#01AEBE] dark:hover:text-[#00c6ff] transition text-sm lg:text-base"
              >
                {link.label}
              </Link>
            ))}
            
            <button
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? (
                <FaSun className="text-yellow-400" />
              ) : (
                <FaMoon className="text-gray-700 dark:text-gray-200" />
              )}
            </button>
          </div>

          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? (
                <FaSun className="text-yellow-400" />
              ) : (
                <FaMoon className="text-gray-700 dark:text-gray-200" />
              )}
            </button>
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="text-gray-700 dark:text-gray-200 text-2xl focus:outline-none"
            >
              {menuOpen ? <FaTimes /> : <FaBars />}
            </button>
          </div>
        </div>
      </nav>

      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMenuOpen(false)}
              className="fixed inset-0 bg-black/50 z-40 md:hidden"
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.3 }}
              className="fixed top-0 right-0 bottom-0 w-64 bg-white dark:bg-gray-900 z-50 md:hidden shadow-xl"
            >
              <div className="p-6">
                <h2 className="text-xl font-bold mb-8 bg-gradient-to-r from-[#01AEBE] to-[#9DCC40] dark:from-[#00c6ff] dark:to-[#2C5364] bg-clip-text text-transparent">
                  رياح الجليد
                </h2>
                <nav className="flex flex-col gap-4">
                  {navLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setMenuOpen(false)}
                      className="text-gray-700 dark:text-gray-300 hover:text-[#01AEBE] dark:hover:text-[#00c6ff] transition text-lg"
                    >
                      {link.label}
                    </Link>
                  ))}
                </nav>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
