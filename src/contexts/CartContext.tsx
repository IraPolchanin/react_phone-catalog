// src/contexts/CartContext.tsx
import React, { createContext, useContext, useState, useEffect } from 'react';

import { Product, CartItem, CartContextType } from '../types';

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [totalQuantity, setTotalQuantity] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);

  // Load cart from localStorage on initial render
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');

    if (savedCart) {
      try {
        const parsedCart = JSON.parse(savedCart);

        setCartItems(parsedCart);
      } catch (error) {
        console.error('Failed to parse cart from localStorage:', error);
      }
    }
  }, []);

  // Calculate totals when cart items change
  useEffect(() => {
    const quantity = cartItems.reduce(
      (total, item) => total + item.quantity,
      0,
    );

    // Handle potentially undefined price by using 0 as fallback
    const amount = cartItems.reduce(
      (total, item) => total + (item.product.price || 0) * item.quantity,
      0,
    );

    setTotalQuantity(quantity);
    setTotalAmount(amount);

    // Save to localStorage
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (product: Product) => {
    setCartItems(prevItems => {
      // Check if product already exists in cart
      const existingItem = prevItems.find(
        item => item.product.id === product.id,
      );

      if (existingItem) {
        // If already in cart, just return the current items
        return prevItems;
      }

      // If not in cart, add it with quantity 1
      return [...prevItems, { id: product.id, product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId: string | number) => {
    setCartItems(prevItems =>
      prevItems.filter(item => item.product.id !== productId),
    );
  };

  const changeQuantity = (productId: string | number, quantity: number) => {
    if (quantity < 1) {
      return;
    }

    setCartItems(prevItems =>
      prevItems.map(item =>
        item.product.id === productId ? { ...item, quantity } : item,
      ),
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const isInCart = (productId: string | number) => {
    return cartItems.some(item => item.product.id === productId);
  };

  const value = {
    cartItems,
    addToCart,
    removeFromCart,
    changeQuantity,
    clearCart,
    isInCart,
    totalQuantity,
    totalAmount,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = (): CartContextType => {
  const context = useContext(CartContext);

  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }

  return context;
};
