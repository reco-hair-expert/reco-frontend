import type { CartItem } from "@/types/types";

export interface CartButtonProps {
  className?: string;
  onClick?: () => void;
  icon?: string;
  cart: CartItem[];
  "aria-label"?: string;
}
