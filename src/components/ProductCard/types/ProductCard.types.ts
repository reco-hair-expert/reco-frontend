import { StaticImageData } from 'next/image'; 

export interface Product {
  id: string;
  name: string;
  description: string;
  sizes: Record<string, number>;
  photo: string | StaticImageData;
  price: number;
  volume?: string;
  isNew?: boolean;
  badgeInfo?: string;
}

export interface ProductCardProps {
  products: Product[];
}
