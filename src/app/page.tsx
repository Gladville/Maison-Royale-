import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Hero from '@/components/landing/Hero';
import About from '@/components/landing/About';
import SignatureDishes from '@/components/landing/SignatureDishes';
import Atmosphere from '@/components/landing/Atmosphere';
import Experience from '@/components/landing/Experience';
import Testimonials from '@/components/landing/Testimonials';
import ReservationCTA from '@/components/landing/ReservationCTA';

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <About />
        <SignatureDishes />
        <Atmosphere />
        <Experience />
        <Testimonials />
        <ReservationCTA />
      </main>
      <Footer />
    </>
  );
}
