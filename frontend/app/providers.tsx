// frontend/app/providers.tsx
'use client';

import { ThemeProvider } from 'next-themes';
import { SessionProvider } from 'next-auth/react';
import { Toaster } from 'react-hot-toast';
import Lenis from '@studio-freight/lenis';
import { useEffect } from 'react';

export function Providers({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => {
      // تنظيف بسيط
      // @ts-ignore
      lenis?.destroy?.();
    };
  }, []);

  return (
    <SessionProvider>
      <ThemeProvider
        attribute="class"
        defaultTheme="light"     // ✅ الافتراضي فاتح
        enableSystem={false}     // ✅ لا يتبع نظام الجهاز
        themes={['light', 'dark']}
        storageKey="riah-theme"  // ✅ يحفظ اختيار المستخدم
      >
        <Toaster position="top-center" reverseOrder={false} />
        {children}
      </ThemeProvider>
    </SessionProvider>
  );
}