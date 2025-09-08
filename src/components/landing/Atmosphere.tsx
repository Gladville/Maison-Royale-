// This component is no longer used in page.tsx. You can remove it if you wish.
"use client";

import { useLayoutEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Button } from '@/components/ui/button';

gsap.registerPlugin(ScrollTrigger);

export default function Atmosphere() {
  const component = useRef(null);
  const parallaxImage = useRef(null);

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      gsap.to(parallaxImage.current, {
        y: '20%',
        ease: 'none',
        scrollTrigger: {
          trigger: component.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      });
    }, component);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={component} className="relative h-[70vh] min-h-[600px] overflow-hidden">
      <div className="absolute inset-0 z-0">
        <Image
          ref={parallaxImage}
          src="https://picsum.photos/1200/1000"
          alt="Fresh organic vegetables"
          fill
          className="object-cover scale-125"
          data-ai-hint="fresh vegetables"
        />
        <div className="absolute inset-0 bg-black/60"></div>
      </div>
      <div className="relative z-10 flex h-full items-center justify-center text-center">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <h2 className="font-headline text-4xl sm:text-5xl lg:text-6xl text-primary">
            Freshness Delivered Daily
          </h2>
          <p className="text-lg md:text-xl max-w-3xl mx-auto text-white">
            From farm to your table. We source the best ingredients for a healthier life.
          </p>
          <Button size="lg" asChild className="rounded-full">
            <Link href="/menu/drinks">See Our Products</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
