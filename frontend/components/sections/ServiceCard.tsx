'use client';

import { motion } from 'framer-motion';
import { FaSnowflake } from 'react-icons/fa';

interface ServiceCardProps {
  title: string;
  description: string;
  icon?: string;
  customIcon?: React.ReactNode;
  index?: number;
}

export default function ServiceCard({
  title,
  description,
  icon,
  customIcon,
  index = 0,
}: ServiceCardProps) {
  const renderIcon = () => {
    if (customIcon) {
      return customIcon;
    }

    if (icon && icon.startsWith('http')) {
      return (
        <img
          src={icon}
          alt={title}
          className="h-7 w-7 object-contain"
          loading="lazy"
        />
      );
    }

    return <FaSnowflake className="text-xl" />;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className="group relative overflow-hidden rounded-[28px] border border-white/10 bg-gradient-to-br from-white/8 to-white/[0.03] p-6 shadow-lg backdrop-blur-xl"
    >
      <div className="pointer-events-none absolute inset-0 opacity-0 transition duration-300 group-hover:opacity-100">
        <div className="absolute -right-10 top-0 h-28 w-28 rounded-full bg-cyan-400/10 blur-3xl" />
        <div className="absolute -left-10 bottom-0 h-28 w-28 rounded-full bg-sky-400/10 blur-3xl" />
      </div>

      <div className="relative z-10">
        <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl border border-cyan-400/15 bg-cyan-500/15 text-cyan-300 transition duration-300 group-hover:scale-105 group-hover:bg-cyan-500/20">
          {renderIcon()}
        </div>

        <h3 className="text-lg font-black text-white md:text-xl">{title}</h3>

        <p className="mt-3 text-sm leading-8 text-white/70 md:text-[15px]">
          {description}
        </p>
      </div>
    </motion.div>
  );
}