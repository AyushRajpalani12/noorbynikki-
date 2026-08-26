"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

const slidesData = [
  {
    img: "/homepage.png",
    title: "Elegance In Every Thread",
    subtitle: "Designer Royal Maroon Anarkali Suits",
    tag: "NEW ARRIVAL",
  },
  {
    img: "/homepage1.png",
    title: "Graceful Floral Prints",
    subtitle: "Pure Cotton Comfort & Everyday Style",
    tag: "SUMMER SPECIAL",
  },
  {
    img: "/homepage2.png",
    title: "Chic Ethnic Wear",
    subtitle: "Traditional Craftsmanship Meets Modern Design",
    tag: "BESTSELLER",
  },
  {
    img: "/homepage3.png",
    title: "Festive Collection '26",
    subtitle: "Make Every Celebration Unforgettable",
    tag: "LIMITED EDITION",
  },
  {
    img: "/homepage4.png",
    title: "Contemporary Styles",
    subtitle: "Trending Fits for the Modern Woman",
    tag: "FLAT 20% OFF",
  },
];

export default function HeroSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % slidesData.length);
    }, 4500);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative w-full h-[70vh] md:h-[85vh] overflow-hidden bg-stone-900">
      {slidesData.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            index === currentIndex ? "opacity-100 z-10" : "opacity-0 z-0"
          }`}
        >
          {/* Background Blurred Image (Empty space fill karne ke liye) */}
          <div className="absolute inset-0 overflow-hidden">
            <Image
              src={slide.img}
              alt="background blur"
              fill
              className="object-cover blur-2xl opacity-40 scale-110"
            />
          </div>

          {/* Main Focused Banner Image */}
          <Image
            src={slide.img}
            alt={slide.title}
            fill
            priority={index === 0}
            className="object-contain md:object-cover object-center relative z-0"
          />

          {/* Dark Overlay gradient for typography */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent z-10" />

          {/* Banner Text Content */}
          <div className="absolute inset-0 z-20 flex items-center">
            <div className="max-w-7xl mx-auto px-6 sm:px-12 w-full">
              <div className="max-w-xl text-white space-y-4 animate-fade-in">
                <span className="inline-block bg-rose-600 text-white text-xs font-semibold px-3 py-1 rounded-full tracking-widest uppercase">
                  {slide.tag}
                </span>
                
                <h1 className="text-3xl sm:text-5xl md:text-6xl font-serif font-bold tracking-wide leading-tight">
                  {slide.title}
                </h1>
                
                <p className="text-sm sm:text-lg text-stone-200 font-light tracking-wide">
                  {slide.subtitle}
                </p>

                <div className="pt-4">
                  <Link
                    href="#"
                    className="inline-block bg-white text-gray-900 font-medium px-8 py-3.5 rounded-none hover:bg-rose-600 hover:text-white transition-all duration-300 shadow-lg tracking-wider text-sm uppercase"
                  >
                    Shop Collection
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Modern Slide Indicators */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex space-x-3 z-30">
        {slidesData.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            aria-label={`Go to slide ${index + 1}`}
            className={`h-1.5 rounded-full transition-all duration-500 ${
              index === currentIndex ? "bg-rose-600 w-8" : "bg-white/50 w-3 hover:bg-white"
            }`}
          />
        ))}
      </div>
    </div>
  );
}