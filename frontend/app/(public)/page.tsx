import Hero from '@/components/sections/Hero';
import AboutSection from '@/components/sections/AboutSection';
import WhyUs from '@/components/sections/WhyUs';
import Achievements from '@/components/sections/Achievements';
import Services from '@/components/sections/Services';
import Portfolio from '@/components/sections/Portfolio';
import ContactSection from '@/components/sections/ContactSection';

export default function HomePage() {
  return (
    <>
      <Hero />
      <AboutSection />
      <WhyUs />
      <Achievements />
      <Services />
      <Portfolio />
      <ContactSection />
    </>
  );
}