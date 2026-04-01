'use client';

import { motion } from 'framer-motion';
import {
  FaProjectDiagram,
  FaUserFriends,
  FaBuilding,
  FaSnowflake,
  FaStar,
  FaAward,
} from 'react-icons/fa';

const achievements = [
  {
    icon: FaProjectDiagram,
    value: '+200',
    label: 'مشروع منجز',
    description: 'تنفيذ أعمال متنوعة في التكييف والتهوية والدكت.',
  },
  {
    icon: FaUserFriends,
    value: '+500',
    label: 'عميل سعيد',
    description: 'ثقة العملاء هي أساس استمراريتنا ونجاحنا.',
  },
  {
    icon: FaBuilding,
    value: '+80',
    label: 'مشروع تجاري',
    description: 'خبرة في المشاريع التجارية والخدمية والمرافق المختلفة.',
  },
  {
    icon: FaSnowflake,
    value: '+15',
    label: 'سنة خبرة',
    description: 'خبرة عملية متراكمة في حلول التكييف والتبريد.',
  },
];

const strengths = [
  {
    icon: FaStar,
    title: 'تشطيب أنيق',
    text: 'نحرص على أن يكون التنفيذ النهائي مرتبًا بصريًا ووظيفيًا.',
  },
  {
    icon: FaAward,
    title: 'احترافية في التنفيذ',
    text: 'نهتم بالتفاصيل الصغيرة لأنها تصنع الفرق الحقيقي في النتيجة.',
  },
];

export default function Achievements() {
  return (
    <section id="achievements" className="section-shell">
      <div className="container">
        <div className="glass-card overflow-hidden p-6 md:p-8 xl:p-10">
          <div className="grid gap-8 xl:grid-cols-[0.9fr_1.1fr]">
            <div>
              <span className="mb-4 inline-flex rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-2 text-sm font-black text-cyan-300">
                إنجازاتنا
              </span>

              <h2 className="section-title !text-3xl md:!text-4xl">
                أرقام تعكس الخبرة والثقة
              </h2>

              <p className="mt-5 max-w-2xl text-base leading-8 text-white/75">
                نفخر بسجل من المشاريع الناجحة والعملاء الراضين، ونسعى دائمًا
                لتقديم مستوى خدمة يجعل النتيجة واضحة في الأداء والشكل النهائي
                والاعتمادية.
              </p>

              <div className="mt-6 grid gap-4">
                {strengths.map((item, index) => {
                  const Icon = item.icon;

                  return (
                    <motion.div
                      key={item.title}
                      initial={{ opacity: 0, y: 18 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, amount: 0.2 }}
                      transition={{ duration: 0.35, delay: index * 0.06 }}
                      className="rounded-[22px] border border-white/10 bg-white/5 p-5"
                    >
                      <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-cyan-500/15 text-cyan-300">
                        <Icon />
                      </div>
                      <h3 className="text-base font-black text-white">
                        {item.title}
                      </h3>
                      <p className="mt-2 text-sm leading-7 text-white/70">
                        {item.text}
                      </p>
                    </motion.div>
                  );
                })}
              </div>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              {achievements.map((item, index) => {
                const Icon = item.icon;

                return (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.15 }}
                    transition={{ duration: 0.4, delay: index * 0.05 }}
                    className="rounded-[28px] border border-white/10 bg-gradient-to-br from-white/8 to-white/[0.03] p-6"
                  >
                    <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-cyan-500/15 text-cyan-300">
                      <Icon className="text-xl" />
                    </div>

                    <div className="text-4xl font-black text-white">
                      {item.value}
                    </div>

                    <div className="mt-2 text-lg font-black text-cyan-300">
                      {item.label}
                    </div>

                    <p className="mt-3 text-sm leading-7 text-white/70">
                      {item.description}
                    </p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}