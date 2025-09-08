import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function ReservationCTA() {
  return (
    <section className="py-24 sm:py-32 bg-gradient-to-r from-background via-foreground/5 to-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="font-headline text-4xl sm:text-5xl lg:text-6xl text-primary max-w-4xl mx-auto">
          Reserve Your Experience at Maison Royale
        </h2>
        <p className="mt-6 text-lg text-foreground/80 max-w-2xl mx-auto">
          Join us for an evening of unparalleled culinary artistry and unforgettable moments.
        </p>
        <div className="mt-10">
          <Button size="lg" variant="secondary" asChild className="text-lg px-10 py-7 rounded-md shadow-lg shadow-secondary/20 hover:shadow-secondary/40 transition-shadow duration-300 transform hover:scale-105">
            <Link href="/reservations">Book Now</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
