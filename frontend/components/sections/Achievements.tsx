'use client';

import { motion } from 'framer-motion';
import {
  FaProjectDiagram,
  FaUsers,
  FaTools,
  FaSnowflake,
} from 'react-icons/fa';

type StatItem = {
  icon: React.ComponentType<{ className?: string }>;
  value: string;
  label: string;
  description: string;
};

const stats: StatItem[] = [
  {
    icon: FaProjectDiagram,
    value: '+150',
    label: 'مشروع تم تنفيذه',
    description:
      'تنفيذ أعمال متنوعة في التكييف والتبريد والدكت والتهوية للمنازل والمنشآت التجارية.',
  },
  {
    icon: FaUsers,
    value: '+120',
    label: 'عميل راضٍ',
    description:
      'ثقة عملائنا مبنية على جودة التنفيذ والالتزام بالمواعيد وسرعة الاستجابة.',
  },
  {
    icon: FaTools,
    value: '+15',
    label: 'سنة خبرة',
    description:
      'خبرة عملية متراكمة في التركيبات والصيانة والمعالجة الفنية للمشاريع المختلفة.',
  },
  {
    icon: FaSnowflake,
    value: '100%',
    label: 'تركيز على الجودة',
    description:
      'نهتم بالتفاصيل الفنية والشكل النهائي لضمان نتيجة احترافية وعمل موثوق.',
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
          className="mx-auto mb-12 max-w-3xl text-center"
        >
          <span className="inline-flex items-center rounded-full border border-cyan-400/25 bg-cyan-500/10 px-4 py-2 text-sm font-semibold text-cyan-700 dark:text-cyan-300">
            إنجازاتنا
          </span>

          <h2 className="mt-5 text-3xl font-extrabold leading-tight text-slate-900 dark:text-white sm:text-4xl lg:text-5xl">
            أرقام تعكس خبرتنا وجودة أعمالنا
          </h2>

          <p className="mt-4 text-base leading-8 text-slate-600 dark:text-white/75 sm:text-lg">
            نفخر بتنفيذ أعمال احترافية في التكييف والتبريد والتهوية، مع اهتمام
            كبير بالدقة والتنظيم ورضا العميل في كل مشروع.
          </p>
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
                className="group rounded-3xl border border-slate-200/80 bg-white/80 p-6 backdrop-blur-xl shadow-[0_10px_40px_rgba(0,0,0,0.08)] transition-all duration-300 hover:border-cyan-400/40 hover:bg-white dark:border-white/10 dark:bg-white/5 dark:shadow-[0_10px_40px_rgba(0,0,0,0.25)] dark:hover:border-cyan-400/30 dark:hover:bg-white/10 sm:p-7"
              >
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
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}