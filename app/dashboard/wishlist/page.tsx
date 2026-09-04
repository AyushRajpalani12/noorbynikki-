'use client';

import React from 'react';
import Link from 'next/link';
import { useWishlist } from '@/context/WishlistContext';
import { useCart } from '@/context/CartContext';
import DashboardSidebar from '@/app/dashboardsidebar/page';
import { Heart, X, ShoppingBag, ArrowRight, Sparkles } from 'lucide-react';

export default function DashboardWishlistPage() {
  const { wishlistItems, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart() as any;

  const recommendedProducts = [
    {
      id: 101,
      name: 'Embroidered Festive Anarkali Suit',
      price: '₹3,999',
      originalPrice: '₹4,999',
      image: '/dress1.png',
    },
    {
      id: 102,
      name: 'Royal Blue Chinon Silk Suit Set',
      price: '₹2,899',
      originalPrice: '₹3,599',
      image: '/dress2.png',
    },
    {
      id: 103,
      name: 'Pastel Green Ethnic Kurti Set',
      price: '₹2,499',
      originalPrice: '₹3,199',
      image: '/dress3.png',
    },
  ];

  return (
    <div className="min-h-screen bg-[#3A0E1F] flex flex-col lg:flex-row">
      <DashboardSidebar />

      <main className="flex-1 lg:ml-64 bg-[#FAF6F0] flex flex-col">

        {/* Top bar */}
        <div className="fixed top-0 left-0 right-0 lg:left-64 z-30 h-16 flex items-center justify-between bg-[#FAF6F0]/95 backdrop-blur border-b border-[#EFE6DA] px-4 sm:px-6">
          <p className="font-serif text-[15px] text-[#2A211D]">Wishlist</p>
        </div>

        <div className="flex-1 pt-16 px-4 pb-4 sm:px-6 sm:pb-6 flex flex-col gap-5">

          {/* Wishlist panel */}
          <div className="bg-white rounded-2xl border border-[#EFE6DA] p-6 sm:p-8">
            <div className="flex items-center justify-between mb-6 pb-5 border-b border-[#EFE6DA]">
              <div>
                <h3 className="font-serif text-lg text-[#2A211D]">My wishlist</h3>
                <p className="text-xs text-[#8B7E74] mt-1">
                  {wishlistItems.length} saved item{wishlistItems.length === 1 ? '' : 's'}
                </p>
              </div>
              <Heart className="w-5 h-5 text-[#B08D57]" />
            </div>

            {wishlistItems.length === 0 ? (
              <div className="text-center py-14">
                <div className="w-14 h-14 bg-[#FAF6F0] text-[#3A0E1F] rounded-full flex items-center justify-center mx-auto mb-4 border border-[#EFE6DA]">
                  <Heart className="w-6 h-6" />
                </div>
                <p className="text-[#2A211D] font-semibold text-sm">Your wishlist is empty</p>
                <p className="text-[#8B7E74] text-xs mt-1 max-w-xs mx-auto">
                  Save the pieces you love and they&apos;ll show up here.
                </p>
                <Link
                  href="/collection"
                  className="mt-6 inline-block bg-[#3A0E1F] hover:bg-[#5C1A34] text-white font-semibold py-3 px-7 rounded-full text-sm transition-colors"
                >
                  Explore the collection
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-4">
                {wishlistItems.map((item) => (
                  <div
                    key={item.id}
                    className="group relative bg-[#FAF6F0] rounded-2xl border border-[#EFE6DA] overflow-hidden"
                  >
                    <button
                      onClick={() => removeFromWishlist(item.id)}
                      className="absolute top-3 right-3 z-10 p-1.5 bg-white/90 hover:bg-white rounded-full shadow-sm text-[#8B7E74] hover:text-[#3A0E1F] transition-colors"
                      title="Remove from wishlist"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>

                    <Link href={`/product?id=${item.id}`} className="block relative h-52 w-full bg-white">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover object-top" />
                    </Link>

                    <div className="p-4 text-center">
                      <Link href={`/product?id=${item.id}`}>
                        <h3 className="text-xs font-semibold text-[#2A211D] truncate hover:text-[#3A0E1F]">
                          {item.name}
                        </h3>
                      </Link>
                      <div className="mt-1.5 flex items-center justify-center gap-2">
                        <span className="text-sm font-bold text-[#2A211D]">{item.price}</span>
                        {item.originalPrice && (
                          <span className="text-xs text-[#8B7E74] line-through">{item.originalPrice}</span>
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
                        className="mt-3 w-full flex items-center justify-center gap-1.5 bg-[#3A0E1F] hover:bg-[#5C1A34] text-white font-semibold py-2 rounded-lg text-[11px] uppercase tracking-wider transition-colors"
                      >
                        <ShoppingBag className="w-3.5 h-3.5" />
                        Add to bag
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* You might also like */}
          <div className="bg-white rounded-2xl border border-[#EFE6DA] p-6 sm:p-8">
            <div className="flex items-center justify-between mb-6 pb-5 border-b border-[#EFE6DA]">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#B08D57]" />
                <h3 className="font-serif text-lg text-[#2A211D]">You might also like</h3>
              </div>
              <Link
                href="/bright"
                className="text-xs font-semibold text-[#B08D57] hover:underline flex items-center gap-1"
              >
                View all <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {recommendedProducts.map((rec) => (
                <div
                  key={rec.id}
                  className="bg-[#FAF6F0] rounded-2xl border border-[#EFE6DA] p-4 flex flex-col justify-between"
                >
                  <div>
                    <div className="relative h-48 w-full bg-white rounded-xl overflow-hidden mb-3 border border-[#EFE6DA]">
                      <img src={rec.image} alt={rec.name} className="w-full h-full object-cover object-top" />
                    </div>
                    <h4 className="text-xs font-semibold text-[#2A211D] truncate">{rec.name}</h4>
                    <div className="mt-1.5 flex items-center gap-2">
                      <span className="text-sm font-bold text-[#2A211D]">{rec.price}</span>
                      <span className="text-xs text-[#8B7E74] line-through">{rec.originalPrice}</span>
                    </div>
                  </div>
                  <Link
                    href="/bright"
                    className="mt-3 w-full flex items-center justify-center bg-white border border-[#EFE6DA] text-[#2A211D] font-semibold py-2 rounded-xl text-[11px] uppercase tracking-wider transition-colors hover:bg-[#3A0E1F] hover:text-white hover:border-[#3A0E1F]"
                  >
                    View product
                  </Link>
                </div>
              ))}
            </div>
          </div>

        </div>
      </main>
    </div>
    
  );
}