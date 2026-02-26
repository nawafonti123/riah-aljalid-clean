// frontend/components/sections/Services.tsx
'use client';

import { useEffect, useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { publicApi } from '@/lib/api';
import ServiceCard from './ServiceCard';

interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
  order: number;
}

export default function Services() {
  const [services, setServices] = useState<Service[]>([
    {
      id: '1',
      title: 'التوريد',
      description: 'نحن نقدم خدمات توريد وتركيب الجريلات ذات الجودة العالية، حيث نولي اهتمامًا كبيرًا لتلبية متطلبات عملائنا وضمان رضاهم التام. ونحرص على اختيار جريلات عالية الجودة المصنوعة تتميز بمتانتها وقدرتها على تحمل ظروف التشغيل الصعبة وتوفير تدفق هواء مثالي.',
      icon: 'FaTruck',
      order: 1
    },
    {
      id: '2',
      title: 'التصنيع والتركيب',
      description: 'تصنيع وتركيب جميع مجاري الهواء (الدكت) والروند دكت الدائري بأعلى المواصفات ومن مواد ذات جودة عالية مقاومة للصدأ والحرارة والتآكل والتسريب يتم اختيارها بعناية لضمان جودة العمل.',
      icon: 'FaIndustry',
      order: 2
    },
    {
      id: '3',
      title: 'التصميم',
      description: 'نحن نقدم خدمات شاملة لعمل المشاريع، تصاميم ومخططات بالإضافة إلى تنفيذها بكفاءة وجودة عالية. لدينا فريق من المهندسين والمصممين ذوي الخبرة والمهارات العالية في مجال التصميم والهندسة، ونعمل بجد لتحقيق رؤية عملائنا وتلبية احتياجاتهم.',
      icon: 'FaRuler',
      order: 3
    }
  ]);
  const [loading, setLoading] = useState(false);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.1 });

  // لو كان عندك API حقيقي، استخدم هذا الكود بدلاً من البيانات الثابتة
  /*
  useEffect(() => {
    publicApi.getServices()
      .then(data => setServices(data.sort((a: Service, b: Service) => a.order - b.order)))
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, []);
  */

  return (
    <section id="services" ref={ref} className="py-12 sm:py-16 md:py-20 bg-gradient-to-b from-[#0F2027] to-[#203A43]">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-8 sm:mb-10"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white">خدماتنا</h2>
          <p className="text-sm sm:text-base text-gray-300 mt-2">تقدم شركتنا خدمات عالية الجودة وشاملة لتلبية احتياجات عملائنا</p>
        </motion.div>

        {loading ? (
          <div className="text-center text-white text-sm">جاري التحميل...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {services.map((service, index) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 15 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <ServiceCard {...service} />
              </motion.div>
            ))}
          </div>
        )}

        {/* أنواع المشاريع */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-10 text-center"
        >
          <p className="text-xs sm:text-sm text-[#00c6ff] bg-white/5 inline-block px-4 py-2 rounded-full">
            جامعات - مدارس - قصور - فلل - كافيهات - فنادق - أبراج
          </p>
          <p className="text-xs sm:text-sm text-gray-300 mt-2">أسعار خاصة بالمشاريع</p>
        </motion.div>
      </div>
    </section>
  );
}