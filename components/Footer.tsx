'use client';

import React from 'react';
import Link from 'next/link';
import { MessageCircle, Phone, Mail, MapPin, Heart, ShieldCheck, Truck, RotateCcw } from 'lucide-react';

export default function Footer() {
  const whatsappNumber = '918385973582';
  const whatsappMessage = encodeURIComponent('Hello! I have a query regarding your ethnic suit collection.');
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;

  return (
    <footer className="bg-stone-900 text-stone-300 pt-12 pb-6 border-t border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Feature Highlights Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pb-10 border-b border-stone-800 text-center md:text-left">
          <div className="flex flex-col md:flex-row items-center gap-3">
            <div className="p-3 bg-rose-950/60 text-rose-400 rounded-xl border border-rose-900/50">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <h5 className="text-xs font-bold text-white uppercase tracking-wider">Free Shipping</h5>
              <p className="text-[11px] text-stone-400">All India Delivery</p>
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-center gap-3">
            <div className="p-3 bg-emerald-950/60 text-emerald-400 rounded-xl border border-emerald-900/50">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h5 className="text-xs font-bold text-white uppercase tracking-wider">100% Authentic</h5>
              <p className="text-[11px] text-stone-400">Premium Handpicked Quality</p>
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-center gap-3">
            <div className="p-3 bg-amber-950/60 text-amber-400 rounded-xl border border-amber-900/50">
              <RotateCcw className="w-5 h-5" />
            </div>
            <div>
              <h5 className="text-xs font-bold text-white uppercase tracking-wider">Easy Returns</h5>
              <p className="text-[11px] text-stone-400">7-Day Hassle Free Exchange</p>
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-center gap-3">
            <div className="p-3 bg-sky-950/60 text-sky-400 rounded-xl border border-sky-900/50">
              <MessageCircle className="w-5 h-5" />
            </div>
            <div>
              <h5 className="text-xs font-bold text-white uppercase tracking-wider">Instant Support</h5>
              <p className="text-[11px] text-stone-400">Order & Chat via WhatsApp</p>
            </div>
          </div>
        </div>

        {/* Main Footer Links Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 py-10">
          
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <h3 className="text-xl font-serif font-bold text-white uppercase tracking-wider">
              ETHNIC <span className="text-rose-400">BOUTIQUE</span>
            </h3>
            <p className="text-xs text-stone-400 leading-relaxed max-w-sm">
              Discover timeless elegance with our exquisite range of Anarkali suits, Rayon print sets, and hand-embroidered ethnic wear crafted for every celebration.
            </p>
            <div className="pt-2">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-4 py-2.5 rounded-lg text-xs uppercase tracking-wider transition-all shadow-md"
              >
                <MessageCircle className="w-4 h-4 fill-white text-emerald-600" />
                Chat On WhatsApp
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-widest text-white border-b border-rose-500/30 pb-2 inline-block">
              Quick Links
            </h4>
            <ul className="space-y-2 text-xs">
              <li><Link href="/" className="hover:text-rose-400 transition-colors">Home</Link></li>
              <li><Link href="/#collection" className="hover:text-rose-400 transition-colors">Most Loved Sets</Link></li>
              <li><Link href="/product?id=1" className="hover:text-rose-400 transition-colors">Featured Collection</Link></li>
              <li><Link href="/cart" className="hover:text-rose-400 transition-colors">Shopping Bag</Link></li>
            </ul>
          </div>

          {/* Collections */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-widest text-white border-b border-rose-500/30 pb-2 inline-block">
              Categories
            </h4>
            <ul className="space-y-2 text-xs">
              <li><Link href="/#collection" className="hover:text-rose-400 transition-colors">Anarkali Suit Sets</Link></li>
              <li><Link href="/#collection" className="hover:text-rose-400 transition-colors">Printed Rayon Sets</Link></li>
              <li><Link href="/#collection" className="hover:text-rose-400 transition-colors">Cotton Straight Suits</Link></li>
              <li><Link href="/#collection" className="hover:text-rose-400 transition-colors">Georgette Festive Wear</Link></li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-widest text-white border-b border-rose-500/30 pb-2 inline-block">
              Get In Touch
            </h4>
            <ul className="space-y-2.5 text-xs text-stone-400">
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-rose-400 shrink-0" />
                <span>+91 83859 73582</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-rose-400 shrink-0" />
                <span>support@ethnicboutique.com</span>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                <span>Rajasthan, India</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Copyright Bar */}
        <div className="pt-6 mt-6 border-t border-stone-800 flex flex-col sm:flex-row items-center justify-between text-xs text-stone-500 gap-4">
          <p>© {new Date().getFullYear()} Ethnic Boutique. All Rights Reserved.</p>
          <p className="flex items-center gap-1">
            Crafted with <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" /> for Indian Ethnic Fashion
          </p>
        </div>

      </div>
    </footer>
  );
}