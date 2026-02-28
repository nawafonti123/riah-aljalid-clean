'use client';

import { useEffect, useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { publicApi } from '@/lib/api';
import { FaHeadset, FaUsers, FaShieldAlt, FaStar } from 'react-icons/fa';
import Image from 'next/image';
import Tilt from 'react-parallax-tilt';

interface SiteSettings {
  whyUsImage?: string | null;
}

const reasons = [
  {
    icon: FaHeadset,
    title: 'الدعم المستمر',
    description: 'نحرص على توفير دعم فني متواصل لعملائنا قبل وبعد التركيب والصيانة لضمان أفضل تجربة ممكنة.',
  },
  {
    icon: FaUsers,
    title: 'الخبرة',
    description: 'فريق متخصص يتمتع بخبرة طويلة في مجال التكييف والتبريد وتقديم الحلول المبتكرة.',
  },
  {
    icon: FaShieldAlt,
    title: 'الضمان',
    description: 'نقدم ضمانات حقيقية على منتجاتنا وخدماتنا مع دعم فني متكامل.',
  },
  {
    icon: FaStar,
    title: 'الجودة',
    description: 'نلتزم بأعلى معايير الجودة في المواد والخدمات لضمان رضا عملائنا.',
  },
];

export default function WhyUs() {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    const run = async () => {
      const settings = (await publicApi.getSettings().catch(() => null)) as SiteSettings | null;
      setImageUrl(settings?.whyUsImage || '/logo.png');
    };
    run();
  }, []);

  return (
    <section
      ref={ref}
      className="py-20 bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-[#0F2027] overflow-x-clip"
    >
      <div className="container mx-auto px-4 max-w-full overflow-x-clip">
        <div className="text-center mb-14">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white">لماذا تختار رياح الجليد؟</h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-14 items-center">
          {/* الكروت 3D */}
          <div className="grid sm:grid-cols-2 gap-8">
            {reasons.map((reason, index) => {
              const Icon = reason.icon;

              return (
                <motion.div
                  key={reason.title}
                  initial={{ opacity: 0, y: 30 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="max-w-full"
                >
                  {/* wrapper يقص أي زيادة تسبب scroll */}
                  <div className="max-w-full overflow-hidden rounded-2xl">
                    <Tilt
                      tiltMaxAngleX={12}
                      tiltMaxAngleY={12}
                      perspective={1200}
                      transitionSpeed={1200}
                      glareEnable
                      glareMaxOpacity={0.15}
                      // ✅ scale على الديسكتوب فقط، الموبايل 1.0 عشان ما يسوي overflow
                      scale={1.0}
                      className="rounded-2xl w-full"
                    >
                      {/* scale للهوفر فقط وعلى الشاشات الكبيرة */}
                      <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-2xl border border-gray-200 dark:border-white/10 transition-all duration-500 hover:shadow-[0_0_50px_rgba(0,200,255,0.25)] lg:hover:scale-[1.03]">
                        <div className="w-14 h-14 rounded-xl bg-[#01AEBE]/10 flex items-center justify-center mb-6">
                          <Icon className="text-[#01AEBE] text-2xl" />
                        </div>

                        <h3 className="font-bold text-gray-900 dark:text-white mb-3 text-lg">{reason.title}</h3>

                        <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">{reason.description}</p>
                      </div>
                    </Tilt>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* الصورة */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7 }}
            className="max-w-full"
          >
            <div className="max-w-full overflow-hidden rounded-3xl">
              <Tilt
                tiltMaxAngleX={6}
                tiltMaxAngleY={6}
                perspective={1500}
                transitionSpeed={1200}
                glareEnable
                glareMaxOpacity={0.08}
                scale={1.0}
              >
                <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-white/10 max-w-full">
                  <Image
                    src={imageUrl || '/logo.png'}
                    alt="Why Us"
                    width={600}
                    height={500}
                    className="object-cover w-full h-[320px] sm:h-[380px] lg:h-[400px]"
                  />
                </div>
              </Tilt>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}