import React from 'react';
import './Button.css';

interface ButtonProps {
  label: string;
  variant?: 'default' | 'hover' | 'selected' | 'disabled';
  onClick?: () => void;
}

const Button: React.FC<ButtonProps> = ({
  label,
  variant = 'default',
  onClick,
}) => {
  return (
    <button
      className={`button button--${variant}`}
      onClick={onClick}
      disabled={variant === 'disabled'}
    >
      {label}
    </button>
  );
};

export default Button;
