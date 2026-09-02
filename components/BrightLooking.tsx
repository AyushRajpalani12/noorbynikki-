import React from 'react';
import Image from 'next/image';

const brightDresses = [
  { id: 1, src: '/dress1.png', alt: 'Bright Dress 1' },
  { id: 2, src: '/dress2.png', alt: 'Bright Dress 2' },
  { id: 3, src: '/dress3.png', alt: 'Bright Dress 3' },
  { id: 4, src: '/dress4.png', alt: 'Bright Dress 4' },
  { id: 5, src: '/dress5.png', alt: 'Bright Dress 5' },
  { id: 6, src: '/dress6.png', alt: 'Bright Dress 6' },
];

export default function BrightLooking() {
  return (
    <section className="w-full py-12 px-4 sm:px-6 lg:px-8 bg-[#F8F3EC]">
      <div className="max-w-[1000px] mx-auto">
        
        {/* Section Heading */}
        <div className="text-center mb-8">
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-gray-900 tracking-wide uppercase">
            Curated Styles
          </h2>
          <div className="mt-2 flex items-center justify-center gap-2">
            <span className="h-px w-8 bg-[#C9B28A]" />
            <span className="h-1.5 w-1.5 rotate-45 bg-[#C9B28A]" />
            <span className="h-px w-8 bg-[#C9B28A]" />
          </div>
        </div>

        {/* 3 Upper & 3 Lower Grid Layout */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8">
          {brightDresses.map((item) => (
            <div
              key={item.id}
              className="relative group overflow-hidden rounded-2xl bg-white p-3 shadow-lg border border-[#E7D7C6] transition-all duration-300 hover:scale-105 hover:shadow-xl"
            >
              {/* Full Image Container without cutting (object-contain) */}
              <div className="relative aspect-[3/4] w-full rounded-xl overflow-hidden bg-[#F9F6F0]">
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  className="object-contain object-center transition-transform duration-500 group-hover:scale-105 p-2"
                />
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}