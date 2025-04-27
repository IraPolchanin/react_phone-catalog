// src/modules/FavoritesPage/FavoritesPage.tsx
import styles from './FavoritesPage.module.scss';
import { FavoritesList } from './components/FavoritesList';

export const FavoritesPage = () => {
  return (
    <div className={styles.page}>
      <h1 className={styles.title}>Favourites</h1>
      <FavoritesList />
    </div>
  );
};
