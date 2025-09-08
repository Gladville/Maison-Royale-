import { Facebook, Instagram, Twitter } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-foreground text-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-8">
          <h2 className="font-headline text-4xl text-white">Food shopping made joyful.</h2>
          <p className="text-background/80 mt-2">We make grocery shopping easy, affordable, and reliable. From farm-fresh produce to your favorite daily essentials.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12 text-center md:text-left">
          <div className="space-y-4">
            <h3 className="font-headline text-2xl text-primary">Maison Royale</h3>
            <p className="text-background/80">123 Green Lane, London, W1 1AA</p>
          </div>
          <div>
            <h4 className="font-semibold tracking-wider uppercase text-primary mb-4">Quick Links</h4>
            <div className="text-background/80 space-y-2 flex flex-col">
              <Link href="/about" className="hover:text-primary transition-colors">About Us</Link>
              <Link href="/menu" className="hover:text-primary transition-colors">Shop</Link>
              <Link href="/contact" className="hover:text-primary transition-colors">Contact</Link>
            </div>
          </div>
          <div>
            <h4 className="font-semibold tracking-wider uppercase text-primary mb-4">Follow Us</h4>
            <div className="flex space-x-4 justify-center md:justify-start">
              <Link href="#" className="text-background/80 hover:text-primary transition-colors">
                <Facebook size={24} />
              </Link>
              <Link href="#" className="text-background/80 hover:text-primary transition-colors">
                <Instagram size={24} />
              </Link>
              <Link href="#" className="text-background/80 hover:text-primary transition-colors">
                <Twitter size={24} />
              </Link>
            </div>
          </div>
        </div>
        <div className="mt-12 border-t border-background/20 pt-8 text-center text-background/60 text-sm">
          <p>&copy; {new Date().getFullYear()} Maison Royale. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
