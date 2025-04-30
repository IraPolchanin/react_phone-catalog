// src/components/CategorySection/CategorySection.tsx
import { Link } from 'react-router-dom';

import { useProducts } from '@/contexts/ProductsContext';

import styles from './CategorySection.module.scss';

export const CategorySection = () => {
  const { categories } = useProducts();

  return (
    <section className={styles.section}>
      <h2 className={styles.title}>Shop by category</h2>

      <div className={styles.grid}>
        {categories.map(category => (
          <Link
            key={category.slug}
            to={`/${category.slug}`}
            className={styles.card}
          >
            <div className={styles.imageWrapper}>
              <img
                src={category.image} // Використовуємо image з об'єкта категорії
                alt={category.name}
                className={styles.image}
              />
            </div>

            <h3 className={styles.name}>{category.name}</h3>
            <p className={styles.count}>{category.count} models</p>
          </Link>
        ))}
      </div>
    </section>
  );
};
