import type { Metadata } from 'next';
import Link from 'next/link';
import { FaInfoCircle, FaArrowLeft, FaSnowflake } from 'react-icons/fa';
import AboutSection from '@/components/sections/AboutSection';
import WhyUs from '@/components/sections/WhyUs';
import Achievements from '@/components/sections/Achievements';

export const metadata: Metadata = {
  title: 'عن الشركة',
  description:
    'تعرف على شركة رياح الجليد المتخصصة في تركيب وصيانة أنظمة التكييف والتبريد والتهوية في الرياض.',
  alternates: {
    canonical: '/about',
  },
};

export default function AboutPage() {
  return (
    <>
      <section className="section-shell !pt-6 md:!pt-8">
        <div className="container">
          <div className="glass-card overflow-hidden p-6 md:p-8 xl:p-10">
            <div className="grid gap-8 xl:grid-cols-[1.05fr_0.95fr] xl:items-center">
              <div>
                <span className="mb-4 inline-flex rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-2 text-sm font-black text-cyan-300">
                  <FaInfoCircle className="ml-2" />
                  عن رياح الجليد
                </span>

                <h1 className="text-3xl font-black leading-[1.35] text-white md:text-5xl">
                  خبرة وجودة في
                  <span className="block text-cyan-300">
                    أعمال التكييف والتبريد
                  </span>
                </h1>

                <p className="mt-5 max-w-3xl text-base leading-8 text-white/75 md:text-lg">
                  رياح الجليد شركة متخصصة في تنفيذ أعمال التكييف المركزي
                  والسبليت والدكت والتهوية، ونركز على تقديم خدمة احترافية تجمع
                  بين الجودة العالية والالتزام والدقة في التنفيذ والمظهر النهائي.
                </p>

                <div className="mt-7 flex flex-wrap gap-3">
                  <Link
                    href="/services"
                    className="inline-flex min-h-[52px] items-center justify-center gap-3 rounded-full bg-gradient-to-r from-cyan-500 to-sky-500 px-6 text-sm font-black text-white shadow-lg shadow-cyan-500/20"
                  >
                    <span>استعرض خدماتنا</span>
                    <FaArrowLeft />
                  </Link>

                  <Link
                    href="/contact"
                    className="inline-flex min-h-[52px] items-center justify-center gap-3 rounded-full border border-white/10 bg-white/5 px-6 text-sm font-black text-white"
                  >
                    <span>تواصل معنا</span>
                  </Link>
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-[26px] border border-white/10 bg-white/5 p-6">
                  <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-cyan-500/15 text-cyan-300">
                    <FaSnowflake className="text-xl" />
                  </div>
                  <h3 className="text-lg font-black text-white">
                    حلول عملية ومرتبة
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-white/70">
                    نهتم بالأداء وكفاءة التشغيل مع تنفيذ منظم يراعي جودة الشكل
                    النهائي.
                  </p>
                </div>

                <div className="rounded-[26px] border border-white/10 bg-white/5 p-6">
                  <div className="mb-4 text-4xl font-black text-cyan-300">
                    +15
                  </div>
                  <h3 className="text-lg font-black text-white">سنوات خبرة</h3>
                  <p className="mt-3 text-sm leading-7 text-white/70">
                    خبرة عملية متراكمة في المشاريع السكنية والتجارية وأعمال
                    التهوية والدكت.
                  </p>
                </div>

                <div className="rounded-[26px] border border-white/10 bg-white/5 p-6 sm:col-span-2">
                  <h3 className="text-lg font-black text-white">
                    هدفنا في كل مشروع
                  </h3>
                  <p className="mt-3 text-sm leading-8 text-white/70">
                    تقديم خدمة موثوقة ونتيجة نظيفة بصريًا وفنيًا، مع التزام
                    بالمواعيد وجودة التنفيذ ورضا العميل في كل مرحلة.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <AboutSection />
      <WhyUs />
      <Achievements />
    </>
  );
}