'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export default function ParticleWind() {
  const points = useRef<THREE.Points>(null!);
  // تقليل عدد الجسيمات بشكل كبير مع الحفاظ على التأثير
  const count = 400; // كان 2000

  const particles = useMemo(() => {
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      // توزيع أكثر انتشاراً مع نطاق أصغر قليلاً
      positions[i * 3] = (Math.random() - 0.5) * 15;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 15;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 15;
    }
    return positions;
  }, [count]);

  // استخدام useFrame مع استدعاء أقل تكراراً (اختياري)
  useFrame((state) => {
    const time = state.clock.getElapsedTime() * 0.5; // أبطأ
    points.current.rotation.y = time * 0.01;
    points.current.rotation.x = Math.sin(time * 0.1) * 0.03;
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={particles}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        color="#00c6ff"
        size={0.02}
        transparent
        opacity={0.5}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}