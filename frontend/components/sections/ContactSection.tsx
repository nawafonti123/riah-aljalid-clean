'use client';

import { motion } from 'framer-motion';
import {
  FaPhoneAlt,
  FaWhatsapp,
  FaEnvelope,
  FaMapMarkerAlt,
  FaClock,
} from 'react-icons/fa';

const contactCards = [
  {
    icon: FaPhoneAlt,
    title: 'اتصال مباشر',
    value: '+966 56 524 7407',
    href: 'tel:+966565247407',
  },
  {
    icon: FaWhatsapp,
    title: 'واتساب',
    value: 'راسلنا الآن مباشرة',
    href: 'https://wa.me/966565247407',
  },
  {
    icon: FaEnvelope,
    title: 'البريد الإلكتروني',
    value: 'RiaHaljalid@icloud.com',
    href: 'mailto:RiaHaljalid@icloud.com',
  },
];

const infoCards = [
  {
    icon: FaMapMarkerAlt,
    title: 'الموقع',
    text: 'الرياض - المملكة العربية السعودية',
  },
  {
    icon: FaClock,
    title: 'أوقات العمل',
    text: 'متاحون لخدمتكم والرد على الاستفسارات بشكل مستمر',
  },
];

export default function ContactSection() {
  return (
    <section id="contact" className="section-shell">
      <div className="container">
        <div className="glass-card overflow-hidden p-6 md:p-8 xl:p-10">
          <div className="grid gap-8 xl:grid-cols-[0.95fr_1.05fr]">
            <div>
              <span className="mb-4 inline-flex rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-2 text-sm font-black text-cyan-300">
                اتصل بنا
              </span>

              <h2 className="section-title !text-3xl md:!text-4xl">
                جاهزون لخدمتك في أي وقت
              </h2>

              <p className="mt-5 max-w-2xl text-base leading-8 text-white/75">
                سواء كنت تحتاج تركيب مكيف جديد أو صيانة أو تنفيذ مشروع تكييف
                متكامل، تواصل معنا وسنقدّم لك الحل المناسب بسرعة واحترافية.
              </p>

              <div className="mt-6 grid gap-4">
                {infoCards.map((item, index) => {
                  const Icon = item.icon;

                  return (
                    <motion.div
                      key={item.title}
                      initial={{ opacity: 0, y: 18 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, amount: 0.2 }}
                      transition={{ duration: 0.35, delay: index * 0.05 }}
                      className="rounded-[22px] border border-white/10 bg-white/5 p-5"
                    >
                      <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-cyan-500/15 text-cyan-300">
                        <Icon />
                      </div>
                      <h3 className="text-base font-black text-white">
                        {item.title}
                      </h3>
                      <p className="mt-2 text-sm leading-7 text-white/70">
                        {item.text}
                      </p>
                    </motion.div>
                  );
                })}
              </div>
            </div>

            <div className="grid gap-5">
              {contactCards.map((card, index) => {
                const Icon = card.icon;
                const isExternal = card.href.startsWith('http');

                return (
                  <motion.a
                    key={card.title}
                    href={card.href}
                    target={isExternal ? '_blank' : undefined}
                    rel={isExternal ? 'noopener noreferrer' : undefined}
                    initial={{ opacity: 0, y: 22 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.15 }}
                    transition={{ duration: 0.4, delay: index * 0.06 }}
                    className="group rounded-[28px] border border-white/10 bg-gradient-to-br from-white/8 to-white/[0.03] p-6 transition hover:-translate-y-1 hover:border-cyan-400/20 hover:bg-cyan-400/[0.06]"
                  >
                    <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-cyan-500/15 text-cyan-300 transition group-hover:scale-105">
                      <Icon className="text-xl" />
                    </div>

                    <div className="text-lg font-black text-white">
                      {card.title}
                    </div>

                    <div className="mt-2 text-sm font-bold leading-7 text-white/75">
                      {card.value}
                    </div>
                  </motion.a>
                );
              })}

              <div className="rounded-[28px] border border-cyan-400/20 bg-cyan-400/10 p-6">
                <h3 className="text-lg font-black text-white">
                  هل لديك مشروع أو استفسار؟
                </h3>

                <p className="mt-3 text-sm leading-8 text-white/80">
                  أرسل لنا تفاصيل احتياجك وسنساعدك في اختيار أفضل حل مناسب
                  للموقع والمساحة ونوع الاستخدام.
                </p>

                <div className="mt-5 flex flex-wrap gap-3">
                  <a
                    href="https://wa.me/966565247407"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-[50px] items-center justify-center gap-3 rounded-full bg-gradient-to-r from-cyan-500 to-sky-500 px-6 text-sm font-black text-white shadow-lg shadow-cyan-500/20"
                  >
                    <FaWhatsapp />
                    <span>ابدأ عبر واتساب</span>
                  </a>

                  <a
                    href="tel:+966565247407"
                    className="inline-flex min-h-[50px] items-center justify-center gap-3 rounded-full border border-white/10 bg-white/5 px-6 text-sm font-black text-white"
                  >
                    <FaPhoneAlt />
                    <span>اتصال مباشر</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}