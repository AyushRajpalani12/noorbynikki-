'use client';

import React, { useState } from 'react';
import { Expand } from 'lucide-react';
import ImageLightbox from './ImageLightbox';

interface ImageZoomProps {
  src: string;
  alt: string;
  /** Full gallery for this product, so the lightbox can navigate prev/next */
  images?: string[];
}

export default function ImageZoom({ src, alt, images }: ImageZoomProps) {
  const [zoomProps, setZoomProps] = useState({
    showZoom: false,
    x: 0,
    y: 0,
    bgX: 0,
    bgY: 0,
  });
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const gallery = images && images.length > 0 ? images : [src];
  const initialIndex = Math.max(0, gallery.indexOf(src));

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    // Hover-magnifier is a desktop/mouse interaction only — skip the work on touch.
    if (window.innerWidth < 1024) return;

    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - left;
    const y = e.clientY - top;

    const bgX = (x / width) * 100;
    const bgY = (y / height) * 100;

    setZoomProps({ showZoom: true, x, y, bgX, bgY });
  };

  // On desktop, hovering already shows the side magnifier — clicking shouldn't
  // also pop a fullscreen modal. On mobile/tablet there's no hover, so a tap
  // opens the pinch/drag lightbox instead.
  const handleClick = () => {
    if (window.innerWidth < 1024) setLightboxOpen(true);
  };

  return (
    <>
      <div
        className="relative w-full h-[500px] overflow-visible cursor-zoom-in lg:cursor-crosshair rounded-lg bg-gray-50 border border-gray-100 group"
        onMouseMove={handleMouseMove}
        onMouseLeave={() => setZoomProps((prev) => ({ ...prev, showZoom: false }))}
        onClick={handleClick}
      >
        <div className="w-full h-full overflow-hidden rounded-lg">
          <img src={src} alt={alt} className="w-full h-full object-cover object-top" />
        </div>

        {/* Expand hint — mobile/tablet only, where tapping opens the lightbox */}
        <div className="lg:hidden absolute bottom-3 right-3 flex items-center gap-1.5 bg-black/60 text-white text-[11px] font-medium px-2.5 py-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
          <Expand className="w-3.5 h-3.5" />
          Tap to zoom
        </div>

        {zoomProps.showZoom && (
          <>
            {/* Hover Lens Box (desktop mouse only) */}
            <div
              className="hidden lg:block absolute w-32 h-32 border border-gray-400 bg-white/20 backdrop-blur-[1px] pointer-events-none shadow-sm"
              style={{
                top: `${zoomProps.y - 64}px`,
                left: `${zoomProps.x - 64}px`,
              }}
            />

            {/* Side Zoom Preview Panel — sits directly beside the image, matching a
                classic e-commerce magnifier: no modal, just a live zoomed view. */}
            <div
              className="hidden lg:block absolute left-[calc(100%+16px)] top-0 w-[440px] h-[500px] border border-gray-200 shadow-xl z-40 bg-white overflow-hidden"
              style={{
                backgroundImage: `url(${src})`,
                backgroundPosition: `${zoomProps.bgX}% ${zoomProps.bgY}%`,
                backgroundSize: '250%',
                backgroundRepeat: 'no-repeat',
              }}
            />
          </>
        )}
      </div>

      <ImageLightbox
        images={gallery}
        initialIndex={initialIndex}
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        alt={alt}
      />
    </>
  );
}