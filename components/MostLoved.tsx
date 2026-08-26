'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Heart, Eye, MessageCircle } from 'lucide-react';
import ProductQuickView from './ProductQuickView';

const PRODUCTS = [
  {
    id: 1,
    name: 'PEACH POLY GEORGETTE FLORAL PRINTED SUIT SET',
    price: '₹3,496',
    originalPrice: '₹4,995',
    discount: '30% OFF',
    images: [
      '/collection/pinkyellow.png',
      '/collection/rightsidepink.png',
      '/collection/backside.png',
      '/collection/leftside.png',
      '/collection/pink2.png',
      '/collection/frontside.png',
    ],
    sizes: ['30/XS', '32/S', '34/M', '36/L', '38/XL'],
  },
  {
    id: 2,
    name: 'ELEGANT EMBROIDERED STRAIGHT SUIT SET',
    price: '₹3,299',
    originalPrice: '₹4,599',
    discount: '28% OFF',
    images: [
      '/collection/straightsuitset.png',
      '/collection/straightsuitsetleftside.png',
      '/collection/straightsuitsetbackside.png',
      '/collection/straightsuitsetlookingside.png',
      '/collection/straightsuitsetleftside11.png',
      '/collection/straightsuitsetrightside.png',
    ],
    sizes: ['32/S', '34/M', '36/L', '38/XL', '40/2XL'],
  },
  {
    id: 3,
    name: 'PURPLE RAYON PRINTED SUIT SET',
    price: '₹2,999',
    originalPrice: '₹4,299',
    discount: '30% OFF',
    images: [
      '/collection/purpalrayonprinted.png',
      '/collection/purpalrayonprintedfrontside.png',
      '/collection/purpalrayonprintedleftside.png',
      '/collection/purpalrayonprintedrightside.png',
      '/collection/purpalrayonprintedbackside.png',
    ],
    sizes: ['32/S', '34/M', '36/L', '38/XL', '40/2XL'],
  },
  {
    id: 4,
    name: 'MANGO YELLOW ANARKALI SUIT SET',
    price: '₹3,599',
    originalPrice: '₹4,999',
    discount: '28% OFF',
    images: [
      '/collection/Mangoanarkal.png',
      '/collection/Mangoanarkalfrontside.png',
      '/collection/Mangoanarkalleftside.png',
      '/collection/Mangoanarkalrightside.png',
      '/collection/Mangoanarkalbackside.png',
    ],
    sizes: ['32/S', '34/M', '36/L', '38/XL', '40/2XL'],
  },
  {
    id: 5,
    name: 'LIGHT PINK FLORAL PRINTED SUIT SET',
    price: '₹3,199',
    originalPrice: '₹4,499',
    discount: '28% OFF',
    images: [
      '/collection/lightpink.png',
      '/collection/lightpinkfront.png',
      '/collection/lightpinkleft.png',
      '/collection/lightpinkright.png',
      '/collection/lightpinkback.png',
      '/collection/lightpinkoutside.png',
    ],
    sizes: ['30/XS', '32/S', '34/M', '36/L', '38/XL'],
  },
  {
    id: 6,
    name: 'COTTON EMBROIDERED STRAIGHT SUIT SET',
    price: '₹2,899',
    originalPrice: '₹3,999',
    discount: '27% OFF',
    images: [
      '/collection/cottenstright.png',
      '/collection/cottenstrightfront.png',
      '/collection/cottenstrightback.png',
      '/collection/cottenstrightleft.png',
      '/collection/cottenstrightright.png',
      '/collection/cottenstrighsitting.png',
    ],
    sizes: ['30/XS', '32/S', '34/M', '36/L', '38/XL', '40/2XL'],
  },
];

