'use client';

import { useMemo } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import {
  FaBolt,
  FaShieldAlt,
  FaTools,
  FaUserTie,
  FaClock,
  FaCheckCircle,
} from 'react-icons/fa';

import whyImage from '../imge/10.jpeg'; // ✅ الصورة الجديدة

type WhyUsItem = {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
};

const whyUsItems: WhyUsItem[] = [
  {
    icon: FaUserTie,
    title: 'فريق احترافي',
    description:
      'طاقم فني وإداري لديه خبرة عملية في تنفيذ أعمال التكييف والتبريد بمختلف أنواعها.',
  },
  {
    icon: FaBolt,
    title: 'سرعة في الإنجاز',
    description:
      'ننجز الأعمال بسرعة عالية مع المحافظة على الجودة والترتيب والدقة في التنفيذ.',
  },
  {
    icon: FaTools,
    title: 'حلول متكاملة',
    description:
      'من التوريد إلى التركيب والصيانة والتهوية والدكت، نوفر خدمة متكاملة في مكان واحد.',
  },
  {
    icon: FaShieldAlt,
    title: 'جودة واعتمادية',
    description:
      'نهتم بالخامات وجودة التشطيب وكفاءة التشغيل لضمان أفضل أداء على المدى الطويل.',
  },
  {
    icon: FaClock,
    title: 'التزام بالمواعيد',
    description:
      'نلتزم بجدولة واضحة وتنفيذ منظم ومتابعة مستمرة حتى تسليم العمل بالصورة المطلوبة.',
  },
  {
    icon: FaCheckCircle,
    title: 'رضا العميل أولاً',
    description:
      'نركز على راحتك وجودة الخدمة والحلول المناسبة لميزانيتك وطبيعة مشروعك.',
  },
];

export default function WhyUs() {
  const highlights = useMemo(
    () => [
      'التزام بالجودة والدقة في كل مرحلة',
      'تنفيذ أنيق ومنظم للمشاريع السكنية والتجارية',
      'خدمة سريعة مع متابعة واهتمام بالتفاصيل',
    ],
    []
  );

  return (
    <section className="relative overflow-hidden px-4 py-16 md:px-8 lg:px-12">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.12 }}
          transition={{ duration: 0.6 }}
          className="mb-10 text-center"
        >
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-cyan-400/25 bg-cyan-400/10 px-4 py-2 text-sm font-bold text-cyan-700 dark:text-cyan-300">
            لماذا نحن
          </div>

          <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white md:text-4xl">
            لماذا يختارنا العملاء؟
          </h2>

          <p className="mx-auto mt-4 max-w-3xl text-base leading-8 text-slate-600 dark:text-slate-300 md:text-lg">
            لأننا نجمع بين الجودة والسرعة والخبرة والتنفيذ المنظم، ونقدّم تجربة
            خدمة أكثر احترافية ووضوحًا من البداية حتى التسليم.
          </p>
        </motion.div>

        <div className="grid items-center gap-8 lg:grid-cols-2">
          
          {/* 🔥 الصورة الجديدة */}
          <motion.div
            initial={{ opacity: 0, x: 25 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.12 }}
            transition={{ duration: 0.65 }}
          >
            <div className="overflow-hidden rounded-[32px] border border-slate-200 bg-white shadow-[0_15px_45px_rgba(15,23,42,0.08)] dark:border-white/10 dark:bg-white/[0.04]">
              <div className="relative aspect-[4/3] w-full">
                <Image
                  src={whyImage}
                  alt="رياح الجليد"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </motion.div>

          {/* النص */}
          <motion.div
            initial={{ opacity: 0, x: -25 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.12 }}
            transition={{ duration: 0.65 }}
            className="rounded-[32px] border border-slate-200 bg-gradient-to-br from-cyan-50 via-white to-slate-50 p-6 shadow-[0_15px_45px_rgba(15,23,42,0.06)] dark:border-white/10 dark:from-[#09141e] dark:via-[#0b1622] dark:to-[#09111a] md:p-8"
          >
            <h3 className="text-2xl font-extrabold text-slate-900 dark:text-white">
              تنفيذ مرتب وخدمة موثوقة
            </h3>

            <div className="mt-5 space-y-3">
              {highlights.map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-3 text-sm font-semibold text-slate-700 dark:text-slate-200"
                >
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-cyan-100 text-cyan-600 dark:bg-cyan-500/15 dark:text-cyan-300">
                    <FaCheckCircle className="text-xs" />
                  </span>
                  {item}
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {whyUsItems.map((item) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.12 }}
                transition={{ duration: 0.45 }}
                className="rounded-[28px] border border-slate-200 bg-white/90 p-6 shadow-sm dark:border-white/10 dark:bg-white/[0.04]"
              >
                <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-cyan-100 text-cyan-600 dark:bg-cyan-500/15 dark:text-cyan-300">
                  <Icon className="text-xl" />
                </div>

                <h3 className="text-xl font-extrabold text-slate-900 dark:text-white">
                  {item.title}
                </h3>

                <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-300">
                  {item.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}