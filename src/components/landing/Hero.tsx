"use client";

import { useLayoutEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { gsap } from 'gsap';
import { Button } from '@/components/ui/button';

export default function Hero() {
  const component = useRef(null);
  const headingRef = useRef(null);
  const subheadingRef = useRef(null);
  const buttonRef = useRef(null);

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      gsap.from(headingRef.current, {
        duration: 1.2,
        y: 50,
        opacity: 0,
        ease: 'power3.out',
        delay: 0.3,
      });
      gsap.from(subheadingRef.current, {
        duration: 1.2,
        y: 50,
        opacity: 0,
        ease: 'power3.out',
        delay: 0.5,
      });
      gsap.from(buttonRef.current, {
        duration: 1.2,
        y: 50,
        opacity: 0,
        ease: 'power3.out',
        delay: 0.7,
      });
      
      gsap.to(buttonRef.current, {
        scale: 1.05,
        repeat: -1,
        yoyo: true,
        duration: 1.5,
        ease: 'power1.inOut',
        delay: 1.9
      })
    }, component);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={component} className="relative h-screen w-full flex items-center justify-center text-center text-white overflow-hidden">
      <div className="absolute inset-0 z-0">
        <Image
          src="https://picsum.photos/1920/1080"
          alt="Luxury dining setting at Maison Royale"
          fill
          priority
          className="object-cover"
          data-ai-hint="luxury dining interior"
        />
        <div className="absolute inset-0 bg-black/60"></div>
      </div>
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
        <h1 ref={headingRef} className="font-headline text-5xl sm:text-7xl lg:text-8xl text-secondary drop-shadow-2xl">
          Maison Royale
        </h1>
        <p ref={subheadingRef} className="mt-4 text-lg sm:text-xl lg:text-2xl text-white tracking-wider drop-shadow-lg">
          A Culinary Experience Beyond Taste
        </p>
        <div ref={buttonRef} className="mt-10">
          <Button size="lg" variant="secondary" asChild className="text-lg px-8 py-6 rounded-md shadow-lg shadow-secondary/20 hover:bg-primary hover:text-secondary hover:border-secondary border border-transparent transition-all">
            <Link href="/reservations">Reserve a Table</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
