// frontend/components/sections/Hero.tsx
'use client';

import { useTheme } from 'next-themes';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { FaArrowDown } from 'react-icons/fa';
import { motion } from 'framer-motion';

export default function Hero() {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const scrollToAbout = () => {
    const aboutSection = document.getElementById('about');
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  if (!mounted) return null;

  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* خلفية متدرجة حسب الوضع */}
      <div className={`absolute inset-0 transition-colors duration-500 ${
        theme === 'dark' 
          ? 'bg-gradient-to-br from-[#0F2027] via-[#203A43] to-[#2C5364]' 
          : 'bg-gradient-to-br from-[#01AEBE] via-[#01AEBE]/90 to-[#9DCC40]'
      }`} />

      {/* عناصر زخرفية متحركة */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className={`absolute w-2 h-2 ${
              theme === 'dark' ? 'bg-white/20' : 'bg-white/30'
            } rounded-full animate-float`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${8 + Math.random() * 7}s`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 flex h-full flex-col items-center justify-center text-center px-4">
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, type: 'spring' }}
          className="relative w-32 h-32 mb-6 rounded-full overflow-hidden border-4 border-white/30 dark:border-white/20 shadow-2xl"
        >
          <Image
            src="/logo.png"
            alt="رياح الجليد"
            fill
            className="object-cover"
          />
        </motion.div>

        <motion.h1
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-bold leading-tight"
        >
          <span className="block text-white">رياح</span>
          <span className="block text-white">الجليد</span>
        </motion.h1>

        <motion.p
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-4 text-lg sm:text-xl md:text-2xl lg:text-3xl max-w-2xl text-white/90"
        >
          حلول تبريد متكاملة لهندسة المستقبل
        </motion.p>

        <motion.button
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          onClick={scrollToAbout}
          className="mt-8 group cursor-pointer"
        >
          <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm border border-white/30 flex items-center justify-center hover:bg-white/20 transition-all duration-300 hover:scale-110">
            <FaArrowDown className="text-white text-xl animate-bounce" />
          </div>
        </motion.button>
      </div>

      <style jsx>{`
        @keyframes float {
          0% { transform: translateY(0) translateX(0) rotate(0deg); opacity: 0; }
          10% { opacity: 0.5; }
          90% { opacity: 0.5; }
          100% { transform: translateY(-100vh) translateX(100px) rotate(360deg); opacity: 0; }
        }
        .animate-float {
          animation: float linear infinite;
        }
      `}</style>
    </section>
  );
}