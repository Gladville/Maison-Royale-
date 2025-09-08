"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ChevronDown, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { cn } from '@/lib/utils';

const navLinks = [
  { name: 'Home', href: '/' },
  { name: 'About Us', href: '/about' },
  { 
    name: 'Menu', 
    dropdown: [
      { name: 'À La Carte', href: '/menu/a-la-carte' },
      { name: 'Tasting Menu', href: '/menu/tasting' },
      { name: 'Wine & Drinks', href: '/menu/drinks' },
      { name: 'Desserts', href: '/menu/desserts' },
    ]
  },
  { name: 'Gallery', href: '/gallery' },
  { name: 'Events & Private Dining', href: '/events' },
  { name: 'Contact', href: '/contact' },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const NavLink = ({ children, href }: { children: React.ReactNode, href: string }) => (
    <Link href={href} className="text-sm font-medium relative transition-colors text-white hover:text-primary after:absolute after:bottom-[-2px] after:left-0 after:h-[1px] after:w-full after:scale-x-0 after:bg-primary after:transition-transform after:duration-300 hover:after:scale-x-100">
        {children}
    </Link>
  );

  const MobileNavLink = ({ children, href, onClick }: { children: React.ReactNode, href: string, onClick: () => void }) => (
    <Link href={href} onClick={onClick} className="block py-3 text-lg text-white">
        {children}
    </Link>
  );

  return (
    <header className={cn(
      "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
      scrolled ? "bg-secondary shadow-lg" : "bg-transparent"
    )}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          <Link href="/" className="font-headline text-2xl tracking-wider text-primary">
            Maison Royale
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navLinks.map((link) => 
              link.dropdown ? (
                <DropdownMenu key={link.name}>
                  <DropdownMenuTrigger className="flex items-center text-sm font-medium transition-colors text-white hover:text-primary focus:outline-none">
                    {link.name} <ChevronDown className="ml-1 h-4 w-4" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="bg-secondary border-primary/50">
                    {link.dropdown.map((item) => (
                      <DropdownMenuItem key={item.name} asChild>
                        <Link href={item.href} className="text-white hover:!bg-black/20 hover:!text-primary">{item.name}</Link>
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <NavLink key={link.name} href={link.href}>{link.name}</NavLink>
              )
            )}
            <Button asChild className="rounded-full">
              <Link href="/reservations">Reservations</Link>
            </Button>
          </nav>
          
          {/* Mobile Navigation */}
          <div className="lg:hidden">
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="text-white hover:bg-white/10">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Open menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[80vw] bg-secondary border-l-primary/50 p-6">
                <div className="flex justify-between items-center mb-8">
                    <Link href="/" onClick={() => setMobileMenuOpen(false)} className="font-headline text-2xl text-primary">
                        Maison Royale
                    </Link>
                    <SheetTrigger asChild>
                        <Button variant="ghost" size="icon" className="text-white hover:bg-white/10">
                            <X className="h-6 w-6" />
                            <span className="sr-only">Close menu</span>
                        </Button>
                    </SheetTrigger>
                </div>
                <div className="flex flex-col h-full">
                  <nav className="flex-grow">
                    {navLinks.map((link) => 
                      link.dropdown ? (
                        <Accordion type="single" collapsible key={link.name} className="w-full">
                          <AccordionItem value={link.name} className="border-b-white/20">
                            <AccordionTrigger className="py-3 text-lg font-medium text-white hover:no-underline">{link.name}</AccordionTrigger>
                            <AccordionContent className="pl-4">
                              {link.dropdown.map((item) => (
                                <MobileNavLink key={item.name} href={item.href} onClick={() => setMobileMenuOpen(false)}>{item.name}</MobileNavLink>
                              ))}
                            </AccordionContent>
                          </AccordionItem>
                        </Accordion>
                      ) : (
                        <MobileNavLink key={link.name} href={link.href} onClick={() => setMobileMenuOpen(false)}>{link.name}</MobileNavLink>
                      )
                    )}
                  </nav>
                  <Button asChild className="mt-8 w-full rounded-full" size="lg">
                    <Link href="/reservations" onClick={() => setMobileMenuOpen(false)}>Reservations</Link>
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
