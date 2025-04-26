import { StaticImageData } from "next/image";

export interface Product {
  id: number;
  name: string;
  photo: StaticImageData;
  photoProduct: StaticImageData;
  type: string;
  description: string;
  price: number;
  badgeInfo?: string;
  isNew: boolean;
  volume: string;
  sizes: Record<string, number>;
}

export const products: Product[] = [
  {
    id: 1,
    name: "Product 1",
    photo: {
      src: "/product1.jpg",
      height: 200,
      width: 200,
      blurDataURL: ""
    } as StaticImageData,
    photoProduct: {
      src: "/product1-detail.jpg",
      height: 200,
      width: 200,
      blurDataURL: ""
    } as StaticImageData,
    type: "Type 1",
    description: "Description for product 1",
    price: 100,
    badgeInfo: "Special offer",
    isNew: true,
    volume: "100ml",
    sizes: { S: 100, M: 200, L: 300 }
  },
  {
    id: 2,
    name: "Product 2",
    photo: {
      src: "/product2.jpg",
      height: 200,
      width: 200,
      blurDataURL: ""
    } as StaticImageData,
    photoProduct: {
      src: "/product2-detail.jpg",
      height: 200,
      width: 200,
      blurDataURL: ""
    } as StaticImageData,
    type: "Type 2",
    description: "Description for product 2",
    price: 150,
    isNew: false,
    volume: "200ml",
    sizes: { S: 150, M: 250, L: 350 }
  }
];
