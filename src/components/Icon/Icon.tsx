import React from 'react';
import { NavLink } from 'react-router-dom';
import clsx from 'clsx';

import { IconType, IconProps } from '@/types';

import styles from './Icon.module.scss';

const iconPaths: Record<IconType, string> = {
  arrow_down: '/img/svg/icons/arrow_down.svg',
  arrow_left: '/img/svg/icons/arrow_left.svg',
  arrow_right: '/img/svg/icons/arrow_right.svg',
  arrow_up: '/img/svg/icons/arrow_up.svg',
  close: '/img/svg/icons/close.svg',
  heart: '/img/svg/icons/favourites_filled.svg',
  favorites: '/img/svg/icons/favourites.svg',
  home: '/img/svg/icons/home.svg',
  menu: '/img/svg/icons/menu.svg',
  minus: '/img/svg/icons/minus.svg',
  plus: '/img/svg/icons/plus.svg',
  search: '/img/svg/icons/search.svg',
  cart: '/img/svg/icons/shopping_bag.svg',
};

export const Icon: React.FC<IconProps> = props => {
  const {
    icon,
    variant,
    className = '',
    ariaLabel,
    showCounter = false,
    count = 0,
    withText = false,
    text = '',
    isActive = false,
    disabled = false,
  } = props;

  const iconPath = iconPaths[icon];

  if (!iconPath) {
    console.warn(`Icon "${icon}" not found in iconPaths`);

    return null;
  }

  const defaultAriaLabel = `${icon} ${props.as === 'link' ? 'link' : 'button'}`;

  const classNames = clsx(styles.icon, className, {
    [styles.favorite]: variant === 'favorite',
    [styles.sliderControl]: variant === 'slider-control',
    [styles.backLink]: variant === 'backLink',
    [styles.backToTop]: variant === 'back_to_top',
    [styles.link]: props.as === 'link',
    [styles.withText]: withText,
    [styles.active]: isActive,
  });

  const commonProps = {
    className: classNames,
    'aria-label': ariaLabel || defaultAriaLabel,
    children: (
      <>
        <img src={iconPath} alt={`${icon} icon`} className={styles.image} />
        {withText && text && <span className={styles.text}>{text}</span>}
        {showCounter && count > 0 && (
          <span className={styles.counter}>{count}</span>
        )}
      </>
    ),
  };

  if (props.as === 'link') {
    return (
      <NavLink
        to={props.to}
        onClick={disabled ? undefined : props.onClick}
        className={({ isActive: navLinkIsActive }) =>
          clsx(styles.icon, className, {
            [styles.favorite]: variant === 'favorite',
            [styles.sliderControl]: variant === 'slider-control',
            [styles.backLink]: variant === 'backLink',
            [styles.backToTop]: variant === 'back_to_top',
            [styles.link]: true,
            [styles.withText]: withText,
            [styles.active]: navLinkIsActive || isActive,
          })
        }
        aria-label={commonProps['aria-label']}
        {...props.navLinkProps}
      >
        {commonProps.children}
      </NavLink>
    );
  }

  return (
    <button
      type={props.type || 'button'}
      onClick={disabled ? undefined : props.onClick}
      disabled={disabled}
      className={commonProps.className}
      aria-label={commonProps['aria-label']}
    >
      {commonProps.children}
    </button>
  );
};
