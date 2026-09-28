'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Loader2 } from 'lucide-react';
import API from '@/lib/api';

interface CollectionItem {
  id: string | number;
  title: string;
  image: string;
  link: string;
}

const defaultCollections: CollectionItem[] = [
  { id: 1, title: 'Anarkali Kurtis', image: '/anarkalikurti.png', link: '/collection' },
  { id: 2, title: 'A-Line Kurtis', image: '/alinekurti.png', link: '/collection' },
  { id: 3, title: 'Classic Kurtis', image: '/classickurti1.png', link: '/collection' },
  { id: 4, title: 'Printed Kurtis', image: '/printendkurti.png', link: '/collection' },
  { id: 5, title: 'Party Wear Kurtis', image: '/partwearkurti.png', link: '/collection' },
  { id: 6, title: 'Suit Set Kurtis', image: '/sutset.png', link: '/collection' },
];

export default function ExploreCollections() {
  const [collections, setCollections] = useState<CollectionItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await API.get('/categories');
        const rawData = response.data?.data || response.data || [];

        if (Array.isArray(rawData) && rawData.length > 0) {
          const mapped: CollectionItem[] = rawData.map((cat: any) => ({
            id: cat._id || cat.id,
            title: cat.name || cat.title,
            image: cat.image || cat.imageUrl || '/anarkalikurti.png',
            link: cat.slug ? `/collection?category=${cat.slug}` : '/collection',
          }));
          setCollections(mapped);
        } else {
          setCollections(defaultCollections);
        }
      } catch (error) {
        console.error('Failed to load categories:', error);
        setCollections(defaultCollections);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  return (
    <section className="py-12 bg-rose-50/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-serif font-bold tracking-wide text-gray-800 uppercase">
            Explore Collections
          </h2>
          <div className="flex items-center justify-center space-x-2 mt-2">
            <span className="h-[1px] w-12 bg-rose-400"></span>
            <span className="text-rose-400 text-sm">🌸</span>
            <span className="h-[1px] w-12 bg-rose-400"></span>
          </div>
        </div>

        {/* Loading Spinner */}
        {loading ? (
          <div className="flex justify-center items-center py-12">
            <Loader2 className="w-8 h-8 animate-spin text-rose-500" />
          </div>
        ) : (
          /* Collections Grid */
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6 md:gap-8">
            {collections.map((item) => (
              <Link key={item.id} href={item.link} className="group flex flex-col items-center">
                
                {/* Circular Image Container */}
                <div className="relative w-36 h-36 md:w-44 md:h-44 rounded-full overflow-hidden border-2 border-rose-200 shadow-md transition-all duration-300 group-hover:shadow-xl group-hover:border-rose-400 bg-white">
                  <Image
                    src={item.image && item.image.trim() !== '' ? item.image : '/anarkalikurti.png'}
                    alt={item.title}
                    fill
                    sizes="(max-width: 640px) 144px, 176px"
                    unoptimized={item.image?.startsWith('http')}
                    className="object-cover object-top transition-transform duration-500 group-hover:scale-110"
                  />
                </div>

                {/* Title & Shop Now Link */}
                <div className="text-center mt-4">
                  <h3 className="text-sm md:text-base font-medium text-gray-800 group-hover:text-rose-600 transition-colors">
                    {item.title}
                  </h3>
                  <span className="inline-flex items-center text-xs text-rose-500 font-semibold mt-1 group-hover:underline">
                    SHOP NOW 
                    <span className="ml-1 transition-transform group-hover:translate-x-1">→</span>
                  </span>
                </div>

              </Link>
            ))}
          </div>
        )}

      </div>
    </section>
  );
}