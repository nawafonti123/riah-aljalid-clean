'use client';

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

export default function Loader() {
  const loaderRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const wind1Ref = useRef<HTMLDivElement>(null);
  const wind2Ref = useRef<HTMLDivElement>(null);
  const wind3Ref = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const shineRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // دخول ناعم
    gsap.set([contentRef.current, titleRef.current], { opacity: 0 });
    gsap.set(titleRef.current, { scale: 0.92, y: 10, filter: 'blur(6px)' });

    // رياح لا نهائية (خطوط)
    const winds = [wind1Ref.current, wind2Ref.current, wind3Ref.current].filter(Boolean);

    winds.forEach((el, i) => {
      gsap.set(el, { xPercent: -60 - i * 10, opacity: 0.0 });
      gsap.to(el, {
        xPercent: 70 + i * 10,
        opacity: 0.35,
        duration: 1.6 + i * 0.25,
        ease: 'power1.inOut',
        repeat: -1,
        yoyo: true,
        delay: i * 0.1,
      });
      gsap.to(el, {
        opacity: 0.08,
        duration: 1.1 + i * 0.15,
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true,
        delay: i * 0.12,
      });
    });

    // حلقة دوران خفيفة
    gsap.to(ringRef.current, {
      rotate: 360,
      duration: 1.8,
      ease: 'none',
      repeat: -1,
    });

    // لمعان على النص (shine) يتحرك
    gsap.set(shineRef.current, { xPercent: -120, opacity: 0.0 });
    gsap.to(shineRef.current, {
      xPercent: 120,
      opacity: 0.55,
      duration: 1.4,
      ease: 'power2.inOut',
      repeat: -1,
      repeatDelay: 0.4,
    });

    // التايم لاين الأساسي
    const tl = gsap.timeline();

    tl.to(contentRef.current, { opacity: 1, duration: 0.35, ease: 'power2.out' })
      .to(
        titleRef.current,
        {
          opacity: 1,
          scale: 1,
          y: 0,
          filter: 'blur(0px)',
          duration: 0.9,
          ease: 'power3.out',
        },
        '-=0.15',
      )
      .to(
        titleRef.current,
        {
          y: -2,
          duration: 1.2,
          ease: 'sine.inOut',
          repeat: 2,
          yoyo: true,
        },
        '-=0.2',
      )
      // خروج
      .to(
        titleRef.current,
        {
          opacity: 0,
          scale: 1.06,
          y: -10,
          duration: 0.7,
          delay: 0.55,
          ease: 'power2.in',
        },
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
      {/* خلفية رياح (خطوط) */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          ref={wind1Ref}
          className="absolute left-0 top-[38%] h-[2px] w-[120%] rounded-full
                     bg-gradient-to-r from-transparent via-[#7CFFB2]/40 to-transparent"
        />
        <div
          ref={wind2Ref}
          className="absolute left-0 top-[48%] h-[3px] w-[120%] rounded-full
                     bg-gradient-to-r from-transparent via-[#65D9FF]/35 to-transparent"
        />
        <div
          ref={wind3Ref}
          className="absolute left-0 top-[58%] h-[2px] w-[120%] rounded-full
                     bg-gradient-to-r from-transparent via-[#7CFFB2]/30 to-transparent"
        />
      </div>

      {/* محتوى */}
      <div ref={contentRef} className="relative flex flex-col items-center justify-center">
        {/* حلقة خفيفة */}
        <div
          ref={ringRef}
          className="absolute -top-10 sm:-top-12 w-20 h-20 sm:w-24 sm:h-24 rounded-full
                     border border-white/10"
          style={{
            boxShadow: '0 0 40px rgba(124,255,178,0.10), 0 0 50px rgba(101,217,255,0.10)',
            borderTopColor: 'rgba(124,255,178,0.55)',
            borderRightColor: 'rgba(101,217,255,0.45)',
          }}
        />

        {/* العنوان */}
        <div ref={titleRef} className="relative text-center px-6">
          {/* لمعان متحرك فوق النص */}
          <div
            ref={shineRef}
            className="absolute inset-0 rounded-2xl pointer-events-none"
            style={{
              background:
                'linear-gradient(90deg, transparent, rgba(255,255,255,0.18), transparent)',
              mixBlendMode: 'screen',
              filter: 'blur(2px)',
            }}
          />

          <div
            className="text-3xl sm:text-5xl font-extrabold tracking-tight"
            style={{
              textShadow: '0 0 30px rgba(101,217,255,0.10), 0 0 30px rgba(124,255,178,0.10)',
            }}
          >
            <span className="bg-gradient-to-r from-[#7CFFB2] via-[#65D9FF] to-[#7CFFB2] bg-clip-text text-transparent">
              رياح الجليد
            </span>
          </div>

          <div className="mt-2 text-sm sm:text-lg font-semibold text-white/80">
            لأعمال التكييف
          </div>

          {/* سطر صغير جميل */}
          <div className="mt-4 text-[11px] sm:text-xs text-white/40">
            جاري التحميل...
          </div>
        </div>
      </div>
    </div>
  );
}