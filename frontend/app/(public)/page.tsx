// frontend/app/(public)/page.tsx
import { Suspense } from 'react';
import { publicApi } from '@/lib/api';
import MaintenancePage from './maintenance/page';

// استيراد المكونات بشكل طبيعي
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
        <Suspense fallback={<div className="h-screen bg-gradient-to-b from-[#01AEBE] to-[#9DCC40] dark:from-[#0F2027] dark:to-[#2C5364]" />}>
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
    </>
  );
}