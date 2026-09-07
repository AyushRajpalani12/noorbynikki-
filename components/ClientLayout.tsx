'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  
  // Yeh check karega ki agar URL '/dashboard' se shuru hota hai
  const isDashboard = pathname?.startsWith('/dashboard');

  return (
    <>
      {/* Agar dashboard par hain toh Navbar nahi dikhega */}
      {!isDashboard && <Navbar />}

      <main className="min-h-screen">
        {children}
      </main>

      {/* Agar dashboard par hain toh Footer nahi dikhega */}
      {!isDashboard && <Footer />}
    </>
  );
}