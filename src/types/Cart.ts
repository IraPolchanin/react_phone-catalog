// src/types/Cart.ts
import { Product } from './Product'; // шляхи можливо треба буде адаптувати

export interface CartItem {
  id: string | number;
  product: Product;
  quantity: number;
}

export interface CartContextType {
  cartItems: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string | number) => void;
  changeQuantity: (productId: string | number, quantity: number) => void;
  clearCart: () => void;
  isInCart: (productId: string | number) => boolean;
  totalQuantity: number;
  totalAmount: number;
}
