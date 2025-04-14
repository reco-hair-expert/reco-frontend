"use client";
import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { Product } from "@/types/types";
import { fetchProducts } from "@/services/products";
import HeroSection from "@/components/HeroSection/HeroSection";
import FeaturesSection from "@/components/FeaturesSection/FeaturesSection";
import Insta from "@/components/Insta/Insta";
import FeedbackSection from "@/components/FeedbackSection/FeedbackSection";
import styles from "./page.module.scss";
import QuizPopup from "@/components/Popup/QuizPopup";

const ProductCard = dynamic(
  () =>
    import("@/components/ProductCard3/ProductCard").then((mod) => mod.default),
  {
    ssr: false
  }
);

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
    if (isPopupOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
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
      <Insta />
      <FeedbackSection />

      <QuizPopup onClose={handleClosePopup} isVisible={isPopupOpen} />
    </>
  );
};
