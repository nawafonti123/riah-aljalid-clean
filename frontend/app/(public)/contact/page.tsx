import type { Metadata } from 'next';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ContactSection from '@/components/sections/ContactSection';
import { FaEnvelope } from 'react-icons/fa';

export const metadata: Metadata = {
  title: 'اتصل بنا',
  description:
    'تواصل مع مؤسسة رياح الجليد في الرياض لخدمات التكييف والتبريد والتهوية والدكت.',
  alternates: {
    canonical: '/contact',
  },
};

export default function ContactPage() {
  return (
    <>
      <Navbar />

      <main className="min-h-screen pt-32 pb-20 overflow-hidden">
        <section className="container-main">
          <div className="rounded-[32px] border border-cyan-400/10 bg-[#081427]/90 p-8 sm:p-10 shadow-[0_15px_50px_rgba(0,0,0,0.25)]">
            <div className="max-w-4xl">
              <span className="inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-2 text-cyan-300 font-bold text-sm">
                <FaEnvelope />
                اتصل بنا
              </span>

              <h1 className="mt-5 text-4xl sm:text-5xl font-extrabold text-white leading-tight">
                جاهزون لخدمتك
                <span className="block text-cyan-400">في أي وقت</span>
              </h1>

              <p className="mt-6 text-lg leading-9 text-white/80">
                يمكنك التواصل معنا لطلب خدمة أو استفسار أو معاينة، وسنكون سعداء
                بخدمتك بأسرع وقت ممكن وبأعلى جودة.
              </p>
            </div>
          </div>
        </section>

        <section className="section-padding">
          <ContactSection />
        </section>
      </main>

      <Footer />
    </>
  );
}