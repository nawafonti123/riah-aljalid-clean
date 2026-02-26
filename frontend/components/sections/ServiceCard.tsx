// frontend/components/sections/ServiceCard.tsx
'use client';

import { motion } from 'framer-motion';
import { FaSnowflake, FaWind, FaTemperatureLow, FaTruck, FaIndustry, FaRuler } from 'react-icons/fa';

const iconMap: Record<string, JSX.Element> = {
  '❄️': <FaSnowflake className="w-5 h-5 sm:w-6 md:w-7 text-[#00c6ff]" />,
  '💨': <FaWind className="w-5 h-5 sm:w-6 md:w-7 text-[#00c6ff]" />,
  '🧊': <FaTemperatureLow className="w-5 h-5 sm:w-6 md:w-7 text-[#00c6ff]" />,
  'FaTruck': <FaTruck className="w-5 h-5 sm:w-6 md:w-7 text-[#00c6ff]" />,
  'FaIndustry': <FaIndustry className="w-5 h-5 sm:w-6 md:w-7 text-[#00c6ff]" />,
  'FaRuler': <FaRuler className="w-5 h-5 sm:w-6 md:w-7 text-[#00c6ff]" />,
};

interface ServiceCardProps {
  title: string;
  description: string;
  icon: string;
}

export default function ServiceCard({ title, description, icon }: ServiceCardProps) {
  const IconComponent = iconMap[icon] || <FaSnowflake className="w-5 h-5 sm:w-6 md:w-7 text-[#00c6ff]" />;

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      transition={{ type: 'spring', stiffness: 300 }}
      className="glass-card p-4 sm:p-5 md:p-6 rounded-xl border border-white/10 backdrop-blur-sm bg-white/5 h-full flex flex-col"
    >
      <div className="flex justify-center mb-2 md:mb-3">{IconComponent}</div>
      <h3 className="text-sm sm:text-base md:text-lg font-bold text-white mb-1 text-center">{title}</h3>
      <p className="text-xs sm:text-sm text-gray-300 text-center flex-grow">{description}</p>
    </motion.div>
  );
}