import React from 'react';
import { Link, useLocation } from 'react-router-dom';

import { Icon } from '../Icon';

import styles from './Breadcrumbs.module.scss';

interface BreadcrumbItem {
  label: string;
  to: string;
}

interface BreadcrumbsProps {
  items?: BreadcrumbItem[]; // Optional items prop
}

const formatProductLabel = (segment: string): string => {
  // Логіка для форматування назви продукту (наприклад, скорочення або очищення)
  return segment; // Зараз просто повертаємо оригінал, можна додати скорочення
};

const breadcrumbsFromPath = (pathname: string): BreadcrumbItem[] => {
  // Remove the leading '#' if present (HashRouter compatibility)
  const cleanPath = pathname.replace(/^#/, '');
  const decodedPath = decodeURIComponent(cleanPath).replace(/^\/|\/$/g, '');
  const items: BreadcrumbItem[] = [{ label: 'Home', to: '/' }];

  if (!decodedPath) {
    return items;
  }

  const segments = decodedPath.split('/').filter(Boolean);
  let cumulativePath = '';

  segments.forEach((seg, index) => {
    cumulativePath += `/${seg}`;
    const isProduct = index === segments.length - 1 && segments.length > 1;

    const displayLabel = isProduct
      ? formatProductLabel(seg) // Для продуктів використовуємо оригінальний регістр
      : seg.charAt(0).toUpperCase() + seg.slice(1); // Для категорій капіталізуємо

    items.push({
      label: displayLabel,
      to: cumulativePath,
    });
  });

  return items;
};

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ items }) => {
  const { pathname } = useLocation();
  // Use provided items if available; otherwise, generate from pathname
  const breadcrumbs = items || breadcrumbsFromPath(pathname);

  return (
    <nav className={styles.breadcrumbs} aria-label="Breadcrumb">
      {breadcrumbs.map((item, index) => {
        const isLast = index === breadcrumbs.length - 1;

        return (
          <React.Fragment key={index}>
            {index === 0 ? (
              <Icon as="link" to={item.to} icon="home" ariaLabel="Home" />
            ) : !isLast ? (
              <Link to={item.to} className={styles.link}>
                {item.label}
              </Link>
            ) : (
              <span className={styles.current}>{item.label}</span>
            )}
            {!isLast && <span className={styles.separator}> {'>'} </span>}
          </React.Fragment>
        );
      })}
    </nav>
  );
};
