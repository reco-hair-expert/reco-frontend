"use client";

import Image from "next/image";
import styles from "./CatalogCard.module.scss";
import Link from "next/link";
import Icon from "../Icon/Icon";
import { CatalogCardProps } from "./types/CatalogCard.types";
import { useContext, useState, useCallback, memo } from "react";
import { CartContext } from "@/context/CartContext";

const CatalogCard = memo(({ perRow, product }: CatalogCardProps) => {
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [showSizeWarning, setShowSizeWarning] = useState(false);
  const cart = useContext(CartContext);

  const handleSizeChange = useCallback((event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedSize(event.target.value);
  }, []);

  const handleBuyClick = useCallback(() => {
    if (!selectedSize) {
      setShowSizeWarning(true);
      setTimeout(() => setShowSizeWarning(false), 3000);
      return;
    }

    cart?.addToCart(product, selectedSize);
  }, [selectedSize, cart, product]);

  const getSelectedSizePrice = useCallback(() => {
    if (!selectedSize || !product.sizes) return null;
    return product.sizes[selectedSize];
  }, [selectedSize, product.sizes]);

  const renderSizes = useCallback(() => (
    <>
      {Object.keys(product.sizes || {}).length ? (
        <select
          className={styles.sizeSelect}
          value={selectedSize || ''}
          onChange={handleSizeChange}
        >
          <option value="">Оберіть розмір</option>
          {Object.keys(product.sizes).map((size) => (
            <option key={size} value={size}>
              {size}
            </option>
          ))}
        </select>
      ) : (
        <div>Розміри не доступні для цього товару.</div>
      )}
    </>
  ), [product.sizes, selectedSize, handleSizeChange]);

  return (
    <div
      className={styles.card}
      style={{
        width: `calc((100% - 20px * ${perRow - 1}) / ${perRow})`,
      }}
    >
      {showSizeWarning && (
        <div className={styles.sizeWarning}>
          Будь ласка, оберіть розмір перед покупкою.
        </div>
      )}
      <div className={styles.imageContainer}>
        <Image
          src={product.photo || "/fallback-image.jpg"}
          alt={product.name}
          width={400}
          height={300}
          loading="lazy"
          placeholder="blur"
          blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4gHYSUNDX1BST0ZJTEUAAQEAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADb/2wBDABQODxIPDRQSEBIXFRQdHx4eHRoaHSQtJSEkLzYvLy0vLi44QjY4OEI4Li8vQUVFRkZFRUVFRUVFRUVFRUVFRUX/2wBDAR0XFyAeIBogHiAeIBUVFRUVFRUVFRUVFRUVFRUVFRUVFRUVFRUVFRUVFRUVFRUVFRUVFRUVFRUVFRUVFRUVFRUX/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAb/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          quality={75}
        />
      </div>

      <div className={styles.badgeContainer}>
        <span className={styles.saleBadge}>bestseller</span>
        <span className={styles.typeBadge}>Сухе</span>
      </div>

      <Link href="/" className={styles.infoBtn}>
        <Icon name="icon-info" className={styles.infoBtnIcon} />
      </Link>

      <div className={styles.productDetailsContainer}>
        <header className={styles.infoContainer}>
          <h3 className={styles.productName}>{product.name}</h3>
        </header>

        <div className={styles.productAction}>
          <p className={styles.productType}>{product.type}</p>
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
                'Оберіть розмір'
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
});

CatalogCard.displayName = 'CatalogCard';

export default CatalogCard;
