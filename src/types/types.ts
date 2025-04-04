import { StaticImageData } from "next/image";

export type Product = {
  price: number;
  volume: string;
  id: number;
  name: string;
  photo: StaticImageData | string;
  photoProduct?: StaticImageData | string | undefined;
  description: string;
  sizes: { [key: string]: number | undefined };
  size?: string;
  quantity?: number;
  badgeInfo?: string;
  isNew?: boolean;
  type: string;
};
export type CartItem = {
  product: Product;
  quantity: number;
  size?: string;
};

export interface CartContextValue {
  cart: { quantity?: number }[]; 
  cartItems: CartItem[];
}