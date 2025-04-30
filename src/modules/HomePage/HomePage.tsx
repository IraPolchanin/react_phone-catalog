import classNames from 'classnames';

import { useProducts } from '@/contexts/ProductsContext';

import styles from './HomePage.module.scss';
import { PicturesSlider } from './components/PicturesSlider';
import { ProductsSlider } from './components/ProductsSlider';
import { CategorySection } from './components/CategorySection';

export const HomePage = () => {
  const { brandNewProducts, hotPricesProducts, loading } = useProducts();

  return (
    <div className={styles.homePage}>
      <section className={styles.homePage__titleSection}>
        <h1 className={styles.homePage__titleHidden}>Product Catalog</h1>

        <div role="heading" aria-level={1} className={styles.homePage__title}>
          Welcome to Nice Gadgets store!
        </div>
      </section>

      <section
        className={classNames(
          styles.homePage__section,
          styles['homePage__section--banner'], // Use bracket notation for the modifier
        )}
      >
        <PicturesSlider />
      </section>

      {!loading && brandNewProducts.length > 0 && (
        <section className={styles.homePage__section}>
          <ProductsSlider
            title="Brand new models"
            products={brandNewProducts}
          />
        </section>
      )}

      <section className={styles.homePage__section}>
        <CategorySection />
      </section>

      {!loading && hotPricesProducts.length > 0 && (
        <section className={styles.homePage__section}>
          <ProductsSlider title="Hot prices" products={hotPricesProducts} />
        </section>
      )}
    </div>
  );
};
