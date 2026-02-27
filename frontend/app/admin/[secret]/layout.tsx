// frontend/app/admin/[secret]/layout.tsx (تحديث لإضافة رابط الخدمات)
'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { redirect, usePathname, useParams } from 'next/navigation';
import Link from 'next/link';
import { FaHome, FaProjectDiagram, FaCog, FaBars, FaTimes, FaSnowflake, FaUsers, FaList, FaImage, FaImages, FaServicestack } from 'react-icons/fa';
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

  // روابط التنقل الرئيسية مع إضافة صفحة الخدمات
  const navItems = [
    { href: `/admin/${secret}/dashboard`, label: 'الرئيسية', icon: FaHome, isActive: pathname === `/admin/${secret}/dashboard` },
    { href: `/admin/${secret}/dashboard/projects`, label: 'المشاريع', icon: FaProjectDiagram, isActive: pathname.startsWith(`/admin/${secret}/dashboard/projects`) },
    { href: `/admin/${secret}/dashboard/services`, label: 'الخدمات', icon: FaServicestack, isActive: pathname.startsWith(`/admin/${secret}/dashboard/services`) },
    { href: `/admin/${secret}/dashboard/team`, label: 'الفريق', icon: FaUsers, isActive: pathname.startsWith(`/admin/${secret}/dashboard/team`) },
    { href: `/admin/${secret}/dashboard/service-details`, label: 'تفاصيل الخدمات', icon: FaList, isActive: pathname.startsWith(`/admin/${secret}/dashboard/service-details`) },
    { href: `/admin/${secret}/dashboard/company-images`, label: 'صور الشركة', icon: FaImage, isActive: pathname.startsWith(`/admin/${secret}/dashboard/company-images`) },
    { href: `/admin/${secret}/dashboard/images`, label: 'الصور', icon: FaImages, isActive: pathname.startsWith(`/admin/${secret}/dashboard/images`) },
    { href: `/admin/${secret}/dashboard/settings`, label: 'الإعدادات', icon: FaCog, isActive: pathname.startsWith(`/admin/${secret}/dashboard/settings`) },
  ];

  // تخطيط الهاتف (اختصاراً، نفس الكود السابق)
  if (isMobile) {
    return (
      <div className="min-h-screen bg-gray-900 pb-16">
        <div className="fixed top-0 left-0 right-0 bg-gray-800/90 backdrop-blur-md z-50 px-4 py-3 flex items-center justify-between border-b border-white/10">
          <h2 className="text-white text-lg font-bold">لوحة التحكم</h2>
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="text-white text-2xl focus:outline-none p-2 hover:bg-white/10 rounded-lg transition"
          >
            {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

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
              className="absolute top-0 right-0 h-full w-72 bg-gray-900 p-6 border-l border-white/10"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center gap-2 mb-8">
                <FaSnowflake className="text-[#00c6ff]" />
                <h2 className="text-white font-bold">لوحة التحكم</h2>
              </div>

              <nav className="space-y-2">
                {navItems.map(({ href, label, icon: Icon, isActive }) => (
                  <Link
                    key={href}
                    href={href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl transition ${
                      isActive ? 'bg-white/10 text-white' : 'text-gray-300 hover:bg-white/5'
                    }`}
                  >
                    <Icon />
                    <span className="text-sm font-medium">{label}</span>
                  </Link>
                ))}
              </nav>
            </motion.div>
          </motion.div>
        )}

        <div className="pt-20 px-4">{children}</div>
      </div>
    );
  }

  // تخطيط الديسكتوب
  return (
    <div className="min-h-screen bg-gray-900 flex">
      <aside className="w-72 bg-gray-900 border-l border-white/10 p-6 hidden md:block">
        <div className="flex items-center gap-2 mb-10">
          <FaSnowflake className="text-[#00c6ff]" />
          <h2 className="text-white font-bold text-lg">لوحة التحكم</h2>
        </div>

        <nav className="space-y-2">
          {navItems.map(({ href, label, icon: Icon, isActive }) => (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition ${
                isActive ? 'bg-white/10 text-white' : 'text-gray-300 hover:bg-white/5'
              }`}
            >
              <Icon />
              <span className="text-sm font-medium">{label}</span>
            </Link>
          ))}
        </nav>
      </aside>

      <main className="flex-1">{children}</main>
    </div>
  );
}