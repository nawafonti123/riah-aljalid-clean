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
      className="relative py-20 sm:py-24 overflow-hidden"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(34,211,238,0.10),transparent_35%),radial-gradient(circle_at_bottom,rgba(34,197,94,0.10),transparent_35%)] pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-12"
        >
          <span className="inline-flex items-center rounded-full border border-cyan-400/25 bg-cyan-500/10 px-4 py-2 text-sm font-semibold text-cyan-300">
            إنجازاتنا
          </span>

          <h2 className="mt-5 text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-tight">
            أرقام تعكس خبرتنا وجودة أعمالنا
          </h2>

          <p className="mt-4 text-base sm:text-lg leading-8 text-white/75">
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
                className="group rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-6 sm:p-7 shadow-[0_10px_40px_rgba(0,0,0,0.25)] hover:border-cyan-400/30 hover:bg-white/10 transition-all duration-300"
              >
                <div className="mb-5 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-cyan-500/15 text-cyan-300 ring-1 ring-cyan-400/20">
                  <Icon className="text-2xl" />
                </div>

                <div className="text-3xl sm:text-4xl font-extrabold text-white">
                  {item.value}
                </div>

                <h3 className="mt-3 text-xl font-bold text-white">
                  {item.label}
                </h3>

                <p className="mt-3 text-sm sm:text-base leading-7 text-white/70">
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