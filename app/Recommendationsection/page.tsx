"use client";
import React, { useState } from "react";

// Mock recommended products data (Aap apne actual products data se replace kar sakte hain)
const recommendedProducts = [
  {
    id: 101,
    name: "EMBROIDERED FESTIVE ANARKALI SUIT",
    price: 3999,
    image: "/dress1.png", // Apne public folder ki image ka path dein
  },
  {
    id: 102,
    name: "ROYAL BLUE CHINON SILK SUIT SET",
    price: 2899,
    image: "/dress2.png",
  },
  {
    id: 103,
    name: "PASTEL GREEN ETHNIC KURTI SET",
    price: 2499,
    image: "/dress3.png",
  },
];

export default function WishlistPage() {
  const [wishlistItems, setWishlistItems] = useState([
    {
      id: 1,
      name: "PEACH POLY GEORGETTE FLORAL SUIT",
      price: 3496,
      image: "/image_f4ef01.jpg",
    },
    {
      id: 2,
      name: "LIGHT PINK FLORAL PRINTED SUIT SET",
      price: 3199,
      image: "/image_f91564.jpg",
    },
  ]);

  const removeFromWishlist = (id: number) => {
    setWishlistItems(wishlistItems.filter((item) => item.id !== id));
  };

  const moveToBag = (item: any) => {
    alert(`${item.name} added to bag!`);
    removeFromWishlist(item.id);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-2xl font-bold mb-6 text-gray-800">
          My Wishlist ({wishlistItems.length})
        </h1>

        {/* Wishlist Grid */}
        {wishlistItems.length === 0 ? (
          <p className="text-gray-600 mb-12">Your wishlist is empty.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-12">
            {wishlistItems.map((item) => (
              <div key={item.id} className="bg-white p-4 rounded-lg shadow relative">
                <button
                  onClick={() => removeFromWishlist(item.id)}
                  className="absolute top-3 right-3 bg-gray-200 rounded-full p-1 text-xs text-gray-600 hover:bg-red-500 hover:text-white transition"
                >
                  ✕
                </button>
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-64 object-cover rounded mb-4"
                />
                <h3 className="font-semibold text-sm text-gray-800 truncate">{item.name}</h3>
                <p className="text-gray-900 font-bold mt-1 mb-4">₹{item.price}</p>
                <button
                  onClick={() => moveToBag(item)}
                  className="w-full bg-red-600 text-white py-2 rounded text-sm font-medium hover:bg-red-700 transition"
                >
                  ADD TO BAG
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Permanent Recommendation Section */}
        <div className="mt-12 border-t pt-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-gray-800">You Might Also Like</h2>
            <span className="text-xs text-gray-500 uppercase tracking-wider font-semibold">
              Curated For You
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {recommendedProducts.map((rec) => (
              <div key={rec.id} className="bg-white p-4 rounded-lg shadow flex flex-col justify-between">
                <div>
                  <img
                    src={rec.image}
                    alt={rec.name}
                    className="w-full h-60 object-cover rounded mb-4"
                  />
                  <h3 className="font-medium text-sm text-gray-800">{rec.name}</h3>
                  <p className="text-gray-900 font-bold mt-1">₹{rec.price}</p>
                </div>
                <button
                  onClick={() => alert(`Added ${rec.name} to wishlist/bag!`)}
                  className="mt-4 w-full border border-red-600 text-red-600 py-2 rounded text-sm font-medium hover:bg-red-50 transition"
                >
                  QUICK VIEW / ADD
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}