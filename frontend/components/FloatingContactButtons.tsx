'use client';

import { useEffect, useMemo, useState } from 'react';
import { FaWhatsapp, FaPhoneAlt } from 'react-icons/fa';

type Settings = {
  phone?: string;
};

export default function FloatingContactButtons() {
  const [phone, setPhone] = useState('+966 56 524 7407');

  useEffect(() => {
    const API = process.env.NEXT_PUBLIC_API_URL;
    if (!API) return;

    fetch(`${API}/settings`, { cache: 'no-store' })
      .then((r) => (r.ok ? r.json() : null))
      .then((data: Settings | null) => {
        if (data?.phone?.trim()) {
          setPhone(data.phone.trim());
        }
      })
      .catch(() => {});
  }, []);

  const digits = useMemo(() => (phone || '').replace(/[^\d]/g, ''), [phone]);

  const waLink = digits ? `https://wa.me/${digits}` : '#';
  const telLink = digits ? `tel:+${digits}` : '#';

  return (
    <>
      <div className="fixed bottom-5 right-5 z-[1100] flex flex-col gap-3">
        <a
          href={waLink}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="تواصل عبر واتساب"
          className="group flex h-14 w-14 items-center justify-center rounded-full border border-white/10 bg-gradient-to-br from-green-500 to-emerald-500 text-white shadow-2xl shadow-green-500/25 transition hover:-translate-y-1 hover:scale-[1.03]"
        >
          <FaWhatsapp className="text-[1.45rem]" />
        </a>
      </div>

      <div className="fixed bottom-5 left-5 z-[1100] flex flex-col gap-3">
        <a
          href={telLink}
          aria-label="اتصال مباشر"
          className="group flex h-14 w-14 items-center justify-center rounded-full border border-white/10 bg-gradient-to-br from-cyan-500 to-sky-500 text-white shadow-2xl shadow-cyan-500/25 transition hover:-translate-y-1 hover:scale-[1.03]"
        >
          <FaPhoneAlt className="text-[1.15rem]" />
        </a>
      </div>
    </>
  );
}