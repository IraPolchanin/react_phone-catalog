import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Footer.module.scss';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <Link to="/" className={styles.logo}>
          Nice Gadgets
        </Link>

        <div className={styles.links}>
          <a
            href="https://github.com/your-username/react_phone-catalog"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.link}
          >
            GitHub
          </a>
          <button onClick={scrollToTop} className={styles.backButton}>
            Back to top
            <span className={styles.arrow}>↑</span>
          </button>
        </div>
      </div>
    </footer>
  );
};
