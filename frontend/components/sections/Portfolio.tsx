'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import Image from 'next/image';
import { publicApi } from '@/lib/api';

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

  const hasAny = !loading && projects.length > 0;

  return (
    <section
      id="portfolio"
      ref={ref}
      className="py-16 bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-[#0F2027]"
    >
      <div className="container mx-auto px-4">

        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
            أعمالنا
          </h2>
        </div>

        {hasAny && (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">

            {/* =================== الصور =================== */}
            {imageProjects.map((p, idx) => {
              const cover = p.images![0];

              return (
                <motion.div
                  key={p.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.4, delay: idx * 0.05 }}
                  className="rounded-2xl overflow-hidden bg-white dark:bg-gray-800 border border-gray-200 dark:border-white/10 shadow-lg transition-all duration-500 hover:scale-105 hover:shadow-2xl"
                >
                  <div className="relative h-52">
                    <Image
                      src={cover}
                      alt={p.title}
                      fill
                      sizes="(max-width: 1024px) 100vw, 33vw"
                      className="object-cover"
                    />
                  </div>

                  <div className="p-5">
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                      {p.title}
                    </h3>

                    {p.description && (
                      <div className="mt-3 max-h-40 overflow-y-auto pr-1">
                        <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                          {p.description}
                        </p>
                      </div>
                    )}
                  </div>
                </motion.div>
              );
            })}

            {/* =================== الفيديوهات =================== */}
            {videoProjects.map((p, idx) => {
              const videoUrl = p.videos![0];

              return (
                <motion.div
                  key={p.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.4, delay: idx * 0.05 }}
                  className="rounded-2xl overflow-hidden bg-white dark:bg-gray-800 border border-gray-200 dark:border-white/10 shadow-lg transition-all duration-500 hover:scale-105 hover:shadow-2xl"
                >
                  <div className="relative h-52 bg-black">
                    <video
                      src={videoUrl}
                      className="w-full h-full object-cover"
                      controls
                      preload="metadata"
                      playsInline
                    />
                  </div>

                  <div className="p-5">
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                      {p.title}
                    </h3>

                    {p.description && (
                      <div className="mt-3 max-h-40 overflow-y-auto pr-1">
                        <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                          {p.description}
                        </p>
                      </div>
                    )}
                  </div>
                </motion.div>
              );
            })}

          </div>
        )}
      </div>
    </section>
  );
}