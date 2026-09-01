'use client';

import React, { useState, useEffect, Suspense } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Heart, ShieldCheck, Truck, RotateCcw, ChevronDown, ChevronUp, MessageCircle } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import ImageZoom from '@/components/ImageZoom';

// Centralized Products List
const PRODUCTS_DATA = [
  {
    id: 1,
    name: 'PEACH POLY GEORGETTE FLORAL PRINTED SUIT SET',
    price: '₹3,496',
    originalPrice: '₹4,995',
    discount: '30% OFF',
    colors: [
      { name: 'Peach', hex: '#E8A087' },
      { name: 'Old Rose', hex: '#804050' },
    ],
    images: [
      '/collection/pinkyellow.png',
      '/collection/rightsidepink.png',
      '/collection/backside.png',
      '/collection/leftside.png',
      '/collection/pink2.png',
      '/collection/frontside.png',
    ],
    sizes: ['30/XS', '32/S', '34/M', '36/L', '38/XL'],
  },
  {
    id: 2,
    name: 'ELEGANT EMBROIDERED STRAIGHT SUIT SET',
    price: '₹3,299',
    originalPrice: '₹4,599',
    discount: '28% OFF',
    colors: [
      { name: 'Royal Wine', hex: '#4A1525' },
      { name: 'Old Rose', hex: '#804050' },
    ],
    images: [
      '/collection/straightsuitset.png',
      '/collection/straightsuitsetleftside.png',
      '/collection/straightsuitsetbackside.png',
      '/collection/straightsuitsetlookingside.png',
      '/collection/straightsuitsetleftside11.png',
      '/collection/straightsuitsetrightside.png',
    ],
    sizes: ['32/S', '34/M', '36/L', '38/XL', '40/2XL'],
  },
  {
    id: 3,
    name: 'PURPLE RAYON PRINTED SUIT SET',
    price: '₹2,999',
    originalPrice: '₹4,299',
    discount: '30% OFF',
    colors: [{ name: 'Purple', hex: '#6b3064' }],
    images: [
      '/collection/purpalrayonprinted.png',
      '/collection/purpalrayonprintedfrontside.png',
      '/collection/purpalrayonprintedleftside.png',
      '/collection/purpalrayonprintedrightside.png',
      '/collection/purpalrayonprintedbackside.png',
    ],
    sizes: ['32/S', '34/M', '36/L', '38/XL', '40/2XL'],
  },
  {
    id: 4,
    name: 'MANGO YELLOW ANARKALI SUIT SET',
    price: '₹3,599',
    originalPrice: '₹4,999',
    discount: '28% OFF',
    colors: [{ name: 'Mango Yellow', hex: '#FFC82E' }],
    images: [
      '/collection/Mangoanarkal.png',
      '/collection/Mangoanarkalfrontside.png',
      '/collection/Mangoanarkalleftside.png',
      '/collection/Mangoanarkalrightside.png',
      '/collection/Mangoanarkalbackside.png',
    ],
    sizes: ['32/S', '34/M', '36/L', '38/XL', '40/2XL'],
  },
  {
    id: 5,
    name: 'LIGHT PINK FLORAL PRINTED SUIT SET',
    price: '₹3,199',
    originalPrice: '₹4,499',
    discount: '28% OFF',
    colors: [{ name: 'Light Pink', hex: '#FFB6C1' }],
    images: [
      '/collection/lightpink.png',
      '/collection/lightpinkfront.png',
      '/collection/lightpinkleft.png',
      '/collection/lightpinkright.png',
      '/collection/lightpinkback.png',
      '/collection/lightpinkoutside.png',
    ],
    sizes: ['30/XS', '32/S', '34/M', '36/L', '38/XL'],
  },
  {
    id: 6,
    name: 'COTTON EMBROIDERED STRAIGHT SUIT SET',
    price: '₹2,899',
    originalPrice: '₹3,999',
    discount: '27% OFF',
    images: [
      '/collection/cottenstright.png',
      '/collection/cottenstrightfront.png',
      '/collection/cottenstrightback.png',
      '/collection/cottenstrightleft.png',
      '/collection/cottenstrightright.png',
      '/collection/cottenstrighsitting.png',
    ],
    sizes: ['30/XS', '32/S', '34/M', '36/L', '38/XL', '40/2XL'],
  },
  {
    id: 7,
    name: 'FLORAL PRINTED GEORGETTE SUIT SET',
    price: '₹3,299',
    originalPrice: '₹4,699',
    discount: '30% OFF',
    colors: [{ name: 'Multicolor', hex: '#E29587' }],
    images: [
      '/collection/printed.png',
      '/collection/printedfront.png',
      '/collection/printedback.png',
      '/collection/printedrigth.png',
      '/collection/printedfeshionside.png',
    ],
    sizes: ['30/XS', '32/S', '34/M', '36/L', '38/XL', '40/2XL'],
  },
  {
    id: 8,
    name: 'FLORAL PRINTED STRAIGHT KURTI SET',
    price: '₹2,799',
    originalPrice: '₹3,899',
    discount: '28% OFF',
    colors: [{ name: 'Multicolor', hex: '#F4A460' }],
    images: [
      '/collection/flowerstrightkurti.png',
      '/collection/flowerstrightkurtifrontside.png',
      '/collection/flowerstrightkurtilefrontside.png',
      '/collection/flowerstrightkurtibackeside.png',
      '/collection/flowerstrightkurtirightside.png',
    ],
    sizes: ['30/XS', '32/S', '34/M', '36/L', '38/XL', '40/2XL'],
  },
  {
    id: 9,
    name: 'GREEN COTTON PRINTED SUIT SET',
    price: '₹2,999',
    originalPrice: '₹4,199',
    discount: '28% OFF',
    colors: [{ name: 'Green', hex: '#2E8B57' }],
    images: [
      '/collection/greencotton.png',
      '/collection/greencottonfront.png',
      '/collection/greencottonleft.png',
      '/collection/greencottonback.png',
      '/collection/greencottonleftsidegreat.png',
      '/collection/greencottonrightsidegreat.png',
    ],
    sizes: ['30/XS', '32/S', '34/M', '36/L', '38/XL', '40/2XL'],
  },
  {
    id: 10,
    name: 'DARK RED FLORAL PRINTED SUIT SET',
    price: '₹3,499',
    originalPrice: '₹4,999',
    discount: '30% OFF',
    colors: [{ name: 'Dark Red', hex: '#8B0000' }],
    images: [
      '/collection/darkredflower.png',
      '/collection/darkredflowerfront.png',
      '/collection/darkredflowerleft.png',
      '/collection/darkredflowerright.png',
      '/collection/darkredflowerback.png',
    ],
    sizes: ['30/XS', '32/S', '34/M', '36/L', '38/XL', '40/2XL'],
  },
  {
    id: 11,
    name: 'ANGRAKHA FESTIVAL ANARKALI SUIT SET',
    price: '₹3,499',
    originalPrice: '₹4,999',
    discount: '30% OFF',
    colors: [{ name: 'Festival Red', hex: '#9B111E' }],
    images: [
      '/collection/angrakhafestivalanrkal.png',
      '/collection/angrakhafestivalanrkalfrontside.png',
      '/collection/angrakhafestivalanrkalleftside.png',
      '/collection/angrakhafestivalanrkalrightside.png',
      '/collection/angrakhafestivalanrkaloutlokingside.png',
    ],
    sizes: ['30/XS', '32/S', '34/M', '36/L', '38/XL', '40/2XL'],
    description: 'Traditional Angrakha style Anarkali suit set with heavy dupatta, intricate borders and regal festival flair.',
    fabric: 'Silk Blend / Georgette',
    fit: 'Anarkali Fit',
  },
  {
    id: 12,
    name: 'OFF WHITE STRAIGHT SUIT SET',
    price: '₹3,499',
    originalPrice: '₹4,999',
    discount: '30% OFF',
    colors: [{ name: 'Off White', hex: '#FAF9F6' }],
    images: [
      '/collection/offwhitestright.png',
      '/collection/offwhitestrightfront.png',
      '/collection/offwhitestrightright.png',
      '/collection/offwhitestrightback.png',
    ],
    sizes: ['30/XS', '32/S', '34/M', '36/L', '38/XL', '40/2XL'],
    description: 'Elegantly crafted Off White Straight Suit Set featuring graceful embroidery and fine tailoring for festive and casual occasions.',
    fabric: 'Cotton Blend / Chiffon',
    fit: 'Straight Fit',
  },
  {
    id: 13,
    name: 'ELEGANT PRINTED SUIT SET',
    price: '₹3,499',
    originalPrice: '₹4,999',
    discount: '30% OFF',
    mainImage: '/collection/printed1.png',
    images: [
      '/collection/printed1.png',
      '/collection/printed1front.png',
      '/collection/printed1left.png',
      '/collection/printed1right.png',
      '/collection/printed1back.png',
    ],
    sizes: ['30/XS', '32/S', '34/M', '36/L', '38/XL', '40/2XL'],
    description: 'Stylish printed suit set with fine detailing and elegant everyday look.',
  },
];

