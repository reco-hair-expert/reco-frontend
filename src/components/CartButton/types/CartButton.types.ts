import { CartItem } from "@/types/types";

export interface CartButtonProps {
  className?: string;
  onClick?: () => void;
  icon?: string;
  cart: CartItem[];
}
