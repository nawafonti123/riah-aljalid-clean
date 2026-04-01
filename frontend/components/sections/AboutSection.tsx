'use client';

import { useEffect, useMemo, useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { publicApi } from '@/lib/api';
import { FaUsers, FaBullseye, FaEye, FaGem } from 'react-icons/fa';

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
    <section id="about" className="section-shell">
      <div className="container">
        <div className="mb-10 max-w-3xl">
          <span className="mb-4 inline-flex rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-2 text-sm font-black text-cyan-300">
            من نحن
          </span>
          <h2 className="section-title">نبذة عن رياح الجليد</h2>
          <p className="section-subtitle">
            مؤسسة متخصصة في حلول التكييف والتبريد والتهوية، نهتم بجودة التنفيذ
            وسرعة الإنجاز ورضا العميل، ونعمل على تقديم خدمات متكاملة للمشاريع
            السكنية والتجارية باحترافية عالية.
          </p>
        </div>

        <div className="grid items-center gap-8 lg:grid-cols-[1fr_1.05fr]">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.45 }}
            className="glass-card overflow-hidden p-3"
          >
            <div className="relative min-h-[340px] overflow-hidden rounded-[24px] bg-slate-900/40 md:min-h-[460px]">
              <Image
                src={aboutImage}
                alt="عن رياح الجليد"
                fill
                className="object-cover"
                onError={() => setAboutImage('/logo.png')}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/65 via-slate-950/15 to-transparent" />
            </div>
          </motion.div>

          <div className="space-y-5">
            <motion.div
              initial={{ opacity: 0, y: 26 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.45 }}
              className="soft-card p-6"
            >
              <h3 className="mb-3 text-xl font-black text-white">نبذة عنا</h3>
              <p className="text-[15px] leading-8 text-white/75">
                نقدم خدمات تركيب وصيانة وتنظيف وتوريد أنظمة التكييف بأعلى مستوى
                من الاحتراف، ونسعى دائمًا لرفع كفاءة التشغيل وتقديم حلول مناسبة
                لطبيعة كل مشروع سواء كان منزلًا أو منشأة تجارية أو مشروعًا كبيرًا.
              </p>
            </motion.div>

            <div className="grid gap-4 md:grid-cols-3">
              {values.map((item, index) => {
                const Icon = item.icon;

                return (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, y: 22 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.4, delay: index * 0.06 }}
                    className="soft-card p-5"
                  >
                    <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-cyan-500/15 text-cyan-300">
                      <Icon />
                    </div>
                    <h4 className="text-base font-black text-white">
                      {item.title}
                    </h4>
                    <p className="mt-2 text-sm leading-7 text-white/70">
                      {item.description}
                    </p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>

        {orderedTeam.length > 0 && (
          <div className="mt-12">
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-cyan-500/15 text-cyan-300">
                <FaUsers />
              </div>
              <div>
                <h3 className="text-2xl font-black text-white">فريق العمل</h3>
                <p className="mt-1 text-sm text-white/65">
                  نخبة من المختصين والفنيين في أعمال التكييف والتبريد
                </p>
              </div>
            </div>

            <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
              {orderedTeam.map((member, index) => (
                <motion.div
                  key={member.id}
                  initial={{ opacity: 0, y: 22 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.15 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  className="glass-card overflow-hidden"
                >
                  <div className="relative h-72 bg-slate-900/40">
                    <Image
                      src={member.image || '/logo.png'}
                      alt={member.name}
                      fill
                      className="object-cover"
                    />
                  </div>

                  <div className="p-5">
                    <h4 className="text-lg font-black text-white">
                      {member.name}
                    </h4>
                    <p className="mt-1 text-sm font-bold text-cyan-300">
                      {member.role}
                    </p>

                    {member.bio && (
                      <p className="mt-3 line-clamp-4 text-sm leading-7 text-white/70">
                        {member.bio}
                      </p>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}