'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { ArrowDown } from 'lucide-react';
import api from '@/lib/api';

interface DynamicBannerProps {
  position: string; // e.g. "collection" ya "shop new latest"
  targetId?: string;
}

export default function DynamicBanner({ position, targetId }: DynamicBannerProps) {
  const [banner, setBanner] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    const fetchBanner = async () => {
      try {
        setLoading(true);
        setError(null);

        console.log(`🚀 [DynamicBanner] Fetching banner for position: "${position}"`);

        // Exact endpoint match: /banners?position=...
        const endpoint = `/banners?position=${encodeURIComponent(position)}`;
        console.log(`🔗 [DynamicBanner] Request URL:`, endpoint);

        const res = await api.get(endpoint);
        console.log(`✅ [DynamicBanner] Response received for "${position}":`, res.data);

        const resData = res.data || res;

        // Backend response format check
        let bannerItem = null;
        if (Array.isArray(resData?.data)) {
          bannerItem = resData.data[0];
        } else if (resData?.data && typeof resData.data === 'object') {
          bannerItem = resData.data;
        } else if (Array.isArray(resData)) {
          bannerItem = resData[0];
        }

        if (isMounted) {
          if (bannerItem) {
            console.log(`🎯 [DynamicBanner] Active Banner Object:`, bannerItem);
            setBanner(bannerItem);
          } else {
            console.warn(`⚠️ [DynamicBanner] No banner found for position: "${position}"`);
          }
        }
      } catch (err: any) {
        console.error(`❌ [DynamicBanner] Error fetching position "${position}":`, err);
        if (isMounted) setError(err.message || 'Failed to load banner');
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    if (position) {
      fetchBanner();
    }

    return () => {
      isMounted = false;
    };
  }, [position]);

  const handleScroll = () => {
    if (targetId) {
      const element = document.getElementById(targetId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  // Jab data load ho raha ho toh placeholder container dikhayein taaki pata chale component laga hai
  if (loading) {
    return (
      <div className="relative w-full h-[380px] bg-stone-100 flex items-center justify-center text-xs uppercase tracking-widest text-stone-400 animate-pulse">
        Loading {position} banner...
      </div>
    );
  }

  // Agar backend me us position ka banner nahi mila
  if (!banner) {
    return (
      <div className="w-full py-8 text-center text-xs text-amber-700 bg-amber-50 border border-amber-200">
        [Debug] No banner data found in backend for position: <b>&quot;{position}&quot;</b>
      </div>
    );
  }

  const badgeText = banner.badge || 'ELEGANCE IN EVERY DETAIL';
  const titleText = banner.title || 'Exclusive Royal Collection';
  const subtitleText = banner.subtitle || '';
  const buttonText = banner.buttonText || 'Explore Collections';
  const imageSrc = banner.imageUrl ;

  return (
    <div className="relative w-full h-[350px] sm:h-[420px] md:h-[480px] lg:h-[520px] overflow-hidden shadow-md">
      {/* Cloudinary Image */}
      <Image
        src={imageSrc}
        alt={titleText}
        fill
        priority
        unoptimized={typeof imageSrc === 'string' && imageSrc.startsWith('http')}
        className="object-cover object-center w-full h-full brightness-[1.05] contrast-[1.05]"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/30 to-black/50 flex flex-col items-center justify-center text-center px-4">
        {badgeText && (
          <span className="text-rose-200 font-semibold tracking-widest text-xs uppercase mb-2 drop-shadow-md">
            {badgeText}
          </span>
        )}

        <h1 className="text-3xl sm:text-5xl font-serif font-bold text-white tracking-wide max-w-2xl leading-tight drop-shadow-lg">
          {titleText}
        </h1>

        {subtitleText && (
          <p className="text-gray-100 text-sm sm:text-base mt-3 max-w-lg font-light drop-shadow">
            {subtitleText}
          </p>
        )}

        <button
          type="button"
          onClick={handleScroll}
          className="mt-6 inline-flex items-center gap-2 bg-rose-600 hover:bg-rose-700 text-white font-bold py-3 px-8 rounded-full shadow-xl transition-all transform hover:-translate-y-0.5 text-xs sm:text-sm uppercase tracking-wider cursor-pointer"
        >
          {buttonText}
          <ArrowDown className="w-4 h-4 animate-bounce" />
        </button>
      </div>
    </div>
  );
}