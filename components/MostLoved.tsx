'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Heart, Eye, MessageCircle, Loader2 } from 'lucide-react';
import ProductQuickView from './ProductQuickView';
import api from '@/lib/api';

interface ProductItem {
  _id: string;
  title: string;
  slug: string;
  price: number;
  discountPrice?: number;
  images: string[];
  sizes?: { size: string; stock: number }[];
  totalStock?: number;
}

function CardImageSlider({ images, alt }: { images: string[]; alt: string }) {
  const [currentImgIndex, setCurrentImgIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (!images || images.length <= 1 || isHovered) return;

    const interval = setInterval(() => {
      setCurrentImgIndex((prev) => (prev + 1) % images.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [images, isHovered]);

  const fallbackImage = '/placeholder.png';
  const displayImages = images && images.length > 0 ? images : [fallbackImage];

  return (
    <div
      className="relative w-full h-full"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {displayImages.map((img, idx) => (
        <Image
          key={`${img}-${idx}`}
          src={img}
          alt={`${alt} - view ${idx + 1}`}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className={`object-cover object-top transition-opacity duration-700 ease-in-out ${
            idx === currentImgIndex ? 'opacity-100 z-0' : 'opacity-0'
          }`}
        />
      ))}

      {displayImages.length > 1 && (
        <div className="absolute bottom-14 left-1/2 -translate-x-1/2 flex space-x-1.5 z-10">
          {displayImages.map((_, idx) => (
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
  const [products, setProducts] = useState<ProductItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState<any | null>(null);

  // 1. Wishlist state: Isme un saare products ki IDs hongi jo liked hain
  const [wishlistedIds, setWishlistedIds] = useState<string[]>([]);

  // 2. Initial Data Fetch: Products + Wishlist dono mangwao
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        // Active products fetch karein
        const prodRes = await api.get('/products?limit=9');
        const prodData = prodRes.data || prodRes;
        if (prodData.success && Array.isArray(prodData.data)) {
          setProducts(prodData.data);
        }

        // User ki existing wishlist mangwao taaki pehle se liked items red dikhein
        try {
          const wishRes = await api.get('/wishlist');
          const wishData = wishRes.data || wishRes;
          if (wishData.success && Array.isArray(wishData.data)) {
            const ids = wishData.data.map((item: any) => item._id || item.id);
            setWishlistedIds(ids);
          }
        } catch {
          // User logged-in nahi hai toh ignore karein
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // 3. Heart Button Toggle Logic (Instant UI Update)
  const handleWishlistToggle = async (productId: string) => {
    const isCurrentlyLiked = wishlistedIds.includes(productId);

    // Instant UI change (Optimistic Update)
    if (isCurrentlyLiked) {
      setWishlistedIds((prev) => prev.filter((id) => id !== productId));
    } else {
      setWishlistedIds((prev) => [...prev, productId]);
    }

    try {
      const res = await api.post('/wishlist/toggle', { productId });
      const resData = res.data || res;

      // Backend ke final status se sync karein
      if (resData.isWishlisted === true) {
        setWishlistedIds((prev) => Array.from(new Set([...prev, productId])));
      } else if (resData.isWishlisted === false) {
        setWishlistedIds((prev) => prev.filter((id) => id !== productId));
      }
    } catch (error: any) {
      // Agar API fail ho jaye toh UI ko wapas purani state me le jao
      if (isCurrentlyLiked) {
        setWishlistedIds((prev) => [...prev, productId]);
      } else {
        setWishlistedIds((prev) => prev.filter((id) => id !== productId));
      }
      alert(error.response?.data?.message || 'Please login to add to wishlist');
    }
  };

  const whatsappNumber = '918385973582';

  return (
    <section className="py-12 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
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

        {/* Loading Spinner */}
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <Loader2 className="w-8 h-8 text-rose-600 animate-spin" />
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            No products available at the moment.
          </div>
        ) : (
          /* Products Grid */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product) => {
              // Direct check: Kya is product ki ID array me maujood hai?
              const isWishlisted = wishlistedIds.includes(product._id);
              const productUrl = `/product/${product.slug || product._id}`;

              // Discount calculation
              let discountText = null;
              if (product.discountPrice && product.discountPrice < product.price) {
                const diff = product.price - product.discountPrice;
                const percent = Math.round((diff / product.price) * 100);
                discountText = `${percent}% OFF`;
              }

              const displayPrice = product.discountPrice || product.price;
              const originalPrice = product.discountPrice ? product.price : null;

              const whatsappMessage = encodeURIComponent(
                `Hello! I want to order:\n\n*Product:* ${product.title}\n*Price:* ₹${displayPrice}`
              );
              const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;

              return (
                <div
                  key={product._id}
                  className="group relative bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300"
                >
                  <div className="relative h-[480px] md:h-[540px] w-full bg-gray-50 overflow-hidden">
                    <Link href={productUrl} className="block w-full h-full">
                      <CardImageSlider images={product.images} alt={product.title} />
                    </Link>

                    {/* Discount Badge */}
                    {discountText && (
                      <span className="absolute top-4 left-4 bg-rose-600 text-white text-xs font-bold px-2.5 py-1 rounded tracking-wider uppercase z-10">
                        {discountText}
                      </span>
                    )}

                    {/* Heart Button */}
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        handleWishlistToggle(product._id);
                      }}
                      className="absolute top-4 right-4 p-2.5 bg-white/80 backdrop-blur-md rounded-full shadow-md hover:bg-white transition-all z-10"
                      aria-label="Toggle wishlist"
                    >
                      <Heart
                        className={`w-5 h-5 transition-colors duration-200 ${
                          isWishlisted
                            ? 'fill-rose-600 text-rose-600'
                            : 'text-gray-600 hover:text-rose-600'
                        }`}
                      />
                    </button>

                    {/* Quick View & WhatsApp Order */}
                    <div className="absolute inset-x-0 bottom-4 flex items-center justify-center gap-3 px-4 z-10">
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          // Formatted object passing for QuickView compatibility
                          setSelectedProduct({
                            ...product,
                            id: product._id,
                            name: product.title,
                            price: `₹${displayPrice.toLocaleString('en-IN')}`,
                            originalPrice: originalPrice ? `₹${originalPrice.toLocaleString('en-IN')}` : '',
                            discount: discountText || '',
                            sizes: product.sizes?.map((s: any) => typeof s === 'string' ? s : s.size) || ['XS', 'S', 'M', 'L', 'XL'],
                          });
                        }}
                        className="flex-1 bg-white/95 backdrop-blur-md text-gray-800 font-bold py-3 px-3 rounded-xl shadow-md hover:bg-gray-100 transition-all text-xs uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer"
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

                  {/* Card Bottom Details */}
                  <div className="p-5 text-center">
                    <Link href={productUrl}>
                      <h3 className="text-sm font-semibold text-gray-800 truncate uppercase tracking-wide hover:text-rose-600 transition-colors">
                        {product.title}
                      </h3>
                    </Link>
                    
                    <div className="mt-2 flex items-center justify-center gap-2.5">
                      <span className="text-lg font-bold text-gray-900">
                        ₹{displayPrice.toLocaleString('en-IN')}
                      </span>
                      {originalPrice && (
                        <span className="text-sm text-gray-400 line-through">
                          ₹{originalPrice.toLocaleString('en-IN')}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Quick View Modal */}
      {selectedProduct && (
        <ProductQuickView
          product={selectedProduct}
          isOpen={Boolean(selectedProduct)}
          onClose={() => setSelectedProduct(null)}
        />
      )}
    </section>
  );
}