import Hero from '@/components/sections/Hero';
import AboutSection from '@/components/sections/AboutSection';
import WhyUs from '@/components/sections/WhyUs';
import Achievements from '@/components/sections/Achievements';
import Services from '@/components/sections/Services';
import Portfolio from '@/components/sections/Portfolio';
import ContactSection from '@/components/sections/ContactSection';

export default function HomePage() {
  return (
    <main className="space-y-14 pb-10 pt-24 sm:space-y-16 sm:pb-12 sm:pt-28 md:space-y-24 md:pb-16 md:pt-32">
      <section id="hero" className="scroll-mt-24 sm:scroll-mt-28">
        <Hero />
      </section>

      <section id="about" className="scroll-mt-24 sm:scroll-mt-28">
        <AboutSection />
      </section>

      <section id="why-us" className="scroll-mt-24 sm:scroll-mt-28">
        <WhyUs />
      </section>

      <section id="achievements" className="scroll-mt-24 sm:scroll-mt-28">
        <Achievements />
      </section>

      <section id="services" className="scroll-mt-24 sm:scroll-mt-28">
        <Services />
      </section>

      <section id="portfolio" className="scroll-mt-24 sm:scroll-mt-28">
        <Portfolio />
      </section>

      <section id="contact" className="scroll-mt-24 sm:scroll-mt-28">
        <ContactSection />
      </section>
    </main>
  );
}