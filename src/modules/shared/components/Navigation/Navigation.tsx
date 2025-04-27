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
  const baseStyle =
    styles[isMobile ? 'navigation__mobile-link' : 'navigation__link'];

  const getLinkClassName = ({ isActive }: { isActive: boolean }) =>
    clsx(baseStyle, isActive && styles.active);

  const handleClick = () => onLinkClick?.();

  return (
    <nav className={isMobile ? styles.navigation__mobile : styles.navigation}>
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
