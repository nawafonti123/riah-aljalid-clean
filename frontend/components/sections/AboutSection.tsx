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
    <section
      id="about"
      ref={ref}
      className="py-12 sm:py-16 md:py-20 bg-white dark:bg-gray-900 transition-colors duration-300"
    >
      <div className="container mx-auto px-4">
        {/* العنوان */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55 }}
          className="text-center mb-8 sm:mb-10"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
            رياح الجليد
            <span className="block text-lg sm:text-xl text-[#01AEBE] dark:text-[#00c6ff] mt-2">
              لأعمال التكييف المركزي
            </span>
          </h2>
        </motion.div>

        {/* نبذة عنا + صورة (3D) */}
        <div className="grid md:grid-cols-2 gap-4 sm:gap-6 items-stretch mb-10">
          {/* نبذة (3D Card) */}
          <Tilt
            tiltMaxAngleX={8}
            tiltMaxAngleY={8}
            perspective={1200}
            transitionSpeed={1200}
            glareEnable
            glareMaxOpacity={0.12}
            scale={1.02}
            className="rounded-2xl"
          >
            <div className="glass-card p-6 sm:p-8 rounded-2xl bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm border border-gray-200 dark:border-white/10 shadow-xl transition-all duration-500 hover:shadow-[0_0_40px_rgba(0,200,255,0.18)]">
              <h3 className="text-base sm:text-lg font-bold text-gray-900 dark:text-white mb-3">
                نبذة عنا
              </h3>
              <p className="text-sm sm:text-base text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-line">
{`نحن مؤسسة سعودية متخصصة في تركيب وصيانة أنظمة التكييف والتهوية والتبريد باستخدام التقنيات الحديثة والمبتكرة. نحرص على تحقيق أفضل النتائج بأفضل الأسعار وفي إطار الالتزام بالمعايير الصحية والبيئية، وذلك لتوفير بيئة مريحة وصحية لعملائنا، سواء في المنازل أو الشركات والمصانع.
يتميز فريق عملنا بالكفاءة والاحترافية، ما يجعلنا من الرواد في هذا المجال. ونحن نهدف دائمًا إلى تحسين خدماتنا وتلبية احتياجات عملائنا بأفضل الطرق الممكنة، وذلك لضمان رضاهم التام عن خدماتنا.`}
              </p>
            </div>
          </Tilt>

          {/* صورة (3D) */}
          <Tilt
            tiltMaxAngleX={8}
            tiltMaxAngleY={8}
            perspective={1300}
            transitionSpeed={1200}
            glareEnable
            glareMaxOpacity={0.08}
            scale={1.02}
            className="rounded-2xl"
          >
            <div className="relative rounded-2xl overflow-hidden border border-gray-200 dark:border-white/10 bg-gray-100 dark:bg-white/5 min-h-[220px] shadow-xl transition-all duration-500 hover:shadow-[0_0_45px_rgba(0,255,200,0.15)]">
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
          </Tilt>
        </div>

        {/* الرؤية والرسالة (3D) */}
        <div className="grid md:grid-cols-2 gap-4 sm:gap-6 mb-10">
          <Tilt
            tiltMaxAngleX={8}
            tiltMaxAngleY={8}
            perspective={1200}
            transitionSpeed={1200}
            glareEnable
            glareMaxOpacity={0.10}
            scale={1.02}
            className="rounded-xl"
          >
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-white dark:bg-gray-800 p-4 sm:p-6 md:p-8 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 transition-all duration-500 hover:shadow-[0_0_35px_rgba(0,200,255,0.18)]"
            >
              <h3 className="text-base sm:text-lg md:text-xl font-bold text-gray-900 dark:text-white mb-3">
                الرؤية
              </h3>
              <p className="text-xs sm:text-sm md:text-base text-gray-600 dark:text-gray-300 leading-relaxed whitespace-pre-line">
{`تتمثل رؤيتنا في توفير حلول تكييف متطورة وخدمات متميزة لعملائنا، وتحسين جودة الهواء والبيئة في المناطق التي نخدمها، والاستمرار في الابتكار والتطوير لتحقيق النجاح والنمو المستدام.
ونحن نؤمن بأن فريقنا هو الأساس لنجاحنا وتحقيق رؤيتنا، لذلك نعمل على توفير بيئة عمل إيجابية وملهمة ونشجع التعاون والابتكار والتحسين المستمر.`}
              </p>
            </motion.div>
          </Tilt>

          <Tilt
            tiltMaxAngleX={8}
            tiltMaxAngleY={8}
            perspective={1200}
            transitionSpeed={1200}
            glareEnable
            glareMaxOpacity={0.10}
            scale={1.02}
            className="rounded-xl"
          >
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="bg-white dark:bg-gray-800 p-4 sm:p-6 md:p-8 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 transition-all duration-500 hover:shadow-[0_0_35px_rgba(0,255,200,0.16)]"
            >
              <h3 className="text-base sm:text-lg md:text-xl font-bold text-gray-900 dark:text-white mb-3">
                الرسالة
              </h3>
              <p className="text-xs sm:text-sm md:text-base text-gray-600 dark:text-gray-300 leading-relaxed whitespace-pre-line">
{`تؤمن شركتنا بأهمية الابتكار والتطوير لتحسين أدائنا وتلبية متطلبات السوق الذي يشهد نمواً كبيراً بالتزامن مع رؤية 2030.
ولذلك نسعى دائماً إلى الاستمرار في تعزيز الجودة والكفاءة والاستدامة في جميع جوانب أعمالنا.
ونعمل بشكل مستمر على تحسين أدائنا وتطوير قدراتنا للحفاظ على مكانتنا كشركة رائدة في هذا المجال.`}
              </p>
            </motion.div>
          </Tilt>
        </div>

        {/* القيم (3D) */}
        <Tilt
          tiltMaxAngleX={6}
          tiltMaxAngleY={6}
          perspective={1100}
          transitionSpeed={1200}
          glareEnable
          glareMaxOpacity={0.08}
          scale={1.01}
          className="rounded-2xl"
        >
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.35 }}
            className="mb-12 bg-white/70 dark:bg-gray-800/60 backdrop-blur-sm p-6 sm:p-8 rounded-2xl shadow-lg border border-gray-200 dark:border-white/10 transition-all duration-500 hover:shadow-[0_0_35px_rgba(0,200,255,0.14)]"
          >
            <h3 className="text-base sm:text-lg md:text-xl font-bold text-gray-900 dark:text-white text-center mb-5 sm:mb-6">
              القيم
            </h3>
            <p className="text-center text-gray-600 dark:text-gray-300 max-w-3xl mx-auto text-xs sm:text-sm leading-relaxed whitespace-pre-line">
{`نحن نؤمن بأن القيم الأخلاقية تلعب دورًا حاسمًا في تحقيق النجاح والنمو المستدام، وهذا ما نسعى إليه في مؤسسة رياح الجليد.
نحرص كل الحرص على الإخلاص والتفاني في تقديم خدماتنا، ونسعى جاهدين لتحسين جودة الخدمات التي نقدمها.
وتلبية احتياجات عملائنا وتحسين خدمتهم، وهذا ينعكس بوضوح في شهاداتهم الإيجابية وثقتهم بنا.
ونحن بذلك نعتز ونفتخر بتواجدنا كرواد في هذا المجال.`}
            </p>
          </motion.div>
        </Tilt>

        {/* فريق العمل (3D Cards) */}
        {!loading && team.length > 0 && (
          <div className="mt-12">
            <h3 className="text-xl font-bold text-center text-gray-900 dark:text-white mb-6">
              فريق العمل
            </h3>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {team
                .slice()
                .sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
                .map((member, idx) => (
                  <motion.div
                    key={member.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.4, delay: 0.05 + idx * 0.04 }}
                  >
                    <Tilt
                      tiltMaxAngleX={10}
                      tiltMaxAngleY={10}
                      perspective={1200}
                      transitionSpeed={1200}
                      glareEnable
                      glareMaxOpacity={0.10}
                      scale={1.04}
                      className="rounded-xl"
                    >
                      <div className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-md border border-gray-200 dark:border-gray-700 transition-all duration-500 hover:shadow-[0_0_30px_rgba(0,200,255,0.18)]">
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
                      </div>
                    </Tilt>
                  </motion.div>
                ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}