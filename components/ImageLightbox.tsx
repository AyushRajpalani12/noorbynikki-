'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
import { X, ZoomIn, ZoomOut, ChevronLeft, ChevronRight, RotateCcw } from 'lucide-react';

interface ImageLightboxProps {
  images: string[];
  initialIndex?: number;
  isOpen: boolean;
  onClose: () => void;
  alt?: string;
}

const MIN_SCALE = 1;
const MAX_SCALE = 4;

export default function ImageLightbox({
  images,
  initialIndex = 0,
  isOpen,
  onClose,
  alt = 'Product image',
}: ImageLightboxProps) {
  const [index, setIndex] = useState(initialIndex);
  const [scale, setScale] = useState(1);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [entered, setEntered] = useState(false); // drives the pop-in animation
  const [isDragging, setIsDragging] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const dragStart = useRef({ x: 0, y: 0 });
  const posStart = useRef({ x: 0, y: 0 });
  const lastTouchDist = useRef<number | null>(null);
  const lastTapTime = useRef(0);

  const resetView = useCallback(() => {
    setScale(1);
    setPos({ x: 0, y: 0 });
  }, []);

  // Reset & animate in whenever the lightbox opens
  useEffect(() => {
    if (isOpen) {
      setIndex(initialIndex);
      resetView();
      setEntered(false);
      const raf = requestAnimationFrame(() => setEntered(true));
      document.body.style.overflow = 'hidden';
      return () => {
        cancelAnimationFrame(raf);
        document.body.style.overflow = '';
      };
    }
  }, [isOpen, initialIndex, resetView]);

  const goNext = useCallback(() => {
    resetView();
    setIndex((prev) => (prev + 1) % images.length);
  }, [images.length, resetView]);

  const goPrev = useCallback(() => {
    resetView();
    setIndex((prev) => (prev - 1 + images.length) % images.length);
  }, [images.length, resetView]);

  const handleClose = useCallback(() => {
    setEntered(false);
    setTimeout(onClose, 200); // let the closing animation play
  }, [onClose]);

  // Keyboard controls
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') handleClose();
      if (e.key === 'ArrowRight') goNext();
      if (e.key === 'ArrowLeft') goPrev();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isOpen, handleClose, goNext, goPrev]);

  const clampPos = useCallback(
    (x: number, y: number, s: number) => {
      const rect = containerRef.current?.getBoundingClientRect();
      if (!rect) return { x, y };
      const maxX = ((s - 1) * rect.width) / 2;
      const maxY = ((s - 1) * rect.height) / 2;
      return {
        x: Math.min(maxX, Math.max(-maxX, x)),
        y: Math.min(maxY, Math.max(-maxY, y)),
      };
    },
    []
  );

  const zoomTo = useCallback(
    (newScale: number) => {
      const clamped = Math.min(MAX_SCALE, Math.max(MIN_SCALE, newScale));
      setScale(clamped);
      if (clamped === 1) {
        setPos({ x: 0, y: 0 });
      } else {
        setPos((p) => clampPos(p.x, p.y, clamped));
      }
    },
    [clampPos]
  );

  const toggleZoomAt = useCallback(() => {
    zoomTo(scale > 1 ? 1 : 2.5);
  }, [scale, zoomTo]);

  // --- Mouse handlers (desktop) ---
  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    const delta = e.deltaY > 0 ? -0.4 : 0.4;
    zoomTo(scale + delta);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (scale === 1) return;
    setIsDragging(true);
    dragStart.current = { x: e.clientX, y: e.clientY };
    posStart.current = { ...pos };
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    const dx = e.clientX - dragStart.current.x;
    const dy = e.clientY - dragStart.current.y;
    const next = clampPos(posStart.current.x + dx, posStart.current.y + dy, scale);
    setPos(next);
  };

  const handleMouseUp = () => setIsDragging(false);

  // --- Touch handlers (mobile: pinch to zoom, drag to pan, double-tap to toggle) ---
  const touchDistance = (touches: React.TouchList) => {
    const [a, b] = [touches[0], touches[1]];
    return Math.hypot(a.clientX - b.clientX, a.clientY - b.clientY);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 2) {
      lastTouchDist.current = touchDistance(e.touches);
    } else if (e.touches.length === 1) {
      const now = Date.now();
      if (now - lastTapTime.current < 280) {
        toggleZoomAt();
      }
      lastTapTime.current = now;

      if (scale > 1) {
        setIsDragging(true);
        dragStart.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
        posStart.current = { ...pos };
      }
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (e.touches.length === 2 && lastTouchDist.current !== null) {
      const dist = touchDistance(e.touches);
      const ratio = dist / lastTouchDist.current;
      zoomTo(scale * ratio);
      lastTouchDist.current = dist;
    } else if (e.touches.length === 1 && isDragging && scale > 1) {
      const dx = e.touches[0].clientX - dragStart.current.x;
      const dy = e.touches[0].clientY - dragStart.current.y;
      setPos(clampPos(posStart.current.x + dx, posStart.current.y + dy, scale));
    }
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (e.touches.length < 2) lastTouchDist.current = null;
    if (e.touches.length === 0) setIsDragging(false);
  };

  if (!isOpen) return null;

  return (
    <div
      className={`fixed inset-0 z-[100] flex flex-col bg-black/95 backdrop-blur-sm transition-opacity duration-200 ${
        entered ? 'opacity-100' : 'opacity-0'
      }`}
      onClick={(e) => {
        if (e.target === e.currentTarget) handleClose();
      }}
    >
      {/* Top bar */}
      <div className="flex items-center justify-between px-4 py-3 sm:px-6 z-10">
        <span className="text-white/70 text-xs sm:text-sm font-medium tracking-wide">
          {index + 1} / {images.length}
        </span>
        <div className="flex items-center gap-2">
          <button
            onClick={() => zoomTo(scale - 0.6)}
            aria-label="Zoom out"
            className="w-9 h-9 rounded-full flex items-center justify-center bg-white/10 hover:bg-white/20 text-white transition-colors"
          >
            <ZoomOut className="w-4 h-4" />
          </button>
          <button
            onClick={() => zoomTo(scale + 0.6)}
            aria-label="Zoom in"
            className="w-9 h-9 rounded-full flex items-center justify-center bg-white/10 hover:bg-white/20 text-white transition-colors"
          >
            <ZoomIn className="w-4 h-4" />
          </button>
          <button
            onClick={resetView}
            aria-label="Reset zoom"
            className="w-9 h-9 rounded-full flex items-center justify-center bg-white/10 hover:bg-white/20 text-white transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
          <button
            onClick={handleClose}
            aria-label="Close"
            className="w-9 h-9 rounded-full flex items-center justify-center bg-white/10 hover:bg-white/20 text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Image stage */}
      <div
        ref={containerRef}
        className="relative flex-1 overflow-hidden select-none touch-none"
        onWheel={handleWheel}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onDoubleClick={toggleZoomAt}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={images[index]}
          alt={alt}
          draggable={false}
          className={`absolute inset-0 w-full h-full object-contain transition-transform ${
            isDragging ? 'duration-0' : 'duration-300 ease-out'
          } ${entered ? 'scale-100 opacity-100' : 'scale-90 opacity-0'}`}
          style={{
            transform: `translate(${pos.x}px, ${pos.y}px) scale(${scale})`,
            cursor: scale > 1 ? (isDragging ? 'grabbing' : 'grab') : 'zoom-in',
          }}
          onClick={(e) => {
            e.stopPropagation();
            if (scale === 1) toggleZoomAt();
          }}
        />

        {/* Prev / Next */}
        {images.length > 1 && (
          <>
            <button
              onClick={(e) => {
                e.stopPropagation();
                goPrev();
              }}
              aria-label="Previous image"
              className="hidden sm:flex absolute left-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full items-center justify-center bg-white/10 hover:bg-white/20 text-white transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                goNext();
              }}
              aria-label="Next image"
              className="hidden sm:flex absolute right-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full items-center justify-center bg-white/10 hover:bg-white/20 text-white transition-colors"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </>
        )}
      </div>

      {/* Thumbnail strip */}
      {images.length > 1 && (
        <div className="flex items-center justify-center gap-2 py-3 px-4 overflow-x-auto z-10">
          {images.map((img, i) => (
            <button
              key={img}
              onClick={(e) => {
                e.stopPropagation();
                resetView();
                setIndex(i);
              }}
              className={`relative w-12 h-14 sm:w-14 sm:h-16 shrink-0 rounded overflow-hidden border-2 transition-all ${
                i === index ? 'border-white' : 'border-white/20 opacity-60 hover:opacity-90'
              }`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={img} alt="" className="w-full h-full object-cover object-top" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}