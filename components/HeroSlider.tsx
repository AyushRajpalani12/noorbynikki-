"use client";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

const slidesData = [
  {
    img: "/homepage.png",
    title: "Elegance In Every Thread",
    subtitle: "Designer Royal Maroon Anarkali Suits",
    tag: "NEW ARRIVAL",
    focal: "center 30%", // tune per image: e.g. "center top", "center 25%", "center bottom"
  },
  {
    img: "/homepage1.png",
    title: "Graceful Floral Prints",
    subtitle: "Pure Cotton Comfort & Everyday Style",
    tag: "SUMMER SPECIAL",
    focal: "center 20%",
  },
  {
    img: "/homepage2.png",
    title: "Chic Ethnic Wear",
    subtitle: "Traditional Craftsmanship Meets Modern Design",
    tag: "BESTSELLER",
    focal: "center 20%",
  },
  {
    img: "/homepage3.png",
    title: "Festive Collection '26",
    subtitle: "Make Every Celebration Unforgettable",
    tag: "LIMITED EDITION",
    focal: "center 20%",
  },
  {
    img: "/homepage4.png",
    title: "Contemporary Styles",
    subtitle: "Trending Fits for the Modern Woman",
    tag: "FLAT 20% OFF",
    focal: "center 20%",
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

  // Touch swipe support for mobile
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
      className="relative w-full h-[88svh] min-h-[460px] max-h-[780px] sm:h-[85vh] md:h-[85vh] overflow-hidden bg-stone-900 select-none"
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
        >
          {/* Main Banner Image — full-bleed cover on every breakpoint, no letterbox bands */}
          <Image
            src={slide.img}
            alt={slide.title}
            fill
            priority={index === 0}
            sizes="100vw"
            style={{ objectPosition: slide.focal || "center" }}
            className="object-cover relative z-0"
          />

          {/* Overlay: bottom-heavy on mobile for text legibility, left-to-right on desktop */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-black/5 sm:bg-gradient-to-r sm:from-black/75 sm:via-black/35 sm:to-transparent z-10" />

          {/* Banner Text Content */}
          <div className="absolute inset-0 z-20 flex items-end sm:items-center pb-14 sm:pb-0">
            <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 w-full">
              <div className="max-w-md sm:max-w-lg md:max-w-xl text-white space-y-3 sm:space-y-4">
                <span className="inline-flex items-center gap-1.5 bg-white/10 backdrop-blur-sm border border-amber-300/40 text-amber-200 text-[10px] sm:text-xs font-semibold px-3 py-1 rounded-full tracking-[0.15em] uppercase">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-300" />
                  {slide.tag}
                </span>

                <h1 className="text-[28px] leading-[1.15] sm:text-4xl md:text-5xl lg:text-6xl font-serif font-semibold sm:font-bold tracking-tight sm:tracking-wide sm:leading-tight">
                  {slide.title}
                </h1>

                <p className="text-[13px] sm:text-base md:text-lg text-stone-200 font-light tracking-wide leading-relaxed max-w-[30ch] sm:max-w-none">
                  {slide.subtitle}
                </p>

                <div className="pt-2 sm:pt-4">
                  <Link
                    href="#"
                    className="inline-block w-full sm:w-auto text-center bg-white text-gray-900 font-medium px-6 sm:px-8 py-3 sm:py-3.5 rounded-none hover:bg-rose-600 hover:text-white active:bg-rose-700 transition-all duration-300 shadow-lg tracking-wider text-xs sm:text-sm uppercase"
                  >
                    Shop Collection
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Prev / Next arrows — hidden on mobile (swipe handles it), visible from tablet up */}
      <button
        onClick={goPrev}
        aria-label="Previous slide"
        className="hidden sm:flex items-center justify-center absolute left-3 md:left-6 top-1/2 -translate-y-1/2 z-30 w-10 h-10 md:w-11 md:h-11 rounded-full bg-white/10 hover:bg-white/25 backdrop-blur-sm border border-white/20 text-white transition-all duration-300"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>
      <button
        onClick={goNext}
        aria-label="Next slide"
        className="hidden sm:flex items-center justify-center absolute right-3 md:right-6 top-1/2 -translate-y-1/2 z-30 w-10 h-10 md:w-11 md:h-11 rounded-full bg-white/10 hover:bg-white/25 backdrop-blur-sm border border-white/20 text-white transition-all duration-300"
      >
        <ChevronRight className="w-5 h-5" />
      </button>

      {/* Modern Slide Indicators */}
      <div className="absolute bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 flex space-x-2 sm:space-x-3 z-30">
        {slidesData.map((_, index) => (
          <button
            key={index}
            onClick={() => goTo(index)}
            aria-label={`Go to slide ${index + 1}`}
            className={`h-1.5 rounded-full transition-all duration-500 ${
              index === currentIndex ? "bg-rose-500 w-6 sm:w-8" : "bg-white/50 w-2 sm:w-3 hover:bg-white"
            }`}
          />
        ))}
      </div>
    </div>
  );
}