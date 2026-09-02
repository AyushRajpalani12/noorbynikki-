'use client';

import React, { useRef, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowDown, Sparkles, ArrowUpRight } from 'lucide-react';
import MyLooking from '@/components/MyLooking';


export default function HeroBannerPage() {
  const productsRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scrollToProducts = () => {
    productsRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // 6 Fabric Collection Items (Doubled array to create seamless loop effect)
  const fabricCollections = [
    { name: 'Royal Red Fabric', image: '/redfebric.png', tag: 'Classic' },
    { name: 'Blush Pink Fabric', image: '/pinkfebric.png', tag: 'Trending' },
    { name: 'Royal Blue Fabric', image: '/bluefebric.png', tag: 'Exclusive' },
    { name: 'Rich Brown Fabric', image: '/brownfebric.png', tag: 'Designer' },
    { name: 'Vibrant Green Fabric', image: '/greenfebric.png', tag: 'Festive' },
    { name: 'Plane Green Fabric', image: '/planegreenfebric.png', tag: 'Bestseller' },
  ];

  // Continuous Seamless Auto-Scroll Effect
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    let animationId: number;
    const speed = 0.8; // Scrolling speed (kam ya zyada kar sakte hain)

    const scroll = () => {
      if (container) {
        container.scrollLeft += speed;
        // Jab scroll aakhri tak pahunch jaye toh wapas shuruat par le aayein bina jhatke ke
        if (container.scrollLeft >= container.scrollWidth / 2) {
          container.scrollLeft = 0;
        }
      }
      animationId = requestAnimationFrame(scroll);
    };

    animationId = requestAnimationFrame(scroll);

    // Jab user mouse le jaye toh rokne ke liye (optional)
    const handleMouseEnter = () => cancelAnimationFrame(animationId);
    const handleMouseLeave = () => {
      animationId = requestAnimationFrame(scroll);
    };

    container.addEventListener('mouseenter', handleMouseEnter);
    container.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      cancelAnimationFrame(animationId);
      if (container) {
        container.removeEventListener('mouseenter', handleMouseEnter);
        container.removeEventListener('mouseleave', handleMouseLeave);
      }
    };
  }, []);

  return (
    <main className="w-full min-h-screen bg-[#F8F4ED]">
      
   {/* HERO BANNER AT THE TOP */}
    <div className="relative w-full h-[350px] sm:h-[420px] md:h-[480px] lg:h-[520px] overflow-hidden shadow-sm">
      <Image
        src="/collectionhomepage.png"
        alt="Collection Header Banner"
        fill
        priority
        className="object-cover object-center w-full h-full brightness-[1.05] contrast-[1.05]"
      />
      
      {/* Balanced gradient overlay for sharp image visibility and crystal clear text */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/30 to-black/50 flex flex-col items-center justify-center text-center px-4">
        <span className="text-rose-200 font-semibold tracking-widest text-xs uppercase mb-2 drop-shadow-md">
          Elegance In Every Detail
        </span>
        <h1 className="text-3xl sm:text-5xl font-serif font-bold text-white tracking-wide max-w-2xl leading-tight drop-shadow-lg">
          Exclusive Royal Collection
        </h1>
        <p className="text-gray-100 text-sm sm:text-base mt-3 max-w-lg font-light drop-shadow">
          Discover our handpicked traditional suits, custom designer kurtis, and timeless Ethnic wear created for every occasion.
        </p>
        
        <button
          suppressHydrationWarning
          onClick={scrollToProducts}
          className="mt-6 inline-flex items-center gap-2 bg-rose-600 hover:bg-rose-700 text-white font-bold py-3 px-8 rounded-full shadow-xl transition-all transform hover:-translate-y-0.5 text-xs sm:text-sm uppercase tracking-wider cursor-pointer"
        >
          Explore Our Products
          <ArrowDown className="w-4 h-4 animate-bounce" />
        </button>
      </div>
    </div>
      {/* PRODUCTS SECTION WITH CONTINUOUS AUTO-SCROLL */}
      <div ref={productsRef} className="w-full py-16 px-4 sm:px-8 max-w-7xl mx-auto overflow-hidden">
        
        {/* Section Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#ead7d0] bg-white/95 px-4 py-1.5 shadow-sm mb-3">
            <Sparkles className="h-3.5 w-3.5 text-rose-600" />
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-800">
              Handpicked Textures & Fabrics
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-gray-900 tracking-wide">
            Our Handcrafted Collection
          </h2>
          <div className="mt-3 flex items-center justify-center gap-3">
            <span className="h-px w-12 bg-[#C9B28A]" />
            <span className="h-2 w-2 rotate-45 border border-rose-600 bg-rose-600" />
            <span className="h-px w-12 bg-[#C9B28A]" />
          </div>
        </div>
        
        {/* CONTINUOUS AUTO-SCROLLING ROW (Items are mapped twice for infinite loop) */}
        <div className="relative w-full">
          <div 
            ref={scrollContainerRef}
            className="flex items-center gap-5 overflow-x-auto no-scrollbar scroll-smooth pb-6 pt-2 px-2 select-none"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {[...fabricCollections, ...fabricCollections].map((item, index) => (
              <Link
                key={index}
                href="/collection"
                className="group relative flex-shrink-0 w-[220px] sm:w-[250px] aspect-[4/5] overflow-hidden rounded-2xl border border-[#d8cdbc] bg-[#fbf9f5] shadow-md transition-all duration-500 hover:-translate-y-1.5 hover:border-rose-500 hover:shadow-xl p-2.5 pb-14"
              >
                {/* Fabric Image Container */}
                <div className="relative w-full h-full rounded-xl overflow-hidden bg-white/60">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    sizes="250px"
                    className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                </div>

                {/* Top Tag Badge */}
                <div className="absolute left-5 top-5 rounded-full border border-white/20 bg-black/50 px-3 py-1 shadow-sm backdrop-blur-md z-10">
                  <span className="text-[8px] font-bold uppercase tracking-wider text-white">
                    {item.tag}
                  </span>
                </div>

                {/* Bottom Card Info Label */}
                <div className="absolute bottom-3 left-3 right-3 rounded-xl border border-white/90 bg-white/95 p-2.5 shadow-md backdrop-blur-md transition-all duration-300 group-hover:bg-rose-600 z-20">
                  <div className="flex items-center justify-between gap-2">
                    <div className="min-w-0">
                      <p className="truncate font-serif text-xs font-bold text-gray-900 transition-colors duration-300 group-hover:text-white">
                        {item.name}
                      </p>
                      <p className="text-[7px] font-medium uppercase tracking-wider text-gray-500 transition-colors duration-300 group-hover:text-white/85">
                        View Details
                      </p>
                    </div>

                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-rose-50 text-rose-600 transition-all duration-300 group-hover:bg-white group-hover:text-rose-600">
                      <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={2} />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

      </div>

      {/* RENDER MY LOOKING COMPONENT PROPERLY */}
      <MyLooking />

    </main>
  );
}