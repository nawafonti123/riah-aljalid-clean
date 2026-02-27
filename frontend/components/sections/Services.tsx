// Services.tsx
'use client';

import { useEffect, useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { publicApi } from '@/lib/api';
import ServiceCard from './ServiceCard';
import Image from 'next/image';

interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
  order: number;
}

interface ServiceDetail {
  id: string;
  title: string;
  description: string;
  image?: string;
  order: number;
  serviceId: string;
}

export default function Services() {
  const [services, setServices] = useState<Service[]>([]);
  const [details, setDetails] = useState<Record<string, ServiceDetail[]>>({});
  const [loading, setLoading] = useState(true);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.1 });

  useEffect(() => {
    Promise.all([publicApi.getServices(), publicApi.getServiceDetails()])
      .then(([servicesData, detailsData]) => {
        setServices(servicesData.sort((a, b) => a.order - b.order));
        const grouped = detailsData.reduce((acc, detail) => {
          if (!acc[detail.serviceId]) acc[detail.serviceId] = [];
          acc[detail.serviceId].push(detail);
          return acc;
        }, {} as Record<string, ServiceDetail[]>);
        setDetails(grouped);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (loading)
    return (
      <div className="text-center py-12 text-gray-600 dark:text-gray-300">
        جاري التحميل...
      </div>
    );

  return (
    <section
      id="services"
      ref={ref}
      className="py-12 sm:py-16 md:py-20 bg-gradient-to-b from-gray-50 to-white dark:from-[#0F2027] dark:to-[#203A43] transition-colors duration-300"
    >
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
            خدماتنا
          </h2>
          <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 mt-2">
            تقدم شركتنا خدمات عالية الجودة وشاملة لتلبية احتياجات عملائنا
          </p>
        </motion.div>

        {/* الخدمات الرئيسية */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-8 mb-16">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <ServiceCard {...service} />
            </motion.div>
          ))}
        </div>

        {/* تفاصيل الخدمات مع الصور */}
        {Object.entries(details).map(([serviceId, detailList]) => {
          const service = services.find((s) => s.id === serviceId);
          if (!service || detailList.length === 0) return null;
          return (
            <div key={serviceId} className="mb-16">
              <motion.h3
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5 }}
                className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center"
              >
                {service.title} - تفاصيل
              </motion.h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {detailList.map((detail, idx) => (
                  <motion.div
                    key={detail.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.4, delay: 0.1 * idx }}
                    className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700"
                  >
                    {detail.image && (
                      <div className="relative w-full h-40 mb-3">
                        <Image
                          src={detail.image}
                          alt={detail.title}
                          fill
                          className="object-cover rounded-lg"
                        />
                      </div>
                    )}
                    <h4 className="text-base font-bold text-gray-900 dark:text-white mb-2">
                      {detail.title}
                    </h4>
                    <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300">
                      {detail.description}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          );
        })}

        {/* قائمة المشاريع التي نخدمها */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center mt-12"
        >
          <p className="text-xs sm:text-sm text-[#01AEBE] dark:text-[#00c6ff] bg-[#01AEBE]/10 dark:bg-[#00c6ff]/10 inline-block px-4 py-2 rounded-full">
            جامعات - مدارس - قصور - فلل - كافيهات - فنادق - أبراج
          </p>
          <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 mt-2">
            أسعار خاصة بالمشاريع
          </p>
        </motion.div>
      </div>
    </section>
  );
}