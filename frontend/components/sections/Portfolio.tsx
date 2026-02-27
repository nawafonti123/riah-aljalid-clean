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
  isFeatured?: boolean;
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

  const hasProjects = useMemo(() => !loading && projects.length > 0, [loading, projects.length]);

  return (
    <section
      id="portfolio"
      ref={ref}
      className={[
        hasProjects ? 'py-14 sm:py-18 md:py-20' : 'py-10 sm:py-12',
        'bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-[#0F2027] transition-colors duration-300 overflow-hidden',
      ].join(' ')}
    >
      <div className="container mx-auto px-4">
        {/* العنوان */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.45 }}
          className="text-center mb-6 sm:mb-8"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
            أعمالنا
          </h2>
          <p className="mt-2 text-sm sm:text-base text-gray-600 dark:text-gray-300">
            نماذج من مشاريعنا الناجحة
          </p>
        </motion.div>

        {/* تحميل */}
        {loading && (
          <div className="max-w-xl mx-auto">
            <div className="bg-white/60 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-2xl p-6 sm:p-8 text-center">
              <div className="inline-flex items-center gap-2 text-gray-700 dark:text-gray-200">
                <FaImages className="opacity-70" />
                <span className="text-sm">جاري تحميل المشاريع...</span>
              </div>
            </div>
          </div>
        )}

        {/* لا يوجد مشاريع */}
        {!loading && projects.length === 0 && (
          <div className="max-w-xl mx-auto">
            <div className="bg-white/70 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-2xl p-6 sm:p-8 text-center">
              <div className="w-12 h-12 mx-auto rounded-2xl bg-[#01AEBE]/10 dark:bg-[#00c6ff]/10 flex items-center justify-center mb-3">
                <FaImages className="text-[#01AEBE] dark:text-[#00c6ff]" />
              </div>
              <p className="text-gray-700 dark:text-gray-200 font-semibold">لا توجد مشاريع حالياً</p>
              <p className="text-gray-500 dark:text-gray-300 text-sm mt-2">
                سيتم إضافة أعمالنا قريبًا بإذن الله.
              </p>
            </div>

            <div className="mt-8 flex justify-center">
              <div className="h-[2px] w-40 rounded-full bg-gradient-to-r from-transparent via-[#01AEBE]/60 to-transparent dark:via-[#00c6ff]/60" />
            </div>
          </div>
        )}

        {/* عرض المشاريع */}
        {hasProjects && (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {projects.map((p, idx) => {
              const hasVideo = (p.videos?.length || 0) > 0;
              const videoUrl = hasVideo ? p.videos![0] : null;

              const hasImage = (p.images?.length || 0) > 0;
              const imageUrl = hasImage ? p.images![0] : null;

              return (
                <motion.div
                  key={p.id}
                  initial={{ opacity: 0, y: 16 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.08 + idx * 0.05 }}
                  className="group rounded-2xl overflow-hidden border border-gray-200 dark:border-white/10 bg-white dark:bg-gray-800 shadow-lg"
                >
                  <div className="relative h-44 sm:h-48 bg-black/10 dark:bg-black/20">
                    {/* ✅ لو فيه صورة نعرضها */}
                    {imageUrl && (
                      <Image
                        src={imageUrl}
                        alt={p.title}
                        fill
                        sizes="(max-width: 1024px) 100vw, 33vw"
                        className="object-cover group-hover:scale-[1.03] transition-transform duration-500"
                      />
                    )}

                    {/* ✅ لو ما فيه صورة وفيه فيديو نعرض فيديو قابل للتشغيل */}
                    {!imageUrl && videoUrl && (
                      <video
                        src={videoUrl}
                        className="absolute inset-0 w-full h-full object-cover"
                        controls
                        preload="metadata"
                        playsInline
                      />
                    )}

                    {/* ✅ لو لا صورة ولا فيديو */}
                    {!imageUrl && !videoUrl && (
                      <Image
                        src="/logo.png"
                        alt={p.title}
                        fill
                        sizes="(max-width: 1024px) 100vw, 33vw"
                        className="object-contain p-6 opacity-90"
                      />
                    )}

                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/0 to-black/0 pointer-events-none" />

                    {hasVideo && (
                      <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-black/55 text-white text-xs flex items-center gap-2">
                        <FaPlay className="text-[10px]" />
                        فيديو
                      </div>
                    )}
                  </div>

                  <div className="p-4 sm:p-5">
                    <h3 className="text-base sm:text-lg font-bold text-gray-900 dark:text-white">
                      {p.title}
                    </h3>

                    {p.description && (
                      <p className="mt-2 text-sm text-gray-600 dark:text-gray-300 line-clamp-3">
                        {p.description}
                      </p>
                    )}

                    {p.category && (
                      <div className="mt-3">
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs bg-[#01AEBE]/10 text-[#017f8b] dark:bg-[#00c6ff]/10 dark:text-[#7fe8ff]">
                          {p.category}
                        </span>
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