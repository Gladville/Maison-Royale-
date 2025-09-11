
"use client";

import { useLayoutEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Button } from '@/components/ui/button';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";

gsap.registerPlugin(ScrollTrigger);

const alaCarteImagesTop = [
  { src: 'https://picsum.photos/seed/gc1/800/600', alt: 'Gourmet Dish 1', hint: 'gourmet dish' },
  { src: 'https://picsum.photos/seed/gc2/800/600', alt: 'Gourmet Dish 2', hint: 'plated dessert' },
  { src: 'https://picsum.photos/seed/gc3/800/600', alt: 'Gourmet Dish 3', hint: 'artisan bread' },
  { src: 'https://picsum.photos/seed/gc4/800/600', alt: 'Gourmet Dish 4', hint: 'seafood platter' },
  { src: 'https://picsum.photos/seed/gc5/800/600', alt: 'Gourmet Dish 5', hint: 'roasted chicken' },
  { src: 'https://picsum.photos/seed/gc6/800/600', alt: 'Gourmet Dish 6', hint: 'steak dinner' },
];

const alaCarteImagesBottom = [
  { src: 'https://picsum.photos/seed/gc7/800/600', alt: 'Gourmet Dish 7', hint: 'pasta dish' },
  { src: 'https://picsum.photos/seed/gc8/800/600', alt: 'Gourmet Dish 8', hint: 'colorful salad' },
  { src: 'https://picsum.photos/seed/gc9/800/600', alt: 'Gourmet Dish 9', hint: 'gourmet soup' },
  { src: 'https://picsum.photos/seed/gc10/800/600', alt: 'Gourmet Dish 10', hint: 'fine dining appetizer' },
  { src: 'https://picsum.photos/seed/gc11/800/600', alt: 'Gourmet Dish 11', hint: 'exotic fruit platter' },
  { src: 'https://picsum.photos/seed/gc12/800/600', alt: 'Gourmet Dish 12', hint: 'cheese board' },
];

const tastingImages = [
  { src: 'https://picsum.photos/seed/gt1/800/600', alt: 'Tasting Menu 1', hint: 'molecular gastronomy' },
  { src: 'https://picsum.photos/seed/gt2/800/600', alt: 'Tasting Menu 2', hint: 'deconstructed dish' },
  { src: 'https://picsum.photos/seed/gt3/800/600', alt: 'Tasting Menu 3', hint: 'edible flowers' },
  { src: 'https://picsum.photos/seed/gt4/800/600', alt: 'Tasting Menu 4', hint: 'culinary foam' },
  { src: 'https://picsum.photos/seed/gt5/800/600', alt: 'Tasting Menu 5', hint: 'tasting course' },
  { src: 'https://picsum.photos/seed/gt6/800/600', alt: 'Tasting Menu 6', hint: 'wine pairing' },
];

const wineImages = [
    { src: 'https://picsum.photos/seed/gw1/800/600', alt: 'Wine & Drinks 1', hint: 'red wine bottle' },
    { src: 'https://picsum.photos/seed/gw2/800/600', alt: 'Wine & Drinks 2', hint: 'craft cocktail' },
    { src: 'https://picsum.photos/seed/gw3/800/600', alt: 'Wine & Drinks 3', hint: 'champagne glasses' },
    { src: 'https://picsum.photos/seed/gw4/800/600', alt: 'Wine & Drinks 4', hint: 'whiskey glass' },
    { src: 'https://picsum.photos/seed/gw5/800/600', alt: 'Wine & Drinks 5', hint: 'bartender pouring' },
    { src: 'https://picsum.photos/seed/gw6/800/600', alt: 'Wine & Drinks 6', hint: 'wine cellar' },
];

const dessertImagesTop = [
  { src: 'https://picsum.photos/seed/gd1/800/600', alt: 'Dessert 1', hint: 'chocolate lava cake' },
  { src: 'https://picsum.photos/seed/gd2/800/600', alt: 'Dessert 2', hint: 'strawberry cheesecake' },
  { src: 'https://picsum.photos/seed/gd3/800/600', alt: 'Dessert 3', hint: 'macarons platter' },
  { src: 'https://picsum.photos/seed/gd4/800/600', alt: 'Dessert 4', hint: 'artisan ice cream' },
  { src: 'https://picsum.photos/seed/gd5/800/600', alt: 'Dessert 5', hint: 'tiramisu' },
  { src: 'https://picsum.photos/seed/gd6/800/600', alt: 'Dessert 6', hint: 'fruit tart' },
];

const dessertImagesBottom = [
  { src: 'https://picsum.photos/seed/gd7/800/600', alt: 'Dessert 7', hint: 'creme brulee' },
  { src: 'https://picsum.photos/seed/gd8/800/600', alt: 'Dessert 8', hint: 'panna cotta' },
  { src: 'https://picsum.photos/seed/gd9/800/600', alt: 'Dessert 9', hint: 'eclairs' },
  { src: 'https://picsum.photos/seed/gd10/800/600', alt: 'Dessert 10', hint: 'chocolate mousse' },
  { src: 'https://picsum.photos/seed/gd11/800/600', alt: 'Dessert 11', hint: 'sorbet selection' },
  { src: 'https://picsum.photos/seed/gd12/800/600', alt: 'Dessert 12', hint: 'gourmet cupcake' },
];


