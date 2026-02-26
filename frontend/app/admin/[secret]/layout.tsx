// frontend/app/admin/[secret]/layout.tsx
'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { redirect, usePathname, useParams } from 'next/navigation';
import Link from 'next/link';
import { FaHome, FaProjectDiagram, FaCog, FaBars, FaTimes, FaSnowflake } from 'react-icons/fa';
import { motion } from 'framer-motion';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const params = useParams();
  const secret = params.secret as string;
  const { data: session, status } = useSession();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  if (pathname === `/admin/${secret}/login`) {
    return <>{children}</>;
  }

  if (status === 'loading') return <p className="text-center text-white py-10">جاري التحميل...</p>;
  if (!session) redirect(`/admin/${secret}/login`);

  // روابط التنقل مع تحسين شروط النشاط
  const navItems = [
    {
      href: `/admin/${secret}/dashboard`,
      label: 'الرئيسية',
      icon: FaHome,
      isActive: pathname === `/admin/${secret}/dashboard`, // exact match فقط
    },
    {
      href: `/admin/${secret}/dashboard/projects`,
      label: 'المشاريع',
      icon: FaProjectDiagram,
      isActive: pathname.startsWith(`/admin/${secret}/dashboard/projects`),
    },
    {
      href: `/admin/${secret}/dashboard/settings`,
      label: 'الإعدادات',
      icon: FaCog,
      isActive: pathname.startsWith(`/admin/${secret}/dashboard/settings`),
    },
  ];

  // تخطيط الهاتف
  if (isMobile) {
    return (
      <div className="min-h-screen bg-gray-900 pb-16">
        {/* شريط علوي */}
        <div className="fixed top-0 left-0 right-0 bg-gray-800/90 backdrop-blur-md z-50 px-4 py-3 flex items-center justify-between border-b border-white/10">
          <h2 className="text-white text-lg font-bold">لوحة التحكم</h2>
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="text-white text-2xl focus:outline-none p-2 hover:bg-white/10 rounded-lg transition"
          >
            {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        {/* قائمة جانبية منسدلة للهاتف - بتصميم محسن */}
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 z-40"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25 }}
              className="absolute top-0 right-0 bottom-0 w-72 bg-gradient-to-b from-gray-900 to-gray-800 p-6 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center gap-3 mb-8 border-b border-white/10 pb-4">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center">
                  <FaSnowflake className="text-white text-xl" />
                </div>
                <h2 className="text-white text-xl font-bold">لوحة التحكم</h2>
              </div>
              <nav className="space-y-2">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={`flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-200 ${
                        item.isActive
                          ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-500/20'
                          : 'text-gray-300 hover:bg-white/10 hover:text-white'
                      }`}
                    >
                      <Icon className="text-xl" />
                      <span className="font-medium">{item.label}</span>
                      {item.isActive && (
                        <motion.div
                          layoutId="activeIndicator"
                          className="mr-auto w-1.5 h-6 bg-white rounded-full"
                        />
                      )}
                    </Link>
                  );
                })}
              </nav>
              {/* معلومات المستخدم في القائمة الجانبية للهاتف (مع truncate) */}
              <div className="absolute bottom-6 left-6 right-6">
                <div className="p-2 bg-white/5 rounded-lg border border-white/10">
                  <p className="text-xs text-gray-400">مرحباً بك</p>
                  <p 
                    className="text-xs text-white font-medium truncate max-w-full" 
                    title={session.user?.email}
                  >
                    {session.user?.email}
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}

        {/* المحتوى الرئيسي */}
        <main className="pt-16">{children}</main>

        {/* شريط سفلي محسن للتنقل السريع */}
        <div className="fixed bottom-0 left-0 right-0 bg-gray-800/90 backdrop-blur-md border-t border-white/10 z-40">
          <nav className="flex justify-around items-center h-16">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex flex-col items-center justify-center flex-1 h-full transition-all ${
                    item.isActive
                      ? 'text-[#00c6ff]'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  <Icon className={`text-xl ${item.isActive ? 'scale-110' : ''}`} />
                  <span className="text-xs mt-1 font-medium">{item.label}</span>
                  {item.isActive && (
                    <motion.div
                      layoutId="bottomIndicator"
                      className="w-1 h-1 bg-[#00c6ff] rounded-full mt-0.5"
                    />
                  )}
                </Link>
              );
            })}
          </nav>
        </div>
      </div>
    );
  }

  // تخطيط سطح المكتب مع شريط جانبي محسن
  return (
    <div className="flex min-h-screen bg-gray-900">
      {/* شريط جانبي بتحسينات بصرية */}
      <motion.aside
        initial={{ x: -20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="w-72 bg-gradient-to-b from-gray-900 to-gray-800 p-6 shadow-2xl border-l border-white/5 relative"
      >
        <div className="flex items-center gap-3 mb-8 border-b border-white/10 pb-4">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center shadow-lg">
            <FaSnowflake className="text-white text-2xl" />
          </div>
          <h2 className="text-white text-2xl font-bold">لوحة التحكم</h2>
        </div>

        <nav className="space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`relative flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-200 group ${
                  item.isActive
                    ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-500/20'
                    : 'text-gray-300 hover:bg-white/5 hover:text-white'
                }`}
              >
                <Icon className={`text-xl ${item.isActive ? 'scale-110' : ''}`} />
                <span className="font-medium">{item.label}</span>
                {item.isActive && (
                  <motion.div
                    layoutId="desktopActiveIndicator"
                    className="absolute right-0 w-1.5 h-8 bg-white rounded-full"
                  />
                )}
                {!item.isActive && (
                  <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity bg-white/5" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* معلومات المستخدم في الشريط الجانبي (مع truncate) */}
        <div className="absolute bottom-6 left-6 right-6">
          <div className="p-3 bg-white/5 rounded-xl border border-white/10">
            <p className="text-xs text-gray-400">مرحباً بك</p>
            <p 
              className="text-sm text-white font-medium truncate max-w-full" 
              title={session.user?.email}
            >
              {session.user?.email}
            </p>
          </div>
        </div>
      </motion.aside>

      <main className="flex-1 p-8 overflow-y-auto">{children}</main>
    </div>
  );
}