import type { Metadata } from 'next';
import Link from 'next/link';
import { FaImages, FaArrowLeft, FaPlayCircle, FaCamera } from 'react-icons/fa';
import Portfolio from '@/components/sections/Portfolio';
import CompanyGallery from '@/components/sections/CompanyGallery';

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
      <section className="section-shell !pt-6 md:!pt-8">
        <div className="container">
          <div className="glass-card overflow-hidden p-6 md:p-8 xl:p-10">
            <div className="grid gap-8 xl:grid-cols-[1.05fr_0.95fr] xl:items-center">
              <div>
                <span className="mb-4 inline-flex rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-2 text-sm font-black text-cyan-300">
                  <FaImages className="ml-2" />
                  أعمالنا
                </span>

                <h1 className="text-3xl font-black leading-[1.35] text-white md:text-5xl">
                  نماذج من
                  <span className="block text-cyan-300">
                    مشاريعنا المنفذة
                  </span>
                </h1>

                <p className="mt-5 max-w-3xl text-base leading-8 text-white/75 md:text-lg">
                  استعرض مجموعة من أعمالنا في التكييف المركزي والسبليت والدكت
                  والتهوية، مع اهتمام كبير بجودة التنفيذ ودقة التفاصيل والمظهر
                  النهائي.
                </p>

                <div className="mt-7 flex flex-wrap gap-3">
                  <Link
                    href="/contact"
                    className="inline-flex min-h-[52px] items-center justify-center gap-3 rounded-full bg-gradient-to-r from-cyan-500 to-sky-500 px-6 text-sm font-black text-white shadow-lg shadow-cyan-500/20"
                  >
                    <span>ابدأ مشروعك معنا</span>
                    <FaArrowLeft />
                  </Link>

                  <Link
                    href="/services"
                    className="inline-flex min-h-[52px] items-center justify-center gap-3 rounded-full border border-white/10 bg-white/5 px-6 text-sm font-black text-white"
                  >
                    <span>استعرض الخدمات</span>
                  </Link>
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-[26px] border border-white/10 bg-white/5 p-6">
                  <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-cyan-500/15 text-cyan-300">
                    <FaCamera className="text-xl" />
                  </div>
                  <h3 className="text-lg font-black text-white">قسم الصور</h3>
                  <p className="mt-3 text-sm leading-7 text-white/70">
                    عرض منظم وواضح للصور الميدانية والتنفيذ الفعلي للمشاريع.
                  </p>
                </div>

                <div className="rounded-[26px] border border-white/10 bg-white/5 p-6">
                  <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-cyan-500/15 text-cyan-300">
                    <FaPlayCircle className="text-xl" />
                  </div>
                  <h3 className="text-lg font-black text-white">
                    قسم الفيديوهات
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-white/70">
                    مشاهدة الأعمال بالفيديو داخل عرض أكبر وأكثر احترافية.
                  </p>
                </div>

                <div className="rounded-[26px] border border-white/10 bg-white/5 p-6 sm:col-span-2">
                  <h3 className="text-lg font-black text-white">
                    عرض أنظف وأكثر ترتيبًا
                  </h3>
                  <p className="mt-3 text-sm leading-8 text-white/70">
                    تم تنظيم صفحة الأعمال بحيث تكون أسهل في التصفح وأوضح في
                    عرض الصور والفيديوهات وتفاصيل كل مشروع.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Portfolio />
      <CompanyGallery />
    </>
  );
}