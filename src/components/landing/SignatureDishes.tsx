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
    name: "Fresh Green Zucchini",
    image: "https://picsum.photos/600/400",
    hint: "grilled zucchini",
    price: "In Stock"
  },
  {
    name: "Zucchini Slices in a bowl",
    image: "https://picsum.photos/600/401",
    hint: "zucchini bowl",
    price: "In Stock"
  },
  {
    name: "Sunomono Cucumber Salad",
    image: "https://picsum.photos/600/402",
    hint: "cucumber salad",
    price: "In Stock"
  },
  {
    name: "Avocado Smoothie",
    image: "https://picsum.photos/600/403",
    hint: "avocado smoothie",
    price: "In Stock"
  },
];

export default function SignatureDishes() {
  return (
    <section className="py-24 sm:py-32 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-left mb-16">
          <h2 className="font-headline text-4xl sm:text-5xl text-foreground">Shop smart with Forma Health—fuel your hair from the inside out</h2>
          <p className="mt-4 text-lg text-foreground/70 max-w-2xl">
            Enjoy healthier life with nutrient-rich plant based foods.
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
                <div className="p-4">
                  <Card className="overflow-hidden border-2 bg-background h-full flex flex-col shadow-lg rounded-3xl">
                    <CardContent className="p-4 flex-grow flex flex-col">
                      <div className="relative h-64 w-full overflow-hidden rounded-2xl">
                        <Image
                          src={dish.image}
                          alt={dish.name}
                          fill
                          className="object-cover transition-transform duration-500 ease-in-out group-hover:scale-110"
                          data-ai-hint={dish.hint}
                        />
                         <div className="absolute top-2 left-2 bg-white/80 text-foreground text-xs px-2 py-1 rounded-full">{dish.price}</div>
                      </div>
                      <div className="p-4 flex-grow flex flex-col justify-between">
                        <h3 className="font-headline text-2xl text-foreground mb-4">{dish.name}</h3>
                        <Button className="w-full rounded-full border-2 border-foreground hover:bg-primary hover:border-primary">Add to Cart</Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="ml-12 hidden sm:flex" />
          <CarouselNext className="mr-12 hidden sm:flex" />
        </Carousel>
      </div>
    </section>
  );
}
