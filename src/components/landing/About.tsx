"use client";

import { useLayoutEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Button } from '@/components/ui/button';

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const component = useRef(null);
  const imageRef = useRef(null);
  const textRef = useRef(null);

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      gsap.from(imageRef.current, {
        x: -100,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: component.current,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      });
      gsap.from(textRef.current, {
        x: 100,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
        delay: 0.2,
        scrollTrigger: {
          trigger: component.current,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      });
    }, component);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={component} className="py-24 sm:py-32 bg-background overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div ref={imageRef} className="relative h-[500px] lg:h-[600px] rounded-lg overflow-hidden shadow-2xl">
            <Image
              src="https://picsum.photos/1000/800"
              alt="Elegant dining room of Maison Royale"
              fill
              className="object-cover"
              data-ai-hint="elegant dining room"
            />
          </div>
          <div ref={textRef} className="space-y-6">
            <h2 className="font-headline text-4xl sm:text-5xl text-primary">A Legacy of Flavour</h2>
            <p className="text-lg text-foreground/80 leading-relaxed">
              Nestled in the heart of London, Maison Royale is more than a restaurant; it is a testament to a family's century-old passion for culinary excellence. Our story began with a promise to blend timeless tradition with bold innovation, creating an unforgettable dining experience.
            </p>
            <p className="text-foreground/80 leading-relaxed">
              Each dish is a masterpiece, crafted with locally sourced ingredients and an artist's touch. We invite you to become part of our story, to savour moments of pure indulgence, and to discover a culinary sanctuary where every meal is a celebration.
            </p>
            <Button variant="link" asChild className="p-0 text-primary text-lg hover:no-underline hover:text-secondary">
              <Link href="/about">
                Learn More About Us &rarr;
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
