import React from 'react';
import classNames from 'classnames';

import styles from './Button.module.scss';

interface ButtonProps {
  children: React.ReactNode;
  variant?: 'default' | 'hover' | 'selected' | 'disabled' | 'pagination';
  active?: boolean; // Додаємо проп для активної кнопки пагінації
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  type?: 'button' | 'submit' | 'reset';
  fullWidth?: boolean;
  stretch?: boolean;
  className?: string;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'default',
  active = false,
  onClick,
  type = 'button',
  fullWidth = false,
  stretch = false,
  className,
}) => {
  const buttonClass = classNames(
    styles.button,
    {
      [styles.buttonDefault]: variant === 'default',
      [styles.buttonHover]: variant === 'hover',
      [styles.buttonSelected]: variant === 'selected',
      [styles.buttonDisabled]: variant === 'disabled',
      [styles.buttonPagination]: variant === 'pagination',
      [styles.buttonPaginationActive]: variant === 'pagination' && active,
      [styles.buttonFull]: fullWidth,
      [styles.buttonStretch]: stretch,
    },
    className,
  );

  return (
    <button
      type={type}
      className={buttonClass}
      onClick={onClick}
      disabled={variant === 'disabled'}
    >
      {children}
    </button>
  );
};
