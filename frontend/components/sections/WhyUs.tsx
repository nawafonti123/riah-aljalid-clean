// frontend/components/sections/WhyUs.tsx
'use client';

import { useEffect, useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { publicApi } from '@/lib/api';
import { FaHeadset, FaUsers, FaShieldAlt, FaStar } from 'react-icons/fa';

interface CompanyImage {
  id: string;
  title?: string;
  image: string;
  category?: string;
  order: number;
}

const reasons = [
  {
    icon: FaHeadset,
    title: 'الدعم المستمر',
    description: 'نحرص على توفير دعم فني متواصل لعملائنا قبل وبعد التركيب والصيانة، بهدف ضمان تحقيق أفضل تجربة ممكنة لعملائنا وتلبية احتياجاتهم ومتطلباتهم بشكل فعال.'
  },
  {
    icon: FaUsers,
    title: 'الخبرة',
    description: 'لدينا فريق متخصص ومحترف من المهندسين والفنيين الذين يتمتعون بخبرة طويلة واسعة النطاق في مجال التكييف والتبريد، مما يؤهلهم للعمل على مشاريع مختلفة وتقديم الحلول الابتكارية والفعالة لتلبية احتياجات عملائنا.'
  },
  {
    icon: FaShieldAlt,
    title: 'الضمان',
    description: 'نحن نقدم ضمانات على منتجاتنا وخدماتنا، حيث نحرص على ضمان أن منتجاتنا تلبي أعلى معايير الجودة والمتطلبات الفنية، وتعمل بكفاءة عالية وتدوم لفترة طويلة. ونقدم الدعم الفني والإصلاحات اللازمة لتلبية احتياجات عملائنا بشكل كامل.'
  },
  {
    icon: FaStar,
    title: 'الجودة',
    description: 'نلتزم بتقديم أعلى مستوى من الجودة في المواد والخدمات التي نقدمها لعملائنا، حيث نولي أهمية كبيرة لتوفير المنتجات والخدمات ذات الجودة العالية بهدف تحقيق الرضا الكامل لعملائنا.'
  }
];

export default function WhyUs() {
  const [whyUsImage, setWhyUsImage] = useState<CompanyImage | null>(null);
  const [loading, setLoading] = useState(true);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });

  useEffect(() => {
    // جلب الصور من API وتصفية الصورة التي تحمل التصنيف "why-us"
    publicApi.getCompanyImages()
      .then((images: CompanyImage[]) => {
        const found = images.find(img => img.category === 'why-us');
        setWhyUsImage(found || null);
      })
      .catch(err => console.error('Error fetching company images:', err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <section ref={ref} className="py-12 sm:py-16 md:py-20 bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-[#0F2027] transition-colors duration-300 overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-8 sm:mb-10"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">لماذا تختار رياح الجليد؟</h2>
          <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 mt-2">هناك العديد من الأسباب التي تجعل شركتنا الخيار الأمثل لعملائنا ومنها:</p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 items-start">
          {/* الصورة على اليسار (لأن RTL، اليمين هو اليسار بصرياً) */}
          {!loading && whyUsImage && (
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative h-full min-h-[400px] rounded-2xl overflow-hidden shadow-2xl order-2 lg:order-1"
            >
              <img
                src={whyUsImage.image}
                alt={whyUsImage.title || 'رياح الجليد'}
                className="w-full h-full object-cover"
              />
              {whyUsImage.title && (
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                  <p className="text-white text-sm">{whyUsImage.title}</p>
                </div>
              )}
            </motion.div>
          )}

          {/* النصوص على اليمين */}
          <div className="space-y-6 order-1 lg:order-2">
            {reasons.map((reason, index) => {
              const Icon = reason.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-all"
                >
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[#01AEBE] to-[#9DCC40] dark:from-[#00c6ff] dark:to-[#2C5364] flex items-center justify-center">
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mb-2">{reason.title}</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">{reason.description}</p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}