// src/modules/shared/components/ProductCard/ProductCard.tsx
import { Link } from 'react-router-dom';
import { Product } from '../../../../types/Product';
import styles from './ProductCard.module.scss';
import { useFavorites } from '../../../../contexts/FavoritesContext';
import { useCart } from '../../../../contexts/CartContext';
import classNames from 'classnames';

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

// Generate link for product
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

  const handleToggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    toggleFavorite(product);
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!isProductInCart) {
      addToCart(product);
    }
  };

  // Make sure product has a defined price
  // If price is undefined, fallback to different price properties or set to 0
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
          <span className={styles.price}>${productPrice}</span>
          {shouldShowFullPrice(product) && (
            <span className={styles.fullPrice}>${product.fullPrice}</span>
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
          <button
            type="button"
            className={classNames(styles.addToCartButton, {
              [styles.addedToCartButton]: isProductInCart,
            })}
            aria-label={
              isProductInCart
                ? `${product.name} is in cart`
                : `Add ${product.name} to cart`
            }
            onClick={handleAddToCart}
          >
            {isProductInCart ? 'Added to cart' : 'Add to cart'}
          </button>

          <button
            type="button"
            className={classNames(styles.favoriteButton, {
              [styles.favoriteActive]: isProductFavorite,
            })}
            aria-label={`${isProductFavorite ? 'Remove' : 'Add'} ${product.name} ${isProductFavorite ? 'from' : 'to'} favorites`}
            onClick={handleToggleFavorite}
          >
            {isProductFavorite ? '❤️' : '♡'}
          </button>
        </div>
      </div>
    </div>
  );
};
