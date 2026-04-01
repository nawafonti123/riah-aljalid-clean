import type { Metadata } from 'next';
import { Cairo } from 'next/font/google';
import './globals.css';
import { Providers } from './providers';
import Loader from '@/components/layout/Loader';
import FloatingContactButtons from '@/components/FloatingContactButtons';

const cairo = Cairo({
  subsets: ['arabic'],
  variable: '--font-cairo',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'رياح الجليد',
  description: 'خدمات التكييف والتبريد',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ar" dir="rtl" suppressHydrationWarning>
      <body className={`${cairo.variable} min-h-screen antialiased`}>
        <Providers>
          <Loader />
          {children}
          <FloatingContactButtons />
        </Providers>
      </body>
    </html>
  );
}