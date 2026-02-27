// frontend/components/sections/Services.tsx
'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { FaTruck, FaIndustry, FaRuler, FaUniversity, FaSchool, FaLandmark, FaHome, FaCoffee, FaHotel, FaBuilding } from 'react-icons/fa';

// تعريف واجهات الخدمات الثابتة
interface StaticService {
  id: string;
  title: string;
  description: string;
  icon: JSX.Element;
  details: {
    title: string;
    description: string;
  }[];
}

// البيانات الثابتة للخدمات من ملف PDF
const servicesData: StaticService[] = [
  {
    id: '1',
    title: 'التوريد',
    icon: <FaTruck className="w-8 h-8 text-white" />,
    description: 'نحن نقدم خدمات توريد وتركيب الجريلات ذات الجودة العالية',
    details: [
      {
        title: 'جودة عالية',
        description: 'نولي اهتماماً كبيراً لتلبية متطلبات عملائنا وضمان رضاهم التام. نحرص على اختيار جريلات عالية الجودة المصنوعة تتميز بمتانتها وقدرتها على تحمل ظروف التشغيل الصعبة وتوفير تدفق هواء مثالي.'
      }
    ]
  },
  {
    id: '2',
    title: 'التصنيع والتركيب',
    icon: <FaIndustry className="w-8 h-8 text-white" />,
    description: 'تصنيع وتركيب جميع مجاري الهواء (الدكت) بأعلى المواصفات',
    details: [
      {
        title: 'مواصفات عالمية',
        description: 'تصنيع وتركيب مجاري الهواء الدكت والروند دكت الدائري بأعلى المواصفات ومن مواد ذات جودة عالية مقاومة للصدأ والحرارة والتآكل والتسريب. يتم اختيارها بعناية لضمان جودة العمل.'
      }
    ]
  },
  {
    id: '3',
    title: 'التصميم',
    icon: <FaRuler className="w-8 h-8 text-white" />,
    description: 'أفضل الأسعار وسرعة في التنفيذ بأيدي ماهرة تحت إشراف هندسي',
    details: [
      {
        title: 'خدمات شاملة',
        description: 'نقدم خدمات شاملة لعمل المشاريع، تصاميم ومخططات بالإضافة إلى تنفيذها بكفاءة وجودة عالية. لدينا فريق من المهندسين والمصممين ذوي الخبرة والمهارات العالية في مجال التصميم والهندسة، نعمل بجد لتحقيق رؤية عملائنا وتلبية احتياجاتهم.'
      }
    ]
  }
];

const projectIcons = [
  { icon: FaUniversity, name: 'جامعات' },
  { icon: FaSchool, name: 'مدارس' },
  { icon: FaLandmark, name: 'قصور' },
  { icon: FaHome, name: 'فلل' },
  { icon: FaCoffee, name: 'كافيهات' },
  { icon: FaHotel, name: 'فنادق' },
  { icon: FaBuilding, name: 'أبراج' },
];

export default function Services() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.1 });

  return (
    <section id="services" ref={ref} className="py-12 sm:py-16 md:py-20 bg-gradient-to-b from-gray-50 to-white dark:from-[#0F2027] dark:to-[#203A43] transition-colors duration-300">
      <div className="container mx-auto px-4">
        {/* عنوان القسم الرئيسي */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-8 sm:mb-10"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">خدماتنا</h2>
          <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 mt-2 max-w-3xl mx-auto">
            تقدم شركتنا خدمات عالية الجودة وشاملة لتلبية احتياجات عملائنا
          </p>
        </motion.div>

        {/* الخدمات الرئيسية - كروت */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-8 mb-16">
          {servicesData.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-white dark:bg-gray-800 p-4 sm:p-5 md:p-6 rounded-xl border border-gray-200 dark:border-gray-700 shadow-lg hover:shadow-xl transition-all h-full flex flex-col"
            >
              <div className="flex justify-center mb-2 md:mb-3">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[#01AEBE] to-[#9DCC40] dark:from-[#00c6ff] dark:to-[#2C5364] flex items-center justify-center text-white">
                  {service.icon}
                </div>
              </div>
              <h3 className="text-sm sm:text-base md:text-lg font-bold text-gray-900 dark:text-white mb-1 text-center">
                {service.title}
              </h3>
              <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 text-center flex-grow">
                {service.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* تفاصيل الخدمات مع النصوص الطويلة */}
        <div className="space-y-12">
          {servicesData.map((service, idx) => (
            <motion.div
              key={`details-${service.id}`}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.3 + idx * 0.1 }}
              className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#01AEBE] to-[#9DCC40] dark:from-[#00c6ff] dark:to-[#2C5364] flex items-center justify-center text-white">
                  {service.icon}
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white">
                  {service.title}
                </h3>
              </div>
              {service.details.map((detail, i) => (
                <div key={i} className="mb-3 last:mb-0">
                  <h4 className="text-base font-semibold text-[#01AEBE] dark:text-[#00c6ff] mb-2">
                    {detail.title}
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                    {detail.description}
                  </p>
                </div>
              ))}
            </motion.div>
          ))}
        </div>

        {/* قائمة المشاريع التي نخدمها - مع أيقونات احترافية */}
        <div className="text-center mt-12">
          <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 mb-4">أسعار خاصة بالمشاريع</p>
          <div className="flex flex-wrap justify-center gap-4 sm:gap-6">
            {projectIcons.map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className="flex flex-col items-center gap-2"
                >
                  <div className="w-12 h-12 rounded-full bg-[#01AEBE]/10 dark:bg-[#00c6ff]/10 flex items-center justify-center">
                    <Icon className="w-6 h-6 text-[#01AEBE] dark:text-[#00c6ff]" />
                  </div>
                  <span className="text-xs sm:text-sm text-gray-700 dark:text-gray-300">{item.name}</span>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}