'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  FaSnowflake,
  FaPhoneAlt,
  FaWhatsapp,
  FaCheckCircle,
  FaArrowDown,
  FaTools,
  FaFan,
  FaWind,
} from 'react-icons/fa';

const stats = [
  { value: '+15', label: 'سنة خبرة' },
  { value: '+200', label: 'مشروع منجز' },
  { value: '+50', label: 'فني ومختص' },
  { value: '24/7', label: 'دعم وخدمة' },
];

const features = [
  'تركيب وصيانة جميع أنواع المكيفات',
  'تنفيذ مشاريع التكييف المركزي والدكت',
  'فريق احترافي وسرعة في الإنجاز',
];

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative overflow-hidden pt-2 md:pt-10"
      aria-label="القسم الرئيسي"
    >
      <div className="container">
        <div className="relative overflow-hidden rounded-[24px] border border-white/10 bg-gradient-to-br from-cyan-500/10 via-slate-900/70 to-slate-950/90 px-4 py-6 shadow-2xl backdrop-blur-xl sm:px-5 sm:py-8 md:rounded-[32px] md:px-8 md:py-14 xl:px-12">
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute -right-20 top-0 h-72 w-72 rounded-full bg-cyan-400/15 blur-3xl" />
            <div className="absolute -left-16 bottom-0 h-72 w-72 rounded-full bg-sky-500/10 blur-3xl" />
          </div>

          <div className="relative grid items-center gap-7 lg:grid-cols-[1.1fr_0.9fr] lg:gap-10">
            <div className="min-w-0">
              <motion.div
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45 }}
                className="mb-4 inline-flex max-w-full items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/10 px-3 py-2 text-[11px] font-extrabold text-cyan-200 sm:px-4 sm:text-sm"
              >
                <FaSnowflake className="shrink-0" />
                <span className="truncate">
                  حلول احترافية في التكييف والتبريد بالرياض
                </span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 22 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.05 }}
                className="max-w-3xl text-[2.05rem] font-black leading-[1.22] text-white sm:text-[2.5rem] md:text-5xl"
              >
                رياح الجليد
                <span className="mt-1 block text-cyan-300 sm:mt-2">
                  لتركيب وصيانة أنظمة التكييف المركزي والسبليت والدكت
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, delay: 0.1 }}
                className="mt-4 max-w-2xl text-[0.98rem] leading-8 text-white/75 md:mt-5 md:text-lg"
              >
                نقدم خدمات متكاملة تشمل التوريد والتركيب والصيانة والتنظيف
                والتعبئة وتنفيذ مشاريع التهوية والدكت للمنازل والشركات
                والمشاريع باحترافية عالية ولمسة تنفيذ دقيقة.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 26 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, delay: 0.15 }}
                className="mt-6 grid gap-3 sm:grid-cols-2"
              >
                {features.map((item) => (
                  <div
                    key={item}
                    className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-bold text-white/85"
                  >
                    <FaCheckCircle className="mt-1 shrink-0 text-cyan-300" />
                    <span>{item}</span>
                  </div>
                ))}
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 28 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, delay: 0.2 }}
                className="mt-6 flex flex-col gap-3 sm:mt-8 sm:flex-row sm:flex-wrap"
              >
                <a
                  href="https://wa.me/966565247407"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-[50px] items-center justify-center gap-3 rounded-full bg-gradient-to-r from-cyan-500 to-sky-500 px-6 text-sm font-black text-white shadow-lg shadow-cyan-500/20 transition hover:-translate-y-0.5"
                >
                  <FaWhatsapp className="text-base" />
                  <span>تواصل واتساب</span>
                </a>

                <a
                  href="tel:+966565247407"
                  className="inline-flex min-h-[50px] items-center justify-center gap-3 rounded-full border border-white/15 bg-white/5 px-6 text-sm font-black text-white transition hover:bg-white/10"
                >
                  <FaPhoneAlt className="text-sm" />
                  <span>اتصل الآن</span>
                </a>

                <Link
                  href="/portfolio"
                  className="inline-flex min-h-[50px] items-center justify-center gap-3 rounded-full border border-cyan-400/20 bg-cyan-400/10 px-6 text-sm font-black text-cyan-200 transition hover:bg-cyan-400/15"
                >
                  <span>شاهد أعمالنا</span>
                </Link>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.12 }}
              className="relative"
            >
              <div className="grid gap-4">
                <div className="rounded-[24px] border border-cyan-400/15 bg-white/5 p-4 backdrop-blur-md sm:p-5 md:rounded-[28px]">
                  <div className="mb-4 flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-cyan-500/15 text-cyan-300 sm:h-14 sm:w-14">
                      <FaFan className="text-xl sm:text-2xl" />
                    </div>
                    <div className="min-w-0">
                      <h3 className="text-base font-black text-white sm:text-lg">
                        أنظمة تكييف متطورة
                      </h3>
                      <p className="mt-1 text-xs text-white/65 sm:text-sm">
                        تنفيذ احترافي للمنازل والشركات والمشاريع
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    {stats.map((item) => (
                      <div
                        key={item.label}
                        className="rounded-2xl border border-white/10 bg-slate-950/35 px-4 py-4"
                      >
                        <div className="text-xl font-black text-cyan-300 sm:text-2xl">
                          {item.value}
                        </div>
                        <div className="mt-1 text-xs font-bold text-white/75 sm:text-sm">
                          {item.label}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="rounded-[22px] border border-white/10 bg-white/5 p-5">
                    <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-2xl bg-cyan-500/15 text-cyan-300 sm:h-12 sm:w-12">
                      <FaTools />
                    </div>
                    <h4 className="text-base font-black text-white">
                      صيانة دقيقة
                    </h4>
                    <p className="mt-2 text-sm leading-7 text-white/70">
                      فحص وتشخيص وحلول عملية لرفع كفاءة التبريد وتقليل الأعطال.
                    </p>
                  </div>

                  <div className="rounded-[22px] border border-white/10 bg-white/5 p-5">
                    <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-2xl bg-cyan-500/15 text-cyan-300 sm:h-12 sm:w-12">
                      <FaWind />
                    </div>
                    <h4 className="text-base font-black text-white">
                      دكت وتهوية
                    </h4>
                    <p className="mt-2 text-sm leading-7 text-white/70">
                      تصميم وتنفيذ مجاري الهواء والدكت بمعايير دقيقة ومظهر مرتب.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          <div className="mt-6 flex justify-center md:mt-10">
            <button
              type="button"
              onClick={() => {
                const target = document.getElementById('about');
                target?.scrollIntoView({ behavior: 'smooth', block: 'start' });
              }}
              className="inline-flex items-center gap-2 text-sm font-extrabold text-cyan-200/90 transition hover:text-cyan-100"
            >
              <FaArrowDown />
              <span>اكتشف المزيد</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}