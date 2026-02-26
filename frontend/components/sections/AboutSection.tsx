// frontend/components/sections/AboutSection.tsx
'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { FaEye, FaBullseye, FaHandsHelping, FaStar, FaToolbox } from 'react-icons/fa';

export default function AboutSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section id="about" ref={ref} className="py-12 sm:py-16 md:py-20 bg-gradient-to-b from-[#203A43] to-[#2C5364]">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-8 sm:mb-10"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white">عن رياح الجليد</h2>
        </motion.div>

        {/* نبذة عنا */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="glass-card p-6 sm:p-8 rounded-2xl mb-10 text-center"
        >
          <p className="text-sm sm:text-base text-gray-300 leading-relaxed">
            نحن مؤسسة سعودية متخصصة في تركيب وصيانة أنظمة التكييف والتهوية والتبريد باستخدام التقنيات الحديثة
            والمبتكرة. نحرص على تحقيق أفضل النتائج بأفضل الأسعار وفي إطار الالتزام بالمعايير الصحية والبيئية، وذلك لتوفير
            بيئة مريحة وصحية لعملائنا، سواء في المنازل أو الشركات أو المصانع.
            يتميز فريق عملنا بالكفاءة والاحترافية، ما يجعلنا من الرواد في هذا المجال. ونحن نهدف دائمًا إلى تحسين خدماتنا
            وتلبية احتياجات عملائنا بأفضل الطرق الممكنة، وذلك لضمان رضاهم التام عن خدماتنا.
          </p>
        </motion.div>

        {/* الرؤية والرسالة */}
        <div className="grid md:grid-cols-2 gap-4 sm:gap-6 mb-10">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="glass-card p-4 sm:p-6 md:p-8 rounded-xl"
          >
            <div className="flex items-center gap-2 md:gap-3 mb-3 md:mb-4">
              <FaEye className="w-5 h-5 md:w-6 md:h-6 text-[#00c6ff]" />
              <h3 className="text-base sm:text-lg md:text-xl font-bold text-white">رؤيتنا</h3>
            </div>
            <p className="text-xs sm:text-sm md:text-base text-gray-300 leading-relaxed">
              تتجلى رؤيتنا في توفير حلول تكييف متطورة وخدمات مميزة لعملائنا، وتحسين جودة الهواء والبيئة
              في المناطق التي نخدمها، والاستمرار في الابتكار والتطوير لتحقيق النجاح والنمو المستدام.
              نؤمن بأن فريقنا هو الأساس لنجاحنا وتحقيق رؤيتنا، لذلك نعمل على توفير بيئة عمل إيجابية
              وملهمة ونشجع التعاون والابتكار والتحسين المستمر.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="glass-card p-4 sm:p-6 md:p-8 rounded-xl"
          >
            <div className="flex items-center gap-2 md:gap-3 mb-3 md:mb-4">
              <FaBullseye className="w-5 h-5 md:w-6 md:h-6 text-[#00c6ff]" />
              <h3 className="text-base sm:text-lg md:text-xl font-bold text-white">رسالتنا</h3>
            </div>
            <p className="text-xs sm:text-sm md:text-base text-gray-300 leading-relaxed">
              تؤمن شركتنا بأهمية الابتكار والتطوير لتحسين أدائنا وتلبية متطلبات السوق الذي يشهد نموًا كبيرًا
              بالتزامن مع رؤية 2030. ولذلك نسعى دائمًا إلى الاستمرار في تعزيز الجودة والكفاءة والاستدامة
              في جميع جوانب أعمالنا، ونعمل بشكل مستمر على تحسين أدائنا وتطوير قدراتنا للحفاظ على مكانتنا
              كشركة رائدة في هذا المجال.
            </p>
          </motion.div>
        </div>

        {/* القيم */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <h3 className="text-base sm:text-lg md:text-xl font-bold text-white text-center mb-5 sm:mb-6">قيمنا</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
            {[
              { icon: FaHandsHelping, title: 'الإخلاص والتفاني', desc: 'نكرس جهودنا لخدمة عملائنا.' },
              { icon: FaStar, title: 'الجودة', desc: 'نلتزم بأعلى معايير الجودة.' },
              { icon: FaToolbox, title: 'الابتكار', desc: 'نطور حلولاً جديدة ومبتكرة.' }
            ].map((item, i) => (
              <div key={i} className="glass-card p-3 sm:p-4 md:p-5 rounded-lg text-center">
                <div className="flex justify-center mb-2">
                  <item.icon className="w-5 h-5 sm:w-6 sm:h-6 text-[#00c6ff]" />
                </div>
                <h4 className="text-xs sm:text-sm font-bold text-white mb-1">{item.title}</h4>
                <p className="text-[10px] sm:text-xs text-gray-300">{item.desc}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}