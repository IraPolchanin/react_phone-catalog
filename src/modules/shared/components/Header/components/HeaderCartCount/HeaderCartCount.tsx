// src/modules/Header/components/HeaderCartCount/HeaderCartCount.tsx
import React from 'react';

import { useCart } from '@/contexts/CartContext';
import { Icon } from '@/components/Icon';

interface HeaderCartCountProps {
  onClick?: () => void;
}

export const HeaderCartCount: React.FC<HeaderCartCountProps> = ({
  onClick,
}) => {
  const { totalQuantity } = useCart();

  return (
    <Icon
      as="link"
      to="/cart"
      icon="cart"
      ariaLabel="Cart"
      className="cartIconLink"
      showCounter={totalQuantity > 0}
      count={totalQuantity}
      onClick={onClick}
    />
  );
};
