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

      <section className={styles.homePage__section}>
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
    </>
  );
};
