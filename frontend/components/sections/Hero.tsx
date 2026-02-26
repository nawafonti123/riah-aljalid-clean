// frontend/components/sections/Hero.tsx
'use client';

export default function Hero() {
  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* خلفية متدرجة */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0F2027] to-[#2C5364]" />

      {/* جسيمات ثلجية خفيفة جداً (اختياري) */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute w-0.5 h-0.5 bg-white/20 rounded-full animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${8 + Math.random() * 7}s`,
            }}
          />
        ))}
      </div>

      <div className="absolute inset-0 bg-black/20" />

      <div className="relative z-10 flex h-full flex-col items-center justify-center text-center text-white px-4">
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold leading-tight">
          <span className="block">رياح</span>
          <span className="block">الجليد</span>
        </h1>
        <p className="mt-3 text-sm sm:text-base md:text-lg lg:text-xl text-[#a0e7ff] max-w-xs sm:max-w-sm md:max-w-md">
          حلول تبريد متكاملة لهندسة المستقبل
        </p>
        <button className="mt-6 rounded-full bg-white/10 px-5 py-2 text-xs sm:text-sm backdrop-blur-sm border border-white/20 shadow-[0_0_15px_#00c6ff] hover:shadow-[0_0_25px_#00c6ff] transition-shadow duration-300">
          اكتشف خدماتنا
        </button>
      </div>

      <style jsx>{`
        @keyframes float {
          0% { transform: translateY(0) rotate(0deg); opacity: 0; }
          10% { opacity: 0.3; }
          90% { opacity: 0.3; }
          100% { transform: translateY(-100vh) rotate(360deg); opacity: 0; }
        }
        .animate-float {
          animation: float linear infinite;
        }
      `}</style>
    </section>
  );
}