// src/app/gallery/page.tsx (Next.js App Router)
"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const sections = [
  {
    id: "a-la-carte",
    title: "À La Carte",
    intro: "Delight in our selection of exquisite dishes, drinks, and desserts.",
    bg: "#fdfaec",
    carousels: 2,
  },
  {
    id: "tasting-menu",
    title: "Tasting Menu",
    intro: "Experience our carefully curated tasting menu.",
    bg: "#000000",
    carousels: 1,
  },
  {
    id: "wine-drinks",
    title: "Wine & Drinks",
    intro: "Savor our premium wines and handcrafted drinks.",
    bg: "#fdfaec",
    carousels: 1,
  },
  {
    id: "desserts",
    title: "Desserts",
    intro: "Indulge in decadent desserts to finish your meal.",
    bg: "#000000",
    carousels: 2,
  },
];

const images = [
  "/images/sample1.jpg",
  "/images/sample2.jpg",
  "/images/sample3.jpg",
  "/images/sample4.jpg",
  "/images/sample5.jpg",
  "/images/sample6.jpg",
];

export default function GalleryPage() {
  const carouselsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    carouselsRef.current.forEach((carousel, idx) => {
      const direction = idx % 2 === 0 ? 1 : -1;
      gsap.to(carousel, {
        xPercent: direction * -100,
        repeat: -1,
        ease: "linear",
        duration: 30,
        modifiers: {
          x: (x) => `${parseFloat(x) % 100}%`,
        },
      });
    });

    gsap.utils.toArray(".fade-in").forEach((elem: any) => {
      gsap.from(elem, {
        opacity: 0,
        y: 50,
        duration: 1,
        scrollTrigger: {
          trigger: elem,
          start: "top 80%",
        },
      });
    });
  }, []);

  return (
    <main className="w-full">
      {/* Hero Section */}
      <section
        className="w-full flex flex-col items-center justify-center text-center py-32"
        style={{ backgroundColor: "#fdfaec" }}
      >
        <h1 className="text-5xl font-bold mb-4" style={{ color: "#808f2c" }}>
          The Gallery of Maison Royale
        </h1>
        <p className="text-xl text-black fade-in">
          Discover our exquisite culinary creations and drinks.
        </p>
      </section>

      {/* Content Sections */}
      {sections.map((section, sIdx) => (
        <section
          key={section.id}
          id={section.id}
          className="w-full py-20 flex flex-col items-center"
          style={{ backgroundColor: section.bg }}
        >
          <h2
            className="text-4xl font-bold mb-4 fade-in"
            style={{ color: section.bg === "#000000" ? "#ffffff" : "#808f2c" }}
          >
            {section.title}
          </h2>
          <p
            className={`mb-10 fade-in text-center ${
              section.bg === "#000000" ? "text-white" : "text-black"
            }`}
          >
            {section.intro}
          </p>

          {[...Array(section.carousels)].map((_, cIdx) => (
            <div
              key={cIdx}
              className="w-full overflow-hidden mb-10"
              ref={(el) => {
                if (el) carouselsRef.current.push(el);
              }}
            >
              <div className="flex gap-4">
                {images.map((img, i) => (
                  <img
                    key={i}
                    src={img}
                    alt="gallery"
                    className="w-64 h-40 object-cover rounded-lg flex-shrink-0"
                  />
                ))}
              </div>
            </div>
          ))}
        </section>
      ))}

      {/* CTA Section */}
      <section
        className="w-full flex flex-col items-center justify-center py-32"
        style={{ backgroundColor: "#808f2c" }}
      >
        <h2 className="text-4xl font-bold mb-6 text-white fade-in">
          Reserve Your Table Today
        </h2>
        <button
          className="px-8 py-4 font-bold rounded-lg text-black transition-all"
          style={{ backgroundColor: "#b6cc37" }}
          onMouseEnter={(e) => ((e.target as HTMLButtonElement).style.boxShadow = "0 0 20px #84a641")}
          onMouseLeave={(e) => ((e.target as HTMLButtonElement).style.boxShadow = "none")}
        >
          Reserve a Table
        </button>
      </section>
    </main>
  );
}
