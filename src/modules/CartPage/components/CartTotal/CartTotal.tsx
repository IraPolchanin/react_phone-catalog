import React from 'react';

import { Button } from '@/components/Button/Button';

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
      <Button variant="default" onClick={onCheckout} fullWidth>
        Checkout
      </Button>
    </div>
  );
};
