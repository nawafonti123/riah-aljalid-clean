'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import Tilt from 'react-parallax-tilt';
import { FaTrophy, FaUsers, FaProjectDiagram, FaCalendarAlt } from 'react-icons/fa';

const achievements = [
  {
    icon: <FaTrophy className="w-8 h-8 sm:w-10 sm:h-10 text-[#01AEBE] dark:text-[#00c6ff]" />,
    value: '15+',
    label: 'عام من الخبرة',
    description: 'أكثر من 15 عاماً في مجال التكييف والتبريد',
  },
  {
    icon: <FaUsers className="w-8 h-8 sm:w-10 sm:h-10 text-[#01AEBE] dark:text-[#00c6ff]" />,
    value: '50+',
    label: 'فريق العمل',
    description: 'فريق متكامل من المهندسين والفنيين',
  },
  {
    icon: <FaProjectDiagram className="w-8 h-8 sm:w-10 sm:h-10 text-[#01AEBE] dark:text-[#00c6ff]" />,
    value: '200+',
    label: 'مشروع منجز',
    description: 'مشاريع ناجحة في مختلف المجالات',
  },
  {
    icon: <FaCalendarAlt className="w-8 h-8 sm:w-10 sm:h-10 text-[#01AEBE] dark:text-[#00c6ff]" />,
    value: '100%',
    label: 'رضا العملاء',
    description: 'نسبة رضا العملاء عن خدماتنا',
  },
];

export default function Achievements() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section
      ref={ref}
      className="py-12 sm:py-16 md:py-20 bg-gradient-to-b from-white to-gray-50 dark:from-[#1a2f38] dark:to-[#0F2027] transition-colors duration-300"
    >
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-8 sm:mb-10"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
            إنجازات رياح الجليد
          </h2>
          <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 mt-2">
            مسيرة حافلة بالنجاحات والإنجازات في مجال التكييف والتبريد
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {achievements.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.08 }}
            >
              <Tilt
                tiltMaxAngleX={10}
                tiltMaxAngleY={10}
                perspective={1200}
                transitionSpeed={1200}
                glareEnable
                glareMaxOpacity={0.12}
                scale={1.04}
                className="rounded-xl"
              >
                <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 text-center transition-all duration-500 hover:shadow-[0_0_40px_rgba(0,200,255,0.18)]">
                  <div className="flex justify-center mb-3">{item.icon}</div>
                  <div className="text-3xl sm:text-4xl font-bold text-[#01AEBE] dark:text-[#00c6ff] mb-2">
                    {item.value}
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-gray-900 dark:text-white mb-2">{item.label}</h3>
                  <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300">{item.description}</p>
                </div>
              </Tilt>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}