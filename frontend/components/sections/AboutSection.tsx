'use client';

import { useMemo, useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { FaBullseye, FaEye, FaGem } from 'react-icons/fa';

interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio?: string;
  image?: string;
  order?: number;
}

const values = [
  {
    icon: FaGem,
    title: 'الجودة',
    description: 'نلتزم بتقديم أعمال دقيقة بمواد جيدة وتشطيب مرتب.',
  },
  {
    icon: FaBullseye,
    title: 'الرسالة',
    description: 'تقديم حلول تكييف عملية وفعالة تلبي احتياج العميل بأفضل صورة.',
  },
  {
    icon: FaEye,
    title: 'الرؤية',
    description: 'أن نكون من الأسماء الموثوقة والرائدة في مجال التكييف والتبريد.',
  },
];

export default function AboutSection() {
  const [team] = useState<TeamMember[]>([]);
  const [aboutImage] = useState('/imge/9.jpeg'); // ✅ صورتك الجديدة

  const orderedTeam = useMemo(
    () =>
      [...team].sort((a, b) => {
        const aOrder = a.order ?? 0;
        const bOrder = b.order ?? 0;
        return aOrder - bOrder;
      }),
    [team]
  );

  return (
    <section className="relative overflow-hidden px-4 py-16 md:px-8 lg:px-12">
      <div className="mx-auto max-w-7xl">

        {/* العنوان */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-10 text-center"
        >
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-cyan-400/25 bg-cyan-400/10 px-4 py-2 text-sm font-bold text-cyan-700 dark:text-cyan-300">
            من نحن
          </div>

          <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white md:text-4xl">
            نبذة عن رياح الجليد
          </h2>

          <p className="mx-auto mt-4 max-w-3xl text-base leading-8 text-slate-600 dark:text-slate-300 md:text-lg">
            مؤسسة متخصصة في حلول التكييف والتبريد والتهوية، نهتم بجودة التنفيذ
            وسرعة الإنجاز ورضا العميل.
          </p>
        </motion.div>

        <div className="grid items-start gap-8 lg:grid-cols-2">

          {/* الصورة */}
          <motion.div
            initial={{ opacity: 0, x: 25 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="overflow-hidden rounded-[32px] border bg-white shadow">
              <div className="relative aspect-[4/3] w-full">
                <Image
                  src={aboutImage}
                  alt="عن الشركة"
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
            transition={{ duration: 0.6 }}
          >
            <div className="rounded-[32px] p-6 md:p-8 bg-white dark:bg-white/[0.05] border">

              <h3 className="text-2xl font-extrabold text-slate-900 dark:text-white">
                نبذة عنا
              </h3>

              <p className="mt-4 text-slate-600 dark:text-slate-300">
                نقدم خدمات تركيب وصيانة وتنظيف أنظمة التكييف باحترافية عالية
                للمنازل والمشاريع التجارية.
              </p>

              <div className="mt-6 grid gap-4 sm:grid-cols-3">
                {values.map((item) => {
                  const Icon = item.icon;
                  return (
                    <div key={item.title} className="p-4 rounded-2xl border">
                      <Icon className="mb-2 text-cyan-500" />
                      <h4 className="font-bold">{item.title}</h4>
                      <p className="text-sm">{item.description}</p>
                    </div>
                  );
                })}
              </div>

            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}