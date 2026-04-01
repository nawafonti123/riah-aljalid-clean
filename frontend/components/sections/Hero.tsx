'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Tilt from 'react-parallax-tilt';
import {
  FaTruck,
  FaIndustry,
  FaRuler,
  FaUniversity,
  FaSchool,
  FaLandmark,
  FaHome,
  FaCoffee,
  FaHotel,
  FaBuilding,
  FaWrench,
} from 'react-icons/fa';

interface ServiceDetail {
  title: string;
  description: string;
}

interface StaticService {
  id: string;
  title: string;
  description: string;
  icon: JSX.Element;
  details: ServiceDetail[];
}

const servicesData: StaticService[] = [
  {
    id: '1',
    title: 'التوريد',
    icon: <FaTruck />,
    description: 'نقدم خدمات توريد احترافية لمكونات وأنظمة التكييف والتهوية بجودة عالية واعتمادية ممتازة.',
    details: [
      {
        title: 'جودة المواد',
        description:
          'نحرص على اختيار مواد ومكونات مناسبة لطبيعة المشروع وتتحمل ظروف التشغيل المختلفة مع الحفاظ على كفاءة الأداء.',
      },
      {
        title: 'مرونة التوريد',
        description:
          'نوفر حلول توريد مناسبة للمشاريع الصغيرة والكبيرة مع سرعة في التجهيز والتنفيذ بما يلائم احتياج العميل.',
      },
    ],
  },
  {
    id: '2',
    title: 'التصنيع والتركيب',
    icon: <FaIndustry />,
    description: 'تصنيع وتركيب مجاري الهواء والدكت بأنواعه المختلفة وفق مواصفات دقيقة وتشطيب مرتب.',
    details: [
      {
        title: 'تنفيذ احترافي',
        description:
          'ننفذ أعمال الدكت والتهوية والتركيب الميداني بعناية مع مراعاة الجودة، الدقة، وسلامة التوزيع داخل الموقع.',
      },
      {
        title: 'تشطيب منظم',
        description:
          'نهتم بتناسق التمديدات وجودة التشطيب النهائي ليظهر العمل بشكل أنيق وعملي داخل المشروع.',
      },
    ],
  },
  {
    id: '3',
    title: 'التصميم',
    icon: <FaRuler />,
    description: 'إعداد تصورات مناسبة لطبيعة المشروع والمساحة لتحقيق أفضل توزيع وكفاءة تشغيل.',
    details: [
      {
        title: 'حلول مدروسة',
        description:
          'نقدم تصميمات ومخططات مناسبة للموقع تساعد على رفع كفاءة النظام وتحسين توزيع الهواء بشكل صحيح.',
      },
      {
        title: 'مراعاة طبيعة المشروع',
        description:
          'نختار الحل الأنسب بحسب نوع المشروع سواء كان سكنيًا أو تجاريًا أو خدميًا مع أفضل توازن بين الجودة والتكلفة.',
      },
    ],
  },
];

const projectIcons = [
  { icon: FaUniversity, name: 'جامعات' },
  { icon: FaSchool, name: 'مدارس' },
  { icon: FaLandmark, name: 'قصور' },
  { icon: FaHome, name: 'فلل' },
  { icon: FaCoffee, name: 'كافيهات' },
  { icon: FaHotel, name: 'فنادق' },
  { icon: FaBuilding, name: 'أبراج' },
];

export default function Services() {
  const ref = useRef<HTMLElement | null>(null);
  const inView = useInView(ref, { once: true, amount: 0.12 });

  return (
    <section
      ref={ref}
      className="relative overflow-hidden px-4 py-16 md:px-8 lg:px-12"
    >
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-10 text-center"
        >
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-cyan-400/25 bg-cyan-400/10 px-4 py-2 text-sm font-bold text-cyan-700 dark:text-cyan-300">
            <FaWrench />
            خدماتنا
          </div>

          <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white md:text-4xl">
            حلول متكاملة في التكييف والتبريد والتهوية
          </h2>

          <p className="mx-auto mt-4 max-w-3xl text-base leading-8 text-slate-600 dark:text-slate-300 md:text-lg">
            نقدم خدمات عالية الجودة تشمل التوريد، التصنيع، التركيب، والتصميم
            بما يناسب طبيعة المشروع ويضمن أفضل نتيجة من حيث الأداء والشكل النهائي.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
          {servicesData.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.55, delay: index * 0.08 }}
            >
              <Tilt
                tiltMaxAngleX={6}
                tiltMaxAngleY={6}
                glareEnable
                glareMaxOpacity={0.12}
                scale={1.01}
                className="h-full"
              >
                <div className="h-full rounded-[28px] border border-slate-200 bg-white/90 p-6 shadow-[0_12px_35px_rgba(15,23,42,0.08)] backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_45px_rgba(15,23,42,0.12)] dark:border-white/10 dark:bg-[#0b1622]/85 dark:shadow-[0_12px_35px_rgba(0,0,0,0.28)]">
                  <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-cyan-100 text-2xl text-cyan-600 dark:bg-cyan-500/15 dark:text-cyan-300">
                    {service.icon}
                  </div>

                  <h3 className="mb-3 text-2xl font-extrabold text-slate-900 dark:text-white">
                    {service.title}
                  </h3>

                  <p className="mb-6 text-sm leading-7 text-slate-600 dark:text-slate-300">
                    {service.description}
                  </p>

                  <div className="space-y-4">
                    {service.details.map((detail, i) => (
                      <div
                        key={i}
                        className="rounded-2xl border border-slate-200 bg-slate-50/90 p-4 dark:border-white/10 dark:bg-white/[0.04]"
                      >
                        <h4 className="mb-2 text-sm font-extrabold text-slate-900 dark:text-cyan-300">
                          {detail.title}
                        </h4>
                        <p className="text-sm leading-7 text-slate-600 dark:text-slate-300">
                          {detail.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </Tilt>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65, delay: 0.2 }}
          className="mt-14 rounded-[32px] border border-slate-200 bg-gradient-to-br from-cyan-50 via-white to-slate-50 p-6 shadow-[0_12px_40px_rgba(15,23,42,0.06)] dark:border-white/10 dark:from-[#08131d] dark:via-[#0b1723] dark:to-[#09111a] dark:shadow-[0_16px_50px_rgba(0,0,0,0.28)] md:p-8"
        >
          <div className="mb-6 text-center">
            <h3 className="text-2xl font-extrabold text-slate-900 dark:text-white">
              أسعار خاصة بالمشاريع
            </h3>
            <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-300 md:text-base">
              نخدم أنواعًا متعددة من المشاريع ونوفر حلولًا مناسبة من حيث الجودة
              والتنفيذ والتكلفة.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-7">
            {projectIcons.map((item, index) => {
              const Icon = item.icon;

              return (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={inView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.35, delay: 0.06 * index }}
                  className="group rounded-2xl border border-slate-200 bg-white/80 p-4 text-center shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md dark:border-white/10 dark:bg-white/[0.04]"
                >
                  <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-2xl bg-cyan-100 text-2xl text-cyan-600 transition-transform duration-300 group-hover:scale-110 dark:bg-cyan-500/15 dark:text-cyan-300">
                    <Icon />
                  </div>

                  <div className="text-sm font-bold text-slate-800 dark:text-white">
                    {item.name}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}