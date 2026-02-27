// frontend/components/sections/WhyUs.tsx
'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { FaToolbox, FaUsers, FaShieldAlt, FaStar } from 'react-icons/fa';

const reasons = [
  {
    icon: FaToolbox,
    title: 'الدعم المستمر',
    description: 'دعم فني متواصل قبل وبعد التركيب والصيانة.'
  },
  {
    icon: FaUsers,
    title: 'الخبرة',
    description: 'فريق متخصص من المهندسين والفنيين.'
  },
  {
    icon: FaShieldAlt,
    title: 'الضمان',
    description: 'ضمانات على المنتجات والخدمات.'
  },
  {
    icon: FaStar,
    title: 'الجودة',
    description: 'أعلى مستوى من الجودة في المواد.'
  }
];

export default function WhyUs() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section ref={ref} className="py-12 sm:py-16 md:py-20 bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-8 sm:mb-10"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">لماذا تختار رياح الجليد؟</h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {reasons.map((reason, index) => {
            const Icon = reason.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 15 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="bg-white dark:bg-gray-800 p-4 sm:p-5 md:p-6 rounded-xl text-center hover:scale-105 transition-transform shadow-lg"
              >
                <div className="flex justify-center mb-2 md:mb-3">
                  <Icon className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-[#01AEBE] dark:text-[#00c6ff]" />
                </div>
                <h3 className="text-sm sm:text-base md:text-lg font-bold text-gray-900 dark:text-white mb-1 md:mb-2">{reason.title}</h3>
                <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 leading-relaxed">{reason.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
