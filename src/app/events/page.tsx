
"use client";

import { useLayoutEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Button } from '@/components/ui/button';
import { ChevronRight, Star } from 'lucide-react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";

gsap.registerPlugin(ScrollTrigger);

const eventTypes = [
  { name: 'Corporate Events', description: 'Elevate your business meetings and functions with impeccable service.', image: '/assets/96.jpg', hint: 'corporate event' },
  { name: 'Weddings', description: 'Celebrate your special day in an atmosphere of timeless elegance.', image: '/assets/95.jpg', hint: 'wedding reception' },
  { name: 'Private Parties', description: 'From birthdays to anniversaries, we create unforgettable celebrations.', image: '/assets/9c.jpg', hint: 'private party' },
  { name: 'Wine Tastings', description: 'Curated tasting experiences led by our expert sommeliers.', image: '/assets/9d.jpg', hint: 'wine tasting' },
];

const venueSpaces = [
  { name: 'The Grand Hall', src: '/assets/98.jpg', hint: 'grand hall elegant' },
  { name: 'The Garden Terrace', src: '/assets/9a.jpg', hint: 'garden terrace restaurant' },
  { name: 'The Royal Suite', src: '/assets/94.jpg', hint: 'luxury private dining' },
  { name: 'The Cellar', src: '/assets/99.jpg', hint: 'wine cellar dining' },
];

const galleryImagesWeddingTop = [
    { src: '/assets/41.jpg', alt: 'table setting', hint: 'wedding table setting'},
    { src: '/assets/34.jpg', alt: 'cake', hint: 'wedding cake'},
    { src: '/assets/42.jpg ', alt: ' outdoor ', hint: 'bride groom toast'},
    { src: '/assets/97.jpg', alt: 'floral centerpiec', hint: 'wedding floral centerpiece'},
];
const galleryImagesWeddingBottom = [
    { src: '/assets/31.jpg', alt: 'toast', hint: 'outdoor wedding ceremony' },
    { src: '/assets/99.jpg', alt: 'ceremony', hint: 'wedding guests dancing' },
    { src: '/assets/32.jpg', alt: 'elegant', hint: 'elegant wedding food' },
    { src: '/assets/9a.jpg', alt: 'champagne fountain', hint: 'champagne fountain' },
];

const testimonials = [
  { quote: "Our corporate event was a resounding success thanks to the flawless execution by the Maison Royale team. Truly first-class.", author: "CEO, Innovate Corp" },
  { quote: "The most magical wedding reception we could have ever dreamed of. Every detail was perfect.", author: "Mr. & Mrs. Smith" },
  { quote: "We hosted a private party and were blown away by the service and culinary artistry. Our guests are still talking about it!", author: "Eleanor Vance" },
];