export default function GalleryPage() {
  const mainRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Hero Animation
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
        gsap.from(section.querySelectorAll('.fade-up'), {
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
      });
      
    }, mainRef);
    return () => ctx.revert();
  }, []);

  const CarouselComponent = ({ images, direction = 'forward' }: { images: {src:string, alt:string, hint: string}[], direction?: 'forward' | 'reverse' }) => (
      <Carousel
          plugins={[Autoplay({ delay: 2000, stopOnInteraction: false, playOnInit: true, stopOnMouseEnter: true })]}
          opts={{ align: "start", loop: true, direction: direction === 'forward' ? 'ltr' : 'rtl' }}
          className="w-full"
      >
          <CarouselContent className="-ml-4">
              {images.concat(images).map((image, index) => (
                  <CarouselItem key={index} className="pl-4 md:basis-1/3 lg:basis-1/4">
                      <div className="p-1">
                          <div className="relative h-80 w-full overflow-hidden rounded-lg shadow-lg">
                              <Image
                                  src={image.src}
                                  alt={image.alt}
                                  fill
                                  className="object-cover transition-transform duration-500 ease-in-out group-hover:scale-110"
                                  data-ai-hint={image.hint}
                              />
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
      <section className="relative h-[70vh] w-full flex items-center justify-center text-center text-white overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://picsum.photos/seed/g-hero/1800/1200"
            alt="Artfully arranged collection of dishes"
            fill
            priority
            className="object-cover"
            data-ai-hint="gourmet food collection"
          />
          <div className="absolute inset-0 bg-black/60"></div>
        </div>
        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 hero-content">
          <h1 className="font-headline text-5xl sm:text-7xl lg:text-8xl text-white drop-shadow-2xl">
            The Gallery of Maison Royale
          </h1>
          <p className="mt-4 text-lg sm:text-xl lg:text-2xl text-white/90 tracking-wider drop-shadow-lg">
            A visual feast celebrating the art of our cuisine.
          </p>
        </div>
      </section>

      {/* 2. À La Carte */}
      <section id="a-la-carte" className="py-24 sm:py-32 bg-[#fdfaec] overflow-hidden animated-section">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="mb-16 fade-up">
            <h2 className="font-headline text-4xl sm:text-5xl text-[#808f2c]">À La Carte</h2>
            <p className="mt-4 text-lg max-w-3xl mx-auto text-black/80">
              Explore our chefs' signature creations, where every ingredient tells a story of passion and precision.
            </p>
          </div>
          <div className="space-y-8">
            <CarouselComponent images={alaCarteImagesTop} direction="forward" />
            <CarouselComponent images={alaCarteImagesBottom} direction="reverse" />
          </div>
        </div>
      </section>

      {/* 3. Tasting Menu */}
      <section id="tasting-menu" className="py-24 sm:py-32 bg-[#000000] text-white overflow-hidden animated-section">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="mb-16 fade-up">
            <h2 className="font-headline text-4xl sm:text-5xl text-white">Tasting Menu</h2>
            <p className="mt-4 text-lg max-w-3xl mx-auto text-white/80">
              A curated journey through the best of Maison Royale, designed to surprise and delight your senses.
            </p>
          </div>
          <CarouselComponent images={tastingImages} />
        </div>
      </section>
      
      {/* 4. Wine & Drinks */}
      <section id="wine-drinks" className="py-24 sm:py-32 bg-[#fdfaec] overflow-hidden animated-section">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="mb-16 fade-up">
            <h2 className="font-headline text-4xl sm:text-5xl text-[#808f2c]">Wine & Drinks</h2>
            <p className="mt-4 text-lg max-w-3xl mx-auto text-black/80">
              Our collection of fine wines and artisanal cocktails, perfectly paired to elevate your dining experience.
            </p>
          </div>
          <CarouselComponent images={wineImages} />
        </div>
      </section>

      {/* 5. Desserts */}
      <section id="desserts" className="py-24 sm:py-32 bg-[#000000] text-white overflow-hidden animated-section">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="mb-16 fade-up">
                <h2 className="font-headline text-4xl sm:text-5xl text-white">Desserts</h2>
                <p className="mt-4 text-lg max-w-3xl mx-auto text-white/80">
                    Indulge in our sweet masterpieces, a perfect finale to your culinary adventure.
                </p>
            </div>
             <div className="space-y-8">
                <CarouselComponent images={dessertImagesTop} direction="forward" />
                <CarouselComponent images={dessertImagesBottom} direction="reverse" />
            </div>
        </div>
      </section>
      
      {/* 6. Final CTA */}
      <section className="relative h-[60vh] w-full flex items-center justify-center text-center text-white overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://picsum.photos/seed/g-cta/1800/1200"
            alt="Elegant restaurant table setting"
            fill
            className="object-cover"
            data-ai-hint="elegant table setting"
          />
          <div className="absolute inset-0 bg-black/60"></div>
        </div>
        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 animated-section">
          <h2 className="font-headline text-4xl sm:text-6xl text-white drop-shadow-xl fade-up">
            Experience the Art of Dining
          </h2>
          <div className="mt-8 fade-up">
            <Button size="lg" asChild className="text-lg px-10 py-7 rounded-full shadow-lg bg-[#b6cc37] hover:bg-[#84a641] text-black transition-all transform hover:scale-105 hover:shadow-[0_0_20px_#b6cc37]">
              <Link href="/reservations">Reserve a Table</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
