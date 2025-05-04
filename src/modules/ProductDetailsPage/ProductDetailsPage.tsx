import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import classNames from 'classnames';

import { Breadcrumbs } from '@/components/Breadcrumbs';
import { Loader } from '@/components/Loader';
import { Button } from '@/components/Button';
import { Product } from '@/types';
import { useProducts } from '@/contexts/ProductsContext';
import { useCart } from '@/contexts/CartContext';
import { Icon } from '@/components/Icon';
import { SuggestedProducts } from '@/components/SuggestedProducts';

import styles from './ProductDetailsPage.module.scss';
import { ProductGallery } from './components/ProductGallery';

export const ProductDetailsPage: React.FC = () => {
  const { productId } = useParams<{ productId: string }>();
  const { products, loading: productsLoading } = useProducts();
  const { addToCart, isInCart } = useCart();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState<string>('');
  const [selectedCapacity, setSelectedCapacity] = useState<string>('');

  useEffect(() => {
    const foundProduct = products.find(p => p.id === productId);

    if (productsLoading) {
      setLoading(true);
    } else if (!foundProduct) {
      setError('Product was not found');
      setLoading(false);
    } else {
      setProduct(foundProduct);
      setSelectedColor(foundProduct.colorsAvailable?.[0] || '');
      setSelectedCapacity(foundProduct.capacityAvailable?.[0] || '');
      setLoading(false);
    }
  }, [productId, products, productsLoading]);

  if (loading) {
    return <Loader />;
  }

  if (error || !product) {
    return <div className={styles.error}>Product was not found</div>;
  }

  const isProductInCart = isInCart(product.id);

  const handleAddToCart = () => {
    if (!isProductInCart && product) {
      addToCart({
        ...product,
        color: selectedColor,
        capacity: selectedCapacity,
      });
    }
  };

  const categoryLink = `/${product.category.toLowerCase()}`;

  return (
    <div className={styles.container}>
      <div className={styles.breadcrumbs}>
        <Breadcrumbs
          items={[
            { label: 'Home', to: '/' },
            { label: product.category, to: categoryLink },
            { label: product.name, to: '' },
          ]}
        />
      </div>

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

      <h1 className={styles.title} aria-label={`Details for ${product.name}`}>
        {product.name}
      </h1>

      <div className={styles.mainSection}>
        <div className={styles.productGalleryWrapper}>
          <ProductGallery
            images={
              product.images && product.images.length > 0
                ? product.images
                : [product.image || '/img/fallback-image.webp'].filter(
                    (img): img is string => !!img,
                  )
            }
          />
        </div>

        <div className={styles.details}>
          <div className={styles.colors}>
            <h5 className={styles.colors__title}>Available colors</h5>
            {product.colorsAvailable && product.colorsAvailable.length > 0 ? (
              product.colorsAvailable.map(color => (
                // eslint-disable-next-line jsx-a11y/label-has-associated-control
                <label
                  key={color}
                  htmlFor={`color-${color}`}
                  className={styles.colorOption}
                >
                  <input
                    type="radio"
                    id={`color-${color}`}
                    name="color"
                    value={color}
                    checked={selectedColor === color}
                    onChange={() => setSelectedColor(color)}
                    aria-checked={selectedColor === color}
                  />
                  <span
                    className={classNames(styles.colorSwatch, {
                      [styles.active]: selectedColor === color,
                    })}
                    style={{ backgroundColor: color }}
                  />
                </label>
              ))
            ) : (
              <p>No color options available</p>
            )}
          </div>

          <div className={styles.capacities}>
            <h5 className={styles.capacities__title}>Select capacity</h5>
            {product.capacityAvailable &&
            product.capacityAvailable.length > 0 ? (
              product.capacityAvailable.map(capacity => (
                <label
                  key={capacity}
                  htmlFor={`capacity-${capacity}`}
                  className={styles.capacityOption}
                >
                  <input
                    type="radio"
                    id={`capacity-${capacity}`}
                    name="capacity"
                    value={capacity}
                    checked={selectedCapacity === capacity}
                    onChange={() => setSelectedCapacity(capacity)}
                    aria-checked={selectedCapacity === capacity}
                  />
                  <span
                    className={classNames(styles.capacityValue, {
                      [styles.active]: selectedCapacity === capacity,
                    })}
                  >
                    {capacity}
                  </span>
                </label>
              ))
            ) : (
              <p>No capacity options available</p>
            )}
          </div>

          <div className={styles.price}>
            <h2 className={styles.currentPrice}>${product.price}</h2>
            {product.fullPrice && product.price !== product.fullPrice && (
              <span className={styles.oldPrice}>${product.fullPrice}</span>
            )}
          </div>

          <Button
            variant={isProductInCart ? 'selected' : 'default'}
            className={styles.addToCartButton}
            fullWidth
            onClick={handleAddToCart}
            aria-label={
              isProductInCart ? 'Item already in cart' : 'Add item to cart'
            }
          >
            {isProductInCart ? 'Added to cart' : 'Add to cart'}
          </Button>
        </div>

        <div className={styles.about}>
          <h3 className={styles.about__title}>About</h3>
          {product.description && product.description.length > 0 ? (
            product.description.map((desc, index) => (
              <div key={index}>
                <h4 className={styles.desc__title}>{desc.title}</h4>
                <p className={styles.desc__text}>{desc.text.join(' ')}</p>
              </div>
            ))
          ) : (
            <p>No description available</p>
          )}
        </div>

        <div className={styles.techSpecs}>
          <h3 className={styles.techSpecs__title}>Tech specs</h3>
          <ul className={styles.techSpecs__list}>
            <li>
              Screen: <span>{product.screen}</span>
            </li>
            {product.category !== 'accessories' && (
              <>
                <li>
                  Resolution: <span>{product.resolution || 'Unknown'}</span>
                </li>
                <li>
                  Processor: <span>{product.processor || 'Unknown'}</span>
                </li>
                <li>
                  RAM: <span>{product.ram || 'N/A'}</span>
                </li>
                <li>
                  Built-in memory: <span>{product.capacity || 'N/A'}</span>
                </li>
                <li>
                  Camera: <span>{product.camera || 'Unknown'}</span>
                </li>
                <li>
                  Zoom: <span>{product.zoom || 'N/A'}</span>
                </li>
                <li>
                  Cell: <span>{product.cell?.join(', ') || 'N/A'}</span>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
      <SuggestedProducts />
    </div>
  );
};
