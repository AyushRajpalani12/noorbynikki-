'use client';

import React from 'react';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import { ShoppingBag, X, ShieldCheck, Truck, Lock, ArrowRight } from 'lucide-react';

export default function CartPage() {
  const { cartItems = [], removeFromCart, updateQuantity, cartCount } = useCart() as any;

  // Calculate total price accurately
  const subtotal = cartItems.reduce((acc: number, item: any) => {
    const rawPrice = typeof item.price === 'string' 
      ? Number(item.price.replace(/[^0-9.-]+/g, "")) 
      : (item.price || 0);
    return acc + (rawPrice * (item.quantity || 1));
  }, 0);

  const handleCheckout = () => {
    const whatsappNumber = '918385973582';
    const itemsList = cartItems
      .map(
        (item: any, i: number) =>
          `${i + 1}. ${item.name || item.title}\n   Size: ${item.size || 'M'} | Qty: ${item.quantity || 1} | ${item.price}`
      )
      .join('\n\n');
    const message = encodeURIComponent(
      `Hello! I want to place an order:\n\n${itemsList}\n\n*Total: ₹${subtotal.toLocaleString()}.00*`
    );
    window.open(`https://wa.me/${whatsappNumber}?text=${message}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-gray-50/50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-serif font-bold text-gray-900 mb-8">
          Shopping Cart ({cartCount || cartItems.length})
        </h1>

        {cartItems.length === 0 ? (
          <div className="bg-white rounded-2xl p-12 text-center shadow-sm border border-gray-100 max-w-4xl mx-auto">
            <div className="w-20 h-20 bg-amber-50 text-amber-700 rounded-full flex items-center justify-center mx-auto mb-4">
              <ShoppingBag className="w-10 h-10" />
            </div>
            <h2 className="text-xl font-serif font-bold text-gray-800 mb-2">YOUR CART IS EMPTY</h2>
            <p className="text-gray-500 text-sm mb-6 font-light">Add something beautiful to your cart.</p>
            <Link 
              href="/collection" 
              className="inline-flex items-center gap-2 bg-[#b9381e] hover:bg-[#a03019] text-white font-bold py-3 px-8 rounded-full text-xs uppercase tracking-wider transition-colors shadow-lg"
            >
              <span>Continue Shopping</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            
            {/* Left Side: Cart Items List & Trust Badges */}
            <div className="lg:col-span-2 space-y-4">
              {cartItems.map((item: any, index: number) => (
                <div key={item.id || index} className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex gap-4 relative">
                  <button 
                    onClick={() => removeFromCart && removeFromCart(item.id)}
                    className="absolute top-4 right-4 text-gray-400 hover:text-red-600 p-1"
                    title="Remove item"
                  >
                    <X className="w-5 h-5" />
                  </button>

                  <img 
                    src={item.image || item.img || "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&q=80&w=200"} 
                    alt={item.name || item.title} 
                    className="w-24 h-28 object-cover rounded-xl border border-gray-100 shrink-0"
                  />

                  <div className="flex-1 pr-6">
                    <h3 className="font-serif font-bold text-gray-900 text-base mb-1">
                      {item.name || item.title}
                    </h3>
                    <p className="text-sm text-gray-500 mb-2">Size: <span className="font-semibold text-gray-700">{item.size || 'M'}</span></p>
                    
                    <p className="text-rose-600 font-bold text-lg mb-4">
                      {typeof item.price === 'number' ? `₹${item.price.toLocaleString()}.00` : item.price}
                    </p>

                    {/* Quantity Controls */}
                    <div className="flex items-center border border-gray-200 rounded-lg w-fit bg-gray-50">
                      <button 
                        onClick={() => updateQuantity && updateQuantity(item.id, (item.quantity || 1) - 1)}
                        className="px-3 py-1 text-gray-600 hover:text-black font-bold"
                      >
                        -
                      </button>
                      <span className="px-3 py-1 text-sm font-semibold text-gray-800">{item.quantity || 1}</span>
                      <button 
                        onClick={() => updateQuantity && updateQuantity(item.id, (item.quantity || 1) + 1)}
                        className="px-3 py-1 text-gray-600 hover:text-black font-bold"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              ))}

              {/* Trust Badges */}
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 grid grid-cols-3 gap-4 text-center">
                <div className="flex flex-col items-center">
                  <ShieldCheck className="w-6 h-6 text-amber-700 mb-1" />
                  <span className="text-xs font-medium text-gray-700">Trusted by Customers</span>
                </div>
                <div className="flex flex-col items-center border-x border-gray-100 px-2">
                  <Truck className="w-6 h-6 text-amber-700 mb-1" />
                  <span className="text-xs font-medium text-gray-700">100% Money Back</span>
                </div>
                <div className="flex flex-col items-center">
                  <Lock className="w-6 h-6 text-amber-700 mb-1" />
                  <span className="text-xs font-medium text-gray-700">Secure Payment</span>
                </div>
              </div>
            </div>

            {/* Right Side: Order Summary (Sticky) */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 lg:sticky lg:top-8 space-y-4">
              <h3 className="font-serif font-bold text-lg text-gray-900 border-b pb-3">Order Summary</h3>
              
              <div className="flex justify-between text-sm text-gray-600">
                <span>Cart Subtotal</span>
                <span className="font-semibold text-gray-900">₹{subtotal.toLocaleString()}.00</span>
              </div>
              <div className="flex justify-between text-sm text-gray-600">
                <span>Delivery Charge</span>
                <span className="font-medium text-amber-800 text-xs">Calculated at checkout</span>
              </div>

              <div className="flex justify-between text-lg font-bold text-gray-900 border-t pt-3">
                <span>Total</span>
                <span className="text-rose-600">₹{subtotal.toLocaleString()}.00</span>
              </div>

              <button 
                onClick={handleCheckout}
                className="w-full bg-[#b9381e] hover:bg-[#a03019] text-white font-bold py-3.5 rounded-xl uppercase tracking-wider text-xs shadow-lg transition-colors cursor-pointer"
              >
                PROCEED TO CHECKOUT
              </button>

              <div className="flex items-center justify-center gap-1.5 text-[11px] text-gray-400 mt-2">
                <Lock className="w-3.5 h-3.5" />
                <span>Your payment details are 100% secure.</span>
              </div>
            </div>

          </div>
        )}
      </div>
    </div>
  );
}