// Card ke andar Auto-sliding Image Component
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
      className="relative w-full h-full"
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

      {/* Progress Dots Indicator */}
      {images.length > 1 && (
        <div className="absolute bottom-14 left-1/2 -translate-x-1/2 flex space-x-1.5 z-10">
          {images.map((_, idx) => (
            <span
              key={idx}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                idx === currentImgIndex ? 'w-5 bg-rose-600' : 'w-1.5 bg-white/70'
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default function MostLoved() {
  const [selectedProduct, setSelectedProduct] = useState<typeof PRODUCTS[0] | null>(null);
  const [wishlist, setWishlist] = useState<number[]>([]);

  const toggleWishlist = (id: number) => {
    setWishlist((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const whatsappNumber = '918385973582';

  return (
    <section className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-serif font-bold tracking-wide text-gray-800 uppercase">
            Most Loved
          </h2>
          <div className="flex items-center justify-center space-x-2 mt-2">
            <span className="h-[1px] w-12 bg-rose-400"></span>
            <span className="text-rose-400 text-sm">🌸</span>
            <span className="h-[1px] w-12 bg-rose-400"></span>
          </div>
        </div>

        {/* Product Cards Grid: Grid columns adjust kiye hain taaki card bade banein */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {PRODUCTS.map((product) => {
            const isWishlisted = wishlist.includes(product.id);
            const productUrl = `/product?id=${product.id}`;

            const whatsappMessage = encodeURIComponent(
              `Hello! I want to order:\n\n*Product:* ${product.name}\n*Price:* ${product.price}`
            );
            const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;

            return (
              <div
                key={product.id}
                className="group relative bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300"
              >
                {/* Image Container: Height Badha di gayi hai (h-[480px] md:h-[540px]) */}
                <div className="relative h-[480px] md:h-[540px] w-full bg-gray-50 overflow-hidden">
                  
                  <Link href={productUrl} className="block w-full h-full">
                    <CardImageSlider images={product.images} alt={product.name} />
                  </Link>

                  {/* Discount Tag */}
                  <span className="absolute top-4 left-4 bg-rose-600 text-white text-xs font-bold px-2.5 py-1 rounded tracking-wider uppercase z-10">
                    {product.discount}
                  </span>

                  {/* Wishlist Button */}
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      toggleWishlist(product.id);
                    }}
                    className="absolute top-4 right-4 p-2.5 bg-white/80 backdrop-blur-md rounded-full shadow-md hover:bg-white transition-all z-10"
                  >
                    <Heart
                      className={`w-5 h-5 ${
                        isWishlisted ? 'fill-rose-600 text-rose-600' : 'text-gray-600 hover:text-rose-600'
                      }`}
                    />
                  </button>

                  {/* Action Buttons */}
                  <div className="absolute inset-x-0 bottom-4 flex items-center justify-center gap-3 px-4 z-10">
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        setSelectedProduct(product);
                      }}
                      className="flex-1 bg-white/95 backdrop-blur-md text-gray-800 font-bold py-3 px-3 rounded-xl shadow-md hover:bg-gray-100 transition-all text-xs uppercase tracking-wider flex items-center justify-center gap-2"
                    >
                      <Eye className="w-4 h-4 text-rose-600" />
                      Quick View
                    </button>

                    <a
                      href={whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 px-3 rounded-xl shadow-md transition-all text-xs uppercase tracking-wider flex items-center justify-center gap-2"
                    >
                      <MessageCircle className="w-4 h-4 fill-white text-emerald-600" />
                      Order
                    </a>
                  </div>
                </div>

                {/* Card Information */}
                <div className="p-5 text-center">
                  <Link href={productUrl}>
                    <h3 className="text-sm font-semibold text-gray-800 truncate uppercase tracking-wide hover:text-rose-600 transition-colors">
                      {product.name}
                    </h3>
                  </Link>
                  
                  <div className="mt-2 flex items-center justify-center gap-2.5">
                    <span className="text-lg font-bold text-gray-900">{product.price}</span>
                    <span className="text-sm text-gray-400 line-through">{product.originalPrice}</span>
                  </div>
                </div>

              </div>
            );
          })}
        </div>

      </div>

      <ProductQuickView
        product={selectedProduct}
        isOpen={!!selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />
    </section>
  );
}