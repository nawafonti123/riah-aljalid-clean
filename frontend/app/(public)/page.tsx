// frontend/app/(public)/page.tsx
'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { FaArrowDown, FaPhoneAlt, FaSnowflake, FaWhatsapp } from 'react-icons/fa';
import { useTheme } from 'next-themes';

export default function Hero() {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const scrollToAbout = () => {
    const aboutSection = document.getElementById('about');
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  if (!mounted) return null;

  return (
    <main className="page-shell">
      <section className="section-container section-padding pt-6 sm:pt-10 lg:pt-14">
        <div className="grid items-center gap-6 lg:grid-cols-[1.1fr_0.9fr] lg:gap-10">
          <motion.div
            initial={{ opacity: 0, y: 26 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65 }}
            className="order-2 lg:order-1"
          >
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-cyan-500/20 bg-cyan-500/10 px-4 py-2 text-xs font-bold text-cyan-700 dark:text-cyan-300 sm:text-sm">
              <FaSnowflake />
              خدمات تكييف احترافية في الرياض
            </div>

            <h1 className="text-balance text-3xl font-extrabold leading-tight text-slate-900 dark:text-white sm:text-4xl lg:text-6xl">
              <span className="heading-gradient">رياح الجليد</span>
              <br />
              لأعمال التكييف والتبريد
            </h1>

            <p className="mt-4 max-w-2xl text-sm leading-8 text-slate-600 dark:text-white/75 sm:text-base lg:text-lg">
              نقدم حلولًا متكاملة في تركيب وصيانة وتنظيف المكيفات، والتكييف
              المركزي، والدكت والتهوية للمنازل والشركات والمشاريع، مع جودة عالية
              وتنفيذ سريع وفريق متخصص.
            </p>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <a
                href="https://wa.me/966565247407"
                target="_blank"
                rel="noreferrer"
                className="btn-primary"
              >
                <FaWhatsapp />
                تواصل عبر واتساب
              </a>

              <a href="/contact" className="btn-secondary">
                <FaPhoneAlt />
                احجز الخدمة الآن
              </a>
            </div>

            <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-3">
              {[
                { value: '15+', label: 'سنة خبرة' },
                { value: '200+', label: 'مشروع منجز' },
                { value: '100%', label: 'اهتمام برضا العميل' },
              ].map((item) => (
                <div
                  key={item.label}
                  className="surface-card p-4 text-center sm:text-right"
                >
                  <div className="text-2xl font-extrabold text-slate-900 dark:text-white">
                    {item.value}
                  </div>
                  <div className="mt-1 text-sm text-slate-500 dark:text-white/60">
                    {item.label}
                  </div>
                </div>
              ))}
            </div>

            <button
              type="button"
              onClick={scrollToAbout}
              className="mt-7 inline-flex items-center gap-2 text-sm font-bold text-cyan-600 transition hover:text-cyan-700 dark:text-cyan-300"
            >
              <FaArrowDown />
              اكتشف المزيد
            </button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 18 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="order-1 lg:order-2"
          >
            <div className="relative overflow-hidden rounded-[32px] border border-black/5 bg-gradient-to-br from-cyan-500/15 via-sky-500/10 to-emerald-400/10 p-3 shadow-[0_20px_60px_rgba(15,23,42,0.12)] dark:border-white/10 dark:from-cyan-500/10 dark:via-sky-500/10 dark:to-emerald-400/5">
              <div className="relative aspect-[4/4.2] overflow-hidden rounded-[26px] bg-white dark:bg-[#07111a] sm:aspect-[4/3.8]">
                <Image
                  src="/logo.png"
                  alt="رياح الجليد"
                  fill
                  priority
                  className="object-contain p-6 sm:p-8"
                />

                <div className="absolute inset-x-3 bottom-3 grid gap-3 sm:inset-x-4 sm:bottom-4">
                  <div className="glass-card p-3 sm:p-4">
                    <div className="text-sm font-extrabold text-slate-900 dark:text-white">
                      تركيب وصيانة
                    </div>
                    <div className="mt-1 text-xs leading-6 text-slate-600 dark:text-white/65 sm:text-sm">
                      حلول احترافية للمنازل والمشاريع
                    </div>
                  </div>

                  <div className="glass-card p-3 sm:p-4">
                    <div className="text-sm font-extrabold text-slate-900 dark:text-white">
                      سرعة في التنفيذ
                    </div>
                    <div className="mt-1 text-xs leading-6 text-slate-600 dark:text-white/65 sm:text-sm">
                      مواعيد دقيقة وخدمة منظمة
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}