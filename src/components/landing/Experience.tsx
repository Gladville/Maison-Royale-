// This component is no longer used in page.tsx. You can remove it if you wish.
"use client";

import { useLayoutEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Button } from '@/components/ui/button';

gsap.registerPlugin(ScrollTrigger);

export default function Experience() {
  const component = useRef(null);

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      gsap.from(component.current, {
        opacity: 0,
        y: 50,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: component.current,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      });
    }, component);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={component} className="py-24 sm:py-32 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="font-headline text-4xl sm:text-5xl text-foreground">More Than Groceries</h2>
          <p className="mt-4 text-lg text-foreground/80 max-w-2xl mx-auto">
            Discover recipes, health tips, and a community of food lovers.
          </p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div className="space-y-8">
            <div className="relative h-80 rounded-lg overflow-hidden shadow-xl">
              <Image
                src="https://picsum.photos/800/600"
                alt="Community cooking class"
                fill
                className="object-cover"
                data-ai-hint="cooking class community"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
              <h3 className="absolute bottom-6 left-6 font-headline text-3xl text-white">Healthy Recipes</h3>
            </div>
            <div className="relative h-80 rounded-lg overflow-hidden shadow-xl">
              <Image
                src="https://picsum.photos/800/601"
                alt="Smiling person holding a box of fresh vegetables"
                fill
                className="object-cover"
                data-ai-hint="happy customer vegetables"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
              <h3 className="absolute bottom-6 left-6 font-headline text-3xl text-white">Join Our Community</h3>
            </div>
          </div>
          <div className="text-center lg:text-left lg:pl-16">
            <p className="text-xl text-foreground/80 leading-relaxed mb-8">
              At Maison Royale, we believe in nourishing a healthy lifestyle. Explore our collection of delicious recipes, get inspired by our community, and make every meal a celebration of wellness.
            </p>
            <Button size="lg" asChild className="rounded-full">
              <Link href="/events">Discover More &rarr;</Link>
            </Button>
          </div>
        </div>
      </div>
      <section ref={component} className="py-24 sm:py-32 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="font-headline text-4xl sm:text-5xl text-primary">More Than a Meal</h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            Beyond dining – an immersive world of elegance, music, and art.
          </p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div className="space-y-8">
            <div className="relative h-80 rounded-lg overflow-hidden shadow-xl">
              <Image
                src="https://picsum.photos/800/600"
                alt="London skyline at night from the restaurant window"
                fill
                className="object-cover"
                data-ai-hint="london skyline night"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
              <h3 className="absolute bottom-6 left-6 font-headline text-3xl text-white">Breathtaking Views</h3>
            </div>
            <div className="relative h-80 rounded-lg overflow-hidden shadow-xl">
              <Image
                src="https://picsum.photos/800/601"
                alt="Art piece inside the restaurant"
                fill
                className="object-cover"
                data-ai-hint="restaurant art"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
              <h3 className="absolute bottom-6 left-6 font-headline text-3xl text-white">Curated Art & Music</h3>
            </div>
          </div>
          <div className="text-center lg:text-left lg:pl-16">
            <p className="text-xl text-muted-foreground leading-relaxed mb-8">
              Every detail at Maison Royale is meticulously curated to create an atmosphere of sophisticated charm. From the breathtaking views of the London skyline to the live classical music and rotating collection of fine art, your experience with us is designed to enchant all the senses.
            </p>
            <Button size="lg" asChild>
              <Link href="/events">Discover Events & Private Dining &rarr;</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
    </section>
    
  );
}
