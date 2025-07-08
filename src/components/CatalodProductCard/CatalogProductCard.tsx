import React, { useState, useEffect, useMemo, useCallback } from "react";
import type { Product } from "@/types/types";
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
import ProductSizeSelector from "../ProductSizeSelector/ProductSizeSelector";

interface ProductCardProps {
  products: Product[];
}

const CatalogProductCard: React.FC<ProductCardProps> = ({ products }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(() =>
    typeof window !== "undefined" ? window.innerWidth <= 768 : false
  );
  const [offsetRadius, setOffsetRadius] = useState(2);
  const { addToCart } = useCartContext();
  const [addedImpact, setAddedImpact] = useState(false);

  const newProducts = useMemo(() => products.filter(p => p.isNewProduct), [products]);

  const currentProduct = newProducts[currentIndex] || {};

  useEffect(() => {
    const defaultSize = newProducts[currentIndex]?.sizes?.[0]?.size ?? null;
    setSelectedSize(defaultSize);
  }, [currentIndex, newProducts]);

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
    setCurrentIndex((prev) => (prev + 1) % newProducts.length);
  const handlePrev = () =>
    setCurrentIndex((prev) => (prev - 1 + newProducts.length) % newProducts.length);

  const handleAddToCart = useCallback(() => {
    if (!selectedSize || !currentProduct.sizes) {
      return alert("Будь ласка, виберіть розмір!");
    }
    if (!newProducts?.length) return;

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
    setAddedImpact(true);
    setTimeout(() => setAddedImpact(false), 1200);
  }, [selectedSize, currentProduct, addToCart, newProducts?.length]);

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
        <strong className={styles.price}> </strong>
        {selectedSizeObj ? `${selectedSizeObj.price} грн` : "Оберіть розмір"}
      </p>
    );
  };

  const slides = useMemo(
    () =>
      newProducts.map((product, index) => ({
        key: product.id,
        content:
          index === currentIndex ? (
            <Link
              key={index}
              href={`/${product._id}`}
              className={`${styles.slide} ${styles.active}`}
              style={{ textDecoration: 'none', color: 'inherit' }}
              tabIndex={-1}
            >
              <div>
                {product.isNewProduct && (
                  <div className={styles.newBadge}>NEW</div>
                )}
              </div>
              <Image
                alt={product.name}
                className={styles.productImage}
                height={300}
                quality={80}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                src={product.photo}
                width={300}
              />

              {isMobile && (
                <div className={styles.buttonPlace}>
                  <Button
                    className={`addToCart${addedImpact ? ' added' : ''}`}
                    disabled={!selectedSize || addedImpact}
                    size="m"
                    variant="primary"
                    onClick={e => { e.preventDefault(); e.stopPropagation(); handleAddToCart(); }}
                    style={addedImpact ? { backgroundColor: '#3ecf4a', color: '#fff', transition: 'background 0.3s, color 0.3s' } : {}}
                  >
                    {addedImpact ? 'Додано!' : 'ДОДАТИ В КОШИК'}
                  </Button>
                </div>
              )}
            </Link>
          ) : (
            <div
              key={index}
              className={styles.slide}
            >
              <div>
                {product.isNewProduct && (
                  <div className={styles.newBadge}>NEW</div>
                )}
              </div>
              <Image
                alt={product.name}
                className={styles.productImage}
                height={300}
                quality={80}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                src={product.photo}
                width={300}
              />
            </div>
          )
      })),
    [newProducts, currentIndex, selectedSize, isMobile, handleAddToCart, addedImpact]
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
            animationConfig={{ tension: 100, friction: 20 }}
            goToSlide={currentIndex}
            offsetRadius={offsetRadius}
            showNavigation={false}
            slides={slides}
          />
          <ButtonArrow
            className={styles.arrowLeft}
            icon="left"
            onClick={handlePrev}
          />
          <ButtonArrow
            className={styles.arrowRight}
            icon="right"
            onClick={handleNext}
          />
        </div>
        <div className={styles.info}>
          <HighlightText>
            <h2>{currentProduct.name}</h2>
          </HighlightText>
          {isMobile ? (
            <>
              {renderPrice()}
              <ProductSizeSelector
                selectedSize={selectedSize}
                sizes={currentProduct.sizes}
                onSizeChange={setSelectedSize}
              />
              {renderDescription()}
            </>
          ) : (
            <>
              <div>
                {renderDescription()}
                {renderPrice()}
              </div>
              <ProductSizeSelector
                selectedSize={selectedSize}
                sizes={currentProduct.sizes}
                onSizeChange={setSelectedSize}
              />
            </>
          )}

          {!isMobile && (
            <Button
              className={`addToCart${addedImpact ? ' added' : ''}`}
              disabled={!selectedSize || addedImpact}
              size="pr"
              variant="primary"
              onClick={e => { e.preventDefault(); e.stopPropagation(); handleAddToCart(); }}
              style={addedImpact ? { backgroundColor: '#3ecf4a', color: '#fff', transition: 'background 0.3s, color 0.3s' } : {}}
            >
              <div className={styles.iconContainer}>
                <Icon
                  fill="white"
                  name="icon-arrow-up-right2"
                  size={24}
                  stroke="none"
                />
              </div>
              {addedImpact ? 'Додано!' : 'ДОДАТИ В КОШИК'}
            </Button>
          )}
        </div>
      </div>
    </section>
  );
};

export default CatalogProductCard;
