'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  FaMapMarkerAlt,
  FaPhone,
  FaEnvelope,
  FaRegBuilding,
  FaWhatsapp,
  FaTimes,
  FaSnowflake,
  FaArrowUp,
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
      <footer className="relative overflow-hidden border-t border-slate-200/70 bg-slate-950 text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(34,211,238,0.18),transparent_20%),radial-gradient(circle_at_bottom_left,rgba(14,165,233,0.14),transparent_25%)]" />

        <div className="container-main relative py-16">
          <div className="grid gap-8 lg:grid-cols-[1.3fr_1fr_1fr]">
            <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
              <div className="flex items-center gap-4">
                <div className="relative h-16 w-16 overflow-hidden rounded-2xl bg-white">
                  <Image
                    src={footerImage}
                    alt="رياح الجليد"
                    fill
                    className="object-contain p-2"
                    sizes="64px"
                  />
                </div>

                <div>
                  <h3 className="text-2xl font-extrabold">رياح الجليد</h3>
                  <p className="mt-1 text-sm text-slate-300">
                    حلول احترافية في التكييف المركزي والسبليت والتهوية والدكت.
                  </p>
                </div>
              </div>

              <p className="mt-6 leading-8 text-slate-300">
                شركة متخصصة في تركيب وصيانة أنظمة التكييف والتبريد للمنازل والشركات
                والمشاريع، مع التزام بالجودة والسرعة والدقة في التنفيذ.
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                <a
                  href={waLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary"
                >
                  <FaWhatsapp className="ml-2" />
                  واتساب
                </a>

                <button onClick={() => setCallOpen(true)} className="btn-secondary">
                  <FaPhone className="ml-2" />
                  اتصال
                </button>
              </div>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
              <h4 className="text-xl font-bold">روابط سريعة</h4>

              <div className="mt-5 space-y-3 text-slate-300">
                <Link href="/" className="block transition hover:text-cyan-300">
                  الرئيسية
                </Link>
                <a href="/#about" className="block transition hover:text-cyan-300">
                  عن الشركة
                </a>
                <a href="/#services" className="block transition hover:text-cyan-300">
                  الخدمات
                </a>
                <a href="/#portfolio" className="block transition hover:text-cyan-300">
                  أعمالنا
                </a>
                <a href="/#contact" className="block transition hover:text-cyan-300">
                  اتصل بنا
                </a>
              </div>

              <div className="mt-8 rounded-2xl border border-white/10 bg-white/5 p-4">
                <div className="mb-2 flex items-center gap-2 text-cyan-300">
                  <FaSnowflake />
                  <span className="font-semibold">خدماتنا</span>
                </div>
                <div className="grid gap-2 text-sm text-slate-300">
                  <span>تكييف مركزي</span>
                  <span>صيانة دورية</span>
                  <span>تركيب مكيفات</span>
                  <span>تصنيع وتركيب دكت</span>
                </div>
              </div>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
              <h4 className="text-xl font-bold">بيانات التواصل</h4>

              <div className="mt-5 space-y-4 text-slate-300">
                <div className="flex items-start gap-3">
                  <FaMapMarkerAlt className="mt-1 text-cyan-300" />
                  <span>{address}</span>
                </div>

                <button
                  onClick={() => setCallOpen(true)}
                  className="flex items-start gap-3 text-right transition hover:text-cyan-300"
                >
                  <FaPhone className="mt-1 text-cyan-300" />
                  <span>{phone}</span>
                </button>

                <a href={`mailto:${email}`} className="flex items-start gap-3 hover:text-cyan-300">
                  <FaEnvelope className="mt-1 text-cyan-300" />
                  <span>{email}</span>
                </a>

                <div className="flex items-start gap-3">
                  <FaRegBuilding className="mt-1 text-cyan-300" />
                  <span>السجل التجاري: {commercialRegister}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-10 flex flex-col gap-4 border-t border-white/10 pt-6 text-sm text-slate-400 sm:flex-row sm:items-center sm:justify-between">
            <p>© {currentYear} رياح الجليد. جميع الحقوق محفوظة.</p>

            <div className="flex items-center gap-4">
              <span>تصميم وتطوير: Team Hawk</span>
              <a
                href="#hero"
                className="inline-flex items-center gap-2 rounded-full border border-white/10 px-4 py-2 hover:bg-white/5"
              >
                <FaArrowUp />
                للأعلى
              </a>
            </div>
          </div>
        </div>
      </footer>

      {callOpen && (
        <div
          className="fixed inset-0 z-[70] flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
          onClick={() => setCallOpen(false)}
        >
          <div
            className="w-full max-w-md rounded-3xl bg-white p-6 text-slate-900 shadow-2xl dark:bg-slate-900 dark:text-white"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-5 flex items-center justify-between">
              <div>
                <h3 className="text-xl font-bold">اختر طريقة الاتصال</h3>
                <p className="mt-1 text-sm text-slate-500 dark:text-slate-300">{phone}</p>
              </div>

              <button
                onClick={() => setCallOpen(false)}
                className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 dark:bg-white/10"
              >
                <FaTimes />
              </button>
            </div>

            <div className="grid gap-3">
              <a
                href={waLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between rounded-2xl bg-green-500 px-5 py-4 font-bold text-white"
              >
                <span className="flex items-center gap-3">
                  <FaWhatsapp />
                  واتساب
                </span>
                <span>فتح</span>
              </a>

              <a
                href={telLink}
                className="flex items-center justify-between rounded-2xl bg-cyan-600 px-5 py-4 font-bold text-white"
              >
                <span className="flex items-center gap-3">
                  <FaPhone />
                  اتصال عادي
                </span>
                <span>اتصال</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}