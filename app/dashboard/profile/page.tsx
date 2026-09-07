'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import DashboardSidebar from '@/app/dashboardsidebar/page';
import { Mail, ShieldCheck, LogOut, Package, Heart, MapPin, ArrowRight } from 'lucide-react';

export default function DashboardProfilePage() {
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

  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    window.dispatchEvent(new Event('authChange'));
    router.push('/login');
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-[#3A0E1F] flex flex-col lg:flex-row">
      <DashboardSidebar />

      <main className="flex-1 lg:ml-64 bg-[#FAF6F0] flex flex-col">

        {/* Top bar - Added pl-16 on mobile to completely avoid overlapping with the hamburger menu */}
        <div className="fixed top-0 left-0 right-0 lg:left-64 z-30 h-16 flex items-center justify-between bg-[#FAF6F0]/95 backdrop-blur border-b border-[#EFE6DA] pl-16 pr-4 sm:px-6">
          <p className="font-serif text-sm sm:text-[15px] text-[#2A211D] font-medium tracking-wide truncate">
            Profile Details
          </p>
        </div>

        <div className="flex-1 pt-16 px-4 pb-4 sm:px-6 sm:pb-6 flex flex-col gap-5">

          {/* Profile header */}
          <div className="bg-white rounded-2xl border border-[#EFE6DA] p-6 sm:p-8 flex flex-col sm:flex-row items-center sm:items-start gap-6">
            <div className="w-20 h-20 bg-[#3A0E1F] text-[#E9DAC1] rounded-full flex items-center justify-center text-2xl font-serif font-bold shrink-0">
              {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
            </div>
            <div className="flex-1 text-center sm:text-left">
              <h1 className="font-serif text-2xl text-[#2A211D]">{user.name || 'Valued Customer'}</h1>
              <p className="text-[#8B7E74] text-sm flex items-center justify-center sm:justify-start gap-1.5 mt-1">
                <Mail className="w-4 h-4" />
                {user.email || 'No email provided'}
              </p>
              <div className="mt-3 inline-flex items-center gap-1.5 bg-[#E9DAC1]/40 text-[#7A5A25] px-3 py-1 rounded-full text-xs font-semibold">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Verified account</span>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 bg-[#FAF6F0] hover:bg-[#EFE6DA] text-[#3A0E1F] px-4 py-2.5 rounded-xl text-xs font-semibold transition-colors border border-[#EFE6DA]"
            >
              <LogOut className="w-4 h-4" />
              <span>Logout</span>
            </button>
          </div>

          {/* Quick links */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Link
              href="/dashboard/orders"
              className="bg-white p-5 rounded-2xl border border-[#EFE6DA] flex items-center justify-between group transition-colors hover:border-[#B08D57]"
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-[#FAF6F0] text-[#3A0E1F] flex items-center justify-center">
                  <Package className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-semibold text-[#2A211D] text-sm">My Orders</h3>
                  <p className="text-xs text-[#8B7E74]">View order history</p>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-[#8B7E74] group-hover:text-[#B08D57] group-hover:translate-x-1 transition-all" />
            </Link>

            <Link
              href="/dashboard/wishlist"
              className="bg-white p-5 rounded-2xl border border-[#EFE6DA] flex items-center justify-between group transition-colors hover:border-[#B08D57]"
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-[#FAF6F0] text-[#3A0E1F] flex items-center justify-center">
                  <Heart className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-semibold text-[#2A211D] text-sm">Wishlist</h3>
                  <p className="text-xs text-[#8B7E74]">Saved favourite items</p>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-[#8B7E74] group-hover:text-[#B08D57] group-hover:translate-x-1 transition-all" />
            </Link>

            <Link
              href="/dashboard/addresses"
              className="bg-white p-5 rounded-2xl border border-[#EFE6DA] flex items-center justify-between group transition-colors hover:border-[#B08D57]"
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-[#FAF6F0] text-[#3A0E1F] flex items-center justify-center">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-semibold text-[#2A211D] text-sm">Addresses</h3>
                  <p className="text-xs text-[#8B7E74]">Manage delivery locations</p>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-[#8B7E74] group-hover:text-[#B08D57] group-hover:translate-x-1 transition-all" />
            </Link>
          </div>

        </div>
      </main>
    </div>
  );
}