import React from 'react';

export default function MyBright() {
  return (
    <section className="w-full py-12 px-4 sm:px-6 lg:px-8 bg-[#F8F3EC]">
      {/* Grand Full Width Video Banner Card */}
      <div className="relative w-full max-w-[1400px] mx-auto rounded-[2.5rem] overflow-hidden shadow-2xl border border-[#E2D2C3] bg-black">
        
        {/* Video Element with Auto-play, Loop, Muted and Full Screen Fit */}
        <div className="relative w-full h-[350px] sm:h-[500px] lg:h-[600px] overflow-hidden">
          <video
            src="/Videos/brightvideo.mp4"
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover object-center"
          />
          
          {/* Subtle gradient overlay to enhance look and feel */}
          <div className="absolute inset-0 bg-black/20 pointer-events-none" />
        </div>

      </div>
    </section>
  );
}