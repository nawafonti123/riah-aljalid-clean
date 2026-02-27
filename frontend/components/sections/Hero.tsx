// frontend/components/sections/Hero.tsx
'use client';

import { Suspense, lazy } from 'react';
import { Canvas } from '@react-three/fiber';
import { useTheme } from 'next-themes';
import { useState, useEffect } from 'react';

const ParticleWind = lazy(() => import('../three/ParticleWind'));

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
      <div className={`absolute inset-0 ${
        theme === 'dark' 
          ? 'bg-gradient-to-b from-[#0F2027] to-[#2C5364]' 
          : 'bg-gradient-to-b from-[#01AEBE] to-[#9DCC40]'
      }`} />

      {/* جسيمات ثلجية خفيفة جداً (في الوضع الداكن فقط) */}
      {theme === 'dark' && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="absolute w-0.5 h-0.5 bg-white/20 rounded-full animate-float"
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

      {/* Canvas يحتوي على Suspense */}
      {theme === 'dark' && (
        <Canvas camera={{ position: [0, 0, 5] }} className="absolute inset-0">
          <Suspense fallback={null}>
            <ParticleWind />
          </Suspense>
        </Canvas>
      )}

      {/* طبقة التعتيم */}
      <div className={`absolute inset-0 ${
        theme === 'dark'
          ? 'bg-gradient-to-b from-[#0F2027]/80 via-[#203A43]/60 to-[#2C5364]/80'
          : 'bg-gradient-to-b from-[#01AEBE]/20 via-[#9DCC40]/10 to-transparent'
      } backdrop-blur-sm`} />

      {/* المحتوى */}
      <div className="relative z-10 flex h-full flex-col items-center justify-center text-center px-4">
        <div className="relative w-32 h-32 mb-6">
          <img
            src="/logo.png"
            alt="رياح الجليد"
            className="w-full h-full object-contain"
          />
        </div>
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold leading-tight">
          <span className={`block ${theme === 'dark' ? 'text-white' : 'text-[#FFFFFF]'}`}>رياح</span>
          <span className={`block ${theme === 'dark' ? 'text-white' : 'text-[#FFFFFF]'}`}>الجليد</span>
        </h1>
        <p className={`mt-3 text-sm sm:text-base md:text-lg lg:text-xl max-w-xs sm:max-w-sm md:max-w-md ${
          theme === 'dark' ? 'text-[#a0e7ff]' : 'text-white'
        }`}>
          حلول تبريد متكاملة لهندسة المستقبل
        </p>
        <button className="mt-6 rounded-full bg-white/10 px-5 py-2 text-xs sm:text-sm backdrop-blur-sm border border-white/20 shadow-[0_0_15px_rgba(1,174,190,0.5)] dark:shadow-[0_0_15px_#00c6ff] hover:shadow-[0_0_25px_rgba(1,174,190,0.8)] dark:hover:shadow-[0_0_25px_#00c6ff] transition-shadow duration-300 text-white">
          اكتشف خدماتنا
        </button>
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
