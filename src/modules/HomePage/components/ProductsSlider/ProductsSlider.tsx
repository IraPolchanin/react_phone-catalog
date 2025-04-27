// src/modules/HomePage/components/ProductsSlider/ProductsSlider.tsx
import { useState } from 'react';
import { ProductCard } from '../../../shared/components/ProductCard';
import { Product } from '../../../../types/Product';
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

  // Function to safely format path

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

  return (
    <section className={styles.sliderSection}>
      <div className={styles.header}>
        <h2 className={styles.title}>{title}</h2>

        <div className={styles.controls}>
          <button
            className={styles.controlButton}
            onClick={goToPrev}
            disabled={products.length <= itemsPerPage}
            aria-label="Previous products"
            type="button"
          >
            <span className={styles.arrow}>&#10094;</span>
          </button>

          <button
            className={styles.controlButton}
            onClick={goToNext}
            disabled={products.length <= itemsPerPage}
            aria-label="Next products"
            type="button"
          >
            <span className={styles.arrow}>&#10095;</span>
          </button>
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
