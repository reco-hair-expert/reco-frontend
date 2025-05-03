import React, { useState, useEffect, useMemo, useCallback } from "react";
import type { Product } from "@/types/types";
import { useCartContext } from "@/hooks/useCartContext";
import { useFlyingImage } from "@/hooks/useFlyingImage";
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
  const { flyToCart } = useFlyingImage();

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
    
    // Get the image element's position
    const imageElement = document.querySelector(`.${styles.slide}.${styles.active} .${styles.productImage}`);
    if (imageElement) {
      const rect = imageElement.getBoundingClientRect();
      const imageSrc = typeof currentProduct.photo === 'string' 
        ? currentProduct.photo 
        : currentProduct.photo.src;
      flyToCart({ imageSrc, fromRect: rect });
    }
  }, [selectedSize, currentProduct, addToCart, products?.length, flyToCart]);

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
            key={index}
            className={`${styles.slide} ${index === currentIndex ? styles.active : ""}`}
          >
            <Image
              alt={product.name}
              blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4gHYSUNDX1BST0ZJTEUAAQEAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADb/2wBDABQODxIPDRQSEBIXFRQdHx4eHRoaHSQtJSAkKCAkKCAkKCAkKCAkKCAkKCAkKCAkKCAkKCAkKCAkKCAkKCD/2wBDARUXFy4eHhs4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4OD/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAb/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
              className={styles.productImage}
              height={300}
              placeholder="blur"
              quality={80}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              src={product.photo}
              width={300}
            />
            {product.isNewProduct && <div className={styles.newBadge}>NEW</div>}
            {product.badgeInfo && (
              <Link href={`/${product._id}`}>
                <div className={styles.badgeInfo}>
                  <Icon
                    fill="none"
                    name="icon-info"
                    size={isMobile ? 24 : 28}
                    stroke={styles.yellowColor}
                  />
                </div>
              </Link>
            )}
            {index === currentIndex && showButton && (
              <div className={styles.buttonPlace}>
                {isMobile ? (
                  <Button
                    className={styles.addToCart}
                    disabled={!selectedSize}
                    size="m"
                    variant="primary"
                    onClick={handleAddToCart}
                  >
                    ДОДАТИ В КОШИК
                  </Button>
                ) : (
                  <Link href={`/catalog`}>
                    <Button
                      className={styles.moreButton}
                      size="l"
                      variant="secondary"
                    >
                      <div className={styles.iconContainer}>
                        <Icon
                          fill="white"
                          name="icon-arrow-up-right2"
                          size={24}
                          stroke="none"
                        />
                      </div>
                      <span className={styles.moreButtonText}>ВСІ ТОВАРИ</span>
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
              {renderDescription()}
              {renderPrice()}
              <ProductSizeSelector
                selectedSize={selectedSize}
                sizes={currentProduct.sizes}
                onSizeChange={setSelectedSize}
              />
            </>
          )}

          {!isMobile && (
            <Button
              className={styles.addToCart}
              disabled={!selectedSize}
              size="m"
              variant="primary"
              onClick={handleAddToCart}
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
