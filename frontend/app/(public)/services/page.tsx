'use client';

import { useEffect, useState } from 'react';
import { publicApi } from '@/lib/api';
import ServiceCard from '@/components/sections/ServiceCard';

interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
  order: number;
}

export default function ServicesPage() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    publicApi.getServices()
      .then(data => setServices(data.sort((a: Service, b: Service) => a.order - b.order)))
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0F2027] to-[#2C5364] text-white">
      {/* الهيدر */}
      <div className="relative h-[300px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-black/50 z-10"></div>
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[url('/images/services-bg.jpg')] bg-cover bg-center"></div>
        </div>
        <h1 className="relative z-20 text-5xl md:text-6xl font-bold text-center">خدماتنا</h1>
      </div>

      {/* مقدمة الخدمات */}
      <div className="container mx-auto px-6 py-16">
        <div className="text-center mb-16">
          <p className="text-xl text-gray-200 max-w-3xl mx-auto">
            تقدم شركتنا خدمات عالية الجودة وشاملة لتلبية احتياجات عملائنا في مجال التكييف المركزي والتهوية والتبريد.
          </p>
        </div>

        {/* قائمة الخدمات الديناميكية من لوحة الإدارة */}
        {loading ? (
          <div className="text-center py-10">جاري تحميل الخدمات...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map(service => (
              <ServiceCard key={service.id} {...service} />
            ))}
          </div>
        )}

        {/* لماذا نحن - من ملف PDF */}
        <div className="mt-20">
          <h2 className="text-3xl font-bold mb-12 text-[#00c6ff] text-center">لماذا نحن؟</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="glass-card p-8 rounded-2xl">
              <div className="text-4xl mb-4">🔧</div>
              <h3 className="text-xl font-bold mb-4">الدعم المستمر</h3>
              <p className="text-gray-300">
                نحرص على توفير دعم فني متواصل لعملائنا قبل وبعد التركيب والصيانة، بهدف ضمان تحقيق أفضل تجربة 
                ممكنة لعملائنا وتلبية احتياجاتهم ومتطلباتهم بشكل فعال.
              </p>
            </div>
            <div className="glass-card p-8 rounded-2xl">
              <div className="text-4xl mb-4">👨‍🔧</div>
              <h3 className="text-xl font-bold mb-4">الخبرة</h3>
              <p className="text-gray-300">
                لدينا فريق متخصص ومحترف من المهندسين والفنيين الذين يتمتعون بخبرة طويلة واسعة النطاق في مجال 
                التكييف والتبريد، مما يؤهلهم للعمل على مشاريع مختلفة وتقديم الحلول الابتكارية والفعالة 
                لتلبية احتياجات عملائنا.
              </p>
            </div>
            <div className="glass-card p-8 rounded-2xl">
              <div className="text-4xl mb-4">✓</div>
              <h3 className="text-xl font-bold mb-4">الضمان</h3>
              <p className="text-gray-300">
                نحن نقدم ضمانات على منتجاتنا وخدماتنا، حيث نحرص على ضمان أن منتجاتنا تلبي أعلى معايير الجودة 
                والمتطلبات الفنية، وتعمل بكفاءة عالية وتدوم لفترة طويلة. ونقدم الدعم الفني والإصلاحات اللازمة 
                لتلبية احتياجات عملائنا بشكل كامل.
              </p>
            </div>
            <div className="glass-card p-8 rounded-2xl">
              <div className="text-4xl mb-4">⭐</div>
              <h3 className="text-xl font-bold mb-4">الجودة</h3>
              <p className="text-gray-300">
                نلتزم بتقديم أعلى مستوى من الجودة في المواد والخدمات التي نقدمها لعملائنا، حيث نولي أهمية كبيرة 
                لتوفير المنتجات والخدمات ذات الجودة العالية بهدف تحقيق الرضا الكامل لعملائنا.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}