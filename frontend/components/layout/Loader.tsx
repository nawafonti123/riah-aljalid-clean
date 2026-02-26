'use client';

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

export default function Loader() {
  const loaderRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const tl = gsap.timeline();
    tl.to(logoRef.current, {
      opacity: 1,
      scale: 1,
      duration: 0.8,
      ease: 'power3.out',
    })
      .to(logoRef.current, {
        opacity: 0,
        scale: 1.5,
        duration: 1,
        delay: 0.5,
        ease: 'power2.in',
      })
      .to(loaderRef.current, {
        backdropFilter: 'blur(0px)',
        backgroundColor: 'rgba(0,0,0,0)',
        duration: 0.5,
        ease: 'power2.inOut',
        onComplete: () => {
          if (loaderRef.current) loaderRef.current.style.display = 'none';
        },
      });
  });

  return (
    <div
      ref={loaderRef}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-xl"
    >
      <div ref={logoRef} className="text-5xl font-bold text-white opacity-0 scale-50">
        <span className="bg-gradient-to-r from-[#00c6ff] to-[#2C5364] bg-clip-text text-transparent">
          رياح الجليد
        </span>
      </div>
    </div>
  );
}
