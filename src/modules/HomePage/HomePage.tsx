import clsx from 'clsx';

import { useProducts } from '@/contexts/ProductsContext';

import { PicturesSlider } from './components/PicturesSlider';
import { ProductsSlider } from './components/ProductsSlider';
import { CategorySection } from './components/CategorySection';
import styles from './HomePage.module.scss';

export const HomePage = () => {
  const { brandNewProducts, hotPricesProducts, loading } = useProducts();

  return (
    <>
      <section className={styles.homePage__section}>
        <h1 className={styles.homePage__titleHidden}>Product Catalog</h1>

        <div role="heading" aria-level={1} className={styles.homePage__title}>
          Welcome to Nice Gadgets store!
        </div>
      </section>

      <section
        className={clsx(
          styles.homePage__section,
          styles['homePage__section--pictures'],
        )}
      >
        <PicturesSlider />
      </section>

      {!loading && brandNewProducts.length > 0 && (
        <section
          className={clsx(
            styles.homePage__section,
            styles['homePage__section--slider'],
          )}
        >
          <ProductsSlider
            title="Brand new models"
            products={brandNewProducts}
          />
        </section>
      )}

      <section
        className={clsx(
          styles.homePage__section,
          styles['homePage__section--category'], // ← ОЦЕЙ варіант правильний
        )}
      >
        <CategorySection />
      </section>

      {!loading && hotPricesProducts.length > 0 && (
        <section
          className={clsx(
            styles.homePage__section,
            styles['homePage__section--slider'], // ← ОЦЕЙ варіант правильний
          )}
        >
          <ProductsSlider title="Hot prices" products={hotPricesProducts} />
        </section>
      )}
    </>
  );
};
