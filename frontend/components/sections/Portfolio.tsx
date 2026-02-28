'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import Image from 'next/image';
import Tilt from 'react-parallax-tilt';
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

  return (
    <section
      id="portfolio"
      ref={ref}
      className="py-20 bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-[#0F2027]"
    >
      <div className="container mx-auto px-4">

        <div className="text-center mb-14">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white">
            أعمالنا
          </h2>
        </div>

        {/* ========================= قسم الصور ========================= */}
        <div className="mb-24">
          <div className="flex items-center justify-center gap-3 mb-10">
            <FaImages className="text-[#01AEBE] text-2xl" />
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
              قسم الصور
            </h3>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-12">
            {imageProjects.map((p, idx) => {
              const cover = p.images![0];

              return (
                <motion.div
                  key={p.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: idx * 0.05 }}
                >
                  <Tilt
                    tiltMaxAngleX={12}
                    tiltMaxAngleY={12}
                    perspective={1200}
                    transitionSpeed={1200}
                    glareEnable
                    glareMaxOpacity={0.15}
                    scale={1.05}
                    className="rounded-2xl"
                  >
                    <div className="relative rounded-2xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-white/10 shadow-2xl overflow-hidden transition-all duration-500 hover:shadow-[0_0_50px_rgba(0,255,200,0.25)]">
                      
                      <div className="relative h-56 overflow-hidden">
                        <Image
                          src={cover}
                          alt={p.title}
                          fill
                          className="object-cover transition-transform duration-700 hover:scale-110"
                        />
                      </div>

                      <div className="p-6">
                        <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-3">
                          {p.title}
                        </h4>

                        {p.description && (
                          <div className="max-h-44 overflow-y-auto pr-2">
                            <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                              {p.description}
                            </p>
                          </div>
                        )}
                      </div>

                    </div>
                  </Tilt>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* ========================= قسم الفيديوهات ========================= */}
        <div>
          <div className="flex items-center justify-center gap-3 mb-10">
            <FaPlay className="text-[#01AEBE] text-2xl" />
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
              قسم الفيديوهات
            </h3>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-12">
            {videoProjects.map((p, idx) => {
              const videoUrl = p.videos![0];

              return (
                <motion.div
                  key={p.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: idx * 0.05 }}
                >
                  <Tilt
                    tiltMaxAngleX={10}
                    tiltMaxAngleY={10}
                    perspective={1200}
                    transitionSpeed={1200}
                    glareEnable
                    glareMaxOpacity={0.12}
                    scale={1.05}
                    className="rounded-2xl"
                  >
                    <div className="relative rounded-2xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-white/10 shadow-2xl overflow-hidden transition-all duration-500 hover:shadow-[0_0_50px_rgba(0,200,255,0.25)]">

                      <div className="relative h-56 bg-black overflow-hidden">
                        <video
                          src={videoUrl}
                          className="w-full h-full object-cover"
                          controls
                          preload="metadata"
                          playsInline
                        />
                      </div>

                      <div className="p-6">
                        <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-3">
                          {p.title}
                        </h4>

                        {p.description && (
                          <div className="max-h-44 overflow-y-auto pr-2">
                            <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                              {p.description}
                            </p>
                          </div>
                        )}
                      </div>

                    </div>
                  </Tilt>
                </motion.div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}