"use client";
import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import styles from "./CatalogPage.module.scss";
import { Product } from "@/types/types";
import { fetchProducts } from "@/services/products";

const ProductCard = dynamic(
  () =>
    import("@/components/ProductCard3/ProductCard").then((mod) => mod.default),
  {
    ssr: false
  }
);

const CatalogCardList = dynamic(
  () =>
    import("@/components/CatalogCardList/CatalogCardList").then(
      (mod) => mod.default
    ),
  {
    loading: () => <div>Loading...</div>
  }
);

const FilterToggle = dynamic(
  () =>
    import("@/components/FilterToggle/FilterToggle").then((mod) => mod.default),
  {
    loading: () => <div>Loading...</div>
  }
);

const BackgroundCircles = dynamic(
  () =>
    import("@/components/BackgroundCircles/BackgroundCircles").then(
      (mod) => mod.default
    ),
  {
    loading: () => null
  }
);

export const CatalogClient = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoading(true);
        setError(null);
        const fetchedProducts = await fetchProducts();
        setProducts(fetchedProducts);
      } catch (error) {
        setError('Failed to load products. Please try again later.');
        console.error('Error loading products:', error);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  if (loading) {
    return <div className={styles.loading}>Loading products...</div>;
  }

  if (error) {
    return <div className={styles.error}>{error}</div>;
  }

  // Структурированные данные для каталога
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: products.map((product, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "Product",
        "name": product.name,
        "description": product.description,
        "image": product.photo,
        "price": Object.values(product.sizes)[0] || 0,
        "priceCurrency": "UAH"
      }
    }))
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <main>
        <section className="container" aria-label="Новинки">
          <div className={styles.newProducts}>
            <h1 className={styles.title}>НОВИНКИ</h1>
            <ProductCard products={products} />
          </div>
        </section>

        <section className="container" aria-label="Все товары">
          <h2 className={styles.title}>Всі товари</h2>
          <nav aria-label="Навигация по товарам">
            <ul className={styles.productsList}>
              <CatalogCardList products={products} perRow={4} />
            </ul>
          </nav>
          <button
            className={styles.productBtn}
            aria-label="Показать больше товаров"
          >
            Показати більше
          </button>
        </section>

        <section
          className={`container ${styles.recommendationContainer}`}
          aria-label="Рекомендации"
        >
          <div className={styles.recommendationHeader}>
            <h2 className={styles.title}>Рекомендації</h2>
            <FilterToggle />
          </div>
          <nav aria-label="Рекомендуемые товары">
            <ul className={styles.recommendationList}>
              <CatalogCardList perRow={3} products={products.slice(0, 3)} />
            </ul>
          </nav>
          <BackgroundCircles className={styles.backgroundCircles} />
        </section>
      </main>
    </>
  );
}; 