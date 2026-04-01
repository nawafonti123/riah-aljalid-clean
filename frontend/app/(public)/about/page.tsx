import type { Metadata } from 'next';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { FaBullseye, FaEye, FaShieldAlt, FaAward, FaUsers, FaBuilding } from 'react-icons/fa';

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

      <main className="min-h-screen pt-32 pb-20">
        <section className="container-main">
          <div className="rounded-[32px] border border-cyan-400/10 bg-[#081427]/90 p-8 sm:p-10 shadow-[0_15px_50px_rgba(0,0,0,0.25)]">
            <div className="max-w-4xl">
              <span className="inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-2 text-cyan-300 font-bold text-sm">
                <FaBuilding />
                عن رياح الجليد
              </span>

              <h1 className="mt-5 text-4xl sm:text-5xl font-extrabold text-white leading-tight">
                مؤسسة متخصصة في
                <span className="block text-cyan-400">التكييف والتبريد والتهوية</span>
              </h1>

              <p className="mt-6 text-lg leading-9 text-white/80">
                نحن مؤسسة سعودية متخصصة في تركيب وصيانة أنظمة التكييف والتهوية والتبريد،
                ونقدم حلولًا عملية واحترافية للمنازل والشركات والمشاريع مع التركيز على
                الجودة والدقة وسرعة التنفيذ ورضا العميل.
              </p>
            </div>
          </div>
        </section>

        <section className="container-main mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {[
            {
              icon: FaEye,
              title: 'رؤيتنا',
              text: 'أن نكون من الجهات الرائدة في حلول التكييف والتبريد الحديثة من خلال الجودة والاعتمادية والتطوير المستمر.',
            },
            {
              icon: FaBullseye,
              title: 'رسالتنا',
              text: 'تقديم خدمات احترافية وآمنة وفعالة تلبي احتياجات العملاء وتواكب أعلى المعايير الفنية.',
            },
            {
              icon: FaShieldAlt,
              title: 'قيمنا',
              text: 'الالتزام، الأمانة، الجودة، الدقة، والاهتمام بالتفاصيل في كل مشروع ننفذه.',
            },
            {
              icon: FaUsers,
              title: 'فريقنا',
              text: 'فريق متخصص من الفنيين والإداريين يعمل بخبرة وتنظيم لتقديم أفضل تجربة للعميل.',
            },
          ].map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className="rounded-[28px] border border-cyan-400/10 bg-[#0b1830] p-6 text-white shadow-[0_10px_35px_rgba(0,0,0,0.2)]"
              >
                <div className="w-14 h-14 rounded-2xl bg-cyan-400/10 text-cyan-300 flex items-center justify-center text-xl">
                  <Icon />
                </div>
                <h2 className="mt-4 text-2xl font-extrabold">{item.title}</h2>
                <p className="mt-3 text-white/75 leading-8">{item.text}</p>
              </div>
            );
          })}
        </section>

        <section className="container-main mt-10">
          <div className="grid gap-6 lg:grid-cols-2">
            <div className="rounded-[28px] border border-cyan-400/10 bg-[#0b1830] p-8 text-white">
              <div className="flex items-center gap-3 text-cyan-300">
                <FaAward />
                <h3 className="text-2xl font-extrabold">لماذا يختارنا العملاء؟</h3>
              </div>

              <ul className="mt-6 space-y-4 text-white/80 leading-8">
                <li>• تنفيذ احترافي بأعلى مستوى من العناية والدقة.</li>
                <li>• سرعة في الاستجابة والالتزام بالمواعيد.</li>
                <li>• خبرة في أنظمة التكييف المركزي والسبليت والدكت.</li>
                <li>• حلول مناسبة للمنازل والشركات والمشاريع.</li>
                <li>• اهتمام كبير براحة العميل وجودة الخدمة بعد التنفيذ.</li>
              </ul>
            </div>

            <div className="rounded-[28px] border border-cyan-400/10 bg-[#0b1830] p-8 text-white">
              <h3 className="text-2xl font-extrabold text-cyan-300">بيانات المؤسسة</h3>

              <div className="mt-6 space-y-4 text-white/80 text-lg">
                <p><span className="font-bold text-white">الاسم التجاري:</span> رياح الجليد</p>
                <p><span className="font-bold text-white">السجل التجاري:</span> 1010632725</p>
                <p><span className="font-bold text-white">المدينة:</span> الرياض</p>
                <p><span className="font-bold text-white">النشاط:</span> أعمال التكييف والتبريد والتهوية والدكت</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}