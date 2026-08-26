'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { X, Heart, ShoppingBag } from 'lucide-react';

interface Product {
  id: number;
  name: string;
  price: string;
  originalPrice: string;
  discount: string;
  images: string[];
  sizes: string[];
}

interface QuickViewProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function ProductQuickView({ product, isOpen, onClose }: QuickViewProps) {
  const [selectedImage, setSelectedImage] = useState<string>('');
  const [selectedSize, setSelectedSize] = useState<string>('');

  // PERMANENT FIX: Jab bhi naya product khulega, main image aur size auto reset honge
  useEffect(() => {
    if (product && product.images?.length > 0) {
      setSelectedImage(product.images[0]);
      setSelectedSize(product.sizes[0]);
    }
  }, [product]);

  if (!isOpen || !product) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="relative bg-white rounded-2xl max-w-4xl w-full overflow-hidden shadow-2xl flex flex-col md:flex-row max-h-[90vh]">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 z-20 p-2 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors"
        >
          <X className="w-5 h-5 text-gray-600" />
        </button>

        {/* LEFT: Product Images */}
        <div className="md:w-1/2 p-4 flex gap-3 bg-gray-50">
          {/* Thumbnails */}
          <div className="flex flex-col gap-2 overflow-y-auto max-h-[400px]">
            {product.images.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedImage(img)}
                className={`relative w-14 h-16 rounded-md overflow-hidden border-2 transition-all ${
                  selectedImage === img ? 'border-rose-600 scale-105' : 'border-gray-200'
                }`}
              >
                <Image src={img} alt={`thumb-${idx}`} fill className="object-cover object-top" />
              </button>
            ))}
          </div>

          {/* Main Selected Image */}
          <div className="relative flex-1 h-[400px] rounded-lg overflow-hidden bg-white border border-gray-200">
            <Image
              src={selectedImage || product.images[0]}
              alt={product.name}
              fill
              className="object-cover object-top"
            />
          </div>
        </div>

        {/* RIGHT: Product Info */}
        <div className="md:w-1/2 p-6 flex flex-col justify-between">
          <div>
            <h2 className="text-lg font-bold text-gray-800 uppercase tracking-wide leading-snug">
              {product.name}
            </h2>

            <div className="flex items-center gap-2 mt-2">
              <span className="text-xl font-bold text-gray-900">{product.price}</span>
              <span className="text-xs text-gray-400 line-through">MRP {product.originalPrice}</span>
              <span className="text-xs font-bold text-rose-600 bg-rose-50 px-2 py-0.5 rounded">
                {product.discount}
              </span>
            </div>

            {/* Size Selector */}
            <div className="mt-5">
              <span className="text-xs font-bold uppercase text-gray-700 block mb-2">Select Size</span>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-3 py-1.5 text-xs font-semibold rounded border transition-all ${
                      selectedSize === size
                        ? 'bg-rose-700 text-white border-rose-700'
                        : 'bg-white text-gray-700 border-gray-300 hover:border-rose-400'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3 mt-6">
            <div className="flex gap-2">
              <button className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-3 rounded-lg text-xs uppercase tracking-wider transition-colors">
                Add To Bag
              </button>
              
              <Link
                href={`/product?id=${product.id}`}
                onClick={onClose}
                className="flex-1 bg-rose-600 hover:bg-rose-700 text-white font-bold py-3 rounded-lg text-xs uppercase tracking-wider transition-colors text-center"
              >
                Buy Now
              </Link>
            </div>

            <Link
              href={`/product?id=${product.id}`}
              onClick={onClose}
              className="block text-center text-xs font-bold text-rose-600 hover:underline uppercase tracking-wider pt-2"
            >
              Product Details
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}