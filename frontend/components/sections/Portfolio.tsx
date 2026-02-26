// frontend/components/sections/Portfolio.tsx (معدل لدعم الفيديو مع تبويبين)
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
  const [activeTab, setActiveTab] = useState<'images' | 'videos'>('images');
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

  // تصفية المشاريع حسب المحتوى المطلوب
  const projectsWithImages = projects.filter(p => p.images && p.images.length > 0);
  const projectsWithVideos = projects.filter(p => p.videos && p.videos.length > 0);

  return (
    <section id="portfolio" ref={ref} className="py-12 sm:py-16 md:py-20 bg-gradient-to-b from-[#203A43] to-[#2C5364]">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-8 sm:mb-10"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white">أعمالنا</h2>
        </motion.div>

        {/* تبويب الصور / الفيديو */}
        <div className="flex justify-center gap-4 mb-8">
          <button
            onClick={() => setActiveTab('images')}
            className={`flex items-center gap-2 px-6 py-2 rounded-full transition ${
              activeTab === 'images'
                ? 'bg-[#00c6ff] text-white'
                : 'bg-white/10 text-gray-300 hover:bg-white/20'
            }`}
          >
            <FaImage /> الصور
          </button>
          <button
            onClick={() => setActiveTab('videos')}
            className={`flex items-center gap-2 px-6 py-2 rounded-full transition ${
              activeTab === 'videos'
                ? 'bg-[#00c6ff] text-white'
                : 'bg-white/10 text-gray-300 hover:bg-white/20'
            }`}
          >
            <FaVideo /> الفيديوهات
          </button>
        </div>

        {loading ? (
          <div className="text-center text-white text-sm">جاري التحميل...</div>
        ) : (
          <>
            {activeTab === 'images' && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                {projectsWithImages.map((project, index) => (
                  <motion.div
                    key={project.id}
                    initial={{ opacity: 0, y: 15 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    className="glass-card p-3 sm:p-4 rounded-lg"
                  >
                    {project.images && project.images[0] && (
                      <img
                        src={project.images[0]}
                        alt={project.title}
                        className="w-full h-40 sm:h-48 object-cover rounded-md mb-2 cursor-pointer hover:opacity-80 transition"
                        onClick={() => openLightbox(project.images, 0)}
                      />
                    )}
                    <h3 className="text-sm sm:text-base font-bold text-white">{project.title}</h3>
                    <p className="text-xs sm:text-sm text-gray-300 mt-1 line-clamp-2">{project.description}</p>
                    {project.category && (
                      <span className="inline-block mt-1 text-[10px] sm:text-xs text-[#00c6ff] bg-white/10 px-2 py-0.5 rounded">
                        {project.category}
                      </span>
                    )}
                    {project.images && project.images.length > 1 && (
                      <div className="mt-2 text-xs text-gray-400">
                        + {project.images.length - 1} صور أخرى
                      </div>
                    )}
                  </motion.div>
                ))}
                {projectsWithImages.length === 0 && (
                  <p className="text-center text-gray-400 col-span-3">لا توجد صور متاحة</p>
                )}
              </div>
            )}

            {activeTab === 'videos' && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                {projectsWithVideos.map((project, index) => (
                  <motion.div
                    key={project.id}
                    initial={{ opacity: 0, y: 15 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    className="glass-card p-3 sm:p-4 rounded-lg"
                  >
                    {project.videos && project.videos[0] && (
                      <video
                        src={project.videos[0]}
                        controls
                        className="w-full h-40 sm:h-48 object-cover rounded-md mb-2"
                      />
                    )}
                    <h3 className="text-sm sm:text-base font-bold text-white">{project.title}</h3>
                    <p className="text-xs sm:text-sm text-gray-300 mt-1 line-clamp-2">{project.description}</p>
                    {project.category && (
                      <span className="inline-block mt-1 text-[10px] sm:text-xs text-[#00c6ff] bg-white/10 px-2 py-0.5 rounded">
                        {project.category}
                      </span>
                    )}
                    {project.videos && project.videos.length > 1 && (
                      <div className="mt-2 text-xs text-gray-400">
                        + {project.videos.length - 1} فيديوهات أخرى
                      </div>
                    )}
                  </motion.div>
                ))}
                {projectsWithVideos.length === 0 && (
                  <p className="text-center text-gray-400 col-span-3">لا توجد فيديوهات متاحة</p>
                )}
              </div>
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