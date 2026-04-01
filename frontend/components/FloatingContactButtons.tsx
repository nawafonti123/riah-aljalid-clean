// frontend/components/FloatingContactButtons.tsx
'use client';

import { useEffect, useMemo, useState } from 'react';
import { FaPhoneAlt, FaWhatsapp } from 'react-icons/fa';

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
    <div className="fixed bottom-4 left-4 z-[60] flex flex-col gap-3 sm:bottom-5 sm:left-5">
      <a
        href={waLink}
        target="_blank"
        rel="noreferrer"
        className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#25D366] text-white shadow-lg transition hover:scale-105 sm:h-14 sm:w-14"
        aria-label="واتساب"
      >
        <FaWhatsapp className="text-xl sm:text-2xl" />
      </a>

      <a
        href={telLink}
        className="flex h-12 w-12 items-center justify-center rounded-2xl bg-cyan-500 text-white shadow-lg transition hover:scale-105 sm:h-14 sm:w-14"
        aria-label="اتصال"
      >
        <FaPhoneAlt className="text-lg sm:text-xl" />
      </a>
    </div>
  );
}