// src/modules/FavoritesPage/FavoritesPage.tsx
import { Breadcrumbs } from '../../components/Breadcrumbs'; // Import path may vary based on your project structure

import styles from './FavoritesPage.module.scss';
import { FavoritesList } from './components/FavoritesList';

export const FavoritesPage = () => {
  // Define breadcrumb items explicitly for better control
  const breadcrumbItems = [
    { label: 'Home', to: '/' },
    { label: 'Favorites', to: '/favorites' },
  ];

  return (
    <div className={styles.favoritesPage}>
      <div className={styles.breadcrumbs}>
        <Breadcrumbs items={breadcrumbItems} />
      </div>
      <h1 className={styles.title}>Favorites</h1>
      <FavoritesList />
    </div>
  );
};
