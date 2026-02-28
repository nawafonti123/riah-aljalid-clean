'use client';

import { useEffect, useMemo, useState } from 'react';
import { FaWhatsapp, FaPhoneAlt } from 'react-icons/fa';

type Settings = { phone?: string };

export default function FloatingContactButtons() {
  const [phone, setPhone] = useState('+966 56 524 7407');

  useEffect(() => {
    // اختياري: يجلب رقم الهاتف من settings API
    const API = process.env.NEXT_PUBLIC_API_URL;
    if (!API) return;

    fetch(`${API}/settings`, { cache: 'no-store' })
      .then((r) => (r.ok ? r.json() : null))
      .then((data: Settings | null) => {
        if (data?.phone?.trim()) setPhone(data.phone);
      })
      .catch(() => {});
  }, []);

  const digits = useMemo(() => (phone || '').replace(/[^\d]/g, ''), [phone]);
  const waLink = digits ? `https://wa.me/${digits}` : '#';
  const telLink = digits ? `tel:+${digits}` : '#';

  return (
    <>
      {/* ✅ واتس - أسفل يمين */}
      <a
        href={waLink}
        target="_blank"
        rel="noreferrer"
        aria-label="WhatsApp"
        className="fixed bottom-5 right-5 z-[60] w-14 h-14 rounded-full flex items-center justify-center
                   bg-[#25D366] text-white shadow-xl hover:scale-110 active:scale-95 transition
                   ring-1 ring-white/20"
      >
        <FaWhatsapp className="text-2xl" />
      </a>

      {/* ✅ اتصال - أسفل يسار */}
      <a
        href={telLink}
        aria-label="Call"
        className="fixed bottom-5 left-5 z-[60] w-14 h-14 rounded-full flex items-center justify-center
                   bg-gradient-to-br from-[#01AEBE] to-[#65D9FF] text-white shadow-xl
                   hover:scale-110 active:scale-95 transition ring-1 ring-white/20"
      >
        <FaPhoneAlt className="text-xl" />
      </a>
    </>
  );
}