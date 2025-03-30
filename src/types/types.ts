import { StaticImageData } from "next/image";

export type Product = {
  price: number;
  volume: string;
  id: number;
  name: string;
  photo: StaticImageData;
  photoProduct?: string | StaticImageData;
  description: string;
  sizes: { [key: string]: number | undefined };
  size?: string;
  quantity?: number;
  badgeInfo?: boolean; 
  isNew?: boolean;
};
