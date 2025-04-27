import { Product } from './Product';

export interface FavoritesState {
  items: Product[];
}

export interface UseFavoritesReturn {
  favorites: FavoritesState;
  addToFavorites: (product: Product) => void;
  removeFromFavorites: (id: string) => void;
  isFavorite: (id: string) => boolean;
}

// Для Redux/Context (якщо використовуєте)
export type FavoritesAction =
  | { type: 'ADD_TO_FAVORITES'; payload: Product }
  | { type: 'REMOVE_FROM_FAVORITES'; payload: string };
