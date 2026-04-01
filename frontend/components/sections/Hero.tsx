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
    <section className="relative overflow-hidden px-4 pt-6 md:px-8 lg:px-12">
      <div className="mx-auto max-w-7xl">
        <div className="grid items-center gap-6 lg:grid-cols-2 lg:gap-8">
          <motion.div
            initial={{ opacity: 0, y: 35 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="order-1 lg:order-1"
          >
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-cyan-400/25 bg-cyan-400/10 px-4 py-2 text-sm font-bold text-cyan-700 dark:text-cyan-300">
              <FaSnowflake />
              حلول احترافية في التكييف والتبريد بالرياض
            </div>

            <h1 className="text-3xl font-extrabold leading-tight text-slate-900 dark:text-white md:text-5xl">
              رياح الجليد
              <span className="mt-2 block text-cyan-600 dark:text-cyan-300">
                لتركيب وصيانة أنظمة التكييف المركزي والسبليت والدكت
              </span>
            </h1>

            <p className="mt-5 max-w-2xl text-base leading-8 text-slate-600 dark:text-slate-300 md:text-lg">
              نقدم خدمات متكاملة تشمل التوريد والتركيب والصيانة والتنظيف والتعبئة
              وتنفيذ مشاريع التهوية والدكت للمنازل والشركات والمشاريع باحترافية
              عالية ولمسة تنفيذ دقيقة.
            </p>

            <div className="mt-6 space-y-3">
              {features.map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-3 text-sm font-semibold text-slate-700 dark:text-slate-200 md:text-base"
                >
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-cyan-100 text-cyan-600 dark:bg-cyan-500/15 dark:text-cyan-300">
                    <FaCheckCircle className="text-xs" />
                  </span>
                  {item}
                </div>
              ))}
            </div>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
              <Link
                href="https://wa.me/966565247407"
                target="_blank"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-emerald-500 px-6 py-3 text-sm font-extrabold text-white shadow-[0_10px_30px_rgba(16,185,129,0.35)] transition hover:scale-[1.02] hover:bg-emerald-400"
              >
                <FaWhatsapp />
                تواصل واتساب
              </Link>

              <Link
                href="tel:+966565247407"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-slate-300 bg-white px-6 py-3 text-sm font-extrabold text-slate-800 transition hover:bg-slate-50 dark:border-white/10 dark:bg-white/5 dark:text-white dark:hover:bg-white/10"
              >
                <FaPhoneAlt />
                اتصل الآن
              </Link>

              <button
                onClick={() => {
                  const target = document.getElementById('portfolio');
                  target?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }}
                className="inline-flex items-center justify-center gap-2 rounded-full border border-cyan-300 bg-cyan-50 px-6 py-3 text-sm font-extrabold text-cyan-700 transition hover:bg-cyan-100 dark:border-cyan-500/20 dark:bg-cyan-500/10 dark:text-cyan-300 dark:hover:bg-cyan-500/15"
              >
                شاهد أعمالنا
              </button>
            </div>

            <button
              onClick={() => {
                const target = document.getElementById('about');
                target?.scrollIntoView({ behavior: 'smooth', block: 'start' });
              }}
              className="mt-8 inline-flex items-center gap-2 text-sm font-extrabold text-cyan-700 transition hover:text-cyan-600 dark:text-cyan-200/90 dark:hover:text-cyan-100"
            >
              <FaArrowDown />
              اكتشف المزيد
            </button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 35 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.1 }}
            className="order-2 lg:order-2"
          >
            <div className="rounded-[32px] border border-slate-200 bg-gradient-to-br from-cyan-50 via-white to-slate-50 p-4 shadow-[0_20px_60px_rgba(15,23,42,0.08)] dark:border-white/10 dark:from-[#07121c] dark:via-[#0a1621] dark:to-[#091018] dark:shadow-[0_20px_60px_rgba(0,0,0,0.28)] sm:p-5 lg:p-6">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-3xl border border-slate-200 bg-white/90 p-4 dark:border-white/10 dark:bg-white/[0.04] sm:p-5">
                  <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-cyan-100 text-cyan-600 dark:bg-cyan-500/15 dark:text-cyan-300">
                    <FaTools className="text-2xl" />
                  </div>
                  <h3 className="text-lg font-extrabold text-slate-900 dark:text-white">
                    صيانة دقيقة
                  </h3>
                  <p className="mt-2 text-sm leading-7 text-slate-600 dark:text-slate-300">
                    فحص وتشخيص وحلول عملية لرفع كفاءة التبريد وتقليل الأعطال.
                  </p>
                </div>

                <div className="rounded-3xl border border-slate-200 bg-white/90 p-4 dark:border-white/10 dark:bg-white/[0.04] sm:p-5">
                  <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-cyan-100 text-cyan-600 dark:bg-cyan-500/15 dark:text-cyan-300">
                    <FaWind className="text-2xl" />
                  </div>
                  <h3 className="text-lg font-extrabold text-slate-900 dark:text-white">
                    دكت وتهوية
                  </h3>
                  <p className="mt-2 text-sm leading-7 text-slate-600 dark:text-slate-300">
                    تصميم وتنفيذ مجاري الهواء والدكت بمعايير دقيقة ومظهر مرتب.
                  </p>
                </div>

                <div className="rounded-3xl border border-slate-200 bg-white/90 p-4 dark:border-white/10 dark:bg-white/[0.04] sm:p-5">
                  <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-cyan-100 text-cyan-600 dark:bg-cyan-500/15 dark:text-cyan-300">
                    <FaFan className="text-2xl" />
                  </div>
                  <h3 className="text-lg font-extrabold text-slate-900 dark:text-white">
                    أنظمة تكييف متطورة
                  </h3>
                  <p className="mt-2 text-sm leading-7 text-slate-600 dark:text-slate-300">
                    تنفيذ احترافي للمنازل والشركات والمشاريع.
                  </p>
                </div>

                <div className="rounded-3xl border border-slate-200 bg-white/90 p-4 dark:border-white/10 dark:bg-white/[0.04] sm:p-5">
                  <div className="grid grid-cols-2 gap-3">
                    {stats.map((item) => (
                      <div
                        key={item.label}
                        className="rounded-2xl bg-slate-50 p-3 text-center dark:bg-white/[0.04]"
                      >
                        <div className="text-lg font-extrabold text-slate-900 dark:text-white">
                          {item.value}
                        </div>
                        <div className="mt-1 text-xs font-bold text-slate-500 dark:text-slate-300">
                          {item.label}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}