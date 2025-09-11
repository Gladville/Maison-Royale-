
"use client";

import { useLayoutEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useToast } from "@/hooks/use-toast";
import { Phone, Mail, MapPin, Facebook, Twitter, Instagram, ChefHat } from 'lucide-react';
import { cn } from '@/lib/utils';

gsap.registerPlugin(ScrollTrigger);

const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  phone: z.string().optional(),
  subject: z.string().min(1, { message: "Please select a subject." }),
  message: z.string().min(10, { message: "Message must be at least 10 characters." }),
});

export default function ContactPage() {
  const mainRef = useRef(null);
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    console.log(values);
    setIsSubmitting(false);
    setFormSubmitted(true);
    form.reset();
    toast({
      title: "Message Sent!",
      description: "Thank you for contacting us. We will get back to you shortly.",
      className: "bg-[#b6cc37] text-black border-none",
    });
  }

  useLayoutEffect(() => {
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
        const fadeUp = section.querySelectorAll('.fade-up');
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
      
    }, mainRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={mainRef} className="bg-[#fdfaec]">
      {/* 1. Hero Section */}
      <section className="relative h-[70vh] w-full flex items-center justify-center text-center text-white overflow-hidden hero-section">
        <div className="absolute inset-0 z-0 hero-bg">
          <Image
            src="https://picsum.photos/seed/contact-hero/1800/1200"
            alt="Elegant restaurant bar"
            fill
            priority
            className="object-cover"
            data-ai-hint="elegant restaurant bar"
          />
          <div className="absolute inset-0 bg-black/60"></div>
        </div>
        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 hero-content">
          <h1 className="font-headline text-5xl sm:text-7xl lg:text-8xl text-white drop-shadow-2xl">
            Get In Touch
          </h1>
          <p className="mt-4 text-lg sm:text-xl lg:text-2xl text-white/90 tracking-wider drop-shadow-lg">
            We look forward to hearing from you.
          </p>
        </div>
      </section>

      {/* 2. Contact Form Section */}
      <section className="py-24 sm:py-32 bg-[#fdfaec] animated-section">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">
                <div className="text-center mb-12 fade-up">
                    <h2 className="font-headline text-4xl sm:text-5xl text-black">Send Us a Message</h2>
                    <p className="mt-4 text-lg text-black/80">Have a question or a special request? Fill out the form below.</p>
                </div>
                <div className="bg-white p-8 sm:p-12 rounded-lg shadow-2xl fade-up">
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                            <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                <FormLabel className="text-black">Full Name</FormLabel>
                                <FormControl>
                                    <Input placeholder="John Doe" {...field} className="bg-gray-100 border-gray-300 text-black" />
                                </FormControl>
                                <FormMessage />
                                </FormItem>
                            )}
                            />
                            <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                <FormLabel className="text-black">Email Address</FormLabel>
                                <FormControl>
                                    <Input placeholder="john.doe@example.com" {...field} className="bg-gray-100 border-gray-300 text-black" />
                                </FormControl>
                                <FormMessage />
                                </FormItem>
                            )}
                            />
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                            <FormField
                            control={form.control}
                            name="phone"
                            render={({ field }) => (
                                <FormItem>
                                <FormLabel className="text-black">Phone Number (Optional)</FormLabel>
                                <FormControl>
                                    <Input placeholder="+1 (555) 123-4567" {...field} className="bg-gray-100 border-gray-300 text-black" />
                                </FormControl>
                                <FormMessage />
                                </FormItem>
                            )}
                            />
                             <FormField
                                control={form.control}
                                name="subject"
                                render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-black">Subject</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                        <SelectTrigger className="bg-gray-100 border-gray-300 text-black">
                                        <SelectValue placeholder="Select a subject" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        <SelectItem value="General Inquiry">General Inquiry</SelectItem>
                                        <SelectItem value="Reservation Question">Reservation Question</SelectItem>
                                        <SelectItem value="Private Event">Private Event Inquiry</SelectItem>
                                        <SelectItem value="Feedback">Feedback</SelectItem>
                                        <SelectItem value="Press">Press</SelectItem>
                                    </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                                )}
                            />
                        </div>
                        
                        <FormField
                            control={form.control}
                            name="message"
                            render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-black">Message</FormLabel>
                                <FormControl>
                                <Textarea
                                    placeholder="Your message..."
                                    className="min-h-[150px] bg-gray-100 border-gray-300 text-black"
                                    {...field}
                                />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                            )}
                        />
                        <div className="text-center">
                            <Button type="submit" size="lg" className="px-10 py-6 text-lg rounded-full bg-[#b6cc37] text-black hover:bg-[#84a641] transition-all transform hover:scale-105" disabled={isSubmitting}>
                            {isSubmitting ? 'Sending...' : 'Send Message'}
                            </Button>
                        </div>
                        </form>
                    </Form>
                </div>
            </div>
        </div>
      </section>

      {/* 3. Location & Hours */}
      <section className="py-24 sm:py-32 bg-black text-white animated-section">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="h-[400px] lg:h-[500px] w-full rounded-lg overflow-hidden fade-up">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2483.315573456306!2d-0.1277583842305596!3d51.50735097963503!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x487604ce39486c67%3A0x86782363b313723!2sTrafalgar%20Square!5e0!3m2!1sen!2suk!4v1678886533740!5m2!1sen!2suk"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="filter grayscale-[1] contrast-[1.2] opacity-[0.8]"
              ></iframe>
            </div>
            <div className="space-y-8 fade-up">
              <h2 className="font-headline text-4xl sm:text-5xl text-[#808f2c]">Visit Us</h2>
              <div className="space-y-4 text-lg">
                <div className="flex items-center gap-4">
                  <MapPin className="h-6 w-6 text-[#b6cc37]" />
                  <span>123 Culinary Lane, London, W1 1AA</span>
                </div>
                <div className="flex items-center gap-4">
                  <Phone className="h-6 w-6 text-[#b6cc37]" />
                  <span>+44 20 1234 5678</span>
                </div>
                <div className="flex items-center gap-4">
                  <Mail className="h-6 w-6 text-[#b6cc37]" />
                  <span>reservations@maisonroyale.com</span>
                </div>
              </div>
              <div>
                <h3 className="font-headline text-2xl text-[#808f2c] mb-4">Opening Hours</h3>
                <div className="space-y-2">
                  <p>Monday - Friday: 12:00 PM - 11:00 PM</p>
                  <p>Saturday - Sunday: 11:00 AM - 11:30 PM</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* 4. Social Media */}
      <section className="py-16 bg-[#fdfaec] animated-section">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
             <div className="mb-8 fade-up">
                <h2 className="font-headline text-3xl sm:text-4xl text-black">Follow Our Journey</h2>
             </div>
             <div className="flex justify-center space-x-8 fade-up">
                <Link href="#" className="text-[#b6cc37] hover:text-[#84a641] transition-colors transform hover:scale-110">
                    <Facebook size={32} />
                </Link>
                <Link href="#" className="text-[#b6cc37] hover:text-[#84a641] transition-colors transform hover:scale-110">
                    <Instagram size={32} />
                </Link>
                <Link href="#" className="text-[#b6cc37] hover:text-[#84a641] transition-colors transform hover:scale-110">
                    <Twitter size={32} />
                </Link>
                <Link href="#" className="text-[#b6cc37] hover:text-[#84a641] transition-colors transform hover:scale-110">
                    <ChefHat size={32} />
                </Link>
             </div>
          </div>
      </section>

      {/* 5. Final CTA */}
      <section className="relative h-[60vh] w-full flex items-center justify-center text-center text-white overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://picsum.photos/seed/contact-cta/1800/1200"
            alt="Interior of Maison Royale"
            fill
            className="object-cover"
            data-ai-hint="restaurant interior luxury"
          />
          <div className="absolute inset-0 bg-black/60"></div>
        </div>
        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 animated-section">
          <h2 className="font-headline text-4xl sm:text-6xl text-white drop-shadow-xl fade-up">
            Experience Maison Royale
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
