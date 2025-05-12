"use client";

import Image from "next/image";
import styles from "./CatalogCard.module.scss";
import Link from "next/link";
import Icon from "../Icon/Icon";
import type { CatalogCardProps } from "./types/CatalogCard.types";
import { useState, useCallback, memo } from "react";
import { useCart } from "@/context/CartContext";

const CatalogCard = memo(({ product }: CatalogCardProps) => {
  const [selectedSize, setSelectedSize] = useState<string | null>(
    product.sizes?.[0]?.size || null
  );
    const [showSizeWarning, setShowSizeWarning] = useState(false);
  const { addToCart } = useCart();

  const handleSizeChange = useCallback(
    (event: React.ChangeEvent<HTMLSelectElement>) => {
      setSelectedSize(event.target.value);
    },
    []
  );

  const handleBuyClick = useCallback(() => {
    if (!selectedSize) {
      setShowSizeWarning(true);
      setTimeout(() => setShowSizeWarning(false), 3000);
      return;
    }

    addToCart(product, selectedSize);
  }, [selectedSize, addToCart, product]);

  const getSelectedSizePrice = useCallback(() => {
    if (!selectedSize || !product.sizes) return null;
    const selectedSizeObj = product.sizes.find((s) => s.size === selectedSize);
    return selectedSizeObj?.price || null;
  }, [selectedSize, product.sizes]);

  const renderSizes = useCallback(
    () => (
      <>
        {product.sizes?.length ? (
          <select
            className={styles.sizeSelect}
            value={selectedSize || ""}
            onChange={handleSizeChange}
          >
            {product.sizes.map(({ size }) => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </select>
        ) : (
          <div>Розміри не доступні для цього товару.</div>
        )}
      </>
    ),
    [product.sizes, selectedSize, handleSizeChange]
  );

  return (
    <div className={styles.card} data-testid="catalog-card">
      <div className={styles.imageContainer}>
        <Image
          alt={product.name}
          blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4gHYSUNDX1BST0ZJTEUAAQEAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADb/2wBDABQODxIPDRQSEBIXFRQdHx4eHRoaHSQtJSEkLzYvLy0vLi44QjY4OEI4Li8vQUVFRkZFRUVFRUVFRUVFRUVFRUX/2wBDAR0XFyAeIBogHiAeIBUVFRUVFRUVFRUVFRUVFRUVFRUVFRUVFRUVFRUVFRUVFRUVFRUVFRUVFRUVFRUVFRUVFRUX/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAb/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
          height={300}
          loading="lazy"
          placeholder="blur"
          quality={75}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          src={product.photo || "/fallback-image.jpg"}
          width={400}
        />
      </div>

      {showSizeWarning && (
        <div className={styles.sizeWarning}>
          Будь ласка, оберіть розмір перед покупкою.
        </div>
      )}

      <div className={styles.badgeContainer}>
        {product.badgeInfo && (
          <span className={styles.saleBadge}>{product.badgeInfo}</span>
        )}
        {/* <span className={styles.typeBadge}>{product.type}</span> */}
      </div>

      <Link className={styles.infoBtn} href={`/${product._id}`}>
        <Icon className={styles.infoBtnIcon} name="icon-info" />
      </Link>

      <div className={styles.productDetailsContainer}>
        <header className={styles.infoContainer}>
          <h3 className={styles.productName}>{product.name}</h3>
        </header>

        <div className={styles.productAction}>
          <p className={styles.productType}>{product.shortDescription}</p>
          <form className={styles.productSizeForm}>{renderSizes()}</form>
          <div className={styles.productBtnContainer}>
            <button
              className={styles.buyBtn}
              type="button"
              onClick={handleBuyClick}
            >
              {getSelectedSizePrice() ? (
                <>Купити за {getSelectedSizePrice()} грн</>
              ) : (
                "Оберіть розмір"
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
});

CatalogCard.displayName = "CatalogCard";

export default CatalogCard;
