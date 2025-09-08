// This component is no longer used in page.tsx. You can remove it if you wish.
"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const testimonials = [
  {
    quote: "The freshest ingredients I've ever had delivered. Forma Health changed the way I cook!",
    author: "Jessica P.",
  },
  {
    quote: "Amazing quality and fantastic customer service. I love the convenience and the healthy options.",
    author: "Mike R.",
  },
  {
    quote: "My hair and skin have never looked better. It truly starts from the inside out. Thank you!",
    author: "Sarah L.",
  },
];

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFading, setIsFading] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsFading(true);
      setTimeout(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
        setIsFading(false);
      }, 500); // fade-out duration
    }, 5000); // time each testimonial is shown

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative py-24 sm:py-32 overflow-hidden bg-foreground text-background">
        <div className="absolute inset-0 z-0 opacity-10">
            <Image
                src="https://picsum.photos/1200/800"
                alt="Blurred image of fresh produce"
                fill
                className="object-cover blur-sm"
                data-ai-hint="fresh produce blurred"
            />
        </div>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        <div className="min-h-[150px]">
          <div className={cn("transition-opacity duration-500", isFading ? 'opacity-0' : 'opacity-100')}>
            <p className="font-headline text-2xl sm:text-3xl lg:text-4xl text-background max-w-4xl mx-auto">
              "{testimonials[currentIndex].quote}"
            </p>
            <p className="mt-6 text-lg text-primary tracking-wider font-semibold">
              - {testimonials[currentIndex].author}
            </p>
          </div>
        </div>
        <div className="mt-10">
          <Button variant="outline" size="lg" asChild className="border-primary text-primary hover:bg-primary hover:text-foreground rounded-full">
            <Link href="/reviews">Read More Reviews &rarr;</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
