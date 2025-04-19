"use client";
import React, { useState, useEffect, useMemo, useCallback } from "react";
import { Product } from "@/types/types";
import { useCartContext } from "@/hooks/useCartContext";
import styles from "./ProductCard.module.scss";
import HighlightText from "../HighLightText/HighLightText";
import Button from "../Button/Button";
import ButtonArrow from "../ArowButton/ArowButton";
import Icon from "../Icon/Icon";
import Image from "next/image";
import Carousel from "react-spring-3d-carousel";
import { useSwipeable } from "react-swipeable";
import Link from "next/link";

interface ProductCardProps {
  products: Product[];
  showButton?: boolean;
}

const ProductCard: React.FC<ProductCardProps> = ({ products, showButton }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(() =>
    typeof window !== "undefined" ? window.innerWidth <= 768 : false
  );
  const [offsetRadius, setOffsetRadius] = useState(2);
  const { addToCart } = useCartContext();

  const currentProduct = products[currentIndex];

  useEffect(() => setSelectedSize(null), [currentIndex]);

  useEffect(() => {
    const handleResize = () => {
      if (typeof window === "undefined") return;

      const width = window.innerWidth;
      setIsMobile(width <= 768);
      setOffsetRadius(width >= 768 && width <= 1225 ? 4 : 2);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleNext = () =>
    setCurrentIndex((prev) => (prev + 1) % products.length);
  const handlePrev = () =>
    setCurrentIndex((prev) => (prev - 1 + products.length) % products.length);
  const handleSizeChange = (size: string) => setSelectedSize(size);

  const handleAddToCart = useCallback(() => {
    if (!selectedSize || !currentProduct.sizes) {
      return alert("Будь ласка, виберіть розмір!");
    }
    if (!products?.length) return;

    const selectedSizeObj = currentProduct.sizes.find(
      (s) => s.size === selectedSize
    );
    if (!selectedSizeObj) return;

    const newItem = {
      id: currentProduct.id,
      name: currentProduct.name,
      size: selectedSize,
      price: selectedSizeObj.price,
      photo: currentProduct.photo
    };

    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    localStorage.setItem("cart", JSON.stringify([...cart, newItem]));
    addToCart(currentProduct, selectedSize);
  }, [selectedSize, currentProduct, addToCart, products?.length]);

  const renderSizes = () => {
    const totalSizes = currentProduct.sizes?.length || 0;

    return (
      <div className={styles.radioInput}>
        {totalSizes ? (
          <>
            {currentProduct.sizes.map(({ size }, index) => {
              const selectedIndex = currentProduct.sizes.findIndex(
                ({ size }) => size === selectedSize
              );
              const isFilled = index <= selectedIndex;

              return (
                <label key={size} className={isFilled ? styles.filled : ""}>
                  <input
                    type="radio"
                    name="size"
                    value={size}
                    checked={selectedSize === size}
                    onChange={() => handleSizeChange(size)}
                  />
                  <span>{size}</span>
                </label>
              );
            })}
            <div
              className={styles.selection}
              style={{
                width: `${((currentProduct.sizes.findIndex(({ size }) => size === selectedSize) + 1) / totalSizes) * 100}%`
              }}
            />
          </>
        ) : (
          <div>Розміри не доступні для цього товару.</div>
        )}
      </div>
    );
  };

  const renderDescription = () => (
    <div className={styles.descriptionContainer}>
      <p>{currentProduct.description}</p>
    </div>
  );

  const renderPrice = () => {
    const selectedSizeObj = selectedSize
      ? currentProduct.sizes.find((s) => s.size === selectedSize)
      : null;

    return (
      <p className={styles.priceContainer}>
        <strong className={styles.price}>Ціна: </strong>
        {selectedSizeObj ? `${selectedSizeObj.price} грн` : "Оберіть розмір"}
      </p>
    );
  };

  const slides = useMemo(
    () =>
      products.map((product, index) => ({
        key: product.id,
        content: (
          <div
            className={`${styles.slide} ${index === currentIndex ? styles.active : ""}`}
            key={index}
          >
            <Image
              src={product.photo}
              alt={product.name}
              width={300}
              height={300}
              quality={80}
              placeholder="blur"
              blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4gHYSUNDX1BST0ZJTEUAAQEAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADb/2wBDABQODxIPDRQSEBIXFRQdHx4eHRoaHSQtJSAkKCAkKCAkKCAkKCAkKCAkKCAkKCAkKCAkKCAkKCAkKCAkKCAkKCD/2wBDARUXFy4eHhs4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4OD/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAb/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className={styles.productImage}
            />
            {product.isNewProduct && <div className={styles.newBadge}>NEW</div>}
            {product.badgeInfo && (
              <Link href={`/${product._id}`}>
                <div className={styles.badgeInfo}>
                  <Icon
                    name="icon-info"
                    size={isMobile ? 24 : 28}
                    fill="none"
                    stroke={styles.yellowColor}
                  />
                </div>
              </Link>
            )}
            {index === currentIndex && showButton && (
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
                  <Link href={`/catalog`}>
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
                  </Link>
                )}
              </div>
            )}
          </div>
        )
      })),
    [
      products,
      currentIndex,
      selectedSize,
      isMobile,
      handleAddToCart,
      showButton
    ]
  );

  const swipeHandlers = useSwipeable({
    onSwipedLeft: () => isMobile && handleNext(),
    onSwipedRight: () => isMobile && handlePrev(),
    preventScrollOnSwipe: true,
    trackMouse: true
  });

  return (
    <section className="container" {...swipeHandlers}>
      <div className={styles.card}>
        <div className={styles.carousel}>
          <Carousel
            slides={slides}
            goToSlide={currentIndex}
            offsetRadius={offsetRadius}
            showNavigation={false}
            animationConfig={{ tension: 100, friction: 20 }}
          />
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
              {renderPrice()}
              {renderSizes()}
              {renderDescription()}
            </>
          ) : (
            <>
              {renderDescription()}
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

export default ProductCard;
