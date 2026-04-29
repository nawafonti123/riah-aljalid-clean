'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import {
  FaBullseye,
  FaEye,
  FaGem,
  FaCheckCircle,
  FaSnowflake,
  FaTools,
  FaBuilding,
  FaUsers,
} from 'react-icons/fa';

const values = [
  {
    icon: FaGem,
    title: 'الجودة',
    description:
      'نلتزم بتقديم أعمال دقيقة باستخدام مواد مناسبة وتشطيب مرتب يليق بثقة العميل.',
  },
  {
    icon: FaBullseye,
    title: 'الرسالة',
    description:
      'تقديم حلول تكييف وتبريد عملية وفعالة تلبي احتياج العميل بأفضل أداء واعتمادية.',
  },
  {
    icon: FaEye,
    title: 'الرؤية',
    description:
      'أن نكون من الجهات الموثوقة والرائدة في تنفيذ أعمال التكييف والتبريد والتهوية.',
  },
];

const features = [
  'تركيب وصيانة وتنظيف أنظمة التكييف',
  'حلول مناسبة للمنازل والمنشآت التجارية',
  'تنفيذ منظم واهتمام بالتفاصيل',
  'التزام بالمواعيد وجودة في التسليم',
];

const stats = [
  {
    icon: FaSnowflake,
    value: '+150',
    label: 'مشروع منفذ',
  },
  {
    icon: FaUsers,
    value: '+120',
    label: 'عميل راضٍ',
  },
  {
    icon: FaTools,
    value: '+15',
    label: 'سنة خبرة',
  },
  {
    icon: FaBuilding,
    value: 'سكني / تجاري',
    label: 'أنواع المشاريع',
  },
];

export default function AboutSection() {
  const aboutImage = '/imge/9.jpeg';

  return (
    <section
      id="about"
      className="relative overflow-hidden px-4 py-16 md:px-8 lg:px-12"
    >
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_top,rgba(34,211,238,0.10),transparent_35%),radial-gradient(circle_at_bottom,rgba(34,197,94,0.10),transparent_35%)]" />

      <div className="relative z-10 mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-cyan-400/25 bg-cyan-400/10 px-4 py-2 text-sm font-bold text-cyan-700 dark:text-cyan-300">
            من نحن
          </div>

          <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white md:text-4xl lg:text-5xl">
            نبذة عن رياح الجليد
          </h2>

          <p className="mx-auto mt-4 max-w-3xl text-base leading-8 text-slate-600 dark:text-slate-300 md:text-lg">
            رياح الجليد شركة متخصصة في حلول التكييف والتبريد والتهوية، نعمل على
            تقديم خدمات احترافية تجمع بين جودة التنفيذ، سرعة الإنجاز، والاهتمام
            براحة العميل في كل مرحلة من مراحل العمل.
          </p>
        </motion.div>

        <div className="grid items-center gap-8 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: 25 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.6 }}
            className="order-2 lg:order-1"
          >
            <div className="overflow-hidden rounded-[32px] border border-slate-200 bg-white/80 shadow-[0_15px_45px_rgba(15,23,42,0.08)] backdrop-blur-sm dark:border-white/10 dark:bg-white/[0.05] dark:shadow-[0_15px_45px_rgba(0,0,0,0.22)]">
              <div className="relative aspect-[4/3] w-full">
                <Image
                  src={aboutImage}
                  alt="فريق رياح الجليد أثناء العمل"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -25 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.6 }}
            className="order-1 lg:order-2"
          >
            <div className="rounded-[32px] border border-slate-200 bg-white/85 p-6 shadow-[0_15px_45px_rgba(15,23,42,0.06)] backdrop-blur-sm dark:border-white/10 dark:bg-white/[0.05] dark:shadow-[0_15px_45px_rgba(0,0,0,0.22)] md:p-8">
              <h3 className="text-2xl font-extrabold text-slate-900 dark:text-white">
                خبرة عملية وخدمة موثوقة
              </h3>

              <p className="mt-4 text-base leading-8 text-slate-600 dark:text-slate-300">
                نقدم خدمات تركيب وصيانة وتنظيف وتوريد أنظمة التكييف للمنازل
                والمنشآت التجارية، مع حرص دائم على رفع كفاءة التشغيل واختيار
                الحل الأنسب لطبيعة كل مشروع، سواء كان مشروعًا صغيرًا أو تنفيذًا
                متكاملًا بمواصفات خاصة.
              </p>

              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                {features.map((item) => (
                  <div
                    key={item}
                    className="flex items-start gap-3 rounded-2xl border border-slate-200 bg-slate-50/80 px-4 py-3 dark:border-white/10 dark:bg-white/[0.04]"
                  >
                    <FaCheckCircle className="mt-1 shrink-0 text-cyan-600 dark:text-cyan-300" />
                    <p className="text-sm leading-7 text-slate-700 dark:text-slate-300">
                      {item}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-6 grid gap-4 sm:grid-cols-3">
                {values.map((item) => {
                  const Icon = item.icon;
                  return (
                    <div
                      key={item.title}
                      className="rounded-2xl border border-slate-200 bg-white/90 p-4 dark:border-white/10 dark:bg-white/[0.04]"
                    >
                      <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-cyan-100 text-cyan-600 dark:bg-cyan-500/15 dark:text-cyan-300">
                        <Icon />
                      </div>

                      <h4 className="text-sm font-extrabold text-slate-900 dark:text-white">
                        {item.title}
                      </h4>

                      <p className="mt-2 text-sm leading-7 text-slate-600 dark:text-slate-300">
                        {item.description}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.65 }}
          className="mt-12"
        >
          <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
            {stats.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.label}
                  className="rounded-[28px] border border-slate-200 bg-white/85 p-6 text-center shadow-sm dark:border-white/10 dark:bg-white/[0.04]"
                >
                  <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-cyan-100 text-cyan-600 dark:bg-cyan-500/15 dark:text-cyan-300">
                    <Icon className="text-2xl" />
                  </div>

                  <div className="text-2xl font-extrabold text-slate-900 dark:text-white md:text-3xl">
                    {item.value}
                  </div>

                  <p className="mt-2 text-sm font-medium text-slate-600 dark:text-slate-300">
                    {item.label}
                  </p>
                </div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}