export default function EventsPage() {
  const mainRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Hero Parallax & Fade-in
      gsap.to('.hero-bg', { y: '20%', ease: 'none', scrollTrigger: { trigger: '.hero-section', start: 'top top', end: 'bottom top', scrub: true } });
      gsap.from('.hero-content > *', { y: 50, opacity: 0, duration: 1, stagger: 0.2, ease: 'power3.out' });

      // Section Animations
      const sections = gsap.utils.toArray<HTMLElement>('.animated-section');
      sections.forEach(section => {
        const fadeUp = section.querySelectorAll('.fade-up');
        if (fadeUp.length > 0) {
          gsap.from(fadeUp, {
            y: 50, opacity: 0, duration: 1, stagger: 0.15, ease: 'power3.out',
            scrollTrigger: { trigger: section, start: 'top 80%' }
          });
        }
      });
      
      // Final CTA Parallax
      gsap.to('.cta-bg', { backgroundPosition: '50% 120%', ease: 'none', scrollTrigger: { trigger: '.final-cta', start: 'top bottom', end: 'bottom top', scrub: true } });
    }, mainRef);
    return () => ctx.revert();
  }, []);

  const GalleryCarousel = ({ images, direction = 'forward' }: { images: {src:string, alt:string, hint: string}[], direction?: 'forward' | 'reverse' }) => (
      <Carousel
          plugins={[Autoplay({ delay: 2500, stopOnInteraction: false, playOnInit: true, stopOnMouseEnter: true })]}
          opts={{ align: "start", loop: true, direction: direction === 'forward' ? 'ltr' : 'rtl' }}
          className="w-full"
      >
          <CarouselContent className="-ml-4">
              {images.concat(images).map((image, index) => (
                  <CarouselItem key={index} className="pl-4 md:basis-1/3 lg:basis-1/4 group">
                      <div className="p-1">
                          <div className="relative h-80 w-full overflow-hidden rounded-lg shadow-lg">
                              <Image
                                  src={image.src}
                                  alt={image.alt}
                                  fill
                                  className="object-cover transition-transform duration-500 ease-in-out group-hover:scale-110"
                                  data-ai-hint={image.hint}
                              />
                               <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                                  <p className="text-white font-headline text-lg -translate-y-4 group-hover:translate-y-0 transition-transform duration-300">{image.alt}</p>
                               </div>
                          </div>
                      </div>
                  </CarouselItem>
              ))}
          </CarouselContent>
      </Carousel>
  );

  return (
    <div ref={mainRef} className="bg-[#fdfaec]">
      {/* 1. Hero Section */}
      <section className="relative h-[80vh] w-full flex items-center justify-center text-center text-white overflow-hidden hero-section">
        <div className="absolute inset-0 z-0 hero-bg">
          <Image src="/assets/94.jpg" alt="Elegant private dining room" fill priority className="object-cover" data-ai-hint="private dining elegant"/>
          <div className="absolute inset-0 bg-black/60"></div>
        </div>
        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 hero-content">
          <h1 className="font-headline text-5xl sm:text-7xl lg:text-8xl text-white drop-shadow-2xl">Events & Private Dining</h1>
          <p className="mt-4 text-lg sm:text-xl lg:text-2xl text-white/90 tracking-wider drop-shadow-lg">Curated experiences in an unforgettable setting.</p>
          <div className="mt-10">
            <Button size="lg" asChild className="text-lg px-8 py-6 rounded-full shadow-lg bg-[#b6cc37] hover:bg-[#84a641] text-black transition-all transform hover:scale-105 hover:shadow-xl">
              <Link href="#contact">Inquire Now</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* 2. Event Types */}
      <section className="py-24 sm:py-32 bg-[#fdfaec] animated-section">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="mb-16 fade-up">
            <h2 className="font-headline text-4xl sm:text-5xl text-black">Exquisite Events, Tailored for You</h2>
            <p className="mt-4 text-lg max-w-3xl mx-auto text-black/80">From grand celebrations to intimate gatherings, we provide the perfect canvas for your most important moments.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {eventTypes.map((event, index) => (
              <div key={index} className="bg-white rounded-lg shadow-xl overflow-hidden group fade-up">
                <div className="relative h-56">
                  <Image src={event.image} alt={event.name} fill className="object-cover transition-transform duration-500 group-hover:scale-110" data-ai-hint={event.hint}/>
                </div>
                <div className="p-6 text-left">
                  <h3 className="font-headline text-2xl text-black">{event.name}</h3>
                  <p className="mt-2 text-black/70">{event.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Venue Spaces */}
      <section className="py-24 sm:py-32 bg-black text-white animated-section">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="mb-16 fade-up">
            <h2 className="font-headline text-4xl sm:text-5xl text-white">Our Exclusive Spaces</h2>
            <p className="mt-4 text-lg max-w-3xl mx-auto text-white/80">Discover a collection of unique spaces, each with its own character and charm, ready to be transformed for your event.</p>
          </div>
          <Carousel plugins={[Autoplay({ delay: 3000, stopOnInteraction: false })]} opts={{ loop: true }} className="w-full fade-up">
            <CarouselContent>
              {venueSpaces.map((space, index) => (
                <CarouselItem key={index}>
                  <div className="relative h-[60vh] min-h-[500px] w-full flex items-center justify-center text-center">
                    <Image src={space.src} alt={space.name} fill className="object-cover rounded-lg" data-ai-hint={space.hint}/>
                    <div className="absolute inset-0 bg-black/50 rounded-lg"></div>
                    <div className="relative z-10">
                      <h3 className="font-headline text-4xl sm:text-5xl text-white drop-shadow-lg">{space.name}</h3>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </div>
      </section>

      {/* 4. Sample Event Galleries */}
      <section className="py-24 sm:py-32 bg-[#fdfaec] overflow-hidden animated-section">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="mb-16 fade-up">
            <h2 className="font-headline text-4xl sm:text-5xl text-[#808f2c]">A Glimpse of Past Events</h2>
            <p className="mt-4 text-lg max-w-3xl mx-auto text-black/80">Moments of joy and elegance captured at Maison Royale.</p>
          </div>
          <div className="space-y-8 fade-up">
            <GalleryCarousel images={galleryImagesWeddingTop} direction="forward" />
            <GalleryCarousel images={galleryImagesWeddingBottom} direction="reverse" />
          </div>
        </div>
      </section>

      {/* 5. Testimonials */}
      <section className="relative py-24 sm:py-32 bg-black text-white animated-section">
        <div className="absolute inset-0 z-0 opacity-20">
            <Image src="https://picsum.photos/seed/etest/1800/1200" alt="Dimly lit restaurant" fill className="object-cover blur-sm" data-ai-hint="dim restaurant elegant"/>
        </div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="mb-16 fade-up">
            <h2 className="font-headline text-4xl sm:text-5xl text-white">What Our Clients Say</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="fade-up">
                <Star className="w-10 h-10 mx-auto text-[#b6cc37] mb-4"/>
                <blockquote className="text-xl italic text-white/90">"{testimonial.quote}"</blockquote>
                <p className="mt-6 font-semibold tracking-wider text-white">- {testimonial.author}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Final CTA */}
      <section id="contact" className="relative h-[70vh] w-full flex items-center justify-center text-center text-white overflow-hidden final-cta">
        <div className="absolute inset-0 z-0">
          <Image src="/assets/47.jpg" alt="Elegant event hall ready for a party" fill className="object-cover cta-bg" data-ai-hint="event hall luxury"/>
          <div className="absolute inset-0 bg-black/60"></div>
        </div>
        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 animated-section">
          <h2 className="font-headline text-4xl sm:text-6xl text-white drop-shadow-xl fade-up">Host Your Next Event with Us</h2>
          <p className="mt-4 text-lg max-w-3xl mx-auto text-white/90 drop-shadow-lg fade-up">Let us help you create an extraordinary and memorable occasion. Contact our events team to begin planning.</p>
          <div className="mt-8 fade-up">
            <Button size="lg" asChild className="text-lg px-10 py-7 rounded-full shadow-lg bg-[#b6cc37] hover:bg-[#84a641] text-black transition-all transform hover:scale-105 hover:shadow-[0_0_20px_#b6cc37]">
              <Link href="/contact">Reserve Your Event</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
