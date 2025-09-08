"use client";

import { useLayoutEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Button } from "@/components/ui/button";

gsap.registerPlugin(ScrollTrigger);

export default function Experience() {
  const component = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".image-card").forEach((el, i) => {
        gsap.from(el, {
          opacity: 0,
          y: 50,
          duration: 1,
          delay: i * 0.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        });
      });

      gsap.from(".text-content", {
        opacity: 0,
        y: 30,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".text-content",
          start: "top 90%",
          toggleActions: "play none none none",
        },
      });
    }, component);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={component} className="py-24 sm:py-32 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center mb-16">
          <h2 className="font-headline text-4xl sm:text-5xl text-foreground">
            More Than a Meal
          </h2>
          <p className="mt-4 text-lg text-foreground/80 max-w-2xl mx-auto">
            Discover recipes, health tips, and a community of food lovers with an immersive world of elegance, music, and art.
          </p>
        </div>

        {/* Images + Text */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Images side by side */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="relative h-72 sm:h-80 rounded-lg overflow-hidden shadow-xl image-card">
              <Image
                src="https://picsum.photos/800/600"
                alt="Community cooking class"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
              <h3 className="absolute bottom-6 left-6 font-headline text-2xl text-white">
                Healthy Recipes & community
              </h3>
            </div>
            <div className="relative h-72 sm:h-80 rounded-lg overflow-hidden shadow-xl image-card">
              <Image
                src="https://picsum.photos/800/601"
                alt="Smiling person holding a box of fresh vegetables"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
              <h3 className="absolute bottom-6 left-6 font-headline text-2xl text-white">
              Breathtaking Views & Music
              </h3>
            </div>
          </div>

          {/* Text */}
          <div className="text-center lg:text-left lg:pl-16 text-content">
            <p className="text-xl text-foreground/80 leading-relaxed mb-8">
              At Maison Royale, we believe in nourishing a healthy lifestyle.
              Explore our collection of delicious recipes, get inspired by our
              community, and make every meal a celebration of wellness.Every detail at Maison Royale is meticulously curated to create
                an atmosphere of sophisticated charm. From the breathtaking
                views of the London skyline to the live classical music and
                rotating collection of fine art, your experience with us is
                designed to enchant all the senses.
            </p>
            <Button size="lg" asChild className="rounded-full">
              <Link href="/events">Discover More &  Join Our Community &rarr;</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
