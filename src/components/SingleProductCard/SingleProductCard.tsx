"use client";

import React, { useState } from "react";
import type { Product } from "@/types/types";
import { useCartContext } from "@/hooks/useCartContext";
import styles from "./SingleProductCard.module.scss";
import Button from "../Button/Button";
import Image from "next/image";
import HighlightText from "../HighLightText/HighLightText";
import ProductSizeSelector from "../ProductSizeSelector/ProductSizeSelector";
import useDeviceDetection from "@/context/useDeviceDetection";
import Collapsible from "react-collapsible";

interface SingleProductCardProps {
  product: Product;
}

const SingleProductCard: React.FC<SingleProductCardProps> = ({ product }) => {
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const { addToCart } = useCartContext();
  const { isMobile, isTablet } = useDeviceDetection();

  const getButtonSize = () => {
    if (isMobile) return "s";
    if (isTablet) return "m";
    return "xxl";
  };

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

  const renderAdditionalInfo = () => (
    <div className={styles.additionalInfo}>
      <p className={styles.descriptionText}>{product.description}</p>
      <Collapsible className={styles.collapsibleTrigger} trigger="Застосування">
        <p className={styles.infoItem}>{product.application}</p>
      </Collapsible>
      <Collapsible className={styles.collapsibleTrigger} trigger="Склад">
        <p className={styles.infoItem}>
          <strong>Склад:</strong> {product.composition}
        </p>
      </Collapsible>
      <Collapsible className={styles.collapsibleTrigger} trigger="Рекомендації">
        <p className={styles.infoItem}>
          <strong>Рекомендації:</strong> {product.recommendation}
        </p>
      </Collapsible>
    </div>
  );

  const renderPrice = () => {
    const selectedSizeObj = selectedSize
      ? product.sizes.find((s) => s.size === selectedSize)
      : null;

    return (
      <p className={styles.priceContainer}>
        <strong className={styles.price}>
          {selectedSizeObj ? `${selectedSizeObj.price} грн` : "Оберіть розмір"}
        </strong>
      </p>
    );
  };

  return (
    <div className={styles.card}>
      <div className={styles.imageContainer}>
        <Image
          alt={product.name}
          className={styles.productImage}
          height={500}
          quality={80}
          src={product.photo}
          width={500}
        />
        {product.isNewProduct && <div className={styles.newBadge}>NEW</div>}
      </div>
      <div className={styles.infoContainer}>
        <div className={styles.headingContainer}>
          <HighlightText>
            <h1 className={styles.productName}>{product.name}</h1>
          </HighlightText>
          <p className={styles.productType}>{product.type}</p>
        </div>

        {renderAdditionalInfo()}
        <div className={styles.sizeAndPrice}>
          <ProductSizeSelector
            selectedSize={selectedSize}
            sizes={product.sizes || []}
            onSizeChange={handleSizeChange}
          />
          {renderPrice()}
          <Button size={getButtonSize()} onClick={handleAddToCart}>
            КУПИТИ
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SingleProductCard;
