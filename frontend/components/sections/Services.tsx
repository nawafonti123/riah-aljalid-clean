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
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.1 });

  useEffect(() => {
    publicApi.getServices()
      .then(data => {
        // ترتيب الخدمات حسب حقل order
        const sorted = data.sort((a: Service, b: Service) => a.order - b.order);
        setServices(sorted);
      })
      .catch(err => {
        console.error('Error fetching services:', err);
        // في حالة الخطأ، استخدم بيانات افتراضية (اختياري)
        setServices([]);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white dark:from-[#0F2027] dark:to-[#203A43]">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center text-gray-900 dark:text-white mb-12">خدماتنا</h2>
          <div className="text-center text-gray-600 dark:text-gray-300">جاري التحميل...</div>
        </div>
      </section>
    );
  }

  return (
    <section id="services" ref={ref} className="py-12 sm:py-16 md:py-20 bg-gradient-to-b from-gray-50 to-white dark:from-[#0F2027] dark:to-[#203A43] transition-colors duration-300">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-8 sm:mb-10"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">خدماتنا</h2>
          <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 mt-2">نقدم حلولاً متكاملة ومتطورة في مجال التكييف والتبريد</p>
        </motion.div>

        {services.length === 0 ? (
          <div className="text-center text-gray-500 dark:text-gray-400 py-10">
            لا توجد خدمات متاحة حالياً
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-8">
            {services.map((service, index) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <ServiceCard {...service} />
              </motion.div>
            ))}
          </div>
        )}

        {/* قائمة المشاريع التي نخدمها (ثابتة من ملف PDF) */}
        <div className="text-center mt-12">
          <p className="text-xs sm:text-sm text-[#01AEBE] dark:text-[#00c6ff] bg-[#01AEBE]/10 dark:bg-[#00c6ff]/10 inline-block px-4 py-2 rounded-full">
            جامعات - مدارس - قصور - فلل - كافيهات - فنادق - أبراج
          </p>
          <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 mt-2">أسعار خاصة بالمشاريع</p>
        </div>
      </div>
    </section>
  );
}