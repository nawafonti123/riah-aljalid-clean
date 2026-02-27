// frontend/components/sections/Hero.tsx
'use client';

import { useTheme } from 'next-themes';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function Hero() {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* خلفية متدرجة حسب الوضع */}
      <div className={`absolute inset-0 transition-colors duration-500 ${
        theme === 'dark' 
          ? 'bg-gradient-to-b from-[#0F2027] to-[#2C5364]' 
          : 'bg-gradient-to-b from-[#01AEBE] to-[#9DCC40]'
      }`} />

      {/* عناصر زخرفية بسيطة (بدون Three.js) */}
      {theme === 'dark' && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-white/20 rounded-full animate-float"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${8 + Math.random() * 7}s`,
              }}
            />
          ))}
        </div>
      )}

      {theme === 'light' && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(15)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-white/30 rounded-full animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${3 + Math.random() * 4}s`,
              }}
            />
          ))}
        </div>
      )}

      <div className="relative z-10 flex h-full flex-col items-center justify-center text-center px-4">
        <div className="relative w-32 h-32 mb-6 rounded-full overflow-hidden border-4 border-white/30 dark:border-white/20 shadow-xl">
          <Image
            src="/logo.png"
            alt="رياح الجليد"
            fill
            className="object-cover"
          />
        </div>
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold leading-tight">
          <span className="block text-white">رياح</span>
          <span className="block text-white">الجليد</span>
        </h1>
        <p className="mt-3 text-sm sm:text-base md:text-lg lg:text-xl max-w-xs sm:max-w-sm md:max-w-md text-white/90">
          حلول تبريد متكاملة لهندسة المستقبل
        </p>
        <Link
          href="#services"
          className="mt-6 rounded-full bg-white/10 px-6 py-3 text-sm sm:text-base backdrop-blur-sm border border-white/20 shadow-lg hover:shadow-xl transition-all duration-300 text-white hover:bg-white/20"
        >
          اكتشف خدماتنا
        </Link>
      </div>

      <style jsx>{`
        @keyframes float {
          0% { transform: translateY(0) rotate(0deg); opacity: 0; }
          10% { opacity: 0.3; }
          90% { opacity: 0.3; }
          100% { transform: translateY(-100vh) rotate(360deg); opacity: 0; }
        }
        .animate-float {
          animation: float linear infinite;
        }
      `}</style>
    </section>
  );
}
