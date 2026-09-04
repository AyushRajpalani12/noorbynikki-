'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import DashboardSidebar from '@/app/dashboardsidebar/page';
import { ShoppingBag, Heart, ShieldCheck, Clock, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<{ name?: string; email?: string } | null>(null);

  useEffect(() => {
    const currentUser = localStorage.getItem('currentUser');
    if (!currentUser) {
      router.push('/login');
    } else {
      try {
        setUser(JSON.parse(currentUser));
      } catch {
        router.push('/login');
      }
    }
  }, [router]);

  if (!user) return null;

  const firstName = (user.name || 'Valued Customer').split(' ')[0];

  return (
    <div className="min-h-screen bg-[#3A0E1F] flex flex-col lg:flex-row">

      <DashboardSidebar />

      <main className="flex-1 lg:ml-64 bg-[#FAF6F0] flex flex-col">

        {/* Top bar */}
        <div className="fixed top-0 left-0 right-0 lg:left-64 z-30 h-16 flex items-center justify-between bg-[#FAF6F0]/95 backdrop-blur border-b border-[#EFE6DA] px-4 sm:px-6">
          <p className="font-serif text-[15px] text-[#2A211D]">Dashboard</p>
          <div className="flex items-center gap-2.5">
            <span className="text-xs text-[#8B7E74] hidden sm:inline">{user.email}</span>
            <div className="w-8 h-8 rounded-full bg-[#3A0E1F] text-[#E9DAC1] flex items-center justify-center text-xs font-serif font-semibold shrink-0">
              {firstName.charAt(0).toUpperCase()}
            </div>
          </div>
        </div>

        <div className="flex-1 pt-16 px-4 pb-4 sm:px-6 sm:pb-6 flex flex-col gap-5">

        {/* Hero */}
        <div className="relative bg-[#3A0E1F] rounded-2xl px-6 py-10 sm:px-12 sm:py-14 text-[#FAF6F0] overflow-hidden">
          {/* subtle paisley motif, nods to the kurti prints */}
          <svg
            className="absolute -right-8 -top-10 w-64 h-64 opacity-[0.08] pointer-events-none"
            viewBox="0 0 200 200"
            fill="none"
          >
            <path
              d="M100 20c-30 0-45 25-45 50 0 20 12 32 12 48 0 14-10 20-22 20 25 15 55 8 62-15 5-16-4-28-4-42 0-18 14-28 30-28 22 0 34 18 30 38-3 16-18 24-18 40 0 10 8 16 18 14-4 22-28 34-50 26-26-9-38-38-30-64 5-16 18-24 17-40C100 47 88 34 100 20z"
              stroke="#B08D57"
              strokeWidth="2"
            />
          </svg>

          <div className="relative max-w-lg">
            <p className="text-xs tracking-wide text-[#E9DAC1]/80">Customer dashboard</p>
            <h1 className="font-serif text-3xl sm:text-[2.5rem] leading-tight mt-3">
              Welcome back, {firstName}
            </h1>
            <p className="text-[#E9DAC1]/90 text-sm mt-4 leading-relaxed max-w-md">
              Manage your orders, browse new kurti arrivals, and pick up your saved favourites — all from one place.
            </p>
            <Link
              href="/collection"
              className="mt-7 inline-flex items-center gap-2 bg-[#B08D57] hover:bg-[#C29D67] text-[#3A0E1F] px-6 py-3 rounded-full font-semibold text-sm transition-colors"
            >
              Explore the collection
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Stats strip */}
        <div className="bg-white rounded-2xl border border-[#EFE6DA] grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-[#EFE6DA]">
          <div className="flex items-center gap-4 px-7 py-6">
            <ShoppingBag className="w-5 h-5 text-[#3A0E1F]" />
            <div>
              <p className="text-2xl font-semibold text-[#2A211D]">0</p>
              <p className="text-xs text-[#8B7E74] mt-0.5">Orders placed</p>
            </div>
          </div>
          <div className="flex items-center gap-4 px-7 py-6">
            <Heart className="w-5 h-5 text-[#3A0E1F]" />
            <div>
              <p className="text-2xl font-semibold text-[#2A211D]">Active</p>
              <p className="text-xs text-[#8B7E74] mt-0.5">Wishlist</p>
            </div>
          </div>
          <div className="flex items-center gap-4 px-7 py-6">
            <ShieldCheck className="w-5 h-5 text-[#3A0E1F]" />
            <div>
              <p className="text-2xl font-semibold text-[#2A211D]">Verified</p>
              <p className="text-xs text-[#8B7E74] mt-0.5">Account status</p>
            </div>
          </div>
        </div>

        {/* Recent orders */}
        <div className="flex-1 bg-white rounded-2xl border border-[#EFE6DA] p-6 sm:p-8">
          <div className="flex items-center justify-between mb-6 pb-5 border-b border-[#EFE6DA]">
            <div>
              <h3 className="font-serif text-lg text-[#2A211D]">Recent orders</h3>
              <p className="text-xs text-[#8B7E74] mt-1">Track and review your previous purchases</p>
            </div>
            <Clock className="w-5 h-5 text-[#B08D57]" />
          </div>

          <div className="text-center py-14">
            <div className="w-14 h-14 bg-[#FAF6F0] text-[#3A0E1F] rounded-full flex items-center justify-center mx-auto mb-4 border border-[#EFE6DA]">
              <ShoppingBag className="w-6 h-6" />
            </div>
            <p className="text-[#2A211D] font-semibold text-sm">No orders placed yet</p>
            <p className="text-[#8B7E74] text-xs mt-1 max-w-xs mx-auto">
              When you place an order from our store, it will appear here.
            </p>
            <Link
              href="/collection"
              className="mt-6 inline-block bg-[#3A0E1F] hover:bg-[#5C1A34] text-white font-semibold py-3 px-7 rounded-full text-sm transition-colors"
            >
              Start shopping
            </Link>
          </div>
        </div>

        </div>
      </main>
    </div>
  );
}