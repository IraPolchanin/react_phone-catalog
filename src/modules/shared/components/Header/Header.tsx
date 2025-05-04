import React, { useState, useEffect } from 'react';
import clsx from 'clsx';

import { Icon } from '@/components/Icon';
import { Logo } from '@/components/Logo';

import { Navigation } from '../Navigation';

import { HeaderFavoritesCount } from './components/HeaderFavoritesCount';
import { HeaderCartCount } from './components/HeaderCartCount';
import styles from './Header.module.scss';

const MOBILE_BREAKPOINT = 639;

export const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(
    window.innerWidth <= MOBILE_BREAKPOINT,
  );

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  useEffect(() => {
    const handleResize = () => {
      const newIsMobile = window.innerWidth <= MOBILE_BREAKPOINT;

      setIsMobile(newIsMobile);
      if (!newIsMobile) {
        closeMenu();
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <header className={styles.header}>
      <div className={styles.header__container}>
        <Logo
          to="/"
          src="/img/svg/logo.svg"
          alt="Nice Gadgets"
          className={styles.header__logo}
        />

        <Navigation />

        <div className={styles.header__icons}>
          <HeaderFavoritesCount />
          <HeaderCartCount />
        </div>

        {isMobile && (
          <Icon
            icon={isMenuOpen ? 'close' : 'menu'}
            onClick={toggleMenu}
            ariaLabel="Toggle menu"
            className={styles.header__burger}
            type="button"
            isMobile={true}
          />
        )}
      </div>

      <div
        className={clsx(
          styles.header__mobileMenu,
          isMenuOpen && styles['header__mobileMenu--active'],
        )}
      >
        <Navigation isMobile={true} onLinkClick={closeMenu} />

        <div className={styles.header__mobileFooter}>
          <HeaderFavoritesCount onClick={closeMenu} />
          <HeaderCartCount onClick={closeMenu} />
        </div>
      </div>
    </header>
  );
};
