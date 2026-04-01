import type { Metadata } from 'next';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Portfolio from '@/components/sections/Portfolio';
import CompanyGallery from '@/components/sections/CompanyGallery';
import { FaImages } from 'react-icons/fa';

export const metadata: Metadata = {
  title: 'أعمالنا',
  description:
    'استعرض نماذج من أعمال ومشاريع رياح الجليد في التكييف والتبريد والدكت والتهوية في الرياض.',
  alternates: {
    canonical: '/portfolio',
  },
};

export default function PortfolioPage() {
  return (
    <>
      <Navbar />

      <main className="min-h-screen pt-32 pb-20 overflow-hidden">
        <section className="container-main">
          <div className="rounded-[32px] border border-cyan-400/10 bg-[#081427]/90 p-8 sm:p-10 shadow-[0_15px_50px_rgba(0,0,0,0.25)]">
            <div className="max-w-4xl">
              <span className="inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-2 text-cyan-300 font-bold text-sm">
                <FaImages />
                أعمالنا
              </span>

              <h1 className="mt-5 text-4xl sm:text-5xl font-extrabold text-white leading-tight">
                نماذج من
                <span className="block text-cyan-400">مشاريعنا المنفذة</span>
              </h1>

              <p className="mt-6 text-lg leading-9 text-white/80">
                استعرض مجموعة من أعمالنا في التكييف المركزي والسبليت والدكت
                والتهوية، مع اهتمام كبير بجودة التنفيذ ودقة التفاصيل.
              </p>
            </div>
          </div>
        </section>

        <section className="section-padding">
          <Portfolio />
        </section>

        <section className="section-padding pt-0">
          <CompanyGallery />
        </section>
      </main>

      <Footer />
    </>
  );
}