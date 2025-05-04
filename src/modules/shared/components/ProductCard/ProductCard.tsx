// src/components/ProductCard/ProductCard.tsx
import { Link } from 'react-router-dom';

import { Product } from '@/types/Product';
import { useFavorites } from '@/contexts/FavoritesContext';
import { useCart } from '@/contexts/CartContext';
import { Icon } from '@/components/Icon';
import { Button } from '@/components/Button/Button';

import styles from './ProductCard.module.scss';

interface ProductCardProps {
  product: Product;
}

const getProductImagePath = (product: Product): string => {
  if (!product?.image) {
    return '/img/default-product.webp';
  }

  return product.image.startsWith('/')
    ? product.image
    : `/${product.image.startsWith('img/') ? '' : 'img/'}${product.image}`;
};

const getProductLink = (product: Product): string => {
  return `/product/${product.id}`;
};

const shouldShowFullPrice = (product: Product): boolean => {
  return (
    typeof product.price === 'number' &&
    product.fullPrice !== undefined &&
    product.fullPrice > product.price
  );
};

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { toggleFavorite, isFavorite } = useFavorites();
  const { addToCart, isInCart } = useCart();
  const isProductFavorite = isFavorite(product.id);
  const isProductInCart = isInCart(product.id);

  const handleToggleFavorite = () => {
    toggleFavorite(product);
  };

  const handleAddToCart = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!isProductInCart) {
      addToCart(product);
    }
  };

  const productPrice =
    product.price ??
    product.priceDiscount ??
    product.priceRegular ??
    product.fullPrice ??
    0;

  return (
    <div key={product.id} className={styles.productCard}>
      <Link to={getProductLink(product)} className={styles.imageContainer}>
        <img
          src={getProductImagePath(product)}
          alt={product.name}
          className={styles.productImage}
          loading="lazy"
          onError={e => {
            const target = e.target as HTMLImageElement;

            target.src = '/img/default-product.webp';
          }}
        />
      </Link>

      <div className={styles.productInfo}>
        <Link to={getProductLink(product)} className={styles.productName}>
          {product.name}
        </Link>

        <div className={styles.priceContainer}>
          <h3 className={styles.price}>${productPrice}</h3>
          {shouldShowFullPrice(product) && (
            <h3 className={styles.fullPrice}>${product.fullPrice}</h3>
          )}
        </div>

        <div className={styles.specs}>
          {product.screen && (
            <div className={styles.specRow}>
              <span className={styles.specName}>Screen</span>
              <span className={styles.specValue}>{product.screen}</span>
            </div>
          )}
          {product.capacity && (
            <div className={styles.specRow}>
              <span className={styles.specName}>Capacity</span>
              <span className={styles.specValue}>{product.capacity}</span>
            </div>
          )}
          {product.ram && (
            <div className={styles.specRow}>
              <span className={styles.specName}>RAM</span>
              <span className={styles.specValue}>{product.ram}</span>
            </div>
          )}
        </div>

        <div className={styles.actions}>
          <Button
            variant={isProductInCart ? 'selected' : 'default'}
            onClick={handleAddToCart}
            stretch // Додаємо проп stretch
          >
            {isProductInCart ? 'Added' : 'Add to cart'}
          </Button>

          <Icon
            as="button"
            icon={isProductFavorite ? 'heart' : 'favorites'}
            variant="favorite" // Use the new variant prop
            isActive={isProductFavorite} // Use isActive to toggle the active state
            ariaLabel={`${isProductFavorite ? 'Remove' : 'Add'} ${product.name} ${isProductFavorite ? 'from' : 'to'} favorites`}
            onClick={handleToggleFavorite}
            type="button"
          />
        </div>
      </div>
    </div>
  );
};
