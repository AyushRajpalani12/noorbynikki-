'use client';

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { ShoppingBag, User, Menu, X, ChevronRight, ArrowLeft, Trash2, Heart, ShieldAlert, Loader2 } from "lucide-react";
import { useWishlist } from "@/context/WishlistContext";
import api from "@/lib/api";

export default function Navbar() {
  const { wishlistCount = 0 } = useWishlist() as { wishlistCount?: number };

  // Local Cart State for Real API Data
  const [cartItems, setCartItems] = useState<any[]>([]);
  const [cartLoading, setCartLoading] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const [parsedUser, setParsedUser] = useState<{ name?: string } | null>(null);
  const [isMounted, setIsMounted] = useState(false);

  // Helper function to get token
  const getToken = () => {
    if (typeof window === "undefined") return null;
    return localStorage.getItem('token');
  };

  // 1. Fetch Cart from Backend (GET /api/cart)
  const fetchCart = async () => {
    const token = getToken();
    if (!token) {
      setCartItems([]);
      return;
    }

    try {
      setCartLoading(true);
      const res = await api.get('/cart', {
        headers: { Authorization: `Bearer ${token}` }
      });
      const resData = res.data || res;

      // Backend cart items array ko set karein
      // (Agar backend cart.items bhej raha ho toh resData.data.items ya resData.data)
      const items = resData.data?.items || resData.data || [];
      setCartItems(Array.isArray(items) ? items : []);
    } catch (error: any) {
      console.error("Cart fetch error:", error.response?.data || error.message);
    } finally {
      setCartLoading(false);
    }
  };

  // 2. Remove Item from Cart (DELETE /api/cart/:itemId)
  const handleRemoveFromCart = async (itemId: string) => {
    const token = getToken();
    if (!token) return;

    try {
      // Optimistic update
      setCartItems((prev) => prev.filter((item) => (item._id || item.id) !== itemId));

      await api.delete(`/cart/item/${itemId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
    } catch (error: any) {
      console.error("Remove from cart failed:", error.response?.data || error.message);
      fetchCart();
    }
  };

  // 3. Update Quantity (PUT /api/cart/:itemId)
  const handleUpdateQuantity = async (itemId: string, newQty: number) => {
    if (newQty <= 0) {
      handleRemoveFromCart(itemId);
      return;
    }

    const token = getToken();
    if (!token) return;

    try {
      // Optimistic update
      setCartItems((prev) =>
        prev.map((item) =>
          (item._id || item.id) === itemId ? { ...item, quantity: newQty } : item
        )
      );

      await api.put(
        `/cart/item/${itemId}`,
        { quantity: newQty },
        { headers: { Authorization: `Bearer ${token}` } }
      );
    } catch (error: any) {
      console.error("Update qty error:", error.response?.data || error.message);
      fetchCart();
    }
  };

  // Safe user check
  const checkUser = () => {
    if (typeof window === "undefined") return;
    const currentUser = localStorage.getItem('currentUser');
    if (currentUser) {
      try {
        setParsedUser(JSON.parse(currentUser));
      } catch {
        setParsedUser(null);
      }
    } else {
      setParsedUser(null);
    }
  };

  useEffect(() => {
    setIsMounted(true);
    checkUser();
    fetchCart();

    window.addEventListener('storage', checkUser);
    window.addEventListener('authChange', checkUser);
    window.addEventListener('cartUpdated', fetchCart); // Custom event for global cart sync

    return () => {
      window.removeEventListener('storage', checkUser);
      window.removeEventListener('authChange', checkUser);
      window.removeEventListener('cartUpdated', fetchCart);
    };
  }, []);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "All Collection", href: "/collection" },
    { name: "Shope New Latest", href: "/Shopenewlatest" },
    { name: "Bright", href: "/bright" },
    { name: "Contact", href: "/contact" },
  ];

  // Total items count
  const cartCount = cartItems.reduce((acc, item) => acc + (item.quantity || 1), 0);

  // Total price calculation
  const totalPrice = cartItems.reduce((acc, item) => {
    const rawPrice = item.product?.discountPrice || item.product?.price || item.price || 0;
    const cleanPrice = typeof rawPrice === 'string'
      ? Number(rawPrice.replace(/[^0-9.-]+/g, ""))
      : Number(rawPrice);
    return acc + (cleanPrice * (item.quantity || 1));
  }, 0);

  return (
    <>
      <header className="fixed top-0 left-0 w-full z-50 bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">

          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="md:hidden text-gray-700 hover:text-rose-600 p-1 rounded-lg transition-colors focus:outline-none"
              aria-label="Open Menu"
            >
              <Menu className="w-6 h-6" />
            </button>

            <Link href="/" className="text-xl sm:text-2xl font-bold tracking-wider text-rose-600 font-serif">
              KURTI<span className="text-gray-800">STORE</span>
            </Link>
          </div>

          <nav className="hidden md:flex items-center space-x-6 font-medium text-sm tracking-wide">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`relative py-1 transition-colors ${
                    isActive ? "text-rose-600 font-semibold" : "text-gray-700 hover:text-rose-600"
                  }`}
                >
                  {link.name}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-rose-600 rounded-full" />
                  )}
                </Link>
              );
            })}

            {/* ADMIN / DASHBOARD LINK */}
            <Link
              href="/dashboard"
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border transition-all ${
                pathname === "/dashboard"
                  ? "bg-rose-600 text-white border-rose-600 font-semibold shadow-sm"
                  : "bg-gray-50 text-gray-700 border-gray-200 hover:bg-rose-50 hover:text-rose-600 hover:border-rose-200"
              }`}
            >
              <ShieldAlert className="w-4 h-4" />
              <span>Admin</span>
            </Link>
          </nav>

          <div className="flex items-center space-x-2 sm:space-x-4 text-gray-700">
            {/* User Profile */}
            <Link
              href={parsedUser ? "/account" : "/login"}
              className="hover:text-rose-600 p-1.5 rounded-full hover:bg-rose-50 transition-colors flex items-center gap-1.5 text-xs font-medium"
              aria-label="Account"
              suppressHydrationWarning
            >
              <User className="w-5 h-5" />
              {isMounted && parsedUser && parsedUser.name && (
                <span className="hidden lg:inline max-w-[90px] truncate font-semibold text-gray-800">
                  {parsedUser.name.split(' ')[0]}
                </span>
              )}
            </Link>

            {/* Wishlist Link */}
            <Link
              href="/dashboard/wishlist"
              className="hover:text-rose-600 p-1.5 rounded-full hover:bg-rose-50 transition-colors relative"
              aria-label="Wishlist"
            >
              <Heart className="w-5 h-5" />
              {wishlistCount > 0 && (
                <span className="absolute top-0 right-0 bg-rose-600 text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center animate-pulse">
                  {wishlistCount}
                </span>
              )}
            </Link>

            {/* Cart Button */}
            <button
              onClick={() => {
                setIsCartOpen(true);
                fetchCart(); // Har baar open hone par latest cart fetch karein
              }}
              className="hover:text-rose-600 p-1.5 rounded-full hover:bg-rose-50 transition-colors relative cursor-pointer"
              aria-label="Cart"
            >
              <ShoppingBag className="w-5 h-5" />
              <span
                className={`absolute top-0 right-0 text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center ${
                  cartCount > 0 ? "bg-rose-600 animate-pulse" : "bg-gray-400"
                }`}
              >
                {cartCount}
              </span>
            </button>
          </div>

        </div>
      </header>

      <div className="h-16" />

      {/* CART SLIDE-OVER DRAWER */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
            onClick={() => setIsCartOpen(false)}
          />
          <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
            <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col">

              <div className="p-4 border-b border-gray-100 flex items-center justify-between bg-amber-50/30">
                <div className="flex items-center gap-2 text-amber-900 font-medium text-sm">
                  <ArrowLeft className="w-5 h-5 cursor-pointer" onClick={() => setIsCartOpen(false)} />
                  <span>Cart Items ({cartCount})</span>
                </div>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="p-1.5 rounded-full text-gray-500 hover:bg-gray-100"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-4 sm:p-6">
                {cartLoading ? (
                  <div className="h-full flex items-center justify-center">
                    <Loader2 className="w-8 h-8 text-rose-600 animate-spin" />
                  </div>
                ) : cartItems.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center">
                    <div className="w-20 h-20 bg-amber-100/60 rounded-full flex items-center justify-center mb-4 text-amber-700">
                      <ShoppingBag className="w-10 h-10" />
                    </div>
                    <h3 className="text-xl font-serif font-bold text-gray-800 tracking-wide mb-2">
                      YOUR CART IS EMPTY
                    </h3>
                    <p className="text-gray-500 text-sm max-w-xs mb-6 font-light">
                      Add something beautiful to your cart.
                    </p>
                    <button
                      onClick={() => setIsCartOpen(false)}
                      className="bg-[#b9381e] hover:bg-[#a03019] text-white font-bold py-3 px-8 rounded-full shadow-lg transition-all text-xs tracking-wider uppercase"
                    >
                      CONTINUE SHOPPING
                    </button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {cartItems.map((item: any, index: number) => {
                      const productObj = item.product || item;
                      const title = productObj.title || productObj.name || "Product";
                      const image = productObj.images?.[0] || productObj.image || "/placeholder.png";
                      const price = productObj.discountPrice || productObj.price || item.price || 0;
                      const itemId = item._id || item.id;

                      return (
                        <div key={itemId || index} className="flex gap-4 p-3 bg-gray-50 rounded-xl border border-gray-100 relative items-center">
                          <img
                            src={image}
                            alt={title}
                            className="w-16 h-20 object-cover rounded-lg border border-gray-200"
                          />
                          <div className="flex-1 min-w-0 pr-6">
                            <h4 className="font-medium text-gray-900 text-sm truncate">{title}</h4>
                            <p className="text-xs text-gray-500 mt-0.5">Size: <span className="font-semibold text-gray-700">{item.size || 'M'}</span></p>
                            <p className="text-rose-600 font-bold text-sm mt-1">₹{Number(price).toLocaleString('en-IN')}</p>

                            {/* Quantity Controls */}
                            <div className="flex items-center border border-gray-200 rounded mt-2 w-fit bg-white text-xs">
                              <button
                                onClick={() => handleUpdateQuantity(itemId, (item.quantity || 1) - 1)}
                                className="px-2 py-0.5 font-bold text-gray-600 hover:text-black cursor-pointer"
                              >
                                -
                              </button>
                              <span className="px-2 py-0.5 font-semibold text-gray-800">{item.quantity || 1}</span>
                              <button
                                onClick={() => handleUpdateQuantity(itemId, (item.quantity || 1) + 1)}
                                className="px-2 py-0.5 font-bold text-gray-600 hover:text-black cursor-pointer"
                              >
                                +
                              </button>
                            </div>
                          </div>

                          {/* Delete Item */}
                          <button
                            onClick={() => handleRemoveFromCart(itemId)}
                            className="absolute top-3 right-3 text-gray-400 hover:text-red-600 p-1 transition-colors cursor-pointer"
                            title="Remove item"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

              {cartItems.length > 0 && (
                <div className="p-4 border-t border-gray-100 bg-white space-y-3">
                  <div className="flex justify-between items-center text-sm font-semibold text-gray-800">
                    <span>Subtotal:</span>
                    <span className="text-rose-600 font-bold text-lg">₹{totalPrice.toLocaleString('en-IN')}</span>
                  </div>
                  <Link
                    href="/cart"
                    onClick={() => setIsCartOpen(false)}
                    className="block w-full bg-rose-600 hover:bg-rose-700 text-white text-center py-3.5 rounded-xl font-bold uppercase text-xs tracking-wider shadow-md transition-colors"
                  >
                    VIEW FULL CART & CHECKOUT
                  </Link>
                </div>
              )}

            </div>
          </div>
        </div>
      )}

      {/* MOBILE DRAWER */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setIsMobileMenuOpen(false)} />
          <div className="fixed inset-y-0 left-0 w-[80%] max-w-sm bg-white shadow-2xl z-50 flex flex-col justify-between">
            <div>
              <div className="p-4 border-b border-gray-100 flex items-center justify-between">
                <Link href="/" onClick={() => setIsMobileMenuOpen(false)} className="text-xl font-bold tracking-wider text-rose-600 font-serif">
                  KURTI<span className="text-gray-800">STORE</span>
                </Link>
                <button onClick={() => setIsMobileMenuOpen(false)} className="p-1.5 rounded-full text-gray-500 hover:bg-gray-100">
                  <X className="w-6 h-6" />
                </button>
              </div>
              <nav className="p-4 space-y-1">
                {navLinks.map((link) => {
                  const isActive = pathname === link.href;
                  return (
                    <Link
                      key={link.name}
                      href={link.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={`flex items-center justify-between px-4 py-3 rounded-xl font-medium text-sm transition-all ${
                        isActive ? "bg-rose-50 text-rose-600 font-semibold" : "text-gray-800 hover:bg-gray-50"
                      }`}
                    >
                      <span>{link.name}</span>
                      <ChevronRight className={`w-4 h-4 ${isActive ? "text-rose-600" : "text-gray-400"}`} />
                    </Link>
                  );
                })}

                <Link
                  href="/dashboard"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`flex items-center justify-between px-4 py-3 rounded-xl font-medium text-sm transition-all mt-2 border ${
                    pathname === "/dashboard"
                      ? "bg-rose-600 text-white border-rose-600 font-semibold"
                      : "bg-gray-50 text-gray-800 border-gray-200 hover:bg-rose-50 hover:text-rose-600"
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <ShieldAlert className="w-4 h-4" />
                    <span>Admin Dashboard</span>
                  </div>
                  <ChevronRight className="w-4 h-4" />
                </Link>
              </nav>
            </div>
            <div className="p-4 border-t border-gray-100 bg-gray-50">
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  setIsCartOpen(true);
                  fetchCart();
                }}
                className="flex items-center justify-between w-full bg-rose-600 text-white font-semibold py-3 px-4 rounded-xl text-xs uppercase tracking-wider shadow-md hover:bg-rose-700"
              >
                <div className="flex items-center gap-2">
                  <ShoppingBag className="w-4 h-4" />
                  <span>View Shopping Bag</span>
                </div>
                <span className="bg-white/20 px-2 py-0.5 rounded-full text-[10px]">
                  {cartCount} Items
                </span>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}