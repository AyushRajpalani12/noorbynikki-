'use client';

import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Sparkles, MessageCircle } from 'lucide-react';

export default function VideoShowcase() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch((error) => {
        console.log("Auto-play was prevented:", error);
      });
    }
  }, []);

  return (
    <section className="relative w-full py-16 md:py-24 bg-[#FAF7F2] overflow-hidden border-y border-[#EFEADF]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Section Container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch bg-white rounded-3xl overflow-hidden shadow-xl border border-gray-100/80">
          
          {/* LEFT SIDE: Content & Fabric Thumbnails */}
          <div className="lg:col-span-6 p-8 sm:p-12 lg:p-16 flex flex-col justify-center text-left relative z-10">
            
            {/* Tag */}
            <div className="inline-flex items-center gap-1.5 bg-rose-50 border border-rose-100 px-3.5 py-1.5 rounded-full w-max mb-6">
              <Sparkles className="w-3.5 h-3.5 text-rose-600" />
              <span className="text-rose-600 font-bold text-xs uppercase tracking-widest">
                Premium Ethnic Range
              </span>
            </div>

            {/* Title */}
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-gray-900 tracking-tight leading-[1.15] mb-5">
              Exquisite Fabrics & Handcrafted Designs
            </h2>

            {/* Description */}
            <p className="text-gray-600 text-sm sm:text-base font-light leading-relaxed mb-8 max-w-lg">
              Discover our exclusive collection crafted from premium quality fabrics. Designed to give you an unmatched blend of elegance, tradition, and superior comfort.
            </p>

            {/* Featured Fabric Images Grid */}
            <div className="grid grid-cols-2 gap-4 mb-10">
              <div className="relative w-full h-36 sm:h-44 rounded-2xl overflow-hidden shadow-sm border border-gray-100 group">
                <Image
                  src="/firstcloth.png"
                  alt="Pure Handloom Fabric"
                  fill
                  className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end p-3.5">
                  <span className="text-white text-[11px] font-semibold tracking-wider uppercase bg-black/40 backdrop-blur-md px-3 py-1 rounded-lg">
                    Pure Handloom
                  </span>
                </div>
              </div>

              <div className="relative w-full h-36 sm:h-44 rounded-2xl overflow-hidden shadow-sm border border-gray-100 group">
                <Image
                  src="/yello.png"
                  alt="Designer Print Fabric"
                  fill
                  className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end p-3.5">
                  <span className="text-white text-[11px] font-semibold tracking-wider uppercase bg-black/40 backdrop-blur-md px-3 py-1 rounded-lg">
                    Designer Print
                  </span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4">
              <Link
                href="/collection"
                className="inline-flex items-center gap-2 bg-rose-600 hover:bg-rose-700 text-white font-bold py-3.5 px-8 rounded-xl shadow-md transition-all text-xs uppercase tracking-wider"
              >
                Explore Collection
                <ArrowRight className="w-4 h-4" />
              </Link>
              <a
                href="https://wa.me/918385973582?text=Hello,%20I%20want%20to%20enquire%20about%20your%20ethnic%20collection."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3.5 px-6 rounded-xl shadow-md transition-all text-xs uppercase tracking-wider"
              >
                <MessageCircle className="w-4 h-4 fill-white text-emerald-600" />
                Order on WhatsApp
              </a>
            </div>

          </div>

          {/* RIGHT SIDE: Auto-playing Video Showcase */}
          <div className="lg:col-span-6 relative w-full h-[450px] sm:h-[550px] lg:h-auto min-h-[600px] bg-gray-900 overflow-hidden">
            <video
              ref={videoRef}
              autoPlay
              loop
              muted
              playsInline
              preload="auto"
              className="w-full h-full object-cover object-center"
            >
              <source src="/Videos/yellokurti-video.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>

            {/* Cinematic Top Badge */}
            <div className="absolute top-6 right-6 bg-black/50 backdrop-blur-md text-white text-xs font-medium px-4 py-2 rounded-full flex items-center gap-2 border border-white/20 z-10 shadow-xl">
              <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse"></span>
              <span>Live Collection Reel</span>
            </div>

            {/* Smooth Gradient Overlay */}
            <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black/70 via-black/20 to-transparent pointer-events-none"></div>
          </div>

        </div>

      </div>
    </section>
  );
}