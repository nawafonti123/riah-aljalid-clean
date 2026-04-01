'use client';

import type { Metadata } from 'next';
import { useEffect, useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { publicApi } from '@/lib/api';
import ServiceCard from '@/components/sections/ServiceCard';
import { FaWrench } from 'react-icons/fa';

export const metadata: Metadata = {
  title: 'الخدمات',
  description:
    'خدمات رياح الجليد في تركيب وصيانة وتنظيف المكيفات والتكييف المركزي والدكت والتهوية في الرياض.',
  alternates: {
    canonical: '/services',
  },
};

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
    publicApi
      .getServices()
      .then((data) => {
        const sorted = [...data].sort((a: Service, b: Service) => a.order - b.order);
        setServices(sorted);
      })
      .catch((err) => {
        console.error(err);
        setServices([]);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <Navbar />

      <main className="min-h-screen pt-32 pb-20">
        <section className="container-main">
          <div className="rounded-[32px] border border-cyan-400/10 bg-[#081427]/90 p-8 sm:p-10 shadow-[0_15px_50px_rgba(0,0,0,0.25)]">
            <div className="max-w-4xl">
              <span className="inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-2 text-cyan-300 font-bold text-sm">
                <FaWrench />
                خدماتنا
              </span>

              <h1 className="mt-5 text-4xl sm:text-5xl font-extrabold text-white leading-tight">
                خدمات احترافية في
                <span className="block text-cyan-400">التكييف والتبريد والتهوية</span>
              </h1>

              <p className="mt-6 text-lg leading-9 text-white/80">
                نقدم حلولًا متكاملة لتلبية احتياجات العملاء في المنازل والشركات
                والمشاريع، مع الالتزام بالجودة وسرعة التنفيذ وأفضل المعايير الفنية.
              </p>
            </div>
          </div>
        </section>

        <section className="container-main mt-10">
          {loading ? (
            <div className="rounded-[28px] border border-cyan-400/10 bg-[#0b1830] p-10 text-center text-white text-xl font-bold">
              جاري تحميل الخدمات...
            </div>
          ) : services.length > 0 ? (
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {services.map((service) => (
                <ServiceCard key={service.id} service={service} />
              ))}
            </div>
          ) : (
            <div className="rounded-[28px] border border-cyan-400/10 bg-[#0b1830] p-10 text-center text-white/80 text-lg">
              لا توجد خدمات متاحة حاليًا.
            </div>
          )}
        </section>

        <section className="container-main mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {[
            'تركيب وصيانة المكيفات السبليت والشباك',
            'تنفيذ وصيانة أنظمة التكييف المركزي',
            'تصنيع وتركيب الدكت ومخارج الهواء',
            'عقود صيانة دورية للمنازل والشركات',
          ].map((item, index) => (
            <div
              key={index}
              className="rounded-[28px] border border-cyan-400/10 bg-[#0b1830] p-6 text-white"
            >
              <div className="text-cyan-300 font-extrabold text-xl mb-3">
                خدمة {index + 1}
              </div>
              <p className="text-white/75 leading-8">{item}</p>
            </div>
          ))}
        </section>
      </main>

      <Footer />
    </>
  );
}