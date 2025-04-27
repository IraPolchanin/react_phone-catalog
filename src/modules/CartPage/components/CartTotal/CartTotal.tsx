// src/modules/CartPage/components/CartTotal/CartTotal.tsx
import React from 'react';
import { useCart } from '../../../../contexts/CartContext';
import styles from './CartTotal.module.scss';

interface CartTotalProps {
  onCheckout: () => void;
}

export const CartTotal: React.FC<CartTotalProps> = ({ onCheckout }) => {
  const { totalAmount, cartItems } = useCart();
  const itemsCount = cartItems.length;

  return (
    <div className={styles.cartTotal}>
      <h2 className={styles.title}>${totalAmount.toFixed(2)}</h2>
      <p className={styles.itemsCount}>
        Total for {itemsCount} {itemsCount === 1 ? 'item' : 'items'}
      </p>
      <button
        type="button"
        className={styles.checkoutButton}
        onClick={onCheckout}
      >
        Checkout
      </button>
    </div>
  );
};
