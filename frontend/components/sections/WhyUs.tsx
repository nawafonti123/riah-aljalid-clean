// frontend/components/sections/WhyUs.tsx
'use client';

import { useEffect, useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { publicApi } from '@/lib/api';
import { FaHeadset, FaUsers, FaShieldAlt, FaStar } from 'react-icons/fa';
import Image from 'next/image';

interface SiteSettings {
  whyUsImage?: string | null;
}

const reasons = [
  {
    icon: FaHeadset,
    title: 'الدعم المستمر',
    description:
      'نحرص على توفير دعم فني متواصل لعملائنا قبل وبعد التركيب والصيانة، بهدف ضمان تحقيق أفضل تجربة ممكنة لعملائنا وتلبية احتياجاتهم ومتطلباتهم بشكل فعال.',
  },
  {
    icon: FaUsers,
    title: 'الخبرة',
    description:
      'لدينا فريق متخصص ومحترف من المهندسين والفنيين الذين يتمتعون بخبرة طويلة واسعة النطاق في مجال التكييف والتبريد، مما يؤهلهم للعمل على مشاريع مختلفة وتقديم الحلول الابتكارية والفعالة لتلبية احتياجات عملائنا.',
  },
  {
    icon: FaShieldAlt,
    title: 'الضمان',
    description:
      'نحن نقدم ضمانات على منتجاتنا وخدماتنا، حيث نحرص على ضمان أن منتجاتنا تلبي أعلى معايير الجودة والمتطلبات الفنية، وتعمل بكفاءة عالية وتدوم لفترة طويلة. ونقدم الدعم الفني والإصلاحات اللازمة لتلبية احتياجات عملائنا بشكل كامل.',
  },
  {
    icon: FaStar,
    title: 'الجودة',
    description:
      'نلتزم بتقديم أعلى مستوى من الجودة في المواد والخدمات التي نقدمها لعملائنا، حيث نولي أهمية كبيرة لتوفير المنتجات والخدمات ذات الجودة العالية بهدف تحقيق الرضا الكامل لعملائنا.',
  },
];

export default function WhyUs() {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });

  useEffect(() => {
    const run = async () => {
      try {
        // أولوية: صورة محددة من لوحة الإدارة (settings.whyUsImage)
        const settings = (await publicApi.getSettings().catch(() => null)) as SiteSettings | null;
        if (settings?.whyUsImage) {
          setImageUrl(settings.whyUsImage);
          return;
        }

        // توافق خلفي: إذا ما تم تحديدها من الإعدادات، نحاول أخذها من Company Images (category = why-us)
        const images = await publicApi.getCompanyImages().catch(() => []);
        const found = images?.find?.((img: any) => img?.category === 'why-us')?.image;
        setImageUrl(found || null);
      } catch (e) {
        console.error('Error fetching WhyUs image:', e);
      } finally {
        setLoading(false);
      }
    };

    run();
  }, []);

  return (
    <section
      ref={ref}
      className="py-12 sm:py-16 md:py-20 bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-[#0F2027] transition-colors duration-300 overflow-hidden"
    >
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-10"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
            لماذا تختار رياح الجليد؟
          </h2>
          <p className="mt-3 text-sm sm:text-base text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            نلتزم بالجودة والاحترافية لتقديم تجربة مريحة ونتائج تدوم.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-6 lg:gap-10 items-center">
          {/* الكروت */}
          <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
            {reasons.map((reason, index) => {
              const Icon = reason.icon;
              return (
                <motion.div
                  key={reason.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.45, delay: 0.15 + index * 0.08 }}
                  className="bg-white dark:bg-gray-800 p-5 sm:p-6 rounded-2xl shadow-lg border border-gray-200 dark:border-white/10"
                >
                  <div className="w-11 h-11 rounded-xl bg-[#01AEBE]/10 dark:bg-[#00c6ff]/10 flex items-center justify-center mb-4">
                    <Icon className="text-[#01AEBE] dark:text-[#00c6ff] text-xl" />
                  </div>
                  <h3 className="font-bold text-gray-900 dark:text-white mb-2">{reason.title}</h3>
                  <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                    {reason.description}
                  </p>
                </motion.div>
              );
            })}
          </div>

          {/* الصورة */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative rounded-3xl overflow-hidden border border-gray-200 dark:border-white/10 bg-gray-100 dark:bg-white/5 min-h-[320px]"
          >
            {!loading && (
              <Image
                src={imageUrl || '/logo.png'}
                alt="لماذا تختار رياح الجليد"
                fill
                sizes="(max-width: 1024px) 100vw, 520px"
                className="object-cover"
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-tr from-black/30 via-transparent to-transparent" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}