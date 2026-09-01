'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

export interface ArchCardProps {
  id: string | number;
  title?: string;
  image: string;
  link: string;
}

export default function ArchCard({ title, image, link }: ArchCardProps) {
  return (
    <Link href={link} className="group block w-full">
      <div className="relative w-full aspect-[4/5] sm:aspect-[3/4] bg-gray-100 rounded-t-[120px] sm:rounded-t-[160px] rounded-b-3xl overflow-hidden shadow-sm group-hover:shadow-xl transition-all duration-500 border border-gray-100">
        
        {/* Suit Image */}
        <Image
          src={image}
          alt={title || 'Collection Image'}
          fill
          sizes="(max-width: 768px) 50vw, 25vw"
          className="object-cover object-top group-hover:scale-105 transition-transform duration-700 ease-out"
        />

        {/* Subtle Bottom Gradient */}
        {title && (
          <>
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-70 group-hover:opacity-85 transition-opacity duration-300" />
            <div className="absolute bottom-5 inset-x-0 text-center px-3">
              <h3 className="text-white font-serif text-base sm:text-xl font-medium tracking-wide drop-shadow-md">
                {title}
              </h3>
            </div>
          </>
        )}
      </div>
    </Link>
  );
}