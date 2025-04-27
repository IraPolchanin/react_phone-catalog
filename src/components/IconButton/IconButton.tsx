import React from 'react';
import styles from './IconButton.module.scss';

interface IconButtonProps {
  icon: 'heart' | 'share' | 'plus' | 'minus' | 'menu' | 'close';
  onClick?: () => void;
  disabled?: boolean;
}

export const IconButton: React.FC<IconButtonProps> = ({
  icon,
  onClick,
  disabled = false,
}) => {
  return (
    <button
      className={`${styles.iconButton} ${styles[`iconButton--${icon}`]}`}
      onClick={onClick}
      disabled={disabled}
      aria-label={`${icon} action`}
    >
      <span className="icon" />
    </button>
  );
};
