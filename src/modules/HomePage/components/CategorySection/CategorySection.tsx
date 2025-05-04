import { Link } from 'react-router-dom';
import clsx from 'clsx';

import { useProducts } from '@/contexts/ProductsContext';

import styles from './CategorySection.module.scss';

export const CategorySection = () => {
  const { categories } = useProducts();

  // Map category slugs to background modifier classes
  const getImageWrapperClass = (slug: string) => {
    switch (slug) {
      case 'phones':
        return styles.mobilePhones;
      case 'tablets':
        return styles.tablets;
      case 'accessories':
        return styles.accessories;
      default:
        return '';
    }
  };

  return (
    <div className={styles.categorySection}>
      <h2 className={styles.title}>Shop by category</h2>

      <div className={styles.categories}>
        {categories.map(category => (
          <Link
            key={category.slug}
            to={`/${category.slug}`}
            className={styles.card}
          >
            <div
              className={clsx(
                styles.imageWrapper,
                getImageWrapperClass(category.slug),
              )}
            >
              <img
                src={category.image}
                alt={category.name}
                className={styles.image}
              />
            </div>

            <h4 className={styles.name}>{category.name}</h4>
            <p className={styles.count}>{category.count} models</p>
          </Link>
        ))}
      </div>
    </div>
  );
};
