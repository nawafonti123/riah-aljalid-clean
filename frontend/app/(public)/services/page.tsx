import type { Metadata } from 'next';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Services from '@/components/sections/Services';
import { FaWrench } from 'react-icons/fa';

export const metadata: Metadata = {
  title: 'الخدمات',
  description:
    'خدمات رياح الجليد في تركيب وصيانة وتنظيف المكيفات والتكييف المركزي والدكت والتهوية في الرياض.',
  alternates: {
    canonical: '/services',
  },
};

export default function ServicesPage() {
  return (
    <>
      <Navbar />

      <main className="min-h-screen overflow-hidden pt-32 pb-20">
        <section className="container-main">
          <div className="rounded-[32px] border border-cyan-400/10 bg-[#081427]/90 p-8 sm:p-10 shadow-[0_15px_50px_rgba(0,0,0,0.25)]">
            <span className="inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-2 text-sm font-bold text-cyan-300">
              <FaWrench />
              خدماتنا
            </span>

            <h1 className="mt-5 text-4xl font-extrabold leading-tight text-white sm:text-5xl">
              حلول متكاملة في
              <span className="block text-cyan-400">التكييف والتبريد والتهوية</span>
            </h1>

            <p className="mt-6 max-w-4xl text-lg leading-9 text-white/80">
              نقدم خدمات احترافية تشمل التركيب والصيانة والتنظيف والدكت والتكييف
              المركزي، للمنازل والشركات والمشاريع، مع سرعة في التنفيذ واهتمام
              بالتفاصيل.
            </p>
          </div>
        </section>

        <section className="section-padding">
          <Services />
        </section>
      </main>

      <Footer />
    </>
  );
}