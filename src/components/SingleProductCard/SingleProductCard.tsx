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

interface SingleProductCardProps {
  product: Product;
}

const SingleProductCard: React.FC<SingleProductCardProps> = ({ product }) => {
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [addedImpact, setAddedImpact] = useState(false);
  const { addToCart } = useCartContext();
  const { isMobile, isTablet } = useDeviceDetection();

  React.useEffect(() => {
    if (!selectedSize && product.sizes && product.sizes.length > 0) {
      setSelectedSize(product.sizes[0].size);
    }
  }, [product.sizes, selectedSize]);

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

    addToCart(product, selectedSize);
    setAddedImpact(true);
    setTimeout(() => setAddedImpact(false), 1000);
  };

  const renderAdditionalInfo = () => (
    <div className={styles.additionalInfo}>
      <p className={styles.infoItem}>Опис: {product.description}</p>
      <p className={styles.infoItem}>Застосування: {product.application}</p>
      <p className={styles.infoItem}>Склад: {product.composition}</p>
      <p className={styles.infoItem}>Рекомендації: {product.recommendation}</p>
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
          <Button
            size={getButtonSize()}
            onClick={handleAddToCart}
            className={addedImpact ? styles.added : ""}
            disabled={addedImpact}
          >
            {addedImpact ? "Додано!" : "КУПИТИ"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SingleProductCard;
