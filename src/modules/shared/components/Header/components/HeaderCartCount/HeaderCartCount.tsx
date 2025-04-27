// src/modules/Header/components/HeaderCartCount/HeaderCartCount.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../../../../../../contexts/CartContext';
import styles from './HeaderCartCount.module.scss';

interface HeaderCartCountProps {
  onClick?: () => void; // Optional onClick handler
}

export const HeaderCartCount: React.FC<HeaderCartCountProps> = ({
  onClick,
}) => {
  const { totalQuantity } = useCart();

  return (
    <Link to="/cart" className={styles.cartLink} onClick={onClick}>
      <img
        src="/img/svg/icons/shopping_bag.svg"
        alt="Cart"
        className={styles.cartIcon}
      />
      {totalQuantity > 0 && (
        <span className={styles.counter}>{totalQuantity}</span>
      )}
    </Link>
  );
};
