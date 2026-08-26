'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Eye, Heart, ShoppingBag } from 'lucide-react';

export interface ProductType {
  id: number;
  name: string;
  price: string;
  originalPrice: string;
  discount?: string;
  images: string[];
  sizes?: string[];
}

interface ProductCardProps {
  product: ProductType;
  onQuickView: (product: ProductType) => void;
}

export default function ProductCard({ product, onQuickView }: ProductCardProps) {
  const [isWishlisted, setIsWishlisted] = useState(false);

  return (
    <div className="group relative bg-white rounded-xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-md transition-all duration-300">
      
      {/* Product Image Container */}
      <div className="relative w-full h-[340px] bg-gray-50 overflow-hidden">
        {/* Card Image Clicking Navigates to Product Page */}
        <Link href="/product" className="block w-full h-full">
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
          />
        </Link>

        {/* Wishlist Icon */}
        <button
          onClick={(e) => {
            e.preventDefault();
            setIsWishlisted(!isWishlisted);
          }}
          className="absolute top-3 right-3 p-2 bg-white/80 backdrop-blur-sm rounded-full shadow hover:bg-white transition-all z-10"
        >
          <Heart
            className={`w-4 h-4 ${
              isWishlisted ? 'fill-rose-600 text-rose-600' : 'text-gray-600 hover:text-rose-600'
            }`}
          />
        </button>

        {/* Action Overlay Buttons (Quick View + Buy Now) */}
        <div className="absolute inset-x-0 bottom-3 flex items-center justify-center gap-2 px-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
          
          {/* Quick View Button */}
          <button
            onClick={(e) => {
              e.preventDefault();
              onQuickView(product);
            }}
            className="flex-1 bg-white/90 backdrop-blur-md text-gray-800 font-bold py-2 px-2 rounded-md shadow hover:bg-gray-100 transition-all text-[11px] uppercase tracking-wider flex items-center justify-center gap-1"
          >
            <Eye className="w-3.5 h-3.5" />
            Quick View
          </button>

          {/* Buy Now Button (Navigates to /product) */}
          <Link
            href="/product"
            className="flex-1 bg-rose-700 hover:bg-rose-800 text-white font-bold py-2 px-2 rounded-md shadow transition-all text-[11px] uppercase tracking-wider flex items-center justify-center gap-1"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            Buy Now
          </Link>

        </div>
      </div>

      {/* Product Details Section */}
      <div className="p-3 text-center">
        <Link href="/product">
          <h3 className="text-xs font-semibold text-gray-800 line-clamp-1 uppercase tracking-wide hover:text-rose-600 transition-colors">
            {product.name}
          </h3>
        </Link>
        
        <div className="flex items-center justify-center gap-2 mt-1.5">
          <span className="text-sm font-bold text-gray-900">{product.price}</span>
          <span className="text-xs text-gray-400 line-through">{product.originalPrice}</span>
        </div>
      </div>

    </div>
  );
}