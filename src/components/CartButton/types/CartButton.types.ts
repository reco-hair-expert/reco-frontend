import { CartItem } from '@/config/types';

export interface CartButtonProps {
  className?: string;
  onClick?: () => void;
  icon?: string;
  cart: CartItem[]; 

}

