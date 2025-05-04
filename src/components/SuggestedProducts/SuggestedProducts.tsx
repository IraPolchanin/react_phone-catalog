import { useState, useEffect } from 'react';

import { ProductCard } from '@/modules/shared/components/ProductCard';
import { Product } from '@/types';
import { getSuggestedProducts } from '@/utils/api';
import { Loader } from '@/components/Loader';
import { Icon } from '@/components/Icon';

import styles from './SuggestedProducts.module.scss';

export const SuggestedProducts: React.FC = () => {
  const [suggestedProducts, setSuggestedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const itemsPerPage = 4;
  const totalPages = Math.ceil(suggestedProducts.length / itemsPerPage);

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

        setSuggestedProducts(convertedSuggestions); // Видалено slice(0, 4)
        setLoading(false);
      } catch (err) {
        console.error('Failed to load suggested products:', err);
        setError('Failed to load suggested products');
        setLoading(false);
      }
    };

    fetchSuggested();
  }, []);

  useEffect(() => {
    if (currentIndex >= totalPages && totalPages > 0) {
      setCurrentIndex(totalPages - 1);
    }
  }, [suggestedProducts, currentIndex, totalPages]);

  const goToNext = () => {
    if (currentIndex < totalPages - 1) {
      setCurrentIndex(prev => prev + 1);
    } else {
      setCurrentIndex(0); // Loop back to start
    }
  };

  const goToPrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
    } else {
      setCurrentIndex(totalPages - 1); // Loop to end
    }
  };

  const visibleProducts = suggestedProducts.slice(
    currentIndex * itemsPerPage,
    (currentIndex + 1) * itemsPerPage,
  );

  const isFirstPage = currentIndex === 0;
  const isLastPage = currentIndex === totalPages - 1;

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <div className={styles.error}>{error}</div>;
  }

  return (
    <section className={styles.suggested}>
      <div className={styles.suggested__header}>
        <h2 className={styles.suggested__title}>You may also like</h2>
        <div className={styles.suggested__controls}>
          <Icon
            icon="arrow_left"
            variant="slider-control"
            onClick={goToPrev}
            disabled={isFirstPage}
            ariaLabel="Previous suggested products"
          />
          <Icon
            icon="arrow_right"
            variant="slider-control"
            onClick={goToNext}
            disabled={isLastPage}
            ariaLabel="Next suggested products"
          />
        </div>
      </div>
      <div className={styles.suggestedList}>
        {visibleProducts.map(suggestedProduct => (
          <ProductCard key={suggestedProduct.id} product={suggestedProduct} />
        ))}
      </div>
    </section>
  );
};
