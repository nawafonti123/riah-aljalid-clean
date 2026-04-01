'use client';

import { useEffect, useMemo, useState } from 'react';
import Image from 'next/image';
import { AnimatePresence, motion } from 'framer-motion';
import { FaImages, FaPlay, FaTimes, FaExpand } from 'react-icons/fa';
import { publicApi } from '@/lib/api';

type Project = {
  id: string;
  title: string;
  description?: string;
  image?: string;
  video?: string;
  category?: string;
  createdAt?: string;
};

type TabType = 'all' | 'images' | 'videos';

export default function Portfolio() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [activeTab, setActiveTab] = useState<TabType>('all');
  const [selectedItem, setSelectedItem] = useState<Project | null>(null);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await publicApi.getProjects();
        setProjects(Array.isArray(data) ? data : []);
      } catch {
        setProjects([]);
      }
    };

    load();
  }, []);

  const sortedProjects = useMemo(() => {
    return [...projects].sort((a, b) => {
      const aDate = a.createdAt ? new Date(a.createdAt).getTime() : 0;
      const bDate = b.createdAt ? new Date(b.createdAt).getTime() : 0;
      return bDate - aDate;
    });
  }, [projects]);

  const filteredProjects = useMemo(() => {
    if (activeTab === 'images') return sortedProjects.filter((item) => !!item.image);
    if (activeTab === 'videos') return sortedProjects.filter((item) => !!item.video);
    return sortedProjects;
  }, [activeTab, sortedProjects]);

  const stats = useMemo(() => {
    const imageCount = sortedProjects.filter((item) => !!item.image).length;
    const videoCount = sortedProjects.filter((item) => !!item.video).length;

    return {
      all: sortedProjects.length,
      images: imageCount,
      videos: videoCount,
    };
  }, [sortedProjects]);

  const tabs: { key: TabType; label: string; count: number }[] = [
    { key: 'all', label: 'الكل', count: stats.all },
    { key: 'images', label: 'الصور', count: stats.images },
    { key: 'videos', label: 'الفيديوهات', count: stats.videos },
  ];

  return (
    <section className="relative overflow-hidden px-4 py-16 md:px-8 lg:px-12">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.12 }}
          transition={{ duration: 0.6 }}
          className="mb-10"
        >
          <div className="mb-4 flex justify-end">
            <div className="inline-flex items-center gap-2 rounded-full border border-cyan-400/25 bg-cyan-400/10 px-4 py-2 text-sm font-bold text-cyan-700 dark:text-cyan-300">
              <FaImages />
              أعمالنا
            </div>
          </div>

          <div className="grid items-center gap-5 lg:grid-cols-[1fr_auto]">
            <div className="text-right">
              <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white md:text-4xl">
                نماذج من مشاريعنا وتنفيذنا
              </h2>
              <p className="mt-4 max-w-3xl text-base leading-8 text-slate-600 dark:text-slate-300 md:text-lg">
                استعرض جزءًا من أعمالنا في مشاريع التكييف والتركيب والدكت
                والصيانة، مع عرض مرتب للصور والفيديوهات بشكل أوضح وأجمل.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              {tabs.map((tab) => {
                const active = activeTab === tab.key;

                return (
                  <button
                    key={tab.key}
                    onClick={() => setActiveTab(tab.key)}
                    className={`inline-flex min-h-[48px] items-center gap-2 rounded-full px-5 text-sm font-black transition ${
                      active
                        ? 'bg-gradient-to-r from-cyan-500 to-sky-500 text-white shadow-lg shadow-cyan-500/20'
                        : 'border border-slate-300 bg-white text-slate-700 hover:bg-slate-50 dark:border-white/10 dark:bg-white/5 dark:text-white/75 dark:hover:bg-white/10'
                    }`}
                  >
                    {tab.label}
                    <span className="rounded-full bg-black/10 px-2 py-0.5 text-xs dark:bg-white/10">
                      {tab.count}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </motion.div>

        {filteredProjects.length === 0 ? (
          <div className="rounded-[32px] border border-slate-200 bg-gradient-to-br from-slate-50 via-white to-slate-100 px-6 py-16 text-center shadow-sm dark:border-white/10 dark:from-[#111c27] dark:via-[#14202d] dark:to-[#192634]">
            <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-3xl bg-cyan-100 text-cyan-600 dark:bg-cyan-500/15 dark:text-cyan-300">
              <FaImages className="text-2xl" />
            </div>
            <h3 className="text-3xl font-extrabold text-slate-900 dark:text-white">
              لا توجد أعمال حالياً
            </h3>
            <p className="mt-3 text-base text-slate-600 dark:text-slate-300">
              سيتم إضافة الأعمال والمشاريع هنا فور توفرها من لوحة التحكم.
            </p>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 26 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.12 }}
                transition={{ duration: 0.45, delay: index * 0.03 }}
                className="group overflow-hidden rounded-[28px] border border-slate-200 bg-white/90 shadow-sm dark:border-white/10 dark:bg-white/[0.04]"
              >
                <div className="relative aspect-[4/3] overflow-hidden bg-slate-100 dark:bg-white/5">
                  {project.video ? (
                    <>
                      <video
                        src={project.video}
                        className="h-full w-full object-cover"
                        muted
                        playsInline
                      />
                      <button
                        onClick={() => setSelectedItem(project)}
                        className="absolute inset-0 flex items-center justify-center"
                        aria-label={`عرض ${project.title}`}
                      >
                        <span className="flex h-16 w-16 items-center justify-center rounded-full bg-black/55 text-white backdrop-blur-md">
                          <FaPlay className="mr-1 text-xl" />
                        </span>
                      </button>
                    </>
                  ) : (
                    <>
                      <Image
                        src={project.image || '/logo.png'}
                        alt={project.title}
                        fill
                        className="object-cover transition duration-500 group-hover:scale-105"
                      />
                    </>
                  )}

                  <button
                    onClick={() => setSelectedItem(project)}
                    className="absolute left-4 top-4 flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-slate-950/45 text-white backdrop-blur-md"
                    aria-label="تكبير"
                  >
                    <FaExpand />
                  </button>
                </div>

                <div className="p-5">
                  <h3 className="text-xl font-extrabold text-slate-900 dark:text-white">
                    {project.title}
                  </h3>

                  <div className="mt-3 flex flex-wrap gap-2">
                    <span className="rounded-full bg-cyan-100 px-3 py-1 text-xs font-bold text-cyan-700 dark:bg-cyan-500/15 dark:text-cyan-300">
                      {project.video ? 'فيديو' : 'صورة'}
                    </span>

                    {project.category && (
                      <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-700 dark:bg-white/10 dark:text-slate-200">
                        {project.category}
                      </span>
                    )}
                  </div>

                  <p className="mt-4 text-sm leading-7 text-slate-600 dark:text-slate-300">
                    {project.description || 'تنفيذ احترافي من أعمال رياح الجليد.'}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        <AnimatePresence>
          {selectedItem && (
            <motion.div
              className="fixed inset-0 z-[100] flex items-center justify-center bg-black/75 p-4 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedItem(null)}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.96, y: 12 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.96, y: 12 }}
                transition={{ duration: 0.2 }}
                onClick={(e) => e.stopPropagation()}
                className="w-full max-w-5xl overflow-hidden rounded-[32px] border border-white/10 bg-[#0b1622] shadow-2xl"
              >
                <div className="flex items-center justify-between border-b border-white/10 p-4">
                  <div>
                    <h3 className="text-2xl font-extrabold text-white">
                      {selectedItem.title}
                    </h3>
                    {selectedItem.category && (
                      <div className="mt-2 text-sm font-semibold text-cyan-300">
                        {selectedItem.category}
                      </div>
                    )}
                  </div>

                  <button
                    onClick={() => setSelectedItem(null)}
                    className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white"
                    aria-label="إغلاق"
                  >
                    <FaTimes />
                  </button>
                </div>

                <div className="p-4 md:p-6">
                  <div className="relative mb-5 aspect-video overflow-hidden rounded-3xl bg-black">
                    {selectedItem.video ? (
                      <video
                        src={selectedItem.video}
                        controls
                        className="h-full w-full object-contain"
                      />
                    ) : (
                      <Image
                        src={selectedItem.image || '/logo.png'}
                        alt={selectedItem.title}
                        fill
                        className="object-contain"
                      />
                    )}
                  </div>

                  <h4 className="text-lg font-extrabold text-white">
                    تفاصيل العمل
                  </h4>
                  <p className="mt-3 text-sm leading-8 text-slate-300">
                    {selectedItem.description ||
                      'هذا العمل من ضمن مشاريع رياح الجليد المنفذة باحترافية عالية.'}
                  </p>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}