'use client';

import { useEffect, useMemo, useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { FaCamera, FaExpand, FaTimes, FaBuilding } from 'react-icons/fa';
import { publicApi } from '@/lib/api';

type CompanyImage = {
  id: string;
  title?: string;
  image: string;
  category?: string;
  order?: number;
  createdAt?: string;
};

export default function CompanyGallery() {
  const [images, setImages] = useState<CompanyImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState<CompanyImage | null>(null);

  useEffect(() => {
    const loadImages = async () => {
      try {
        const data = await publicApi.getCompanyImages();
        setImages(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error('Failed to load company images:', error);
        setImages([]);
      } finally {
        setLoading(false);
      }
    };

    loadImages();
  }, []);

  const orderedImages = useMemo(() => {
    return [...images].sort((a, b) => {
      const aOrder = a.order ?? 0;
      const bOrder = b.order ?? 0;

      if (aOrder !== bOrder) return aOrder - bOrder;

      const aDate = a.createdAt ? new Date(a.createdAt).getTime() : 0;
      const bDate = b.createdAt ? new Date(b.createdAt).getTime() : 0;

      return bDate - aDate;
    });
  }, [images]);

  if (loading || orderedImages.length === 0) {
    return null;
  }

  return (
    <section id="company-gallery" className="section-shell">
      <div className="container">
        <div className="mb-10 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <span className="mb-4 inline-flex rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-2 text-sm font-black text-cyan-300">
              صور الشركة
            </span>
            <h2 className="section-title">لمحات من الشركة وفريق العمل</h2>
            <p className="section-subtitle">
              مجموعة من الصور التي تعكس بيئة العمل والتنفيذ والهوية المهنية داخل
              رياح الجليد بشكل مرتب وواضح.
            </p>
          </div>

          <div className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-5 py-3 text-sm font-black text-white/80">
            <FaBuilding className="text-cyan-300" />
            <span>{orderedImages.length} صورة</span>
          </div>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {orderedImages.map((img, index) => (
            <motion.div
              key={img.id}
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.12 }}
              transition={{ duration: 0.38, delay: index * 0.04 }}
              className="group glass-card overflow-hidden"
            >
              <div className="relative h-[280px] overflow-hidden bg-slate-900/40">
                <Image
                  src={img.image}
                  alt={img.title || 'صورة من الشركة'}
                  fill
                  className="object-cover transition duration-500 group-hover:scale-[1.04]"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent" />

                <button
                  type="button"
                  onClick={() => setSelectedImage(img)}
                  className="absolute left-4 top-4 flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-slate-950/45 text-white backdrop-blur-md"
                  aria-label="تكبير الصورة"
                >
                  <FaExpand />
                </button>

                <div className="absolute inset-x-4 bottom-4 rounded-[22px] border border-white/10 bg-slate-950/40 p-4 backdrop-blur-md">
                  <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-cyan-500/15 text-cyan-300">
                      <FaCamera />
                    </div>

                    <div className="min-w-0">
                      <h3 className="line-clamp-1 text-sm font-black text-white md:text-base">
                        {img.title || 'صورة من الشركة'}
                      </h3>

                      {img.category && (
                        <p className="mt-1 line-clamp-1 text-xs font-bold text-white/60 md:text-sm">
                          {img.category}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <AnimatePresence>
          {selectedImage && (
            <motion.div
              className="fixed inset-0 z-[1500] flex items-center justify-center bg-slate-950/85 p-4 backdrop-blur-md"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedImage(null)}
            >
              <motion.div
                className="max-h-[92vh] w-full max-w-6xl overflow-hidden rounded-[30px] border border-white/10 bg-[#081318] shadow-2xl"
                initial={{ opacity: 0, scale: 0.97, y: 16 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.97, y: 16 }}
                transition={{ duration: 0.22 }}
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex items-center justify-between gap-4 border-b border-white/10 px-5 py-4">
                  <div>
                    <h3 className="text-xl font-black text-white">
                      {selectedImage.title || 'صورة من الشركة'}
                    </h3>
                    {selectedImage.category && (
                      <p className="mt-1 text-sm text-white/55">
                        {selectedImage.category}
                      </p>
                    )}
                  </div>

                  <button
                    type="button"
                    onClick={() => setSelectedImage(null)}
                    className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white"
                    aria-label="إغلاق"
                  >
                    <FaTimes />
                  </button>
                </div>

                <div className="max-h-[calc(92vh-88px)] overflow-y-auto p-5">
                  <div className="relative min-h-[340px] overflow-hidden rounded-[24px] bg-black md:min-h-[620px]">
                    <Image
                      src={selectedImage.image}
                      alt={selectedImage.title || 'صورة من الشركة'}
                      fill
                      className="object-contain"
                    />
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}