// frontend/app/layout.tsx
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
  title: 'رياح الجليد – تكييف مركزي وتبريد',
  description: 'شركة متخصصة في التكييف المركزي والتهوية والتبريد في الرياض',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ar" dir="rtl">
      <body className={`${cairo.variable} font-sans`}>
        <Providers>
          <Loader />
          {children}
        </Providers>
        <FloatingContactButtons />
      </body>
    </html>
  );
}