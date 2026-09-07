'use client';

import React from 'react';

export default function Playvideo() {
  return (
    <section className="w-full py-16 px-4 sm:px-6 lg:px-8 bg-gray-50/50 my-12">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-rose-600 font-semibold tracking-widest text-xs uppercase mb-2 block">
            Visual Experience
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-gray-900 tracking-wide">
            Craftsmanship in Motion
          </h2>
          <p className="text-gray-600 text-sm sm:text-base mt-3 font-light">
            Witness the intricate details, rich fabrics, and flawless drape of our exclusive royal collection.
          </p>
        </div>

        {/* Videos Grid - Optimized for vertical/reels videos */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 max-w-4xl mx-auto">
          
          {/* First Video Card */}
          <div className="relative group rounded-2xl overflow-hidden shadow-2xl aspect-[9/16] bg-black flex items-center justify-center">
            {/* Background Blurred Layer to fill side spaces */}
            <video
              autoPlay
              loop
              muted
              playsInline
              className="absolute inset-0 w-full h-full object-cover filter blur-xl opacity-50 scale-110 pointer-events-none"
            >
              <source src="/Videos/feshionvideo.mp4" type="video/mp4" />
            </video>

            {/* Main Foreground Video (Puri video dikhegi bina kate) */}
            <video
              autoPlay
              loop
              muted
              playsInline
              className="relative z-10 w-full h-full object-contain object-center"
            >
              <source src="/Videos/feshionvideo.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            
            {/* Gradient Overlay for Text */}
            <div className="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-black/85 via-black/40 to-transparent pointer-events-none z-20" />
            
            <div className="absolute bottom-6 left-6 right-6 text-white pointer-events-none z-30">
              <span className="bg-rose-600/95 text-white text-[10px] font-bold tracking-widest uppercase px-3 py-1 rounded-full mb-2 inline-block shadow-sm">
                Exclusive Look
              </span>
              <h3 className="text-xl sm:text-2xl font-serif font-medium tracking-wide">
                Royal Ethnic Drape
              </h3>
            </div>
          </div>

          {/* Second Video Card */}
          <div className="relative group rounded-2xl overflow-hidden shadow-2xl aspect-[9/16] bg-black flex items-center justify-center">
            {/* Background Blurred Layer to fill side spaces */}
            <video
              autoPlay
              loop
              muted
              playsInline
              className="absolute inset-0 w-full h-full object-cover filter blur-xl opacity-50 scale-110 pointer-events-none"
            >
              <source src="/Videos/feshion1video.mp4" type="video/mp4" />
            </video>

            {/* Main Foreground Video (Puri video dikhegi bina kate) */}
            <video
              autoPlay
              loop
              muted
              playsInline
              className="relative z-10 w-full h-full object-contain object-center"
            >
              <source src="/Videos/feshion1video.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            
            {/* Gradient Overlay for Text */}
            <div className="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-black/85 via-black/40 to-transparent pointer-events-none z-20" />
            
            <div className="absolute bottom-6 left-6 right-6 text-white pointer-events-none z-30">
              <span className="bg-rose-600/95 text-white text-[10px] font-bold tracking-widest uppercase px-3 py-1 rounded-full mb-2 inline-block shadow-sm">
                Signature Style
              </span>
              <h3 className="text-xl sm:text-2xl font-serif font-medium tracking-wide">
                Designer Craftsmanship
              </h3>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}