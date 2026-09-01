'use client';

import React from 'react';
import Image from 'next/image';
import ArchCard from './ArchCard';

export default function TrendingSuits() {
  // Direct matching 4 images from your public folder
  const collections = [
    { id: 1, title: 'Anarkali Suits', image: '/collection/suet1.png', link: '/collection?category=anarkali' },
    { id: 2, title: 'Printed Suit', image: '/collection/suite2.png', link: '/collection?category=printed' },
    { id: 3, title: 'Cotton Kurti', image: '/collection/suite3.png', link: '/collection?category=cotton' },
    { id: 4, title: 'Party Wear', image: '/collection/suite4.png', link: '/collection?category=partywear' },
  ];

  return (
    <section className="w-full bg-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title */}
        <div className="text-center mb-10">
          <h2 className="text-2xl sm:text-3xl font-serif font-bold tracking-wider text-gray-900 uppercase">
            TRENDING COLLECTIONS
          </h2>
          <div className="flex items-center justify-center space-x-2 mt-2">
            <span className="h-[1px] w-12 bg-rose-400"></span>
            <span className="text-rose-400 text-sm">🌸</span>
            <span className="h-[1px] w-12 bg-rose-400"></span>
          </div>
        </div>

        {/* 4 Arch Cards Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
          {collections.map((item) => (
            <ArchCard
              key={item.id}
              id={item.id}
              title={item.title}
              image={item.image}
              link={item.link}
            />
          ))}
        </div>

      </div>
    </section>
  );
}