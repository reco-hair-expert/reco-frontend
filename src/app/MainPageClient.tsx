"use client";
import React, { useEffect, useState, Suspense } from "react";
import dynamic from "next/dynamic";
import type { Product } from "@/types/types";
import { fetchProducts } from "@/services/products";
import HeroSection from "@/components/HeroSection/HeroSection";
import FeaturesSection from "@/components/FeaturesSection/FeaturesSection";
import styles from "./page.module.scss";

const ProductCard = dynamic(
  () => import("@/components/ProductCard3/ProductCard"),
  { ssr: false }
);

const Insta = dynamic(() => import("@/components/Insta/Insta"), {
  ssr: false,
  loading: () => <div className={styles.loading}>Загружаем Insta...</div>
});

// const FeedbackSection = dynamic(
//   () => import("@/components/FeedbackSection/FeedbackSection"),
//   {
//     ssr: false,
//     loading: () => <div className={styles.loading}>Отзывы грузятся...</div>
//   }
// );

const QuizPopup = dynamic(() => import("@/components/Popup/QuizPopup"), {
  ssr: false
});

export const MainPageClient = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoading(true);
        setError(null);
        const fetchedProducts = await fetchProducts();
        setProducts(fetchedProducts);
      } catch (error) {
        setError("Failed to load products. Please try again later.");
        console.error("Error loading products:", error);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();

    const popupTimer = setTimeout(() => {
      setIsPopupOpen(true);
    }, 5000);

    return () => {
      clearTimeout(popupTimer);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = isPopupOpen ? "hidden" : "auto";
  }, [isPopupOpen]);

  const handleClosePopup = () => {
    setIsPopupOpen(false);
  };

  if (loading) {
    return <div className={styles.loading}>Loading products...</div>;
  }

  if (error) {
    return <div className={styles.error}>{error}</div>;
  }

  return (
    <>
      <HeroSection />
      <FeaturesSection />

      <ProductCard products={products} showButton={true} />

      <Suspense
        fallback={<div className={styles.loading}>Завантажуемо Insta...</div>}
      >
        <Insta />
      </Suspense>

      {/* <Suspense
        fallback={<div className={styles.loading}>Отзывы грузятся...</div>}
      >
        <FeedbackSection />
      </Suspense> */}

      {isPopupOpen && (
        <QuizPopup isVisible={isPopupOpen} onClose={handleClosePopup} />
      )}
    </>
  );
};
