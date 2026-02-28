'use client';

import { useEffect, useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { publicApi } from '@/lib/api';
import Image from 'next/image';
import Tilt from 'react-parallax-tilt';

interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio?: string;
  image?: string;
  order: number;
}

interface SiteSettings {
  aboutImage?: string | null;
}

export default function AboutSection() {
  const [team, setTeam] = useState<TeamMember[]>([]);
  const [aboutImage, setAboutImage] = useState<string | null>(null);

  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    const run = async () => {
      const [teamData, settings] = await Promise.all([
        publicApi.getTeamMembers(),
        publicApi.getSettings().catch(() => null),
      ]);

      setTeam(teamData || []);
      setAboutImage((settings as SiteSettings)?.aboutImage || '/logo.png');
    };

    run();
  }, []);

  return (
    <section id="about" ref={ref} className="py-20 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4">

        <div className="text-center mb-14">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white">
            رياح الجليد
          </h2>
        </div>

        {/* صورة 3D */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <Tilt tiltMaxAngleX={8} tiltMaxAngleY={8} perspective={1500}>
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-white/10">
              <Image
                src={aboutImage || '/logo.png'}
                alt="About"
                width={1200}
                height={600}
                className="object-cover w-full h-[400px]"
              />
            </div>
          </Tilt>
        </motion.div>

        {/* فريق العمل 3D */}
        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-8">
          {team
            .slice()
            .sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
            .map((member, index) => (
              <motion.div
                key={member.id}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Tilt tiltMaxAngleX={12} tiltMaxAngleY={12} perspective={1200} scale={1.05}>
                  <div className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-2xl border border-gray-200 dark:border-white/10 transition-all duration-500 hover:shadow-[0_0_40px_rgba(0,200,255,0.25)]">

                    <div className="relative w-full h-40">
                      <Image
                        src={member.image || '/logo.png'}
                        alt={member.name}
                        fill
                        className="object-cover"
                      />
                    </div>

                    <div className="p-4 text-center">
                      <p className="font-semibold text-gray-900 dark:text-white">
                        {member.name}
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        {member.role}
                      </p>
                    </div>

                  </div>
                </Tilt>
              </motion.div>
            ))}
        </div>

      </div>
    </section>
  );
}