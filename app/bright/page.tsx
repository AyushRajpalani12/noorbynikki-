'use client';

import React from 'react';
import Image from 'next/image';
import BrightLooking from '@/components/BrightLooking';
import  MyBright from '@/components/MyBright';
const occasionCollection = [
  { id: 601, src: '/Videos/design1.png', title: 'Design 1' },
  { id: 602, src: '/Videos/design2.png', title: 'Design 2' },
  { id: 603, src: '/Videos/design3.png', title: 'Design 3' },
  { id: 604, src: '/Videos/design4.png', title: 'Design 4' },
  { id: 605, src: '/Videos/design5.png', title: 'Design 5' },
  { id: 606, src: '/Videos/design6.png', title: 'Design 6' },
];

export default function BrightPage() {
  return (
    <main className="w-full min-h-[calc(100vh-4rem)] bg-[#F8F3EC] m-0 p-0 overflow-x-hidden">
      
      {/* ================= FULL WIDTH & FULL HEIGHT BANNER ================= */}
      <div className="relative w-full min-h-[calc(100vh-4rem)] py-12 px-4 sm:px-8 lg:px-16 flex flex-col justify-between items-center overflow-hidden m-0">
        
        {/* Background Image (morehomepage.png) covering 100% width and height */}
        <div className="absolute inset-0 w-full h-full z-0">
          <Image
            src="/morehomepage.png"
            alt="Background Header"
            fill
            className="object-cover object-center filter brightness-[0.8]"
            priority
          />
          {/* Subtle dark gradient overlay for text readability */}
          <div className="absolute inset-0 w-full h-full bg-black/35 backdrop-blur-[1px]" />
        </div>

        {/* Header Title inside the Section */}
        <div className="relative z-10 text-center mt-4">
          <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold text-white drop-shadow-lg tracking-wider uppercase">
            EXCLUSIVE OCCASION EDIT
          </h2>
          <p className="mt-2 text-white/95 text-xs sm:text-sm font-medium tracking-wide drop-shadow">
            Discover handcrafted styles for every celebration
          </p>
        </div>

        {/* ================= 6 CUBE / SQUARE PICTURE CARDS ================= */}
        <div className="relative z-10 w-full max-w-[1400px] grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6 my-auto">
          {occasionCollection.map((item) => (
            <div
              key={item.id}
              className="relative group overflow-hidden rounded-2xl bg-white/15 backdrop-blur-md border border-white/40 p-2.5 shadow-2xl transition-all duration-300 hover:scale-105"
            >
              {/* Cube / Square Form Picture Container */}
              <div className="relative aspect-square w-full rounded-xl overflow-hidden bg-[#F2EDE6]">
                <Image
                  src={item.src}
                  alt={item.title}
                  fill
                  className="object-cover object-center transition-transform duration-700 group-hover:scale-110"
                />
              </div>
            </div>
          ))}
        </div>

        {/* Bottom spacing balance */}
        <div className="relative z-10 mb-2">
          <span className="inline-block w-20 h-1 bg-white/60 rounded-full" />
        </div>

      </div>
      <MyBright/>

      {/* ================= BRIGHT LOOKING COMPONENT SECTION ================= */}
      <div className="w-full">
        <BrightLooking />
      </div>

    </main>
  );
}