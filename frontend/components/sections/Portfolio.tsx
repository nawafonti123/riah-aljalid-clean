'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import Image from 'next/image';
import { publicApi } from '@/lib/api';
import { FaImages, FaPlay } from 'react-icons/fa';

type Project = {
  id: string;
  title: string;
  description?: string;
  images?: string[];
  videos?: string[];
  category?: string;
};

export default function Portfolio() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.15 });

  useEffect(() => {
    const run = async () => {
      try {
        const data = await publicApi.getProjects();
        setProjects(Array.isArray(data) ? data : []);
      } catch {
        setProjects([]);
      } finally {
        setLoading(false);
      }
    };
    run();
  }, []);

  const imageProjects = useMemo(
    () => projects.filter((p) => (p.images?.length || 0) > 0),
    [projects],
  );

  const videoProjects = useMemo(
    () => projects.filter((p) => (p.videos?.length || 0) > 0),
    [projects],
  );

  const hasAny = useMemo(() => !loading && projects.length > 0, [loading, projects.length]);

  return (
    <section
      id="portfolio"
      ref={ref}
      className="py-12 sm:py-16 md:py-20 bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-[#0F2027] transition-colors duration-300"
    >
      <div className="container mx-auto px-4">

        {/* العنوان */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.45 }}
          className="text-center mb-8"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
            أعمالنا
          </h2>
          <p className="mt-2 text-sm sm:text-base text-gray-600 dark:text-gray-300">
            نماذج من مشاريعنا
          </p>
        </motion.div>

        {!loading && hasAny && (
          <div className="mt-4">

            {/* ========================= الصور ========================= */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {imageProjects.map((p, idx) => {
                const cover = p.images![0];

                return (
                  <motion.div
                    key={p.id}
                    initial={{ opacity: 0, y: 16 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.4, delay: 0.05 + idx * 0.03 }}
                    className="group relative rounded-2xl overflow-hidden border border-gray-200 dark:border-white/10 bg-white dark:bg-gray-800 shadow-lg transition-all duration-500 hover:scale-105 hover:shadow-2xl"
                  >
                    {/* صورة */}
                    <div className="relative h-48">
                      <Image
                        src={cover}
                        alt={p.title}
                        fill
                        sizes="(max-width: 1024px) 100vw, 33vw"
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                    </div>

                    {/* محتوى مختصر */}
                    <div className="p-4">
                      <h4 className="text-base sm:text-lg font-bold text-gray-900 dark:text-white">
                        {p.title}
                      </h4>
                      {p.description && (
                        <p className="mt-2 text-sm text-gray-600 dark:text-gray-300 line-clamp-2">
                          {p.description}
                        </p>
                      )}
                    </div>

                    {/* Overlay عند Hover */}
                    <div className="absolute inset-0 bg-black/80 backdrop-blur-md opacity-0 group-hover:opacity-100 transition-all duration-500 p-6 flex flex-col justify-center">
                      <h3 className="text-xl font-bold text-white mb-4 text-center">
                        {p.title}
                      </h3>

                      <div className="max-h-40 overflow-y-auto pr-2">
                        <p className="text-gray-300 text-sm leading-relaxed">
                          {p.description}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* ========================= الفيديوهات ========================= */}
            <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {videoProjects.map((p, idx) => {
                const videoUrl = p.videos![0];

                return (
                  <motion.div
                    key={p.id}
                    initial={{ opacity: 0, y: 16 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.4, delay: 0.05 + idx * 0.03 }}
                    className="group relative rounded-2xl overflow-hidden border border-gray-200 dark:border-white/10 bg-white dark:bg-gray-800 shadow-lg transition-all duration-500 hover:scale-105 hover:shadow-2xl"
                  >
                    <div className="relative h-48">
                      <video
                        src={videoUrl}
                        className="absolute inset-0 w-full h-full object-cover"
                        controls
                        preload="metadata"
                        playsInline
                      />
                    </div>

                    <div className="p-4">
                      <h4 className="text-base sm:text-lg font-bold text-gray-900 dark:text-white">
                        {p.title}
                      </h4>
                      {p.description && (
                        <p className="mt-2 text-sm text-gray-600 dark:text-gray-300 line-clamp-2">
                          {p.description}
                        </p>
                      )}
                    </div>

                    {/* Overlay */}
                    <div className="absolute inset-0 bg-black/85 backdrop-blur-md opacity-0 group-hover:opacity-100 transition-all duration-500 p-6 flex flex-col justify-center">
                      <h3 className="text-xl font-bold text-white mb-4 text-center">
                        {p.title}
                      </h3>

                      <div className="max-h-40 overflow-y-auto pr-2">
                        <p className="text-gray-300 text-sm leading-relaxed">
                          {p.description}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>

          </div>
        )}
      </div>
    </section>
  );
}