'use client';

import { useEffect, useMemo, useState } from 'react';
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
import { publicApi } from '@/lib/api';

type WhyUsItem = {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
};

type SettingsResponse = {
  whyUsImage?: string | null;
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
  const [image, setImage] = useState('/logo.png');

  useEffect(() => {
    const load = async () => {
      try {
        const settings = (await publicApi.getSettings()) as SettingsResponse | null;
        const img = settings?.whyUsImage?.trim();
        setImage(img || '/logo.png');
      } catch {
        setImage('/logo.png');
      }
    };

    load();
  }, []);

  const highlights = useMemo(
    () => [
      'التزام بالجودة والدقة في كل مرحلة',
      'تنفيذ أنيق ومنظم للمشاريع السكنية والتجارية',
      'خدمة سريعة مع متابعة واهتمام بالتفاصيل',
    ],
    []
  );

  return (
    <section id="why-us" className="section-shell">
      <div className="container">
        <div className="mb-10 max-w-3xl">
          <span className="mb-4 inline-flex rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-2 text-sm font-black text-cyan-300">
            لماذا نحن
          </span>
          <h2 className="section-title">لماذا يختارنا العملاء؟</h2>
          <p className="section-subtitle">
            لأننا نجمع بين الجودة والسرعة والخبرة والتنفيذ المنظم، ونقدّم تجربة
            خدمة أكثر احترافية ووضوحًا من البداية حتى التسليم.
          </p>
        </div>

        <div className="grid items-center gap-8 xl:grid-cols-[0.95fr_1.05fr]">
          <motion.div
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.45 }}
            className="glass-card overflow-hidden p-3"
          >
            <div className="relative min-h-[340px] overflow-hidden rounded-[24px] bg-slate-900/40 md:min-h-[520px]">
              <Image
                src={image}
                alt="لماذا رياح الجليد"
                fill
                className="object-cover"
                onError={() => setImage('/logo.png')}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/75 via-slate-950/20 to-transparent" />

              <div className="absolute inset-x-4 bottom-4 rounded-[24px] border border-white/10 bg-slate-950/45 p-5 backdrop-blur-md">
                <h3 className="text-xl font-black text-white">
                  تنفيذ مرتب وخدمة موثوقة
                </h3>

                <div className="mt-4 grid gap-3">
                  {highlights.map((item) => (
                    <div
                      key={item}
                      className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3"
                    >
                      <FaCheckCircle className="mt-1 shrink-0 text-cyan-300" />
                      <span className="text-sm font-bold leading-7 text-white/80">
                        {item}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          <div className="grid gap-5 sm:grid-cols-2">
            {whyUsItems.map((item, index) => {
              const Icon = item.icon;

              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.15 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  className="soft-card p-6"
                >
                  <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-cyan-500/15 text-cyan-300">
                    <Icon className="text-xl" />
                  </div>

                  <h3 className="text-lg font-black text-white">{item.title}</h3>
                  <p className="mt-3 text-sm leading-8 text-white/70">
                    {item.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}