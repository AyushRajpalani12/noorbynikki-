'use client';
import HeroBanner from '@/components/HeroBanner';
import HeroSlider from "@/components/HeroSlider";
import ExploreCollections from "@/components/ExploreCollections";
import MostLoved from "@/components/MostLoved";
import FestivalSale from '@/components/FestivalSale';
import Card from '@/components/Card';
import Looking from '@/components/Looking';
export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      {/* Navbar yahan se hata diya hai kyunki layout.tsx me already maujood hai */}
      <HeroSlider />
      <ExploreCollections />
   
      <FestivalSale />
      <Card/>
      <MostLoved />
      <HeroBanner />
   <Looking/>
    </main>
  );
}