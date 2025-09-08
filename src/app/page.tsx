import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Hero from '@/components/landing/Hero';
import About from '@/components/landing/About';
import SignatureDishes from '@/components/landing/SignatureDishes';
import ReservationCTA from '@/components/landing/ReservationCTA';

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <SignatureDishes />
        <About />
        <ReservationCTA />
      </main>
      <Footer />
    </>
  );
}
