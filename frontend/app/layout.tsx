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

const SITE_NAME = 'رياح الجليد';
const SITE_URL = 'https://riah-aljalid.com';
const DEFAULT_TITLE = 'شركة رياح الجليد | صيانة وتركيب مكيفات بالرياض';
const DEFAULT_DESC =
  'شركة رياح الجليد لخدمات التكييف في الرياض: صيانة مكيفات، تركيب، تنظيف، تعبئة فريون، تكييف سبليت ومركزي للمنازل والشركات، مواعيد سريعة وضمان.';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),

  title: {
    default: DEFAULT_TITLE,
    template: `%s | ${SITE_NAME}`,
  },

  description: DEFAULT_DESC,

  applicationName: SITE_NAME,

  keywords: [
    'صيانة مكيفات بالرياض',
    'تركيب مكيفات بالرياض',
    'تنظيف مكيفات بالرياض',
    'تعبئة فريون بالرياض',
    'فني مكيفات بالرياض',
    'شركة تكييف بالرياض',
    'تكييف مركزي بالرياض',
    'تكييف سبليت بالرياض',
    'رياح الجليد تكييف',
  ],

  alternates: {
    canonical: '/',
  },

  // ✅ إضافة الأيقونة هنا
  icons: {
    icon: '/icon.png',
    shortcut: '/icon.png',
    apple: '/icon.png',
  },

  openGraph: {
    type: 'website',
    url: SITE_URL,
    title: DEFAULT_TITLE,
    description: DEFAULT_DESC,
    siteName: SITE_NAME,
    locale: 'ar_SA',
    images: [
      {
        url: '/og.jpg',
        width: 1200,
        height: 630,
        alt: DEFAULT_TITLE,
      },
    ],
  },

  twitter: {
    card: 'summary_large_image',
    title: DEFAULT_TITLE,
    description: DEFAULT_DESC,
    images: ['/og.jpg'],
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },

  verification: {
    google: '-sHiWCngfdbyUPZjlEABGG5vtF2fjjH_QQPKFXzqx6w',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: SITE_NAME,
    url: SITE_URL,
    description: DEFAULT_DESC,
    areaServed: 'Riyadh',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Riyadh',
      addressCountry: 'SA',
    },
    telephone: '+966XXXXXXXXX',
    serviceType: [
      'صيانة مكيفات',
      'تركيب مكيفات',
      'تنظيف مكيفات',
      'تعبئة فريون',
      'تكييف مركزي',
      'تكييف سبليت',
    ],
  };

  return (
    <html lang="ar" dir="rtl">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
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