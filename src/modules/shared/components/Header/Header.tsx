import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Navigation } from '../Navigation';
import { HeaderFavoritesCount } from './components/HeaderFavoritesCount';
import { HeaderCartCount } from './components/HeaderCartCount'; // Import new component
import styles from './Header.module.scss';

export const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <header className={styles.header}>
      <div className={styles.header__container}>
        <Link to="/" className={styles.header__logo}>
          <img
            src="/img/svg/logo.svg"
            alt="Nice Gadgets"
            className={styles.header__logoSvg}
          />
        </Link>

        <button
          className={styles.header__burger}
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? '✕' : '☰'}
        </button>

        <div className={styles.header__nav}>
          <Navigation />
        </div>

        <div className={styles.header__icons}>
          <HeaderFavoritesCount />
          <HeaderCartCount /> {/* Replace Link with component */}
        </div>
      </div>

      {isMenuOpen && (
        <div className={styles.header__mobileMenu}>
          <Navigation isMobile={true} onLinkClick={closeMenu} />

          <div className={styles.header__mobileFooter}>
            <HeaderFavoritesCount />
            <HeaderCartCount onClick={closeMenu} />{' '}
            {/* Replace in mobile menu */}
          </div>
        </div>
      )}
    </header>
  );
};
