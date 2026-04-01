import type { Metadata } from 'next';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Portfolio from '@/components/sections/Portfolio';

export const metadata: Metadata = {
  title: 'أعمالنا',
  description:
    'تعرّف على نماذج من مشاريع رياح الجليد في التكييف المركزي، الدكت، التبريد، وأعمال التركيب والصيانة في الرياض.',
  alternates: {
    canonical: '/portfolio',
  },
};

export default function PortfolioPage() {
  return (
    <>
      <Navbar />

      <main className="pt-32 pb-20">
        <div className="container-main">
          <div className="mb-12 text-center">
            <h1 className="section-title">أعمالنا</h1>
            <p className="section-subtitle mx-auto">
              نماذج من مشاريعنا المنفذة في أنظمة التكييف والتبريد والتهوية والدكت،
              مع اهتمام بالتفاصيل وجودة التنفيذ ورضا العميل.
            </p>
          </div>

          <Portfolio />
        </div>
      </main>

      <Footer />
    </>
  );
}