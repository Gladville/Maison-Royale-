import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Hero from '@/components/landing/Hero';
import About from '@/components/landing/About';
import SignatureDishes from '@/components/landing/SignatureDishes';
import ReservationCTA from '@/components/landing/ReservationCTA';
import Secbout from '@/components/landing/Sebout';
import Atmosbience from '@/components/landing/Ambience';
import Atmosphere from '@/components/landing/Atmosphere';
import Experience from '@/components/landing/Experience';
import Testimonials from '@/components/landing/Testimonials';

export default function Home() {
  return (
    <>
      <Header />
        <Hero />
        <About />
        <SignatureDishes />
        <Secbout />
        <Atmosbience />
        <Atmosphere/>
        <Experience />
        <Testimonials />
        <ReservationCTA />
      <Footer />
    </>
  );
}
