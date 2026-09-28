"use client";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight, Loader2 } from "lucide-react";
import API from "@/lib/api";

// Fallback slides agar backend me abhi tak hero banner na ho
const defaultSlides = [
  {
    _id: "default-1",
    img: "/myhomepage.png",
    title: "Elegance In Every Thread",
    subtitle: "Designer Royal Maroon Anarkali Suits",
    tag: "NEW ARRIVAL",
    link: "/collection",
  },
  {
    _id: "default-2",
    img: "/homepage111.png",
    title: "Graceful Floral Prints",
    subtitle: "Pure Cotton Comfort & Everyday Style",
    tag: "SUMMER SPECIAL",
    link: "/collection",
  },
];

interface BannerSlide {
  _id: string;
  img: string;
  title: string;
  subtitle: string;
  tag: string;
  link: string;
}

export default function HeroSlider() {
  const [slides, setSlides] = useState<BannerSlide[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);

  const touchStartX = useRef<number | null>(null);
  const touchDeltaX = useRef(0);

  // 1. Fetch Banners by position='hero'
  useEffect(() => {
    const fetchHeroBanners = async () => {
      try {
        const response = await API.get("/banners", {
          params: { position: "hero" },
        });

        const rawData = response.data?.data || response.data || [];

        if (Array.isArray(rawData) && rawData.length > 0) {
          const mappedSlides: BannerSlide[] = rawData.map((item: any) => ({
            _id: item._id,
            // Backend schema ke hisab se image ya imageUrl uthayega
            img: item.imageUrl || item.image || item.bannerImage || "/myhomepage.png",
            title: item.title || "Elegance In Every Thread",
            subtitle: item.subtitle || item.description || "Exclusive Designer Kurtis",
            tag: item.tag || item.badge || "FEATURED",
            link: item.link || item.ctaLink || "/collection",
          }));
          setSlides(mappedSlides);
        } else {
          setSlides(defaultSlides);
        }
      } catch (error) {
        console.error("Hero banner fetch failed, using fallback:", error);
        setSlides(defaultSlides);
      } finally {
        setLoading(false);
      }
    };

    fetchHeroBanners();
  }, []);

  const total = slides.length;

  const goTo = (index: number) => {
    if (total === 0) return;
    setCurrentIndex(((index % total) + total) % total);
  };

  const goNext = () => goTo(currentIndex + 1);
  const goPrev = () => goTo(currentIndex - 1);

  // 2. Auto-advance timer
  useEffect(() => {
    if (total <= 1) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % total);
    }, 5000);
    return () => clearInterval(timer);
  }, [total]);

  // Touch handlers
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

  if (loading) {
    return (
      <div className="w-full h-[500px] sm:h-[600px] md:h-[700px] bg-stone-900 flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-rose-500" />
      </div>
    );
  }

  return (
    <div
      className="relative w-full h-[500px] sm:h-[600px] md:h-[700px] overflow-hidden bg-black select-none"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {slides.map((slide, index) => (
        <div
          key={slide._id || index}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            index === currentIndex ? "opacity-100 z-10" : "opacity-0 z-0"
          }`}
        >
          {/* Hero Banner Image */}
          <Image
            src={slide.img}
            alt={slide.title}
            fill
            priority={index === 0}
            sizes="100vw"
            className="object-cover w-full h-full object-center"
          />

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent sm:bg-gradient-to-r sm:from-black/75 sm:via-black/30 sm:to-transparent z-10" />

          {/* Content Box */}
          <div className="absolute inset-0 z-20 flex items-end sm:items-center pb-16 sm:pb-0">
            <div className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-16 w-full">
              <div className="max-w-lg md:max-w-xl text-white space-y-4">
                {slide.tag && (
                  <span className="inline-flex items-center gap-1.5 bg-white/15 backdrop-blur-md border border-amber-300/40 text-amber-200 text-xs font-semibold px-3.5 py-1 rounded-full tracking-[0.15em] uppercase">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-300 shrink-0" />
                    {slide.tag}
                  </span>
                )}

                <h1 className="text-3xl sm:text-5xl md:text-6xl font-serif font-bold tracking-wide leading-tight">
                  {slide.title}
                </h1>

                <p className="text-sm sm:text-lg text-stone-200 font-light tracking-wide leading-relaxed">
                  {slide.subtitle}
                </p>

                <div className="pt-3">
                  <Link
                    href={slide.link}
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
      {total > 1 && (
        <>
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
        </>
      )}

      {/* Dots Indicator */}
      {total > 1 && (
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex space-x-3 z-30">
          {slides.map((_, index) => (
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
      )}
    </div>
  );
}