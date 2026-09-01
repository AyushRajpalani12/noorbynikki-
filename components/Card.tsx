'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function FestivalSale() {
  const festiveItems = [
    {
      id: 'eid',
      image: '/eid.png',
      link: '/collection/eid',
    },
    {
      id: 'navratri',
      image: '/navratri.png',
      link: '/collection/navratri',
    },
    {
      id: 'rakhi',
      image: '/rakhi.png',
      link: '/collection/rakhi',
    },
    {
      id: 'diwali',
      image: '/diwali.png',
      link: '/collection/diwali',
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % festiveItems.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [festiveItems.length]);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? festiveItems.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % festiveItems.length);
  };

  return (
    <section className="relative w-full bg-[#FAF7F2] overflow-hidden py-4 md:py-8 border-y border-stone-200">
      
      {/* Aspect Ratio Container so Full Image fits perfectly */}
      <div className="max-w-[1400px] mx-auto px-2 sm:px-4">
        <div className="relative w-full aspect-[16/7] min-h-[300px] max-h-[600px] rounded-2xl overflow-hidden bg-stone-100 shadow-md">
          
          {festiveItems.map((item, index) => (
            <div
              key={item.id}
              className={`absolute inset-0 w-full h-full transition-opacity duration-700 ease-in-out ${
                index === currentIndex ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
              }`}
            >
              {/* Image without cropping */}
              <Image
                src={item.image}
                alt={`Festive Banner ${index + 1}`}
                fill
                priority={index === 0}
                className="object-contain object-center w-full h-full"
              />

              {/* Positioned Button at Bottom Center (Not hiding text) */}
              <div className="absolute bottom-6 md:bottom-12 left-1/2 -translate-x-1/2 z-20">
                <Link
                  href={item.link}
                  className="inline-flex items-center justify-center px-6 py-2.5 sm:px-8 sm:py-3.5 bg-[#6B1D1D] hover:bg-[#521414] text-white font-medium text-xs sm:text-sm tracking-widest uppercase rounded-full shadow-xl border border-amber-400/30 transition-all duration-300 transform hover:scale-105 active:scale-95"
                >
                  EXPLORE COLLECTION
                </Link>
              </div>
            </div>
          ))}

          {/* Navigation Arrows */}
          <button
            onClick={handlePrev}
            className="absolute left-3 top-1/2 -translate-y-1/2 z-30 w-8 h-8 sm:w-11 sm:h-11 bg-white/90 hover:bg-white text-gray-800 rounded-full flex items-center justify-center shadow-lg transition-all hover:scale-105"
            aria-label="Previous Slide"
          >
            <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>

          <button
            onClick={handleNext}
            className="absolute right-3 top-1/2 -translate-y-1/2 z-30 w-8 h-8 sm:w-11 sm:h-11 bg-white/90 hover:bg-white text-gray-800 rounded-full flex items-center justify-center shadow-lg transition-all hover:scale-105"
            aria-label="Next Slide"
          >
            <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>

          {/* Bottom Dots Indicator */}
          <div className="absolute bottom-2 md:bottom-4 left-1/2 -translate-x-1/2 z-30 flex items-center gap-2">
            {festiveItems.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  currentIndex === index
                    ? 'w-6 bg-[#6B1D1D]'
                    : 'w-2 bg-stone-300 hover:bg-stone-400'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>

        </div>
      </div>

    </section>
  );
}