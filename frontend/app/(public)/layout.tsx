import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { publicApi } from '@/lib/api';

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

  if (maintenance?.isEnabled) {
    return <>{children}</>;
  }

  return (
    <div className="public-layout">
      <Navbar />
      <main className="public-main">{children}</main>
      <Footer />
    </div>
  );
}