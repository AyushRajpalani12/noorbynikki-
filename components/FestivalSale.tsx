'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Sparkles, MessageCircle, X } from 'lucide-react';

// Multi-Product Data Array
const PRODUCTS = [
  {
    id: 10,
    name: 'DARK RED FLORAL PRINTED SUIT SET',
    price: '₹3,499',
    originalPrice: '₹4,999',
    discount: '30% OFF',
    mainImage: '/collection/darkredflower.png',
    images: [
      '/collection/darkredflower.png',
      '/collection/darkredflowerfront.png',
      '/collection/darkredflowerleft.png',
      '/collection/darkredflowerright.png',
      '/collection/darkredflowerback.png',
    ],
    sizes: ['30/XS', '32/S', '34/M', '36/L', '38/XL', '40/2XL'],
    description: 'Celebrate this festive season with our classic Dark Red Floral Printed Suit Set.',
  },
  {
    id: 11,
    name: 'ANGRAKHA FESTIVAL ANARKALI SUIT SET',
    price: '₹3,499',
    originalPrice: '₹4,999',
    discount: '30% OFF',
    mainImage: '/collection/angrakhafestivalanrkal.png',
    images: [
      '/collection/angrakhafestivalanrkal.png',
      '/collection/angrakhafestivalanrkalfrontside.png',
      '/collection/angrakhafestivalanrkalleftside.png',
      '/collection/angrakhafestivalanrkalrightside.png',
      '/collection/angrakhafestivalanrkaloutlokingside.png',
    ],
    sizes: ['30/XS', '32/S', '34/M', '36/L', '38/XL', '40/2XL'],
    description: 'Traditional Angrakha style Anarkali suit set with heavy borders and regal festival flair.',
  },
  {
    id: 12,
    name: 'OFF WHITE STRAIGHT SUIT SET',
    price: '₹3,499',
    originalPrice: '₹4,999',
    discount: '30% OFF',
    mainImage: '/collection/offwhitestright.png',
    images: [
      '/collection/offwhitestright.png',
      '/collection/offwhitestrightfront.png',
      '/collection/offwhitestrightgreat.png',
      '/collection/offwhitestrightright.png',
      '/collection/offwhitestrightback.png',
    ],
    sizes: ['30/XS', '32/S', '34/M', '36/L', '38/XL', '40/2XL'],
    description: 'Elegantly crafted Off White Straight Suit Set featuring graceful embroidery and fine tailoring.',
  },
  {
    id: 13,
    name: 'ELEGANT PRINTED SUIT SET',
    price: '₹3,499',
    originalPrice: '₹4,999',
    discount: '30% OFF',
    mainImage: '/collection/printed1.png',
    images: [
      '/collection/printed1.png',
      '/collection/printed1front.png',
      '/collection/printed1left.png',
      '/collection/printed1right.png',
      '/collection/printed1back.png',
    ],
    sizes: ['30/XS', '32/S', '34/M', '36/L', '38/XL', '40/2XL'],
    description: 'Stylish printed suit set with fine detailing and elegant everyday look.',
  },
];

