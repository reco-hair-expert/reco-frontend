"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Product } from "@/types/types";
import { fetchProductById } from "@/services/products";
import SingleProductCard from "@/components/SingleProductCard/SingleProductCard";

export default function ProductPage({ params }: { params: { slug: string } }) {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProduct = async () => {
      try {
        const data = await fetchProductById(params.slug);
        setProduct(data);
      } catch (error) {
        console.error("Error loading product:", error);
      } finally {
        setLoading(false);
      }
    };

    loadProduct();
  }, [params.slug]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <SingleProductCard product={product} />
    </div>
  );
}
