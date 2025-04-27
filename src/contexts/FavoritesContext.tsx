// src/contexts/FavoritesContext.tsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product } from '../types';

type FavoritesContextType = {
  favorites: Product[];
  toggleFavorite: (product: Product) => void;
  isFavorite: (productId: string | number) => boolean;
  favoritesCount: number;
};

const FavoritesContext = createContext<FavoritesContextType | undefined>(
  undefined,
);

const STORAGE_KEY = 'favorites';

export const FavoritesProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [favorites, setFavorites] = useState<Product[]>([]);

  // Load favorites from localStorage on initial render
  useEffect(() => {
    try {
      const storedFavorites = localStorage.getItem(STORAGE_KEY);

      if (storedFavorites) {
        setFavorites(JSON.parse(storedFavorites));
      }
    } catch (error) {
      console.error('Error loading favorites from localStorage:', error);
    }
  }, []);

  // Save favorites to localStorage when they change
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
    } catch (error) {
      console.error('Error saving favorites to localStorage:', error);
    }
  }, [favorites]);

  const toggleFavorite = (product: Product) => {
    setFavorites(prevFavorites => {
      const isAlreadyFavorite = prevFavorites.some(
        fav => fav.id === product.id,
      );

      if (isAlreadyFavorite) {
        return prevFavorites.filter(fav => fav.id !== product.id);
      } else {
        return [...prevFavorites, product];
      }
    });
  };

  const isFavorite = (productId: string | number) => {
    return favorites.some(fav => fav.id === productId);
  };

  return (
    <FavoritesContext.Provider
      value={{
        favorites,
        toggleFavorite,
        isFavorite,
        favoritesCount: favorites.length,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => {
  const context = useContext(FavoritesContext);

  if (!context) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }

  return context;
};
