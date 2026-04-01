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
      className="relative overflow-hidden pt-6 md:pt-10"
      aria-label="القسم الرئيسي"
    >
      <div className="container">
        <div className="relative overflow-hidden rounded-[32px] border border-white/10 bg-gradient-to-br from-cyan-500/10 via-slate-900/70 to-slate-950/90 px-5 py-10 shadow-2xl backdrop-blur-xl md:px-8 md:py-14 xl:px-12">
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute -right-20 top-0 h-72 w-72 rounded-full bg-cyan-400/15 blur-3xl" />
            <div className="absolute -left-16 bottom-0 h-72 w-72 rounded-full bg-sky-500/10 blur-3xl" />
          </div>

          <div className="relative grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr]">
            <div>
              <motion.div
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45 }}
                className="mb-5 inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-2 text-sm font-extrabold text-cyan-200"
              >
                <FaSnowflake />
                <span>حلول احترافية في التكييف والتبريد بالرياض</span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 22 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.05 }}
                className="max-w-3xl text-3xl font-black leading-[1.35] text-white md:text-5xl"
              >
                رياح الجليد
                <span className="block text-cyan-300">
                  لتركيب وصيانة أنظمة التكييف المركزي والسبليت والدكت
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, delay: 0.1 }}
                className="mt-5 max-w-2xl text-base leading-8 text-white/75 md:text-lg"
              >
                نقدم خدمات متكاملة تشمل التوريد والتركيب والصيانة والتنظيف
                والتعبئة وتنفيذ مشاريع التهوية والدكت للمنازل والشركات
                والمشاريع باحترافية عالية ولمسة تنفيذ دقيقة.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 26 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, delay: 0.15 }}
                className="mt-7 grid gap-3 sm:grid-cols-2"
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
                className="mt-8 flex flex-wrap gap-3"
              >
                <a
                  href="https://wa.me/966565247407"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-[52px] items-center justify-center gap-3 rounded-full bg-gradient-to-r from-cyan-500 to-sky-500 px-6 text-sm font-black text-white shadow-lg shadow-cyan-500/20 transition hover:-translate-y-0.5"
                >
                  <FaWhatsapp className="text-base" />
                  <span>تواصل واتساب</span>
                </a>

                <a
                  href="tel:+966565247407"
                  className="inline-flex min-h-[52px] items-center justify-center gap-3 rounded-full border border-white/15 bg-white/5 px-6 text-sm font-black text-white transition hover:bg-white/10"
                >
                  <FaPhoneAlt className="text-sm" />
                  <span>اتصل الآن</span>
                </a>

                <Link
                  href="/portfolio"
                  className="inline-flex min-h-[52px] items-center justify-center gap-3 rounded-full border border-cyan-400/20 bg-cyan-400/10 px-6 text-sm font-black text-cyan-200 transition hover:bg-cyan-400/15"
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
                <div className="rounded-[28px] border border-cyan-400/15 bg-white/5 p-5 backdrop-blur-md">
                  <div className="mb-4 flex items-center gap-3">
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-cyan-500/15 text-cyan-300">
                      <FaFan className="text-2xl" />
                    </div>
                    <div>
                      <h3 className="text-lg font-black text-white">
                        أنظمة تكييف متطورة
                      </h3>
                      <p className="mt-1 text-sm text-white/65">
                        تنفيذ احترافي للمنازل والشركات والمشاريع
                      </p>
                    </div>
                  </div>

                  <div className="grid gap-3 sm:grid-cols-2">
                    {stats.map((item) => (
                      <div
                        key={item.label}
                        className="rounded-2xl border border-white/10 bg-slate-950/35 px-4 py-4"
                      >
                        <div className="text-2xl font-black text-cyan-300">
                          {item.value}
                        </div>
                        <div className="mt-1 text-sm font-bold text-white/75">
                          {item.label}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="rounded-[24px] border border-white/10 bg-white/5 p-5">
                    <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-cyan-500/15 text-cyan-300">
                      <FaTools />
                    </div>
                    <h4 className="text-base font-black text-white">
                      صيانة دقيقة
                    </h4>
                    <p className="mt-2 text-sm leading-7 text-white/70">
                      فحص وتشخيص وحلول عملية لرفع كفاءة التبريد وتقليل الأعطال.
                    </p>
                  </div>

                  <div className="rounded-[24px] border border-white/10 bg-white/5 p-5">
                    <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-cyan-500/15 text-cyan-300">
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

          <div className="mt-8 flex justify-center md:mt-10">
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