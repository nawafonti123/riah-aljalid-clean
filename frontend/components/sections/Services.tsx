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
      .then(data => setServices(data.sort((a: Service, b: Service) => a.order - b.order)))
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, []);

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

        {loading ? (
          <div className="text-center text-gray-600 dark:text-gray-300">جاري التحميل...</div>
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
      </div>
    </section>
  );
}
