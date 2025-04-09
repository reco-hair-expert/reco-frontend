import { Product } from '@/types/types';
import reco from '../../public/images/products/recoil.png';

export const fetchProducts = async (): Promise<Product[]> => {
  try {
    const response = await fetch('https://reco-backend-two.onrender.com/products');
    if (!response.ok) {
      throw new Error('Failed to fetch products');
    }
    const data = await response.json();
    
    return data.data.map((product: any) => ({
      id: product.id,
      _id: product._id,
      name: product.name,
      photo: reco,
      description: product.description,
      shortDescription: product.shortDescription,
      type: product.type,
      application: product.application,
      composition: product.composition,
      recommendation: product.recommendation,
      sizes: product.sizes.map((size: any) => ({
        _id: size._id,
        size: size.size,
        price: size.price
      })),
      badgeInfo: product.badgeInfo,
      isNewProduct: product.isNewProduct
    }));
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
}; 