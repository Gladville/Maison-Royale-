import Image from 'next/image';
import Link from 'next/link';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from '@/components/ui/button';

const dishes = [
  {
    name: "Truffle Lobster Risotto",
    image: "https://picsum.photos/600/400",
    hint: "lobster risotto",
  },
  {
    name: "Wagyu Steak with Gold Leaf",
    image: "https://picsum.photos/600/401",
    hint: "wagyu steak",
  },
  {
    name: "Caviar-topped Oysters",
    image: "https://picsum.photos/600/402",
    hint: "caviar oysters",
  },
  {
    name: "Seared Scallops",
    image: "https://picsum.photos/600/403",
    hint: "seared scallops",
  },
];

export default function SignatureDishes() {
  return (
    <section className="py-24 sm:py-32 bg-foreground/5">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="font-headline text-4xl sm:text-5xl text-primary">Our Signature Creations</h2>
          <p className="mt-4 text-lg text-foreground/70 max-w-2xl mx-auto">
            A glimpse into the artistry that defines our culinary philosophy.
          </p>
        </div>
        
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full"
        >
          <CarouselContent>
            {dishes.map((dish, index) => (
              <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3 group">
                <Card className="overflow-hidden border-border bg-background h-full flex flex-col shadow-lg">
                  <CardContent className="p-0 flex-grow flex flex-col">
                    <div className="relative h-64 w-full overflow-hidden">
                      <Image
                        src={dish.image}
                        alt={dish.name}
                        fill
                        className="object-cover transition-transform duration-500 ease-in-out group-hover:scale-110"
                        data-ai-hint={dish.hint}
                      />
                    </div>
                    <div className="p-6 flex-grow">
                      <h3 className="font-headline text-2xl text-primary">{dish.name}</h3>
                    </div>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="ml-12 hidden sm:flex" />
          <CarouselNext className="mr-12 hidden sm:flex" />
        </Carousel>

        <div className="text-center mt-16">
          <Button size="lg" variant="secondary" asChild>
            <Link href="/menu">Explore Full Menu &rarr;</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
