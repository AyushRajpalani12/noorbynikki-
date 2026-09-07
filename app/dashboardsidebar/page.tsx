'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  LayoutDashboard,
  ShoppingBag,
  Heart,
  User,
  MapPin,
  LogOut,
  Home,
  Bell,
  Menu,
  X,
} from 'lucide-react';

export default function DashboardSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [unreadCount, setUnreadCount] = useState(0);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    window.dispatchEvent(new Event('authChange'));
    router.push('/login');
  };

  useEffect(() => {
    const loadCount = () => {
      const stored = localStorage.getItem('dashboardNotifications');
      if (stored) {
        try {
          const list = JSON.parse(stored);
          setUnreadCount(list.filter((n: any) => !n.read).length);
        } catch {}
      }
    };

    loadCount();

    const handleNew = (e: Event) => {
      const custom = e as CustomEvent<{ message: string }>;
      const stored = localStorage.getItem('dashboardNotifications');
      const list = stored ? JSON.parse(stored) : [];
      const updated = [
        { id: crypto.randomUUID(), message: custom.detail.message, read: false },
        ...list,
      ].slice(0, 50);
      localStorage.setItem('dashboardNotifications', JSON.stringify(updated));
      setUnreadCount(updated.filter((n: any) => !n.read).length);
    };

    window.addEventListener('dashboardNotification', handleNew);
    return () => window.removeEventListener('dashboardNotification', handleNew);
  }, []);

  // Route change hone par mobile sidebar auto close ho jaye
  useEffect(() => {
    setSidebarOpen(false);
  }, [pathname]);

  const handleBellClick = () => {
    const stored = localStorage.getItem('dashboardNotifications');
    if (stored) {
      const list = JSON.parse(stored).map((n: any) => ({ ...n, read: true }));
      localStorage.setItem('dashboardNotifications', JSON.stringify(list));
      setUnreadCount(0);
    }
  };

  const menuItems = [
    { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
    { name: 'My Orders', href: '/dashboard/orders', icon: ShoppingBag },
    { name: 'Wishlist', href: '/dashboard/wishlist', icon: Heart },
    { name: 'Profile Details', href: '/dashboard/profile', icon: User },
    { name: 'Saved Addresses', href: '/dashboard/addresses', icon: MapPin },
  ];

  return (
    <>
      {/* Mobile hamburger button */}
      <button
        onClick={() => setSidebarOpen(true)}
        className="lg:hidden fixed top-4 left-4 z-50 bg-[#3A0E1F] text-white p-2.5 rounded-lg shadow-md"
      >
        <Menu className="w-5 h-5" />
      </button>

      {/* Mobile backdrop */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
        />
      )}

      <aside
        className={`
          fixed top-0 left-0 h-screen w-72 z-50 overflow-y-auto
          bg-[#3A0E1F] text-[#FAF6F0] p-6 flex flex-col justify-between shrink-0
          transform transition-transform duration-300 ease-in-out
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
          lg:translate-x-0 lg:w-64
        `}
      >
        <div>
          {/* Brand + Notification Bell */}
          <div className="flex items-center justify-between px-1 mb-8 pb-6 border-b border-white/10">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#B08D57] text-[#3A0E1F] flex items-center justify-center font-serif font-bold text-base">
                U
              </div>
              <div>
                <h3 className="font-serif text-[15px] leading-tight">User Portal</h3>
                <p className="text-[11px] text-[#E9DAC1]/70">Manage your account</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleBellClick}
                className="relative text-[#E9DAC1]/80 hover:text-white p-1"
              >
                <Bell className="w-5 h-5" />
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-600 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center">
                    {unreadCount}
                  </span>
                )}
              </button>

              {/* Mobile close button */}
              <button
                onClick={() => setSidebarOpen(false)}
                className="lg:hidden text-[#E9DAC1]/80 hover:text-white p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Home button */}
          <Link
            href="/"
            className="flex items-center gap-3.5 pl-4 pr-3 py-3 mb-4 rounded-lg text-sm border border-white/10 text-[#E9DAC1]/80 hover:text-white hover:bg-white/5 transition-colors"
          >
            <Home className="w-4 h-4 shrink-0" />
            <span>Back to Home</span>
          </Link>

          {/* Nav */}
          <nav className="space-y-1">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center gap-3.5 pl-4 pr-3 py-3 rounded-lg text-sm transition-colors border-l-2 ${
                    isActive
                      ? 'bg-white/5 border-[#B08D57] text-white font-medium'
                      : 'border-transparent text-[#E9DAC1]/70 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <Icon className="w-4 h-4 shrink-0" />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Logout */}
        <div className="pt-6 mt-6 border-t border-white/10">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3.5 w-full pl-4 pr-3 py-3 rounded-lg text-sm text-[#E9DAC1]/80 hover:text-white hover:bg-white/5 transition-colors cursor-pointer"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign out</span>
          </button>
        </div>
      </aside>
    </>
  );
}