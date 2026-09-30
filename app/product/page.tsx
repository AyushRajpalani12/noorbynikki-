'use client';

import React, { useState, useEffect, Suspense } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useSearchParams, useParams } from 'next/navigation';
import { Heart, ShieldCheck, Truck, RotateCcw, ChevronDown, ChevronUp, MessageCircle } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import ImageZoom from '@/components/ImageZoom';
import { useWishlist } from '@/context/WishlistContext';
import api from '@/lib/api';

interface ProductVariantSize {
  size: string;
  stock?: number;
}

interface ProductColor {
  name: string;
  hex: string;
}

interface ProductBackendData {
  _id: string;
  id?: string | number;
  title?: string;
  name?: string;
  price: number;
  discountPrice?: number;
  originalPrice?: number;
  discount?: string;
  description?: string;
  images: string[];
  sizes?: (string | ProductVariantSize)[];
  colors?: ProductColor[];
  fabric?: string;
  fit?: string;
  pattern?: string;
  category?: {
    _id?: string;
    name?: string;
  } | string;
}

function ProductContent() {
  const searchParams = useSearchParams();
  const params = useParams();

  const queryId = searchParams.get('id') || searchParams.get('productId');
  const routeId = params?.id || params?.slug;
  const targetId = queryId || routeId;

  const [product, setProduct] = useState<ProductBackendData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const { addToCart } = useCart();
  const { isWishlisted: checkWishlisted, toggleWishlist: toggleWishlistItem } = useWishlist();

  const [selectedImage, setSelectedImage] = useState<string>('');
  const [selectedColor, setSelectedColor] = useState<ProductColor | null>(null);
  const [selectedSize, setSelectedSize] = useState<string>('');

  const [pincode, setPincode] = useState('');
  const [deliveryDate, setDeliveryDate] = useState<string | null>(null);
  const [pincodeError, setPincodeError] = useState('');
  const [showToast, setShowToast] = useState(false);

  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    details: true,
    specs: true,
  });
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  useEffect(() => {
    if (!targetId) {
      setLoading(false);
      setError('Product ID nahi mili');
      return;
    }

    const fetchProduct = async () => {
      try {
        setLoading(true);
        setError(null);

        const res = await api.get(`/products/${targetId}`);
        const resData = res.data || res;
        const fetched: ProductBackendData = resData.data || resData;

        if (fetched && (fetched._id || fetched.id || fetched.title || fetched.name)) {
          setProduct(fetched);

          const defaultImg = fetched.images?.[0] || '/mynewlook.png';
          setSelectedImage(defaultImg);

          if (fetched.colors && fetched.colors.length > 0) {
            setSelectedColor(fetched.colors[0]);
          }

          if (fetched.sizes && fetched.sizes.length > 0) {
            const first = fetched.sizes[0];
            setSelectedSize(typeof first === 'string' ? first : first.size);
          }
        } else {
          setError('Product data unavailable');
        }
      } catch (err: any) {
        console.error('Failed to load product:', err);
        setError(err.response?.data?.message || 'Product load karne me dikkat aayi');
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [targetId]);

  const toggleSection = (section: string) => {
    setOpenSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  const handleCheckPincode = () => {
    if (pincode.trim().length === 6) {
      const today = new Date();
      today.setDate(today.getDate() + 4);
      const deliveryString = today.toLocaleDateString('en-IN', {
        weekday: 'short',
        month: 'short',
        day: 'numeric',
      });
      setDeliveryDate(`Expected Delivery by ${deliveryString} | Standard Shipping Free`);
      setPincodeError('');
    } else {
      setPincodeError('Please enter a valid 6-digit pincode');
      setDeliveryDate(null);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center bg-[#FDFBF7]">
        <p className="text-sm font-semibold tracking-widest text-stone-500 uppercase">
          Loading product details...
        </p>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center bg-[#FDFBF7] px-4 text-center">
        <p className="text-base font-semibold text-[#8a2045]">{error || 'Product not found'}</p>
        <Link
          href="/"
          className="mt-4 rounded-xl bg-stone-900 px-6 py-2.5 text-xs font-bold uppercase tracking-wider text-white hover:bg-stone-800"
        >
          Back to Home
        </Link>
      </div>
    );
  }

  // --- Normalized Data ---
  const productTitle = product.title || product.name || 'Ethnic Designer Piece';
  const productId = String(product._id || product.id);

  let sellingPrice = Number(product.discountPrice || product.price || 0);
  let mrpPrice = Number(product.originalPrice || (product.discountPrice ? product.price : 0));

  if (!mrpPrice || mrpPrice <= sellingPrice) {
    mrpPrice = Math.round(sellingPrice * 1.35);
  }

  const discountPercentage = Math.max(0, Math.round(((mrpPrice - sellingPrice) / mrpPrice) * 100));

  const categoryName =
    typeof product.category === 'object' && product.category?.name
      ? product.category.name
      : typeof product.category === 'string'
      ? product.category
      : 'Ethnic Wear';

  const isWishlisted = checkWishlisted(productId);

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert('Kripya pehle size select karein');
      return;
    }

    addToCart({
      id: productId,
      name: productTitle,
      price: sellingPrice,
      image: selectedImage || product.images?.[0] || '',
      size: selectedSize,
      quantity: 1,
    });

    setShowToast(true);
    setTimeout(() => setShowToast(false), 2500);
  };

  const whatsappNumber = '918385973582';
  const whatsappMessage = encodeURIComponent(
    `Hello! I want to order:\n\n*Product:* ${productTitle}\n*Price:* ₹${sellingPrice.toLocaleString('en-IN')}\n*Size:* ${selectedSize || 'N/A'}`
  );
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;

  const faqs = [
    {
      q: 'What material is this suit set made of?',
      a: product.fabric || 'Crafted with premium soft fabric, complemented by fine stitching and high-grade inner lining.',
    },
    {
      q: 'Is Cash on Delivery (COD) available?',
      a: 'Yes, Cash on Delivery is available across all major pincodes in India.',
    },
    {
      q: 'What is the return and exchange policy?',
      a: 'We offer a hassle-free 7-day return and exchange policy from the date of delivery.',
    },
  ];

  return (
    <div className="min-h-screen bg-[#FDFBF7] px-4 py-8 text-stone-800 sm:px-6 lg:px-8">
      
      {/* Toast Alert */}
      {showToast && (
        <div className="fixed right-6 top-6 z-50 flex items-center gap-2 rounded-2xl bg-[#1f1917] px-5 py-3 text-xs font-semibold text-white shadow-xl animate-in fade-in duration-200">
          <span className="text-emerald-400">✓</span>
          <span>Added to Bag successfully!</span>
        </div>
      )}

      {/* Breadcrumb */}
      <div className="mx-auto mb-6 max-w-7xl text-xs text-stone-500">
        <Link href="/" className="hover:text-[#7a1738]">Home</Link> /{' '}
        <span className="text-stone-400">{categoryName}</span> /{' '}
        <span className="font-semibold text-stone-800">{productTitle}</span>
      </div>

      <div className="mx-auto max-w-7xl rounded-3xl border border-[#eee4db] bg-white p-5 shadow-sm sm:p-8">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">

          {/* Left: Gallery */}
          <div className="lg:col-span-5">
            <div className="flex gap-4">
              <div className="flex max-h-[520px] flex-col gap-2.5 overflow-y-auto pr-1">
                {product.images?.map((img, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setSelectedImage(img)}
                    className={`relative h-20 w-16 overflow-hidden rounded-xl border transition-all ${
                      selectedImage === img
                        ? 'border-[#7a1738] ring-2 ring-[#7a1738]/20'
                        : 'border-stone-200 opacity-70 hover:opacity-100'
                    }`}
                  >
                    <Image src={img} alt={`thumb-${idx}`} fill className="object-cover object-top" />
                  </button>
                ))}
              </div>

              <div className="relative flex-1 overflow-hidden rounded-2xl bg-[#f9f6f0]">
                {selectedImage && (
                  <ImageZoom src={selectedImage} alt={productTitle} images={product.images} />
                )}
                
                {/* Wishlist Button: Red line fixed with proper string types */}
                <button
                  type="button"
                  onClick={() =>
                    toggleWishlistItem({
                      id: productId,
                      name: productTitle,
                      price: `₹${sellingPrice.toLocaleString('en-IN')}`,
                      originalPrice: `₹${mrpPrice.toLocaleString('en-IN')}`,
                      image: selectedImage || product.images?.[0] || '',
                    })
                  }
                  className="absolute right-4 top-4 z-30 rounded-full bg-white/90 p-2.5 shadow-md backdrop-blur-sm transition-all hover:bg-white"
                >
                  <Heart
                    className={`h-5 w-5 ${
                      isWishlisted ? 'fill-[#7a1738] text-[#7a1738]' : 'text-stone-600'
                    }`}
                  />
                </button>
              </div>
            </div>
          </div>

          {/* Middle: Product Info */}
          <div className="flex flex-col space-y-6 lg:col-span-4">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#7a1738]">
                {categoryName}
              </span>
              <h1 className="mt-1 font-serif text-2xl font-bold uppercase leading-snug text-stone-900">
                {productTitle}
              </h1>

              {/* Price Row */}
              <div className="mt-3 flex items-baseline gap-3">
                <span className="text-3xl font-bold text-[#8a2045]">
                  ₹{sellingPrice.toLocaleString('en-IN')}
                </span>
                <span className="text-sm text-stone-400 line-through">
                  MRP ₹{mrpPrice.toLocaleString('en-IN')}
                </span>
                {discountPercentage > 0 && (
                  <span className="rounded-full bg-rose-50 px-2.5 py-0.5 text-xs font-bold text-[#7a1738]">
                    {discountPercentage}% OFF
                  </span>
                )}
              </div>
              <p className="mt-1 text-[11px] text-stone-400">Inclusive of all taxes</p>
            </div>

            {/* Colors */}
            {product.colors && product.colors.length > 0 && (
              <div>
                <span className="block mb-2 text-xs font-bold uppercase tracking-wider text-stone-700">
                  Select Color: <span className="font-normal text-stone-500">{selectedColor?.name}</span>
                </span>
                <div className="flex items-center gap-3">
                  {product.colors.map((c) => (
                    <button
                      key={c.name}
                      type="button"
                      onClick={() => setSelectedColor(c)}
                      className={`h-8 w-8 rounded-full border-2 transition-transform ${
                        selectedColor?.name === c.name
                          ? 'scale-110 border-[#7a1738] shadow-sm'
                          : 'border-stone-300'
                      }`}
                      style={{ backgroundColor: c.hex }}
                      title={c.name}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Sizes */}
            {product.sizes && product.sizes.length > 0 && (
              <div>
                <div className="mb-2 flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-stone-700">
                    Select Size
                  </span>
                  <button type="button" className="text-xs font-medium text-[#7a1738] underline">
                    Size Chart
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((s, idx) => {
                    const sizeLabel = typeof s === 'string' ? s : s.size;
                    const isOutOfStock =
                      typeof s !== 'string' && typeof s.stock === 'number' && s.stock <= 0;

                    return (
                      <button
                        key={idx}
                        type="button"
                        disabled={isOutOfStock}
                        onClick={() => setSelectedSize(sizeLabel)}
                        className={`h-11 min-w-[48px] px-3 rounded-xl border text-xs font-bold transition-all ${
                          isOutOfStock
                            ? 'cursor-not-allowed border-stone-200 bg-stone-100 text-stone-300 line-through'
                            : selectedSize === sizeLabel
                            ? 'border-[#7a1738] bg-[#7a1738] text-white shadow-md'
                            : 'border-stone-300 bg-white text-stone-800 hover:border-stone-500'
                        }`}
                      >
                        {sizeLabel}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* CTAs */}
            <div className="flex gap-3 pt-2">
              <button
                type="button"
                onClick={handleAddToCart}
                className="flex-1 rounded-2xl border-2 border-[#7a1738] py-3.5 text-xs font-bold uppercase tracking-wider text-[#7a1738] transition-colors hover:bg-[#7a1738] hover:text-white"
              >
                Add To Bag
              </button>

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-1 items-center justify-center gap-2 rounded-2xl bg-emerald-600 py-3.5 text-xs font-bold uppercase tracking-wider text-white shadow-md transition-colors hover:bg-emerald-700"
              >
                <MessageCircle className="h-4 w-4 fill-white text-emerald-600" />
                WhatsApp Order
              </a>
            </div>

            {/* Pincode Options */}
            <div className="space-y-2 rounded-2xl border border-stone-200 bg-stone-50/60 p-4">
              <span className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-stone-700">
                <Truck className="h-4 w-4 text-[#7a1738]" /> Delivery Options
              </span>
              <div className="flex gap-2">
                <input
                  type="text"
                  maxLength={6}
                  value={pincode}
                  onChange={(e) => setPincode(e.target.value)}
                  placeholder="Enter 6-digit Pincode"
                  className="flex-1 rounded-xl border border-stone-300 px-3 py-2 text-xs focus:border-[#7a1738] focus:outline-none"
                />
                <button
                  type="button"
                  onClick={handleCheckPincode}
                  className="rounded-xl bg-stone-900 px-4 py-2 text-xs font-bold text-white transition-colors hover:bg-stone-800"
                >
                  CHECK
                </button>
              </div>
              {pincodeError && <p className="text-[11px] font-medium text-rose-600">{pincodeError}</p>}
              {deliveryDate && (
                <p className="rounded-lg bg-emerald-50 p-2 text-[11px] font-semibold text-emerald-700">
                  {deliveryDate}
                </p>
              )}
            </div>

            <div className="grid grid-cols-2 gap-3 pt-1 text-xs text-stone-600">
              <div className="flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-emerald-600" /> 100% Authentic
              </div>
              <div className="flex items-center gap-2">
                <RotateCcw className="h-4 w-4 text-emerald-600" /> 7 Days Easy Return
              </div>
            </div>
          </div>

          {/* Right: Specifications & Details */}
          <div className="space-y-5 border-t border-stone-200 pt-5 lg:col-span-3 lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0">
            <h3 className="border-b border-stone-200 pb-2 font-serif text-sm font-bold uppercase tracking-wider text-stone-900">
              Specifications & Details
            </h3>

            {/* Description Dropdown with Proper Rendering */}
            <div className="border-b border-stone-100 pb-3">
              <button
                type="button"
                onClick={() => toggleSection('details')}
                className="flex w-full items-center justify-between text-xs font-bold uppercase tracking-wider text-stone-800"
              >
                <span>Product Details</span>
                {openSections.details ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
              </button>
              
              {openSections.details && (
                <div className="mt-2.5 text-xs leading-relaxed text-stone-600 whitespace-pre-line">
                  {product.description && product.description.trim().length > 0 ? (
                    <p>{product.description}</p>
                  ) : (
                    <p className="italic text-stone-400">
                      Radiate understated elegance in this exquisite ethnic suit set, crafted with delicate stitching and fine craftsmanship.
                    </p>
                  )}
                </div>
              )}
            </div>

            {/* Attributes Dropdown */}
            <div className="border-b border-stone-100 pb-3">
              <button
                type="button"
                onClick={() => toggleSection('specs')}
                className="flex w-full items-center justify-between text-xs font-bold uppercase tracking-wider text-stone-800"
              >
                <span>Key Attributes</span>
                {openSections.specs ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
              </button>
              
              {openSections.specs && (
                <div className="mt-2.5 space-y-2 text-xs text-stone-600">
                  <div className="flex justify-between border-b border-stone-100 py-1">
                    <span className="text-stone-400">Category</span>
                    <span className="font-semibold text-stone-800">{categoryName}</span>
                  </div>
                  <div className="flex justify-between border-b border-stone-100 py-1">
                    <span className="text-stone-400">Fabric</span>
                    <span className="font-semibold text-stone-800">{product.fabric || 'Pure Viscose Rayon'}</span>
                  </div>
                  <div className="flex justify-between border-b border-stone-100 py-1">
                    <span className="text-stone-400">Fit</span>
                    <span className="font-semibold text-stone-800">{product.fit || 'Straight Fit'}</span>
                  </div>
                  {product.pattern && (
                    <div className="flex justify-between border-b border-stone-100 py-1">
                      <span className="text-stone-400">Pattern</span>
                      <span className="font-semibold text-stone-800">{product.pattern}</span>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

        </div>
      </div>

      {/* FAQs */}
      <div className="mx-auto mt-12 max-w-7xl rounded-3xl border border-[#eee4db] bg-white p-6 sm:p-8">
        <h2 className="mb-4 border-b border-stone-100 pb-3 font-serif text-lg font-bold text-stone-900">
          Frequently Asked Questions (FAQs)
        </h2>

        <div className="space-y-3">
          {faqs.map((faq, idx) => (
            <div key={idx} className="overflow-hidden rounded-2xl border border-stone-200">
              <button
                type="button"
                onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                className="flex w-full items-center justify-between bg-stone-50/50 p-4 text-left text-xs font-semibold text-stone-800 transition-colors hover:bg-stone-100 sm:text-sm"
              >
                <span>{faq.q}</span>
                {openFaq === idx ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
              </button>
              {openFaq === idx && (
                <div className="border-t border-stone-200 bg-white p-4 text-xs leading-relaxed text-stone-600 sm:text-sm">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}

export default function ProductDetailPage() {
  return (
    <Suspense
      fallback={
        <div className="p-10 text-center text-sm font-semibold tracking-wider text-stone-500 uppercase">
          Loading product...
        </div>
      }
    >
      <ProductContent />
    </Suspense>
  );
}