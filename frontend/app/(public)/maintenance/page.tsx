// frontend/app/(public)/maintenance/page.tsx
'use client';

import { motion } from 'framer-motion';
import { FaSnowflake } from 'react-icons/fa';
import { useEffect, useState } from 'react';

export default function MaintenancePage({ message }: { message?: string }) {
  const defaultMessage = 'الموقع تحت الصيانة حالياً، نعمل على تحسين تجربتك، شكراً لصبرك.';
  const displayMessage = message || defaultMessage;
  const [dimensions, setDimensions] = useState({ width: 1200, height: 800 });

  useEffect(() => {
    setDimensions({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0F2027] via-[#203A43] to-[#2C5364] flex items-center justify-center relative overflow-hidden">
      {dimensions.width > 0 && (
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(30)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-white/30 rounded-full"
              initial={{
                x: Math.random() * dimensions.width,
                y: -10,
              }}
              animate={{
                y: dimensions.height + 10,
                x: `+=${Math.sin(i) * 50}`,
              }}
              transition={{
                duration: 5 + Math.random() * 5,
                repeat: Infinity,
                delay: Math.random() * 5,
                ease: 'linear',
              }}
            />
          ))}
        </div>
      )}

      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
        className="absolute opacity-10"
      >
        <FaSnowflake className="text-white text-9xl" />
      </motion.div>

      <div className="relative z-10 text-center text-white px-4">
        <motion.h1
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-5xl md:text-7xl font-bold mb-6"
        >
          رياح الجليد
        </motion.h1>
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="glass-card p-8 rounded-2xl max-w-2xl mx-auto"
        >
          <div className="text-7xl mb-4 flex justify-center">
            <FaSnowflake className="text-[#00c6ff] animate-pulse" />
          </div>
          <p className="text-xl md:text-2xl text-gray-200 leading-relaxed">
            {displayMessage}
          </p>
          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="mt-8 text-sm text-[#00c6ff]"
          >
            ❄️ جاري التبريد... ❄️
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}