function ProductContent() {
  const searchParams = useSearchParams();
  const productId = Number(searchParams.get('id')) || 1;

  const product = PRODUCTS_DATA.find((p) => p.id === productId) || PRODUCTS_DATA[0];

  const { addToCart } = useCart();

  const [selectedImage, setSelectedImage] = useState(product?.images?.[0] || '');
  const [selectedColor, setSelectedColor] = useState(product?.colors?.[0] || null);
  const [selectedSize, setSelectedSize] = useState(product?.sizes?.[0] || '');

  const [isWishlisted, setIsWishlisted] = useState(false);
  const [pincode, setPincode] = useState('');
  const [deliveryDate, setDeliveryDate] = useState<string | null>(null);
  const [pincodeError, setPincodeError] = useState('');
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    if (product) {
      setSelectedImage(product.images?.[0] || '');
      setSelectedColor(product.colors?.[0] || null);
      setSelectedSize(product.sizes?.[0] || '');
    }
  }, [product.id]);

  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    details: true,
    specs: true,
  });

  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const toggleSection = (section: string) => {
    setOpenSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  const handleCheckPincode = () => {
    if (pincode.length === 6) {
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

  const handleAddToCart = () => {
    addToCart();
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const whatsappNumber = '918385973582';
  const whatsappMessage = encodeURIComponent(
    `Hello! I want to order:\n\n*Product:* ${product.name}\n*Price:* ${product.price}\n*Size:* ${selectedSize || 'N/A'}`
  );
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;

  const faqs = [
    {
      q: 'What material is this suit set made of?',
      a: 'The suit is crafted from soft, breathable Viscose Rayon / Georgette, complemented by a Premium Dupatta.',
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
    <div className="bg-gray-50 min-h-screen py-6 px-4 sm:px-6 lg:px-8 text-gray-800">

      {/* Toast Notification */}
      {showToast && (
        <div className="fixed top-5 right-5 z-50 bg-emerald-600 text-white px-5 py-3 rounded-lg shadow-xl flex items-center gap-2 animate-bounce">
          <span>✓</span>
          <span className="text-sm font-semibold">Added to Bag successfully!</span>
        </div>
      )}

      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto text-xs text-gray-500 mb-6">
        <Link href="/" className="hover:text-rose-600">Home</Link> / <Link href="/" className="hover:text-rose-600">Suit Sets</Link> / <span className="text-gray-800 font-semibold">{product.name}</span>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 bg-white p-4 sm:p-8 rounded-xl shadow-sm border border-gray-100">

        {/* LEFT: Gallery (ZOOM INTEGRATED) */}
        <div className="lg:col-span-5 flex gap-4 relative">
          <div className="flex flex-col gap-2 overflow-y-auto max-h-[500px]">
            {product.images?.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedImage(img)}
                className={`relative w-16 h-20 rounded border transition-all ${
                  selectedImage === img ? 'border-rose-600 ring-2 ring-rose-100' : 'border-gray-200 opacity-80 hover:opacity-100'
                }`}
              >
                <Image src={img} alt={`thumb-${idx}`} fill className="object-cover object-top rounded" />
              </button>
            ))}
          </div>

          <div className="relative flex-1">
            {selectedImage && (
              <ImageZoom src={selectedImage} alt={product.name} images={product.images} />
            )}
            <button
              onClick={() => setIsWishlisted(!isWishlisted)}
              className="absolute top-4 right-4 p-2.5 bg-white/90 hover:bg-white rounded-full shadow-md transition-all z-10"
            >
              <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-rose-600 text-rose-600' : 'text-gray-600'}`} />
            </button>
          </div>
        </div>

        {/* MIDDLE: Product Info */}
        <div className="lg:col-span-4 flex flex-col space-y-5">
          <div>
            <h1 className="text-xl font-bold font-serif text-gray-900 uppercase tracking-wide leading-snug">
              {product.name}
            </h1>
            <div className="flex items-center gap-3 mt-2">
              <span className="text-2xl font-bold text-gray-900">{product.price}</span>
              <span className="text-sm text-gray-400 line-through">MRP {product.originalPrice}</span>
              <span className="text-xs font-bold text-rose-600 bg-rose-50 px-2 py-0.5 rounded">
                {product.discount}
              </span>
            </div>
            <p className="text-xs text-gray-400 mt-1">Inclusive of all taxes</p>
          </div>

          {/* Color Selector */}
          {product.colors && product.colors.length > 0 && (
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-gray-700 block mb-2">
                Select Color: <span className="font-normal text-gray-500">{selectedColor?.name}</span>
              </span>
              <div className="flex items-center gap-3">
                {product.colors.map((c) => (
                  <button
                    key={c.name}
                    onClick={() => setSelectedColor(c)}
                    className={`w-8 h-8 rounded-full border-2 transition-transform ${
                      selectedColor?.name === c.name ? 'border-rose-600 scale-110 shadow-sm' : 'border-gray-300'
                    }`}
                    style={{ backgroundColor: c.hex }}
                    title={c.name}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Size Selector */}
          {product.sizes && product.sizes.length > 0 && (
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold uppercase tracking-wider text-gray-700">Select Size</span>
                <button className="text-xs text-rose-600 underline font-medium">Size Chart</button>
              </div>
              <div className="grid grid-cols-3 gap-2">
                {product.sizes.map((s) => (
                  <button
                    key={s}
                    onClick={() => setSelectedSize(s)}
                    className={`py-2 text-xs font-semibold rounded border transition-all ${
                      selectedSize === s
                        ? 'bg-rose-700 text-white border-rose-700 shadow-sm'
                        : 'bg-white text-gray-700 border-gray-300 hover:border-rose-400'
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* CTAs */}
          <div className="flex gap-3 pt-2">
            <button
              onClick={handleAddToCart}
              className="flex-1 border-2 border-rose-700 text-rose-700 hover:bg-rose-50 font-bold py-3.5 rounded text-xs uppercase tracking-wider transition-colors"
            >
              Add To Bag
            </button>

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3.5 rounded text-xs uppercase tracking-wider shadow-md transition-colors flex items-center justify-center gap-2"
            >
              <MessageCircle className="w-4 h-4 fill-white text-emerald-600" />
              Order on WhatsApp
            </a>
          </div>

          {/* Delivery & Pincode Checker */}
          <div className="border border-gray-200 rounded-lg p-4 bg-gray-50/50 space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-gray-700 flex items-center gap-1.5">
              <Truck className="w-4 h-4 text-rose-600" /> Delivery Options
            </span>
            <div className="flex gap-2">
              <input
                type="text"
                maxLength={6}
                value={pincode}
                onChange={(e) => setPincode(e.target.value)}
                placeholder="Enter 6-digit Pincode"
                className="border border-gray-300 rounded px-3 py-1.5 text-xs flex-1 focus:outline-none focus:border-rose-600"
              />
              <button
                onClick={handleCheckPincode}
                className="bg-gray-800 text-white px-4 py-1.5 rounded text-xs font-bold hover:bg-gray-900 transition-colors"
              >
                CHECK
              </button>
            </div>
            {pincodeError && <p className="text-[11px] text-rose-600 font-medium">{pincodeError}</p>}
            {deliveryDate && <p className="text-[11px] text-emerald-700 font-semibold bg-emerald-50 p-2 rounded">{deliveryDate}</p>}
          </div>

          <div className="grid grid-cols-2 gap-3 text-xs text-gray-600 pt-1">
            <div className="flex items-center gap-2"><ShieldCheck className="w-4 h-4 text-emerald-600" /> 100% Authentic</div>
            <div className="flex items-center gap-2"><RotateCcw className="w-4 h-4 text-emerald-600" /> 7 Days Easy Return</div>
          </div>
        </div>

        {/* RIGHT SIDEBAR */}
        <div className="lg:col-span-3 border-l border-gray-200 pl-0 lg:pl-6 space-y-4">
          <h3 className="text-xs font-bold uppercase tracking-widest text-gray-400 pb-1 border-b">
            Specifications & Details
          </h3>

          <div className="border-b pb-3">
            <button
              onClick={() => toggleSection('details')}
              className="w-full flex justify-between items-center text-xs font-bold uppercase tracking-wider text-gray-800"
            >
              <span>Product Details</span>
              {openSections.details ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>
            {openSections.details && (
              <p className="mt-2 text-xs text-gray-600 leading-relaxed">
                Radiate understated elegance in this exquisite suit set, a perfect fusion of modern refinement and timeless tradition.
              </p>
            )}
          </div>

          <div className="border-b pb-3">
            <button
              onClick={() => toggleSection('specs')}
              className="w-full flex justify-between items-center text-xs font-bold uppercase tracking-wider text-gray-800"
            >
              <span>Key Attributes</span>
              {openSections.specs ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>
            {openSections.specs && (
              <div className="mt-2 space-y-1.5 text-xs text-gray-600">
                <div className="flex justify-between py-1 border-b border-gray-100">
                  <span className="font-medium text-gray-500">Fit</span>
                  <span className="font-semibold text-gray-800">Straight Fit</span>
                </div>
                <div className="flex justify-between py-1 border-b border-gray-100">
                  <span className="font-medium text-gray-500">Fabric</span>
                  <span className="font-semibold text-gray-800">Georgette / Rayon</span>
                </div>
              </div>
            )}
          </div>
        </div>

      </div>

      {/* FAQs Section */}
      <div className="max-w-7xl mx-auto mt-10 bg-white p-6 sm:p-8 rounded-xl shadow-sm border border-gray-100">
        <h2 className="text-lg font-bold font-serif text-gray-900 mb-4 border-b pb-2">
          Frequently Asked Questions (FAQs)
        </h2>

        <div className="space-y-3">
          {faqs.map((faq, idx) => (
            <div key={idx} className="border border-gray-200 rounded-lg overflow-hidden">
              <button
                onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                className="w-full flex justify-between items-center p-4 text-left text-xs sm:text-sm font-semibold text-gray-800 bg-gray-50 hover:bg-gray-100 transition-colors"
              >
                <span>{faq.q}</span>
                {openFaq === idx ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </button>
              {openFaq === idx && (
                <div className="p-4 text-xs sm:text-sm text-gray-600 border-t border-gray-200 bg-white leading-relaxed">
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
    <Suspense fallback={<div className="p-10 text-center text-sm font-semibold text-gray-500">Loading product...</div>}>
      <ProductContent />
    </Suspense>
  );
}