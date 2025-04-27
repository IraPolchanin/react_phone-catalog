import React from 'react';
import { Link } from 'react-router-dom';
import { CartItem as CartItemType } from '../../../../contexts/CartContext';
import { useCart } from '../../../../contexts/CartContext';
import { IconButton } from '../../../../components/IconButton';
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
      <IconButton
        icon="close"
        onClick={handleRemove}
        aria-label={`Remove ${product.name} from cart`}
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
        <IconButton
          icon="minus"
          onClick={handleDecreaseQuantity}
          disabled={quantity <= 1}
          aria-label="Decrease quantity"
        />
        <span className={styles.quantity}>{quantity}</span>
        <IconButton
          icon="plus"
          onClick={handleIncreaseQuantity}
          aria-label="Increase quantity"
        />
      </div>

      <div className={styles.price}>${totalItemPrice.toFixed(2)}</div>
    </div>
  );
};
