import { StaticImageData } from "next/image";

export type Product = {
  badgeInfo: string;
  isNew: string;
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
