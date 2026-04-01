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
    <section className="relative overflow-hidden px-4 py-16 md:px-8 lg:px-12">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.12 }}
          transition={{ duration: 0.6 }}
          className="mb-10 text-center"
        >
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-cyan-400/25 bg-cyan-400/10 px-4 py-2 text-sm font-bold text-cyan-700 dark:text-cyan-300">
            اتصل بنا
          </div>

          <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white md:text-4xl">
            جاهزون لخدمتك في أي وقت
          </h2>

          <p className="mx-auto mt-4 max-w-3xl text-base leading-8 text-slate-600 dark:text-slate-300 md:text-lg">
            سواء كنت تحتاج تركيب مكيف جديد أو صيانة أو تنفيذ مشروع تكييف متكامل،
            تواصل معنا وسنقدّم لك الحل المناسب بسرعة واحترافية.
          </p>
        </motion.div>

        <div className="grid gap-6 lg:grid-cols-2">
          <div className="grid gap-5">
            {infoCards.map((item) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.12 }}
                  transition={{ duration: 0.45 }}
                  className="rounded-[28px] border border-slate-200 bg-white/90 p-6 shadow-sm dark:border-white/10 dark:bg-white/[0.04]"
                >
                  <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-cyan-100 text-cyan-600 dark:bg-cyan-500/15 dark:text-cyan-300">
                    <Icon className="text-xl" />
                  </div>

                  <h3 className="text-xl font-extrabold text-slate-900 dark:text-white">
                    {item.title}
                  </h3>

                  <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-300">
                    {item.text}
                  </p>
                </motion.div>
              );
            })}
          </div>

          <div className="grid gap-5">
            {contactCards.map((card) => {
              const Icon = card.icon;
              const isExternal = card.href.startsWith('http');

              return (
                <motion.a
                  key={card.title}
                  href={card.href}
                  target={isExternal ? '_blank' : undefined}
                  rel={isExternal ? 'noreferrer' : undefined}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.12 }}
                  transition={{ duration: 0.45 }}
                  className="block rounded-[28px] border border-slate-200 bg-gradient-to-br from-cyan-50 via-white to-slate-50 p-6 shadow-sm transition hover:-translate-y-1 dark:border-white/10 dark:from-[#09141e] dark:via-[#0b1622] dark:to-[#09111a]"
                >
                  <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-cyan-100 text-cyan-600 dark:bg-cyan-500/15 dark:text-cyan-300">
                    <Icon className="text-xl" />
                  </div>

                  <div className="text-lg font-extrabold text-slate-900 dark:text-white">
                    {card.title}
                  </div>

                  <div className="mt-2 text-sm font-semibold text-slate-600 dark:text-slate-300">
                    {card.value}
                  </div>
                </motion.a>
              );
            })}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.12 }}
          transition={{ duration: 0.6 }}
          className="mt-10 rounded-[32px] border border-slate-200 bg-white/90 p-8 text-center shadow-sm dark:border-white/10 dark:bg-white/[0.04]"
        >
          <h3 className="text-2xl font-extrabold text-slate-900 dark:text-white">
            هل لديك مشروع أو استفسار؟
          </h3>

          <p className="mx-auto mt-3 max-w-2xl text-base leading-8 text-slate-600 dark:text-slate-300">
            أرسل لنا تفاصيل احتياجك وسنساعدك في اختيار أفضل حل مناسب للموقع
            والمساحة ونوع الاستخدام.
          </p>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <a
              href="https://wa.me/966565247407"
              target="_blank"
              rel="noreferrer"
              className="rounded-full bg-emerald-500 px-6 py-3 text-sm font-extrabold text-white shadow-[0_10px_30px_rgba(16,185,129,0.35)] transition hover:scale-[1.02] hover:bg-emerald-400"
            >
              ابدأ عبر واتساب
            </a>

            <a
              href="tel:+966565247407"
              className="rounded-full border border-slate-300 bg-white px-6 py-3 text-sm font-extrabold text-slate-800 transition hover:bg-slate-50 dark:border-white/10 dark:bg-white/5 dark:text-white dark:hover:bg-white/10"
            >
              اتصال مباشر
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}