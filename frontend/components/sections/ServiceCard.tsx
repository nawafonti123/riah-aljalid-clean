// frontend/components/sections/ServiceCard.tsx
'use client';

import { motion } from 'framer-motion';
import { FaSnowflake } from 'react-icons/fa';

interface ServiceCardProps {
  title: string;
  description: string;
  icon: string;
  customIcon?: JSX.Element;
}

export default function ServiceCard({ title, description, icon, customIcon }: ServiceCardProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      transition={{ type: 'spring', stiffness: 300 }}
      className="bg-white dark:bg-gray-800 p-4 sm:p-5 md:p-6 rounded-xl border border-gray-200 dark:border-gray-700 shadow-lg hover:shadow-xl transition-all h-full flex flex-col"
    >
      <div className="flex justify-center mb-2 md:mb-3">
        {customIcon ? (
          <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[#01AEBE] to-[#9DCC40] dark:from-[#00c6ff] dark:to-[#2C5364] flex items-center justify-center text-white">
            {customIcon}
          </div>
        ) : (
          <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[#01AEBE] to-[#9DCC40] dark:from-[#00c6ff] dark:to-[#2C5364] flex items-center justify-center">
            <FaSnowflake className="w-6 h-6 text-white" />
          </div>
        )}
      </div>
      <h3 className="text-sm sm:text-base md:text-lg font-bold text-gray-900 dark:text-white mb-1 text-center">{title}</h3>
      <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 text-center flex-grow">{description}</p>
    </motion.div>
  );
}