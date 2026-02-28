// frontend/components/sections/Portfolio.tsx
'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import Image from 'next/image';
import { publicApi } from '@/lib/api';
import { FaImages, FaPlay, FaExpand, FaTimes } from 'react-icons/fa';

type Project = {
  id: string;
  title: string;
  description?: string;
  images?: string[];
  videos?: string[];
  category?: string;
};

type LightboxState =
  | { open: false }
  | { open: true; type: 'image' | 'video'; src: string; title?: string };

function requestFullscreen(el: HTMLElement | null) {
  if (!el) return;
  const anyEl = el as any;
  if (anyEl.requestFullscreen) anyEl.requestFullscreen();
  else if (anyEl.webkitRequestFullscreen) anyEl.webkitRequestFullscreen();
  else if (anyEl.msRequestFullscreen) anyEl.msRequestFullscreen();
}

export default function Portfolio() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  const [lightbox, setLightbox] = useState<LightboxState>({ open: false });

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

  // ESC يغلق المودال
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setLightbox({ open: false });
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
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
      className="py-12 sm:py-16 md:py-20 bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-[#0F2027] transition-colors duration-300 overflow-x-clip"
    >
      <div className="container mx-auto px-4">
        {/* العنوان */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.45 }}
          className="text-center mb-8"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">أعمالنا</h2>
          <p className="mt-2 text-sm sm:text-base text-gray-600 dark:text-gray-300">نماذج من مشاريعنا</p>
        </motion.div>

        {/* تحميل */}
        {loading && (
          <div className="max-w-xl mx-auto">
            <div className="bg-white/60 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-2xl p-6 sm:p-8 text-center">
              <div className="inline-flex items-center gap-2 text-gray-700 dark:text-gray-200">
                <FaImages className="opacity-70" />
                <span className="text-sm">جاري تحميل الأعمال...</span>
              </div>
            </div>
          </div>
        )}

        {/* لا يوجد أي أعمال */}
        {!loading && !hasAny && (
          <div className="max-w-xl mx-auto">
            <div className="bg-white/70 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-2xl p-6 sm:p-8 text-center">
              <div className="w-12 h-12 mx-auto rounded-2xl bg-[#01AEBE]/10 dark:bg-[#00c6ff]/10 flex items-center justify-center mb-3">
                <FaImages className="text-[#01AEBE] dark:text-[#00c6ff]" />
              </div>
              <p className="text-gray-700 dark:text-gray-200 font-semibold">لا توجد أعمال حالياً</p>
              <p className="text-gray-500 dark:text-gray-300 text-sm mt-2">سيتم إضافة صور وفيديوهات قريبًا.</p>
            </div>
          </div>
        )}

        {/* =========================
            ✅ قسم الصور
           ========================= */}
        {!loading && hasAny && (
          <div className="mt-4">
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-2xl bg-[#01AEBE]/10 dark:bg-[#00c6ff]/10 flex items-center justify-center">
                <FaImages className="text-[#01AEBE] dark:text-[#00c6ff]" />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">قسم الصور</h3>
              <span className="text-xs sm:text-sm px-3 py-1 rounded-full bg-gray-100 dark:bg-white/10 text-gray-700 dark:text-gray-200">
                {imageProjects.length}
              </span>
            </div>

            {imageProjects.length === 0 ? (
              <div className="max-w-xl mx-auto text-center text-gray-600 dark:text-gray-300 bg-white/60 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-2xl p-6">
                لا توجد صور حالياً
              </div>
            ) : (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                {imageProjects.map((p, idx) => {
                  const cover = p.images![0];

                  return (
                    <motion.div
                      key={p.id}
                      initial={{ opacity: 0, y: 16 }}
                      animate={inView ? { opacity: 1, y: 0 } : {}}
                      transition={{ duration: 0.4, delay: 0.05 + idx * 0.03 }}
                      className="group rounded-2xl overflow-hidden border border-gray-200 dark:border-white/10 bg-white dark:bg-gray-800 shadow-lg"
                    >
                      <div className="relative h-44 sm:h-48 overflow-hidden">
                        <Image
                          src={cover}
                          alt={p.title}
                          fill
                          sizes="(max-width: 1024px) 100vw, 33vw"
                          className="object-cover group-hover:scale-[1.03] transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/0 to-black/0 pointer-events-none" />

                        {/* ✅ زر تكبير الصورة */}
                        <button
                          type="button"
                          onClick={() => setLightbox({ open: true, type: 'image', src: cover, title: p.title })}
                          className="absolute top-3 right-3 z-10 w-10 h-10 rounded-xl bg-black/45 hover:bg-black/60 text-white flex items-center justify-center backdrop-blur-sm transition"
                          aria-label="تكبير الصورة"
                          title="تكبير"
                        >
                          <FaExpand className="text-sm" />
                        </button>
                      </div>

                      <div className="p-4 sm:p-5">
                        <h4 className="text-base sm:text-lg font-bold text-gray-900 dark:text-white">{p.title}</h4>
                        {p.description && (
                          <p className="mt-2 text-sm text-gray-600 dark:text-gray-300 line-clamp-3">{p.description}</p>
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

            {/* فاصل */}
            <div className="mt-10 mb-10 flex justify-center">
              <div className="h-[2px] w-56 rounded-full bg-gradient-to-r from-transparent via-[#01AEBE]/60 to-transparent dark:via-[#00c6ff]/60" />
            </div>

            {/* =========================
                ✅ قسم الفيديوهات
               ========================= */}
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-2xl bg-[#01AEBE]/10 dark:bg-[#00c6ff]/10 flex items-center justify-center">
                <FaPlay className="text-[#01AEBE] dark:text-[#00c6ff]" />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">قسم الفيديوهات</h3>
              <span className="text-xs sm:text-sm px-3 py-1 rounded-full bg-gray-100 dark:bg-white/10 text-gray-700 dark:text-gray-200">
                {videoProjects.length}
              </span>
            </div>

            {videoProjects.length === 0 ? (
              <div className="max-w-xl mx-auto text-center text-gray-600 dark:text-gray-300 bg-white/60 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-2xl p-6">
                لا توجد فيديوهات حالياً
              </div>
            ) : (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                {videoProjects.map((p, idx) => {
                  const videoUrl = p.videos![0];

                  return (
                    <motion.div
                      key={p.id}
                      initial={{ opacity: 0, y: 16 }}
                      animate={inView ? { opacity: 1, y: 0 } : {}}
                      transition={{ duration: 0.4, delay: 0.05 + idx * 0.03 }}
                      className="group rounded-2xl overflow-hidden border border-gray-200 dark:border-white/10 bg-white dark:bg-gray-800 shadow-lg"
                    >
                      <div className="relative h-44 sm:h-48 bg-black/10 dark:bg-black/20 overflow-hidden">
                        <video
                          src={videoUrl}
                          className="absolute inset-0 w-full h-full object-cover"
                          controls
                          preload="metadata"
                          playsInline
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-black/0 to-black/0 pointer-events-none" />

                        {/* ✅ زر تكبير الفيديو (مودال كبير) */}
                        <button
                          type="button"
                          onClick={() => setLightbox({ open: true, type: 'video', src: videoUrl, title: p.title })}
                          className="absolute top-3 right-3 z-10 w-10 h-10 rounded-xl bg-black/45 hover:bg-black/60 text-white flex items-center justify-center backdrop-blur-sm transition"
                          aria-label="تكبير الفيديو"
                          title="تكبير"
                        >
                          <FaExpand className="text-sm" />
                        </button>

                        {/* ✅ زر Fullscreen للفيديو داخل الكرت (اختياري) */}
                        <button
                          type="button"
                          onClick={(e) => {
                            const wrap = (e.currentTarget.parentElement as HTMLElement) || null;
                            const v = wrap?.querySelector('video') as HTMLVideoElement | null;
                            requestFullscreen(v as any);
                          }}
                          className="absolute top-3 left-3 z-10 w-10 h-10 rounded-xl bg-black/35 hover:bg-black/55 text-white flex items-center justify-center backdrop-blur-sm transition"
                          aria-label="ملء الشاشة"
                          title="Fullscreen"
                        >
                          <FaPlay className="text-[12px]" />
                        </button>
                      </div>

                      <div className="p-4 sm:p-5">
                        <h4 className="text-base sm:text-lg font-bold text-gray-900 dark:text-white">{p.title}</h4>
                        {p.description && (
                          <p className="mt-2 text-sm text-gray-600 dark:text-gray-300 line-clamp-3">{p.description}</p>
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
        )}
      </div>

      {/* ✅ Lightbox (تكبير صورة/فيديو) */}
      {lightbox.open && (
        <div
          className="fixed inset-0 z-[9999] bg-black/70 backdrop-blur-sm flex items-center justify-center p-4"
          onMouseDown={() => setLightbox({ open: false })}
        >
          <div
            className="relative w-full max-w-5xl bg-white/90 dark:bg-gray-900/90 border border-white/10 rounded-2xl overflow-hidden shadow-2xl"
            onMouseDown={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200/60 dark:border-white/10">
              <div className="text-sm sm:text-base font-bold text-gray-900 dark:text-white truncate">
                {lightbox.title || 'عرض'}
              </div>
              <button
                type="button"
                onClick={() => setLightbox({ open: false })}
                className="w-10 h-10 rounded-xl bg-black/10 dark:bg-white/10 hover:bg-black/20 dark:hover:bg-white/20 flex items-center justify-center transition"
                aria-label="إغلاق"
              >
                <FaTimes />
              </button>
            </div>

            <div className="relative w-full bg-black">
              {lightbox.type === 'image' ? (
                <img
                  src={lightbox.src}
                  alt={lightbox.title || 'image'}
                  className="w-full max-h-[75vh] object-contain"
                />
              ) : (
                <video
                  src={lightbox.src}
                  className="w-full max-h-[75vh] object-contain"
                  controls
                  autoPlay
                  playsInline
                />
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}