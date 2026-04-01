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

type NavItem = {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  page: string;
};

const sections: NavItem[] = [
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

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 18);

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
    const current = sections.find((item) => item.page === pathname);
    return current?.id ?? '';
  }, [activeSection, isHome, pathname]);

  const handleNavigate = (item: NavItem) => {
    setMenuOpen(false);

    if (isHome) {
      if (item.id === 'hero') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      }

      const section = document.getElementById(item.id);
      if (section) {
        section.scrollIntoView({ behavior: 'smooth', block: 'start' });
        return;
      }
    }

    router.push(item.page);
  };

  if (!mounted) return null;

  return (
    <>
      <header
        className={`site-header ${scrolled ? 'site-header-scrolled' : ''}`}
      >
        <div className="container">
          <div className="navbar-shell">
            <button
              type="button"
              onClick={() => handleNavigate(sections[0])}
              className="brand-button"
              aria-label="العودة للرئيسية"
            >
              <div className="brand-logo-wrap">
                <Image
                  src="/logo.png"
                  alt="رياح الجليد"
                  width={54}
                  height={54}
                  className="brand-logo"
                  priority
                />
              </div>

              <div className="brand-copy">
                <span className="brand-title">رياح الجليد</span>
                <span className="brand-subtitle">تكييف • تبريد • دكت</span>
              </div>
            </button>

            <nav className="desktop-nav" aria-label="التنقل الرئيسي">
              {sections.map((item) => {
                const Icon = item.icon;
                const active = activePath === item.id;

                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => handleNavigate(item)}
                    className={`nav-pill ${active ? 'nav-pill-active' : ''}`}
                  >
                    <Icon className="text-sm" />
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </nav>

            <div className="nav-actions">
              <Link href="/contact" className="cta-button desktop-only">
                <FaPhoneAlt />
                <span>اطلب الخدمة الآن</span>
              </Link>

              <button
                type="button"
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                className="icon-button desktop-only"
                aria-label="تغيير الثيم"
              >
                {theme === 'dark' ? <FaSun /> : <FaMoon />}
              </button>

              <button
                type="button"
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                className="icon-button mobile-only"
                aria-label="تغيير الثيم"
              >
                {theme === 'dark' ? <FaSun /> : <FaMoon />}
              </button>

              <button
                type="button"
                onClick={() => setMenuOpen(true)}
                className="menu-button mobile-only"
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
            className="mobile-menu-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setMenuOpen(false)}
          >
            <motion.div
              className="mobile-menu-panel"
              initial={{ opacity: 0, y: 24, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.98 }}
              transition={{ duration: 0.22 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="mobile-menu-header">
                <div>
                  <h3 className="mobile-menu-title">القائمة</h3>
                  <p className="mobile-menu-subtitle">
                    تنقل سريع ومنظم داخل الموقع
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => setMenuOpen(false)}
                  className="icon-button"
                  aria-label="إغلاق القائمة"
                >
                  <FaTimes />
                </button>
              </div>

              <div className="mobile-menu-links">
                {sections.map((item) => {
                  const Icon = item.icon;
                  const active = activePath === item.id;

                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => handleNavigate(item)}
                      className={`mobile-nav-item ${
                        active ? 'mobile-nav-item-active' : ''
                      }`}
                    >
                      <div className="mobile-nav-icon">
                        <Icon />
                      </div>
                      <span>{item.label}</span>
                    </button>
                  );
                })}
              </div>

              <Link
                href="/contact"
                className="cta-button mobile-cta"
                onClick={() => setMenuOpen(false)}
              >
                <FaPhoneAlt />
                <span>اطلب الخدمة الآن</span>
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}