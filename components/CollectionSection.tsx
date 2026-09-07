'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Sparkles, ArrowUpRight } from 'lucide-react';

export default function CollectionSection() {
  const collectionSuits = [
    {
      name: 'Royal Blue Suite',
      image: '/mynewlook.png',
      tag: 'Exclusive',
      rotate: '-1.5deg',
      position: 'center center',
    },
    {
      name: 'Printed Suite',
      image: '/printedsute.png',
      tag: 'Trending',
      rotate: '1.2deg',
      position: 'center center',
    },
    {
      name: 'Orange Suite',
      image: '/orange.png',
      tag: 'Festive',
      rotate: '-1deg',
      position: 'center center',
    },
    {
      name: 'Designer Suite',
      image: '/suite.png',
      tag: 'Bestseller',
      rotate: '1.5deg',
      position: 'center center',
    },
  ];

  return (
    <section className="relative w-full max-w-full overflow-hidden bg-[#F8F4ED]">

      {/* =====================================================
          MAIN SECTION
      ===================================================== */}

      <div className="relative w-full overflow-hidden border-y border-[#e7ddcf]">

        {/* ===================================================
            DECORATIVE FLORALS
        =================================================== */}

        <div className="pointer-events-none absolute left-0 top-0 z-0 h-full w-[24%] max-w-[420px] opacity-75">
          <Image
            src="/footer-left.png"
            alt=""
            fill
            priority
            sizes="420px"
            className="object-cover object-left"
          />
        </div>

        <div className="pointer-events-none absolute right-0 top-0 z-0 h-full w-[24%] max-w-[420px] opacity-75">
          <Image
            src="/footer-right.png"
            alt=""
            fill
            priority
            sizes="420px"
            className="object-cover object-right"
          />
        </div>


        {/* ===================================================
            CENTER FADE
        =================================================== */}

        <div className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-r from-[#F8F4ED]/25 via-[#F8F4ED]/95 to-[#F8F4ED]/25" />


        {/* ===================================================
            CONTENT
        =================================================== */}

        <div className="relative z-10 mx-auto w-full max-w-[1280px] px-5 py-12 sm:px-8 sm:py-14 lg:px-10 lg:py-16">

          {/* =================================================
              HEADER
          ================================================= */}

          <div className="mb-9 text-center">

            {/* Badge */}

            <div className="inline-flex items-center gap-2 rounded-full border border-[#ead7d0] bg-white/95 px-4 py-1.5 shadow-[0_5px_18px_rgba(75,45,30,0.08)]">

              <Sparkles
                className="h-3.5 w-3.5 text-[#A7193B]"
                strokeWidth={2}
              />

              <span className="text-[9px] font-bold uppercase tracking-[0.22em] text-[#3b3440] sm:text-[10px]">
                Curated Ethnic Showcase
              </span>

            </div>


            {/* Heading */}

            <h2 className="mt-3 font-serif text-[38px] font-bold leading-none tracking-[-0.025em] text-[#182131] sm:text-[44px] md:text-[50px] lg:text-[54px]">
              Featured Masterpieces
            </h2>


            {/* Decorative divider */}

            <div className="mt-4 flex items-center justify-center gap-3">

              <span className="h-px w-12 bg-[#C9B28A]" />

              <span className="h-2 w-2 rotate-45 border border-[#A7193B] bg-[#A7193B]" />

              <span className="h-px w-12 bg-[#C9B28A]" />

            </div>

          </div>


          {/* =================================================
              PRODUCTS
          ================================================= */}

          <div className="grid w-full grid-cols-1 justify-items-center gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-7 xl:gap-8">

            {collectionSuits.map((item, index) => (

              <div
                key={item.name}
                className="w-full max-w-[275px] transition-all duration-500 hover:-translate-y-2"
                style={{
                  transform: `rotate(${item.rotate})`,
                }}
              >

                <Link
                  href="/collection"
                  className="group relative block aspect-[0.85/1.1] w-full overflow-hidden rounded-[22px] border border-[#d8cdbc] bg-[#fbf9f5] shadow-[0_14px_32px_rgba(67,48,35,0.15)] transition-all duration-500 hover:border-[#A7193B] hover:shadow-[0_22px_45px_rgba(67,48,35,0.25)] p-3 pb-16"
                >

                  {/* =================================================
                      IMAGE (Changed object-cover to object-contain)
                  ================================================= */}

                  <div className="relative w-full h-full rounded-xl overflow-hidden bg-white/50">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      priority={index < 4}
                      sizes="(max-width: 640px) 88vw, (max-width: 1024px) 42vw, 275px"
                      className="object-contain object-center transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                  </div>


                  {/* =================================================
                      TOP TAG
                  ================================================= */}

                  <div className="absolute left-5 top-5 rounded-full border border-white/20 bg-[#34332f]/85 px-3.5 py-1.5 shadow-lg backdrop-blur-md z-10">

                    <span className="text-[8px] font-bold uppercase tracking-[0.14em] text-white sm:text-[9px]">
                      {item.tag}
                    </span>

                  </div>


                  {/* =================================================
                      SMALL NUMBER
                  ================================================= */}

                  <div className="absolute right-5 top-5 flex h-7 w-7 items-center justify-center rounded-full border border-white/50 bg-white/90 text-[9px] font-bold text-[#4a4039] backdrop-blur-md z-10">
                    0{index + 1}
                  </div>


                  {/* =================================================
                      BOTTOM PRODUCT INFO
                  ================================================= */}

                  <div className="absolute bottom-3 left-3 right-3 rounded-[15px] border border-white/80 bg-white/95 p-3 shadow-[0_7px_20px_rgba(0,0,0,0.12)] backdrop-blur-md transition-all duration-300 group-hover:bg-[#A7193B] z-20">

                    <div className="flex items-center justify-between gap-3">

                      <div className="min-w-0">

                        <p className="truncate font-serif text-[13px] font-bold text-[#182131] transition-colors duration-300 group-hover:text-white">
                          {item.name}
                        </p>

                        <p className="mt-0.5 text-[8px] font-medium uppercase tracking-[0.12em] text-[#8b8177] transition-colors duration-300 group-hover:text-white/75">
                          Handpicked Collection
                        </p>

                      </div>


                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#F7E9E9] text-[#A7193B] transition-all duration-300 group-hover:bg-white group-hover:text-[#A7193B]">

                        <ArrowUpRight
                          className="h-4 w-4"
                          strokeWidth={2}
                        />

                      </span>

                    </div>

                  </div>

                </Link>

              </div>

            ))}

          </div>

        </div>

      </div>

    </section>
  );
}