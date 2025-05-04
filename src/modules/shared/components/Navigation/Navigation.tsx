// src/modules/Navigation/Navigation.tsx

import React from 'react';
import { NavLink } from 'react-router-dom';
import clsx from 'clsx';

import styles from './Navigation.module.scss';

type NavigationProps = {
  isMobile?: boolean;
  onLinkClick?: () => void;
};

export const Navigation: React.FC<NavigationProps> = ({
  isMobile = false,
  onLinkClick,
}) => {
  const navClass = clsx(
    styles.navigation,
    isMobile && styles['navigation--mobile'],
  );

  const getLinkClassName = ({ isActive }: { isActive: boolean }) => {
    if (isMobile) {
      return clsx(
        styles.navigation__linkMobile,
        isActive && styles.activeMobile,
      );
    }

    return clsx(styles.navigation__link, isActive && styles.active);
  };

  const handleClick = () => onLinkClick?.();

  return (
    <nav className={navClass}>
      <NavLink to="/" className={getLinkClassName} onClick={handleClick}>
        HOME
      </NavLink>
      <NavLink to="/phones" className={getLinkClassName} onClick={handleClick}>
        PHONES
      </NavLink>
      <NavLink to="/tablets" className={getLinkClassName} onClick={handleClick}>
        TABLETS
      </NavLink>
      <NavLink
        to="/accessories"
        className={getLinkClassName}
        onClick={handleClick}
      >
        ACCESSORIES
      </NavLink>
    </nav>
  );
};
