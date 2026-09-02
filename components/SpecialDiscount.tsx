'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Heart, Eye, MessageCircle } from 'lucide-react';

const discountItems = [
  {
    id: 2,
    src: '/collection/straightsuitset.png',
    images: [
      '/collection/straightsuitset.png',
      '/collection/straightsuitsetleftside.png',
      '/collection/straightsuitsetbackside.png',
    ],
    title: 'Royal Embroidered Kurti',
    originalPrice: '₹4,599',
    discountPrice: '₹3,299',
    discount: '28% OFF',
  },
  {
    id: 6,
    src: '/collection/cottenstright.png',
    images: [
      '/collection/cottenstright.png',
      '/collection/cottenstrightfront.png',
      '/collection/cottenstrightback.png',
    ],
    title: 'Classic Festive Silhouette',
    originalPrice: '₹3,999',
    discountPrice: '₹2,899',
    discount: '27% OFF',
  },
  {
    id: 11,
    src: '/collection/angrakhafestivalanrkal.png',
    images: [
      '/collection/angrakhafestivalanrkal.png',
      '/collection/angrakhafestivalanrkalfrontside.png',
      '/collection/angrakhafestivalanrkalleftside.png',
    ],
    title: 'Designer Ethnic Wear',
    originalPrice: '₹4,999',
    discountPrice: '₹3,499',
    discount: '30% OFF',
  },
  {
    id: 12,
    src: '/collection/offwhitestright.png',
    images: [
      '/collection/offwhitestright.png',
      '/collection/offwhitestrightfront.png',
      '/collection/offwhitestrightright.png',
    ],
    title: 'Graceful Traditional Kurti',
    originalPrice: '₹4,999',
    discountPrice: '₹3,499',
    discount: '30% OFF',
  },
  {
    id: 501,
    src: '/collection/11.png',
    images: ['/collection/11.png'],
    title: 'Exclusive Designer Festive Suit',
    originalPrice: '₹5,299',
    discountPrice: '₹3,799',
    discount: '28% OFF',
  },
  {
    id: 502,
    src: '/collection/orange1.png',
    images: [
      '/collection/orange1.png',
      '/collection/orange1front.png',
      '/collection/orange1right.png',
    ],
    title: 'Vibrant Orange Festive Kurti',
    originalPrice: '₹4,999',
    discountPrice: '₹3,599',
    discount: '28% OFF',
  },
  {
    id: 503,
    src: '/collection/frontsideneveyblue.png',
    images: [
      '/collection/frontsideneveyblue.png',
      '/collection/glasideneveyblue.png',
      '/collection/leftsideblue.png',
    ],
    title: 'Elegant Navy Blue Suit Set',
    originalPrice: '₹5,199',
    discountPrice: '₹3,699',
    discount: '28% OFF',
  },
  {
    id: 504,
    src: '/collection/ranicolor.png',
    images: [
      '/collection/ranicolor.png',
      '/collection/ranicolorgla.png',
      '/collection/ranicolorleft.png',
    ],
    title: 'Stunning Rani Color Suit Set',
    originalPrice: '₹5,499',
    discountPrice: '₹3,899',
    discount: '29% OFF',
  },
];

function CardImageSlider({ images, alt }: { images: string[]; alt: string }) {
  const [currentImgIndex, setCurrentImgIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (images.length <= 1 || isHovered) return;
    const interval = setInterval(() => {
      setCurrentImgIndex((prev) => (prev + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [images.length, isHovered]);

  return (
    <div
      className="relative w-full h-full bg-[#F1E2D3]"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {images.map((img, idx) => (
        <Image
          key={img}
          src={img}
          alt={`${alt} - view ${idx + 1}`}
          fill
          className={`object-cover object-top transition-opacity duration-700 ease-in-out ${
            idx === currentImgIndex ? 'opacity-100 z-0' : 'opacity-0'
          }`}
        />
      ))}

      {images.length > 1 && (
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex space-x-1.5 z-10">
          {images.map((_, idx) => (
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
  const [wishlist, setWishlist] = useState<number[]>([]);
  const whatsappNumber = '918385973582';

  const toggleWishlist = (id: number) => {
    setWishlist((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  return (
    <section className="relative w-full overflow-hidden bg-[#FAF3E7] py-14 sm:py-20">
      {/* Soft festive glow, not generic blur blobs */}
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

      {/* ================= GRID ================= */}
      <div className="relative z-10 mx-auto grid w-full max-w-[1280px] grid-cols-1 gap-x-6 gap-y-10 px-5 sm:grid-cols-2 lg:grid-cols-4 sm:px-8 lg:px-10">
        {discountItems.map((item) => {
          const isWishlisted = wishlist.includes(item.id);
          const productUrl = `/product?id=${item.id}`;
          const whatsappMessage = encodeURIComponent(
            `Hello! I want to order:\n\n*Product:* ${item.title}\n*Price:* ${item.discountPrice}`
          );
          const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;

          return (
            <div key={item.id} className="group flex flex-col">
              {/* Arch Image */}
              <div className="relative aspect-[3/4] w-full overflow-hidden rounded-t-[120px] rounded-b-md border border-[#E6D2B8] bg-[#F1E2D3] shadow-[0_10px_28px_rgba(74,42,20,0.10)] transition-shadow duration-300 group-hover:shadow-[0_16px_36px_rgba(74,42,20,0.16)]">
                <Link href={productUrl} className="block h-full w-full">
                  <CardImageSlider images={item.images} alt={item.title} />
                </Link>

                {/* Discount ribbon */}
                <span className="absolute left-0 top-5 rounded-r-full bg-[#7A1F3D] py-1 pl-3 pr-3 text-[10px] font-bold text-white shadow-sm z-10">
                  {item.discount}
                </span>

                {/* Wishlist */}
                <button
                  suppressHydrationWarning
                  onClick={(e) => {
                    e.preventDefault();
                    toggleWishlist(item.id);
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
                    {item.title}
                  </h3>
                </Link>

                <div className="mt-2 flex items-center justify-center gap-2">
                  <span className="text-base font-bold text-[#2A1B15]">{item.discountPrice}</span>
                  <span className="text-xs text-[#A99584] line-through">{item.originalPrice}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

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