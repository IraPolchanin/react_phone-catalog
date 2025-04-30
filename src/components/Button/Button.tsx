import React from 'react';
import classNames from 'classnames';

import styles from './Button.module.scss';

interface ButtonProps {
  children: React.ReactNode;
  variant?: 'default' | 'hover' | 'selected' | 'disabled';
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  type?: 'button' | 'submit' | 'reset';
  fullWidth?: boolean;
  className?: string; // Add className prop
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'default',
  onClick,
  type = 'button',
  fullWidth = false,
  className,
}) => {
  const buttonClass = classNames(
    styles.button,
    {
      [styles[`button--${variant}`]]: variant,
      [styles['button--full']]: fullWidth,
    },
    className, // Pass custom className
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
