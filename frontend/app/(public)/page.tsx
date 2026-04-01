import type { Metadata } from 'next';
import { publicApi } from '@/lib/api';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Hero from '@/components/sections/Hero';
import WhyUs from '@/components/sections/WhyUs';
import Achievements from '@/components/sections/Achievements';
import AboutSection from '@/components/sections/AboutSection';
import Services from '@/components/sections/Services';
import Portfolio from '@/components/sections/Portfolio';
import CompanyGallery from '@/components/sections/CompanyGallery';
import ContactSection from '@/components/sections/ContactSection';
import MaintenanceView from '@/components/maintenance/MaintenanceView';

export const metadata: Metadata = {
  title: 'رياح الجليد | تركيب وصيانة مكيفات وتكييف مركزي بالرياض',
  description:
    'شركة رياح الجليد بالرياض متخصصة في تركيب وصيانة وتنظيف المكيفات، تعبئة الفريون، التكييف المركزي، وتصنيع وتركيب الدكت للمنازل والشركات.',
  alternates: {
    canonical: '/',
  },
};

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
    return <MaintenanceView message={maintenance.message} />;
  }

  return (
    <>
      <Navbar />

      <main className="overflow-hidden">
        <section id="hero">
          <Hero />
        </section>

        <section id="about" className="section-padding">
          <AboutSection />
        </section>

        <section id="why-us" className="section-padding pt-0">
          <WhyUs />
        </section>

        <section id="achievements" className="section-padding pt-0">
          <Achievements />
        </section>

        <section id="services" className="section-padding pt-0">
          <Services />
        </section>

        <section id="portfolio" className="section-padding pt-0">
          <Portfolio />
        </section>

        <section id="gallery" className="section-padding pt-0">
          <CompanyGallery />
        </section>

        <section id="contact" className="section-padding pt-0">
          <ContactSection />
        </section>

        <section className="pb-20">
          <div className="container-main">
            <div className="soft-card rounded-[2rem] p-6 sm:p-8 lg:p-10">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
                شركة رياح الجليد لصيانة وتركيب المكيفات بالرياض
              </h2>

              <p className="mt-4 text-base leading-8 text-slate-600 dark:text-slate-300">
                تقدم شركة رياح الجليد في الرياض خدمات التكييف والتبريد للمنازل
                والشركات، وتشمل صيانة مكيفات سبليت، تنظيف وتعقيم المكيفات، تعبئة
                فريون وإصلاح التسريبات، تركيب وفك ونقل المكيفات، وصيانة التكييف
                المركزي، مع سرعة في الاستجابة وجودة في التنفيذ.
              </p>

              <div className="mt-6 grid gap-4 md:grid-cols-2">
                <div className="rounded-3xl bg-slate-50 p-5 dark:bg-white/5">
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                    خدماتنا في الرياض
                  </h3>
                  <ul className="mt-3 space-y-2 text-slate-600 dark:text-slate-300">
                    <li>صيانة مكيفات بالرياض (سبليت / شباك / مركزي)</li>
                    <li>تنظيف مكيفات بالرياض والتعقيم</li>
                    <li>تعبئة فريون وإصلاح تسريب الفريون</li>
                    <li>تركيب وفك ونقل المكيفات</li>
                    <li>تصنيع وتركيب الدكت والتهوية</li>
                  </ul>
                </div>

                <div className="rounded-3xl bg-cyan-50 p-5 dark:bg-cyan-400/10">
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                    أكثر الأعطال شيوعًا
                  </h3>
                  <ul className="mt-3 space-y-2 text-slate-600 dark:text-slate-300">
                    <li>ضعف التبريد أو توقفه</li>
                    <li>تسريب المياه من الوحدة</li>
                    <li>أصوات مزعجة أو اهتزاز</li>
                    <li>روائح غير مرغوبة</li>
                    <li>تجمد المواسير أو الثلج</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}