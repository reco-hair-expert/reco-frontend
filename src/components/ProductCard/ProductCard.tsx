'use client'
import React, { useState, useEffect } from "react";
import { Product } from "@/types/types";
import { useCartContext } from "@/hooks/useCartContext";
import styles from "./ProductCard.module.scss";
import HighlightText from "../HighLightText/HighLightText";
import Button from "../Button/Button";
import ButtonArrow from "../ArowButton/ArowButton";
import Icon from "../Icon/Icon";

interface ProductCardProps {
  products: Product[];
}

export const ProductCard: React.FC<ProductCardProps> = ({ products }) => {
  if (!products?.length) return <div>Продукти не знайдені.</div>;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const { addToCart } = useCartContext();
  const currentProduct = products[currentIndex];

  useEffect(() => setSelectedSize(null), [currentIndex]);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % products.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + products.length) % products.length);
  };

  const handleSizeChange = (size: string) => setSelectedSize(size);

  const handleAddToCart = () => {
    if (!selectedSize || !currentProduct.sizes) {
      return alert("Будь ласка, виберіть розмір!");
    }

    const newItem = {
      id: currentProduct.id,
      name: currentProduct.name,
      size: selectedSize,
      price: currentProduct.sizes[selectedSize],
      photo: currentProduct.photo,
      basePrice: currentProduct.price || 450
    };

    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    localStorage.setItem("cart", JSON.stringify([...cart, newItem]));
    addToCart(currentProduct, selectedSize);
  };

  const renderSizes = () => (
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
  );

  const renderDescription = () => (
    <div className={styles.descriptionContainer}>
      <p>{currentProduct.description}</p>
    </div>
  );

  const renderPrice = () => (
    <p className={styles.priceContainer}>
      <strong className={styles.price}>Ціна: </strong>
      {selectedSize
        ? `${currentProduct.sizes[selectedSize]} грн`
        : "Оберіть розмір"}
    </p>
  );

  return (
    <section className="container">
      <div className={styles.card}>
        <div className={styles.carousel}>
          <div className={styles.slidesContainer}>
            {products.map((product, index) => (
              <div
                key={product.id}
                className={`${styles.slide} ${index === currentIndex ? styles.active : ''}`}
                style={{
                  transform: `translateX(${(index - currentIndex) * 100}%)`,
                  opacity: index === currentIndex ? 1 : 0.5
                }}
              >
                <img
                  src={product.photo}
                  alt={product.name}
                  className={styles.image}
                />
                {product.isNew && <div className={styles.newBadge}>NEW</div>}
                {product.badgeInfo && (
                  <div className={styles.badgeInfo}>
                    <Icon
                      name="icon-waves"
                      size={isMobile ? 24 : 28}
                      fill="none"
                      stroke={styles.yellowColor}
                    />
                  </div>
                )}
                {index === currentIndex && (
                  <div className={styles.buttonPlace}>
                    {isMobile ? (
                      <Button
                        size="m"
                        variant="primary"
                        className={styles.addToCart}
                        onClick={handleAddToCart}
                        disabled={!selectedSize}
                      >
                        ДОДАТИ В КОШИК
                      </Button>
                    ) : (
                      <Button
                        variant="secondary"
                        size="l"
                        className={styles.moreButton}
                      >
                        <div className={styles.iconContainer}>
                          <Icon
                            name="icon-arrow-up-right2"
                            size={24}
                            fill="white"
                            stroke="none"
                          />
                        </div>
                        <span className={styles.moreButtonText}>
                          БІЛЬШЕ ТОВАРІВ
                        </span>
                      </Button>
                    )}
                  </div>
                )}
              </div>
            ))}
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
          {isMobile ? (
            <>
              <div className={styles.volume}>
                <h3>{currentProduct.volume}</h3>
              </div>
              {renderPrice()}
              {renderSizes()}
              {renderDescription()}
            </>
          ) : (
            <>
              {renderDescription()}
              <div className={styles.volume}>
                <h3>{currentProduct.volume}</h3>
              </div>
              {renderPrice()}
              {renderSizes()}
            </>
          )}

          {!isMobile && (
            <Button
              size="m"
              variant="primary"
              className={styles.addToCart}
              onClick={handleAddToCart}
              disabled={!selectedSize}
            >
              ДОДАТИ В КОШИК
            </Button>
          )}
        </div>
      </div>
    </section>
  );
};