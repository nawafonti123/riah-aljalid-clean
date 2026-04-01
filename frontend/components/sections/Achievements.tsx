'use client';

import { motion } from 'framer-motion';
import {
  FaProjectDiagram,
  FaUsers,
  FaTools,
  FaSnowflake,
  FaClock,
  FaShieldAlt,
  FaBuilding,
  FaCheckCircle,
} from 'react-icons/fa';

type StatItem = {
  icon: React.ComponentType<{ className?: string }>;
  value: string;
  label: string;
  description: string;
  extra: string;
};

const stats: StatItem[] = [
  {
    icon: FaProjectDiagram,
    value: '+150',
    label: 'مشروع تم تنفيذه',
    description:
      'نفذنا أعمالاً متعددة في التكييف والتبريد والتهوية والدكت للمنازل والمنشآت التجارية.',
    extra: 'تنوع في المشاريع السكنية والتجارية',
  },
  {
    icon: FaUsers,
    value: '+120',
    label: 'عميل راضٍ',
    description:
      'رضا عملائنا هو أساس نجاحنا، لذلك نهتم بالتفاصيل الدقيقة وجودة الخدمة من البداية حتى التسليم.',
    extra: 'ثقة متواصلة وتجربة خدمة مميزة',
  },
  {
    icon: FaTools,
    value: '+15',
    label: 'سنة خبرة',
    description:
      'خبرة عملية طويلة في التركيب والصيانة والتنفيذ الفني وفق أعلى المعايير المهنية.',
    extra: 'خبرة ميدانية وحلول عملية دقيقة',
  },
  {
    icon: FaSnowflake,
    value: '100%',
    label: 'تركيز على الجودة',
    description:
      'نحرص على تقديم أعمال متقنة بتشطيب مرتب وتنفيذ احترافي يحقق أفضل أداء واستدامة.',
    extra: 'اهتمام كامل بالتفاصيل النهائية',
  },
];

const features = [
  {
    icon: FaClock,
    text: 'سرعة في الإنجاز والالتزام بالمواعيد',
  },
  {
    icon: FaShieldAlt,
    text: 'تنفيذ موثوق ومعايير جودة عالية',
  },
  {
    icon: FaBuilding,
    text: 'خدمة للمشاريع السكنية والتجارية',
  },
  {
    icon: FaCheckCircle,
    text: 'متابعة دقيقة حتى اكتمال العمل',
  },
];

export default function Achievements() {
  return (
    <section
      id="achievements"
      className="relative overflow-hidden py-20 sm:py-24"
    >
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_top,rgba(34,211,238,0.10),transparent_35%),radial-gradient(circle_at_bottom,rgba(34,197,94,0.10),transparent_35%)]" />

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55 }}
          viewport={{ once: true }}
          className="mx-auto mb-14 max-w-4xl text-center"
        >
          <span className="inline-flex items-center rounded-full border border-cyan-400/25 bg-cyan-500/10 px-4 py-2 text-sm font-semibold text-cyan-700 dark:text-cyan-300">
            إنجازاتنا
          </span>

          <h2 className="mt-5 text-3xl font-extrabold leading-tight text-slate-900 dark:text-white sm:text-4xl lg:text-5xl">
            أرقام تعكس خبرتنا وجودة أعمالنا
          </h2>

          <p className="mt-5 text-base leading-8 text-slate-600 dark:text-white/75 sm:text-lg">
            نفخر بسجل من الأعمال الناجحة في مجال التكييف والتبريد والتهوية،
            ونعمل دائمًا على تقديم خدمة تجمع بين الدقة، السرعة، جودة التنفيذ،
            والاهتمام الكامل براحة العميل في كل مشروع.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35, delay: index * 0.08 }}
                  viewport={{ once: true }}
                  className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/80 px-4 py-2 text-sm font-medium text-slate-700 shadow-sm dark:border-white/10 dark:bg-white/5 dark:text-white/80"
                >
                  <Icon className="text-cyan-600 dark:text-cyan-300" />
                  <span>{feature.text}</span>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
          {stats.map((item, index) => {
            const Icon = item.icon;

            return (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 26 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: index * 0.08 }}
                viewport={{ once: true }}
                className="group relative overflow-hidden rounded-3xl border border-slate-200/80 bg-white/85 p-6 backdrop-blur-xl shadow-[0_10px_40px_rgba(0,0,0,0.08)] transition-all duration-300 hover:-translate-y-1 hover:border-cyan-400/40 hover:shadow-[0_18px_50px_rgba(6,182,212,0.12)] dark:border-white/10 dark:bg-white/5 dark:shadow-[0_10px_40px_rgba(0,0,0,0.25)] dark:hover:border-cyan-400/30 dark:hover:bg-white/10 sm:p-7"
              >
                <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-cyan-400 via-emerald-400 to-cyan-500 opacity-80" />

                <div className="mb-5 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-cyan-500/15 text-cyan-700 ring-1 ring-cyan-400/20 dark:text-cyan-300">
                  <Icon className="text-2xl" />
                </div>

                <div className="text-3xl font-extrabold text-slate-900 dark:text-white sm:text-4xl">
                  {item.value}
                </div>

                <h3 className="mt-3 text-xl font-bold text-slate-900 dark:text-white">
                  {item.label}
                </h3>

                <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-white/70 sm:text-base">
                  {item.description}
                </p>

                <div className="mt-5 rounded-2xl border border-cyan-100 bg-cyan-50/80 px-4 py-3 text-sm font-medium text-cyan-800 dark:border-cyan-400/10 dark:bg-cyan-500/10 dark:text-cyan-200">
                  {item.extra}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}