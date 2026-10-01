'use client';

import React, { useState, useEffect, Suspense } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import CollectionSection from '@/components/CollectionSection';
import { useSearchParams } from 'next/navigation';
import { Heart, Search, Eye, MessageCircle, ArrowDown, ChevronLeft, ChevronRight } from 'lucide-react';
import ArchCard from '@/components/ArchCard';
import VideoShowcase from '@/components/VideoShowcase';
import { useWishlist } from '@/context/WishlistContext';
import DynamicBanner from '@/components/DynamicBanner';
import api from '@/lib/api';

function CardImageSlider({ images, alt }: { images: any; alt: string }) {
  const [currentImgIndex, setCurrentImgIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const rawList = Array.isArray(images) ? images : images ? [images] : [];
  const validImages: string[] = rawList
    .map((img: any) => (typeof img === 'string' ? img : img?.url || img?.secure_url || ''))
    .filter(Boolean);

  const finalImages = validImages.length > 0 ? validImages : ['/mynewlook.png'];

  useEffect(() => {
    if (finalImages.length <= 1 || isHovered) return;
    const interval = setInterval(() => {
      setCurrentImgIndex((prev) => (prev + 1) % finalImages.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [finalImages.length, isHovered]);

  return (
    <div
      className="relative w-full h-full"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {finalImages.map((img, idx) => (
        <Image
          key={img + idx}
          src={img}
          alt={`${alt} - ${idx + 1}`}
          fill
          unoptimized={img.startsWith('http')}
          className={`object-cover object-top transition-opacity duration-700 ease-in-out ${
            idx === currentImgIndex ? 'opacity-100 z-0' : 'opacity-0'
          }`}
        />
      ))}

      {finalImages.length > 1 && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-1.5 z-10">
          {finalImages.map((_, idx) => (
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
  const [isMounted, setIsMounted] = useState(false);

  // States
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const [categoriesList, setCategoriesList] = useState<any[]>([]);
  const [archCategories, setArchCategories] = useState<any[]>([]);

  const [products, setProducts] = useState<any[]>([]);
  const [loadingProducts, setLoadingProducts] = useState<boolean>(true);
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const limit = 12;

  const { wishlist = [], addToWishlist, removeFromWishlist } = useWishlist() as {
    wishlist?: any[];
    addToWishlist?: (item: any) => void;
    removeFromWishlist?: (id: any) => void;
  };

  // Mount only on client (Prevents Hydration Mismatch completely)
  useEffect(() => {
    setIsMounted(true);
    const cat = searchParams.get('category');
    const q = searchParams.get('search');
    if (cat) setSelectedCategory(cat);
    if (q) setSearchQuery(q);
  }, [searchParams]);

  // 1. Fetch Categories for Arch Cards
  useEffect(() => {
    if (!isMounted) return;

    const fetchCategories = async () => {
      try {
        const res = await api.get('/categories');
        const resData = res.data || res;
        const allCats = resData.data || resData || [];

        if (Array.isArray(allCats)) {
          setCategoriesList(allCats);

          const top4 = allCats.slice(0, 4).map((cat: any, index: number) => {
            const catIdentifier = cat._id || cat.slug || cat.name;
            const catImage = cat.imageUrl || cat.image || '';

            return {
              id: cat._id || index + 101,
              title: cat.name,
              image: catImage,
              link: `/featured/collection?category=${encodeURIComponent(catIdentifier)}`,
            };
          });
          setArchCategories(top4);
        }
      } catch (err) {
        console.error('Failed to load categories:', err);
      }
    };

    fetchCategories();
  }, [isMounted]);

  // 2. Fetch Products
  useEffect(() => {
    if (!isMounted) return;
    let active = true;

    const fetchProducts = async () => {
      try {
        setLoadingProducts(true);

        let endpoint = `/products?page=${page}&limit=${limit}`;

        if (searchQuery.trim()) {
          endpoint += `&search=${encodeURIComponent(searchQuery.trim())}`;
        } else if (selectedCategory && selectedCategory.toLowerCase() !== 'all') {
          endpoint += `&category=${encodeURIComponent(selectedCategory)}`;
        }

        const res = await api.get(endpoint);
        const resData = res.data || res;
        const serviceData = resData.data || resData;

        if (active) {
          const items = Array.isArray(serviceData?.data)
            ? serviceData.data
            : Array.isArray(serviceData)
            ? serviceData
            : [];

          setProducts(items);

          const pagesCount = serviceData?.pages || Math.ceil((serviceData?.total || items.length) / limit) || 1;
          setTotalPages(pagesCount);
        }
      } catch (err) {
        console.error('Failed to load products:', err);
        if (active) setProducts([]);
      } finally {
        if (active) setLoadingProducts(false);
      }
    };

    fetchProducts();

    return () => {
      active = false;
    };
  }, [selectedCategory, searchQuery, page, isMounted]);

  const handleCategoryTabClick = (identifier: string) => {
    setSelectedCategory(identifier);
    setSearchQuery('');
    setPage(1);
  };

  const toggleWishlist = (product: any) => {
    const prodId = product._id || product.id;
    const isWishlisted = wishlist.some((item: any) => item.id === prodId);

    if (isWishlisted) {
      removeFromWishlist && removeFromWishlist(prodId);
    } else {
      const selling = Number(product.discountPrice || product.price || 0);
      const mrp = Number(product.originalPrice || Math.round(selling * 1.35));

      addToWishlist &&
        addToWishlist({
          id: prodId,
          name: product.title || product.name,
          price: `₹${selling}`,
          originalPrice: `₹${mrp}`,
          image: product.images?.[0] || '',
          discount: product.discount || '30% OFF',
        });
    }
  };

  const whatsappNumber = '918385973582';

  const scrollToProducts = () => {
    const element = document.getElementById('products-grid');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // SSR Phase: render exact skeleton container so server and client match
  if (!isMounted) {
    return (
      <div className="min-h-screen bg-white pb-12" suppressHydrationWarning>
        <CollectionSection />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 text-center text-xs font-semibold uppercase tracking-widest text-gray-400">
          Loading collection...
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white pb-12" suppressHydrationWarning>
      <CollectionSection />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">

        {/* 4 ARCH CARDS GRID */}
        <div className="mb-14 mt-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
            {archCategories.map((item) => (
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
            <button
              type="button"
              suppressHydrationWarning
              onClick={() => handleCategoryTabClick('all')}
              className={`px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider whitespace-nowrap transition-all ${
                selectedCategory.toLowerCase() === 'all'
                  ? 'bg-rose-600 text-white shadow-md'
                  : 'bg-white text-gray-700 hover:bg-rose-50 border border-gray-200'
              }`}
            >
              All
            </button>

            {categoriesList.map((cat) => {
              const catIdentifier = cat._id || cat.slug || cat.name;
              const isSelected = selectedCategory === catIdentifier;

              return (
                <button
                  key={cat._id || cat.name}
                  type="button"
                  suppressHydrationWarning
                  onClick={() => handleCategoryTabClick(catIdentifier)}
                  className={`px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider whitespace-nowrap transition-all ${
                    isSelected
                      ? 'bg-rose-600 text-white shadow-md'
                      : 'bg-white text-gray-700 hover:bg-rose-50 border border-gray-200'
                  }`}
                >
                  {cat.name}
                </button>
              );
            })}
          </div>

          <div className="relative w-full sm:w-72">
            <input
              type="text"
              placeholder="Search suit or kurti..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setPage(1);
              }}
              suppressHydrationWarning
              className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl text-xs focus:outline-none focus:border-rose-500 shadow-sm"
            />
            <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          </div>
        </div>

        {/* LOADING */}
        {loadingProducts && (
          <div className="py-24 text-center text-xs font-semibold uppercase tracking-widest text-gray-400">
            Loading products...
          </div>
        )}

        {/* EMPTY */}
        {!loadingProducts && products.length === 0 && (
          <div className="py-24 text-center text-xs font-semibold uppercase tracking-widest text-gray-400">
            No products found for this selection.
          </div>
        )}

        {/* MAIN PRODUCT CARDS GRID */}
        {!loadingProducts && products.length > 0 && (
          <div id="products-grid" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {products.map((product) => {
              const prodId = product._id || product.id;
              const isWishlisted = wishlist.some((item: any) => item.id === prodId);
              const productUrl = `/product?id=${prodId}`;
              const title = product.title || product.name || 'Ethnic Outfit';

              const sellingPrice = Number(product.discountPrice || product.price || 0);
              const originalPrice = Number(product.originalPrice || Math.round(sellingPrice * 1.35));
              const discountLabel =
                product.discount ||
                `${Math.max(0, Math.round(((originalPrice - sellingPrice) / originalPrice) * 100))}% OFF`;

              const whatsappMessage = encodeURIComponent(
                `Hello! I want to order:\n\n*Product:* ${title}\n*Price:* ₹${sellingPrice}`
              );
              const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;

              return (
                <div
                  key={prodId}
                  className="group relative bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300"
                >
                  <div className="relative h-[480px] md:h-[540px] w-full bg-gray-50 overflow-hidden">
                    <Link href={productUrl} className="block w-full h-full">
                      <CardImageSlider images={product.images} alt={title} />
                    </Link>

                    <span className="absolute top-4 left-4 bg-rose-600 text-white text-xs font-bold px-2.5 py-1 rounded tracking-wider uppercase z-10">
                      {discountLabel}
                    </span>

                    <button
                      type="button"
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
                        {title}
                      </h3>
                    </Link>
                    <div className="mt-2 flex items-center justify-center gap-2.5">
                      <span className="text-lg font-bold text-gray-900">
                        ₹{sellingPrice}
                      </span>
                      <span className="text-sm text-gray-400 line-through">
                        MRP ₹{originalPrice}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* PAGINATION CONTROLS */}
        {!loadingProducts && totalPages > 1 && (
          <div className="mt-10 mb-16 flex items-center justify-center gap-2">
            <button
              type="button"
              disabled={page === 1}
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              className="flex h-9 w-9 items-center justify-center rounded-xl border border-gray-200 bg-white text-gray-600 hover:bg-gray-50 disabled:opacity-30"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => (
              <button
                key={num}
                type="button"
                onClick={() => setPage(num)}
                className={`h-9 w-9 rounded-xl text-xs font-bold transition-all ${
                  page === num
                    ? 'bg-rose-600 text-white shadow-md'
                    : 'border border-gray-200 bg-white text-gray-700 hover:bg-gray-50'
                }`}
              >
                {num}
              </button>
            ))}

            <button
              type="button"
              disabled={page === totalPages}
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              className="flex h-9 w-9 items-center justify-center rounded-xl border border-gray-200 bg-white text-gray-600 hover:bg-gray-50 disabled:opacity-30"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        )}

      </div>

      {/* HERO BANNER AT THE BOTTOM */}
      <div className="mt-12">
  <DynamicBanner position="collection" targetId="products-grid" />
</div>

    </div>
  );
}

export default function CollectionPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-white py-12 text-center text-xs tracking-widest text-gray-400">Loading collection...</div>}>
      <CollectionContent />
    </Suspense>
  );
}