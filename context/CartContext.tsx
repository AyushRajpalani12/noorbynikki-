'use client';

import React, { createContext, useContext, useState } from 'react';

export interface CartItem {
  id: number | string;
  name: string;
  price: string;
  image: string;
  size?: string;
  quantity: number;
}

interface CartContextType {
  cartCount: number;
  cartItems: CartItem[];
  addToCart: (item: Omit<CartItem, 'quantity'>) => void;
  removeFromCart: (id: number | string) => void;
  updateQuantity: (id: number | string, qty: number) => void;
  isCartOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const addToCart = (item: Omit<CartItem, 'quantity'>) => {
    setCartItems((prev) => {
      const existing = prev.find((p) => p.id === item.id && p.size === item.size);
      if (existing) {
        return prev.map((p) =>
          p.id === item.id && p.size === item.size
            ? { ...p, quantity: p.quantity + 1 }
            : p
        );
      }
      return [...prev, { ...item, quantity: 1 }];
    });
    setIsCartOpen(true); // add hote hi drawer khul jayega
  };

  const removeFromCart = (id: number | string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const updateQuantity = (id: number | string, qty: number) => {
    if (qty < 1) return;
    setCartItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, quantity: qty } : item))
    );
  };

  const openCart = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);

  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cartCount,
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        isCartOpen,
        openCart,
        closeCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}