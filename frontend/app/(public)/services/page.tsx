import type { Metadata } from 'next';
import Link from 'next/link';
import {
  FaWrench,
  FaArrowLeft,
  FaCheckCircle,
  FaTools,
  FaWind,
} from 'react-icons/fa';
import Services from '@/components/sections/Services';
import ContactSection from '@/components/sections/ContactSection';

export const metadata: Metadata = {
  title: 'الخدمات',
  description:
    'خدمات رياح الجليد في تركيب وصيانة وتنظيف المكيفات والتكييف المركزي والدكت والتهوية في الرياض.',
  alternates: {
    canonical: '/services',
  },
};

const points = [
  'تركيب وصيانة جميع أنواع المكيفات',
  'تنفيذ مشاريع التكييف المركزي والدكت',
  'خدمة للمنازل والمنشآت التجارية',
  'سرعة في الإنجاز واهتمام بالتفاصيل',
];

export default function ServicesPage() {
  return (
    <>
      <section className="section-shell !pt-6 md:!pt-8">
        <div className="container">
          <div className="glass-card overflow-hidden p-6 md:p-8 xl:p-10">
            <div className="grid gap-8 xl:grid-cols-[1.02fr_0.98fr] xl:items-center">
              <div>
                <span className="mb-4 inline-flex rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-2 text-sm font-black text-cyan-300">
                  <FaWrench className="ml-2" />
                  خدماتنا
                </span>

                <h1 className="text-3xl font-black leading-[1.35] text-white md:text-5xl">
                  حلول متكاملة في
                  <span className="block text-cyan-300">
                    التكييف والتبريد والتهوية
                  </span>
                </h1>

                <p className="mt-5 max-w-3xl text-base leading-8 text-white/75 md:text-lg">
                  نقدم خدمات احترافية تشمل التركيب والصيانة والتنظيف والدكت
                  والتكييف المركزي للمنازل والشركات والمشاريع، مع سرعة في
                  التنفيذ واهتمام كبير بالتفاصيل.
                </p>

                <div className="mt-7 grid gap-3 sm:grid-cols-2">
                  {points.map((point) => (
                    <div
                      key={point}
                      className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3"
                    >
                      <FaCheckCircle className="mt-1 shrink-0 text-cyan-300" />
                      <span className="text-sm font-bold leading-7 text-white/80">
                        {point}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="mt-7 flex flex-wrap gap-3">
                  <Link
                    href="/portfolio"
                    className="inline-flex min-h-[52px] items-center justify-center gap-3 rounded-full bg-gradient-to-r from-cyan-500 to-sky-500 px-6 text-sm font-black text-white shadow-lg shadow-cyan-500/20"
                  >
                    <span>شاهد أعمالنا</span>
                    <FaArrowLeft />
                  </Link>

                  <Link
                    href="/contact"
                    className="inline-flex min-h-[52px] items-center justify-center gap-3 rounded-full border border-white/10 bg-white/5 px-6 text-sm font-black text-white"
                  >
                    <span>اطلب الخدمة الآن</span>
                  </Link>
                </div>
              </div>

              <div className="grid gap-4">
                <div className="rounded-[26px] border border-white/10 bg-white/5 p-6">
                  <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-cyan-500/15 text-cyan-300">
                    <FaTools className="text-xl" />
                  </div>
                  <h3 className="text-lg font-black text-white">
                    تركيب وصيانة
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-white/70">
                    حلول احترافية لرفع الكفاءة ومعالجة الأعطال وتنفيذ أعمال
                    التركيب بشكل أنيق ومنظم.
                  </p>
                </div>

                <div className="rounded-[26px] border border-white/10 bg-white/5 p-6">
                  <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-cyan-500/15 text-cyan-300">
                    <FaWind className="text-xl" />
                  </div>
                  <h3 className="text-lg font-black text-white">
                    دكت وتهوية ومركزي
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-white/70">
                    تنفيذ مشاريع التهوية ومجاري الهواء والدكت مع عناية دقيقة
                    بالمقاسات وجودة التوزيع.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Services />
      <ContactSection />
    </>
  );
}