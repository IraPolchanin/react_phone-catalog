import { NavLink } from 'react-router-dom';

export type IconType =
  | 'arrow_down'
  | 'arrow_left'
  | 'arrow_right'
  | 'arrow_up'
  | 'close'
  | 'heart'
  | 'favorites'
  | 'home'
  | 'menu'
  | 'minus'
  | 'plus'
  | 'search'
  | 'cart';

export interface IconBaseProps {
  icon: IconType;
  className?: string;
  ariaLabel?: string;
  showCounter?: boolean;
  count?: number;
  withText?: boolean;
  text?: string;
  isActive?: boolean;
  isMobile?: boolean;
}

export interface IconButtonProps extends IconBaseProps {
  as?: 'button';
  onClick?: () => void;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
}

export interface IconLinkProps extends IconBaseProps {
  as: 'link';
  to: string;
  onClick?: (e: React.MouseEvent) => void;
  navLinkProps?: React.ComponentProps<typeof NavLink>;
}

export type IconProps = IconButtonProps | IconLinkProps;
