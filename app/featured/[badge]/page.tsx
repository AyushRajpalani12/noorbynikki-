'use client';

import React, { useEffect, useState, Suspense } from 'react';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, Sparkles, ShoppingBag, X, Zap, Check } from 'lucide-react';
import api from '@/lib/api';

interface ProductSize {
  size: string;
  stock: number;
}

interface Product {
  _id: string;
  id?: string;
  title?: string;
  name?: string;
  slug?: string;
  price: number;
  discountPrice?: number;
  images: string[];
  featuredBadge?: string;
  sizes?: ProductSize[];
  category?: {
    _id?: string;
    name?: string;
    slug?: string;
  } | string;
}

function CollectionListingContent() {
  const params = useParams();
  const searchParams = useSearchParams();
  const router = useRouter();

  const categoryParam = searchParams.get('category') || '';
  const badgeParam =
    typeof params?.badge === 'string'
      ? params.badge.toUpperCase()
      : Array.isArray(params?.badge)
      ? params.badge[0].toUpperCase()
      : '';

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [isActionLoading, setIsActionLoading] = useState<boolean>(false);

  const [modalProduct, setModalProduct] = useState<Product | null>(null);
  const [modalMode, setModalMode] = useState<'BAG' | 'BUY'>('BAG');
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [addedNotice, setAddedNotice] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    const fetchProducts = async () => {
      try {
        setLoading(true);

        let endpoint = '/products?limit=50';

        // Backend service category param koObjectId ya slug se match karta hai
        if (categoryParam) {
          endpoint += `&category=${encodeURIComponent(categoryParam)}`;
        } else if (badgeParam && badgeParam !== 'COLLECTION') {
          endpoint += `&featuredBadge=${encodeURIComponent(badgeParam)}`;
        }

        const res = await api.get(endpoint);
        const resData = res.data || res;
        const serviceData = resData.data || resData;

        if (isMounted) {
          const items = Array.isArray(serviceData?.data)
            ? serviceData.data
            : Array.isArray(serviceData)
            ? serviceData
            : [];
          setProducts(items);
        }
      } catch (error) {
        console.error('Failed to load products:', error);
        if (isMounted) setProducts([]);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchProducts();

    return () => {
      isMounted = false;
    };
  }, [categoryParam, badgeParam]);

  const handleOpenModal = (e: React.MouseEvent, product: Product, mode: 'BAG' | 'BUY') => {
    e.stopPropagation();
    setModalProduct(product);
    setModalMode(mode);
    setSelectedSize('');
  };

  const handleCloseModal = () => {
    if (isActionLoading) return;
    setModalProduct(null);
    setSelectedSize('');
  };

  const handleModalConfirm = async () => {
    if (!modalProduct) return;

    if (!selectedSize) {
      alert('Kripya pehle apna size select karein!');
      return;
    }

    const prodId = modalProduct._id || modalProduct.id;

    if (modalMode === 'BUY') {
      const checkoutUrl = `/checkout?productId=${prodId}&size=${encodeURIComponent(selectedSize)}`;
      handleCloseModal();
      router.push(checkoutUrl);
      return;
    }

    try {
      setIsActionLoading(true);

      const payload = {
        productId: prodId,
        size: selectedSize,
        quantity: 1,
      };

      const res = await api.post('/cart', payload);
      const resData = res.data || res;

      if (resData.success || res.status === 200 || res.status === 201) {
        const title = modalProduct.title || modalProduct.name || 'Product';
        handleCloseModal();

        setAddedNotice(`${title} (Size: ${selectedSize}) bag me add ho gaya!`);
        setTimeout(() => setAddedNotice(null), 3000);
      } else {
        alert(resData.message || 'Product bag me add nahi ho paya');
      }
    } catch (error: any) {
      console.error('Cart API error:', error);
      if (error.response?.status === 401) {
        alert('Kripya pehle login karein!');
        router.push('/login');
        return;
      }
      alert(error.response?.data?.message || 'Server error while adding to bag');
    } finally {
      setIsActionLoading(false);
    }
  };

  const categoryName =
    products[0]?.category && typeof products[0].category === 'object'
      ? products[0].category.name
      : categoryParam;

  const displayTitle = categoryParam
    ? `${categoryName || 'CATEGORY'} COLLECTION`.toUpperCase()
    : badgeParam && badgeParam !== 'COLLECTION'
    ? `${badgeParam} COLLECTION`
    : 'CURATED COLLECTION';

  return (
    <main className="min-h-screen bg-[#FDFBF7] px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-[1320px]">
        
        {addedNotice && (
          <div className="fixed right-6 top-6 z-50 flex items-center gap-2 rounded-2xl bg-[#1f1917] px-5 py-3 text-xs font-semibold text-white shadow-xl">
            <Check className="h-4 w-4 text-emerald-400" />
            <span>{addedNotice}</span>
          </div>
        )}

        <div className="mb-6 flex items-center justify-between">
          <Link
            href="/"
            className="group inline-flex items-center gap-2 rounded-full border border-[#ead8cc] bg-white px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-[#7a1738] shadow-sm transition-all hover:bg-[#7a1738] hover:text-white"
          >
            <ArrowLeft className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-1" />
            Back to Home
          </Link>
        </div>

        <div className="flex flex-col items-center justify-center text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#e8dcd2] bg-white px-4 py-1 shadow-sm">
            <Sparkles className="h-3.5 w-3.5 text-[#7a1738]" />
            <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#342e2b]">
              Curated Selection
            </span>
          </div>

          <h1 className="mt-3 font-serif text-3xl font-bold tracking-tight text-[#221714] sm:text-4xl lg:text-5xl">
            {displayTitle}
          </h1>
          <p className="mt-2 text-xs uppercase tracking-widest text-[#8c7e75]">
            Handcrafted pieces tailored for celebrations
          </p>
        </div>

        {loading && <div className="py-24 text-center text-sm text-stone-500">Loading collection...</div>}
        {!loading && products.length === 0 && (
          <div className="py-24 text-center text-sm text-stone-500">
            No products found for this selection.
          </div>
        )}

        {!loading && products.length > 0 && (
          <div className="mt-12 grid grid-cols-1 gap-7 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {products.map((product) => {
              const prodId = product._id || product.id;
              const productDetailUrl = `/product?id=${prodId}`;
              
              const imageSrc = product.images?.[0] || '/mynewlook.png';
              const title = product.title || product.name || 'Ethnic Ensemble';
              const price = product.discountPrice || product.price;
              const categoryTitle =
                typeof product.category === 'object' && product.category?.name
                  ? product.category.name
                  : typeof product.category === 'string'
                  ? product.category
                  : 'Curated Ethnic';

              return (
                <div
                  key={prodId}
                  className="group relative flex flex-col justify-between overflow-hidden rounded-[22px] border border-[#eee5dc] bg-white p-3.5 shadow-sm transition-all duration-300 hover:shadow-md"
                >
                  <Link href={productDetailUrl} className="block">
                    <div className="relative aspect-[3/4] w-full overflow-hidden rounded-[16px] bg-[#f9f6f0]">
                      <Image
                        src={imageSrc}
                        alt={title}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                        className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                      />
                      <span className="absolute left-3 top-3 rounded-full border border-white/20 bg-[#2b2523]/80 px-3 py-1 text-[8px] font-bold uppercase tracking-[0.2em] text-white backdrop-blur-md">
                        {product.featuredBadge || categoryTitle}
                      </span>
                    </div>

                    <div className="mt-3.5 px-1">
                      <h3 className="truncate font-serif text-[15px] font-semibold text-[#251b17] group-hover:text-[#7a1738]">
                        {title}
                      </h3>
                      <p className="mt-0.5 text-[9px] font-medium uppercase tracking-[0.15em] text-[#978980]">
                        {categoryTitle}
                      </p>
                    </div>
                  </Link>

                  <div className="mt-2 px-1">
                    <span className="text-base font-bold text-[#8a2045]">
                      ₹{Number(price).toLocaleString('en-IN')}
                    </span>
                  </div>

                  <div className="mt-3 grid grid-cols-2 gap-2 border-t border-stone-100 pt-3">
                    <button
                      type="button"
                      onClick={(e) => handleOpenModal(e, product, 'BAG')}
                      className="inline-flex items-center justify-center gap-1.5 rounded-xl border border-[#7a1738] bg-white py-2 text-[10px] font-bold uppercase tracking-wider text-[#7a1738] transition-all hover:bg-[#7a1738] hover:text-white active:scale-95"
                    >
                      <ShoppingBag className="h-3 w-3" />
                      Add to Bag
                    </button>

                    <button
                      type="button"
                      onClick={(e) => handleOpenModal(e, product, 'BUY')}
                      className="inline-flex items-center justify-center gap-1.5 rounded-xl bg-[#7a1738] py-2 text-[10px] font-bold uppercase tracking-wider text-white shadow-sm transition-all hover:bg-[#5a1028] active:scale-95"
                    >
                      <Zap className="h-3 w-3" />
                      Buy Now
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {modalProduct && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
            <div className="absolute inset-0" onClick={handleCloseModal} />

            <div className="relative z-10 w-full max-w-md rounded-3xl border border-[#e8dcd2] bg-white p-6 shadow-2xl animate-in fade-in zoom-in-95 duration-200">
              <button
                type="button"
                disabled={isActionLoading}
                onClick={handleCloseModal}
                className="absolute right-4 top-4 rounded-full p-2 text-stone-400 hover:bg-stone-100 hover:text-stone-700"
              >
                <X className="h-5 w-5" />
              </button>

              <div className="flex items-center gap-4">
                <div className="relative h-20 w-16 shrink-0 overflow-hidden rounded-xl border border-stone-200 bg-stone-100">
                  <Image
                    src={modalProduct.images?.[0] || '/mynewlook.png'}
                    alt={modalProduct.title || modalProduct.name || ''}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="min-w-0 flex-1 pr-6">
                  <span className="text-[9px] font-bold uppercase tracking-widest text-[#7a1738]">
                    {modalMode === 'BUY' ? 'Quick Checkout' : 'Add to Bag'}
                  </span>
                  <h3 className="truncate font-serif text-base font-bold text-[#1f1917]">
                    {modalProduct.title || modalProduct.name}
                  </h3>
                  <p className="mt-1 text-base font-bold text-[#8a2045]">
                    ₹{Number(modalProduct.discountPrice || modalProduct.price).toLocaleString('en-IN')}
                  </p>
                </div>
              </div>

              <div className="mt-6 border-t border-stone-100 pt-4">
                <div className="mb-3 flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-stone-600">
                    Select Your Size
                  </span>
                  {selectedSize && (
                    <span className="text-xs font-semibold text-[#7a1738]">
                      Selected: {selectedSize}
                    </span>
                  )}
                </div>

                <div className="flex flex-wrap gap-2.5">
                  {modalProduct.sizes && modalProduct.sizes.length > 0 ? (
                    modalProduct.sizes.map((s) => {
                      const isOutOfStock = s.stock <= 0;
                      const isCurrentSelected = selectedSize === s.size;

                      return (
                        <button
                          key={s.size}
                          type="button"
                          disabled={isOutOfStock || isActionLoading}
                          onClick={() => setSelectedSize(s.size)}
                          className={`flex h-11 w-11 items-center justify-center rounded-xl border text-xs font-bold transition-all ${
                            isOutOfStock
                              ? 'cursor-not-allowed border-stone-200 bg-stone-100 text-stone-300 line-through'
                              : isCurrentSelected
                              ? 'border-[#7a1738] bg-[#7a1738] text-white shadow-md'
                              : 'border-stone-300 bg-white text-stone-800 hover:border-[#7a1738]'
                          }`}
                        >
                          {s.size}
                        </button>
                      );
                    })
                  ) : (
                    <button
                      type="button"
                      disabled={isActionLoading}
                      onClick={() => setSelectedSize('FREE-SIZE')}
                      className={`rounded-xl border px-4 py-2.5 text-xs font-bold transition-all ${
                        selectedSize === 'FREE-SIZE'
                          ? 'border-[#7a1738] bg-[#7a1738] text-white shadow-md'
                          : 'border-stone-300 bg-white text-stone-800 hover:border-[#7a1738]'
                      }`}
                    >
                      Free Size
                    </button>
                  )}
                </div>
              </div>

              <button
                type="button"
                disabled={isActionLoading}
                onClick={handleModalConfirm}
                className="mt-6 flex w-full items-center justify-center gap-2 rounded-2xl bg-[#7a1738] py-3.5 text-xs font-bold uppercase tracking-widest text-white shadow-lg transition-transform active:scale-[0.98] hover:bg-[#5a1028] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isActionLoading ? (
                  <span>Processing...</span>
                ) : modalMode === 'BUY' ? (
                  <>
                    <Zap className="h-4 w-4" />
                    Proceed to Checkout
                  </>
                ) : (
                  <>
                    <ShoppingBag className="h-4 w-4" />
                    Confirm & Add to Bag
                  </>
                )}
              </button>
            </div>
          </div>
        )}

      </div>
    </main>
  );
}

export default function FeaturedBadgeListingPage() {
  return (
    <Suspense fallback={<div className="py-24 text-center text-sm text-stone-500">Loading collection...</div>}>
      <CollectionListingContent />
    </Suspense>
  );
}