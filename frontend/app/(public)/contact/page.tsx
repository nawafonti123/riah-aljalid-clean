import type { Metadata } from 'next';
import Link from 'next/link';
import {
  FaEnvelope,
  FaArrowLeft,
  FaWhatsapp,
  FaPhoneAlt,
  FaMapMarkerAlt,
} from 'react-icons/fa';
import ContactSection from '@/components/sections/ContactSection';

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
      <section className="section-shell !pt-6 md:!pt-8">
        <div className="container">
          <div className="glass-card overflow-hidden p-6 md:p-8 xl:p-10">
            <div className="grid gap-8 xl:grid-cols-[1.02fr_0.98fr] xl:items-center">
              <div>
                <span className="mb-4 inline-flex rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-2 text-sm font-black text-cyan-300">
                  <FaEnvelope className="ml-2" />
                  اتصل بنا
                </span>

                <h1 className="text-3xl font-black leading-[1.35] text-white md:text-5xl">
                  جاهزون لخدمتك
                  <span className="block text-cyan-300">في أي وقت</span>
                </h1>

                <p className="mt-5 max-w-3xl text-base leading-8 text-white/75 md:text-lg">
                  يمكنك التواصل معنا لطلب خدمة أو استفسار أو معاينة، وسنكون
                  سعداء بخدمتك بأسرع وقت ممكن وبأعلى جودة واهتمام بالتفاصيل.
                </p>

                <div className="mt-7 flex flex-wrap gap-3">
                  <a
                    href="https://wa.me/966565247407"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-[52px] items-center justify-center gap-3 rounded-full bg-gradient-to-r from-cyan-500 to-sky-500 px-6 text-sm font-black text-white shadow-lg shadow-cyan-500/20"
                  >
                    <FaWhatsapp />
                    <span>تواصل واتساب</span>
                  </a>

                  <a
                    href="tel:+966565247407"
                    className="inline-flex min-h-[52px] items-center justify-center gap-3 rounded-full border border-white/10 bg-white/5 px-6 text-sm font-black text-white"
                  >
                    <FaPhoneAlt />
                    <span>اتصال مباشر</span>
                  </a>

                  <Link
                    href="/services"
                    className="inline-flex min-h-[52px] items-center justify-center gap-3 rounded-full border border-cyan-400/20 bg-cyan-400/10 px-6 text-sm font-black text-cyan-200"
                  >
                    <span>استعرض الخدمات</span>
                    <FaArrowLeft />
                  </Link>
                </div>
              </div>

              <div className="grid gap-4">
                <div className="rounded-[26px] border border-white/10 bg-white/5 p-6">
                  <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-cyan-500/15 text-cyan-300">
                    <FaPhoneAlt className="text-xl" />
                  </div>
                  <h3 className="text-lg font-black text-white">الهاتف</h3>
                  <p className="mt-3 text-sm font-bold text-white/75">
                    +966 56 524 7407
                  </p>
                </div>

                <div className="rounded-[26px] border border-white/10 bg-white/5 p-6">
                  <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-cyan-500/15 text-cyan-300">
                    <FaMapMarkerAlt className="text-xl" />
                  </div>
                  <h3 className="text-lg font-black text-white">الموقع</h3>
                  <p className="mt-3 text-sm leading-7 text-white/70">
                    الرياض - المملكة العربية السعودية
                  </p>
                </div>

                <div className="rounded-[26px] border border-white/10 bg-white/5 p-6">
                  <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-cyan-500/15 text-cyan-300">
                    <FaEnvelope className="text-xl" />
                  </div>
                  <h3 className="text-lg font-black text-white">
                    البريد الإلكتروني
                  </h3>
                  <p className="mt-3 text-sm font-bold text-white/75">
                    RiaHaljalid@icloud.com
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <ContactSection />
    </>
  );
}