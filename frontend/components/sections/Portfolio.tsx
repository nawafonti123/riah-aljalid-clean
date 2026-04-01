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
    if (activeTab === 'images') {
      return sortedProjects.filter((item) => !!item.image);
    }

    if (activeTab === 'videos') {
      return sortedProjects.filter((item) => !!item.video);
    }

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
    <section id="portfolio" className="section-shell">
      <div className="container">
        <div className="mb-10 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <span className="mb-4 inline-flex rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-2 text-sm font-black text-cyan-300">
              أعمالنا
            </span>
            <h2 className="section-title">نماذج من مشاريعنا وتنفيذنا</h2>
            <p className="section-subtitle">
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
                  type="button"
                  onClick={() => setActiveTab(tab.key)}
                  className={`inline-flex min-h-[48px] items-center gap-2 rounded-full px-5 text-sm font-black transition ${
                    active
                      ? 'bg-gradient-to-r from-cyan-500 to-sky-500 text-white shadow-lg shadow-cyan-500/20'
                      : 'border border-white/10 bg-white/5 text-white/75 hover:bg-white/10'
                  }`}
                >
                  <span>{tab.label}</span>
                  <span className="rounded-full bg-white/10 px-2 py-0.5 text-xs">
                    {tab.count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {filteredProjects.length === 0 ? (
          <div className="glass-card p-8 text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-3xl bg-cyan-500/15 text-cyan-300">
              <FaImages className="text-2xl" />
            </div>
            <h3 className="text-xl font-black text-white">لا توجد أعمال حالياً</h3>
            <p className="mt-3 text-sm leading-7 text-white/70">
              سيتم إضافة الأعمال والمشاريع هنا فور توفرها من لوحة التحكم.
            </p>
          </div>
        ) : (
          <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.12 }}
                transition={{ duration: 0.4, delay: index * 0.04 }}
                className="group glass-card overflow-hidden"
              >
                <div className="relative h-[260px] overflow-hidden bg-slate-900/40">
                  {project.video ? (
                    <>
                      <video
                        src={project.video}
                        className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]"
                        muted
                        playsInline
                        preload="metadata"
                      />

                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/75 via-slate-950/15 to-transparent" />

                      <button
                        type="button"
                        onClick={() => setSelectedItem(project)}
                        className="absolute inset-0 flex items-center justify-center"
                        aria-label={`عرض ${project.title}`}
                      >
                        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white/15 text-white backdrop-blur-md transition group-hover:scale-110">
                          <FaPlay className="mr-1" />
                        </div>
                      </button>
                    </>
                  ) : (
                    <>
                      <Image
                        src={project.image || '/logo.png'}
                        alt={project.title}
                        fill
                        className="object-cover transition duration-500 group-hover:scale-[1.03]"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/75 via-slate-950/15 to-transparent" />
                    </>
                  )}

                  <button
                    type="button"
                    onClick={() => setSelectedItem(project)}
                    className="absolute left-4 top-4 flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-slate-950/45 text-white backdrop-blur-md"
                    aria-label="تكبير"
                  >
                    <FaExpand />
                  </button>
                </div>

                <div className="p-5">
                  <div className="mb-2 flex items-center justify-between gap-3">
                    <h3 className="line-clamp-1 text-lg font-black text-white">
                      {project.title}
                    </h3>

                    <span className="shrink-0 rounded-full border border-cyan-400/20 bg-cyan-400/10 px-3 py-1 text-xs font-black text-cyan-300">
                      {project.video ? 'فيديو' : 'صورة'}
                    </span>
                  </div>

                  {project.category && (
                    <div className="mb-3 text-sm font-bold text-white/55">
                      {project.category}
                    </div>
                  )}

                  <p className="line-clamp-3 text-sm leading-7 text-white/70">
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
              className="fixed inset-0 z-[1400] flex items-center justify-center bg-slate-950/80 p-4 backdrop-blur-md"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedItem(null)}
            >
              <motion.div
                className="max-h-[92vh] w-full max-w-5xl overflow-hidden rounded-[30px] border border-white/10 bg-[#081318] shadow-2xl"
                initial={{ opacity: 0, scale: 0.97, y: 16 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.97, y: 16 }}
                transition={{ duration: 0.22 }}
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex items-center justify-between gap-4 border-b border-white/10 px-5 py-4">
                  <div>
                    <h3 className="text-xl font-black text-white">
                      {selectedItem.title}
                    </h3>
                    {selectedItem.category && (
                      <p className="mt-1 text-sm text-white/55">
                        {selectedItem.category}
                      </p>
                    )}
                  </div>

                  <button
                    type="button"
                    onClick={() => setSelectedItem(null)}
                    className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white"
                    aria-label="إغلاق"
                  >
                    <FaTimes />
                  </button>
                </div>

                <div className="max-h-[calc(92vh-88px)] overflow-y-auto p-5">
                  <div className="relative min-h-[320px] overflow-hidden rounded-[24px] bg-slate-900/40 md:min-h-[560px]">
                    {selectedItem.video ? (
                      <video
                        src={selectedItem.video}
                        controls
                        autoPlay
                        className="h-full w-full object-contain bg-black"
                      />
                    ) : (
                      <Image
                        src={selectedItem.image || '/logo.png'}
                        alt={selectedItem.title}
                        fill
                        className="object-contain bg-black"
                      />
                    )}
                  </div>

                  <div className="mt-5 rounded-[22px] border border-white/10 bg-white/5 p-5">
                    <h4 className="text-lg font-black text-white">تفاصيل العمل</h4>
                    <p className="mt-3 text-sm leading-8 text-white/75">
                      {selectedItem.description ||
                        'هذا العمل من ضمن مشاريع رياح الجليد المنفذة باحترافية عالية.'}
                    </p>
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