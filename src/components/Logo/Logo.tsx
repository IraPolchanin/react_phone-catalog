import React from 'react';
import { Link } from 'react-router-dom';
import clsx from 'clsx';

import styles from './Logo.module.scss';

type LogoProps = {
  to: string;
  src: string;
  alt: string;
  className?: string;
};

export const Logo: React.FC<LogoProps> = ({ to, src, alt, className }) => {
  return (
    <Link to={to} className={clsx(styles.logo, className)}>
      <img src={src} alt={alt} className={styles.logoSvg} />
    </Link>
  );
};
