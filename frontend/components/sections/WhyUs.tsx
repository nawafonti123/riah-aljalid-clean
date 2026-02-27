// WhyUs.tsx
'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const reasons = [
  {
    title: 'الدعم المستمر',
    description:
      'نحرص على توفير دعم فني متواصل لعملائنا قبل وبعد التركيب والصيانة، بهدف ضمان تحقيق أفضل تجربة ممكنة لعملائنا وتلبية احتياجاتهم ومتطلباتهم بشكل فعال.',
    icon: '🔧',
  },
  {
    title: 'الخبرة',
    description:
      'لدينا فريق متخصص ومحترف من المهندسين والفنيين الذين يتمتعون بخبرة طويلة واسعة النطاق في مجال التكييف والتبريد، مما يؤهلهم للعمل على مشاريع مختلفة وتقديم الحلول الابتكارية والفعالة لتلبية احتياجات عملائنا.',
    icon: '👨‍🔧',
  },
  {
    title: 'الضمان',
    description:
      'نحن نقدم ضمانات على منتجاتنا وخدماتنا، حيث نحرص على ضمان أن منتجاتنا تلبي أعلى معايير الجودة والمتطلبات الفنية، وتعمل بكفاءة عالية وتدوم لفترة طويلة. ونقدم الدعم الفني والإصلاحات اللازمة لتلبية احتياجات عملائنا بشكل كامل.',
    icon: '🛡️',
  },
  {
    title: 'الجودة',
    description:
      'نلتزم بتقديم أعلى مستوى من الجودة في المواد والخدمات التي نقدمها لعملائنا، حيث نولي أهمية كبيرة لتوفير المنتجات والخدمات ذات الجودة العالية بهدف تحقيق الرضا الكامل لعملائنا.',
    icon: '⭐',
  },
];

export default function WhyUs() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section
      ref={ref}
      className="py-12 sm:py-16 md:py-20 bg-gray-50 dark:bg-gray-900 transition-colors duration-300"
    >
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
            لماذا تختار رياح الجليد؟
          </h2>
          <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 mt-2">
            هناك العديد من الأسباب التي تجعل شركتنا الخيار الأمثل لعملائنا ومنها:
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {reasons.map((reason, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700"
            >
              <div className="text-3xl mb-3">{reason.icon}</div>
              <h3 className="text-base sm:text-lg font-bold text-gray-900 dark:text-white mb-2">
                {reason.title}
              </h3>
              <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                {reason.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}