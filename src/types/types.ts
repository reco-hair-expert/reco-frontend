import { StaticImageData } from "next/image";

export type Product = {
  id: number;
  _id: string;
  name: string;
  photo: StaticImageData | string;
  description: string;
  shortDescription: string;
  type: string;
  application: string;
  composition: string;
  recommendation: string;
  sizes: Array<{
    _id: string;
    size: string;
    price: number;
  }>;
  badgeInfo?: string;
  isNewProduct: boolean;
};

export type CartItem = {
  product: Product;
  quantity: number;
  size?: string;
};

export interface CartContextValue {
  cartItems: CartItem[];
  addToCart: (product: Product, size?: string) => void;
  removeFromCart: (productId: number, size?: string) => void;
  updateCartItemQuantity: (productId: number, quantity: number, size?: string) => void;
  cartTotal: number;
  cartCount: number;
}

