'use client';

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

export default function Loader() {
  const loaderRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const titleWrapRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  const wind1Ref = useRef<HTMLDivElement>(null);
  const wind2Ref = useRef<HTMLDivElement>(null);
  const wind3Ref = useRef<HTMLDivElement>(null);
  const wind4Ref = useRef<HTMLDivElement>(null);

  const shineTextRef = useRef<HTMLSpanElement>(null);

  useGSAP(() => {
    // دخول ناعم
    gsap.set(contentRef.current, { opacity: 0 });
    gsap.set(titleWrapRef.current, { opacity: 0, scale: 0.92, y: 10, filter: 'blur(6px)' });

    // رياح (طبقات أوضح)
    const winds = [wind1Ref.current, wind2Ref.current, wind3Ref.current, wind4Ref.current].filter(Boolean);

    winds.forEach((el, i) => {
      gsap.set(el, { xPercent: -75 - i * 8, opacity: 0.0 });
      gsap.to(el, {
        xPercent: 75 + i * 10,
        opacity: 0.55,
        duration: 1.6 + i * 0.25,
        ease: 'power1.inOut',
        repeat: -1,
        yoyo: true,
        delay: i * 0.08,
      });
      gsap.to(el, {
        opacity: 0.18,
        duration: 1.05 + i * 0.12,
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true,
        delay: i * 0.1,
      });
    });

    // دوران الدائرة خلف النص + أبعد شوي فوق
    gsap.to(ringRef.current, {
      rotate: 360,
      duration: 2.2,
      ease: 'none',
      repeat: -1,
    });

    // لمعان على النص فقط (Overlay text)
    gsap.set(shineTextRef.current, { backgroundPositionX: '0%' });
    gsap.to(shineTextRef.current, {
      backgroundPositionX: '200%',
      duration: 1.35,
      ease: 'power2.inOut',
      repeat: -1,
      repeatDelay: 0.35,
    });

    const tl = gsap.timeline();
    tl.to(contentRef.current, { opacity: 1, duration: 0.35, ease: 'power2.out' })
      .to(
        titleWrapRef.current,
        { opacity: 1, scale: 1, y: 0, filter: 'blur(0px)', duration: 0.9, ease: 'power3.out' },
        '-=0.15',
      )
      .to(
        titleWrapRef.current,
        { y: -2, duration: 1.2, ease: 'sine.inOut', repeat: 2, yoyo: true },
        '-=0.2',
      )
      .to(
        titleWrapRef.current,
        { opacity: 0, scale: 1.06, y: -10, duration: 0.7, delay: 0.55, ease: 'power2.in' },
        '+=0.2',
      )
      .to(loaderRef.current, {
        backdropFilter: 'blur(0px)',
        backgroundColor: 'rgba(0,0,0,0)',
        duration: 0.45,
        ease: 'power2.inOut',
        onComplete: () => {
          if (loaderRef.current) loaderRef.current.style.display = 'none';
        },
      });
  });

  return (
    <div
      ref={loaderRef}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-xl overflow-hidden"
    >
      {/* ✅ رياح: أوضح + طبقات */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          ref={wind1Ref}
          className="absolute left-0 top-[35%] h-[2px] w-[130%] rounded-full blur-[0.5px]
                     bg-gradient-to-r from-transparent via-[#7CFFB2]/70 to-transparent"
        />
        <div
          ref={wind2Ref}
          className="absolute left-0 top-[44%] h-[3px] w-[130%] rounded-full blur-[0.5px]
                     bg-gradient-to-r from-transparent via-[#65D9FF]/70 to-transparent"
        />
        <div
          ref={wind3Ref}
          className="absolute left-0 top-[53%] h-[2px] w-[130%] rounded-full blur-[0.5px]
                     bg-gradient-to-r from-transparent via-[#7CFFB2]/60 to-transparent"
        />
        <div
          ref={wind4Ref}
          className="absolute left-0 top-[62%] h-[2px] w-[130%] rounded-full blur-[0.5px]
                     bg-gradient-to-r from-transparent via-[#65D9FF]/55 to-transparent"
        />
      </div>

      {/* ✅ المحتوى */}
      <div ref={contentRef} className="relative flex flex-col items-center justify-center">
        {/* ✅ الدائرة: خلف النص + بعيدة عن العنوان */}
        <div
          ref={ringRef}
          className="absolute -top-16 sm:-top-20 w-20 h-20 sm:w-24 sm:h-24 rounded-full border border-white/10 z-0"
          style={{
            boxShadow: '0 0 45px rgba(124,255,178,0.10), 0 0 55px rgba(101,217,255,0.10)',
            borderTopColor: 'rgba(124,255,178,0.55)',
            borderRightColor: 'rgba(101,217,255,0.50)',
          }}
        />

        {/* ✅ عنوان + لمعان على النص فقط */}
        <div ref={titleWrapRef} className="relative z-10 text-center px-6">
          <div
            className="relative text-3xl sm:text-5xl font-extrabold tracking-tight"
            style={{
              textShadow: '0 0 30px rgba(101,217,255,0.10), 0 0 30px rgba(124,255,178,0.10)',
            }}
          >
            {/* النص الأساسي */}
            <span className="bg-gradient-to-r from-[#7CFFB2] via-[#65D9FF] to-[#7CFFB2] bg-clip-text text-transparent">
              رياح الجليد
            </span>

            {/* ✅ اللمعة: نفس النص بالضبط (Overlay) */}
            <span
              ref={shineTextRef}
              aria-hidden="true"
              className="absolute inset-0 bg-clip-text text-transparent"
              style={{
                backgroundImage:
                  'linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.45) 20%, rgba(255,255,255,0) 40%)',
                backgroundSize: '200% 100%',
                backgroundPositionX: '0%',
                WebkitMaskImage:
                  'linear-gradient(90deg, transparent 0%, #000 18%, #000 82%, transparent 100%)',
                maskImage: 'linear-gradient(90deg, transparent 0%, #000 18%, #000 82%, transparent 100%)',
                mixBlendMode: 'screen',
                filter: 'blur(0.3px)',
              }}
            >
              رياح الجليد
            </span>
          </div>

          <div className="mt-2 text-sm sm:text-lg font-semibold text-white/80">لأعمال التكييف</div>

          <div className="mt-4 text-[11px] sm:text-xs text-white/45">جاري التحميل...</div>
        </div>
      </div>
    </div>
  );
}