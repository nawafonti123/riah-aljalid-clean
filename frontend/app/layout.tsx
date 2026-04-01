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
const SITE_URL = 'https://www.riah-aljalid.com';
const DEFAULT_TITLE = 'رياح الجليد | تركيب وصيانة مكيفات وتكييف مركزي بالرياض';
const DEFAULT_DESC =
  'رياح الجليد بالرياض لخدمات التكييف: تركيب وصيانة وتنظيف وتعبئة فريون، وتكييف سبليت ومركزي، للمنازل والشركات مع جودة عالية ومواعيد سريعة وضمان.';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: DEFAULT_TITLE,
    template: `%s | ${SITE_NAME}`,
  },
  description: DEFAULT_DESC,
  applicationName: SITE_NAME,
  category: 'HVAC',
  keywords: [
    'رياح الجليد',
    'شركة تكييف بالرياض',
    'تركيب مكيفات بالرياض',
    'صيانة مكيفات بالرياض',
    'تنظيف مكيفات بالرياض',
    'تعبئة فريون بالرياض',
    'فني مكيفات بالرياض',
    'تكييف مركزي بالرياض',
    'مجاري الهواء دكت',
    'توريد وتركيب دكت',
    'تهوية وتبريد',
  ],
  alternates: {
    canonical: '/',
  },
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
        url: '/logo.png',
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
    images: ['/logo.png'],
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
  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'LocalBusiness',
      '@id': `${SITE_URL}/#business`,
      name: SITE_NAME,
      url: SITE_URL,
      description: DEFAULT_DESC,
      image: `${SITE_URL}/logo.png`,
      telephone: '+966565247407',
      email: 'RiaHaljalid@icloud.com',
      address: {
        '@type': 'PostalAddress',
        streetAddress: '8246 طريق الملك عبدالعزيز الفرعي، الملك فهد، 3988',
        addressLocality: 'الرياض',
        postalCode: '12274',
        addressCountry: 'SA',
      },
      areaServed: ['Riyadh', 'الرياض'],
      priceRange: '$$',
      serviceType: [
        'تركيب مكيفات',
        'صيانة مكيفات',
        'تنظيف مكيفات',
        'تعبئة فريون',
        'تكييف مركزي',
        'تكييف سبليت',
        'تهوية وتبريد',
        'تصنيع وتركيب الدكت',
      ],
      sameAs: [SITE_URL],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      '@id': `${SITE_URL}/#website`,
      name: SITE_NAME,
      url: SITE_URL,
      inLanguage: 'ar-SA',
    },
  ];

  return (
    <html lang="ar" dir="rtl" suppressHydrationWarning>
      <body className={`${cairo.variable} site-body`}>
        <Providers>
          <Loader />
          <div className="site-shell">
            {children}
            <FloatingContactButtons />
          </div>

          {jsonLd.map((item, index) => (
            <script
              key={index}
              type="application/ld+json"
              dangerouslySetInnerHTML={{
                __html: JSON.stringify(item),
              }}
            />
          ))}
        </Providers>
      </body>
    </html>
  );
}