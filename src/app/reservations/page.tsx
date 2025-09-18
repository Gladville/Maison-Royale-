
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
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useToast } from "@/hooks/use-toast";
import { format } from 'date-fns';
import { Calendar as CalendarIcon, Clock, Users, Gift, Edit } from 'lucide-react';
import { cn } from '@/lib/utils';

gsap.registerPlugin(ScrollTrigger);

const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  phone: z.string().optional(),
  date: z.date({ required_error: "A date is required." }),
  time: z.string({ required_error: "A time slot is required." }),

  guests: z.number().min(1, "At least 1 guest is required.").max(12, "For parties larger than 12, please contact us directly."),
  occasion: z.string().optional(),
  requests: z.string().optional(),
});

const generateTimeSlots = () => {
    const slots = [];
    for (let i = 12; i <= 23; i++) { // 12 PM to 11 PM
        const hour = i % 12 === 0 ? 12 : i % 12;
        const ampm = i < 12 || i === 24 ? 'AM' : 'PM';
        slots.push(`${hour}:00 ${ampm}`);
        if (i < 23) slots.push(`${hour}:30 ${ampm}`);
    }
    return slots;
};

const timeSlots = generateTimeSlots();

export default function ReservationsPage() {
  const mainRef = useRef(null);
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedTime, setSelectedTime] = useState('');

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      time: "",
      guests: 2,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    console.log(values);
    setIsSubmitting(false);
    form.reset({ name: "", email: "", phone: "", time: "", guests: 2, occasion: "", requests: "" });
    setSelectedTime('');
    toast({
      title: "Reservation Confirmed!",
      description: "We look forward to welcoming you to Maison Royale.",
      className: "bg-[#b6cc37] text-black border-none",
    });
  }
  
  const handleTimeSelect = (time: string) => {
    setSelectedTime(time);
    form.setValue('time', time, { shouldValidate: true });
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
        const elements = section.querySelectorAll('.fade-up, .slide-in-left, .slide-in-right');
        gsap.from(elements, {
            y: (i, el) => el.classList.contains('fade-up') ? 50 : 0,
            x: (i, el) => {
                if (el.classList.contains('slide-in-left')) return -100;
                if (el.classList.contains('slide-in-right')) return 100;
                return 0;
            },
            opacity: 0,
            duration: 1.2,
            stagger: 0.15,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: section,
                start: 'top 80%',
            }
        });
      });

       // Final CTA Parallax
       gsap.to('.cta-bg', {
        backgroundPosition: '50% 120%',
        ease: 'none',
        scrollTrigger: {
          trigger: '.final-cta',
          start: 'top bottom',
          end: 'bottom top',
          scrub: true
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
            src="/assets/48.jpg"
            alt="Luxurious dining room at Maison Royale"
            fill
            priority
            className="object-cover"
            data-ai-hint="restaurant interior luxury"
          />
          <div className="absolute inset-0 bg-black/60"></div>
        </div>
        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 hero-content">
          <h1 className="font-headline text-5xl sm:text-7xl lg:text-8xl text-white drop-shadow-2xl">
            Reserve Your Table
          </h1>
          <p className="mt-4 text-lg sm:text-xl lg:text-2xl text-white/90 tracking-wider drop-shadow-lg">
            An unforgettable experience awaits.
          </p>
        </div>
      </section>

      {/* 2. Reservation Form */}
      <section id="form" className="py-24 sm:py-32 bg-[#fdfaec] animated-section">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                <div className="bg-white p-8 sm:p-12 rounded-lg shadow-2xl fade-up">
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                            <div className="text-center mb-8">
                                <h2 className="font-headline text-4xl text-black">Booking Details</h2>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <FormField control={form.control} name="name" render={({ field }) => (
                                    <FormItem><FormLabel className="text-black">Full Name</FormLabel><FormControl><Input placeholder="John Doe" {...field} className="bg-gray-100 border-gray-300 text-black" /></FormControl><FormMessage /></FormItem>
                                )}/>
                                <FormField control={form.control} name="email" render={({ field }) => (
                                    <FormItem><FormLabel className="text-black">Email</FormLabel><FormControl><Input placeholder="john.doe@example.com" {...field} className="bg-gray-100 border-gray-300 text-black" /></FormControl><FormMessage /></FormItem>
                                )}/>
                                <FormField control={form.control} name="phone" render={({ field }) => (
                                    <FormItem><FormLabel className="text-black">Phone (Optional)</FormLabel><FormControl><Input placeholder="+1 (555) 123-4567" {...field} className="bg-gray-100 border-gray-300 text-black" /></FormControl><FormMessage /></FormItem>
                                )}/>
                                <FormField control={form.control} name="guests" render={({ field }) => (
                                    <FormItem><FormLabel className="text-black">Number of Guests</FormLabel>
                                    <Select onValueChange={(val) => field.onChange(parseInt(val))} defaultValue={String(field.value)}>
                                    <FormControl><SelectTrigger className="bg-gray-100 border-gray-300 text-black"><SelectValue placeholder="Select number of guests" /></SelectTrigger></FormControl>
                                    <SelectContent>{[...Array(12)].map((_, i) => <SelectItem key={i+1} value={String(i+1)}>{i+1} Guest{i > 0 ? 's' : ''}</SelectItem>)}</SelectContent>
                                    </Select><FormMessage /></FormItem>
                                )}/>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <FormField control={form.control} name="date" render={({ field }) => (
                                    <FormItem className="flex flex-col"><FormLabel className="text-black mb-2">Date</FormLabel><Popover><PopoverTrigger asChild>
                                    <FormControl>
                                        <Button variant={"outline"} className={cn("w-full justify-start text-left font-normal bg-gray-100 border-gray-300 text-black hover:text-black",!field.value && "text-muted-foreground")}>
                                        <CalendarIcon className="mr-2 h-4 w-4" />{field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
                                        </Button>
                                    </FormControl>
                                    </PopoverTrigger><PopoverContent className="w-auto p-0" align="start"><Calendar mode="single" selected={field.value} onSelect={field.onChange} initialFocus /></PopoverContent></Popover><FormMessage /></FormItem>
                                )}/>
                                <FormField control={form.control} name="occasion" render={({ field }) => (
                                    <FormItem><FormLabel className="text-black">Occasion (Optional)</FormLabel>
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <FormControl><SelectTrigger className="bg-gray-100 border-gray-300 text-black"><SelectValue placeholder="Select an occasion" /></SelectTrigger></FormControl>
                                            <SelectContent><SelectItem value="Birthday">Birthday</SelectItem><SelectItem value="Anniversary">Anniversary</SelectItem><SelectItem value="Business">Business</SelectItem><SelectItem value="Date Night">Date Night</SelectItem><SelectItem value="Other">Other</SelectItem></SelectContent>
                                        </Select>
                                    </FormItem>
                                )}/>
                            </div>
                            
                            <FormField control={form.control} name="time" render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-black">Time Slot</FormLabel>
                                    <div className="relative">
                                        <div className="overflow-x-auto pb-4 -mb-4">
                                            <div className="flex space-x-2">
                                                {timeSlots.map(time => (
                                                    <Button key={time} type="button" variant={selectedTime === time ? 'default' : 'outline'} onClick={() => handleTimeSelect(time)} className={cn("rounded-full", selectedTime === time ? 'bg-[#b6cc37] text-black hover:bg-[#84a641]' : 'border-gray-300 text-black')}>
                                                        {time}
                                                    </Button>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                    <FormMessage className="pt-2" />
                                </FormItem>
                            )}/>
                            
                            <FormField control={form.control} name="requests" render={({ field }) => (
                                <FormItem><FormLabel className="text-black">Special Requests (Optional)</FormLabel><FormControl>
                                <Textarea placeholder="e.g. dietary restrictions, window seat preference" className="min-h-[120px] bg-gray-100 border-gray-300 text-black" {...field}/>
                                </FormControl><FormMessage /></FormItem>
                            )}/>
                            
                            <div className="text-center pt-4">
                                <Button type="submit" size="lg" className="px-10 py-7 text-lg rounded-full bg-[#b6cc37] text-black hover:bg-[#84a641] transition-all transform hover:scale-105 hover:shadow-[0_0_20px_#b6cc37]" disabled={isSubmitting}>
                                    {isSubmitting ? 'Confirming...' : 'Confirm Reservation'}
                                </Button>
                            </div>
                        </form>
                    </Form>
                </div>
            </div>
        </div>
      </section>
      
      {/* 3. Policies Section */}
      <section className="py-24 sm:py-32 bg-black text-white animated-section">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-6 slide-in-left">
              <h2 className="font-headline text-4xl sm:text-5xl text-[#808f2c]">Dining Policies</h2>
              <ul className="space-y-4 text-white/80 list-disc list-inside">
                <li>Reservations are held for 15 minutes. Please contact us if you are running late.</li>
                <li>For parties of 8 or more, we may require a credit card to hold the reservation.</li>
                <li>Our dress code is smart casual. We kindly request no sportswear or beachwear.</li>
                <li>Please inform us of any allergies or dietary restrictions when booking.</li>
                <li>A discretionary 12.5% service charge will be added to your bill.</li>
              </ul>
            </div>
            <div className="relative h-[500px] lg:h-[600px] rounded-lg overflow-hidden shadow-2xl slide-in-right">
              <Image
                src="/assets/59.jpg"
                alt="Elegant table setting with wine glasses"
                fill
                className="object-cover"
                data-ai-hint="elegant table setting"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 4. Final CTA Section */}
      <section className="relative h-[60vh] w-full flex items-center justify-center text-center text-white overflow-hidden final-cta">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://picsum.photos/seed/reserve-cta/1800/1200"
            alt="Dimly lit, atmospheric restaurant interior"
            fill
            className="object-cover cta-bg"
            data-ai-hint="dim restaurant elegant"
          />
          <div className="absolute inset-0 bg-black/60"></div>
        </div>
        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 animated-section">
          <h2 className="font-headline text-4xl sm:text-6xl text-white drop-shadow-xl fade-up">
            Questions About Your Visit?
          </h2>
          <p className="mt-4 text-lg max-w-2xl mx-auto text-white/90 drop-shadow-lg fade-up">
            Our team is happy to assist with any inquiries.
          </p>
          <div className="mt-8 fade-up">
            <Button size="lg" asChild className="text-lg px-10 py-7 rounded-full shadow-lg bg-[#b6cc37] hover:bg-[#84a641] text-black transition-all transform hover:scale-105 hover:shadow-[0_0_20px_#b6cc37]">
              <Link href="/contact">Contact Us</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
