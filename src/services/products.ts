import type { Product } from "@/types/types";
import reco from "../../public/images/products/recoil.png";

const NEXT_PUBLIC_API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL ?? "";

const fetchOptions = {
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json"
  }
};

export const fetchProducts = async (): Promise<Product[]> => {
  try {
    const response = await fetch(
      `${NEXT_PUBLIC_API_BASE_URL}/products`,
      fetchOptions
    );
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

    if (!data?.data) {
      throw new Error("Invalid response format");
    }

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

export const fetchProductById = async (id: string): Promise<Product | null> => {
  try {
    if (!/^[a-zA-Z0-9-_]+$/.test(id)) {
      return null;
    }

    const encodedId = encodeURIComponent(id);
    const response = await fetch(
      `${NEXT_PUBLIC_API_BASE_URL}/products/${encodedId}`,
      fetchOptions
    );
    
    if (!response.ok) {
      if (response.status === 404) {
        return null;
      }
      throw new Error(`Failed to fetch product: ${response.statusText}`);
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
      };
    } = await response.json();

    if (!data?.data) {
      throw new Error("Invalid response format");
    }

    const product = data.data;

    return {
      id: isNaN(Number(id)) ? id : Number(id),
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
