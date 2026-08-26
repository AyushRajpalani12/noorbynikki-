'use client';

import React, { useState, useRef } from 'react';
import Link from 'next/link';
import { Play, Pause, Volume2, VolumeX, MessageCircle } from 'lucide-react';

interface VideoShowcaseProps {
  videoSrc?: string;
  posterSrc?: string;
  title?: string;
  subtitle?: string;
  productName?: string;
  productPrice?: string;
  productUrl?: string;
}

export default function VideoShowcase({
  videoSrc = '/videos/collection-banner.mp4', // Apni video path yahan rakhein
  posterSrc = '/collection/pinkyellow.png',    // Video load hone se pehle ki image
  title = 'NEW ARRIVALS 2026',
  subtitle = 'Discover the elegance of handpicked festive ethnic wear collections.',
  productName = 'PEACH POLY GEORGETTE FLORAL PRINTED SUIT SET',
  productPrice = '₹3,496',
  productUrl = '/product?id=1',
}: VideoShowcaseProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const whatsappNumber = '918385973582';
  const whatsappMessage = encodeURIComponent(
    `Hello! I saw your video showcase product:\n\n*Product:* ${productName}\n*Price:* ${productPrice}`
  );
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;

  return (
    <section className="py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center mb-8">
          <span className="text-xs font-bold uppercase tracking-widest text-rose-600 bg-rose-50 px-3 py-1 rounded-full">
            Featured Collection
          </span>
          <h2 className="text-2xl md:text-4xl font-serif font-bold text-gray-900 mt-2 uppercase tracking-wide">
            Experience In Motion
          </h2>
          <div className="flex items-center justify-center space-x-2 mt-2">
            <span className="h-[1px] w-12 bg-rose-400"></span>
            <span className="text-rose-400 text-sm">✨</span>
            <span className="h-[1px] w-12 bg-rose-400"></span>
          </div>
        </div>

        {/* Big Video Showcase Card */}
        <div className="relative w-full h-[550px] md:h-[650px] rounded-3xl overflow-hidden shadow-2xl border border-gray-100 group">
          
          {/* Background Video */}
          <video
            ref={videoRef}
            src={videoSrc}
            poster={posterSrc}
            autoPlay
            loop
            muted={isMuted}
            playsInline
            className="w-full h-full object-cover object-center scale-105 group-hover:scale-100 transition-transform duration-1000 ease-out"
          />

          {/* Dark Gradient Overlay for readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/20" />

          {/* Top Controls (Mute/Unmute & Play/Pause) */}
          <div className="absolute top-6 right-6 flex items-center gap-3 z-20">
            <button
              onClick={toggleMute}
              className="p-3 bg-black/40 hover:bg-black/70 backdrop-blur-md text-white rounded-full transition-all duration-300 border border-white/20"
              title={isMuted ? 'Unmute' : 'Mute'}
            >
              {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
            </button>

            <button
              onClick={togglePlay}
              className="p-3 bg-black/40 hover:bg-black/70 backdrop-blur-md text-white rounded-full transition-all duration-300 border border-white/20"
              title={isPlaying ? 'Pause' : 'Play'}
            >
              {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
            </button>
          </div>

          {/* Bottom Card Overlay Content */}
          <div className="absolute bottom-0 inset-x-0 p-6 md:p-12 z-20 flex flex-col md:flex-row items-start md:items-end justify-between gap-6">
            
            {/* Title & Subtitle */}
            <div className="max-w-xl text-white space-y-2">
              <span className="text-xs font-semibold tracking-widest text-rose-300 uppercase">
                {title}
              </span>
              <h3 className="text-2xl md:text-3xl font-serif font-bold leading-snug">
                {productName}
              </h3>
              <p className="text-sm text-gray-200 line-clamp-2 font-light">
                {subtitle}
              </p>
              <div className="pt-1">
                <span className="text-2xl font-bold text-white bg-white/20 backdrop-blur-md px-3 py-1 rounded-lg">
                  {productPrice}
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
              <Link
                href={productUrl}
                className="flex-1 md:flex-none bg-white hover:bg-gray-100 text-gray-900 font-bold px-6 py-3.5 rounded-xl shadow-lg transition-all text-xs uppercase tracking-wider text-center"
              >
                View Details
              </Link>

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 md:flex-none bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-6 py-3.5 rounded-xl shadow-lg transition-all text-xs uppercase tracking-wider flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-4 h-4 fill-white text-emerald-600" />
                Order on WhatsApp
              </a>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}