import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { CartProvider } from '@/context/CartContext';
import { WishlistProvider } from '@/context/WishlistContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'KURTI STORE - Handcrafted Suit Sets & Ethnic Wear',
  description: 'Explore the finest collection of Anarkalis, Rayon Suit Sets, and Cotton Kurtis.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <CartProvider>
          <WishlistProvider>
            {/* Top Navbar */}
            <Navbar />

            {/* Page Content */}
            <main className="min-h-screen">
              {children}
            </main>

            {/* Bottom Permanent Footer */}
            <Footer />
          </WishlistProvider>
        </CartProvider>
      </body>
    </html>
  );
}