import React from 'react';
import { Link } from 'react-router-dom';

import styles from './NavigationFooter.module.scss';

type NavLinkItem = {
  label: string;
  to: string;
  isExternal?: boolean;
};

type NavigationFooterProps = {
  links: NavLinkItem[];
};

export const NavigationFooter: React.FC<NavigationFooterProps> = ({
  links,
}) => {
  return (
    <nav className={styles.navigationFooter}>
      {links.map(link =>
        link.isExternal ? (
          <a
            key={link.label}
            href={link.to}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.navigationFooter__link}
          >
            {link.label}
          </a>
        ) : (
          <Link
            key={link.label}
            to={link.to}
            className={styles.navigationFooter__link}
          >
            {link.label}
          </Link>
        ),
      )}
    </nav>
  );
};
