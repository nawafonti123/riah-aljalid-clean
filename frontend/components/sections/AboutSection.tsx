'use client';

import { useEffect, useMemo, useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { publicApi } from '@/lib/api';
import { FaBullseye, FaEye, FaGem } from 'react-icons/fa';

interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio?: string;
  image?: string;
  order?: number;
}

interface SiteSettings {
  aboutImage?: string | null;
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
  const [team, setTeam] = useState<TeamMember[]>([]);
  const [aboutImage, setAboutImage] = useState('/logo.png');

  useEffect(() => {
    const run = async () => {
      try {
        const [teamData, settings] = await Promise.all([
          publicApi.getTeamMembers().catch(() => []),
          publicApi.getSettings().catch(() => null),
        ]);

        setTeam(Array.isArray(teamData) ? teamData : []);

        const siteSettings = settings as SiteSettings | null;
        const image = siteSettings?.aboutImage?.trim();
        setAboutImage(image || '/logo.png');
      } catch {
        setTeam([]);
        setAboutImage('/logo.png');
      }
    };

    run();
  }, []);

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
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.12 }}
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
            وسرعة الإنجاز ورضا العميل، ونعمل على تقديم خدمات متكاملة للمشاريع
            السكنية والتجارية باحترافية عالية.
          </p>
        </motion.div>

        <div className="grid items-start gap-8 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: 25 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.12 }}
            transition={{ duration: 0.65 }}
            className="order-2 lg:order-1"
          >
            <div className="overflow-hidden rounded-[32px] border border-slate-200 bg-white/90 shadow-[0_15px_45px_rgba(15,23,42,0.08)] dark:border-white/10 dark:bg-white/[0.04] dark:shadow-[0_15px_45px_rgba(0,0,0,0.22)]">
              <div className="relative aspect-[4/3] w-full">
                <Image
                  src={aboutImage}
                  alt="عن رياح الجليد"
                  fill
                  className="object-cover"
                  onError={() => setAboutImage('/logo.png')}
                />
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -25 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.12 }}
            transition={{ duration: 0.65 }}
            className="order-1 lg:order-2"
          >
            <div className="rounded-[32px] border border-slate-200 bg-gradient-to-br from-cyan-50 via-white to-slate-50 p-6 shadow-[0_15px_45px_rgba(15,23,42,0.06)] dark:border-white/10 dark:from-[#09141e] dark:via-[#0b1622] dark:to-[#09111a] dark:shadow-[0_15px_45px_rgba(0,0,0,0.22)] md:p-8">
              <h3 className="text-2xl font-extrabold text-slate-900 dark:text-white">
                نبذة عنا
              </h3>

              <p className="mt-4 text-base leading-8 text-slate-600 dark:text-slate-300">
                نقدم خدمات تركيب وصيانة وتنظيف وتوريد أنظمة التكييف بأعلى مستوى
                من الاحتراف، ونسعى دائمًا لرفع كفاءة التشغيل وتقديم حلول مناسبة
                لطبيعة كل مشروع سواء كان منزلًا أو منشأة تجارية أو مشروعًا كبيرًا.
              </p>

              <div className="mt-6 grid gap-4 sm:grid-cols-3">
                {values.map((item) => {
                  const Icon = item.icon;
                  return (
                    <div
                      key={item.title}
                      className="rounded-3xl border border-slate-200 bg-white/85 p-4 dark:border-white/10 dark:bg-white/[0.04]"
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

        {orderedTeam.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.12 }}
            transition={{ duration: 0.65 }}
            className="mt-12"
          >
            <div className="mb-6 text-center">
              <h3 className="text-2xl font-extrabold text-slate-900 dark:text-white">
                فريق العمل
              </h3>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
                نخبة من المختصين والفنيين في أعمال التكييف والتبريد
              </p>
            </div>

            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {orderedTeam.map((member) => (
                <div
                  key={member.id}
                  className="rounded-[28px] border border-slate-200 bg-white/90 p-5 shadow-sm dark:border-white/10 dark:bg-white/[0.04]"
                >
                  <div className="flex items-center gap-4">
                    <div className="relative h-16 w-16 overflow-hidden rounded-2xl bg-slate-100 dark:bg-white/10">
                      {member.image ? (
                        <Image
                          src={member.image}
                          alt={member.name}
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center text-sm font-extrabold text-slate-500 dark:text-slate-300">
                          {member.name?.slice(0, 1)}
                        </div>
                      )}
                    </div>

                    <div>
                      <h4 className="text-lg font-extrabold text-slate-900 dark:text-white">
                        {member.name}
                      </h4>
                      <p className="text-sm font-semibold text-cyan-700 dark:text-cyan-300">
                        {member.role}
                      </p>
                    </div>
                  </div>

                  {member.bio && (
                    <p className="mt-4 text-sm leading-7 text-slate-600 dark:text-slate-300">
                      {member.bio}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
}