// src/components/CartItem/CartItem.tsx
import React from 'react';
import { Link } from 'react-router-dom';

import { useCart } from '@/contexts/CartContext';
import { CartItem as CartItemType } from '@/types';
import { Icon } from '@/components/Icon';

import styles from './CartItem.module.scss';

interface CartItemProps {
  item: CartItemType;
}

export const CartItem: React.FC<CartItemProps> = ({ item }) => {
  const { removeFromCart, changeQuantity } = useCart();
  const { product, quantity } = item;

  const handleRemove = () => {
    removeFromCart(product.id);
  };

  const handleDecreaseQuantity = () => {
    if (quantity > 1) {
      changeQuantity(product.id, quantity - 1);
    }
  };

  const handleIncreaseQuantity = () => {
    changeQuantity(product.id, quantity + 1);
  };

  const productLink = `/product/${product.id}`;
  const productImage = product.image
    ? product.image.startsWith('/')
      ? product.image
      : `/${product.image.startsWith('img/') ? '' : 'img/'}${product.image}`
    : '/img/default-product.webp';

  const productPrice = product.price || 0;
  const totalItemPrice = productPrice * quantity;

  return (
    <div className={styles.cartItem}>
      <Icon
        as="button"
        icon="close"
        onClick={handleRemove}
        ariaLabel={`Remove ${product.name} from cart`}
        type="button"
      />

      <div className={styles.productImage}>
        <Link to={productLink}>
          <img
            src={productImage}
            alt={product.name}
            onError={e => {
              const target = e.target as HTMLImageElement;

              target.src = '/img/default-product.webp';
            }}
          />
        </Link>
      </div>

      <div className={styles.productInfo}>
        <Link to={productLink} className={styles.productName}>
          {product.name}
        </Link>
      </div>

      <div className={styles.quantityControls}>
        <Icon
          as="button"
          icon="minus"
          onClick={handleDecreaseQuantity}
          disabled={quantity <= 1}
          ariaLabel="Decrease quantity"
          type="button"
        />
        <span className={styles.quantity}>{quantity}</span>
        <Icon
          as="button"
          icon="plus"
          onClick={handleIncreaseQuantity}
          ariaLabel="Increase quantity"
          type="button"
        />
      </div>

      <h3 className={styles.price}>${totalItemPrice.toFixed(2)}</h3>
    </div>
  );
};
