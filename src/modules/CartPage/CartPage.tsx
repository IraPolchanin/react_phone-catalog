// src/modules/CartPage/CartPage.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../../contexts/CartContext';
import { CartItem } from './components/CartItem/CartItem';
import { CartTotal } from './components/CartTotal/CartTotal';
import styles from './CartPage.module.scss';

export const CartPage: React.FC = () => {
  const { cartItems, clearCart } = useCart();
  const isEmpty = cartItems.length === 0;

  const handleCheckout = () => {
    const userConfirmed = window.confirm(
      'Checkout is not implemented yet. Do you want to clear the Cart?',
    );

    if (userConfirmed) {
      clearCart();
    }
  };

  return (
    <div className={styles.cartPage}>
      <div className={styles.backLink}>
        <Link to="/">
          <span className={styles.backIcon}>&lt;</span> Back
        </Link>
      </div>

      <h1 className={styles.title}>Cart</h1>

      {isEmpty ? (
        <div className={styles.emptyCart}>
          <p>Your cart is empty</p>
          <Link to="/" className={styles.continueShoppingLink}>
            Continue Shopping
          </Link>
        </div>
      ) : (
        <div className={styles.cartContent}>
          <div className={styles.cartItems}>
            {cartItems.map(item => (
              <CartItem key={item.product.id} item={item} />
            ))}
          </div>

          <div className={styles.totalWrapper}>
            <CartTotal onCheckout={handleCheckout} />
          </div>
        </div>
      )}
    </div>
  );
};
