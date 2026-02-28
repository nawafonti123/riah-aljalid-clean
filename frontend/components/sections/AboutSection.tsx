'use client';

import { useEffect, useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { publicApi } from '@/lib/api';
import Image from 'next/image';
import Tilt from 'react-parallax-tilt';

interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio?: string;
  image?: string;
  order: number;
}

interface SiteSettings {
  aboutImage?: string | null;
}

export default function AboutSection() {
  const [team, setTeam] = useState<TeamMember[]>([]);
  const [aboutImage, setAboutImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });

  useEffect(() => {
    const run = async () => {
      try {
        const [teamData, settings] = await Promise.all([
          publicApi.getTeamMembers(),
          publicApi.getSettings().catch(() => null),
        ]);

        setTeam(teamData || []);
        const s = settings as SiteSettings | null;
        setAboutImage((s?.aboutImage as string) || '/logo.png');
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };

    run();
  }, []);

  return (
    <section id="about" ref={ref} className="py-20 bg-white dark:bg-gray-900 transition-colors duration-300">
      <div className="container mx-auto px-4">

        {/* العنوان */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white">
            رياح الجليد
            <span className="block text-xl text-[#01AEBE] mt-2">
              لأعمال التكييف المركزي
            </span>
          </h2>
        </motion.div>

        {/* نبذة + صورة 3D */}
        <div className="grid md:grid-cols-2 gap-10 items-stretch mb-16">

          <Tilt tiltMaxAngleX={6} tiltMaxAngleY={6} perspective={1500} scale={1.02}>
            <div className="glass-card p-8 rounded-2xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-white/10 shadow-2xl transition-all duration-500 hover:shadow-[0_0_40px_rgba(0,200,255,0.25)]">
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                نحن مؤسسة سعودية متخصصة في تركيب وصيانة أنظمة التكييف والتهوية والتبريد باستخدام التقنيات الحديثة.
                نحرص على تحقيق أفضل النتائج بأفضل الأسعار وضمن أعلى المعايير الصحية والبيئية.
                يتميز فريقنا بالكفاءة والاحترافية مما يجعلنا من الرواد في هذا المجال.
              </p>
            </div>
          </Tilt>

          <Tilt tiltMaxAngleX={6} tiltMaxAngleY={6} perspective={1500}>
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-gray-200 dark:border-white/10 min-h-[300px]">
              <Image
                src={aboutImage || '/logo.png'}
                alt="عن رياح الجليد"
                fill
                className="object-cover"
              />
            </div>
          </Tilt>

        </div>

        {/* الرؤية والرسالة */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">

          <Tilt tiltMaxAngleX={8} tiltMaxAngleY={8} perspective={1200}>
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-2xl border border-gray-200 dark:border-white/10 hover:shadow-[0_0_40px_rgba(0,255,200,0.2)] transition-all duration-500"
            >
              <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">رؤيتنا</h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                رؤيتنا تتمثل في تقديم حلول تكييف متطورة ومستدامة وتحقيق الريادة في هذا المجال
                من خلال الابتكار والجودة والالتزام بمعايير الاحترافية.
              </p>
            </motion.div>
          </Tilt>

          <Tilt tiltMaxAngleX={8} tiltMaxAngleY={8} perspective={1200}>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-2xl border border-gray-200 dark:border-white/10 hover:shadow-[0_0_40px_rgba(0,200,255,0.2)] transition-all duration-500"
            >
              <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">رسالتنا</h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                نسعى لتقديم خدمات احترافية عالية الجودة تلبي احتياجات السوق
                وتواكب رؤية 2030 عبر الابتكار والاستدامة.
              </p>
            </motion.div>
          </Tilt>

        </div>

        {/* فريق العمل 3D */}
        {!loading && team.length > 0 && (
          <div className="mt-12">
            <h3 className="text-2xl font-bold text-center text-gray-900 dark:text-white mb-8">
              فريق العمل
            </h3>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-8">
              {team
                .slice()
                .sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
                .map((member) => (
                  <Tilt key={member.id} tiltMaxAngleX={10} tiltMaxAngleY={10} perspective={1200} scale={1.05}>
                    <div className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-xl border border-gray-200 dark:border-white/10 hover:shadow-[0_0_40px_rgba(0,200,255,0.25)] transition-all duration-500">
                      <div className="relative w-full h-40">
                        <Image
                          src={member.image || '/logo.png'}
                          alt={member.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="p-4 text-center">
                        <p className="font-semibold text-gray-900 dark:text-white">
                          {member.name}
                        </p>
                        <p className="text-sm text-gray-600 dark:text-gray-300">
                          {member.role}
                        </p>
                      </div>
                    </div>
                  </Tilt>
                ))}
            </div>
          </div>
        )}

      </div>
    </section>
  );
}