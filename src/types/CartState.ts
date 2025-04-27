import { CartItem } from './CartItem';

export interface CartState {
  items: CartItem[];
  total: number;
  totalItems: number;
}
