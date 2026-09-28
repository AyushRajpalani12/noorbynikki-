'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronLeft, ChevronRight, Loader2 } from 'lucide-react';
import API from '@/lib/api';

// Fallback agar backend me festival banner na ho
const defaultFestiveItems = [
  {
    id: 'eid',
    image: '/eid.png',
    buttonText: 'EXPLORE COLLECTION',
    link: '/collection',
  },
  {
    id: 'navratri',
    image: '/navratri.png',
    buttonText: 'EXPLORE COLLECTION',
    link: '/collection',
  },
  {
    id: 'rakhi',
    image: '/rakhi.png',
    buttonText: 'EXPLORE COLLECTION',
    link: '/collection',
  },
  {
    id: 'diwali',
    image: '/diwali.png',
    buttonText: 'EXPLORE COLLECTION',
    link: '/collection',
  },
];

interface FestiveSlide {
  id: string;
  image: string;
  buttonText: string;
  link: string;
}

export default function FestivalSale() {
  const [festiveItems, setFestiveItems] = useState<FestiveSlide[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);

  // 1. Backend se 'festival' position wale banners fetch karna
  useEffect(() => {
    const fetchFestivalBanners = async () => {
      try {
        const response = await API.get('/banners', {
          params: { position: 'festival' },
        });

        const rawData = response.data?.data || response.data || [];

        if (Array.isArray(rawData) && rawData.length > 0) {
          const mappedBanners: FestiveSlide[] = rawData.map((item: any) => ({
            id: item._id,
            image: item.imageUrl || item.image || '/eid.png',
            buttonText: item.buttonText || 'EXPLORE COLLECTION',
            link: item.link || '/collection',
          }));
          setFestiveItems(mappedBanners);
        } else {
          setFestiveItems(defaultFestiveItems);
        }
      } catch (error) {
        console.error('Failed to fetch festival banners, using default:', error);
        setFestiveItems(defaultFestiveItems);
      } finally {
        setLoading(false);
      }
    };

    fetchFestivalBanners();
  }, []);

  const total = festiveItems.length;

  // 2. Auto-slide timer
  useEffect(() => {
    if (total <= 1) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % total);
    }, 5000);
    return () => clearInterval(timer);
  }, [total]);

  const handlePrev = () => {
    if (total === 0) return;
    setCurrentIndex((prev) => (prev === 0 ? total - 1 : prev - 1));
  };

  const handleNext = () => {
    if (total === 0) return;
    setCurrentIndex((prev) => (prev + 1) % total);
  };

  if (loading) {
    return (
      <div className="w-full bg-[#FAF7F2] py-16 flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-[#6B1D1D]" />
      </div>
    );
  }

  if (total === 0) return null;

  return (
    <section className="relative w-full bg-[#FAF7F2] overflow-hidden py-4 md:py-8 border-y border-stone-200">
      <div className="max-w-[1400px] mx-auto px-2 sm:px-4">
        <div className="relative w-full aspect-[16/8] sm:aspect-[16/7] min-h-[320px] max-h-[600px] rounded-2xl overflow-hidden bg-stone-100 shadow-md">
          {festiveItems.map((item, index) => (
            <div
              key={item.id}
              className={`absolute inset-0 w-full h-full transition-opacity duration-700 ease-in-out ${
                index === currentIndex ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
              }`}
            >
              <Image
                src={item.image && item.image.trim() !== '' ? item.image : '/eid.png'}
                alt={`Festive Banner ${index + 1}`}
                fill
                priority={index === 0}
                unoptimized={item.image?.startsWith('http')}
                className="object-contain object-center w-full h-full"
              />

              <div className="absolute bottom-10 sm:bottom-12 left-1/2 -translate-x-1/2 z-20">
                <Link
                  href={item.link}
                  className="inline-flex items-center justify-center px-5 py-2 sm:px-8 sm:py-3.5 bg-[#6B1D1D] hover:bg-[#521414] text-white font-medium text-[11px] sm:text-sm tracking-widest uppercase rounded-full shadow-xl border border-amber-400/30 transition-all duration-300 transform hover:scale-105 active:scale-95 whitespace-nowrap"
                >
                  {item.buttonText}
                </Link>
              </div>
            </div>
          ))}

          {/* Navigation Arrows */}
          {total > 1 && (
            <>
              <button
                onClick={handlePrev}
                className="absolute left-3 top-1/2 -translate-y-1/2 z-30 w-8 h-8 sm:w-11 sm:h-11 bg-white/90 hover:bg-white text-gray-800 rounded-full flex items-center justify-center shadow-lg transition-all hover:scale-105 cursor-pointer"
                aria-label="Previous Slide"
              >
                <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>

              <button
                onClick={handleNext}
                className="absolute right-3 top-1/2 -translate-y-1/2 z-30 w-8 h-8 sm:w-11 sm:h-11 bg-white/90 hover:bg-white text-gray-800 rounded-full flex items-center justify-center shadow-lg transition-all hover:scale-105 cursor-pointer"
                aria-label="Next Slide"
              >
                <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>
            </>
          )}

          {/* Bottom Dots */}
          {total > 1 && (
            <div className="absolute bottom-3 sm:bottom-4 left-1/2 -translate-x-1/2 z-30 flex items-center gap-2">
              {festiveItems.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`h-1.5 sm:h-2 rounded-full transition-all duration-300 cursor-pointer ${
                    currentIndex === index
                      ? 'w-5 sm:w-6 bg-[#6B1D1D]'
                      : 'w-1.5 sm:w-2 bg-stone-300 hover:bg-stone-400'
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}