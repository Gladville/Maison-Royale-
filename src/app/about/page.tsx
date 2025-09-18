
"use client";

import { useLayoutEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Button } from '@/components/ui/button';
import { Leaf, ChefHat, Award, UtensilsCrossed, Star } from 'lucide-react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";



const awards = [
  { name: 'Michelin Star', year: '2023' },
  { name: 'Gourmet Gazette', year: '2023' },
  { name: 'Culinary Choice', year: '2022' },
  { name: 'Restaurant of the Year', year: '2021' },
  { name: 'Top 50 Restaurants', year: '2020' },
];

export default function AboutPage() {
  const mainRef = useRef(null);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      // Hero Parallax
      gsap.to('.hero-bg', {
        y: '20%',
        ease: 'none',
        scrollTrigger: {
          trigger: '.hero-section',
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      });

      // Hero Text Fade-in
      gsap.from('.hero-content > *', {
        y: 50,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: 'power3.out',
      });
      
      // Section Animations
      const sections = gsap.utils.toArray<HTMLElement>('.animated-section');
      sections.forEach(section => {
        const slideIn = section.querySelectorAll('.slide-in-left, .slide-in-right');
        const fadeUp = section.querySelectorAll('.fade-up');
        
        if (slideIn.length > 0) {
            gsap.from(slideIn, {
                x: (i) => i % 2 === 0 ? -100 : 100,
                opacity: 0,
                duration: 1.2,
                ease: 'power3.out',
                stagger: 0.2,
                scrollTrigger: {
                    trigger: section,
                    start: 'top 80%',
                }
            });
        }
        
        if (fadeUp.length > 0) {
            gsap.from(fadeUp, {
                y: 50,
                opacity: 0,
                duration: 1,
                stagger: 0.15,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: section,
                    start: 'top 80%',
                }
            });
        }
      });

      // Final CTA Parallax
      gsap.to('.cta-bg', {
        backgroundPosition: '50% 120%',
        ease: 'none',
        scrollTrigger: {
          trigger: '.final-cta',
          start: 'top bottom',
          end: 'bottom top',
          scrub: true
        }
      });

    }, mainRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={mainRef} className="bg-[#fdfaec]">
      {/* 1. Hero Section */}
      <section className="relative h-[80vh] w-full flex items-center justify-center text-center text-white overflow-hidden hero-section">
        <div className="absolute inset-0 z-0 hero-bg">
          <Image
            src="/assets/21.jpg"
            alt="Luxurious interior of Maison Royale"
            fill
            priority
            className="object-cover"
            data-ai-hint="restaurant interior luxury"
          />
          <div className="absolute inset-0 bg-black/60"></div>
        </div>
        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 hero-content">
          <h1 className="font-headline text-5xl sm:text-7xl lg:text-8xl text-[#B5CC38] drop-shadow-2xl">
            The Maison Royale Story
          </h1>
          <p className="mt-4 text-lg sm:text-xl lg:text-2xl text-white tracking-wider drop-shadow-lg">
            A tradition of culinary excellence, a passion for innovation.
          </p>
          <div className="mt-10">
            <Button size="lg" asChild className="text-lg px-8 py-6 rounded-full shadow-lg bg-[#b6cc37] hover:bg-[#84a641] text-black transition-all transform hover:scale-105 hover:shadow-xl">
              <Link href="/gallery">Discover Our Menu</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* 2. Our Story */}
      <section className="py-24 sm:py-32 bg-[#fdfaec] overflow-hidden animated-section">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-6 slide-in-left">
              <h2 className="font-headline text-4xl sm:text-5xl text-black">Our Humble Beginnings</h2>
              <p className="text-lg text-black/80 leading-relaxed">
                Maison Royale was born from a simple dream: to create a dining experience that transcends the ordinary. Our founder, Chef Auguste, inherited a rich legacy of family recipes and a philosophy that food should not only nourish the body but also delight the soul.
              </p>
              <p className="text-black/80 leading-relaxed">
                From a small kitchen in Paris to the heart of London, our journey has been one of dedication and passion. We remain committed to honoring our roots while continuously pushing the boundaries of culinary art.
              </p>
            </div>
            <div className="relative h-[500px] lg:h-[600px] rounded-lg overflow-hidden shadow-2xl slide-in-right">
              <Image
                src="/assets/32.jpg"
                alt="Chef carefully plating a dish"
                fill
                className="object-cover"
                data-ai-hint="chef plating food"
              />
            </div>
          </div>
        </div>
      </section>
      
      {/* 3. Philosophy */}
      <section className="py-24 sm:py-32 bg-black text-white overflow-hidden animated-section">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-headline text-4xl sm:text-5xl text-[#808f2c] fade-up">Our Culinary Philosophy</h2>
          <p className="mt-4 text-lg max-w-3xl mx-auto text-white/80 fade-up">We believe in three core principles that guide every dish we create.</p>
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="space-y-4 fade-up">
              <div className="flex justify-center">
                  <div className="p-4 bg-[#b6cc37] rounded-full">
                      <Leaf className="h-8 w-8 text-black" />
                  </div>
              </div>
              <h3 className="font-headline text-2xl">Seasonal Ingredients</h3>
              <p className="text-white/70">Our menu is a reflection of the seasons. We source the finest local and organic ingredients at their peak to ensure unparalleled freshness and flavor.</p>
            </div>
            <div className="space-y-4 fade-up">
                <div className="flex justify-center">
                    <div className="p-4 bg-[#b6cc37] rounded-full">
                        <UtensilsCrossed className="h-8 w-8 text-black" />
                    </div>
              </div>
              <h3 className="font-headline text-2xl">Artful Innovation</h3>
              <p className="text-white/70">While rooted in classic techniques, we embrace creativity. Each plate is a canvas, a chance to present familiar flavors in new and exciting ways.</p>
            </div>
            <div className="space-y-4 fade-up">
                <div className="flex justify-center">
                    <div className="p-4 bg-[#b6cc37] rounded-full">
                        <ChefHat className="h-8 w-8 text-black" />
                    </div>
              </div>
              <h3 className="font-headline text-2xl">Unmatched Hospitality</h3>
              <p className="text-white/70">A meal is an experience. Our team is dedicated to providing warm, intuitive service to make every guest feel like royalty.</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* 4. The Chef */}
      <section className="py-24 sm:py-32 bg-[#fdfaec] overflow-hidden animated-section">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="relative h-[500px] lg:h-[600px] rounded-lg overflow-hidden shadow-2xl slide-in-left">
              <Image
                src="/assets/60.jpg"
                alt="Portrait of the head chef"
                fill
                className="object-cover"
                data-ai-hint="chef portrait"
              />
               <div className="absolute bottom-0 left-0 right-0 bg-black/50 p-6 text-white">
                  <p className="font-headline text-xl italic">"Cooking is a story. I want to tell a beautiful one."</p>
                  <p className="text-right mt-2">- Chef Elena Dubois</p>
                </div>
            </div>
             <div className="space-y-6 slide-in-right">
              <h2 className="font-headline text-4xl sm:text-5xl text-black">Meet Our Head Chef</h2>
              <p className="text-lg text-black/80 leading-relaxed">
                Chef Elena Dubois is the visionary at the helm of Maison Royale. With training in Michelin-starred kitchens across Europe, she brings a blend of precision, passion, and artistry to every creation.
              </p>
              <p className="text-black/80 leading-relaxed">
                Her philosophy centers on letting the ingredients shine, transforming them into edible masterpieces that are both comforting and surprising. She invites you to taste the passion and dedication infused in every bite.
              </p>
              <Button asChild className="rounded-full bg-[#b6cc37] text-black hover:bg-[#84a641]">
                <Link href="/menu">Explore The Menu &rarr;</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
      
      {/* 5. Awards */}
      <section className="py-24 sm:py-32 bg-[url('/assets/66.jpg')] text-white overflow-hidden animated-section">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16 fade-up">
                <h2 className="font-headline text-4xl sm:text-5xl text-[#b6cc37]">Recognized Excellence</h2>
                <p className="mt-4 text-lg max-w-2xl mx-auto text-white/80">We are honored to have been celebrated by our peers and critics.</p>
            </div>
            <Carousel 
              plugins={[Autoplay({ delay: 2000, stopOnInteraction: false })]}
              opts={{ align: "start", loop: true }}
              className="w-full fade-up"
            >
              <CarouselContent className="-ml-4">
                {awards.concat(awards).map((award, index) => (
                  <CarouselItem key={index} className="pl-4 md:basis-1/3 lg:basis-1/5">
                    <div className="p-1">
                      <div className="flex flex-col items-center justify-center text-center p-6 bg-[#2A2A2A] rounded-lg h-40 border border-transparent hover:border-[#b6cc37] transition-colors">
                          <Star className="w-8 h-8 text-[#b6cc37] mb-2"/>
                          <h4 className="font-headline text-xl text-white">{award.name}</h4>
                          <p className="text-white/60">{award.year}</p>
                      </div>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>
        </div>
      </section>

      {/* 6. Final CTA */}
      <section className="relative h-[60vh] w-full flex items-center justify-center text-center text-white overflow-hidden final-cta">
        <div className="absolute inset-0 z-0">
          <Image
            src="/assets/47.jpg"
            alt="Elegant table setting at Maison Royale"
            fill
            className="object-cover cta-bg"
            data-ai-hint="elegant table setting"
          />
          <div className="absolute inset-0 bg-black/60"></div>
        </div>
        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 animated-section">
          <h2 className="font-headline text-4xl sm:text-6xl text-white drop-shadow-xl fade-up">
            Become Part of Our Story
          </h2>
          <div className="mt-8 fade-up">
            <Button size="lg" asChild className="text-lg px-10 py-7 rounded-full shadow-lg bg-[#b6cc37] hover:bg-[#84a641] text-black transition-all transform hover:scale-105 hover:shadow-xl">
              <Link href="/reservations">Reserve a Table</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}

