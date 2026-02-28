'use client';

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

export default function Loader() {
  const loaderRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const titleWrapRef = useRef<HTMLDivElement>(null);
  const shineRef = useRef<HTMLSpanElement>(null);
  const subtitleRef = useRef<HTMLDivElement>(null);
  const dotsRef = useRef<HTMLSpanElement>(null);

  const wind1Ref = useRef<HTMLDivElement>(null);
  const wind2Ref = useRef<HTMLDivElement>(null);
  const wind3Ref = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.set(contentRef.current, { opacity: 0 });
    gsap.set(titleWrapRef.current, { opacity: 0, scale: 0.94, y: 12, filter: 'blur(8px)' });
    gsap.set(subtitleRef.current, { opacity: 0, y: 6 });

    // رياح بالخلف
    const winds = [wind1Ref.current, wind2Ref.current, wind3Ref.current].filter(Boolean);
    winds.forEach((el, i) => {
      gsap.set(el, { xPercent: -80 - i * 10, opacity: 0.12 });
      gsap.to(el, {
        xPercent: 90 + i * 10,
        opacity: 0.55,
        duration: 1.6 + i * 0.25,
        ease: 'power1.inOut',
        repeat: -1,
        yoyo: true,
        delay: i * 0.12,
      });
      gsap.to(el, {
        opacity: 0.18,
        duration: 1.1 + i * 0.15,
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true,
        delay: i * 0.1,
      });
    });

    // لمعان على النص فقط
    gsap.to(shineRef.current, {
      backgroundPositionX: '220%',
      duration: 1.25,
      ease: 'power2.inOut',
      repeat: -1,
      repeatDelay: 0.25,
    });

    // تموج "رياح" بسيط للنص (روح/نزول خفيف)
    gsap.to(titleWrapRef.current, {
      y: -2,
      duration: 1.1,
      ease: 'sine.inOut',
      repeat: -1,
      yoyo: true,
      delay: 0.4,
    });

    // نقاط تحميل متغيرة (...)
    const dotStates = ['.', '..', '...'];
    let idx = 0;
    const dotTween = gsap.to({}, {
      duration: 0.35,
      repeat: -1,
      onRepeat: () => {
        idx = (idx + 1) % dotStates.length;
        if (dotsRef.current) dotsRef.current.textContent = dotStates[idx];
      },
    });

    // دخول / خروج
    const tl = gsap.timeline();
    tl.to(contentRef.current, { opacity: 1, duration: 0.35, ease: 'power2.out' })
      .to(
        titleWrapRef.current,
        { opacity: 1, scale: 1, y: 0, filter: 'blur(0px)', duration: 0.9, ease: 'power3.out' },
        '-=0.1',
      )
      .to(subtitleRef.current, { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }, '-=0.45')
      .to({}, { duration: 1.8 }) // مدة ظهور اللودر (تقدر تزيد/تنقص)
      .to(
        titleWrapRef.current,
        { opacity: 0, scale: 1.04, y: -10, duration: 0.65, ease: 'power2.in' },
        '+=0.05',
      )
      .to(
        loaderRef.current,
        {
          backgroundColor: 'rgba(0,0,0,0)',
          backdropFilter: 'blur(0px)',
          duration: 0.45,
          ease: 'power2.inOut',
          onComplete: () => {
            dotTween.kill();
            if (loaderRef.current) loaderRef.current.style.display = 'none';
          },
        },
        '-=0.15',
      );
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
          className="absolute left-0 top-[40%] h-[2px] w-[140%] rounded-full blur-[0.5px]
                     bg-gradient-to-r from-transparent via-[#7CFFB2]/70 to-transparent"
        />
        <div
          ref={wind2Ref}
          className="absolute left-0 top-[50%] h-[3px] w-[140%] rounded-full blur-[0.5px]
                     bg-gradient-to-r from-transparent via-[#65D9FF]/70 to-transparent"
        />
        <div
          ref={wind3Ref}
          className="absolute left-0 top-[60%] h-[2px] w-[140%] rounded-full blur-[0.5px]
                     bg-gradient-to-r from-transparent via-[#7CFFB2]/55 to-transparent"
        />
      </div>

      <div ref={contentRef} className="relative flex flex-col items-center justify-center">
        <div ref={titleWrapRef} className="relative text-center px-6">
          {/* العنوان */}
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

            {/* لمعان فوق النص فقط */}
            <span
              ref={shineRef}
              aria-hidden="true"
              className="absolute inset-0 bg-clip-text text-transparent"
              style={{
                backgroundImage:
                  'linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.45) 20%, rgba(255,255,255,0) 40%)',
                backgroundSize: '220% 100%',
                backgroundPositionX: '0%',
                mixBlendMode: 'screen',
                filter: 'blur(0.35px)',
              }}
            >
              رياح الجليد
            </span>
          </div>

          {/* السطر الثاني */}
          <div ref={subtitleRef} className="mt-2 text-sm sm:text-lg font-semibold text-white/80">
            لأعمال التكييف
          </div>

          {/* جاري التحميل + نقاط */}
          <div className="mt-4 text-[11px] sm:text-xs text-white/45">
            جاري التحميل<span ref={dotsRef}>...</span>
          </div>
        </div>
      </div>
    </div>
  );
}