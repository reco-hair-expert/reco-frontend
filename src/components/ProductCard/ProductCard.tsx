"use client";
import React, { useState } from "react";
import { Product } from "@/types/types";
import { useCartContext } from "@/hooks/useCartContext";
import styles from "./ProductCard.module.scss";
import HighlightText from "../HighLightText/HighLightText";
import Button from "../Button/Button";
import ButtonArrow from "../ArowButton/ArowButton";
import Image from "next/image";
import Link from "next/link";

interface ProductCardProps {
  products: Product[];
}

export const ProductCard: React.FC<ProductCardProps> = ({ products }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const { addToCart } = useCartContext();
  const currentProduct = products[currentIndex];

  const handleNext = () =>
    setCurrentIndex((prev) => (prev + 1) % products.length);
  const handlePrev = () =>
    setCurrentIndex((prev) => (prev - 1 + products.length) % products.length);

  if (!products?.length) return <div>Продукти не знайдені.</div>;

  const handleSizeChange = (size: string) => setSelectedSize(size);

  const handleAddToCart = () => {
    if (!selectedSize || !currentProduct.sizes) {
      return alert("Будь ласка, виберіть розмір!");
    }

    const newItem = {
      id: currentProduct.id,
      name: currentProduct.name,
      size: selectedSize,
      price: currentProduct.sizes[selectedSize] || currentProduct.price || 450,
      photo: currentProduct.photo,
      basePrice: currentProduct.price || 450
    };

    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    localStorage.setItem("cart", JSON.stringify([...cart, newItem]));
    addToCart(currentProduct, selectedSize);
  };

  return (
    <section className="container">
      <div className={styles.card}>
        <div className={styles.carousel}>
          <div className={styles.slide}>
            <Image
              src={currentProduct.photo}
              alt={currentProduct.name}
              width={200}
              height={200}
              className={styles.image}
            />
          </div>
          <ButtonArrow
            icon="left"
            onClick={handlePrev}
            className={styles.arrowLeft}
          />
          <ButtonArrow
            icon="right"
            onClick={handleNext}
            className={styles.arrowRight}
          />
        </div>
        <div className={styles.info}>
          <HighlightText>
            <h2>{currentProduct.name}</h2>
          </HighlightText>
          <div className={styles.volume}>
            <h3>{currentProduct.volume}</h3>
          </div>
          <p className={styles.priceContainer}>
            <strong className={styles.price}>Ціна: </strong>
            {selectedSize
              ? `${currentProduct.sizes[selectedSize]} грн`
              : "Оберіть розмір"}
          </p>
          <div className={styles.sizes}>
            {Object.keys(currentProduct.sizes || {}).length ? (
              Object.keys(currentProduct.sizes).map((size) => (
                <label key={size}>
                  <input
                    type="radio"
                    name="size"
                    value={size}
                    checked={selectedSize === size}
                    onChange={() => handleSizeChange(size)}
                  />
                  {size}
                </label>
              ))
            ) : (
              <div>Розміри не доступні для цього товару.</div>
            )}
          </div>
          <div className={styles.descriptionContainer}>
            <p>{currentProduct.description}</p>
          </div>
          <Button
            size="m"
            variant="primary"
            className={styles.addToCart}
            onClick={handleAddToCart}
            disabled={!selectedSize}
          >
            ДОДАТИ В КОШИК
          </Button>
          <Button size="m" variant="primary" className={styles.moreInfo}>
            <Link href="/catalog">MORE INFO</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};
