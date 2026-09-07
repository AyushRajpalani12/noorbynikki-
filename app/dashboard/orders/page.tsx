'use client';

import React from 'react';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import DashboardSidebar from '@/app/dashboardsidebar/page';
import { ShoppingBag, X, ArrowRight, Clock } from 'lucide-react';

export default function DashboardOrdersPage() {
  const { cartItems = [], removeFromCart, updateQuantity } = useCart() as any;

  const subtotal = cartItems.reduce((acc: number, item: any) => {
    const rawPrice =
      typeof item.price === 'string'
        ? Number(item.price.replace(/[^0-9.-]+/g, ''))
        : item.price || 0;
    return acc + rawPrice * (item.quantity || 1);
  }, 0);

  return (
    <div className="min-h-screen bg-[#3A0E1F] flex flex-col lg:flex-row">
      <DashboardSidebar />

      <main className="flex-1 lg:ml-64 bg-[#FAF6F0] flex flex-col">

        {/* Top bar - Increased mobile left padding to pl-16 to completely avoid overlapping with the hamburger menu */}
        <div className="fixed top-0 left-0 right-0 lg:left-64 z-30 h-16 flex items-center justify-between bg-[#FAF6F0]/95 backdrop-blur border-b border-[#EFE6DA] pl-16 pr-4 sm:px-6">
          <p className="font-serif text-sm sm:text-[15px] text-[#2A211D] font-medium tracking-wide truncate">
            My Orders
          </p>
        </div>

        <div className="flex-1 pt-16 px-4 pb-4 sm:px-6 sm:pb-6 flex flex-col gap-5">

          {/* Orders panel */}
          <div className="bg-white rounded-2xl border border-[#EFE6DA] p-6 sm:p-8">
            <div className="flex items-center justify-between mb-6 pb-5 border-b border-[#EFE6DA]">
              <div>
                <h3 className="font-serif text-lg text-[#2A211D]">My orders</h3>
                <p className="text-xs text-[#8B7E74] mt-1">
                  Items currently in your cart, ready to check out
                </p>
              </div>
              <Clock className="w-5 h-5 text-[#B08D57]" />
            </div>

            {cartItems.length === 0 ? (
              <div className="text-center py-14">
                <div className="w-14 h-14 bg-[#FAF6F0] text-[#3A0E1F] rounded-full flex items-center justify-center mx-auto mb-4 border border-[#EFE6DA]">
                  <ShoppingBag className="w-6 h-6" />
                </div>
                <p className="text-[#2A211D] font-semibold text-sm">No orders placed yet</p>
                <p className="text-[#8B7E74] text-xs mt-1 max-w-xs mx-auto">
                  When you place an order from our store, it will appear here.
                </p>
                <Link
                  href="/collection"
                  className="mt-6 inline-block bg-[#3A0E1F] hover:bg-[#5C1A34] text-white font-semibold py-3 px-7 rounded-full text-sm transition-colors"
                >
                  Start shopping
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
                {cartItems.map((item: any, index: number) => (
                  <div
                    key={item.id || index}
                    className="relative bg-[#FAF6F0] border border-[#EFE6DA] rounded-2xl p-4 flex gap-4"
                  >
                    <button
                      onClick={() => removeFromCart && removeFromCart(item.id)}
                      className="absolute top-3 right-3 text-[#8B7E74] hover:text-[#3A0E1F] p-1"
                      title="Remove item"
                    >
                      <X className="w-4 h-4" />
                    </button>

                    <img
                      src={
                        item.image ||
                        item.img ||
                        'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&q=80&w=200'
                      }
                      alt={item.name || item.title}
                      className="w-20 h-24 object-cover rounded-xl border border-[#EFE6DA] shrink-0"
                    />

                    <div className="flex-1 pr-5">
                      <h4 className="font-serif font-semibold text-[#2A211D] text-sm leading-snug">
                        {item.name || item.title}
                      </h4>
                      <p className="text-xs text-[#8B7E74] mt-1">
                        Size: <span className="text-[#2A211D] font-medium">{item.size || 'M'}</span>
                      </p>
                      <p className="text-[#B08D57] font-semibold text-sm mt-2">
                        {typeof item.price === 'number'
                          ? `₹${item.price.toLocaleString()}.00`
                          : item.price}
                      </p>

                      <div className="flex items-center border border-[#EFE6DA] rounded-lg w-fit bg-white mt-3">
                        <button
                          onClick={() =>
                            updateQuantity && updateQuantity(item.id, (item.quantity || 1) - 1)
                          }
                          className="px-2.5 py-1 text-[#8B7E74] hover:text-[#3A0E1F] text-sm font-bold"
                        >
                          −
                        </button>
                        <span className="px-2.5 py-1 text-xs font-semibold text-[#2A211D]">
                          {item.quantity || 1}
                        </span>
                        <button
                          onClick={() =>
                            updateQuantity && updateQuantity(item.id, (item.quantity || 1) + 1)
                          }
                          className="px-2.5 py-1 text-[#8B7E74] hover:text-[#3A0E1F] text-sm font-bold"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Subtotal + checkout, only when there's something in the cart */}
          {cartItems.length > 0 && (
            <div className="bg-white rounded-2xl border border-[#EFE6DA] p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <p className="text-xs text-[#8B7E74]">Cart subtotal</p>
                <p className="font-serif text-2xl text-[#2A211D] mt-1">
                  ₹{subtotal.toLocaleString()}.00
                </p>
              </div>
              <Link
                href="/cart"
                className="inline-flex items-center justify-center gap-2 bg-[#3A0E1F] hover:bg-[#5C1A34] text-white font-semibold py-3 px-7 rounded-full text-sm transition-colors"
              >
                Go to checkout
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          )}

        </div>
      </main>
    </div>
  );
}