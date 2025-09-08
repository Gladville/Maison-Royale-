import { Facebook, Instagram, Twitter } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-foreground text-background border-t">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="space-y-4">
            <h3 className="font-headline text-2xl text-secondary">Maison Royale</h3>
            <p className="text-background/80">123 Luxury Lane, London, W1 1AA</p>
            <p className="text-background/80">contact@maisonroyale.com</p>
            <p className="text-background/80">+44 20 7123 4567</p>
          </div>
          <div>
            <h4 className="font-semibold tracking-wider uppercase text-secondary mb-4">Opening Hours</h4>
            <div className="text-background/80 space-y-2">
              <p>Dinner: Mon-Sat, 6:00 PM - 11:00 PM</p>
              <p>Sunday: Closed</p>
            </div>
          </div>
          <div>
            <h4 className="font-semibold tracking-wider uppercase text-secondary mb-4">Follow Us</h4>
            <div className="flex space-x-4">
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
