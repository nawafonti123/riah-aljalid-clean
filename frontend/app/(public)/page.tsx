// frontend/app/(public)/page.tsx
import { Suspense } from 'react';
import { publicApi } from '@/lib/api';
import MaintenancePage from './maintenance/page';

import Hero from '@/components/sections/Hero';
import WhyUs from '@/components/sections/WhyUs';
import Achievements from '@/components/sections/Achievements';
import AboutSection from '@/components/sections/AboutSection';
import Services from '@/components/sections/Services';
import Portfolio from '@/components/sections/Portfolio';
import CompanyGallery from '@/components/sections/CompanyGallery';
import ContactSection from '@/components/sections/ContactSection';

async function checkMaintenance() {
  try {
    const maintenance = await publicApi.getMaintenance();
    return maintenance;
  } catch (error) {
    console.error('Failed to fetch maintenance status', error);
    return { isEnabled: false, message: '' };
  }
}

export default async function HomePage() {
  const maintenance = await checkMaintenance();

  if (maintenance.isEnabled) {
    return <MaintenancePage message={maintenance.message} />;
  }

  return (
    <>
      <section id="hero">
        <Suspense
          fallback={
            <div className="h-screen bg-gradient-to-b from-[#01AEBE] to-[#9DCC40] dark:from-[#0F2027] dark:to-[#2C5364]" />
          }
        >
          <Hero />
        </Suspense>
      </section>

      <section id="about">
        <Suspense fallback={<div className="h-96 bg-white dark:bg-gray-900" />}>
          <AboutSection />
        </Suspense>
      </section>

      <section id="why-us">
        <Suspense fallback={<div className="h-80 bg-gray-50 dark:bg-gray-800" />}>
          <WhyUs />
        </Suspense>
      </section>

      <section id="achievements">
        <Suspense fallback={<div className="h-80 bg-white dark:bg-gray-900" />}>
          <Achievements />
        </Suspense>
      </section>

      <section id="services">
        <Suspense fallback={<div className="h-96 bg-gray-50 dark:bg-gray-800" />}>
          <Services />
        </Suspense>
      </section>

      <section id="portfolio">
        <Suspense fallback={<div className="h-96 bg-white dark:bg-gray-900" />}>
          <Portfolio />
        </Suspense>
      </section>

      <section id="gallery">
        <Suspense fallback={<div className="h-96 bg-gray-50 dark:bg-gray-800" />}>
          <CompanyGallery />
        </Suspense>
      </section>

      <section id="contact">
        <Suspense fallback={<div className="h-96 bg-gray-50 dark:bg-gray-800" />}>
          <ContactSection />
        </Suspense>
      </section>

      {/* ✅ SEO Text Section (رياض) */}
      <section aria-label="معلومات خدمات التكييف في الرياض" className="bg-white dark:bg-gray-900">
        <div className="mx-auto max-w-6xl px-4 py-12">
          <h1 className="text-2xl md:text-3xl font-bold mb-4">
            شركة رياح الجليد لصيانة وتركيب المكيفات بالرياض
          </h1>

          <p className="text-base md:text-lg leading-relaxed text-gray-700 dark:text-gray-200">
            تقدم شركة رياح الجليد في الرياض خدمات التكييف والتبريد للمنازل والشركات، وتشمل:
            صيانة مكيفات سبليت، تنظيف وتعقيم المكيفات، تعبئة فريون وإصلاح التسريبات، تركيب وفك ونقل المكيفات،
            وصيانة التكييف المركزي. نخدم جميع أحياء الرياض بمواعيد سريعة وفنيين محترفين وضمان على الخدمة.
          </p>

          <h2 className="text-xl md:text-2xl font-semibold mt-8 mb-3">
            خدمات التكييف والتبريد في الرياض
          </h2>
          <ul className="list-disc pr-6 space-y-2 text-gray-700 dark:text-gray-200">
            <li>صيانة مكيفات بالرياض (سبليت / شباك / مركزي)</li>
            <li>تنظيف مكيفات بالرياض وإزالة الروائح والتعقيم</li>
            <li>تعبئة فريون مكيف بالرياض وإصلاح تسريب الفريون</li>
            <li>تركيب مكيفات بالرياض وفك ونقل المكيفات</li>
            <li>صيانة تكييف مركزي بالرياض للمباني والمشاريع</li>
            <li>عقود صيانة دورية للشركات والمؤسسات في الرياض</li>
          </ul>

          <h2 className="text-xl md:text-2xl font-semibold mt-8 mb-3">
            أكثر الأعطال شيوعًا ونقوم بحلها
          </h2>
          <ul className="list-disc pr-6 space-y-2 text-gray-700 dark:text-gray-200">
            <li>المكيف لا يبرد أو تبريد ضعيف</li>
            <li>تسريب ماء من المكيف</li>
            <li>صوت عالي أو اهتزازات</li>
            <li>رائحة كريهة من المكيف</li>
            <li>تجمد الثلج على المواسير</li>
          </ul>

          <p className="text-sm mt-8 text-gray-500 dark:text-gray-400">
            كلمات بحث شائعة: صيانة مكيفات بالرياض، تركيب مكيفات بالرياض، تنظيف مكيفات بالرياض، تعبئة فريون بالرياض، فني مكيفات بالرياض.
          </p>
        </div>
      </section>
    </>
  );
}