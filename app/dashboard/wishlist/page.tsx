'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import DashboardSidebar from '@/app/dashboardsidebar/page';
import { Heart, X, ShoppingBag, ArrowRight, Sparkles, Loader2 } from 'lucide-react';
import api from '@/lib/api';

interface WishlistItem {
  _id: string;
  title: string;
  slug: string;
  price: number;
  discountPrice?: number;
  images: string[];
}

export default function DashboardWishlistPage() {
  const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [removingId, setRemovingId] = useState<string | null>(null);
  const [addingToCartId, setAddingToCartId] = useState<string | null>(null);
  // Har product ke liye selected size store karne ke liye
const [selectedSizes, setSelectedSizes] = useState<{ [key: string]: string }>({});

// Size change handler
const handleSizeChange = (productId: string, size: string) => {
  setSelectedSizes((prev) => ({ ...prev, [productId]: size }));
};

  const { addToCart } = useCart() as any;
const handleAddToCart = async (product: WishlistItem) => {
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;

  if (!token) {
    alert('Please login to add items to bag');
    return;
  }

  // Agar user ne size nahi chuna, toh default pehla available size ya 'M' lein
  const chosenSize = selectedSizes[product._id] || (product.sizes?.[0] ? (typeof product.sizes[0] === 'string' ? product.sizes[0] : (product.sizes[0] as any).size) : 'M');

  if (!chosenSize) {
    alert('Please select a size first');
    return;
  }

  try {
    setAddingToCartId(product._id);

    const res = await api.post(
      '/cart/add',
      {
        productId: product._id,
        quantity: 1,
        size: chosenSize, // Selected size jaayega yahan
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const resData = res.data || res;

    if (resData.success || res.status === 200 || res.status === 201) {
      alert(`Item (${chosenSize}) added to bag! 🛍️`);

      if (addToCart) {
        addToCart({
          productId: product._id,
          title: product.title,
          price: product.discountPrice || product.price,
          image: product.images?.[0] || '',
          quantity: 1,
          size: chosenSize,
        });
      }
    }
  } catch (error: any) {
    console.error('Failed to add to cart:', error.response?.data || error.message);
    alert(error.response?.data?.message || 'Failed to add item to bag');
  } finally {
    setAddingToCartId(null);
  }
};
  // 1. Fetch Wishlist from DB
  const fetchWishlist = async () => {
    try {
      setLoading(true);
      const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;

      if (!token) {
        console.warn('Dashboard: User is not logged in');
        setWishlistItems([]);
        return;
      }

      const res = await api.get('/wishlist', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const resData = res.data || res;
      if (resData.success && Array.isArray(resData.data)) {
        setWishlistItems(resData.data);
      }
    } catch (error: any) {
      console.error('Failed to load dashboard wishlist:', error.response?.data || error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWishlist();
  }, []);

  // 2. Remove Single Item (DELETE /api/wishlist/:productId)
  const handleRemove = async (productId: string) => {
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;

    if (!token) {
      alert('Session expired. Please login again.');
      return;
    }

    try {
      setRemovingId(productId);

      // Instant UI update
      setWishlistItems((prev) => prev.filter((item) => item._id !== productId));

      await api.delete(`/wishlist/${productId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    } catch (error: any) {
      console.error('Failed to remove item:', error.response?.data || error.message);
      // Revert back on error
      fetchWishlist();
    } finally {
      setRemovingId(null);
    }
  };

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
        <div className="fixed top-0 left-0 right-0 lg:left-64 z-30 h-16 flex items-center justify-between bg-[#FAF6F0]/95 backdrop-blur border-b border-[#EFE6DA] pl-16 pr-4 sm:px-6">
          <p className="font-serif text-sm sm:text-[15px] text-[#2A211D] font-medium tracking-wide truncate">
            Wishlist
          </p>
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

            {loading ? (
              <div className="flex justify-center items-center py-16">
                <Loader2 className="w-8 h-8 text-[#3A0E1F] animate-spin" />
              </div>
            ) : wishlistItems.length === 0 ? (
              <div className="text-center py-14">
                <div className="w-14 h-14 bg-[#FAF6F0] text-[#3A0E1F] rounded-full flex items-center justify-center mx-auto mb-4 border border-[#EFE6DA]">
                  <Heart className="w-6 h-6" />
                </div>
                <p className="text-[#2A211D] font-semibold text-sm">Your wishlist is empty</p>
                <p className="text-[#8B7E74] text-xs mt-1 max-w-xs mx-auto">
                  Save the pieces you love and they&apos;ll show up here.
                </p>
                <Link
                  href="/all-collection"
                  className="mt-6 inline-block bg-[#3A0E1F] hover:bg-[#5C1A34] text-white font-semibold py-3 px-7 rounded-full text-sm transition-colors"
                >
                  Explore the collection
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-4">
                {wishlistItems.map((item) => {
                  const displayPrice = item.discountPrice || item.price;
                  const originalPrice = item.discountPrice ? item.price : null;
                  const itemImage = item.images?.[0] || '/placeholder.png';
                  const productUrl = `/product/${item.slug || item._id}`;

                  return (
                    <div
                      key={item._id}
                      className="group relative bg-[#FAF6F0] rounded-2xl border border-[#EFE6DA] overflow-hidden"
                    >
                      <button
                        onClick={() => handleRemove(item._id)}
                        disabled={removingId === item._id}
                        className="absolute top-3 right-3 z-10 p-1.5 bg-white/90 hover:bg-white rounded-full shadow-sm text-[#8B7E74] hover:text-[#3A0E1F] transition-colors cursor-pointer"
                        title="Remove from wishlist"
                      >
                        {removingId === item._id ? (
                          <Loader2 className="w-3.5 h-3.5 animate-spin" />
                        ) : (
                          <X className="w-3.5 h-3.5" />
                        )}
                      </button>

                      <Link href={productUrl} className="block relative h-52 w-full bg-white">
                        <img
                          src={itemImage}
                          alt={item.title}
                          className="w-full h-full object-cover object-top"
                        />
                      </Link>

                      <div className="p-4 text-center">
                        <Link href={productUrl}>
                          <h3 className="text-xs font-semibold text-[#2A211D] truncate hover:text-[#3A0E1F]">
                            {item.title}
                          </h3>
                        </Link>
                        <div className="mt-1.5 flex items-center justify-center gap-2">
                          <span className="text-sm font-bold text-[#2A211D]">
                            ₹{displayPrice.toLocaleString('en-IN')}
                          </span>
                          {originalPrice && (
                            <span className="text-xs text-[#8B7E74] line-through">
                              ₹{originalPrice.toLocaleString('en-IN')}
                            </span>
                          )}
                        </div>
{/* Size Selector */}
<div className="mt-2 flex items-center justify-center gap-1.5">
  <span className="text-[11px] text-[#8B7E74]">Size:</span>
  <select
    value={selectedSizes[item._id] || 'M'}
    onChange={(e) => handleSizeChange(item._id, e.target.value)}
    className="text-xs bg-white border border-[#EFE6DA] rounded px-2 py-1 text-[#2A211D] focus:outline-none focus:border-[#3A0E1F]"
  >
    {item.sizes && item.sizes.length > 0 ? (
      item.sizes.map((s: any) => {
        const sizeLabel = typeof s === 'string' ? s : s.size;
        return (
          <option key={sizeLabel} value={sizeLabel}>
            {sizeLabel}
          </option>
        );
      })
    ) : (
      <>
        <option value="XS">XS</option>
        <option value="S">S</option>
        <option value="M">M</option>
        <option value="L">L</option>
        <option value="XL">XL</option>
      </>
    )}
  </select>
</div>

{/* Add to Bag Button */}
<button
  onClick={() => handleAddToCart(item)}
  disabled={addingToCartId === item._id}
  className="mt-3 w-full flex items-center justify-center gap-1.5 bg-[#3A0E1F] hover:bg-[#5C1A34] text-white font-semibold py-2 rounded-lg text-[11px] uppercase tracking-wider transition-colors cursor-pointer disabled:opacity-60"
>
  {addingToCartId === item._id ? (
    <Loader2 className="w-3.5 h-3.5 animate-spin" />
  ) : (
    <ShoppingBag className="w-3.5 h-3.5" />
  )}
  {addingToCartId === item._id ? 'Adding...' : 'Add to bag'}
</button>
                        {/* <button
  onClick={() => handleAddToCart(item)}
  disabled={addingToCartId === item._id}
  className="mt-3 w-full flex items-center justify-center gap-1.5 bg-[#3A0E1F] hover:bg-[#5C1A34] text-white font-semibold py-2 rounded-lg text-[11px] uppercase tracking-wider transition-colors cursor-pointer disabled:opacity-60"
>
  {addingToCartId === item._id ? (
    <Loader2 className="w-3.5 h-3.5 animate-spin" />
  ) : (
    <ShoppingBag className="w-3.5 h-3.5" />
  )}
  {addingToCartId === item._id ? 'Adding...' : 'Add to bag'}
</button> */}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* You might also like section */}
          <div className="bg-white rounded-2xl border border-[#EFE6DA] p-6 sm:p-8">
            <div className="flex items-center justify-between mb-6 pb-5 border-b border-[#EFE6DA]">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#B08D57]" />
                <h3 className="font-serif text-lg text-[#2A211D]">You might also like</h3>
              </div>
              <Link
                href="/all-collection"
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
                      <img
                        src={rec.image}
                        alt={rec.name}
                        className="w-full h-full object-cover object-top"
                      />
                    </div>
                    <h4 className="text-xs font-semibold text-[#2A211D] truncate">{rec.name}</h4>
                    <div className="mt-1.5 flex items-center gap-2">
                      <span className="text-sm font-bold text-[#2A211D]">{rec.price}</span>
                      <span className="text-xs text-[#8B7E74] line-through">{rec.originalPrice}</span>
                    </div>
                  </div>
                  <Link
                    href="/all-collection"
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