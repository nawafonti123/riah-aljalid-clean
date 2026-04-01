'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { FaArrowDown, FaPhoneAlt, FaWhatsapp, FaSnowflake } from 'react-icons/fa';
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
    <section
      id="hero"
      className="relative isolate overflow-hidden pt-32 sm:pt-36 lg:pt-40"
    >
      <div className="hero-orb right-[-80px] top-10 h-72 w-72 bg-cyan-400/40" />
      <div className="hero-orb left-[-120px] bottom-0 h-80 w-80 bg-sky-400/30" />

      <div className="container-main">
        <div className="grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="text-center lg:text-right">
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55 }}
              className="mb-5 inline-flex items-center gap-2 rounded-full border border-cyan-200 bg-cyan-50 px-4 py-2 text-sm font-bold text-cyan-700 dark:border-cyan-400/20 dark:bg-cyan-400/10 dark:text-cyan-300"
            >
              <FaSnowflake />
              خدمات تكييف احترافية في الرياض
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.05 }}
              className="text-4xl font-extrabold leading-tight text-slate-900 sm:text-5xl lg:text-6xl dark:text-white"
            >
              رياح الجليد
              <span className="mt-2 block text-cyan-600 dark:text-cyan-400">
                لأعمال التكييف والتبريد
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.12 }}
              className="mx-auto mt-6 max-w-2xl text-base leading-8 text-slate-600 sm:text-lg lg:mx-0 dark:text-slate-300"
            >
              نقدم حلولًا متكاملة في تركيب وصيانة وتنظيف المكيفات، والتكييف المركزي،
              والدكت والتهوية للمنازل والشركات والمشاريع، مع جودة عالية وتنفيذ سريع
              وفريق متخصص.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.18 }}
              className="mt-8 flex flex-col justify-center gap-3 sm:flex-row lg:justify-start"
            >
              <a href="#contact" className="btn-primary">
                <FaPhoneAlt className="ml-2" />
                احجز الخدمة الآن
              </a>

              <a
                href="https://wa.me/966565247407"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary"
              >
                <FaWhatsapp className="ml-2 text-green-500" />
                تواصل عبر واتساب
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.24 }}
              className="mt-10 grid gap-4 sm:grid-cols-3"
            >
              {[
                { value: '15+', label: 'سنة خبرة' },
                { value: '200+', label: 'مشروع منجز' },
                { value: '100%', label: 'اهتمام برضا العميل' },
              ].map((item) => (
                <div
                  key={item.label}
                  className="soft-card rounded-3xl p-5 text-center dark:bg-white/5"
                >
                  <div className="text-2xl font-extrabold text-cyan-600 dark:text-cyan-400">
                    {item.value}
                  </div>
                  <div className="mt-1 text-sm text-slate-600 dark:text-slate-300">
                    {item.label}
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 25 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.12 }}
            className="relative"
          >
            <div className="absolute -inset-4 rounded-[2rem] bg-gradient-to-br from-cyan-500/20 to-sky-500/10 blur-2xl" />

            <div className="relative overflow-hidden rounded-[2rem] border border-white/30 bg-white/70 p-4 shadow-[0_25px_80px_rgba(14,165,233,0.12)] backdrop-blur-xl dark:border-white/10 dark:bg-white/5">
              <div className="relative aspect-[4/4.4] overflow-hidden rounded-[1.5rem] bg-slate-100 dark:bg-slate-900">
                <Image
                  src="/logo.png"
                  alt="رياح الجليد"
                  fill
                  priority
                  className="object-contain p-8"
                  sizes="(max-width: 1024px) 100vw, 40vw"
                />
              </div>

              <div className="mt-4 grid grid-cols-2 gap-3">
                <div className="rounded-2xl bg-cyan-50 p-4 dark:bg-cyan-400/10">
                  <div className="text-sm font-bold text-slate-900 dark:text-white">
                    تركيب وصيانة
                  </div>
                  <div className="mt-1 text-xs text-slate-600 dark:text-slate-300">
                    حلول احترافية للمنازل والمشاريع
                  </div>
                </div>

                <div className="rounded-2xl bg-slate-100 p-4 dark:bg-white/5">
                  <div className="text-sm font-bold text-slate-900 dark:text-white">
                    سرعة في التنفيذ
                  </div>
                  <div className="mt-1 text-xs text-slate-600 dark:text-slate-300">
                    مواعيد دقيقة وخدمة منظمة
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        <div className="mt-10 flex justify-center pb-10">
          <button
            onClick={scrollToAbout}
            className="group flex flex-col items-center text-slate-500 transition hover:text-cyan-600 dark:text-slate-300 dark:hover:text-cyan-400"
            aria-label="النزول للأسفل"
          >
            <span className="mb-2 text-sm font-medium">اكتشف المزيد</span>
            <span className="flex h-11 w-11 items-center justify-center rounded-full border border-slate-300 bg-white shadow-sm transition group-hover:-translate-y-1 dark:border-white/10 dark:bg-white/5">
              <FaArrowDown />
            </span>
          </button>
        </div>
      </div>
    </section>
  );
}