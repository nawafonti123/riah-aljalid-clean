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

  const shineTextRef = useRef<HTMLSpanElement>(null);

  useGSAP(() => {
    gsap.set(contentRef.current, { opacity: 0 });
    gsap.set(titleWrapRef.current, {
      opacity: 0,
      scale: 0.92,
      y: 10,
      filter: 'blur(6px)',
    });

    // رياح
    const winds = [wind1Ref.current, wind2Ref.current, wind3Ref.current].filter(Boolean);

    winds.forEach((el, i) => {
      gsap.set(el, { xPercent: -70 - i * 10 });
      gsap.to(el, {
        xPercent: 80,
        duration: 1.6 + i * 0.3,
        ease: 'power1.inOut',
        repeat: -1,
        yoyo: true,
      });
    });

    // دوران الدائرة (الآن تحت النص)
    gsap.to(ringRef.current, {
      rotate: 360,
      duration: 1.8,
      ease: 'none',
      repeat: -1,
    });

    // لمعان النص
    gsap.to(shineTextRef.current, {
      backgroundPositionX: '200%',
      duration: 1.4,
      ease: 'power2.inOut',
      repeat: -1,
      repeatDelay: 0.4,
    });

    const tl = gsap.timeline();
    tl.to(contentRef.current, { opacity: 1, duration: 0.4 })
      .to(
        titleWrapRef.current,
        {
          opacity: 1,
          scale: 1,
          y: 0,
          filter: 'blur(0px)',
          duration: 0.9,
          ease: 'power3.out',
        },
        '-=0.2',
      )
      .to(
        titleWrapRef.current,
        {
          opacity: 0,
          y: -10,
          duration: 0.6,
          delay: 0.8,
          ease: 'power2.in',
        },
      )
      .to(loaderRef.current, {
        backgroundColor: 'rgba(0,0,0,0)',
        duration: 0.4,
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
      {/* رياح */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          ref={wind1Ref}
          className="absolute top-[40%] h-[2px] w-[130%] bg-gradient-to-r from-transparent via-[#7CFFB2]/60 to-transparent"
        />
        <div
          ref={wind2Ref}
          className="absolute top-[50%] h-[3px] w-[130%] bg-gradient-to-r from-transparent via-[#65D9FF]/60 to-transparent"
        />
        <div
          ref={wind3Ref}
          className="absolute top-[60%] h-[2px] w-[130%] bg-gradient-to-r from-transparent via-[#7CFFB2]/50 to-transparent"
        />
      </div>

      <div ref={contentRef} className="relative flex flex-col items-center">
        {/* النص */}
        <div ref={titleWrapRef} className="text-center px-6">
          <div className="relative text-3xl sm:text-5xl font-extrabold">
            <span className="bg-gradient-to-r from-[#7CFFB2] via-[#65D9FF] to-[#7CFFB2] bg-clip-text text-transparent">
              رياح الجليد
            </span>

            {/* لمعان فوق النص فقط */}
            <span
              ref={shineTextRef}
              className="absolute inset-0 bg-clip-text text-transparent"
              style={{
                backgroundImage:
                  'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.5) 25%, transparent 50%)',
                backgroundSize: '200% 100%',
                backgroundPositionX: '0%',
                mixBlendMode: 'screen',
              }}
            >
              رياح الجليد
            </span>
          </div>

          <div className="mt-2 text-sm sm:text-lg text-white/80 font-semibold">
            لأعمال التكييف
          </div>
        </div>

        {/* ✅ دائرة التحميل الآن بالأسفل */}
        <div
          ref={ringRef}
          className="mt-8 w-14 h-14 rounded-full border-4 border-white/10"
          style={{
            borderTopColor: '#7CFFB2',
            borderRightColor: '#65D9FF',
            boxShadow:
              '0 0 25px rgba(124,255,178,0.3), 0 0 25px rgba(101,217,255,0.3)',
          }}
        />
      </div>
    </div>
  );
}