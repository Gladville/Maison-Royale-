"use client";

import { useLayoutEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Button } from '@/components/ui/button';

gsap.registerPlugin(ScrollTrigger);

export default function SecAbout() {
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
          <div ref={textRef} className="space-y-6">
            <h2 className="font-headline text-4xl sm:text-5xl text-foreground">A seamless Food experience,</h2>
            <p className="text-lg text-foreground/80 leading-relaxed">
             We make grocery shopping easy, affordable, and reliable. From farm-fresh produce to your favorite daily essentials.
            </p>
            <Button asChild className="rounded-full text-green-900 bg-[#B5CC38]">
              <Link href="/about">
                Shop Now &rarr;
              </Link>
            </Button>
          </div>
          <div ref={imageRef} className="relative h-[500px] lg:h-[600px] rounded-lg overflow-hidden">
            <Image
              src="https://picsum.photos/1000/800"
              alt="Green smoothie in a glass surrounded by fresh fruit"
              fill
              className="object-cover"
              data-ai-hint="green smoothie fruit"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
