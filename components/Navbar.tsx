"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ShoppingBag, Search, User, Menu, X, ChevronRight } from "lucide-react";
import { useCart } from "@/context/CartContext";

export default function Navbar() {
  const { cartCount } = useCart();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Anarkali", href: "/collection?category=anarkali" },
    { name: "Printed", href: "/collection?category=printed" },
    { name: "Cotton Kurtis", href: "/collection?category=cotton" },
    { name: "Party Wear", href: "/collection?category=partywear" },
  ];

  return (
    <>
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          
          {/* Left Side: Mobile Menu Button & Brand Logo */}
          <div className="flex items-center gap-3">
            {/* Mobile Menu Trigger Button */}
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="md:hidden text-gray-700 hover:text-rose-600 p-1 rounded-lg transition-colors focus:outline-none"
              aria-label="Open Menu"
            >
              <Menu className="w-6 h-6" />
            </button>

            {/* Logo -> Redirects to Home */}
            <Link href="/" className="text-xl sm:text-2xl font-bold tracking-wider text-rose-600 font-serif">
              KURTI<span className="text-gray-800">STORE</span>
            </Link>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex space-x-8 font-medium text-gray-700 text-sm tracking-wide">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="hover:text-rose-600 transition-colors"
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Right Action Icons */}
          <div className="flex items-center space-x-3 sm:space-x-5 text-gray-700">
            
            {/* Search Button */}
            <button className="hover:text-rose-600 p-1.5 rounded-full hover:bg-rose-50 transition-colors">
              <Search className="w-5 h-5" />
            </button>
            
            {/* Profile Button */}
            <button className="hover:text-rose-600 p-1.5 rounded-full hover:bg-rose-50 transition-colors">
              <User className="w-5 h-5" />
            </button>
            
            {/* Cart Icon */}
            <Link
              href="/cart"
              className="hover:text-rose-600 p-1.5 rounded-full hover:bg-rose-50 transition-colors relative"
            >
              <ShoppingBag className="w-5 h-5" />
              <span
                className={`absolute top-0 right-0 text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center ${
                  cartCount > 0 ? "bg-rose-600 animate-pulse" : "bg-gray-400"
                }`}
              >
                {cartCount > 0 ? cartCount : 0}
              </span>
            </Link>

          </div>

        </div>
      </header>

      {/* MOBILE DRAWER MENU & BACKDROP OVERLAY */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          
          {/* Backdrop Overlay */}
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-300"
            onClick={() => setIsMobileMenuOpen(false)}
          />

          {/* Sliding Drawer */}
          <div className="fixed inset-y-0 left-0 w-[80%] max-w-sm bg-white shadow-2xl z-50 flex flex-col justify-between transform transition-transform duration-300 ease-in-out">
            
            <div>
              {/* Drawer Header */}
              <div className="p-4 border-b border-gray-100 flex items-center justify-between">
                <Link
                  href="/"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-xl font-bold tracking-wider text-rose-600 font-serif"
                >
                  KURTI<span className="text-gray-800">STORE</span>
                </Link>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-1.5 rounded-full text-gray-500 hover:bg-gray-100 transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Drawer Links List */}
              <nav className="p-4 space-y-1">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center justify-between px-4 py-3 rounded-xl text-gray-800 font-medium text-sm hover:bg-rose-50 hover:text-rose-600 transition-all"
                  >
                    <span>{link.name}</span>
                    <ChevronRight className="w-4 h-4 text-gray-400" />
                  </Link>
                ))}
              </nav>
            </div>

            {/* Drawer Footer / Account Info */}
            <div className="p-4 border-t border-gray-100 bg-gray-50">
              <Link
                href="/cart"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center justify-between w-full bg-rose-600 text-white font-semibold py-3 px-4 rounded-xl text-xs uppercase tracking-wider shadow-md hover:bg-rose-700 transition-colors"
              >
                <div className="flex items-center gap-2">
                  <ShoppingBag className="w-4 h-4" />
                  <span>View Shopping Bag</span>
                </div>
                <span className="bg-white/20 px-2 py-0.5 rounded-full text-[10px]">
                  {cartCount} Items
                </span>
              </Link>
            </div>

          </div>

        </div>
      )}
    </>
  );
}