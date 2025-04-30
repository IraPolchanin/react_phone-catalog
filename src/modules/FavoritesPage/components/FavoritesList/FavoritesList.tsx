// src/modules/FavoritesPage/components/FavoritesList.tsx
import { useFavorites } from '@/contexts/FavoritesContext';
import { ProductCard } from '@/modules/shared/components/ProductCard';

import styles from './FavoritesList.module.scss';

export const FavoritesList = () => {
  const { favorites, favoritesCount } = useFavorites();

  if (favoritesCount === 0) {
    return (
      <div className={styles.emptyState}>
        <p>You have no favorites yet.</p>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <p className={styles.count}>{favoritesCount} items</p>
      <div className={styles.grid}>
        {favorites.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};
