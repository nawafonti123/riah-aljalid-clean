import type { Metadata } from 'next';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import AboutSection from '@/components/sections/AboutSection';
import WhyUs from '@/components/sections/WhyUs';
import Achievements from '@/components/sections/Achievements';
import { FaInfoCircle } from 'react-icons/fa';

export const metadata: Metadata = {
  title: 'عن الشركة',
  description:
    'تعرف على مؤسسة رياح الجليد المتخصصة في تركيب وصيانة أنظمة التكييف والتبريد والتهوية في الرياض.',
  alternates: {
    canonical: '/about',
  },
};

export default function AboutPage() {
  return (
    <>
      <Navbar />

      <main className="min-h-screen overflow-hidden pt-32 pb-20">
        <section className="container-main">
          <div className="rounded-[32px] border border-cyan-400/10 bg-[#081427]/90 p-8 sm:p-10 shadow-[0_15px_50px_rgba(0,0,0,0.25)]">
            <span className="inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-2 text-sm font-bold text-cyan-300">
              <FaInfoCircle />
              عن رياح الجليد
            </span>

            <h1 className="mt-5 text-4xl font-extrabold leading-tight text-white sm:text-5xl">
              خبرة وجودة في
              <span className="block text-cyan-400">أعمال التكييف والتبريد</span>
            </h1>

            <p className="mt-6 max-w-4xl text-lg leading-9 text-white/80">
              رياح الجليد مؤسسة متخصصة في تنفيذ أعمال التكييف المركزي والسبليت
              والدكت والتهوية، ونركز على تقديم خدمة احترافية تجمع بين الجودة
              العالية، الالتزام، والدقة في التنفيذ.
            </p>
          </div>
        </section>

        <section className="section-padding">
          <AboutSection />
        </section>

        <section className="section-padding pt-0">
          <WhyUs />
        </section>

        <section className="section-padding pt-0">
          <Achievements />
        </section>
      </main>

      <Footer />
    </>
  );
}