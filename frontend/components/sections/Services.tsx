'use client';

import { motion } from 'framer-motion';
import {
  FaTruck,
  FaDraftingCompass,
  FaTools,
  FaWind,
  FaSnowflake,
  FaBuilding,
  FaSchool,
  FaHome,
  FaHotel,
  FaStore,
  FaHospital,
  FaIndustry,
} from 'react-icons/fa';

type Service = {
  id: string;
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  short: string;
  details: string[];
};

const servicesData: Service[] = [
  {
    id: 'supply',
    title: 'التوريد',
    icon: FaTruck,
    short: 'توريد أنظمة ومستلزمات التكييف بمنتجات جيدة وحلول مناسبة للمشروع.',
    details: [
      'توريد ملحقات وأنظمة التكييف حسب احتياج الموقع.',
      'اختيار الخامات المناسبة لرفع الكفاءة وطول العمر التشغيلي.',
      'توفير حلول مناسبة للمشاريع السكنية والتجارية.',
    ],
  },
  {
    id: 'duct',
    title: 'التصنيع والتركيب',
    icon: FaTools,
    short: 'تصنيع وتركيب مجاري الهواء والدكت باحترافية وتشطيب مرتب.',
    details: [
      'تنفيذ أعمال الدكت والروند دكت بمقاسات دقيقة.',
      'الاهتمام بعزل وتسريب الهواء وجودة التوزيع.',
      'تنفيذ منظم يلائم المساحات المختلفة والمخططات.',
    ],
  },
  {
    id: 'design',
    title: 'التصميم والإشراف',
    icon: FaDraftingCompass,
    short: 'تصميم حلول تكييف متكاملة مع إشراف وتنفيذ منظم وسريع.',
    details: [
      'إعداد تصورات مناسبة لطبيعة المشروع والمساحة.',
      'الإشراف على التنفيذ وضبط جودة الأعمال.',
      'تحقيق أفضل توازن بين الجودة والسعر وسرعة الإنجاز.',
    ],
  },
  {
    id: 'maintenance',
    title: 'الصيانة والخدمة',
    icon: FaSnowflake,
    short: 'صيانة وقائية وعلاجية للحفاظ على كفاءة التبريد وتقليل الأعطال.',
    details: [
      'فحص وتشخيص المشكلات بدقة.',
      'تنظيف وصيانة ورفع كفاءة التشغيل.',
      'حلول عملية للحفاظ على الأداء الممتاز طوال الموسم.',
    ],
  },
];

const sectors = [
  { icon: FaHome, name: 'فلل ومنازل' },
  { icon: FaBuilding, name: 'أبراج ومباني' },
  { icon: FaSchool, name: 'مدارس وجامعات' },
  { icon: FaHotel, name: 'فنادق' },
  { icon: FaStore, name: 'معارض ومحلات' },
  { icon: FaHospital, name: 'مرافق خدمية' },
  { icon: FaIndustry, name: 'مصانع ومستودعات' },
  { icon: FaWind, name: 'مشاريع تهوية ودكت' },
];

export default function Services() {
  return (
    <section id="services" className="section-shell">
      <div className="container">
        <div className="mb-10 max-w-3xl">
          <span className="mb-4 inline-flex rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-2 text-sm font-black text-cyan-300">
            خدماتنا
          </span>
          <h2 className="section-title">حلول متكاملة في التكييف والتبريد</h2>
          <p className="section-subtitle">
            نقدم باقة متنوعة من الخدمات التي تغطي التوريد والتركيب والتصميم
            والصيانة، مع اهتمام كبير بالتفاصيل وجودة التنفيذ والمظهر النهائي.
          </p>
        </div>

        <div className="grid gap-5 xl:grid-cols-2">
          {servicesData.map((service, index) => {
            const Icon = service.icon;

            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="glass-card p-6"
              >
                <div className="mb-5 flex items-start gap-4">
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-cyan-500/15 text-cyan-300">
                    <Icon className="text-xl" />
                  </div>

                  <div>
                    <h3 className="text-xl font-black text-white">
                      {service.title}
                    </h3>
                    <p className="mt-2 text-sm leading-7 text-white/70">
                      {service.short}
                    </p>
                  </div>
                </div>

                <div className="grid gap-3">
                  {service.details.map((detail) => (
                    <div
                      key={detail}
                      className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-bold leading-7 text-white/80"
                    >
                      {detail}
                    </div>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>

        <div className="mt-10 soft-card p-6 md:p-7">
          <div className="mb-6">
            <h3 className="text-2xl font-black text-white">
              نخدم مختلف أنواع المشاريع
            </h3>
            <p className="mt-2 text-sm leading-7 text-white/70">
              نقدم أسعارًا مناسبة وحلولًا عملية للمشاريع السكنية والتجارية
              والخدمية مع مرونة في التنفيذ.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {sectors.map((item, index) => {
              const Icon = item.icon;

              return (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.15 }}
                  transition={{ duration: 0.35, delay: index * 0.04 }}
                  className="rounded-[22px] border border-white/10 bg-white/5 p-5 text-center"
                >
                  <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-2xl bg-cyan-500/15 text-cyan-300">
                    <Icon />
                  </div>
                  <h4 className="text-sm font-black text-white">
                    {item.name}
                  </h4>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}