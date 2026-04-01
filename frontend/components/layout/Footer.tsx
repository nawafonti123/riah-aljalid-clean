// frontend/components/layout/Footer.tsx
'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  FaArrowUp,
  FaEnvelope,
  FaMapMarkerAlt,
  FaPhone,
  FaRegBuilding,
  FaSnowflake,
  FaTimes,
  FaWhatsapp,
} from 'react-icons/fa';

type Settings = {
  address?: string;
  phone?: string;
  email?: string;
  commercialRegister?: string;
  footerIceImage?: string;
};

const API_URL = process.env.NEXT_PUBLIC_API_URL;

async function fetchSettingsClient(): Promise<Settings | null> {
  try {
    if (!API_URL) return null;
    const res = await fetch(`${API_URL}/settings`, { cache: 'no-store' });
    if (!res.ok) return null;
    return (await res.json()) as Settings;
  } catch {
    return null;
  }
}

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const [settings, setSettings] = useState<Settings | null>(null);
  const [callOpen, setCallOpen] = useState(false);

  useEffect(() => {
    fetchSettingsClient().then(setSettings).catch(() => setSettings(null));
  }, []);

  const address = settings?.address || 'الرياض - طريق الملك عبدالعزيز';
  const phone = settings?.phone || '+966 56 524 7407';
  const email = settings?.email || 'RiaHaljalid@icloud.com';
  const commercialRegister = settings?.commercialRegister || '1010632725';
  const footerImage = settings?.footerIceImage || '/logo.png';

  const digitsPhone = useMemo(() => (phone || '').replace(/[^\d]/g, ''), [phone]);
  const waLink = digitsPhone ? `https://wa.me/${digitsPhone}` : '#';
  const telLink = digitsPhone ? `tel:+${digitsPhone}` : '#';

  return (
    <>
      <footer className="relative overflow-hidden border-t border-black/5 bg-slate-50 text-slate-900 dark:border-white/10 dark:bg-[#050c14] dark:text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(6,182,212,0.10),transparent_28%),radial-gradient(circle_at_bottom_left,rgba(16,185,129,0.08),transparent_22%)]" />

        <div className="section-container relative py-12 sm:py-16">
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            <div className="surface-card p-5 sm:p-6">
              <div className="mb-4 flex items-center gap-3">
                <div className="relative h-14 w-14 overflow-hidden rounded-2xl border border-black/10 bg-white dark:border-white/10 dark:bg-white/10">
                  <Image
                    src={footerImage}
                    alt="رياح الجليد"
                    fill
                    className="object-contain p-2"
                  />
                </div>
                <div>
                  <h3 className="text-lg font-extrabold text-slate-900 dark:text-white">
                    رياح الجليد
                  </h3>
                  <p className="text-sm text-slate-500 dark:text-white/60">
                    حلول احترافية في التكييف المركزي والسبليت والتهوية والدكت.
                  </p>
                </div>
              </div>

              <p className="text-sm leading-8 text-slate-600 dark:text-white/75">
                شركة متخصصة في تركيب وصيانة أنظمة التكييف والتبريد للمنازل
                والشركات والمشاريع، مع التزام بالجودة والسرعة والدقة في التنفيذ.
              </p>

              <div className="mt-5 flex flex-col gap-3 sm:flex-row">
                <Link href={waLink} target="_blank" className="btn-primary">
                  <FaWhatsapp />
                  واتساب
                </Link>

                <button
                  type="button"
                  onClick={() => setCallOpen(true)}
                  className="btn-secondary"
                >
                  <FaPhone />
                  اتصال
                </button>
              </div>
            </div>

            <div className="surface-card p-5 sm:p-6">
              <h4 className="mb-4 text-base font-extrabold text-slate-900 dark:text-white">
                روابط سريعة
              </h4>

              <div className="grid gap-2">
                <Link className="rounded-2xl px-3 py-3 text-sm text-slate-700 transition hover:bg-slate-100 dark:text-white/80 dark:hover:bg-white/10" href="/">
                  الرئيسية
                </Link>
                <Link className="rounded-2xl px-3 py-3 text-sm text-slate-700 transition hover:bg-slate-100 dark:text-white/80 dark:hover:bg-white/10" href="/about">
                  عن الشركة
                </Link>
                <Link className="rounded-2xl px-3 py-3 text-sm text-slate-700 transition hover:bg-slate-100 dark:text-white/80 dark:hover:bg-white/10" href="/services">
                  الخدمات
                </Link>
                <Link className="rounded-2xl px-3 py-3 text-sm text-slate-700 transition hover:bg-slate-100 dark:text-white/80 dark:hover:bg-white/10" href="/portfolio">
                  أعمالنا
                </Link>
                <Link className="rounded-2xl px-3 py-3 text-sm text-slate-700 transition hover:bg-slate-100 dark:text-white/80 dark:hover:bg-white/10" href="/contact">
                  اتصل بنا
                </Link>
              </div>
            </div>

            <div className="surface-card p-5 sm:p-6">
              <h4 className="mb-4 text-base font-extrabold text-slate-900 dark:text-white">
                خدماتنا
              </h4>

              <div className="grid gap-3">
                {[
                  'تكييف مركزي',
                  'صيانة دورية',
                  'تركيب مكيفات',
                  'تصنيع وتركيب دكت',
                ].map((item) => (
                  <div
                    key={item}
                    className="flex items-center gap-3 rounded-2xl bg-slate-100/80 px-3 py-3 text-sm text-slate-700 dark:bg-white/5 dark:text-white/80"
                  >
                    <FaSnowflake className="text-cyan-500" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="surface-card p-5 sm:p-6">
              <h4 className="mb-4 text-base font-extrabold text-slate-900 dark:text-white">
                بيانات التواصل
              </h4>

              <div className="space-y-3 text-sm">
                <div className="flex items-start gap-3 rounded-2xl bg-slate-100/80 px-3 py-3 dark:bg-white/5">
                  <FaMapMarkerAlt className="mt-1 shrink-0 text-cyan-500" />
                  <span className="leading-7 text-slate-700 dark:text-white/80">
                    {address}
                  </span>
                </div>

                <button
                  type="button"
                  onClick={() => setCallOpen(true)}
                  className="flex w-full items-start gap-3 rounded-2xl bg-slate-100/80 px-3 py-3 text-right transition hover:bg-slate-200 dark:bg-white/5 dark:hover:bg-white/10"
                >
                  <FaPhone className="mt-1 shrink-0 text-cyan-500" />
                  <span className="leading-7 text-slate-700 dark:text-white/80">
                    {phone}
                  </span>
                </button>

                <Link
                  href={`mailto:${email}`}
                  className="flex items-start gap-3 rounded-2xl bg-slate-100/80 px-3 py-3 transition hover:bg-slate-200 dark:bg-white/5 dark:hover:bg-white/10"
                >
                  <FaEnvelope className="mt-1 shrink-0 text-cyan-500" />
                  <span className="break-all leading-7 text-slate-700 dark:text-white/80">
                    {email}
                  </span>
                </Link>

                <div className="flex items-start gap-3 rounded-2xl bg-slate-100/80 px-3 py-3 dark:bg-white/5">
                  <FaRegBuilding className="mt-1 shrink-0 text-cyan-500" />
                  <span className="leading-7 text-slate-700 dark:text-white/80">
                    السجل التجاري: {commercialRegister}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 flex flex-col items-center justify-between gap-4 rounded-[24px] border border-black/5 bg-white/70 px-4 py-4 text-center text-sm text-slate-600 dark:border-white/10 dark:bg-white/5 dark:text-white/65 sm:flex-row sm:text-right">
            <p>© {currentYear} رياح الجليد. جميع الحقوق محفوظة.</p>

            <div className="flex items-center gap-4">
              <p>تصميم وتطوير: Team Hawk</p>

              <button
                type="button"
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="flex h-10 w-10 items-center justify-center rounded-2xl bg-cyan-500 text-white"
                aria-label="العودة للأعلى"
              >
                <FaArrowUp />
              </button>
            </div>
          </div>
        </div>
      </footer>

      {callOpen && (
        <div
          className="fixed inset-0 z-[80] bg-slate-950/50 p-4 backdrop-blur-sm"
          onClick={() => setCallOpen(false)}
        >
          <div
            className="mx-auto mt-20 w-full max-w-md rounded-[28px] border border-black/10 bg-white p-5 shadow-2xl dark:border-white/10 dark:bg-[#08131d]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-4 flex items-center justify-between gap-3">
              <div>
                <h3 className="text-lg font-extrabold text-slate-900 dark:text-white">
                  اختر طريقة الاتصال
                </h3>
                <p className="mt-1 text-sm text-slate-500 dark:text-white/60">
                  {phone}
                </p>
              </div>

              <button
                type="button"
                onClick={() => setCallOpen(false)}
                className="flex h-10 w-10 items-center justify-center rounded-2xl bg-slate-100 text-slate-800 dark:bg-white/10 dark:text-white"
              >
                <FaTimes />
              </button>
            </div>

            <div className="grid gap-3">
              <Link
                href={waLink}
                target="_blank"
                className="btn-primary w-full"
                onClick={() => setCallOpen(false)}
              >
                <FaWhatsapp />
                واتساب
              </Link>

              <Link
                href={telLink}
                className="btn-secondary w-full"
                onClick={() => setCallOpen(false)}
              >
                <FaPhone />
                اتصال عادي
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}