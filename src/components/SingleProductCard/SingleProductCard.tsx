"use client";
import React, { useState } from "react";
import { Product } from "@/types/types";
import { useCartContext } from "@/hooks/useCartContext";
import styles from "./SingleProductCard.module.scss";
import Button from "../Button/Button";
import Image from "next/image";
import HighlightText from "../HighLightText/HighLightText";

interface SingleProductCardProps {
  product: Product;
}

const SingleProductCard: React.FC<SingleProductCardProps> = ({ product }) => {
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const { addToCart } = useCartContext();

  const handleSizeChange = (size: string) => setSelectedSize(size);

  const handleAddToCart = () => {
    if (!selectedSize || !product.sizes) {
      return alert("Будь ласка, виберіть розмір!");
    }

    const selectedSizeObj = product.sizes.find((s) => s.size === selectedSize);
    if (!selectedSizeObj) return;

    const newItem = {
      id: product.id,
      name: product.name,
      size: selectedSize,
      price: selectedSizeObj.price,
      photo: product.photo
    };

    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    localStorage.setItem("cart", JSON.stringify([...cart, newItem]));
    addToCart(product, selectedSize);
  };

  const renderSizes = () => (
    <div className={styles.sizes}>
      {product.sizes?.length ? (
        product.sizes.map(({ size, price }) => (
          <label key={size}>
            <input
              type="radio"
              name="size"
              value={size}
              checked={selectedSize === size}
              onChange={() => handleSizeChange(size)}
            />
            {size} — {price} ₴
          </label>
        ))
      ) : (
        <div>Розміри не доступні для цього товару.</div>
      )}
    </div>
  );

  const renderDescription = () => (
    <div className={styles.descriptionContainer}>
      <p>{product.description}</p>
    </div>
  );

  const renderAdditionalInfo = () => (
    <div className={styles.additionalInfo}>
      <p className={styles.infoItem}>
        <strong>Тип:</strong> {product.type}
      </p>
      <p className={styles.infoItem}>
        <strong>Застосування:</strong> {product.application}
      </p>
      <p className={styles.infoItem}>
        <strong>Склад:</strong> {product.composition}
      </p>
      <p className={styles.infoItem}>
        <strong>Рекомендації:</strong> {product.recommendation}
      </p>
      {product.badgeInfo && (
        <p className={styles.infoItem}>
          <strong>Додаткова інформація:</strong> {product.badgeInfo}
        </p>
      )}
    </div>
  );

  const renderPrice = () => {
    const selectedSizeObj = selectedSize
      ? product.sizes.find((s) => s.size === selectedSize)
      : null;

    return (
      <p className={styles.priceContainer}>
        <strong className={styles.price}>Ціна: </strong>
        {selectedSizeObj ? `${selectedSizeObj.price} грн` : "Оберіть розмір"}
      </p>
    );
  };

  return (
    <div className={styles.card}>
      <div className={styles.imageContainer}>
        <Image
          src={product.photo}
          alt={product.name}
          width={500}
          height={500}
          quality={80}
          className={styles.productImage}
        />
        {product.isNewProduct && <div className={styles.newBadge}>NEW</div>}
      </div>
      <div className={styles.infoContainer}>
        <HighlightText>
          <h1 className={styles.productName}>{product.name}</h1>
        </HighlightText>
        {renderDescription()}
        {renderAdditionalInfo()}
        {renderSizes()}
        {renderPrice()}
        <Button
          size="l"
          variant="primary"
          className={styles.addToCart}
          onClick={handleAddToCart}
          disabled={!selectedSize}
        >
          ДОДАТИ В КОШИК
        </Button>
      </div>
    </div>
  );
};

export default SingleProductCard;
