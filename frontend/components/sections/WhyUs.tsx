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
  const [imageUrl, setImageUrl] = useState<string>('/logo.png');
  const [imgReady, setImgReady] = useState(false);

  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });

  useEffect(() => {
    const run = async () => {
      const settings = (await publicApi.getSettings().catch(() => null)) as SiteSettings | null;
      const url = (settings?.whyUsImage || '').trim();
      setImageUrl(url ? url : '/logo.png');
      setImgReady(true);
    };
    run();
  }, []);

  return (
    <section
      ref={ref}
      className="py-12 sm:py-16 md:py-20 bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-[#0F2027] overflow-x-clip"
    >
      <div className="container mx-auto px-4 max-w-full overflow-x-clip">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-8 sm:mb-12"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
            لماذا تختار رياح الجليد؟
          </h2>
          <p className="mt-3 text-sm sm:text-base text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            أسباب تجعلنا خيارك الأفضل في التكييف والتبريد
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start lg:items-center">
          {/* الكروت 3D */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            {reasons.map((reason, index) => {
              const Icon = reason.icon;

              return (
                <motion.div
                  key={reason.title}
                  initial={{ opacity: 0, y: 18 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.45, delay: 0.08 + index * 0.06 }}
                  className="max-w-full"
                >
                  <div className="max-w-full overflow-hidden rounded-2xl">
                    <Tilt
                      tiltMaxAngleX={10}
                      tiltMaxAngleY={10}
                      perspective={1100}
                      transitionSpeed={900}
                      glareEnable
                      glareMaxOpacity={0.12}
                      scale={1.0}
                      className="rounded-2xl w-full"
                    >
                      {/* ✅ تصغير على الجوال + تكبير لطيف على الديسكتوب */}
                      <div className="bg-white dark:bg-gray-800 p-4 sm:p-6 rounded-2xl shadow-lg border border-gray-200 dark:border-white/10 transition-all duration-500 hover:shadow-[0_0_45px_rgba(0,200,255,0.18)] lg:hover:scale-[1.02]">
                        <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-[#01AEBE]/10 dark:bg-[#00c6ff]/10 flex items-center justify-center mb-3 sm:mb-4">
                          <Icon className="text-[#01AEBE] dark:text-[#00c6ff] text-lg sm:text-xl" />
                        </div>

                        <h3 className="font-bold text-gray-900 dark:text-white mb-2 text-base sm:text-lg">
                          {reason.title}
                        </h3>

                        <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                          {reason.description}
                        </p>
                      </div>
                    </Tilt>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* الصورة */}
          <motion.div
            initial={{ opacity: 0, x: 22 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="max-w-full"
          >
            <div className="max-w-full overflow-hidden rounded-3xl">
              <Tilt
                tiltMaxAngleX={6}
                tiltMaxAngleY={6}
                perspective={1500}
                transitionSpeed={900}
                glareEnable
                glareMaxOpacity={0.08}
                scale={1.0}
              >
                {/* ✅ نستخدم fill + min-height عشان تضمن ظهورها */}
                <div className="relative rounded-3xl overflow-hidden shadow-xl border border-gray-200 dark:border-white/10 bg-gray-100 dark:bg-white/5 min-h-[220px] sm:min-h-[320px] lg:min-h-[400px]">
                  {/* لو الرابط خربان، نرجع للّوجو */}
                  <Image
                    src={imageUrl}
                    alt="لماذا تختار رياح الجليد"
                    fill
                    sizes="(max-width: 1024px) 100vw, 520px"
                    className="object-cover"
                    onError={() => setImageUrl('/logo.png')}
                    priority={false}
                  />
                  <div className="absolute inset-0 bg-gradient-to-tr from-black/25 via-transparent to-transparent" />
                  {!imgReady && (
                    <div className="absolute inset-0 flex items-center justify-center text-sm text-gray-500 dark:text-gray-300">
                      جاري تحميل الصورة...
                    </div>
                  )}
                </div>
              </Tilt>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}