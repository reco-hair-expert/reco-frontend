"use client";

import { useEffect, useState } from "react";
import type { Product } from "@/types/types";
import { fetchProductById } from "@/services/products";
import SingleProductCard from "@/components/SingleProductCard/SingleProductCard";
import Error404 from "@/components/Error404/error404";

export default function ProductPage({ params }: { params: { slug: string } }) {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const loadProduct = async () => {
      try {
        // Проверяем, что slug не содержит недопустимых символов
        if (!/^[a-zA-Z0-9-_]+$/.test(params.slug)) {
          setError(true);
          return;
        }

        const data = await fetchProductById(params.slug);
        if (!data) {
          setError(true);
          return;
        }
        setProduct(data);
      } catch (error) {
        console.error("Error loading product:", error);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    loadProduct();
  }, [params.slug]);

  if (loading) {
    return (
      <div className="container flex items-center justify-center min-h-[50vh]">
        <div className="text-yellow-500 text-xl">Завантаження...</div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="container">
        <Error404 />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <SingleProductCard product={product} />
    </div>
  );
}
