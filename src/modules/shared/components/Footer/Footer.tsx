import React from 'react';

import { Icon } from '@/components/Icon';
import { Logo } from '@/components/Logo';

import { NavigationFooter } from './components/NavigationFooter';
import styles from './Footer.module.scss';

const footerLinks = [
  {
    label: 'GITHUB',
    to: 'https://github.com/your-username/react_phone-catalog',
    isExternal: true,
  },
  { label: 'CONTACTS', to: '/contacts' },
  { label: 'RIGHTS', to: '/rights' },
];

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <footer className={styles.footer}>
      <Logo
        to="/"
        src="/img/svg/logo.svg"
        alt="Nice Gadgets"
        className={styles.footer__logo}
      />
      <div className={styles.footer__nav}>
        <NavigationFooter links={footerLinks} />
      </div>
      <Icon
        icon="arrow_up"
        variant="back_to_top"
        onClick={scrollToTop}
        withText
        text="Back to top"
        ariaLabel="Scroll to top"
      />
    </footer>
  );
};
