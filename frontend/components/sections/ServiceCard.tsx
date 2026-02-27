// frontend/components/sections/ServiceCard.tsx
'use client';

import { motion } from 'framer-motion';
import { FaSnowflake, FaWind, FaTemperatureLow } from 'react-icons/fa';

const iconMap: Record<string, JSX.Element> = {
  '❄️': <FaSnowflake className="w-5 h-5 sm:w-6 md:w-7 text-[#01AEBE] dark:text-[#00c6ff]" />,
  '💨': <FaWind className="w-5 h-5 sm:w-6 md:w-7 text-[#01AEBE] dark:text-[#00c6ff]" />,
  '🧊': <FaTemperatureLow className="w-5 h-5 sm:w-6 md:w-7 text-[#01AEBE] dark:text-[#00c6ff]" />,
  
};

interface ServiceCardProps {
  title: string;
  description: string;
  icon: string;
}

export default function ServiceCard({ title, description, icon }: ServiceCardProps) {
  const IconComponent = iconMap[icon] || <FaSnowflake className="w-5 h-5 sm:w-6 md:w-7 text-[#01AEBE] dark:text-[#00c6ff]" />;

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      transition={{ type: 'spring', stiffness: 300 }}
      className="bg-white dark:bg-gray-800 p-4 sm:p-5 md:p-6 rounded-xl border border-gray-200 dark:border-gray-700 shadow-lg hover:shadow-xl transition-all h-full flex flex-col"
    >
      <div className="flex justify-center mb-2 md:mb-3">{IconComponent}</div>
      <h3 className="text-sm sm:text-base md:text-lg font-bold text-gray-900 dark:text-white mb-1 text-center">{title}</h3>
      <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 text-center flex-grow">{description}</p>
    </motion.div>
  );
}