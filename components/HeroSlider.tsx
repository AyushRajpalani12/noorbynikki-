"use client";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

const slidesData = [
  {
    img: "/myhomepage.png",
    title: "Elegance In Every Thread",
    subtitle: "Designer Royal Maroon Anarkali Suits",
    tag: "NEW ARRIVAL",
    focalDesktop: "center 15%",
    focalMobile: "center 40%",
  },
  {
    img: "/homepage111.png",
    title: "Graceful Floral Prints",
    subtitle: "Pure Cotton Comfort & Everyday Style",
    tag: "SUMMER SPECIAL",
    focalDesktop: "center 15%",
    focalMobile: "center 40%",
  },
  {
    img: "/homepage21111.png",
    title: "Chic Ethnic Wear",
    subtitle: "Traditional Craftsmanship Meets Modern Design",
    tag: "BESTSELLER",
    focalDesktop: "center 15%",
    focalMobile: "center 40%",
  },
  {
    img: "/homepage411111111.png",
    title: "Festive Collection '26",
    subtitle: "Make Every Celebration Unforgettable",
    tag: "LIMITED EDITION",
    focalDesktop: "center 15%",
    focalMobile: "center 40%",
  },
  {
    img: "/homepage411.png",
    title: "Contemporary Styles",
    subtitle: "Trending Fits for the Modern Woman",
    tag: "FLAT 20% OFF",
    focalDesktop: "center 15%",
    focalMobile: "center 40%",
  },
];

export default function HeroSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const touchStartX = useRef<number | null>(null);
  const touchDeltaX = useRef(0);

  const goTo = (index: number) => {
    const total = slidesData.length;
    setCurrentIndex(((index % total) + total) % total);
  };
  const goNext = () => goTo(currentIndex + 1);
  const goPrev = () => goTo(currentIndex - 1);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % slidesData.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchDeltaX.current = 0;
  };
  const handleTouchMove = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    touchDeltaX.current = e.touches[0].clientX - touchStartX.current;
  };
  const handleTouchEnd = () => {
    if (Math.abs(touchDeltaX.current) > 50) {
      if (touchDeltaX.current < 0) goNext();
      else goPrev();
    }
    touchStartX.current = null;
    touchDeltaX.current = 0;
  };

  return (
    <div
      className="relative w-full h-[500px] sm:h-[600px] md:h-[700px] overflow-hidden bg-black select-none"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {slidesData.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            index === currentIndex ? "opacity-100 z-10" : "opacity-0 z-0"
          }`}
          style={
            {
              "--focal-mobile": slide.focalMobile,
              "--focal-desktop": slide.focalDesktop,
            } as React.CSSProperties
          }
        >
          {/* Full Screen Cover Image without side bars */}
          <Image
            src={slide.img}
            alt={slide.title}
            fill
            priority={index === 0}
            sizes="100vw"
            className="object-cover w-full h-full [object-position:var(--focal-mobile)] sm:[object-position:var(--focal-desktop)]"
          />

          {/* Gradient Overlay for Text Readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent sm:bg-gradient-to-r sm:from-black/75 sm:via-black/30 sm:to-transparent z-10" />

          <div className="absolute inset-0 z-20 flex items-end sm:items-center pb-16 sm:pb-0">
            <div className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-16 w-full">
              <div className="max-w-lg md:max-w-xl text-white space-y-4">
                <span className="inline-flex items-center gap-1.5 bg-white/15 backdrop-blur-md border border-amber-300/40 text-amber-200 text-xs font-semibold px-3.5 py-1 rounded-full tracking-[0.15em] uppercase">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-300 shrink-0" />
                  {slide.tag}
                </span>

                <h1 className="text-3xl sm:text-5xl md:text-6xl font-serif font-bold tracking-wide leading-tight">
                  {slide.title}
                </h1>

                <p className="text-sm sm:text-lg text-stone-200 font-light tracking-wide leading-relaxed">
                  {slide.subtitle}
                </p>

                <div className="pt-3">
                  <Link
                    href="/collection"
                    className="inline-block text-center bg-white text-gray-900 font-medium px-8 py-3.5 rounded-none hover:bg-rose-600 hover:text-white transition-all duration-300 shadow-lg tracking-wider text-xs sm:text-sm uppercase"
                  >
                    Shop Collection
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Navigation Arrows */}
      <button
        onClick={goPrev}
        aria-label="Previous slide"
        className="hidden sm:flex items-center justify-center absolute left-6 top-1/2 -translate-y-1/2 z-30 w-11 h-11 rounded-full bg-black/40 hover:bg-black/70 backdrop-blur-md border border-white/20 text-white transition-all duration-300 cursor-pointer"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      <button
        onClick={goNext}
        aria-label="Next slide"
        className="hidden sm:flex items-center justify-center absolute right-6 top-1/2 -translate-y-1/2 z-30 w-11 h-11 rounded-full bg-black/40 hover:bg-black/70 backdrop-blur-md border border-white/20 text-white transition-all duration-300 cursor-pointer"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Dots Indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex space-x-3 z-30">
        {slidesData.map((_, index) => (
          <button
            key={index}
            onClick={() => goTo(index)}
            aria-label={`Go to slide ${index + 1}`}
            className={`h-1.5 rounded-full transition-all duration-500 cursor-pointer ${
              index === currentIndex ? "bg-rose-500 w-8" : "bg-white/50 w-3 hover:bg-white"
            }`}
          />
        ))}
      </div>
    </div>
  );
}