export default function FestivalSale() {
  const [activeProduct, setActiveProduct] = useState<typeof PRODUCTS[0] | null>(null);
  const [selectedImage, setSelectedImage] = useState<string>('');

  const openProductDetail = (prod: typeof PRODUCTS[0]) => {
    setActiveProduct(prod);
    setSelectedImage(prod.images[0]);
  };

  const whatsappNumber = '918385973582';

  return (
    <section className="py-16 bg-[#FDF4EE]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* SECTION 1: EXPLORE COLLECTION ARCH GRID */}
        <div className="text-center mb-12">
          <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-rose-700 bg-rose-100/80 px-4 py-1.5 rounded-full mb-3">
            <Sparkles className="w-3.5 h-3.5 text-rose-600" />
            Festival Offers
          </span>
          <h2 className="text-2xl md:text-4xl font-serif tracking-[0.2em] text-gray-900 uppercase font-medium">
            Explore Collection
          </h2>
        </div>

        {/* Arch Cards Row */}
        <div className="flex flex-wrap justify-center gap-6 items-center">
          {PRODUCTS.map((prod) => (
            <div
              key={prod.id}
              onClick={() => openProductDetail(prod)}
              className="group relative cursor-pointer w-full max-w-[240px]"
            >
              {/* Arch Frame */}
              <div className="relative aspect-[4/7] rounded-t-[140px] overflow-hidden bg-stone-200/50 shadow-sm transition-all duration-500 group-hover:shadow-xl border-4 border-white">
                <Image
                  src={prod.mainImage}
                  alt={prod.name}
                  fill
                  sizes="240px"
                  className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

                {/* Overlay Text */}
                <div className="absolute bottom-6 left-0 right-0 text-center px-3 z-10">
                  <h3 className="text-white text-xs font-medium tracking-wider drop-shadow-md mb-2 line-clamp-1">
                    {prod.name}
                  </h3>
                  <span className="inline-block text-[10px] text-white/90 uppercase tracking-[0.2em] font-semibold border-b border-white/60 pb-0.5 group-hover:border-white transition-colors">
                    Click To View Details
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* SECTION 2: PRODUCT DETAIL MODAL / DISPLAY ON CLICK */}
        {activeProduct && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
            <div className="bg-white rounded-3xl p-6 lg:p-10 max-w-4xl w-full relative shadow-2xl my-8">
              
              {/* Close Button */}
              <button
                onClick={() => setActiveProduct(null)}
                className="absolute top-4 right-4 p-2 rounded-full bg-stone-100 hover:bg-stone-200 text-gray-700 transition-colors z-10"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
                
                {/* Product Multi-Image View */}
                <div className="md:col-span-6 flex flex-col items-center">
                  <div className="relative w-full aspect-[3/4] max-w-[320px] rounded-2xl overflow-hidden bg-stone-100 shadow-md">
                    <Image
                      src={selectedImage}
                      alt={activeProduct.name}
                      fill
                      className="object-cover object-top"
                    />
                    <span className="absolute top-4 left-4 bg-rose-600 text-white text-[11px] font-bold px-3 py-1 rounded-full">
                      {activeProduct.discount}
                    </span>
                  </div>

                  {/* Thumbnails of Angles */}
                  <div className="flex justify-center gap-2 mt-4 overflow-x-auto w-full py-1">
                    {activeProduct.images.map((img, idx) => (
                      <button
                        key={idx}
                        onClick={() => setSelectedImage(img)}
                        className={`relative w-12 h-16 rounded-lg overflow-hidden border-2 flex-shrink-0 transition-all ${
                          selectedImage === img
                            ? 'border-rose-600 scale-105 ring-2 ring-rose-200'
                            : 'border-transparent opacity-60 hover:opacity-100'
                        }`}
                      >
                        <Image src={img} alt={`thumb-${idx}`} fill className="object-cover object-top" />
                      </button>
                    ))}
                  </div>
                </div>

                {/* Product Details & Actions */}
                <div className="md:col-span-6 space-y-5 text-left">
                  <div>
                    <span className="text-xs font-bold text-amber-700 tracking-widest uppercase bg-amber-50 px-3 py-1 rounded-md border border-amber-200/50 inline-block mb-2">
                      Limited Festival Edition
                    </span>
                    <h3 className="text-xl lg:text-2xl font-serif font-bold text-gray-900">
                      {activeProduct.name}
                    </h3>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="text-2xl font-bold text-rose-700">{activeProduct.price}</span>
                    <span className="text-lg text-gray-400 line-through">{activeProduct.originalPrice}</span>
                  </div>

                  <p className="text-xs text-gray-600 leading-relaxed">
                    {activeProduct.description}
                  </p>

                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-gray-800 block mb-2">
                      Available Sizes:
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {activeProduct.sizes.map((size) => (
                        <span key={size} className="px-3 py-1 bg-stone-100 rounded-md text-xs font-semibold text-gray-800">
                          {size}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3 pt-2">
                    <Link
                      href={`/product?id=${activeProduct.id}`}
                      className="flex-1 text-center bg-rose-700 hover:bg-rose-800 text-white font-semibold py-3 px-4 rounded-xl text-xs uppercase tracking-wider"
                    >
                      Buy Now
                    </Link>
                    <a
                      href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(`Hello! I want to order: ${activeProduct.name}`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3 px-4 rounded-xl text-xs uppercase tracking-wider flex items-center justify-center gap-2"
                    >
                      <MessageCircle className="w-4 h-4 fill-white text-emerald-600" />
                      WhatsApp Order
                    </a>
                  </div>
                </div>

              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
}