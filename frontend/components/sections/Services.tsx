// frontend/components/sections/Services.tsx
'use client';

import { useEffect, useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { publicApi } from '@/lib/api';
import { FaTruck, FaIndustry, FaRuler, FaUniversity, FaSchool, FaLandmark, FaHome, FaCoffee, FaHotel, FaBuilding } from 'react-icons/fa';
import ServiceCard from './ServiceCard';

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

const projectIcons = [
  { icon: FaUniversity, name: 'جامعات' },
  { icon: FaSchool, name: 'مدارس' },
  { icon: FaLandmark, name: 'قصور' },
  { icon: FaHome, name: 'فلل' },
  { icon: FaCoffee, name: 'كافيهات' },
  { icon: FaHotel, name: 'فنادق' },
  { icon: FaBuilding, name: 'أبراج' },
];

// ... باقي الكود كما هو

export default function Services() {
  const [services, setServices] = useState<Service[]>([]);
  const [details, setDetails] = useState<Record<string, ServiceDetail[]>>({});
  const [loading, setLoading] = useState(true);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.1 });

  useEffect(() => {
    Promise.all([
      publicApi.getServices(),
      publicApi.getServiceDetails()
    ])
      .then(([servicesData, detailsData]) => {
        console.log('Services data:', servicesData);
        console.log('Details data:', detailsData);
        
        const sortedServices = servicesData.sort((a: Service, b: Service) => a.order - b.order);
        setServices(sortedServices);

        const groupedDetails = detailsData.reduce((acc: Record<string, ServiceDetail[]>, detail: ServiceDetail) => {
          if (!acc[detail.serviceId]) {
            acc[detail.serviceId] = [];
          }
          acc[detail.serviceId].push(detail);
          return acc;
        }, {});
        setDetails(groupedDetails);
      })
      .catch(err => {
        console.error('Error fetching services:', err);
        setServices([]);
        setDetails({});
      })
      .finally(() => setLoading(false));
  }, []);

  const serviceIcons: Record<string, JSX.Element> = {
    'التوريد': <FaTruck className="w-6 h-6" />,
    'التصنيع والتركيب': <FaIndustry className="w-6 h-6" />,
    'التصميم': <FaRuler className="w-6 h-6" />,
  };

  if (loading) {
    return (
      <section className="py-12 sm:py-16 md:py-20 bg-gradient-to-b from-gray-50 to-white dark:from-[#0F2027] dark:to-[#203A43]">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center text-gray-900 dark:text-white mb-12">خدماتنا</h2>
          <div className="text-center text-gray-600 dark:text-gray-300">جاري تحميل الخدمات...</div>
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
          <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 mt-2 max-w-3xl mx-auto">
            تقدم شركتنا خدمات عالية الجودة وشاملة لتلبية احتياجات عملائنا
          </p>
        </motion.div>

        {/* الخدمات الرئيسية - كروت */}
        {services.length === 0 ? (
          <div className="text-center text-gray-500 dark:text-gray-400 py-10 bg-white dark:bg-gray-800 rounded-xl shadow-md mb-10">
            <p className="text-lg mb-2">لا توجد خدمات متاحة حالياً</p>
            <p className="text-sm">يرجى إضافة خدمات من لوحة التحكم</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-8 mb-16">
            {services.map((service, index) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <ServiceCard 
                  title={service.title} 
                  description={service.description} 
                  icon={service.icon}
                  customIcon={serviceIcons[service.title]}
                />
              </motion.div>
            ))}
          </div>
        )}

        {/* تفاصيل الخدمات مع الصور */}
        {Object.entries(details).map(([serviceId, detailList]) => {
          const service = services.find(s => s.id === serviceId);
          if (!service || detailList.length === 0) return null;
          
          return (
            <div key={serviceId} className="mb-16">
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center border-b border-gray-200 dark:border-gray-700 pb-4">
                {service.title} - تفاصيل إضافية
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {detailList.map((detail) => (
                  <div 
                    key={detail.id} 
                    className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-all hover:scale-[1.02]"
                  >
                    {detail.image && (
                      <div className="w-full h-48 mb-3 overflow-hidden rounded-lg">
                        <img 
                          src={detail.image} 
                          alt={detail.title} 
                          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                          onError={(e) => {
                            console.error('Failed to load image:', detail.image);
                            e.currentTarget.style.display = 'none';
                          }}
                        />
                      </div>
                    )}
                    <h4 className="text-base font-bold text-gray-900 dark:text-white mb-2">{detail.title}</h4>
                    <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 leading-relaxed">{detail.description}</p>
                  </div>
                ))}
              </div>
            </div>
          );
        })}

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