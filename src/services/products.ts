import { Product } from "@/types/types";
import reco from "../../public/images/products/recoil.png";

const fetchOptions = {
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
    Origin: "http://localhost:3001"
  }
};

export const fetchProducts = async (): Promise<Product[]> => {
  try {
    const response = await fetch(
      "https://reco-backend-two.onrender.com/products",
      fetchOptions
    );
    if (!response.ok) {
      throw new Error("Failed to fetch products");
    }
    const data = await response.json();

    return data.data.map((product: any, index: number) => ({
      id: index + 1,
      _id: product._id || `product_${index + 1}`,
      name: product.name,
      photo: product.pictures.mainPicture || reco,
      description: product.description,
      shortDescription: product.shortDescription,
      type: product.type,
      application: product.application,
      composition: product.composition,
      recommendation: product.recommendation,
      sizes: product.sizes.map((size: any) => ({
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
    const response = await fetch(
      "https://reco-backend-two.onrender.com/products",
      fetchOptions
    );
    if (!response.ok) {
      throw new Error("Failed to fetch products");
    }
    const data = await response.json();

    if (!data.data || data.data.length === 0) {
      return null;
    }

    const product = data.data.find((p: any) => p._id === id);

    if (!product) {
      return null;
    }

    return {
      id: product.id,
      _id: product._id,
      name: product.name,
      photo: product.pictures.mainPicture || reco,
      description: product.description,
      shortDescription: product.shortDescription,
      type: product.type,
      application: product.application,
      composition: product.composition,
      recommendation: product.recommendation,
      sizes: product.sizes.map((size: any) => ({
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
