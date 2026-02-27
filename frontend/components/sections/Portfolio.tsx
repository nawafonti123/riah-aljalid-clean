// frontend/components/sections/Portfolio.tsx
'use client';

import { useEffect, useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { publicApi } from '@/lib/api';
import Lightbox from '@/components/ui/Lightbox';
import { FaImage, FaVideo } from 'react-icons/fa';

interface Project {
  id: string;
  title: string;
  description: string;
  images: string[];
  videos: string[];
  category?: string;
}

export default function Portfolio() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentMedia, setCurrentMedia] = useState<string[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.1 });

  useEffect(() => {
    publicApi.getProjects()
      .then(data => setProjects(data))
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  const openLightbox = (media: string[], index: number) => {
    setCurrentMedia(media);
    setCurrentIndex(index);
    setLightboxOpen(true);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % currentMedia.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + currentMedia.length) % currentMedia.length);
  };

  const projectsWithImages = projects.filter(p => p.images && p.images.length > 0);
  const projectsWithVideos = projects.filter(p => p.videos && p.videos.length > 0);

  return (
    <section id="portfolio" ref={ref} className="py-12 sm:py-16 md:py-20 bg-gradient-to-b from-white to-gray-50 dark:from-[#203A43] dark:to-[#2C5364] transition-colors duration-300">
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
          <div className="text-center text-gray-600 dark:text-gray-300">جاري التحميل...</div>
        ) : (
          <>
            {/* قسم الصور */}
            {projectsWithImages.length > 0 && (
              <div className="mb-16">
                <div className="text-center mb-8">
                  <div className="inline-flex items-center justify-center gap-2 mb-2">
                    <FaImage className="text-3xl text-[#01AEBE] dark:text-[#00c6ff]" />
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">معرض الصور</h3>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                  {projectsWithImages.map((project, index) => (
                    <motion.div
                      key={project.id}
                      initial={{ opacity: 0, y: 15 }}
                      animate={inView ? { opacity: 1, y: 0 } : {}}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                      className="bg-white dark:bg-gray-800 p-3 sm:p-4 rounded-lg shadow-md border border-gray-200 dark:border-gray-700"
                    >
                      {project.images[0] && (
                        <img
                          src={project.images[0]}
                          alt={project.title}
                          className="w-full h-40 sm:h-48 object-cover rounded-md mb-2 cursor-pointer hover:opacity-80 transition"
                          onClick={() => openLightbox(project.images, 0)}
                        />
                      )}
                      <h3 className="text-sm sm:text-base font-bold text-gray-900 dark:text-white">{project.title}</h3>
                      <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 mt-1 line-clamp-2">{project.description}</p>
                      {project.category && (
                        <span className="inline-block mt-1 text-[10px] sm:text-xs px-2 py-0.5 rounded bg-[#01AEBE]/10 dark:bg-[#00c6ff]/10 text-[#01AEBE] dark:text-[#00c6ff]">
                          {project.category}
                        </span>
                      )}
                      {project.images.length > 1 && (
                        <div className="mt-2 text-xs text-gray-500 dark:text-gray-400">
                          + {project.images.length - 1} صور أخرى
                        </div>
                      )}
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {/* قسم الفيديوهات */}
            {projectsWithVideos.length > 0 && (
              <div className="mb-16">
                <div className="text-center mb-8">
                  <div className="inline-flex items-center justify-center gap-2 mb-2">
                    <FaVideo className="text-3xl text-[#01AEBE] dark:text-[#00c6ff]" />
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">مكتبة الفيديو</h3>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                  {projectsWithVideos.map((project, index) => (
                    <motion.div
                      key={project.id}
                      initial={{ opacity: 0, y: 15 }}
                      animate={inView ? { opacity: 1, y: 0 } : {}}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                      className="bg-white dark:bg-gray-800 p-3 sm:p-4 rounded-lg shadow-md border border-gray-200 dark:border-gray-700"
                    >
                      {project.videos[0] && (
                        <video
                          src={project.videos[0]}
                          controls
                          className="w-full h-40 sm:h-48 object-cover rounded-md mb-2"
                        />
                      )}
                      <h3 className="text-sm sm:text-base font-bold text-gray-900 dark:text-white">{project.title}</h3>
                      <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 mt-1 line-clamp-2">{project.description}</p>
                      {project.category && (
                        <span className="inline-block mt-1 text-[10px] sm:text-xs px-2 py-0.5 rounded bg-[#01AEBE]/10 dark:bg-[#00c6ff]/10 text-[#01AEBE] dark:text-[#00c6ff]">
                          {project.category}
                        </span>
                      )}
                      {project.videos.length > 1 && (
                        <div className="mt-2 text-xs text-gray-500 dark:text-gray-400">
                          + {project.videos.length - 1} فيديوهات أخرى
                        </div>
                      )}
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {projectsWithImages.length === 0 && projectsWithVideos.length === 0 && (
              <p className="text-center text-gray-500 dark:text-gray-400">لا توجد مشاريع حالياً</p>
            )}
          </>
        )}
      </div>

      <Lightbox
        images={currentMedia}
        currentIndex={currentIndex}
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        onNext={handleNext}
        onPrev={handlePrev}
      />
    </section>
  );
}