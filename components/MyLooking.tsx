'use client';

import React from 'react';
import Image from 'next/image';
import { Play, Crown } from 'lucide-react';
import SpecialDiscount from './SpecialDiscount';

export default function MyLooking() {
  return (
    <section className="relative w-full overflow-hidden bg-[#F8F3EC] py-14 sm:py-16 lg:py-20">

      {/* Background Decoration */}
      <div className="pointer-events-none absolute -left-24 top-20 h-72 w-72 rounded-full bg-[#A7193B]/[0.035] blur-3xl" />
      <div className="pointer-events-none absolute -right-24 bottom-10 h-80 w-80 rounded-full bg-[#C9B28A]/[0.08] blur-3xl" />

      {/* ================= HEADER ================= */}
      <div className="relative z-10 mx-auto mb-10 max-w-[1280px] px-5 text-center sm:px-8 lg:mb-12">

        <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-[#E7D7C6] bg-white/90 px-4 py-1.5 shadow-sm">
          <Crown className="h-3.5 w-3.5 text-[#A7193B]" />

          <span className="text-[9px] font-bold uppercase tracking-[0.22em] text-[#5B5048] sm:text-[10px]">
            Exclusive Showcase
          </span>
        </div>

        <h2 className="font-serif text-[36px] font-bold leading-tight tracking-[-0.02em] text-[#1E232A] sm:text-[44px] md:text-[50px]">
          THE ROYAL ETHNIC EDIT
        </h2>

        {/* Divider */}
        <div className="mt-4 flex items-center justify-center gap-3">
          <span className="h-px w-12 bg-[#C9B28A]" />

          <span className="h-2 w-2 rotate-45 bg-[#A7193B]" />

          <span className="h-px w-12 bg-[#C9B28A]" />
        </div>

        <p className="mx-auto mt-4 max-w-xl text-xs leading-relaxed text-[#756B63] sm:text-sm">
          A curated selection of timeless silhouettes, rich craftsmanship,
          and modern ethnic elegance.
        </p>
      </div>

      {/* ================= MAIN CONTENT ================= */}
      <div className="relative z-10 mx-auto grid w-full max-w-[1280px] grid-cols-1 gap-8 px-5 sm:px-8 lg:grid-cols-12 lg:gap-9 lg:px-10 items-start">

        {/* ================= LEFT IMAGE COLLAGE ================= */}
        <div className="lg:col-span-7">

          <div className="grid grid-cols-12 grid-rows-[230px_150px] gap-3 sm:grid-rows-[280px_175px] lg:grid-rows-[300px_185px]">

            {/* IMAGE 01 */}
            <div className="group relative col-span-7 row-span-2 overflow-hidden rounded-[22px] border border-[#DED0C0] bg-[#EFE8DE] shadow-[0_15px_35px_rgba(59,43,32,0.16)]">

              <Image
                src="/111.png"
                alt="Royal Ethnic Look"
                fill
                priority
                sizes="(max-width: 1024px) 60vw, 430px"
                className="object-contain p-1 transition-transform duration-700 ease-out group-hover:scale-[1.025]"
              />

              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />

              {/* Number */}
              <div className="absolute left-4 top-4 flex h-8 w-8 items-center justify-center rounded-full border border-white/50 bg-black/30 text-[9px] font-bold text-white backdrop-blur-md">
                01
              </div>

              {/* Label */}
              <div className="absolute bottom-4 left-4">
                <span className="rounded-full bg-white/90 px-3 py-1.5 text-[8px] font-bold uppercase tracking-[0.15em] text-[#A7193B] shadow-md backdrop-blur-sm">
                  Royal Edit
                </span>
              </div>
            </div>

            {/* IMAGE 02 */}
            <div className="group relative col-span-5 overflow-hidden rounded-[20px] border border-[#DED0C0] bg-[#EFE8DE] shadow-[0_10px_25px_rgba(59,43,32,0.13)]">

              <Image
                src="/112.png"
                alt="Royal Ethnic Detail"
                fill
                sizes="(max-width: 1024px) 40vw, 300px"
                className="object-contain p-1 transition-transform duration-700 ease-out group-hover:scale-[1.04]"
              />

              <div className="absolute right-3 top-3 flex h-7 w-7 items-center justify-center rounded-full bg-white/90 text-[8px] font-bold text-[#A7193B] shadow-sm">
                02
              </div>
            </div>

            {/* IMAGE 03 */}
            <div className="group relative col-span-2 overflow-hidden rounded-[18px] border border-[#DED0C0] bg-[#EFE8DE] shadow-[0_10px_25px_rgba(59,43,32,0.13)]">

              <Image
                src="/113.png"
                alt="Traditional Wear"
                fill
                sizes="180px"
                className="object-contain p-1 transition-transform duration-700 group-hover:scale-[1.04]"
              />

              <div className="absolute bottom-3 left-3 flex h-6 w-6 items-center justify-center rounded-full bg-white/90 text-[7px] font-bold text-[#A7193B] shadow-sm">
                03
              </div>
            </div>

            {/* IMAGE 04 */}
            <div className="group relative col-span-3 overflow-hidden rounded-[18px] border border-[#DED0C0] bg-[#EFE8DE] shadow-[0_10px_25px_rgba(59,43,32,0.13)]">

              <Image
                src="/114.png"
                alt="Designer Collection"
                fill
                sizes="220px"
                className="object-contain p-1 transition-transform duration-700 group-hover:scale-[1.04]"
              />

              <div className="absolute bottom-3 left-3 flex h-6 w-6 items-center justify-center rounded-full bg-white/90 text-[7px] font-bold text-[#A7193B] shadow-sm">
                04
              </div>
            </div>

          </div>
        </div>

        {/* ================= RIGHT FULL SCREEN VIDEO CONTAINER ================= */}
        <div className="relative overflow-hidden rounded-[25px] border border-[#E1D1BE] bg-[#F1E7DB] p-4 sm:p-5 shadow-[0_18px_40px_rgba(59,43,32,0.13)] lg:col-span-5">

          {/* Decorative Circles */}
          <div className="pointer-events-none absolute -right-16 -top-16 h-44 w-44 rounded-full border border-[#C9B28A]/30" />

          {/* ================= BIG FULL VIDEO ================= */}
          <div className="relative aspect-[4/5] sm:aspect-[3/4] lg:aspect-[4/5] w-full overflow-hidden rounded-[19px] border border-[#D4C0A9] bg-black shadow-[0_10px_25px_rgba(0,0,0,0.16)] flex items-center justify-center">

            <video
              src="/Videos/video.mp4"
              autoPlay
              loop
              muted
              playsInline
              preload="auto"
              className="h-full w-full object-cover object-center"
            />

            {/* Soft Overlay */}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />

            {/* Video Label */}
            <div className="absolute bottom-4 left-4 flex items-center gap-2 rounded-full bg-white/90 px-3.5 py-2 shadow-md backdrop-blur-md">
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#A7193B] text-white">
                <Play className="ml-0.5 h-2.5 w-2.5 fill-white" strokeWidth={0} />
              </span>
              <span className="text-[9px] font-bold uppercase tracking-[0.12em] text-[#34302D]">
                Style Preview
              </span>
            </div>
          </div>

        </div>

      </div>

      {/* ================= BOTTOM LINE ================= */}
      <div className="relative z-10 mx-auto mt-10 flex max-w-[1280px] items-center justify-center gap-3 px-5">
        <span className="h-px flex-1 bg-[#DCCDBB]" />
        <span className="font-serif text-[10px] font-semibold uppercase tracking-[0.25em] text-[#9A8B7B]">
          Crafted For You
        </span>
        <span className="h-px flex-1 bg-[#DCCDBB]" />
      </div>
<SpecialDiscount/>
    </section>
  );
}