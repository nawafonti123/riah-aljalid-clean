// frontend/components/sections/AboutSection.tsx
'use client';

import { useEffect, useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { publicApi } from '@/lib/api';
import Image from 'next/image';

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
        setAboutImage((s?.aboutImage as string) || null);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };

    run();
  }, []);

  return (
    <section id="about" ref={ref} className="py-12 sm:py-16 md:py-20 bg-white dark:bg-gray-900 transition-colors duration-300">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-8 sm:mb-10"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
            رياح الجليد
            <span className="block text-lg sm:text-xl text-[#01AEBE] dark:text-[#00c6ff] mt-2">
              لأعمال التكييف المركزي
            </span>
          </h2>
        </motion.div>

        {/* نبذة عنا + صورة (قابلة للتغيير من لوحة الإدارة) */}
        <div className="grid md:grid-cols-2 gap-4 sm:gap-6 items-stretch mb-10">
          <div className="glass-card p-6 sm:p-8 rounded-2xl bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border border-gray-200 dark:border-white/10">
            <p className="text-sm sm:text-base text-gray-700 dark:text-gray-300 leading-relaxed">
              نحن مؤسسة سعودية متخصصة في تركيب وصيانة أنظمة التكييف والتهوية والتبريد باستخدام التقنيات الحديثة والمبتكرة. نحرص على تحقيق أفضل النتائج بأفضل الأسعار وفي إطار الالتزام بالمعايير الصحية والبيئية، وذلك لتوفير بيئة مريحة وصحية لعملائنا، سواء في المنازل أو الشركات أو المصانع. يتميز فريق عملنا بالكفاءة والاحترافية، ما يجعلنا من الرواد في هذا المجال. ونحن نهدف دائمًا إلى تحسين خدماتنا وتلبية احتياجات عملائنا بأفضل الطرق الممكنة، وذلك لضمان رضاهم التام عن خدماتنا.
            </p>
          </div>

          <div className="relative rounded-2xl overflow-hidden border border-gray-200 dark:border-white/10 bg-gray-100 dark:bg-white/5 min-h-[220px]">
            <Image
              src={aboutImage || '/logo.png'}
              alt="عن رياح الجليد"
              fill
              sizes="(max-width: 768px) 100vw, 520px"
              className="object-cover"
              priority={false}
            />
            <div className="absolute inset-0 bg-gradient-to-tr from-black/25 via-transparent to-transparent" />
          </div>
        </div>

        {/* الرؤية والرسالة */}
        <div className="grid md:grid-cols-2 gap-4 sm:gap-6 mb-10">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-white dark:bg-gray-800 p-4 sm:p-6 md:p-8 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700"
          >
            <h3 className="text-base sm:text-lg md:text-xl font-bold text-gray-900 dark:text-white mb-3">رؤيتنا</h3>
            <p className="text-xs sm:text-sm md:text-base text-gray-600 dark:text-gray-300 leading-relaxed">
              تتجلى رؤيتنا في توفير حلول تكييف متطورة وخدمات مميزة لعملائنا، وتحسين جودة الهواء والبيئة في المناطق التي نخدمها، والاستمرار في الابتكار والتطوير لتحقيق النجاح والنمو المستدام. نؤمن بأن فريقنا هو الأساس لنجاحنا وتحقيق رؤيتنا، لذلك نعمل على توفير بيئة عمل إيجابية وملهمة ونشجع التعاون والابتكار والتحسين المستمر.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="bg-white dark:bg-gray-800 p-4 sm:p-6 md:p-8 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700"
          >
            <h3 className="text-base sm:text-lg md:text-xl font-bold text-gray-900 dark:text-white mb-3">رسالتنا</h3>
            <p className="text-xs sm:text-sm md:text-base text-gray-600 dark:text-gray-300 leading-relaxed">
              تؤمن شركتنا بأهمية الابتكار والتطوير لتحسين أدائنا وتلبية متطلبات السوق الذي يشهد نموًا كبيرًا بالتزامن مع رؤية 2030. ولذلك نسعى دائمًا إلى الاستمرار في تعزيز الجودة والكفاءة والاستدامة في جميع جوانب أعمالنا، ونعمل بشكل مستمر على تحسين أدائنا وتطوير قدراتنا للحفاظ على مكانتنا كشركة رائدة في هذا المجال.
            </p>
          </motion.div>
        </div>

        {/* القيم */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mb-12"
        >
          <h3 className="text-base sm:text-lg md:text-xl font-bold text-gray-900 dark:text-white text-center mb-5 sm:mb-6">قيمنا</h3>
          <p className="text-center text-gray-600 dark:text-gray-300 mb-6 max-w-2xl mx-auto text-xs sm:text-sm">
            نحن نؤمن بأن القيم الأخلاقية تلعب دورًا حاسمًا في تحقيق النجاح والنمو المستدام، وهذا ما نسعى إليه في مؤسسة رياح الجليد. نحرص كل الحرص على الإخلاص والتفاني في تقديم خدماتنا، ونسعى جاهدين لتحسين جودة الخدمات التي نقدمها وتلبية احتياجات عملائنا وتحسين خدمتهم، وهذا ينعكس بوضوح في شهاداتهم الإيجابية وثقتهم بنا. ونحن بذلك نعتز ونفتخر بتواجدنا كرواد في هذا المجال.
          </p>
        </motion.div>

        {/* صور الفريق */}
        {!loading && team.length > 0 && (
          <div className="mt-12">
            <h3 className="text-xl font-bold text-center text-gray-900 dark:text-white mb-6">
              فريق العمل
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {team
                .slice()
                .sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
                .map((member) => (
                  <motion.div
                    key={member.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.4 }}
                    className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-md border border-gray-200 dark:border-gray-700"
                  >
                    <div className="relative w-full h-32 sm:h-36">
                      <Image
                        src={member.image || '/logo.png'}
                        alt={member.name}
                        fill
                        sizes="(max-width: 640px) 50vw, 25vw"
                        className="object-cover"
                      />
                    </div>
                    <div className="p-3">
                      <p className="font-semibold text-sm text-gray-900 dark:text-white">{member.name}</p>
                      <p className="text-xs text-gray-600 dark:text-gray-300">{member.role}</p>
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