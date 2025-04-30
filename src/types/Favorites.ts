// src/types/Favorites.ts
import { Product } from './Product';

export interface FavoritesContextType {
  favorites: Product[];
  toggleFavorite: (product: Product) => void;
  isFavorite: (productId: string | number) => boolean;
  favoritesCount: number;
}
