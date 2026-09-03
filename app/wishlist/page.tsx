'use client';

import React from 'react';
import Link from 'next/link';
import { useWishlist } from '@/context/WishlistContext';
import { useCart } from '@/context/CartContext';
import { Heart, X, ArrowRight, ShoppingBag, Sparkles } from 'lucide-react';

export default function WishlistPage() {
  const { wishlistItems, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart() as any;

  // Recommended products list with routing to /bright
  const recommendedProducts = [
    {
      id: 101,
      name: "EMBROIDERED FESTIVE ANARKALI SUIT",
      price: "₹3,999",
      originalPrice: "₹4,999",
      image: "/dress1.png",
    },
    {
      id: 102,
      name: "ROYAL BLUE CHINON SILK SUIT SET",
      price: "₹2,899",
      originalPrice: "₹3,599",
      image: "/dress2.png",
    },
    {
      id: 103,
      name: "PASTEL GREEN ETHNIC KURTI SET",
      price: "₹2,499",
      originalPrice: "₹3,199",
      image: "/dress3.png",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50/50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-serif font-bold text-gray-900 mb-8">
          My Wishlist ({wishlistItems.length})
        </h1>

        {wishlistItems.length === 0 ? (
          <div className="bg-white rounded-2xl p-12 text-center shadow-sm border border-gray-100">
            <div className="w-20 h-20 bg-rose-50 text-rose-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <Heart className="w-10 h-10" />
            </div>
            <h2 className="text-xl font-serif font-bold text-gray-800 mb-2">YOUR WISHLIST IS EMPTY</h2>
            <p className="text-gray-500 text-sm mb-6 font-light">Save your favorite pieces here.</p>
            <Link
              href="/collection"
              className="inline-flex items-center gap-2 bg-[#b9381e] hover:bg-[#a03019] text-white font-bold py-3 px-8 rounded-full text-xs uppercase tracking-wider transition-colors shadow-lg"
            >
              <span>Explore Collection</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
            {wishlistItems.map((item) => (
              <div
                key={item.id}
                className="group relative bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300"
              >
                <button
                  onClick={() => removeFromWishlist(item.id)}
                  className="absolute top-3 right-3 z-10 p-2 bg-white/90 hover:bg-white rounded-full shadow-md text-gray-500 hover:text-red-600 transition-colors"
                  title="Remove from wishlist"
                >
                  <X className="w-4 h-4" />
                </button>

                <Link href={`/product?id=${item.id}`} className="block relative h-64 w-full bg-gray-50">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover object-top"
                  />
                </Link>

                <div className="p-4 text-center">
                  <Link href={`/product?id=${item.id}`}>
                    <h3 className="text-xs font-semibold text-gray-800 truncate uppercase tracking-wide hover:text-rose-600 transition-colors">
                      {item.name}
                    </h3>
                  </Link>
                  <div className="mt-1.5 flex items-center justify-center gap-2">
                    <span className="text-sm font-bold text-gray-900">{item.price}</span>
                    {item.originalPrice && (
                      <span className="text-xs text-gray-400 line-through">{item.originalPrice}</span>
                    )}
                  </div>

                  <button
                    onClick={() =>
                      addToCart &&
                      addToCart({
                        id: item.id,
                        name: item.name,
                        price: item.price,
                        image: item.image,
                        size: 'M',
                      })
                    }
                    className="mt-3 w-full flex items-center justify-center gap-1.5 bg-rose-600 hover:bg-rose-700 text-white font-bold py-2 rounded-lg text-[11px] uppercase tracking-wider transition-colors"
                  >
                    <ShoppingBag className="w-3.5 h-3.5" />
                    Add to Bag
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* --- RECOMMENDATION SECTION WITH HOVER EFFECTS --- */}
        <div className="mt-16 bg-white rounded-3xl border border-gray-100 shadow-sm p-6 sm:p-8">
          <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-100">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-amber-50 rounded-xl text-amber-500">
                <Sparkles className="w-5 h-5" />
              </div>
              <h2 className="text-xl font-serif font-bold text-gray-900">You Might Also Like</h2>
            </div>
            <Link 
              href="/bright" 
              className="text-xs font-semibold uppercase tracking-wider text-[#b9381e] hover:underline flex items-center gap-1"
            >
              View All <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {recommendedProducts.map((rec) => (
              <div 
                key={rec.id} 
                className="bg-gray-50/50 rounded-2xl border border-gray-100 p-4 shadow-sm flex flex-col justify-between"
              >
                <div>
                  <div className="relative h-60 w-full bg-white rounded-xl overflow-hidden mb-4 border border-gray-100">
                    <img
                      src={rec.image}
                      alt={rec.name}
                      className="w-full h-full object-cover object-top"
                    />
                  </div>
                  <h3 className="text-xs font-semibold text-gray-800 uppercase tracking-wide truncate">
                    {rec.name}
                  </h3>
                  <div className="mt-1.5 flex items-center gap-2">
                    <span className="text-sm font-bold text-gray-900">{rec.price}</span>
                    <span className="text-xs text-gray-400 line-through">{rec.originalPrice}</span>
                  </div>
                </div>

                <Link
                  href="/bright"
                  className="mt-4 w-full flex items-center justify-center bg-white border border-gray-300 text-gray-800 font-bold py-2 rounded-xl text-[11px] uppercase tracking-wider shadow-sm transition-all duration-300 hover:bg-gray-900 hover:text-white hover:border-gray-900 text-center"
                >
                  View Product
                </Link>
              </div>
            ))}
          </div>
        </div>
        {/* -------------------------------------------------------- */}

      </div>
    </div>
  );
}