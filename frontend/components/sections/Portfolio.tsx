// frontend/components/sections/Portfolio.tsx
'use client';

import { useEffect, useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { publicApi } from '@/lib/api';
import { useTheme } from 'next-themes';

interface Project {
  id: string;
  title: string;
  description: string;
  images: string[];
  category?: string;
}

export default function Portfolio() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.1 });
  const { theme } = useTheme();

  useEffect(() => {
    publicApi.getProjects()
      .then(data => setProjects(data.slice(0, 3)))
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <section id="portfolio" ref={ref} className="py-12 sm:py-16 md:py-20 bg-white dark:bg-gray-900 transition-colors duration-300">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-8 sm:mb-10"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">أعمالنا</h2>
          <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 mt-2">نماذج من مشاريعنا الناجحة</p>
        </motion.div>

        {loading ? (
          <div className="text-center text-gray-600 dark:text-gray-300 text-sm">جاري التحميل...</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {projects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 15 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="bg-gray-50 dark:bg-gray-800 p-3 sm:p-4 rounded-lg shadow-md border border-gray-200 dark:border-gray-700"
              >
                {project.images?.[0] && (
                  <img
                    src={project.images[0]}
                    alt={project.title}
                    className="w-full h-40 sm:h-48 object-cover rounded-md mb-2"
                    loading="lazy"
                  />
                )}
                <h3 className="text-sm sm:text-base font-bold text-gray-900 dark:text-white">{project.title}</h3>
                <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 mt-1 line-clamp-2">{project.description}</p>
                {project.category && (
                  <span className="inline-block mt-1 text-[10px] sm:text-xs px-2 py-0.5 rounded bg-[#01AEBE]/10 dark:bg-[#00c6ff]/10 text-[#01AEBE] dark:text-[#00c6ff]">
                    {project.category}
                  </span>
                )}
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
