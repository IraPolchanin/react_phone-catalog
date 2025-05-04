// src/modules/CartPage/CartPage.tsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

import { useCart } from '@/contexts/CartContext';
import { Icon } from '@/components/Icon';
import { Button } from '@/components/Button'; // Import Button

import { CartItem } from './components/CartItem';
import { CartTotal } from './components/CartTotal';
import styles from './CartPage.module.scss';

export const CartPage: React.FC = () => {
  const { cartItems, clearCart } = useCart();
  const isEmpty = cartItems.length === 0;
  const navigate = useNavigate(); // Hook for navigation

  const handleCheckout = () => {
    const userConfirmed = window.confirm(
      'Checkout is not implemented yet. Do you want to clear the Cart?',
    );

    if (userConfirmed) {
      clearCart();
    }
  };

  const handleContinueShopping = () => {
    navigate('/'); // Navigate to home page
  };

  return (
    <div className={styles.cartPage}>
      <div className={styles.backLink}>
        <Icon
          as="link"
          variant="backLink"
          to="/"
          icon="arrow_left"
          withText
          text="Back"
          ariaLabel="Back to previous page"
        />
      </div>

      <h1 className={styles.title}>Cart</h1>

      {isEmpty ? (
        <div className={styles.emptyCart}>
          <p>Your cart is empty</p>
          <Button
            variant="default" // Choose an appropriate variant (e.g., 'default' or 'hover')
            onClick={handleContinueShopping}
            className={styles.continueShoppingLink} // Apply existing styling
          >
            Continue Shopping
          </Button>
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
