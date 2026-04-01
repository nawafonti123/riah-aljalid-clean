import type { Metadata } from 'next';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ContactSection from '@/components/sections/ContactSection';
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaBuilding } from 'react-icons/fa';

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

      <main className="min-h-screen pt-32 pb-20">
        <section className="container-main">
          <div className="rounded-[32px] border border-cyan-400/10 bg-[#081427]/90 p-8 sm:p-10 shadow-[0_15px_50px_rgba(0,0,0,0.25)]">
            <div className="max-w-4xl">
              <span className="inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-2 text-cyan-300 font-bold text-sm">
                اتصل بنا
              </span>

              <h1 className="mt-5 text-4xl sm:text-5xl font-extrabold text-white leading-tight">
                جاهزون لخدمتك
                <span className="block text-cyan-400">في أي وقت</span>
              </h1>

              <p className="mt-6 text-lg leading-9 text-white/80">
                يمكنك التواصل معنا للاستفسار أو طلب خدمة تركيب أو صيانة أو معاينة،
                وسنكون سعداء بخدمتك بأسرع وقت ممكن.
              </p>
            </div>
          </div>
        </section>

        <section className="container-main mt-10 grid gap-6 lg:grid-cols-4">
          {[
            { icon: FaMapMarkerAlt, title: 'العنوان', value: 'الرياض - طريق الملك عبدالعزيز' },
            { icon: FaPhoneAlt, title: 'الهاتف', value: '+966 56 524 7407' },
            { icon: FaEnvelope, title: 'البريد الإلكتروني', value: 'RiaHaljalid@icloud.com' },
            { icon: FaBuilding, title: 'السجل التجاري', value: '1010632725' },
          ].map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className="rounded-[28px] border border-cyan-400/10 bg-[#0b1830] p-6 text-white"
              >
                <div className="w-14 h-14 rounded-2xl bg-cyan-400/10 text-cyan-300 flex items-center justify-center text-xl">
                  <Icon />
                </div>
                <h2 className="mt-4 text-xl font-extrabold">{item.title}</h2>
                <p className="mt-3 text-white/75 leading-8">{item.value}</p>
              </div>
            );
          })}
        </section>

        <section className="container-main mt-10">
          <ContactSection />
        </section>
      </main>

      <Footer />
    </>
  );
}