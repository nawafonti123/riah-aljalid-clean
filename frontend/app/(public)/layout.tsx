// frontend/app/(public)/layout.tsx
import { publicApi } from '@/lib/api';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

export default async function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  let maintenance = { isEnabled: false };
  try {
    maintenance = await publicApi.getMaintenance();
  } catch (error) {
    console.error('Failed to fetch maintenance', error);
  }

  // إذا كانت الصيانة مفعلة، نعرض المحتوى فقط (صفحة الصيانة) بدون Navbar أو Footer
  if (maintenance.isEnabled) {
    return <>{children}</>;
  }

  // وإلا نعرض التخطيط العادي
  return (
    <>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </>
  );
}