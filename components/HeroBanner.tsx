'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Sparkles, Truck, ShieldCheck, RefreshCw } from 'lucide-react';
import api from '@/lib/api';

interface PromotionData {
  _id?: string;
  title?: string;
  badge?: string;
  description?: string;
  buttonText?: string;
  ctaText?: string;
  whatsappNumber?: string;
  image?: string | { url?: string; secure_url?: string };
  imageUrl?: string;
  images?: string[];
  ctaLink?: string;
}

export default function HeroBanner() {
  const defaultShowcaseImages = [
    { src: '/collection/greencottonrightsidegreat.png', alt: 'Green Cotton Suit Set' },
    { src: '/collection/offwhitestright.png', alt: 'Off White Straight Suit Set' },
    { src: '/collection/printed1.png', alt: 'Printed Ethnic Suit Set' },
    { src: '/collection/printedfeshionside.png', alt: 'Printed Fashion Suit Set' },
  ];

  const [promotion, setPromotion] = useState<PromotionData | null>(null);
  const [bannerImages, setBannerImages] = useState<{ src: string; alt: string }[]>(defaultShowcaseImages);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const fetchPromotion = async () => {
      try {
        const res = await api.get('/promotions');
        const resData = res.data || res;

        // Backend response format extract
        const promo = resData.data || resData.promotion || resData;

        if (promo) {
          setPromotion(promo);

          // Backend image parsing (Cloudinary string ya object dono handle)
          let finalImageUrl = '';

          if (typeof promo.image === 'string' && (promo.image.startsWith('http') || promo.image.startsWith('/'))) {
            finalImageUrl = promo.image;
          } else if (promo.image?.secure_url) {
            finalImageUrl = promo.image.secure_url;
          } else if (promo.image?.url) {
            finalImageUrl = promo.image.url;
          } else if (promo.imageUrl) {
            finalImageUrl = promo.imageUrl;
          }

          if (finalImageUrl) {
            setBannerImages([{ src: finalImageUrl, alt: promo.title || 'Promotion Banner' }]);
          } else if (promo.images && Array.isArray(promo.images) && promo.images.length > 0) {
            setBannerImages(promo.images.map((img: string, i: number) => ({ src: img, alt: `Promo ${i + 1}` })));
          }
        }
      } catch (error) {
        console.error('Failed to load active promotion:', error);
      }
    };

    fetchPromotion();
  }, []);

  useEffect(() => {
    if (bannerImages.length <= 1) return;

    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % bannerImages.length);
    }, 3500);

    return () => clearInterval(timer);
  }, [bannerImages.length]);

  // Backend fields mapping
  const badgeText = promotion?.badge || 'Festive Edition 2026';
  const headingTitle = promotion?.title || 'Graceful Elegance For Every Occasion';
  const descriptionText = promotion?.description || 'Explore our handpicked collection of handcrafted Anarkalis, Rayon Suit Sets, and Pure Cotton Silhouettes designed for timeless beauty and comfort.';
  const ctaButtonText = promotion?.buttonText || promotion?.ctaText || 'Shop Collection';
  const ctaButtonLink = promotion?.ctaLink || '/collection';

  // Dynamic WhatsApp URL
  const phone = promotion?.whatsappNumber || '918385973582';
  const whatsappMessage = encodeURIComponent(
    'Hello! I would like to explore your latest Festive & Ethnic Suit Sets Collection.'
  );
  const whatsappUrl = `https://wa.me/${phone}?text=${whatsappMessage}`;

  return (
    <section className="relative w-full bg-rose-50/40 py-6 md:py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Main Banner Container */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-rose-900 via-rose-800 to-stone-900 text-white shadow-2xl ring-1 ring-white/10">

          <div className="absolute -top-24 -left-24 w-96 h-96 bg-rose-500/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-amber-500/15 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-amber-300/40 to-transparent" />

          <div className="flex flex-col-reverse lg:grid lg:grid-cols-12 items-center min-h-[480px] md:min-h-[520px]">

            {/* Left Column */}
            <div className="lg:col-span-7 p-5 sm:p-10 md:p-12 z-10 flex flex-col justify-center space-y-4 md:space-y-6 w-full">

              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-3 py-1 rounded-full text-[11px] sm:text-xs font-semibold tracking-widest uppercase border border-white/15 w-fit text-rose-200">
                <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                {badgeText}
              </div>

              <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-serif font-bold leading-tight uppercase tracking-wide">
                {headingTitle}
              </h1>

              <p className="text-xs sm:text-base text-rose-100/90 font-light max-w-xl leading-relaxed">
                {descriptionText}
              </p>

              <div className="flex flex-row items-center gap-2 pt-1 w-full">
                <Link
                  href={ctaButtonLink}
                  className="flex-1 text-center bg-amber-400 hover:bg-amber-300 text-gray-900 font-bold px-2.5 sm:px-6 py-3 rounded-xl shadow-lg hover:shadow-amber-400/30 transition-all duration-300 text-[10px] sm:text-xs uppercase tracking-wider flex items-center justify-center gap-1 group whitespace-nowrap"
                >
                  <span>{ctaButtonText}</span>
                  <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 group-hover:translate-x-1 transition-transform shrink-0" />
                </Link>

                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 text-center bg-white/10 hover:bg-white/20 backdrop-blur-md text-white font-bold px-2.5 sm:px-6 py-3 rounded-xl border border-white/20 transition-all duration-300 text-[10px] sm:text-xs uppercase tracking-wider whitespace-nowrap"
                >
                  Inquire on WhatsApp
                </a>
              </div>

            </div>

            {/* Right Column (Image Showcase) */}
            <div className="lg:col-span-5 relative w-full h-72 sm:h-96 lg:h-full min-h-[350px] lg:min-h-[520px] overflow-hidden">
              {bannerImages.map((img, index) => (
                <Image
                  key={`${img.src}-${index}`}
                  src={img.src}
                  alt={img.alt}
                  fill
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  priority={index === 0}
                  className={`object-cover object-top transition-opacity duration-1000 ease-in-out ${
                    index === activeIndex ? 'opacity-100' : 'opacity-0'
                  }`}
                />
              ))}

              <div className="absolute inset-0 bg-gradient-to-t from-rose-950 via-transparent to-transparent lg:hidden" />
              <div className="hidden lg:block absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-rose-900/70 to-transparent" />

              {bannerImages.length > 1 && (
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-1.5 z-10">
                  {bannerImages.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setActiveIndex(index)}
                      aria-label={`Show image ${index + 1}`}
                      className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                        index === activeIndex ? 'w-6 bg-amber-300' : 'w-1.5 bg-white/50 hover:bg-white/70'
                      }`}
                    />
                  ))}
                </div>
              )}
            </div>

          </div>
        </div>

        {/* Feature Highlights */}
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