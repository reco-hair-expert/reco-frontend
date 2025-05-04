import type { Product } from "@/types/types";
import reco from "../../public/images/products/recoil.png";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "";
const API_SECRET_KEY = process.env.API_SECRET_KEY ?? "";


const fetchOptions = {
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
    "Authorization": `Bearer ${API_SECRET_KEY}`, 
  }
};

export const fetchProducts = async (): Promise<Product[]> => {
  try {
    const response = await fetch(`${API_URL}/products`, fetchOptions);
    if (!response.ok) {
      throw new Error("Failed to fetch products");
    }
    const data: {
      data: {
        id: string;
        _id?: string;
        name: string;
        pictures: { mainPicture?: string };
        description: string;
        shortDescription: string;
        type: string;
        application: string;
        composition: string;
        recommendation: string;
        sizes: { _id: string; volume: string; price: number }[];
        badgeInfo: string;
        isNewProduct: boolean;
      }[];
    } = await response.json();

    return data.data.map((product, index) => ({
      id: Number(product.id) || index + 1,
      _id: product._id || `product_${index + 1}`,
      name: product.name,
      photo: product.pictures.mainPicture || reco,
      description: product.description,
      shortDescription: product.shortDescription,
      type: product.type,
      application: product.application,
      composition: product.composition,
      recommendation: product.recommendation,
      sizes: product.sizes.map((size) => ({
        _id: size._id,
        size: size.volume,
        price: size.price
      })),
      badgeInfo: product.badgeInfo,
      isNewProduct: product.isNewProduct
    }));
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
};

// Функция для получения одного продукта по ID
export const fetchProductById = async (id: string): Promise<Product | null> => {
  try {
    const response = await fetch(`${API_URL}/products/${id}`, fetchOptions); // Передаем id продукта в URL
    if (!response.ok) {
      throw new Error("Failed to fetch product");
    }
    const data: {
      data: {
        _id: string;
        name: string;
        pictures: { mainPicture?: string };
        description: string;
        shortDescription: string;
        type: string;
        application: string;
        composition: string;
        recommendation: string;
        sizes: { _id: string; volume: string; price: number }[];
        badgeInfo: string;
        isNewProduct: boolean;
      }[];
    } = await response.json();

    const product = data.data.find((p) => p._id === id);

    if (!product) {
      return null;
    }

    return {
      id: Number(id),
      _id: product._id,
      name: product.name,
      photo: product.pictures.mainPicture || reco,
      description: product.description,
      shortDescription: product.shortDescription,
      type: product.type,
      application: product.application,
      composition: product.composition,
      recommendation: product.recommendation,
      sizes: product.sizes.map((size) => ({
        _id: size._id,
        size: size.volume,
        price: size.price
      })),
      badgeInfo: product.badgeInfo,
      isNewProduct: product.isNewProduct
    };
  } catch (error) {
    console.error("Error fetching product:", error);
    return null;
  }
};
