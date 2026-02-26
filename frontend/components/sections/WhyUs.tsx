// frontend/components/sections/WhyUs.tsx
'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { FaToolbox, FaUsers, FaShieldAlt, FaStar } from 'react-icons/fa';

const reasons = [
  {
    icon: FaToolbox,
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
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section ref={ref} className="py-12 sm:py-16 md:py-20 bg-gradient-to-b from-[#0F2027] to-[#203A43]">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-8 sm:mb-10"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white">لماذا تختار رياح الجليد؟</h2>
          <p className="text-sm sm:text-base text-gray-300 mt-2">هناك العديد من الأسباب التي تجعل شركتنا الخيار الأمثل لعملائنا ومنها:</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          {reasons.map((reason, index) => {
            const Icon = reason.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 15 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="glass-card p-4 sm:p-5 md:p-6 rounded-xl text-center hover:scale-105 transition-transform"
              >
                <div className="flex justify-center mb-2 md:mb-3">
                  <Icon className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-[#00c6ff]" />
                </div>
                <h3 className="text-sm sm:text-base md:text-lg font-bold text-white mb-1 md:mb-2">{reason.title}</h3>
                <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">{reason.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}