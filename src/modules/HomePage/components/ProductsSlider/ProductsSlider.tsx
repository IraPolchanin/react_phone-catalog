import { useState, useEffect } from 'react';

import { ProductCard } from '@/modules/shared/components/ProductCard';
import { Product } from '@/types';
import { Icon } from '@/components/Icon';

import styles from './ProductsSlider.module.scss';

type Props = {
  title: string;
  products: Product[];
};

export const ProductsSlider = ({ title, products }: Props) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const itemsPerPage = 4; // Show 4 items at once

  // Calculate total pages needed
  const totalPages = Math.ceil(products.length / itemsPerPage);

  // Reset current index if products change and current index is out of bounds
  useEffect(() => {
    if (currentIndex >= totalPages && totalPages > 0) {
      setCurrentIndex(totalPages - 1);
    }
  }, [products, currentIndex, totalPages]);

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

  // Get current visible products
  const visibleProducts = products.slice(
    currentIndex * itemsPerPage,
    (currentIndex + 1) * itemsPerPage,
  );

  // Specific disabled logic for each arrow
  const isFirstPage = currentIndex === 0;
  const isLastPage = currentIndex === totalPages - 1;

  return (
    <section className={styles.sliderSection}>
      <div className={styles.header}>
        <h2 className={styles.title}>{title}</h2>

        <div className={styles.controls}>
          <Icon
            icon="arrow_left"
            variant="slider-control"
            onClick={goToPrev}
            disabled={isFirstPage}
            ariaLabel="Previous products"
          />
          <Icon
            icon="arrow_right"
            variant="slider-control"
            onClick={goToNext}
            disabled={isLastPage}
            ariaLabel="Next products"
          />
        </div>
      </div>

      <div className={styles.productsContainer}>
        {visibleProducts.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
};
