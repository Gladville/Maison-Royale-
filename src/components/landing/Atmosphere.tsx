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
          alt="Champagne being poured"
          fill
          className="object-cover scale-125"
          data-ai-hint="cocktail pour"
        />
        <div className="absolute inset-0 bg-black/60"></div>
      </div>
      <div className="relative z-10 flex h-full items-center justify-center text-center">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <h2 className="font-headline text-4xl sm:text-5xl lg:text-6xl text-secondary">
            An Unrivaled Ambiance
          </h2>
          <p className="text-lg md:text-xl max-w-3xl mx-auto text-white">
            Curated wines, crafted cocktails, and champagne celebrations. Our bar is a symphony of spirits, designed to elevate your evening.
          </p>
          <Button size="lg" variant="secondary" asChild>
            <Link href="/menu/drinks">See Our Wine List &rarr;</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
