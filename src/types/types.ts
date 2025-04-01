import { StaticImageData } from "next/image";

export type Product = {
  badgeInfo: boolean;
  isNew: boolean;
  price: number;
  volume: string;
  id: number;
  name: string;
  photo: StaticImageData | string;
  description: string;
  sizes: { [key: string]: number | undefined };
  size?: string;
  quantity?: number;
};
export type CartItem = {
  product: Product;
  quantity: number;
  size?: string;
};

export interface CartContextValue {
  cart: { quantity?: number }[]; 
}