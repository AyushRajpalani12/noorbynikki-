'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Sparkles, Truck, ShieldCheck, RefreshCw } from 'lucide-react';

export default function HeroBanner() {
  const whatsappNumber = '918385973582';
  const whatsappMessage = encodeURIComponent(
    'Hello! I would like to explore your latest Festive & Ethnic Suit Sets Collection.'
  );
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;

  // Rotating showcase images — apni collection ki 4 images
  const showcaseImages = [
    { src: '/collection/greencottonrightsidegreat.png', alt: 'Green Cotton Suit Set' },
    { src: '/collection/offwhitestright.png', alt: 'Off White Straight Suit Set' },
    { src: '/collection/printed1.png', alt: 'Printed Ethnic Suit Set' },
    { src: '/collection/printedfeshionside.png', alt: 'Printed Fashion Suit Set' },
  ];

  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % showcaseImages.length);
    }, 3200);
    return () => clearInterval(timer);
  }, [showcaseImages.length]);

  return (
    <section className="relative w-full bg-rose-50/40 py-6 md:py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Main Banner Container */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-rose-900 via-rose-800 to-stone-900 text-white shadow-2xl ring-1 ring-white/10">

          {/* Background Decorative Pattern / Glow */}
          <div className="absolute -top-24 -left-24 w-96 h-96 bg-rose-500/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-amber-500/15 rounded-full blur-3xl pointer-events-none" />
          {/* Subtle gold hairline for a premium edge */}
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-amber-300/40 to-transparent" />

          <div className="grid grid-cols-1 lg:grid-cols-12 items-center min-h-[480px] md:min-h-[520px]">

            {/* Left Column: Premium Content */}
            <div className="lg:col-span-7 p-6 sm:p-10 md:p-12 z-10 flex flex-col justify-center space-y-5 md:space-y-6">

              {/* Badge */}
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-widest uppercase border border-white/15 w-fit text-rose-200">
                <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                Festive Edition 2026
              </div>

              {/* Main Headline */}
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif font-bold leading-tight uppercase tracking-wide">
                Graceful <span className="text-amber-300 italic font-normal">Elegance</span> <br />
                For Every Occasion
              </h1>

              {/* Subheading */}
              <p className="text-sm sm:text-base text-rose-100/90 font-light max-w-xl leading-relaxed">
                Explore our handpicked collection of handcrafted Anarkalis, Rayon Suit Sets, and Pure Cotton Silhouettes designed for timeless beauty and comfort.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <Link
                  href="/#collection"
                  className="bg-amber-400 hover:bg-amber-300 text-gray-900 font-bold px-7 py-3.5 rounded-xl shadow-lg hover:shadow-amber-400/30 transition-all duration-300 text-xs uppercase tracking-wider flex items-center gap-2 group"
                >
                  Shop Collection
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>

                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white/10 hover:bg-white/20 backdrop-blur-md text-white font-bold px-6 py-3.5 rounded-xl border border-white/20 transition-all duration-300 text-xs uppercase tracking-wider"
                >
                  Inquire on WhatsApp
                </a>
              </div>

            </div>

            {/* Right Column: Rotating Hero Image Showcase */}
            <div className="lg:col-span-5 relative h-72 sm:h-96 lg:h-full min-h-[350px] lg:min-h-[520px] overflow-hidden">
              {showcaseImages.map((img, index) => (
                <Image
                  key={img.src}
                  src={img.src}
                  alt={img.alt}
                  fill
                  priority={index === 0}
                  className={`object-cover object-top lg:rounded-r-3xl transition-opacity duration-1000 ease-in-out ${
                    index === activeIndex ? 'opacity-100' : 'opacity-0'
                  }`}
                />
              ))}

              {/* Soft Gradient Overlay for Smooth Edge Blend on Mobile */}
              <div className="absolute inset-0 bg-gradient-to-t from-rose-950 via-transparent to-transparent lg:hidden" />
              {/* Subtle side blend into the panel on desktop for a seamless premium look */}
              <div className="hidden lg:block absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-rose-900/70 to-transparent" />

              {/* Slide Indicators */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-1.5 z-10">
                {showcaseImages.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveIndex(index)}
                    aria-label={`Show image ${index + 1}`}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      index === activeIndex ? 'w-6 bg-amber-300' : 'w-1.5 bg-white/50 hover:bg-white/70'
                    }`}
                  />
                ))}
              </div>
            </div>

          </div>
        </div>

        {/* Feature Highlights / Trust Badges */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
          <div className="flex items-center gap-3 bg-white p-4 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300">
            <div className="p-2.5 bg-rose-50 text-rose-600 rounded-xl">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-gray-900 uppercase">Free Express Shipping</h4>
              <p className="text-[11px] text-gray-500">On all prepaid & COD orders across India</p>
            </div>
          </div>

          <div className="flex items-center gap-3 bg-white p-4 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300">
            <div className="p-2.5 bg-emerald-50 text-emerald-600 rounded-xl">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-gray-900 uppercase">100% Authentic Quality</h4>
              <p className="text-[11px] text-gray-500">Premium fabric & handcrafted finishes</p>
            </div>
          </div>

          <div className="flex items-center gap-3 bg-white p-4 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300">
            <div className="p-2.5 bg-amber-50 text-amber-600 rounded-xl">
              <RefreshCw className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-gray-900 uppercase">7 Days Easy Returns</h4>
              <p className="text-[11px] text-gray-500">Hassle-free exchange policy</p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}