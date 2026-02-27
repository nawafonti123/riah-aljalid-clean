// frontend/components/sections/CompanyGallery.tsx
'use client';

import { useEffect, useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { publicApi } from '@/lib/api';

interface CompanyImage {
  id: string;
  title?: string;
  image: string;
  category?: string;
  order: number;
}

export default function CompanyGallery() {
  const [images, setImages] = useState<CompanyImage[]>([]);
  const [loading, setLoading] = useState(true);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.1 });

  useEffect(() => {
    publicApi.getCompanyImages()
      .then(data => setImages(data))
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  if (loading || images.length === 0) return null;

  return (
    <section ref={ref} className="py-12 sm:py-16 md:py-20 bg-white dark:bg-gray-900 transition-colors duration-300">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-8 sm:mb-10"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">صور من الشركة</h2>
          <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 mt-2">لمحات من مقر العمل وفريقنا الهندسي</p>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {images.map((img, index) => (
            <motion.div
              key={img.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              className="relative group overflow-hidden rounded-xl shadow-lg"
            >
              <img
                src={img.image}
                alt={img.title || 'صورة من الشركة'}
                className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
              />
              {img.title && (
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                  <p className="text-white text-sm font-medium">{img.title}</p>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}