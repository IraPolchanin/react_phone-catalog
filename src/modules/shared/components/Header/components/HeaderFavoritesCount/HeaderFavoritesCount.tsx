// src/modules/Header/components/HeaderFavoritesCount.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import { useFavorites } from '../../../../../../contexts/FavoritesContext';
import styles from './HeaderFavoritesCount.module.scss';

export const HeaderFavoritesCount: React.FC = () => {
  const { favoritesCount } = useFavorites();

  return (
    <Link to="/favorites" className={styles.favoritesLink}>
      <img
        src="/img/svg/icons/favourites.svg"
        alt="Favorites"
        className={styles.favoriteIcon}
      />
      {favoritesCount > 0 && (
        <span className={styles.counter}>{favoritesCount}</span>
      )}
    </Link>
  );
};
