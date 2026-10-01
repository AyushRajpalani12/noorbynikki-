'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Heart, Eye, MessageCircle } from 'lucide-react';
import api from '@/lib/api';

function CardImageSlider({ images, alt }: { images: any; alt: string }) {
  const [currentImgIndex, setCurrentImgIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const rawList = Array.isArray(images) ? images : images ? [images] : [];
  const validImages: string[] = rawList
    .map((img: any) => (typeof img === 'string' ? img : img?.url || img?.secure_url || ''))
    .filter(Boolean);

  const finalImages = validImages.length > 0 ? validImages : ['/mynewlook.png'];

  useEffect(() => {
    if (finalImages.length <= 1 || isHovered) return;
    const interval = setInterval(() => {
      setCurrentImgIndex((prev) => (prev + 1) % finalImages.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [finalImages.length, isHovered]);

  return (
    <div
      className="relative w-full h-full bg-[#F1E2D3]"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {finalImages.map((img, idx) => (
        <Image
          key={img + idx}
          src={img}
          alt={`${alt} - view ${idx + 1}`}
          fill
          unoptimized={img.startsWith('http')}
          className={`object-cover object-top transition-opacity duration-700 ease-in-out ${
            idx === currentImgIndex ? 'opacity-100 z-0' : 'opacity-0'
          }`}
        />
      ))}

      {finalImages.length > 1 && (
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex space-x-1.5 z-10">
          {finalImages.map((_, idx) => (
            <span
              key={idx}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                idx === currentImgIndex ? 'w-5 bg-[#7A1F3D]' : 'w-1.5 bg-white/70'
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default function SpecialDiscount() {
  const [isMounted, setIsMounted] = useState(false);
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const whatsappNumber = '918385973582';

  // Client-side mount check to prevent Hydration mismatch
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Fetch Festive Offer Products from Backend API
  useEffect(() => {
    if (!isMounted) return;
    let active = true;

    const fetchFestiveOffers = async () => {
      try {
        setLoading(true);
        const res = await api.get('/products?isFestivalOffer=true&limit=8');
        const resData = res.data || res;
        const serviceData = resData.data || resData;

        if (active) {
          const items = Array.isArray(serviceData?.data)
            ? serviceData.data
            : Array.isArray(serviceData)
            ? serviceData
            : [];
          setProducts(items);
        }
      } catch (err) {
        console.error('Failed to load festive offers:', err);
        if (active) setProducts([]);
      } finally {
        if (active) setLoading(false);
      }
    };

    fetchFestiveOffers();

    return () => {
      active = false;
    };
  }, [isMounted]);

  const toggleWishlist = (id: string) => {
    setWishlist((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  // SSR Safe Fallback (Matches Server & Client cleanly)
  if (!isMounted) {
    return (
      <section className="relative w-full overflow-hidden bg-[#FAF3E7] py-14 sm:py-20" suppressHydrationWarning>
        <div className="relative z-10 mx-auto max-w-[1280px] px-5 text-center sm:px-8">
          <h2 className="font-serif text-[34px] font-bold leading-tight text-[#2A1B15] sm:text-[42px] md:text-[48px]">
            The Festive Discount Edit
          </h2>
          <div className="py-16 text-xs uppercase tracking-widest text-[#7A6A5C]">
            Loading collection...
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="relative w-full overflow-hidden bg-[#FAF3E7] py-14 sm:py-20" suppressHydrationWarning>
      {/* Soft festive glow */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-64 bg-gradient-to-b from-[#F1DDBF]/60 to-transparent" />

      {/* ================= HEADER ================= */}
      <div className="relative z-10 mx-auto mb-10 max-w-[1280px] px-5 text-center sm:px-8 lg:mb-14">
        <h2 className="font-serif text-[34px] font-bold leading-tight text-[#2A1B15] sm:text-[42px] md:text-[48px]">
          The Festive Discount Edit
        </h2>
        <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-[#7A6A5C]">
          Handpicked kurtis and suit sets, marked down for the season.
        </p>
        <div className="mx-auto mt-5 h-[2px] w-16 bg-[#B8860B]" />
      </div>

      {/* ================= LOADING & EMPTY STATE ================= */}
      {loading && (
        <div className="py-20 text-center font-serif text-sm uppercase tracking-widest text-[#7A6A5C]">
          Curating Festive Offers...
        </div>
      )}

      {!loading && products.length === 0 && (
        <div className="py-20 text-center font-serif text-sm uppercase tracking-widest text-[#7A6A5C]">
          No active festival offers right now. Check back soon!
        </div>
      )}

      {/* ================= DYNAMIC GRID ================= */}
      {!loading && products.length > 0 && (
        <div className="relative z-10 mx-auto grid w-full max-w-[1280px] grid-cols-1 gap-x-6 gap-y-10 px-5 sm:grid-cols-2 lg:grid-cols-4 sm:px-8 lg:px-10">
          {products.map((item) => {
            const prodId = item._id || item.id;
            const isWishlisted = wishlist.includes(prodId);
            const productUrl = `/product?id=${prodId}`;
            const title = item.title || item.name || 'Festive Ensemble';

            const sellingPrice = Number(item.discountPrice || item.price || 0);
            const originalPrice = Number(item.originalPrice || Math.round(sellingPrice * 1.35));
            const discountLabel =
              item.discount ||
              `${Math.max(0, Math.round(((originalPrice - sellingPrice) / originalPrice) * 100))}% OFF`;

            const whatsappMessage = encodeURIComponent(
              `Hello! I want to order:\n\n*Product:* ${title}\n*Price:* ₹${sellingPrice}`
            );
            const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;

            return (
              <div key={prodId} className="group flex flex-col">
                {/* Arch Image */}
                <div className="relative aspect-[3/4] w-full overflow-hidden rounded-t-[120px] rounded-b-md border border-[#E6D2B8] bg-[#F1E2D3] shadow-[0_10px_28px_rgba(74,42,20,0.10)] transition-shadow duration-300 group-hover:shadow-[0_16px_36px_rgba(74,42,20,0.16)]">
                  <Link href={productUrl} className="block h-full w-full">
                    <CardImageSlider images={item.images} alt={title} />
                  </Link>

                  {/* Discount ribbon */}
                  <span className="absolute left-0 top-5 rounded-r-full bg-[#7A1F3D] py-1 pl-3 pr-3 text-[10px] font-bold text-white shadow-sm z-10">
                    {discountLabel}
                  </span>

                  {/* Wishlist */}
                  <button
                    suppressHydrationWarning
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      toggleWishlist(prodId);
                    }}
                    className="absolute right-3 top-5 rounded-full bg-white/90 p-2 shadow-sm backdrop-blur-md transition-colors hover:bg-white z-10"
                    aria-label="Toggle wishlist"
                  >
                    <Heart
                      className={`h-4 w-4 ${
                        isWishlisted ? 'fill-[#7A1F3D] text-[#7A1F3D]' : 'text-[#6B5A4C]'
                      }`}
                    />
                  </button>

                  {/* Actions — visible on hover (desktop), always visible on touch */}
                  <div className="absolute inset-x-3 bottom-3 flex items-center justify-center gap-2 opacity-100 transition-opacity duration-300 sm:opacity-0 sm:group-hover:opacity-100 z-10">
                    <Link
                      href={productUrl}
                      className="flex flex-1 items-center justify-center gap-1 rounded-xl bg-white/95 px-2 py-2 text-[11px] font-semibold text-[#2A1B15] shadow-md backdrop-blur-md transition-colors hover:bg-white"
                    >
                      <Eye className="h-3.5 w-3.5 text-[#7A1F3D]" />
                      View
                    </Link>
                    <a
                      href={whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex flex-1 items-center justify-center gap-1 rounded-xl bg-[#25946C] px-2 py-2 text-[11px] font-semibold text-white shadow-md transition-colors hover:bg-[#1F7D5C]"
                    >
                      <MessageCircle className="h-3.5 w-3.5" />
                      Order
                    </a>
                  </div>
                </div>

                {/* Details */}
                <div className="px-1 pt-3 text-center">
                  <Link href={productUrl}>
                    <h3 className="line-clamp-2 min-h-[2.5rem] font-serif text-sm font-semibold text-[#2A1B15] transition-colors hover:text-[#7A1F3D]">
                      {title}
                    </h3>
                  </Link>

                  <div className="mt-2 flex items-center justify-center gap-2" suppressHydrationWarning>
                    <span className="text-base font-bold text-[#2A1B15]">
                      ₹{sellingPrice.toLocaleString('en-IN')}
                    </span>
                    <span className="text-xs text-[#A99584] line-through">
                      ₹{originalPrice.toLocaleString('en-IN')}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* ================= CTA ================= */}
      <div className="relative z-10 mx-auto mt-14 flex max-w-[1280px] justify-center px-5">
        <Link
          href="/collection"
          className="rounded-full border border-[#2A1B15] px-8 py-3 text-sm font-semibold text-[#2A1B15] transition-colors hover:bg-[#2A1B15] hover:text-white"
        >
          View full collection
        </Link>
      </div>
    </section>
  );
}