import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import classNames from 'classnames';

import { Breadcrumbs } from '@/components/Breadcrumbs';
import { Loader } from '@/components/Loader';
import { Button } from '@/components/Button';
import { ProductCard } from '@/modules/shared/components/ProductCard';
import { Product } from '@/types';
import { getSuggestedProducts } from '@/utils/api';
import { useProducts } from '@/contexts/ProductsContext';
import { Icon } from '@/components/Icon';

import styles from './ProductDetailsPage.module.scss';
import { ProductGallery } from './components/ProductGallery';

export const ProductDetailsPage: React.FC = () => {
  const { productId } = useParams<{ productId: string }>();
  const { products, loading: productsLoading } = useProducts();
  const [product, setProduct] = useState<Product | null>(null);
  const [suggestedProducts, setSuggestedProducts] = useState<Product[]>([]);
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

  useEffect(() => {
    const fetchSuggested = async () => {
      try {
        const suggestions = await getSuggestedProducts();
        const convertedSuggestions = suggestions.map(item => {
          const price =
            item.priceDiscount || item.price || item.priceRegular || 0;
          const fullPrice = item.priceRegular || item.fullPrice || price;

          return {
            id: String(item.id),
            category: item.category,
            name: item.name,
            price,
            fullPrice,
            color: item.color,
            screen: item.screen || 'N/A',
            capacity: item.capacity || 'N/A',
            ram: item.ram || 'N/A',
            year: item.year || 0,
            image:
              item.image ||
              (item.images && item.images[0]) ||
              '/img/fallback-image.webp',
            ...(item.category === 'accessories'
              ? {}
              : {
                  resolution: item.resolution || 'Unknown',
                  processor: item.processor || 'Unknown',
                  camera: item.camera || 'Unknown',
                  zoom: item.zoom || 'N/A',
                  cell: item.cell || [],
                }),
          } as Product;
        });

        setSuggestedProducts(convertedSuggestions.slice(0, 4));
      } catch (err) {
        console.error('Failed to load suggested products:', err);
      }
    };

    fetchSuggested();
  }, []);

  if (loading) {
    return <Loader />;
  }

  if (error || !product) {
    return <div className={styles.error}>Product was not found</div>;
  }

  const categoryLink = `/${product.category.toLowerCase()}`;

  return (
    <div className={styles.container}>
      <Breadcrumbs
        items={[
          { label: 'Home', to: '/' },
          { label: product.category, to: categoryLink },
          { label: product.name, to: '' },
        ]}
      />

      <div className={styles.backLink}>
        <Icon
          as="link"
          to="/"
          icon="arrow_left"
          withText
          text="Back"
          ariaLabel="Back to previous page"
        />
      </div>

      <h1 className={styles.title}>{product.name}</h1>

      <div className={styles.mainSection}>
        <ProductGallery
          images={
            product.images && product.images.length > 0
              ? product.images
              : [product.image || '/img/fallback-image.webp'].filter(
                  (img): img is string => !!img,
                )
          }
        />

        <div className={styles.details}>
          <div className={styles.colors}>
            <h3 className={styles.colors__title}>Available colors</h3>
            {product.colorsAvailable && product.colorsAvailable.length > 0 ? (
              product.colorsAvailable.map(color => (
                <>
                  {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
                  <label key={color} className={styles.colorOption}>
                    <input
                      type="radio"
                      name="color"
                      value={color}
                      checked={selectedColor === color}
                      onChange={() => setSelectedColor(color)}
                    />
                    <span
                      className={classNames(styles.colorSwatch, {
                        [styles.active]: selectedColor === color,
                      })}
                      style={{ backgroundColor: color }}
                    />
                  </label>
                </>
              ))
            ) : (
              <p>No color options available</p>
            )}
          </div>

          <div className={styles.capacities}>
            <h3 className={styles.capacities__title}>Select capacity</h3>
            {product.capacityAvailable &&
            product.capacityAvailable.length > 0 ? (
              product.capacityAvailable.map(capacity => (
                <div key={capacity} className={styles.capacityOption}>
                  {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
                  <label htmlFor={`capacity-${capacity}`}>
                    <input
                      type="radio"
                      id={`capacity-${capacity}`}
                      name="capacity"
                      value={capacity}
                      checked={selectedCapacity === capacity}
                      onChange={() => setSelectedCapacity(capacity)}
                    />
                  </label>
                  <span>{capacity}</span>
                </div>
              ))
            ) : (
              <p>No capacity options available</p>
            )}
          </div>

          <div className={styles.price}>
            <span className={styles.currentPrice}>${product.price}</span>
            {product.fullPrice && product.price !== product.fullPrice && (
              <span className={styles.oldPrice}>${product.fullPrice}</span>
            )}
          </div>

          <Button className={styles.addToCartButton}>Add to cart</Button>
        </div>
      </div>

      <div className={styles.about}>
        <h2>About</h2>
        {product.description && product.description.length > 0 ? (
          product.description.map((desc, index) => (
            <div key={index}>
              <h3>{desc.title}</h3>
              <p>{desc.text.join(' ')}</p>
            </div>
          ))
        ) : (
          <p>No description available</p>
        )}
      </div>

      <div className={styles.techSpecs}>
        <h2>Tech specs</h2>
        <ul>
          <li>Screen: {product.screen}</li>
          {product.category !== 'accessories' && (
            <>
              <li>Resolution: {product.resolution || 'Unknown'}</li>
              <li>Processor: {product.processor || 'Unknown'}</li>
              <li>RAM: {product.ram || 'N/A'}</li>
              <li>Built-in memory: {product.capacity || 'N/A'}</li>
              <li>Camera: {product.camera || 'Unknown'}</li>
              <li>Zoom: {product.zoom || 'N/A'}</li>
              <li>Cell: {product.cell?.join(', ') || 'N/A'}</li>
            </>
          )}
        </ul>
      </div>

      <div className={styles.suggested}>
        <h2>You may also like</h2>
        <div className={styles.suggestedList}>
          {suggestedProducts.map(suggestedProduct => (
            <ProductCard key={suggestedProduct.id} product={suggestedProduct} />
          ))}
        </div>
      </div>
    </div>
  );
};
