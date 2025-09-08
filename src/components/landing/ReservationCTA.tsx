import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function ReservationCTA() {
  return (
    <section className="py-24 sm:py-32 bg-gradient-to-r from-background via-accent to-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="font-headline text-4xl sm:text-5xl lg:text-6xl text-foreground max-w-4xl mx-auto">
          Start Your Healthy Journey Today
        </h2>
        <p className="mt-6 text-lg text-foreground/80 max-w-2xl mx-auto">
          Join thousands of happy customers enjoying fresh, healthy food delivered to their door.
        </p>
        <div className="mt-10">
          <Button size="lg" asChild className="text-lg px-10 py-7 rounded-full shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-shadow duration-300 transform hover:scale-105">
            <Link href="/reservations">Shop Now</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
