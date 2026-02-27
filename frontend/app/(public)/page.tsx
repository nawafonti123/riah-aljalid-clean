// frontend/app/(public)/page.tsx
import { Suspense } from 'react';
import { publicApi } from '@/lib/api';
import MaintenancePage from './maintenance/page';

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

  const Hero = (await import('@/components/sections/Hero')).default;
  const WhyUs = (await import('@/components/sections/WhyUs')).default;
  const Achievements = (await import('@/components/sections/Achievements')).default;
  const AboutSection = (await import('@/components/sections/AboutSection')).default;
  const Services = (await import('@/components/sections/Services')).default;
  const Portfolio = (await import('@/components/sections/Portfolio')).default;
  const ContactSection = (await import('@/components/sections/ContactSection')).default;

  return (
    <>
      <Suspense fallback={<div className="h-screen bg-gradient-to-b from-[#01AEBE] to-[#9DCC40] dark:from-[#0F2027] dark:to-[#2C5364]" />}>
        <Hero />
      </Suspense>
      <Suspense fallback={<div className="h-40 bg-gray-50 dark:bg-gray-900" />}>
        <WhyUs />
      </Suspense>
      <Suspense fallback={<div className="h-40 bg-white dark:bg-gray-800" />}>
        <Achievements />
      </Suspense>
      <Suspense fallback={<div className="h-80 bg-white dark:bg-gray-900" />}>
        <AboutSection />
      </Suspense>
      <Suspense fallback={<div className="h-80 bg-gray-50 dark:bg-gray-900" />}>
        <Services />
      </Suspense>
      <Suspense fallback={<div className="h-80 bg-white dark:bg-gray-900" />}>
        <Portfolio />
      </Suspense>
      <Suspense fallback={<div className="h-80 bg-gray-50 dark:bg-gray-900" />}>
        <ContactSection />
      </Suspense>
    </>
  );
}