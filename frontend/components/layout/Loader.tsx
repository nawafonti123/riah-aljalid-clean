'use client';

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

export default function Loader() {
  const loaderRef = useRef<HTMLDivElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);
  const titleWrapRef = useRef<HTMLDivElement | null>(null);
  const shineRef = useRef<HTMLDivElement | null>(null);
  const subtitleRef = useRef<HTMLParagraphElement | null>(null);
  const dotsRef = useRef<HTMLSpanElement | null>(null);
  const wind1Ref = useRef<HTMLDivElement | null>(null);
  const wind2Ref = useRef<HTMLDivElement | null>(null);
  const wind3Ref = useRef<HTMLDivElement | null>(null);

  useGSAP(() => {
    if (!loaderRef.current) return;

    gsap.set(contentRef.current, { opacity: 0 });
    gsap.set(titleWrapRef.current, {
      opacity: 0,
      scale: 0.94,
      y: 12,
      filter: 'blur(8px)',
    });
    gsap.set(subtitleRef.current, { opacity: 0, y: 6 });

    const winds = [wind1Ref.current, wind2Ref.current, wind3Ref.current].filter(
      Boolean
    );

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

    gsap.to(shineRef.current, {
      backgroundPositionX: '220%',
      duration: 1.25,
      ease: 'power2.inOut',
      repeat: -1,
      repeatDelay: 0.25,
    });

    gsap.to(titleWrapRef.current, {
      y: -2,
      duration: 1.1,
      ease: 'sine.inOut',
      repeat: -1,
      yoyo: true,
      delay: 0.4,
    });

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

    const tl = gsap.timeline();

    tl.to(contentRef.current, {
      opacity: 1,
      duration: 0.35,
      ease: 'power2.out',
    })
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
        '-=0.1'
      )
      .to(
        subtitleRef.current,
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          ease: 'power2.out',
        },
        '-=0.45'
      )
      .to({}, { duration: 1.8 })
      .to(
        titleWrapRef.current,
        {
          opacity: 0,
          scale: 1.04,
          y: -10,
          duration: 0.65,
          ease: 'power2.in',
        },
        '+=0.05'
      )
      .to(
        loaderRef.current,
        {
          opacity: 0,
          duration: 0.45,
          ease: 'power2.inOut',
          onComplete: () => {
            dotTween.kill();
            if (loaderRef.current) {
              loaderRef.current.style.display = 'none';
            }
          },
        },
        '-=0.15'
      );
  }, []);

  return (
    <div
      ref={loaderRef}
      className="fixed inset-0 z-[2000] overflow-hidden bg-[#061116]"
    >
      <div
        ref={wind1Ref}
        className="absolute left-[-10%] top-[20%] h-[2px] w-[42%] rounded-full bg-gradient-to-r from-transparent via-cyan-300/40 to-transparent blur-[1px]"
      />
      <div
        ref={wind2Ref}
        className="absolute left-[-15%] top-[36%] h-[2px] w-[55%] rounded-full bg-gradient-to-r from-transparent via-cyan-400/30 to-transparent blur-[1px]"
      />
      <div
        ref={wind3Ref}
        className="absolute left-[-20%] top-[54%] h-[2px] w-[48%] rounded-full bg-gradient-to-r from-transparent via-sky-300/30 to-transparent blur-[1px]"
      />

      <div
        ref={contentRef}
        className="relative flex h-full items-center justify-center px-6"
      >
        <div className="mx-auto max-w-3xl text-center">
          <div
            ref={titleWrapRef}
            className="relative inline-block overflow-hidden rounded-[30px] border border-white/10 bg-white/5 px-8 py-8 shadow-2xl backdrop-blur-xl md:px-12 md:py-10"
          >
            <div
              ref={shineRef}
              className="pointer-events-none absolute inset-0 opacity-40"
              style={{
                background:
                  'linear-gradient(115deg, transparent 10%, rgba(255,255,255,0.18) 35%, transparent 60%)',
                backgroundSize: '220% 100%',
                backgroundPositionX: '-40%',
              }}
            />

            <div className="relative z-10">
              <h1 className="text-3xl font-black text-white md:text-5xl">
                رياح الجليد
              </h1>
              <p className="mt-3 text-base font-extrabold text-cyan-300 md:text-lg">
                لأعمال التكييف
              </p>
            </div>
          </div>

          <p
            ref={subtitleRef}
            className="mt-6 text-sm font-bold tracking-wide text-white/70 md:text-base"
          >
            جاري التحميل
            <span ref={dotsRef}>...</span>
          </p>
        </div>
      </div>
    </div>
  );
}