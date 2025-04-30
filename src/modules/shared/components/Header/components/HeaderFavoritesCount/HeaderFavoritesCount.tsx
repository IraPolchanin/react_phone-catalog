// src/modules/Header/components/HeaderFavoritesCount/HeaderFavoritesCount.tsx
import React from 'react';

import { useFavorites } from '@/contexts/FavoritesContext';
import { Icon } from '@/components/Icon';

interface HeaderFavoritesCountProps {
  onClick?: () => void;
}

export const HeaderFavoritesCount: React.FC<HeaderFavoritesCountProps> = ({
  onClick,
}) => {
  const { favoritesCount } = useFavorites();

  return (
    <Icon
      as="link"
      to="/favorites"
      icon="favorites"
      className="favoriteIconButton"
      ariaLabel="Favorites"
      showCounter={favoritesCount > 0}
      count={favoritesCount}
      onClick={onClick}
    />
  );
};
