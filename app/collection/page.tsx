'use client';

import React, { useState, useEffect, Suspense } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import CollectionSection from '@/components/CollectionSection';
import { useSearchParams } from 'next/navigation';
import { Heart, Search, Eye, MessageCircle, ArrowDown } from 'lucide-react';
import { PRODUCTS_DATA } from '@/app/product/data';
import ArchCard from '@/components/ArchCard';
import VideoShowcase from '@/components/VideoShowcase';
import { useWishlist } from '@/context/WishlistContext';

function CardImageSlider({ images, alt }: { images: string[]; alt: string }) {
  const [currentImgIndex, setCurrentImgIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (images.length <= 1 || isHovered) return;
    const interval = setInterval(() => {
      setCurrentImgIndex((prev) => (prev + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [images.length, isHovered]);

  return (
    <div
      className="relative w-full h-full"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {images.map((img, idx) => (
        <Image
          key={img}
          src={img}
          alt={`${alt} - ${idx + 1}`}
          fill
          className={`object-cover object-top transition-opacity duration-700 ease-in-out ${
            idx === currentImgIndex ? 'opacity-100 z-0' : 'opacity-0'
          }`}
        />
      ))}

      {images.length > 1 && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-1.5 z-10">
          {images.map((_, idx) => (
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

function CollectionContent() {
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get('category') || 'all';
  const searchParamValue = searchParams.get('search') || '';

  const [selectedCategory, setSelectedCategory] = useState(categoryParam);
  const [searchQuery, setSearchQuery] = useState(searchParamValue);
  
  // Using Global Wishlist Context
  const { wishlist = [], addToWishlist, removeFromWishlist } = useWishlist() as {
    wishlist?: any[];
    addToWishlist?: (item: any) => void;
    removeFromWishlist?: (id: any) => void;
  };

  useEffect(() => {
    setSelectedCategory(categoryParam);
  }, [categoryParam]);

  useEffect(() => {
    setSearchQuery(searchParamValue);
  }, [searchParamValue]);

  const toggleWishlist = (product: any) => {
    const isWishlisted = wishlist.some((item: any) => item.id === product.id);
    if (isWishlisted) {
      removeFromWishlist && removeFromWishlist(product.id);
    } else {
      addToWishlist && addToWishlist({
        id: product.id,
        name: product.name,
        price: product.price,
        originalPrice: product.originalPrice,
        image: product.images?.[0] || '',
        discount: product.discount,
      });
    }
  };

  const whatsappNumber = '918385973582';

  // 4 Arch Cards Collections Data
  const archSuitCollections = [
    { id: 101, title: 'Anarkali Suit', image: '/collection/suet1.png', link: '/collection?category=anarkali' },
    { id: 102, title: 'Printed Suit', image: '/collection/suite2.png', link: '/collection?category=printed' },
    { id: 103, title: 'Cotton Kurti', image: '/collection/suite3.png', link: '/collection?category=cotton' },
    { id: 104, title: 'Party Wear', image: '/collection/suite4.png', link: '/collection?category=partywear' },
  ];

  const filteredProducts = PRODUCTS_DATA.filter((product) => {
    const matchesCategory =
      selectedCategory === 'all' || product.category === selectedCategory;

    const query = searchQuery.trim().toLowerCase();
    if (!query) return matchesCategory;

    const nameMatch = product.name.toLowerCase().includes(query);
    const categoryMatch = product.category.toLowerCase().includes(query);
    const priceDigits = product.price.replace(/[^0-9]/g, '');
    const queryDigits = query.replace(/[^0-9]/g, '');
    const priceMatch = queryDigits.length > 0 && priceDigits.includes(queryDigits);

    const matchesSearch = nameMatch || categoryMatch || priceMatch;
    return matchesCategory && matchesSearch;
  });

  const scrollToProducts = () => {
    const element = document.getElementById('products-grid');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-white pb-12">
      <CollectionSection/>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        
        {/* 4 ARCH CARDS GRID */}
        <div className="mb-14 mt-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
            {archSuitCollections.map((item) => (
              <ArchCard
                key={item.id}
                id={item.id}
                title={item.title}
                image={item.image}
                link={item.link}
              />
            ))}
          </div>
        </div>
        
        <VideoShowcase />

        {/* CATEGORY FILTERS & SEARCH */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-gray-50 p-4 rounded-2xl border border-gray-100 mb-10 shadow-sm">
          <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto pb-2 sm:pb-0 scrollbar-none">
            {[
              { label: 'All', value: 'all' },
              { label: 'Anarkali', value: 'anarkali' },
              { label: 'Printed', value: 'printed' },
              { label: 'Cotton Kurtis', value: 'cotton' },
              { label: 'Party Wear', value: 'partywear' },
            ].map((cat) => (
              <button
                key={cat.value}
                suppressHydrationWarning
                onClick={() => setSelectedCategory(cat.value)}
                className={`px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider whitespace-nowrap transition-all ${
                  selectedCategory === cat.value
                    ? 'bg-rose-600 text-white shadow-md'
                    : 'bg-white text-gray-700 hover:bg-rose-50 border border-gray-200'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          <div className="relative w-full sm:w-72">
            <input
              type="text"
              placeholder="Search suit or kurti..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              suppressHydrationWarning
              className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl text-xs focus:outline-none focus:border-rose-500 shadow-sm"
            />
            <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          </div>
        </div>

        {/* MAIN PRODUCT CARDS GRID */}
        <div id="products-grid" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {filteredProducts.map((product) => {
            const isWishlisted = wishlist.some((item: any) => item.id === product.id);
            const productUrl = `/product?id=${product.id}`;
            const whatsappMessage = encodeURIComponent(
              `Hello! I want to order:\n\n*Product:* ${product.name}\n*Price:* ${product.price}`
            );
            const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;

            return (
              <div
                key={product.id}
                className="group relative bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300"
              >
                <div className="relative h-[480px] md:h-[540px] w-full bg-gray-50 overflow-hidden">
                  <Link href={productUrl} className="block w-full h-full">
                    <CardImageSlider images={product.images} alt={product.name} />
                  </Link>

                  <span className="absolute top-4 left-4 bg-rose-600 text-white text-xs font-bold px-2.5 py-1 rounded tracking-wider uppercase z-10">
                    {product.discount}
                  </span>

                  <button
                    suppressHydrationWarning
                    onClick={(e) => {
                      e.preventDefault();
                      toggleWishlist(product);
                    }}
                    className="absolute top-4 right-4 p-2.5 bg-white/80 backdrop-blur-md rounded-full shadow-md hover:bg-white transition-all z-10"
                  >
                    <Heart
                      className={`w-5 h-5 ${
                        isWishlisted
                          ? 'fill-rose-600 text-rose-600'
                          : 'text-gray-600 hover:text-rose-600'
                      }`}
                    />
                  </button>

                  <div className="absolute inset-x-0 bottom-4 flex items-center justify-center gap-3 px-4 z-10">
                    <Link
                      href={productUrl}
                      className="flex-1 bg-white/95 backdrop-blur-md text-gray-800 font-bold py-3 px-3 rounded-xl shadow-md hover:bg-gray-100 transition-all text-xs uppercase tracking-wider flex items-center justify-center gap-2"
                    >
                      <Eye className="w-4 h-4 text-rose-600" />
                      View Outfit
                    </Link>

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

                <div className="p-5 text-center">
                  <Link href={productUrl}>
                    <h3 className="text-sm font-semibold text-gray-800 truncate uppercase tracking-wide hover:text-rose-600 transition-colors">
                      {product.name}
                    </h3>
                  </Link>
                  <div className="mt-2 flex items-center justify-center gap-2.5">
                    <span className="text-lg font-bold text-gray-900">
                      {product.price}
                    </span>
                    <span className="text-sm text-gray-400 line-through">
                      {product.originalPrice}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>

      {/* HERO BANNER AT THE BOTTOM */}
      <div className="relative w-full h-[350px] sm:h-[420px] md:h-[480px] lg:h-[520px] overflow-hidden shadow-md mt-12">
        <Image
          src="/collectionhomepage.png"
          alt="Collection Header Banner"
          fill
          priority
          className="object-cover object-center w-full h-full brightness-[1.05] contrast-[1.05]"
        />
        
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/30 to-black/50 flex flex-col items-center justify-center text-center px-4">
          <span className="text-rose-200 font-semibold tracking-widest text-xs uppercase mb-2 drop-shadow-md">
            Elegance In Every Detail
          </span>
          <h1 className="text-3xl sm:text-5xl font-serif font-bold text-white tracking-wide max-w-2xl leading-tight drop-shadow-lg">
            Exclusive Royal Collection
          </h1>
          <p className="text-gray-100 text-sm sm:text-base mt-3 max-w-lg font-light drop-shadow">
            Discover our handpicked traditional suits, custom designer kurtis, and timeless Ethnic wear created for every occasion.
          </p>
          
          <button
            suppressHydrationWarning
            onClick={scrollToProducts}
            className="mt-6 inline-flex items-center gap-2 bg-rose-600 hover:bg-rose-700 text-white font-bold py-3 px-8 rounded-full shadow-xl transition-all transform hover:-translate-y-0.5 text-xs sm:text-sm uppercase tracking-wider"
          >
            Explore Our Products
            <ArrowDown className="w-4 h-4 animate-bounce" />
          </button>
        </div>
      </div>

    </div>
  );
}

export default function CollectionPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-white py-12 text-center">Loading...</div>}>
      <CollectionContent />
    </Suspense>
  );
}