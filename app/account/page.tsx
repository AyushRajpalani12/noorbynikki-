'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { User, Mail, Package, Heart, LogOut, ShieldCheck, ArrowRight, MapPin } from 'lucide-react';

export default function AccountPage() {
  const router = useRouter();
  const [user, setUser] = useState<{ name?: string; email?: string } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const currentUser = localStorage.getItem('currentUser');
    if (currentUser) {
      try {
        setUser(JSON.parse(currentUser));
      } catch {
        setUser(null);
      }
    }
    setLoading(false);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    // Navbar aur baaki components ko turant update karne ke liye custom event fire kar rahe hain
    window.dispatchEvent(new Event('authChange'));
    router.push('/login');
  };

  if (loading) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-rose-600"></div>
      </div>
    );
  }

  // Agar user logged in nahi hai toh login page par bhej do
  if (!user) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4">
        <div className="w-16 h-16 bg-rose-50 text-rose-600 rounded-full flex items-center justify-center mb-4">
          <User className="w-8 h-8" />
        </div>
        <h2 className="text-2xl font-serif font-bold text-gray-900 mb-2">Please Sign In</h2>
        <p className="text-gray-500 text-sm max-w-sm mb-6">You need to be logged in to view your account details and manage orders.</p>
        <Link
          href="/login"
          className="bg-rose-600 hover:bg-rose-700 text-white font-bold py-3 px-8 rounded-xl text-xs uppercase tracking-wider shadow-md transition-all"
        >
          Login Now
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-[85vh] bg-gray-50/50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-6">
        
        {/* Top Profile Header Card */}
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6 sm:p-8 flex flex-col sm:flex-row items-center sm:items-start gap-6">
          <div className="w-20 h-20 bg-rose-100 text-rose-600 rounded-full flex items-center justify-center text-2xl font-bold font-serif shadow-inner">
            {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
          </div>
          <div className="flex-1 text-center sm:text-left">
            <h1 className="text-2xl font-serif font-bold text-gray-900">{user.name || 'Valued Customer'}</h1>
            <p className="text-gray-500 text-sm flex items-center justify-center sm:justify-start gap-1.5 mt-1">
              <Mail className="w-4 h-4 text-gray-400" />
              {user.email || 'No email provided'}
            </p>
            <div className="mt-3 inline-flex items-center gap-1.5 bg-emerald-50 text-emerald-700 px-3 py-1 rounded-full text-xs font-semibold">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Verified Account</span>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 bg-rose-50 hover:bg-rose-100 text-rose-600 px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-colors"
          >
            <LogOut className="w-4 h-4" />
            <span>Logout</span>
          </button>
        </div>

        {/* Account Options Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          
          <Link
            href="/cart"
            className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm hover:border-rose-200 hover:shadow-md transition-all flex items-center justify-between group"
          >
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Package className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-gray-800 text-sm">My Orders</h3>
                <p className="text-xs text-gray-400">View order history</p>
              </div>
            </div>
            <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-rose-600 group-hover:translate-x-1 transition-all" />
          </Link>

          <Link
            href="/wishlist"
            className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm hover:border-rose-200 hover:shadow-md transition-all flex items-center justify-between group"
          >
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Heart className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-gray-800 text-sm">Wishlist</h3>
                <p className="text-xs text-gray-400">Saved favorite items</p>
              </div>
            </div>
            <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-rose-600 group-hover:translate-x-1 transition-all" />
          </Link>

          <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-gray-50 text-gray-600 flex items-center justify-center">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-gray-800 text-sm">Addresses</h3>
                <p className="text-xs text-gray-400">Manage delivery locations</p>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}